package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.*;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.ExamAnswerRecord;
import com.springapp.mvc.pojo.exam.ExamMarkingRecord;
import com.springapp.mvc.pojo.exam.ExamResult;
import com.springapp.mvc.pojo.exam.Status;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSONSerializer;
import org.hibernate.Hibernate;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by PTang_000 on 30-Sep-15.
 */
@Controller
@RequestMapping("/TDCS")
public class MarkingController {

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryExamAnswerDomain queryExamAnswerDomain;

    @Autowired
    QueryMarkingRecord queryMarkingRecord;

    @Autowired
    QueryStatusDomain queryStatusDomain;

    @Autowired
    QueryPaperQuestionDomain queryPaperQuestionDomain;

    @RequestMapping(method = RequestMethod.GET, value = "/exam/marking")
    public String marking(ModelMap modelMap, Model model, HttpServletRequest request, HttpServletResponse response
//                         ,@RequestParam(value = "recordId") Integer recordId
            , @RequestParam(value = "resultId") Integer resultId) {

        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
        Hibernate.initialize(examResult.getExamRecord().getPaper().getQuestions());
        Hibernate.initialize(examResult.getExamRecord().getExamAnswerRecords());
        for (ExamAnswerRecord ear : examResult.getExamRecord().getExamAnswerRecords()) {
            Hibernate.initialize(ear.getQuestion().getChoices());
            Hibernate.initialize(ear.getQuestion().getPapers());
            HibernateUtil.getSession().refresh(ear);
        }
        modelMap.addAttribute("examResult", examResult);
        modelMap.addAttribute("user", queryUserDomain.getCurrentUser(request));

        return "marking";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/marking/submit")
    @ResponseBody
    public ResponseEntity<String> submitMarking(HttpServletRequest request, HttpServletResponse response
            , @RequestParam(value = "resultId", required = true) Integer resultId
            , @RequestParam(value = "markingRecord", required = true) JSONArray markingRecord
            , @RequestParam(value = "comment", required = false) String comment
            , @RequestParam(value = "confirmation", required = true) Boolean confirmation) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.class").serialize("hello");
        Status markConfirmedStatus = queryStatusDomain.getMarkConfirmedStatus();
        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
        if (examResult.getStatus() == markConfirmedStatus) {
            json = new JSONSerializer().exclude("*.class").serialize(markConfirmedStatus);
            return new ResponseEntity<String>(json, headers, HttpStatus.I_AM_A_TEAPOT);
        }

        User currentUser = queryUserDomain.getCurrentUser(request);
        examResult.setMarkedBy(currentUser);
        examResult.setComment(comment);
        examResult.setMarkedDate(DateUtil.getCurrentDateWithRemovedTime());

        Float subjectiveScore = 0f;
        List<ExamAnswerRecord> examAnswerRecords = examResult.getExamRecord().getExamAnswerRecords();

        try {
            HibernateUtil.beginTransaction();

            for (int i = 0; i < markingRecord.length(); i++) {

                ExamAnswerRecord answerRecord = queryExamAnswerDomain.getExamAnswerRecordById(markingRecord.getJSONObject(i).optInt("answerRecord"));
                Boolean update = true;

                ExamMarkingRecord examMarkingRecord = queryMarkingRecord.getMarkingRecordByAnswerRecord(answerRecord);

                if (examMarkingRecord == null) {
                    examMarkingRecord = new ExamMarkingRecord();
                    update = false;
                }

                examMarkingRecord.setMarkedBy(currentUser);
                examMarkingRecord.setAnswerRecord(answerRecord);
                Float score = (float) markingRecord.getJSONObject(i).optDouble("score");
                examMarkingRecord.setMarkingScore(score);
                examMarkingRecord.setExamResult(examResult);
                if (update) {
                    queryMarkingRecord.mergeUpdateMarkingRecord(examMarkingRecord);
                } else {
                    queryMarkingRecord.saveMarkingRecord(examMarkingRecord);
                }
                subjectiveScore += (score);
            }
            examResult.setSubjectiveScore(subjectiveScore);
            if (confirmation) {
                examResult.setStatus(queryStatusDomain.getMarkConfirmedStatus());
            } else {
                examResult.setStatus(queryStatusDomain.getMarkedStatus());
            }

            queryExamResultDomain.updateExamResult(examResult);

            HibernateUtil.commitTransaction();
            HibernateUtil.closeSession();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/marking/checkCurrentVersion")
    @ResponseBody
    public ResponseEntity<String> checkVersion(@RequestParam(value = "resultId", required = true) Integer resultId,
                                               @RequestParam(value = "resultVersion", required = true) Integer version){

        ExamResult er = queryExamResultDomain.getExamResultById(resultId);

        boolean isCurrent = true;
        if (er.getVersion() != version){
            isCurrent = false;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.class").serialize(isCurrent);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

}

