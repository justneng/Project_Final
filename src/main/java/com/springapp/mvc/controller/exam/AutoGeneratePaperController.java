package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryAutoGeneratePaperDomain;
import com.springapp.mvc.domain.exam.QueryExamRecordDomain;
import com.springapp.mvc.domain.exam.QueryPaperDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ExamRecord;
import com.springapp.mvc.pojo.exam.PaperGenerateTemplate;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.awt.print.Paper;
import java.util.logging.Logger;

/**
 * Created by wanchana on 23/1/2559.
 */
@Controller
@RequestMapping("/TDCS")
public class AutoGeneratePaperController {

    @Autowired
    QueryAutoGeneratePaperDomain queryAutoGeneratePaperDomain;

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @RequestMapping(method = RequestMethod.POST, value = "/exam/generatePaper")
    public ResponseEntity<Integer> generatePaper(@RequestParam(value = "cid") String cid,
                                                 HttpServletRequest request){

        HttpHeaders headers = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.OK;
        User user = queryUserDomain.getCurrentUser(request);
        Integer paperId = 0;

        if(queryAutoGeneratePaperDomain.isNotCreated(cid)){
            paperId = queryAutoGeneratePaperDomain.generateNewPaper(cid, 1);
            return new ResponseEntity<Integer>(paperId, headers, httpStatus.CREATED);
        }
//        else if(!(queryAutoGeneratePaperDomain.isNotCreated(cid))){
        else{
            if((queryAutoGeneratePaperDomain.currentNumber(cid, user) != 0)){
                if(queryAutoGeneratePaperDomain.checkExamPaperTime(queryAutoGeneratePaperDomain.currentNumber(cid, user)) != 0){
                    paperId = queryAutoGeneratePaperDomain.checkExamPaperTime(queryAutoGeneratePaperDomain.currentNumber(cid, user));
                    return new ResponseEntity<Integer>(paperId, headers, httpStatus.CREATED);
                }
                else{
                    paperId = queryAutoGeneratePaperDomain.generateNewPaper(cid, queryAutoGeneratePaperDomain.getCurrentExamPaperNo(cid) + 1);
                    return new ResponseEntity<Integer>(paperId, headers, httpStatus.CREATED);
                }
            }
            else{
                paperId = queryAutoGeneratePaperDomain.getFirstExam();
                return new ResponseEntity<Integer>(paperId, headers, httpStatus.CREATED);
            }
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/exam/doExamGenerate")
    public String doExamGenerate(ModelMap modelMap, HttpServletRequest request, @RequestParam(value = "paperId") Integer paperId){

        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);
        User user = queryUserDomain.getCurrentUser(request);
        modelMap.addAttribute("paper", examPaper);
        modelMap.addAttribute("user", user);

        ExamRecord examRecord = queryExamRecordDomain.getExamRecordByPaperAndUser(examPaper,user);
        if(examRecord == null && examPaper != null){
            examRecord = new ExamRecord();
            examRecord.setUser(user);
            examRecord.setPaper(queryPaperDomain.getPaperById(paperId));
            examRecord.setExamDate(DateUtil.getCurrentDateWithRemovedTime());
            examRecord.setCount(queryAutoGeneratePaperDomain.getPaperGenerateTemplateNo(examPaper));
            HibernateUtil.beginTransaction();
            queryExamRecordDomain.saveExamRecord(examRecord);
            HibernateUtil.commitTransaction();
        }else{
            examRecord = null;
        }

        modelMap.addAttribute("examRecord",examRecord);

        return "doExam";
    }
}
