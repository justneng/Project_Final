package com.springapp.mvc.domain.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryQuestionDomain extends HibernateUtil {

    @Autowired
    QueryChoiceDomain queryChoiceDomain;
    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;
    @Autowired
    QueryStatusDomain queryStatusDomain;
    @Autowired
    QueryCategoryDomain queryCategoryDomain;
    @Autowired
    QueryUserDomain queryUserDomain;
    @Autowired
    QueryDifficultyDomain queryDifficultyDomain;


    private static final Logger logger = Logger.getLogger(QueryQuestionDomain.class.getName());

    public void insertQuestion(Question question, List<String> cDesc, Integer correctChoice) {
        beginTransaction();
        getSession().save(question);

//        getSession().flush();

        if (question.getQuestionType().getId() == 1) {
            queryChoiceDomain.insertAllChoice(question, cDesc, correctChoice);
        }
        commitTransaction();

        closeSession();
    }

    public List<Question> getAllQuestion() {
        Criteria criteria = getSession().createCriteria(Question.class, "q");

        criteria.createAlias("q.createBy", "createBy");
//        criteria.createAlias("q.subCategory.category","category");
        criteria.createAlias("q.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.createAlias("q.questionType", "questionType");
        criteria.createAlias("q.status", "status");
        criteria.createAlias("q.difficultyLevel", "difficulty");
//        criteria.createAlias("","");

        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("createBy.userName"), "createByEmpId");
        projectionList.add(Projections.property("q.id"), "id");
        projectionList.add(Projections.property("q.description"), "description");
        projectionList.add(Projections.property("q.score"), "score");
        projectionList.add(Projections.property("q.createDate"), "createDate");
        projectionList.add(Projections.property("difficulty.description"), "difficultyDesc");
        projectionList.add(Projections.property("category.name"), "categoryName");
        projectionList.add(Projections.property("subCategory.name"), "subCategoryName");
        projectionList.add(Projections.property("questionType.description"), "questionTypeDesc");
        projectionList.add(Projections.property("status.id"), "statusId");
//        projectionList.add(Projections.property(""),"");

        criteria.setProjection(projectionList);


        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Question> questions = criteria.list();

        return questions;
    }

    public List<Question> getAllReadyQuestion() {
        Criteria criteria = getSession().createCriteria(Question.class, "q");
        criteria.add(Restrictions.eq("status", queryStatusDomain.getReadyStatus()));

        criteria.createAlias("q.createBy", "createBy");
//        criteria.createAlias("q.subCategory.category","category");
        criteria.createAlias("q.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.createAlias("q.questionType", "questionType");
        criteria.createAlias("q.status", "status");
        criteria.createAlias("q.difficultyLevel", "difficulty");
//        criteria.createAlias("","");

        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("createBy.userName"), "createByEmpId");
        projectionList.add(Projections.property("q.id"), "id");
        projectionList.add(Projections.property("q.description"), "description");
        projectionList.add(Projections.property("q.score"), "score");
        projectionList.add(Projections.property("q.createDate"), "createDate");
        projectionList.add(Projections.property("difficulty.description"), "difficultyDesc");
        projectionList.add(Projections.property("category.name"), "categoryName");
        projectionList.add(Projections.property("subCategory.name"), "subCategoryName");
        projectionList.add(Projections.property("questionType.description"), "questionTypeDesc");
        projectionList.add(Projections.property("status.id"), "statusId");
//        projectionList.add(Projections.property(""),"");
        criteria.addOrder(Order.asc("q.id"));
        criteria.setProjection(projectionList);

        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Question> questions = criteria.list();

        return questions;
    }

    public Question getQuestionById(Integer id) {
        Criteria criteria = getSession().createCriteria(Question.class);
        criteria.add(Restrictions.eq("id", id));
        return (Question) criteria.uniqueResult();
    }

    public void deleteQuestion(Integer id) {
        Question question = getQuestionById(id);
        if (question.getPapers().isEmpty()) {
            beginTransaction();
            getSession().delete(question);
            commitTransaction();
            closeSession();
        } else {
            question.setStatus(queryStatusDomain.getDeletedStatus());
            beginTransaction();
            getSession().merge(question);
            commitTransaction();
            closeSession();
        }
    }

    public List<Question> searchQuestionQuery(String categoryId, String subCategoryName,
                                              JSONArray createByJsonArray, String questionId,
                                              String questionDesc, String createDateFrom,
                                              String createDateTo, String scoreFrom,
                                              String scoreTo, Integer statusId, String orderBy,String orderType) {

        Criteria criteria = getSession().createCriteria(Question.class, "q");
        criteria.createAlias("q.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.createAlias("q.createBy", "createBy");
        criteria.createAlias("q.status", "status");
        criteria.createAlias("q.difficultyLevel", "difficulty");
        criteria.createAlias("q.questionType", "questionType");
//        criteria.addOrder(Order.asc("subCategory.category")).addOrder(Order.asc("subCategory")).addOrder(Order.asc("id")).addOrder(Order.asc("difficulty.level"));
        if (categoryId != null && categoryId != "") {
            Category category = queryCategoryDomain.getCategoryById(categoryId);
            criteria.add(Restrictions.eq("subCategory.category", category));

        }
        if (subCategoryName != null && subCategoryName != "") {
            criteria.add(Restrictions.in("subCategory", querySubCategoryDomain.getSubCategoryByName(subCategoryName)));
        }

        if (createByJsonArray != null && createByJsonArray.length() != 0) {
            try {
                List<Integer> userIds = new ArrayList<Integer>();
                for (int i = 0; i < createByJsonArray.length(); i++) {
                    userIds.add(createByJsonArray.optInt(i));
                }

                criteria.add(Restrictions.in("createBy.userId", userIds));

            } catch (NumberFormatException ne) {
                ne.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (questionId != null && questionId.trim().length() != 0) {
            try {
                criteria.add(Restrictions.eq("q.id", Integer.parseInt(questionId)));
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        if (questionDesc != null && questionDesc.trim().length() != 0) {
            criteria.add(Restrictions.ilike("q.description", "%" + questionDesc + "%"));
        }
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        if (createDateFrom != null && createDateFrom.trim().length() != 0) {
            Date dateFrom = null;
            try {
                dateFrom = format.parse(createDateFrom);
                dateFrom = DateUtil.getDateWithRemovedTime(dateFrom);
                Criterion createDateCriterion = Restrictions.ge("q.createDate", dateFrom);
//                Criterion updateDateCriterion = Restrictions.ge("q.updateDate", dateFrom);
//                criteria.add(Restrictions.or(createDateCriterion, updateDateCriterion));
                criteria.add(createDateCriterion);

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        if (createDateTo != null && createDateTo.trim().length() != 0) {
            Date dateTo = null;
            try {
                dateTo = format.parse(createDateTo);
                dateTo = DateUtil.getDateWithRemovedTime(dateTo);
                Criterion createDateCriterion = Restrictions.le("q.createDate", dateTo);
//                Criterion updateDateCriterion = Restrictions.le("q.updateDate", dateTo);
//                criteria.add(Restrictions.or(createDateCriterion, updateDateCriterion));
                criteria.add(createDateCriterion);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (scoreFrom != null && scoreFrom.trim().length() != 0) {
            criteria.add(Restrictions.ge("q.score", Float.parseFloat(scoreFrom)));
        }
        if (scoreTo != null && scoreTo.trim().length() != 0) {
            criteria.add(Restrictions.le("q.score", Float.parseFloat(scoreTo)));
        }
        if (statusId != null) {
            criteria.add(Restrictions.eq("status.id", statusId));
        } else {
            criteria.add(Restrictions.eq("status.id", 3));
        }

//        if (page != null && page > 0) {
//            if (maxRows != null && maxRows > 0) {
//                if (page - 1 == 0) {
//                    criteria.setFirstResult(1);
//                } else {
//                    criteria.setFirstResult((page - 1) * maxRows);
//                }
//                criteria.setMaxResults(maxRows);
//            }
//        }
        Order order = null;
        Boolean isAsc = false;
        if(orderType != null){
            if(orderType.equals("asc")){
                isAsc = true;
            }
        }

        if(orderBy != null ){
            if(!orderBy.equals("id")){
                if(orderBy.equals("category")){
                    if(!isAsc){
                        order = Order.desc("category.name");
                    }else{
                        order = Order.asc("category.name");
                    }
                }else if(orderBy.equals("subCategory")){
                    if(!isAsc){
                        order = Order.desc("subCategory.name");
                    }else{
                        order = Order.asc("subCategory.name");
                    }
                }else if(orderBy.equals("qType")){
                    if(!isAsc){
                        order = Order.desc("questionType");
                    }else{
                        order = Order.asc("questionType");
                    }
                }else if(orderBy.equals("date")){
                    if(!isAsc){
                        //sort in QuestionController
                    }else{
                        //sort in QuestionController
                    }
                }else if(orderBy.equals("createBy")){
                    if(!isAsc){
                        order = Order.desc("createBy.thFname");
                    }else{
                        order = Order.asc("createBy.thFname");
                    }
                }else if(orderBy.equals("score")){
                    if(!isAsc){
                        order = Order.desc("q.score");
                    }else{
                        order = Order.asc("q.score");
                    }
                }else if(orderBy.equals("qDesc")){
                    if(!isAsc){
                        order = Order.desc("q.description");
                    }else{
                        order = Order.asc("q.description");
                    }
                }
            }
        }
        if(order != null){
            criteria.addOrder(order);
        }
        if(orderBy.equals("id") && orderType.equals("asc")){
            criteria.addOrder(Order.asc("q.id"));
        }else{
            criteria.addOrder(Order.desc("q.id"));
        }


        List<Question> resultList = criteria.list();
//        for (Question q : resultList) {
//            getSession().refresh(q);
//        }

        return resultList;
    }

    public void mergeQuestion(Question question) {
        getSession().merge(question);
//        getSession().saveOrUpdate(question);
//        getSession().refresh(question);
    }


//    Add by Mr.Wanchana

    public List<Question> getAllQuestionDetail() {

        Criteria criteria = getSession().createCriteria(Question.class);
        criteria.add(Restrictions.ne("status.id", 4));

        List<Question> questions = criteria.list();
        return questions;
    }

    public List<Question> getQuestionNotInSelected(List qId) {

        Criteria criteria = getSession().createCriteria(Question.class);
        criteria.add(Restrictions.not(Restrictions.in("id", qId)));
        criteria.add(Restrictions.ne("status.id", 4));

        List<Question> questions = criteria.list();

        return questions;
    }

    public List<Question> getQuestionListByPaper(ExamPaper ep) {

        Criteria criteria = getSession().createCriteria(PaperQuestion.class);
        criteria.add(Restrictions.eq("pk.examPaper", ep));

        List<PaperQuestion> paperQuestions = criteria.list();
        List<Question> questions = new ArrayList<Question>();

        for (PaperQuestion p : paperQuestions) {
            questions.add(p.getQuestion());
        }

        return questions;
    }

    public List<Question> generalSearchQuestion(List users, String catId, Integer subId, List<Integer> qIds) {

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("question.createBy", "createBy");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.ne("status.id", 4));

//        if (users != null) {
//            criteria.add(Restrictions.in("createBy.id", users));
//        }
        if (catId != "") {
            Criterion criterion1 = Restrictions.like("category.id", "%" + catId + "%").ignoreCase();
            Criterion criterion2 = Restrictions.like("category.name", "%" + catId + "%").ignoreCase();
            criteria.add(Restrictions.or(criterion1, criterion2));
        }
        if (subId != 0) {
            criteria.add(Restrictions.eq("subCategory.id", subId));
        }
        if (qIds.size() != 0) {
            criteria.add(Restrictions.not(Restrictions.in("id", qIds)));
        }

        List<Question> questions = criteria.list();

        return questions;
    }

    public List<Question> advanceSearchQuestion(List users, String catId, Integer subId, List<Integer> qIds, String qDesc
            , String qCreateDateFrom, String qCreateDateTo, String qScoreFrom
            , String qScoreTo, Integer searchQEasy, Integer searchQNormal, Integer searchQHard) throws ParseException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
        Date dateFrom = null;
        Date dateTo = null;
        if (!qCreateDateFrom.equals("")) {
            dateFrom = simpleDateFormat.parse(qCreateDateFrom);
        }
        if (!qCreateDateTo.equals("")) {
            dateTo = simpleDateFormat.parse(qCreateDateTo);
        }
        Float scoreFrom = null;
        Float scoreTo = null;

        if (!qScoreFrom.equals("")) {
            scoreFrom = Float.parseFloat(qScoreFrom);
        }
        if (!qScoreTo.equals("")) {
            scoreTo = Float.parseFloat(qScoreTo);
        }

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.difficultyLevel", "difficulty");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("question.createBy", "createBy");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.ne("status.id", 4));

        if (users != null) {
            criteria.add(Restrictions.in("createBy.id", users));
        }
        if (catId != "") {
            Criterion criterion1 = Restrictions.like("category.id", "%" + catId + "%").ignoreCase();
            Criterion criterion2 = Restrictions.like("category.name", "%" + catId + "%").ignoreCase();
            criteria.add(Restrictions.or(criterion1, criterion2));
        }
        if (subId != 0) {
            criteria.add(Restrictions.eq("subCategory.id", subId));
        }
        if (qIds.size() != 0) {
            criteria.add(Restrictions.not(Restrictions.in("id", qIds)));
        }
        if (!qDesc.equals("")) {
            criteria.add(Restrictions.like("description", "%" + qDesc + "%"));
        }
        if (!qCreateDateFrom.equals("")) {
            criteria.add(Restrictions.ge("createDate", dateFrom));
        }
        if (!qCreateDateTo.equals("")) {
            criteria.add(Restrictions.le("createDate", dateTo));
        }
        if (!qScoreFrom.equals("")) {
            criteria.add(Restrictions.ge("score", scoreFrom));
        }
        if (!qScoreTo.equals("")) {
            criteria.add(Restrictions.le("score", scoreTo));
        }
        if (searchQEasy != 0) {
            criteria.add(Restrictions.eq("difficulty.level", 1));
        }
        if (searchQNormal != 0) {
            criteria.add(Restrictions.eq("difficulty.level", 2));
        }
        if (searchQHard != 0) {
            criteria.add(Restrictions.eq("difficulty.level", 3));
        }

        List<Question> tmp = criteria.list();
        List<Question> tmp1 = new ArrayList<Question>();
        List<Question> tmp2 = new ArrayList<Question>();
        List<Question> tmp3 = new ArrayList<Question>();
        Difficulty difficulty1 = queryDifficultyDomain.getDifficultyByInteger(1);
        Difficulty difficulty2 = queryDifficultyDomain.getDifficultyByInteger(2);
        Difficulty difficulty3 = queryDifficultyDomain.getDifficultyByInteger(3);
        List<Question> questions = new ArrayList();

        if (searchQEasy != 0 || searchQNormal != 0 || searchQHard != 0) {
            int i;
            for (i = 0; i < tmp.size(); i++) {
                if (tmp.get(i).getDifficultyLevel().equals(difficulty1)) {
                    tmp1.add(tmp.get(i));
                }
                if (tmp.get(i).getDifficultyLevel().equals(difficulty2)) {
                    tmp2.add(tmp.get(i));
                }
                if (tmp.get(i).getDifficultyLevel().equals(difficulty3)) {
                    tmp3.add(tmp.get(i));
                }
            }
        }
        if (searchQEasy != 0) {
            return tmp1;
        } else if (searchQNormal != 0) {
            return tmp2;
        } else if (searchQHard != 0) {
            return tmp3;
        } else {
            return tmp;
        }
    }

    public List<Question> getQuestionsByLevel(Integer level, List qIds, String categoryId, int subCategoryId) {

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.ne("status.id", 4));

        if (level != 0) {
            criteria.add(Restrictions.eq("difficultyLevel.level", level));
        }

        if (qIds != null) {
            criteria.add(Restrictions.not(Restrictions.in("question.id", qIds)));
        }

        if (categoryId != "") {
            Criterion criterion1 = Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase();
            Criterion criterion2 = Restrictions.like("category.name", "%" + categoryId + "%").ignoreCase();
            criteria.add(Restrictions.or(criterion1, criterion2));
        }
        if (subCategoryId != 0) {
            criteria.add(Restrictions.eq("subCategory.id", subCategoryId));
        }

        List<Question> question = criteria.list();

        return question;
    }

    public Integer countQuestionReady(Difficulty difficulty, List qIds, List subNames, String catId){

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.difficultyLevel", "difficultyLevel");
        criteria.createAlias("question.status", "status");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");

        criteria.add(Restrictions.eq("difficultyLevel", difficulty));
        criteria.add(Restrictions.ne("status.id", 4));

        if(qIds != null){
            criteria.add(Restrictions.not(Restrictions.in("id", qIds)));
        }

        if(catId != null){
            criteria.add(Restrictions.eq("category.id", catId));
        }

        if(subNames != null){
            criteria.add(Restrictions.in("subCategory.name", subNames));
            criteria.add(Restrictions.eq("category.id", catId));
        }

        List<Question> questions = criteria.list();

        return questions.size();
    }

    public List<Question> getQuestionByCategoryId(String categoryId){

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.eq("category.id", categoryId));
        List<Question> questions = criteria.list();

        return questions;
    }

    public List<Question> getQuestionsObjectBy(String categoryId){

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.createAlias("question.questionType", "questionType");
        criteria.add(Restrictions.eq("category.id", categoryId));
        criteria.add(Restrictions.eq("questionType.id", 1));
        List<Question> questions = criteria.list();

        return questions;
    }

    public static int countQuestionsInCategory(String categoryId){
        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.createAlias("question.subCategory", "subcategory");
        criteria.createAlias("question.questionType", "questionType");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.eq("category.id", categoryId));
        criteria.add(Restrictions.ne("status.id", 4));
        criteria.add(Restrictions.eq("questionType.id", 1));

        int numberOfQuestions = criteria.list().size();
        if(numberOfQuestions > 0) {
            return numberOfQuestions;
        }
        else{
            return 0;
        }
    }

    public List<Question> orderQuestions(List questionIds, String orderBy, String orderType){

        Criteria criteria = getSession().createCriteria(Question.class, "question");
        criteria.add(Restrictions.in("id", questionIds));
        criteria.createAlias("question.difficultyLevel", "difficultyLevel");
        criteria.createAlias("question.status", "status");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.createAlias("question.questionType", "questionType");
        criteria.add(Restrictions.ne("status.id", 4));

        if(orderType.equals("asc")){
            if(orderBy.equals("category")){
                criteria.addOrder(Order.asc("category.name"));
            }
            if(orderBy.equals("subcategory")){
                criteria.addOrder(Order.asc("subCategory.name"));
            }
            if(orderBy.equals("description")){
                criteria.addOrder(Order.asc("description"));
            }
            if(orderBy.equals("type")){
                criteria.addOrder(Order.asc("questionType.description"));
            }
            if(orderBy.equals("level")){
                criteria.addOrder(Order.asc("difficultyLevel.description"));
            }
            if(orderBy.equals("score")){
                criteria.addOrder(Order.asc("score"));
            }
        }

        if(orderType.equals("desc")){
            if(orderBy.equals("category")){
                criteria.addOrder(Order.desc("category.name"));
            }
            if(orderBy.equals("subcategory")){
                criteria.addOrder(Order.desc("subCategory.name"));
            }
            if(orderBy.equals("description")){
                criteria.addOrder(Order.desc("description"));
            }
            if(orderBy.equals("type")){
                criteria.addOrder(Order.desc("questionType.description"));
            }
            if(orderBy.equals("level")){
                criteria.addOrder(Order.desc("difficultyLevel.description"));
            }
            if(orderBy.equals("score")){
                criteria.addOrder(Order.desc("score"));
            }
        }

        List<Question> quetions = criteria.list();

        return quetions;
    }
}
