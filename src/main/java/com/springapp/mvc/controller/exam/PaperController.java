package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryPositionDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.*;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSONSerializer;
import org.hibernate.Criteria;
import org.hibernate.annotations.Check;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Controller
@RequestMapping("/TDCS")
public class PaperController {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryPaperDomain queryPaperDomain;

    //    Add By Mr.Wanchana K
    @Autowired

    QueryPositionDomain queryPositionDomain;

    @Autowired
    QueryPaperStatusDomain queryPaperStatusDomain;

    @Autowired
    QueryQuestionDomain queryQuestionDomain;

    @Autowired
    QueryPaperQuestionDomain queryPaperQuestionDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @Autowired
    QueryPaperTypeDomain queryPaperTypeDomain;

    private static final Logger logger = Logger.getLogger(PaperController.class.getName());

    @RequestMapping(value = "/exam/createPaper", method = RequestMethod.POST)
    public ResponseEntity<String> createPaper(Model model,
                                              @RequestParam(value = "paperCode", required = true) String paperCode,
                                              @RequestParam(value = "paperName", required = false) String paperName,
                                              @RequestParam(value = "paperScore", required = true) String paperScore,
                                              @RequestParam(value = "paperTime", required = true) String paperTime,
                                              @RequestParam(value = "paperForPosition", required = true) Integer paperForPosition,
                                              @RequestParam(value = "jsonObjQuestion", required = true) String jsonObjQuestion,
                                              @RequestParam(value = "questionEasyCount", required = true) Integer questionEasyCount,
                                              @RequestParam(value = "questionNormalCount", required = true) Integer questionNormalCount,
                                              @RequestParam(value = "questionHardCount", required = true) Integer questionHardCount,
                                              @RequestParam(value = "paperType", required = true) String paperType,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws JSONException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray(jsonObjQuestion);
        List<Integer> qIds = new ArrayList();
        List<Float> qScores = new ArrayList();
        Float paperMaxScore = new Float(paperScore);
        Integer pTime = new Integer(paperTime);
        Integer pPosition = null;
        Position pForPosition = null;

        if(paperForPosition != 0){
            pPosition = new Integer(paperForPosition);
            pForPosition = queryPositionDomain.getPositionById(pPosition);
        }

        User createBy = queryUserDomain.getCurrentUser(request);
        Status paperStatus = queryPaperStatusDomain.getStatusById(2);
//        long time = System.currentTimeMillis();
//        Date curDate = new Date(time);
        java.util.Date curDate = DateUtil.getCurrentDateWithRemovedTime();

        for(int i = 0; i < jsonArray.length(); i++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            Integer tempQId = jsonObject.getInt("qId");
            tempQId.getClass().getName();
            Float tempQScore = new Float(jsonObject.getDouble("qScore"));
            qIds.add(tempQId);
            qScores.add(tempQScore);
        }

        if(paperType.equals("static")){
            ExamPaper examPaper = new ExamPaper();
            examPaper.setCreateBy(createBy);
            examPaper.setCode(paperCode);
            examPaper.setName(paperName);
            examPaper.setMaxScore(paperMaxScore);
            examPaper.setCreateDate(curDate);
            examPaper.setTimeLimit(pTime);
            examPaper.setPaperStatus(paperStatus);
            examPaper.setPosition(pForPosition);
            examPaper.setPaperType(queryPaperTypeDomain.getPaperTypeById(1));
            queryPaperDomain.createPaper(examPaper, qIds, qScores);
        }

        if(paperType.equals("random")){
            ExamPaper examPaper = new ExamPaper();
            examPaper.setCreateBy(createBy);
            examPaper.setCode(paperCode);
            examPaper.setName(paperName);
            examPaper.setMaxScore(paperMaxScore);
            examPaper.setCreateDate(curDate);
            examPaper.setTimeLimit(pTime);
            examPaper.setPaperStatus(paperStatus);
            examPaper.setPosition(pForPosition);
            examPaper.setPaperType(queryPaperTypeDomain.getPaperTypeById(2));
            examPaper.setQuestionEasy(questionEasyCount);
            examPaper.setQuestionNormal(questionNormalCount);
            examPaper.setQuestionHard(questionHardCount);
            queryPaperDomain.createPaper(examPaper, qIds, qScores);
        }



        Integer paperId = queryPaperDomain.getId(paperCode);
        String json = new Gson().toJson(paperId);

        return new ResponseEntity<String>(json, headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/exam/updatePaper", method = RequestMethod.POST)
    public ResponseEntity<String> updatePaper(Model model,
                                              @RequestParam(value = "paperCodeUpdate", required = true) String paperCode,
                                              @RequestParam(value = "paperNameUpdate", required = false) String paperName,
                                              @RequestParam(value = "paperScoreUpdate", required = true) String paperScore,
                                              @RequestParam(value = "paperTimeUpdate", required = true) String paperTime,
                                              @RequestParam(value = "paperForPositionUpdate", required = true) Integer paperForPosition,
                                              @RequestParam(value = "jsonObjQuestionUpdate", required = true) String jsonObjQuestion,
                                              @RequestParam(value = "paperIdUpdate", required = true) Integer pId,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws JSONException {

        JSONArray jsonArray = new JSONArray(jsonObjQuestion);
        List<Integer> qIds = new ArrayList();
        List<Float> qScores = new ArrayList();
        Float paperMaxScore = new Float(paperScore);
        Integer pTime = new Integer(paperTime);
        Integer pPosition = null;
        Position pForPosition = null;

        if(paperForPosition != 0){
            pPosition = new Integer(paperForPosition);
            pForPosition = queryPositionDomain.getPositionById(pPosition);
        }

        User updateBy = queryUserDomain.getCurrentUser(request);
        Status paperStatus = queryPaperStatusDomain.getStatusById(2);
//        long time = System.currentTimeMillis();
//        Date updateDate = new Date(time);
        java.util.Date updateDate = DateUtil.getCurrentDateWithRemovedTime();

        for(int i = 0; i < jsonArray.length(); i++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            Integer tempQId = new Integer(jsonObject.getString("qId"));
            tempQId.getClass().getName();
            Float tempQScore = new Float(jsonObject.getString("qScore"));
            qIds.add(tempQId);
            qScores.add(tempQScore);
        }

        queryPaperDomain.updatePaper(qIds, qScores, pId, updateBy, paperCode, paperName, paperMaxScore, updateDate, pTime, paperStatus, pForPosition);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/copyPaper", method = RequestMethod.POST)
    public ResponseEntity<String> copyPaper(Model model,
                                            @RequestParam(value = "paperCode", required = true) String paperCode,
                                            @RequestParam(value = "paperName", required = false) String paperName,
                                            @RequestParam(value = "paperId", required = true) Integer pId,
                                            HttpServletRequest request,
                                            HttpServletResponse response) throws JSONException {

        ExamPaper examPaper = queryPaperDomain.getPaperById(pId);
        List<PaperQuestion> paperQuestions = queryPaperQuestionDomain.getPaperQuestionByExamPaper(examPaper);
        queryPaperDomain.copyPaper(examPaper, paperQuestions, paperCode, paperName);

        return new ResponseEntity<String>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/exam/getAllPapers", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllPapers(){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<ExamPaper> papers = queryPaperDomain.getAllPapers();

        List checkPaperInUses = null;

        if(papers.size() > 0){
            checkPaperInUses = new ArrayList();

            for(int i = 0; i < papers.size(); i ++){
                Boolean bool = false;
                List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(papers.get(i));
                CheckPaperInUse checkPaperInUse = new CheckPaperInUse();

                if(examRecord != null){
                    bool = queryExamResultDomain.checkResultIsDone(examRecord);
                    checkPaperInUse.setExamPaper(papers.get(i));
                    checkPaperInUse.setCheck(bool);
                }
                else{
                    checkPaperInUse.setExamPaper(papers.get(i));
                    checkPaperInUse.setCheck(bool);
                }

                checkPaperInUses.add(checkPaperInUse);
            }

        }

        String toJson = new JSONSerializer().include("choices").exclude("*.class").serialize(checkPaperInUses);
        return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);

    }

    @RequestMapping(value = "/exam/updatePaperStatus", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> updatePaperStatus(Model model,
                                                    @RequestParam(value = "paperId") int paperId,
                                                    @RequestParam(value = "paperStatus") int paperStatus){

        Status status = new Status();
        status = queryPaperStatusDomain.getStatusById(paperStatus);
        ExamPaper examPaper = new ExamPaper();
        examPaper = queryPaperDomain.getPaperById(paperId);
        examPaper.setPaperStatus(status);
        queryPaperDomain.updatePaperStatus(examPaper);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/deletePaper", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> deletePaper(@RequestBody String jsoN) throws JSONException {

        JSONArray jsonArray = new JSONArray(jsoN);
        List paperIds = new ArrayList();

        for(int i = 0; i < jsonArray.length(); i++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            paperIds.add(jsonObject.getInt("paperId"));
        }

        queryPaperDomain.deletePaper(paperIds);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/checkExamPaperInUse", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> checkExamPaperInUse(@RequestParam(value = "paperId") Integer paperId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Boolean check = queryExamRecordDomain.checkExamRecordInUse(paperId);

        String json = new Gson().toJson(check);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/checkExamPaperIfMarkConfirmed", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> checkExamPaperIfMarkConfirmed(@RequestParam(value = "paperId") Integer paperId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Boolean check = false;
        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);
        List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(examPaper);

        if(examRecord != null){
            check = queryExamResultDomain.checkResultIsDone(examRecord);
            String json = new Gson().toJson(check);
            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        }
        else{
            String json = new Gson().toJson(check);
            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/exam/getPaper", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getPaper(@RequestParam(value = "paperId") int paperId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        ExamPaper paper = queryPaperDomain.getPaperById(paperId);
        List<ExamPaper> paperList = new ArrayList<ExamPaper>();
        paperList.add(paper);
        String json = new JSONSerializer().exclude("*.class").serialize(paperList);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getPaperQuestionByPaper", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getPaperQuestionByPaper(@RequestParam(value = "paperId") int paperId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        ExamPaper paper = queryPaperDomain.getPaperById(paperId);
        List<PaperQuestion> paperQuestion = queryPaperQuestionDomain.getPaperQuestionByExamPaper(paper);
        String json = new JSONSerializer().exclude("*.class").serialize(paperQuestion);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getPaperByCode", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getPaperByCode(@RequestParam(value = "paperCode") String paperCode){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        ExamPaper paper = queryPaperDomain.getPaperByCode(paperCode);
        if(paper != null){
            List<PaperQuestion> paperQuestion = queryPaperQuestionDomain.getPaperQuestionByExamPaper(paper);
            String json = new JSONSerializer().exclude("*.class").serialize(paperQuestion);

            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        }
        else{
            return null;
        }
    }

    @RequestMapping(value = "/exam/searchPaper", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> searchPaper(@RequestBody String jsoN) throws JSONException, ParseException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Integer> empIds = new ArrayList<Integer>();

        String code = "";
        String name = "";
        String createDateFrom = "";
        String createDateTo = "";
        String scoreFrom = "";
        String scoreTo = "";
        String paperStatus = "";

        JSONArray jsonArray = new JSONArray(jsoN);
        JSONObject jsonObj = jsonArray.getJSONObject(0);

        Integer check = new Integer(jsonObj.getString("empId"));
        Integer btnStatus = 0;

        if(check == 0){
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            code = jsonObject.getString("code");
            name = jsonObject.getString("name");
            btnStatus = jsonObject.getInt("buttonStatus");

            createDateFrom = jsonObject.getString("createDateFrom");
            createDateTo = jsonObject.getString("createDateTo");
            scoreFrom = jsonObject.getString("scoreFrom");
            scoreTo = jsonObject.getString("scoreTo");
            paperStatus = jsonObject.getString("paperStatus");
        }
        else{
            for(int i = 0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                empIds.add(new Integer(jsonObject.getString("empId")));
                if(i == 0){
                    code = jsonObject.getString("code");
                    name = jsonObject.getString("name");
                    createDateFrom = jsonObject.getString("createDateFrom");
                    createDateTo = jsonObject.getString("createDateTo");
                    scoreFrom = jsonObject.getString("scoreFrom");
                    scoreTo = jsonObject.getString("scoreTo");
                    paperStatus = jsonObject.getString("paperStatus");
                }
                btnStatus = jsonObject.getInt("buttonStatus");
            }
        }

        if(empIds.size() == 0){
            empIds = null;
        }

        if(btnStatus == 0){
            List<ExamPaper> papers = queryPaperDomain.generalSearchPaper(empIds, code, name);
            List checkPaperInUses = null;

            if(papers.size() > 0){
                checkPaperInUses = new ArrayList();

                for(int i = 0; i < papers.size(); i ++){
                    Boolean bool = false;
                    List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(papers.get(i));
                    CheckPaperInUse checkPaperInUse = new CheckPaperInUse();

                    if(examRecord != null){
                        bool = queryExamResultDomain.checkResultIsDone(examRecord);
                        checkPaperInUse.setExamPaper(papers.get(i));
                        checkPaperInUse.setCheck(bool);
                    }
                    else{
                        checkPaperInUse.setExamPaper(papers.get(i));
                        checkPaperInUse.setCheck(bool);
                    }

                    checkPaperInUses.add(checkPaperInUse);
                }

            }

            String toJson = new JSONSerializer().include("choices").exclude("*.class").serialize(checkPaperInUses);
            return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
        }
        else{
            List<ExamPaper> papers = queryPaperDomain.advanceSearchPaper(empIds, code, name, createDateFrom, createDateTo, scoreFrom, scoreTo, paperStatus);
            List checkPaperInUses = null;

            if(papers.size() > 0){
                checkPaperInUses = new ArrayList();

                for(int i = 0; i < papers.size(); i ++){
                    Boolean bool = false;
                    List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(papers.get(i));
                    CheckPaperInUse checkPaperInUse = new CheckPaperInUse();

                    if(examRecord != null){
                        bool = queryExamResultDomain.checkResultIsDone(examRecord);
                        checkPaperInUse.setExamPaper(papers.get(i));
                        checkPaperInUse.setCheck(bool);
                    }
                    else{
                        checkPaperInUse.setExamPaper(papers.get(i));
                        checkPaperInUse.setCheck(bool);
                    }

                    checkPaperInUses.add(checkPaperInUse);
                }

            }

            String toJson = new JSONSerializer().include("choices").exclude("*.class").serialize(checkPaperInUses);
            return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/exam/getPaperCode", method= RequestMethod.POST)
    public ResponseEntity<String> getPaperCode(@RequestParam(value = "pId", required = true) Integer paperId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List codes = queryPaperDomain.getCode(paperId);
        String json = new JSONSerializer().exclude("*.class").serialize(codes);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getPaperCodeCopy", method= RequestMethod.POST)
    public ResponseEntity<String> getPaperCodeCopy(){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List codes = queryPaperDomain.getCodeCopy();
        String json = new JSONSerializer().exclude("*.class").serialize(codes);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/orderPaper", method= RequestMethod.POST)
    public ResponseEntity<String> orderPaper(@RequestParam(value = "paperCodes") String jsonString,
                                             @RequestParam(value = "orderPaperByColumn") String orderPaperByColumn,
                                             @RequestParam(value = "orderPaperType") String orderPaperType){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List paperCodesList = new ArrayList();
        JSONArray jsonArray = new JSONArray(jsonString);
        for(int i = 0; i < jsonArray.length(); i ++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            paperCodesList.add(jsonObject.getString("paperCodes"));
        }

        List<ExamPaper> examPapers = queryPaperDomain.orderPaper(paperCodesList, orderPaperByColumn, orderPaperType);
        List checkPaperInUses = null;

        if(examPapers.size() > 0){
            checkPaperInUses = new ArrayList();

            for(int i = 0; i < examPapers.size(); i ++){
                Boolean bool = false;
                List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(examPapers.get(i));
                CheckPaperInUse checkPaperInUse = new CheckPaperInUse();

                if(examRecord != null){
                    bool = queryExamResultDomain.checkResultIsDone(examRecord);
                    checkPaperInUse.setExamPaper(examPapers.get(i));
                    checkPaperInUse.setCheck(bool);
                }
                else{
                    checkPaperInUse.setExamPaper(examPapers.get(i));
                    checkPaperInUse.setCheck(bool);
                }

                checkPaperInUses.add(checkPaperInUse);
            }

        }

        String json = new JSONSerializer().exclude("*.class").serialize(checkPaperInUses);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/addReleaseExamPaperRule", method = RequestMethod.POST)
    public ResponseEntity<String> getUsersInPosition(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "userIds") int[] userIds,
                                                     @RequestParam(value = "currentDate") String currentDate,
                                                     @RequestParam(value = "paperCode") String paperCode){

        User updateBy = queryUserDomain.getCurrentUser(request);
        for(int i: userIds){
            queryPaperDomain.addRule(i, paperCode, updateBy, currentDate);
        }

        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
