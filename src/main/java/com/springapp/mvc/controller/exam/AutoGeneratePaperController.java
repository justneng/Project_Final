package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.*;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSONSerializer;
import org.hibernate.Criteria;
import org.hibernate.cache.QueryResultsRegion;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getAvailablePaper")
    public ResponseEntity<String> getAvailablePaper(HttpServletRequest request){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        HttpStatus httpStatus = HttpStatus.OK;
        int i = 0;
        int idx = 0;
        User user = queryUserDomain.getCurrentUser(request);
        List<PrepareCategory> prepare = queryAutoGeneratePaperDomain.getCategoryToGenerate();
        List returnValues = new ArrayList();

        for(i = 0; i < prepare.size(); i ++) {
            List<ExamRecord> paper = new ArrayList<ExamRecord>();
            Category category = prepare.get(i).getCategory();

            Criteria criteria = HibernateUtil.getSession().createCriteria(PaperGenerateTemplate.class);
            criteria.add(Restrictions.eq("category", category));
            criteria.addOrder(Order.asc("no"));
            List<PaperGenerateTemplate> paperGenerateTemplateList = criteria.list();

            List<Integer> paperIdTemplate = new ArrayList<Integer>();
            for (PaperGenerateTemplate pap : paperGenerateTemplateList) {
                paperIdTemplate.add(pap.getExamPaper().getId());
            }
            if(paperIdTemplate.size() > 0){
                for(int j = 0; j < paperIdTemplate.size(); j ++){
                    ExamRecord examRecord = new ExamRecord();
                    Criteria cri = HibernateUtil.getSession().createCriteria(ExamRecord.class);
                    cri.add(Restrictions.eq("paper.id", paperIdTemplate.get(j)));
                    cri.add(Restrictions.eq("user", user));
                    examRecord = (ExamRecord) cri.uniqueResult();
                    paper.add(examRecord);
                }

                List list = new ArrayList();
                List tmp = new ArrayList();
                for(idx = 0; idx < paper.size(); idx ++){
                    if(paper.get(idx) != null){
                        paperIdTemplate.remove(paper.get(idx).getPaper().getId());
                        PaperAvailable paperAvailable = new PaperAvailable();
                        paperAvailable.setId(paper.get(idx).getId());
                        paperAvailable.setAlreadyMarking(true);
                        paperAvailable.setCount(paper.get(idx).getCount());
                        paperAvailable.setExamAnswerRecords(paper.get(idx).getExamAnswerRecords());
                        paperAvailable.setExamDate(paper.get(idx).getExamDate());
                        paperAvailable.setPaper(paper.get(idx).getPaper());
                        paperAvailable.setExamResult(paper.get(idx).getExamResult());
                        paperAvailable.setTimeTaken(paper.get(idx).getTimeTaken());
                        paperAvailable.setUser(paper.get(idx).getUser());
                        tmp.add(paperAvailable);
                    }
                    if(idx == paper.size() - 1){
                        if(paperIdTemplate.size() > 0){
                            Criteria c = HibernateUtil.getSession().createCriteria(PaperGenerateTemplate.class);
                            c.add(Restrictions.in("examPaper.id", paperIdTemplate));
                            List<PaperGenerateTemplate> templates = c.list();

                            for(int j = 0 ; j < templates.size(); j ++){
                                PaperAvailable paperAvailable = new PaperAvailable();
                                paperAvailable.setCount(templates.get(j).getNo());
                                paperAvailable.setAlreadyMarking(false);
                                paperAvailable.setPaper(templates.get(j).getExamPaper());
                                tmp.add(paperAvailable);
                            }
                        }
                        list.add(tmp);
                        list.add(prepare.get(i));
                    }
                }
                returnValues.add(list);
            }
            else{
                List list = new ArrayList();
                list.add(null);
                list.add(prepare.get(i));
                returnValues.add(list);
            }
        }

        String json = new JSONSerializer().exclude("*.class").serialize(returnValues);
        return new ResponseEntity<String>(json, headers, httpStatus.OK);
    }

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
//                paperId = queryAutoGeneratePaperDomain.getFirstExam();
                paperId = paperId = queryAutoGeneratePaperDomain.generateNewPaper(cid, 1);
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

class PaperAvailable{

    private Integer id;
    private User user;
    private ExamPaper paper;
    private Date examDate;
    private Integer timeTaken;
    private Integer count;
    private List<ExamAnswerRecord> examAnswerRecords;
    private ExamResult examResult;
    private Boolean alreadyMarking;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ExamPaper getPaper() {
        return paper;
    }

    public void setPaper(ExamPaper paper) {
        this.paper = paper;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<ExamAnswerRecord> getExamAnswerRecords() {
        return examAnswerRecords;
    }

    public void setExamAnswerRecords(List<ExamAnswerRecord> examAnswerRecords) {
        this.examAnswerRecords = examAnswerRecords;
    }

    public ExamResult getExamResult() {
        return examResult;
    }

    public void setExamResult(ExamResult examResult) {
        this.examResult = examResult;
    }

    public Boolean getAlreadyMarking() {
        return alreadyMarking;
    }

    public void setAlreadyMarking(Boolean alreadyMarking) {
        this.alreadyMarking = alreadyMarking;
    }
}