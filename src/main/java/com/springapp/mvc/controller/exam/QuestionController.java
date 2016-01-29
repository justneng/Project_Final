package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.*;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSON;
import flexjson.JSONSerializer;
import org.hibernate.Hibernate;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Controller
@RequestMapping("/TDCS")
public class QuestionController {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @Autowired
    QueryChoiceDomain queryChoiceDomain;

    @Autowired
    QueryQuestionDomain queryQuestionDomain;

    @Autowired
    QueryQuestionTypeDomain queryQuestionTypeDomain;

    @Autowired
    QueryDifficultyDomain queryDifficultyDomain;

    @Autowired
    QueryStatusDomain queryStatusDomain;

    private static final Logger logger = Logger.getLogger(QuestionController.class.getName());

    @RequestMapping(method = RequestMethod.POST, value = "/exam/addQuestion")
    @ResponseBody
    public ResponseEntity<String> addQuestion(ModelMap model,
                                              @RequestParam(value = "categoryId", required = true) String catId,
                                              @RequestParam(value = "subCategoryName", required = true) String subCat,
                                              @RequestParam(value = "questionDesc", required = true) String qDesc,
                                              @RequestParam(value = "choiceDescArray", required = false) List<String> cDescList,
                                              @RequestParam(value = "correctChoice", required = false) Integer correctChoice,
                                              @RequestParam(value = "questionType", required = true) Integer questionTypeId,
                                              @RequestParam(value = "difficulty", required = true) Integer difficultyLevel,
                                              @RequestParam(value = "score", required = true) Float score
            , HttpServletRequest request, HttpServletResponse response) {


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Question question = new Question();

        question.setCreateBy(queryUserDomain.getCurrentUser(request));
        question.setDescription(qDesc);
        question.setCreateDate(DateUtil.getCurrentDateWithRemovedTime());
        question.setQuestionType(queryQuestionTypeDomain.getQuestionTypeById(questionTypeId));
        question.setDifficultyLevel(queryDifficultyDomain.getDifficultyByInteger(difficultyLevel));
        question.setScore(score);
        question.setSubCategory(querySubCategoryDomain.getSubCategoryByNameAndCategory(subCat, queryCategoryDomain.getCategoryById(catId)));
        question.setStatus(queryStatusDomain.getReadyStatus());

        queryQuestionDomain.insertQuestion(question, cDescList, correctChoice);

        Hibernate.initialize(question);
        String json = new JSONSerializer().exclude("*.class").serialize(question);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/exam/editQuestion")
    @ResponseBody
    public ResponseEntity<String> editQuestion(ModelMap model,
                                               @RequestParam(value = "questionId", required = true) Integer questionId,
                                               @RequestParam(value = "categoryId", required = true) String catId,
                                               @RequestParam(value = "subCategoryName", required = true) String subCatName,
                                               @RequestParam(value = "questionDesc", required = true) String qDesc,
                                               @RequestParam(value = "choiceDescArray", required = false) List<String> cDescList,
                                               @RequestParam(value = "correctChoice", required = false) Integer correctChoice,
                                               @RequestParam(value = "questionType", required = true) Integer questionTypeId,
                                               @RequestParam(value = "difficulty", required = true) Integer difficultyLevel,
                                               @RequestParam(value = "score", required = true) Float score
            , HttpServletRequest request, HttpServletResponse response) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Category category = queryCategoryDomain.getCategoryById(catId);

        SubCategory subCategory = querySubCategoryDomain.getSubCategoryByNameAndCategory(subCatName, category);
        QuestionType questionType = queryQuestionTypeDomain.getQuestionTypeById(questionTypeId);
        Difficulty difficulty = queryDifficultyDomain.getDifficultyByInteger(difficultyLevel);

        Question question = queryQuestionDomain.getQuestionById(questionId);

        List<Choice> choices = queryChoiceDomain.getChoiceListByQuestionId(question.getId());
        Question newQuestion = null;

        if (!(question.getDescription().equals(qDesc) && question.getScore().equals(score) &&
                question.getQuestionType().equals(questionType) && question.getDifficultyLevel().equals(difficulty) &&
                question.getSubCategory().equals(subCategory))) { //if question is edited

            if (question.getPapers().isEmpty()) { //if not used

                question.setSubCategory(subCategory);
                question.setDescription(qDesc);
                question.setQuestionType(questionType);
                question.setDifficultyLevel(difficulty);
                question.setScore(score);
                question.setUpdateDate(DateUtil.getCurrentDateWithRemovedTime());
                question.setUpdateBy(queryUserDomain.getCurrentUser(request));

                HibernateUtil.beginTransaction();

                queryChoiceDomain.deleteChoiceFromQuestion(question);
                queryChoiceDomain.insertAllChoice(question, cDescList, correctChoice);
                queryQuestionDomain.mergeQuestion(question);

                HibernateUtil.commitTransaction();
                HibernateUtil.closeSession();

            } else {

                question.setStatus(queryStatusDomain.getDeletedStatus());
                HibernateUtil.beginTransaction();
                queryQuestionDomain.mergeQuestion(question);

                HibernateUtil.commitTransaction();

                newQuestion = cloneQuestion(question, request);
                newQuestion.setDescription(qDesc);
                newQuestion.setScore(score);
                newQuestion.setQuestionType(questionType);
                newQuestion.setDifficultyLevel(difficulty);
                newQuestion.setSubCategory(subCategory);
                newQuestion.setStatus(queryStatusDomain.getReadyStatus());
                newQuestion.setUpdateBy(queryUserDomain.getCurrentUser(request));
                newQuestion.setUpdateDate(DateUtil.getCurrentDateWithRemovedTime());

                queryQuestionDomain.insertQuestion(newQuestion, cDescList, correctChoice);
            }
        } else {
            return new ResponseEntity<String>("question not edited", headers, HttpStatus.I_AM_A_TEAPOT);
        }

        String json;
        if (newQuestion == null) {
            json = new JSONSerializer().exclude("*.class").serialize(question);
        }else{
            json = new JSONSerializer().exclude("*.class").serialize(newQuestion);
        }

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getAllQuestion")
    @ResponseBody
    public ResponseEntity<String> getAllQuestion(ModelMap model
            , HttpServletRequest request, HttpServletResponse response) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Question> questions = queryQuestionDomain.getAllQuestion();
        String json = new JSONSerializer().exclude("*.class").serialize(questions);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getAllReadyQuestion")
    @ResponseBody
    public ResponseEntity<String> getAllReadyQuestion(ModelMap model
            , HttpServletRequest request, HttpServletResponse response) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Question> questions = queryQuestionDomain.getAllReadyQuestion();
        String json = new JSONSerializer().exclude("*.class").serialize(questions);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/deleteQuestion")
    @ResponseBody
    public void deleteQuestion(ModelMap model
            , @RequestParam(value = "questionArray", required = true) JSONArray questionIds
            , HttpServletRequest request, HttpServletResponse response) {
        for (int i = 0; i < questionIds.length(); i++) {
            Integer questionId = questionIds.optInt(i);
            queryQuestionDomain.deleteQuestion(questionId);
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getQuestionDetail")
    @ResponseBody
    public ResponseEntity<String> getQuestionDetail(ModelMap modelMap,
                                                    @RequestParam(value = "questionId", required = true) Integer questionId,
                                                    HttpServletRequest request, HttpServletResponse response) {
        Question question = queryQuestionDomain.getQuestionById(questionId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json1 = new JSONSerializer().include("choices").exclude("*.class").serialize(question);

        return new ResponseEntity<String>(json1, headers, HttpStatus.OK);
    }


    public Question cloneQuestion(Question question, HttpServletRequest request) {

        Question questionNew = new Question();
        questionNew.setDifficultyLevel(question.getDifficultyLevel());
        questionNew.setStatus(question.getStatus());
        questionNew.setCreateDate(question.getCreateDate());
        questionNew.setDescription(question.getDescription());
        questionNew.setScore(question.getScore());
        questionNew.setSubCategory(question.getSubCategory());
        questionNew.setQuestionType(question.getQuestionType());
        questionNew.setCreateBy(question.getCreateBy());

        return questionNew;
    }

    //    Add By Mr.Wanchana
    @RequestMapping(method = RequestMethod.POST, value = "/exam/generalQuestionSearch")
    @ResponseBody
    public ResponseEntity<String> generalQuestionSearch(@RequestBody String jsonObj) throws JSONException, ParseException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Integer> empNameSearch = new ArrayList<Integer>();
        List<Integer> qIdsNotSearch = new ArrayList<Integer>();

        String categorySearch = "";
        String subCategorySearch = "";
        String qDesc = "";
        String qCreateDateFrom = "";
        String qCreateDateTo = "";
        String qScoreFrom = "";
        String qScoreTo = "";
        Integer searchQEasy = 0;
        Integer searchQNormal = 0;
        Integer searchQHard = 0;

        JSONArray jsonArray = new JSONArray(jsonObj);
        JSONObject jObj = jsonArray.getJSONObject(0);
        String str = jObj.getString("allQuestionIdOnTableCreatePaper");
        String allQuestionIdOnTableCreatePaper = "";

        if(!str.equals("")){
            allQuestionIdOnTableCreatePaper = jObj.getString("allQuestionIdOnTableCreatePaper");
            JSONArray jsonArray2 = new JSONArray(allQuestionIdOnTableCreatePaper);
            for (int idx = 0; idx < jsonArray2.length(); idx++) {
                JSONObject jObj2 = jsonArray2.getJSONObject(idx);
                qIdsNotSearch.add(jObj2.getInt("qId"));
            }
        }

        Integer check = new Integer(jObj.getString("thFname"));
        Integer btnStatus = 0;

        if (check == 0) {
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            categorySearch = jsonObject.getString("categoryId");
            subCategorySearch = jsonObject.getString("subCategoryId");
            btnStatus = jsonObject.getInt("btnSearchStatus");

            qDesc = jsonObject.getString("questionDescriptionSearch");
            qCreateDateFrom = jsonObject.getString("questionCreateDateFromSearch");
            qCreateDateTo = jsonObject.getString("questionCreateDateToSearch");
            qScoreFrom = jsonObject.getString("questionScoreFromSearch");
            qScoreTo = jsonObject.getString("questionScoreToSearch");

            searchQEasy = jsonObject.getInt("searchQEasy");
            searchQNormal = jsonObject.getInt("searchQNormal");
            searchQHard = jsonObject.getInt("searchQHard");

        } else {
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                empNameSearch.add(new Integer(jsonObject.getString("thFname")));
                if (i == 0) {
                    categorySearch = jsonObject.getString("categoryId");
                    subCategorySearch = jsonObject.getString("subCategoryId");

                    qDesc = jsonObject.getString("questionDescriptionSearch");
                    qCreateDateFrom = jsonObject.getString("questionCreateDateFromSearch");
                    qCreateDateTo = jsonObject.getString("questionCreateDateToSearch");
                    qScoreFrom = jsonObject.getString("questionScoreFromSearch");
                    qScoreTo = jsonObject.getString("questionScoreToSearch");
                }
                btnStatus = jsonObject.getInt("btnSearchStatus");
            }
        }
        Integer subCategoryId = 0;
        if (empNameSearch.size() == 0) {
            empNameSearch = null;
        }

        if (!subCategorySearch.equals("")) {
            subCategoryId = querySubCategoryDomain.getSubCategoryIdByName(subCategorySearch);
        }
//        Check Search
        if (btnStatus == 0) {
            List<Question> questionsGeneralResult = queryQuestionDomain.generalSearchQuestion(empNameSearch, categorySearch, subCategoryId, qIdsNotSearch);
            String json = new JSONSerializer().include("choices").exclude("*.class").serialize(questionsGeneralResult);
            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        } else {
            int idx = 0;
            List<Question> questionsAdvanceResult = new ArrayList<Question>();
            if((searchQEasy == 0) && (searchQNormal == 0) && (searchQHard == 0)){
                questionsAdvanceResult = queryQuestionDomain.advanceSearchQuestion(empNameSearch, categorySearch, subCategoryId, qIdsNotSearch, qDesc,
                        qCreateDateFrom, qCreateDateTo, qScoreFrom, qScoreTo, searchQEasy, searchQNormal, searchQHard);
            }
            if(searchQEasy != 0){
                List<Question> tmp1 = queryQuestionDomain.advanceSearchQuestion(empNameSearch, categorySearch, subCategoryId, qIdsNotSearch, qDesc,
                        qCreateDateFrom, qCreateDateTo, qScoreFrom, qScoreTo, searchQEasy, 0, 0);
                if(searchQEasy <= tmp1.size()){
                    for(idx = 0; idx < searchQEasy; idx ++){
                        questionsAdvanceResult.add(tmp1.get(idx));
                    }
                }
                else{
                    return null;
                }
            }
            if(searchQNormal != 0){
                List<Question> tmp2 = queryQuestionDomain.advanceSearchQuestion(empNameSearch, categorySearch, subCategoryId, qIdsNotSearch, qDesc,
                        qCreateDateFrom, qCreateDateTo, qScoreFrom, qScoreTo, 0, searchQNormal, 0);
                if(searchQNormal <= tmp2.size()){
                    for(idx = 0; idx < searchQNormal; idx ++){
                        questionsAdvanceResult.add(tmp2.get(idx));
                    }
                }
                else{
                    return null;
                }
            }
            if(searchQHard != 0){
                List<Question> tmp3 = queryQuestionDomain.advanceSearchQuestion(empNameSearch, categorySearch, subCategoryId, qIdsNotSearch, qDesc,
                        qCreateDateFrom, qCreateDateTo, qScoreFrom, qScoreTo, 0, 0, searchQHard);
                if(searchQHard <= tmp3.size()){
                    for(idx = 0; idx < searchQHard; idx ++){
                        questionsAdvanceResult.add(tmp3.get(idx));
                    }
                }
                else{
                    return null;
                }
            }
            String json = new JSONSerializer().include("choices").exclude("*.class").serialize(questionsAdvanceResult);
            return new ResponseEntity<String>(json, headers, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getAllQuestionDetail")
    @ResponseBody
    public ResponseEntity<String> getAllQuestionDetail() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Question> questions = queryQuestionDomain.getAllQuestionDetail();
        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(questions);
        logger.info(questions.toString());

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/getQuestionNotInSelected")
    @ResponseBody
    public ResponseEntity<String> getQuestionNotInSelected(@RequestBody String jsoN) throws JSONException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray(jsoN);
        List questionIds = new ArrayList();
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            questionIds.add(jsonObject.getInt("id"));
        }
        List<Question> questions = queryQuestionDomain.getQuestionNotInSelected(questionIds);
        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(questions);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/randomQuestions", method= RequestMethod.POST)
    public ResponseEntity<String> randExamPaper(@RequestBody String obj) throws JSONException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List questions = new ArrayList();
        List qIds = new ArrayList();
        int randEasy = 0;
        int randNormal = 0;
        int randHard = 0;
        int i = 0;
        int subCategoryId = 0;
        String json = "";
        String categoryId = "";
        String subCategoryName = "";

        JSONArray jsonArray = new JSONArray(obj);
        for(int index = 0; index < jsonArray.length(); index++){
            JSONObject jsonObject = jsonArray.getJSONObject(index);
            if(index == 0){
                randEasy = jsonObject.getInt("randEasy");
                randNormal = jsonObject.getInt("randNormal");
                randHard = jsonObject.getInt("randHard");
                categoryId = jsonObject.getString("categoryId");
                subCategoryName = jsonObject.getString("subCategoryId");
            }
            qIds.add(new Integer(jsonObject.getInt("qid")));
        }

        if(!subCategoryName.equals("")){
            subCategoryId = querySubCategoryDomain.getSubCategoryIdByName(subCategoryName);
        }

        if(randEasy != 0){
            List index = new ArrayList();
            List<Question> questionsEasy = queryQuestionDomain.getQuestionsByLevel(1, qIds, categoryId, subCategoryId);
            if(questionsEasy.size() >= randEasy){
                for(i = 0; i < questionsEasy.size(); i ++){
                    index.add(i);
                }
                for(int j = 0; j < randEasy; j ++){
                    Collections.shuffle(index);
                    questions.add(questionsEasy.get((Integer) index.get(0)));
                    index.remove(0);
                }
            }
            else{
                String str = "easy#";
                int count = questionsEasy.size();
                str = str + count;
                questions.add(str);
            }
        }
        if(randNormal != 0){
            List index2 = new ArrayList();
            List<Question> questionsNormal = queryQuestionDomain.getQuestionsByLevel(2, qIds, categoryId, subCategoryId);
            if(questionsNormal.size() >= randNormal){
                for(i = 0; i < questionsNormal.size(); i ++){
                    index2.add(i);
                }
                for(int j = 0; j < randNormal; j ++){
                    Collections.shuffle(index2);
                    questions.add(questionsNormal.get((Integer) index2.get(0)));
                    index2.remove(0);
                }
            }
            else{
                String str = "normal#";
                int count = questionsNormal.size();
                str = str + count;
                questions.add(str);
            }
        }
        if(randHard != 0){
            List index3 = new ArrayList();
            List<Question> questionsHard = queryQuestionDomain.getQuestionsByLevel(3, qIds, categoryId, subCategoryId);
            if(questionsHard.size() >= randHard){
                for(i = 0; i < questionsHard.size(); i ++){
                    index3.add(i);
                }
                for(int j = 0; j < randHard; j ++){
                    Collections.shuffle(index3);
                    questions.add(questionsHard.get((Integer) index3.get(0)));
                    index3.remove(0);
                }
            }
            else{
                String str = "hard#";
                int count = questionsHard.size();
                str = str + count;
                questions.add(str);
            }
        }
        if((randEasy == 0) && (randHard == 0) && (randNormal == 0)){
            List<Question> questionList = queryQuestionDomain.getQuestionsByLevel(0, qIds, categoryId, subCategoryId);
            for(Object idx: questionList){
                questions.add(idx);
            }
        }

        json = new JSONSerializer().include("choices").exclude("*.class").serialize(questions);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/countQuestionReady", method= RequestMethod.POST)
    @ResponseBody
    public String countQuestionReady(@RequestParam(value = "qIds", required = false) String qIds,
                                     @RequestParam(value = "subCatIds", required = false) String subCatIds,
                                     @RequestParam(value = "catId", required = false) String catId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        String str = "";
        int i;
        List qIdList = null;
        List subCatList = null;

        if(qIds != null){
            qIdList = new ArrayList();
            JSONArray jsonArray = new JSONArray(qIds);
            for(i = 0; i < jsonArray.length(); i ++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                qIdList.add(jsonObject.getInt("qId"));
            }
        }

        if(subCatIds != null){
            subCatList = new ArrayList();
            JSONArray jsonArray = new JSONArray(subCatIds);
            for(i = 0; i < jsonArray.length(); i ++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                subCatList.add(jsonObject.getString("subId"));
            }
        }

        for(i = 1; i < 4; i ++){
            Difficulty difficulty = queryDifficultyDomain.getDifficultyByInteger(i);
            Integer numb = queryQuestionDomain.countQuestionReady(difficulty, qIdList, subCatList, catId);
            str = str + "#" + numb;
        }

        return str;
    }

    // ---------------------------------------------------------------------------------------------------------
    @RequestMapping(method = RequestMethod.POST, value = "/exam/searchQuestion")
    @ResponseBody
    public ResponseEntity<String> searchQuestion(
            @RequestParam(value = "categoryId", required = false) String catId,
            @RequestParam(value = "subCatName", required = false) String subCatName,
            @RequestParam(value = "createBy", required = false) JSONArray createByJsonArray,
            @RequestParam(value = "questionDesc", required = false) String questionDesc,
            @RequestParam(value = "createDateFrom", required = false) String createDateFrom,
            @RequestParam(value = "createDateTo", required = false) String createDateTo,
            @RequestParam(value = "scoreFrom", required = false) String scoreFrom,
            @RequestParam(value = "scoreTo", required = false) String scoreTo,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "itemOnPage", required = false) Integer maxRows,
            @RequestParam(value = "orderBy", required = false) String orderBy,
            @RequestParam(value = "orderType", required = false) String orderType,
            HttpServletRequest request, HttpServletResponse response
    ) {
        List<Question> questions = queryQuestionDomain.searchQuestionQuery(
                catId, subCatName, createByJsonArray, null,
                questionDesc, createDateFrom, createDateTo,
                scoreFrom, scoreTo, null, orderBy, orderType
        );
        Integer rowCounts = questions.size();

        if (orderBy != null && orderBy.equals("date")) {
            questions = sortByDate(questions, orderType);
        }

        Integer startPoint = 1;
        if(page != 1){
            startPoint = (page-1)*maxRows;
        }
        Integer endPoint = startPoint+maxRows;
        if(endPoint > rowCounts){
            endPoint = rowCounts+1;
        }

        List<Question> questionsSubList = questions.subList(startPoint-1,endPoint-1);

        List<SearchQuestionReturnObject> returnObjects = new ArrayList<SearchQuestionReturnObject>();

        for (Question q : questionsSubList) {
            HibernateUtil.getSession().refresh(q);
            SearchQuestionReturnObject returnObject = new SearchQuestionReturnObject(q, rowCounts);
            returnObjects.add(returnObject);
        }

        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(returnObjects);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    public List<Question> sortByDate(List<Question> qList, String orderType) {

        int offset, startValue, endValue, j = 0;
        boolean swapped = true;
        Question tmp;
        Date bestDate;

        if (orderType != null && orderType.equals("asc")) {
            offset = 1;
            startValue = 0;
            endValue = qList.size();
        } else {
            offset = -1;
            startValue = qList.size();
            endValue = 0;
        }

        while (swapped) {

            swapped = false;
            j += offset;

            for (int i = startValue; i < endValue - j; i += offset) {

                if (qList.get(i).getBestDate().after(qList.get(i + 1).getBestDate())) {

                    tmp = qList.get(i);
                    qList.set(i, qList.get(i + offset));
                    qList.set(i + offset, tmp);

                    swapped = true;
                }
            }
        }

        return qList;
    }

}

class SearchQuestionReturnObject{
    private Integer id;
    private String description;
    private SubCategory subCategory;
    private User createBy;
    private Date createDate;
    private Date updateDate;
    private User updateBy;
    private Float score;
    private Integer itemCount;
    private QuestionType questionType;

    public SearchQuestionReturnObject(Question q, Integer itemCount) {
        this.id = q.getId();
        this.description = q.getDescription();
        this.subCategory = q.getSubCategory();
        this.createBy = q.getCreateBy();
        this.createDate = q.getCreateDate();
        this.updateDate = q.getUpdateDate();
        this.updateBy = q.getUpdateBy();
        this.score = q.getScore();
        this.itemCount = itemCount;
        this.questionType = q.getQuestionType();
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public Integer getItemCount() {
        return itemCount;
    }

    public void setItemCount(Integer itemCount) {
        this.itemCount = itemCount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public User getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(User updateBy) {
        this.updateBy = updateBy;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}
