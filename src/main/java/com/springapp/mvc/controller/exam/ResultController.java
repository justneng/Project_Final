package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryExamRecordDomain;
import com.springapp.mvc.domain.exam.QueryExamResultDomain;
import com.springapp.mvc.domain.exam.QueryPaperQuestionDomain;
import com.springapp.mvc.pojo.exam.*;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.logging.Logger;

//import org.springframework.transaction.annotation.Transactional;

/**
 * Created by PTang_000 on 14-Oct-15.
 */
@Controller
@RequestMapping("/TDCS")
public class ResultController {
    private static final Logger log = Logger.getLogger(ResultController.class.getName());
    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @Autowired
    QueryPaperQuestionDomain queryPaperQuestionDomain;

    //    @Transactional
    @RequestMapping(method = RequestMethod.GET, value = "/exam/checkScore")
    public String checkScore(HttpServletRequest request, ModelMap modelMap) {

        List<ExamResult> examResults = queryExamResultDomain.getUserResult(queryUserDomain.getCurrentUser(request));

        modelMap.addAttribute("examResults", examResults);

        return "checkScore";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/checkScore/getResultDetail")
    @ResponseBody
    public ResponseEntity<String> getResultDetail(@RequestParam(value = "resultId", required = true) Integer resultId) {

        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
//        if(examResult.getStatus().getId() != 7){
//            examResult = null;
//        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.class").serialize(examResult);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);

    }


    //
//    @RequestMapping(method = RequestMethod.POST, value = "/exam/addQuestion")
//    @ResponseBody
//    public ResponseEntity<String> getUserResult(ModelMap model,HttpServletResponse response,HttpServletRequest request){
//
//        List<ExamResult> examResults = queryExamResultDomain.getUserResult(queryUserDomain.getCurrentUser(request));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        String json = new JSONSerializer().exclude("*.class").serialize(examResults);
//
//        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
//    }
    @RequestMapping(method = RequestMethod.POST, value = "/exam/checkScore/getResultDetail2")
    @ResponseBody
    public ResponseEntity<String> getResultDetail2(@RequestParam(value = "resultId", required = true) Integer resultId) {

        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
        List<SubCategory> subCatList = new ArrayList<SubCategory>();
        Map<SubCategory, Float> resultScoreSubcatMap = new HashMap<SubCategory, Float>();
        Map<SubCategory, Float> maxScoreSubCatMap = new HashMap<SubCategory, Float>();
        List<CheckScore> checkScoreList = new ArrayList<CheckScore>();

        Set<PaperQuestion> pqList = examResult.getExamRecord().getPaper().getQuestions();
        List<ExamAnswerRecord> examAnswerRecords = examResult.getExamRecord().getExamAnswerRecords();

        for (PaperQuestion pq : pqList) {
            subCatList.add(pq.getQuestion().getSubCategory());
        }

        Set<SubCategory> subCatSet = new HashSet<SubCategory>(subCatList);

        int count = 0;

        for (SubCategory sc : subCatSet) {
            Float maxScore = 0f;
            Float resultScore = 0f;

            CheckScore checkScore = new CheckScore();
            for (ExamAnswerRecord ear : examAnswerRecords) {
                PaperQuestion pq = queryPaperQuestionDomain.getPaperQuestion(examResult.getExamRecord().getPaper(), ear.getQuestion());

                if (ear.getQuestion().getSubCategory().equals(sc)) {
                    if (ear.getAnswerObjective() != null) {
                        if (ear.getAnswerObjective().getCorrection()) {
                            resultScore += pq.getScore();
                        }

                    } else {
                        if (ear.getMarkingRecord() != null) {
                            if (ear.getMarkingRecord().getMarkingScore() != 0 || ear.getMarkingRecord().getMarkingScore() == 0) {
                                resultScore += ear.getMarkingRecord().getMarkingScore();
                            }
                        }
                    }
                    maxScore += pq.getScore();
                }
            }

            resultScoreSubcatMap.put(sc, resultScore);
            maxScoreSubCatMap.put(sc, maxScore);

            checkScore.setCategoryName(sc.getCategory().getName());
            checkScore.setSubCategoryName(sc.getName());

            for (SubCategory key : resultScoreSubcatMap.keySet()) {
                if (key.getName() == sc.getName()) {
                    Float value = resultScoreSubcatMap.get(key);
                    checkScore.setSubCategoryResultScore(value);
                }
            }

            for (SubCategory key : maxScoreSubCatMap.keySet()) {
                if (key.getName() == sc.getName()) {
                    Float value = maxScoreSubCatMap.get(key);
                    checkScore.setSubCategoryMaxScore(value);
                }
            }
            if(count == 0){
                checkScore.setSubjectiveScore(examResult.getSubjectiveScore());
                checkScore.setComment(examResult.getComment());
                checkScore.setObjectiveScore(examResult.getObjectiveScore());
                checkScore.setPaperName(examResult.getExamRecord().getPaper().getName());
                checkScore.setPaperCode(examResult.getExamRecord().getPaper().getCode());
                if(examResult.getMarkedBy()==null){
                    checkScore.setMarkedBy("TDCS System");
                }else{
                    checkScore.setMarkedBy(examResult.getMarkedBy().getThFname());
                }

            }

            count++;
            checkScoreList.add(checkScore);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().include("examRecord.examAnswerRecords.answerObjective.question").exclude("*.class")
                .exclude("examRecord.paper").exclude("*.status").serialize(checkScoreList);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }
}


class CheckScore {

    private String categoryName;
    private String subCategoryName;
    private Float subCategoryResultScore;
    private Float subCategoryMaxScore;
    private String comment;
    private Float objectiveScore;
    private Float subjectiveScore;
    private String markedBy;
    private String paperName;
    private String paperCode;

    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(String createBy) {
        this.markedBy = createBy;
    }

    public Float getSubCategoryResultScore() {
        return subCategoryResultScore;
    }

    public void setSubCategoryResultScore(Float subCategoryResultScore) {
        this.subCategoryResultScore = subCategoryResultScore;
    }

    public Float getSubCategoryMaxScore() {
        return subCategoryMaxScore;
    }

    public void setSubCategoryMaxScore(Float subCategoryMaxScore) {
        this.subCategoryMaxScore = subCategoryMaxScore;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Float getObjectiveScore() {
        return objectiveScore;
    }

    public void setObjectiveScore(Float objectiveScore) {
        this.objectiveScore = objectiveScore;
    }

    public Float getSubjectiveScore() {
        return subjectiveScore;
    }

    public void setSubjectiveScore(Float subjectiveScore) {
        this.subjectiveScore = subjectiveScore;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }

}
