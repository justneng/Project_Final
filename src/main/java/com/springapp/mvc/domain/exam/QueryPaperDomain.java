package com.springapp.mvc.domain.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryPaperDomain extends HibernateUtil {

    @Autowired
    QueryStatusDomain queryStatusDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    public ExamPaper getPaperById(Integer paperId) {
        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.eq("id", paperId));

        return (ExamPaper) criteria.uniqueResult();
    }

    //    Add By Mr.Wanchana
    public ExamPaper getPaperByCode(String code){

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.eq("code", code));
        criteria.add(Restrictions.ne("paperStatus.id", 4));
//        criteria.add(Restrictions.ne("createBy", null));

        if(criteria.list().size() > 0){
            return (ExamPaper) criteria.list().get(0);
        }
        else{
            return null;
        }
    }

    public void createPaper(ExamPaper examPaper, List<Integer> qIds, List<Float> newScores) {

        HibernateUtil.beginTransaction();
        getSession().save(examPaper);

        QueryQuestionDomain queryQuestionDomain = new QueryQuestionDomain();
        for (int i = 0; i < qIds.size(); i++) {
            PaperQuestion paperQuestion = new PaperQuestion();
            paperQuestion.setExamPaper(examPaper);
            paperQuestion.setQuestion(queryQuestionDomain.getQuestionById(qIds.get(i)));
            paperQuestion.setScore(newScores.get(i));
            getSession().save(paperQuestion);
        }

        HibernateUtil.commitTransaction();
        HibernateUtil.closeSession();
    }

    public void updatePaper(List<Integer> qIds, List<Float> newScores, Integer paperId, User updateBy, String paperCode, String paperName, Float paperMaxScore, Date updateDate, Integer paperTime, Status paperStatus, Position paperForPosition){

        QueryPaperDomain queryPaperDomain = new QueryPaperDomain();
        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);

        HibernateUtil.beginTransaction();
        Criteria criteria = getSession().createCriteria(PaperQuestion.class);
        criteria.add(Restrictions.eq("pk.examPaper", examPaper));
        List<PaperQuestion> paperQuestions = criteria.list();
        for (int i = 0; i < paperQuestions.size(); i++) {
            getSession().delete(paperQuestions.get(i));
        }

        QueryQuestionDomain queryQuestionDomain = new QueryQuestionDomain();
        for (int i = 0; i < qIds.size(); i++) {
            PaperQuestion paperQuestion = new PaperQuestion();
            paperQuestion.setExamPaper(examPaper);
            paperQuestion.setQuestion(queryQuestionDomain.getQuestionById(qIds.get(i)));
            paperQuestion.setScore(newScores.get(i));
            getSession().save(paperQuestion);
        }

        examPaper.setUpdateBy(updateBy);
        examPaper.setCode(paperCode);
        examPaper.setName(paperName);
        examPaper.setMaxScore(paperMaxScore);
        examPaper.setUpdateDate(updateDate);
        examPaper.setTimeLimit(paperTime);
        examPaper.setPaperStatus(paperStatus);

        if (paperForPosition != null) {
            examPaper.setPosition(paperForPosition);
        }
        else{
            examPaper.setPosition(null);
        }

        getSession().merge(examPaper);

        HibernateUtil.commitTransaction();
        HibernateUtil.closeSession();
    }

    public List<ExamPaper> getAllPapers() {
        HibernateUtil.getSession().flush();
        HibernateUtil.beginTransaction();
        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.ne("code", "SYSTM"));
        criteria.addOrder(Order.asc("id"));
        List<ExamPaper> papers = criteria.list();
        HibernateUtil.commitTransaction();
        HibernateUtil.closeSession();

        return papers;
    }

    public void deletePaper(List paperId) {

        QueryPaperDomain queryPaperDomain = new QueryPaperDomain();

        HibernateUtil.beginTransaction();
        try {
            for (int i = 0; i < paperId.size(); i++) {
                ExamPaper examPaper = queryPaperDomain.getPaperById((Integer) paperId.get(i));
                if(queryExamRecordDomain.checkExamRecordInUse((Integer) paperId.get(i)) == true){
                    examPaper.setPaperStatus(queryStatusDomain.getDeletedStatus());
                    getSession().merge(examPaper);
                }
                else{
                    getSession().delete(examPaper);
                }
            }
            HibernateUtil.commitTransaction();

        } catch (Exception e) {
            System.out.println("==========Error while delete papers==========");
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }
    }

    public void updatePaperStatus(ExamPaper examPaper){
        HibernateUtil.getSession().flush();
        HibernateUtil.beginTransaction();
        getSession().merge(examPaper);
        HibernateUtil.commitTransaction();
    }

    public List<ExamPaper> generalSearchPaper(List empIds, String code, String name) {

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
//        if (empIds != null) {
//            criteria.add(Restrictions.in("createBy.userId", empIds));
//        }
        if (!code.equals("")) {
            criteria.add(Restrictions.like("code", "%" + code + "%").ignoreCase());
        }
        if (!name.equals("")) {
            criteria.add(Restrictions.like("name", "%" + name + "%").ignoreCase());
        }
        criteria.addOrder(Order.asc("id"));
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.ne("code", "SYSTM"));

        List<ExamPaper> papers = criteria.list();

        for(ExamPaper examPaper : papers){
            getSession().refresh(examPaper);
        }

        return papers;
    }

    public List<ExamPaper> advanceSearchPaper(List empIds, String code, String name, String createDateFrom, String createDateTo, String scoreFrom, String scoreTo, String paperStatus) throws ParseException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
        Date dateFrom = null;
        Date dateTo = null;
        if (!createDateFrom.equals("")) {
            dateFrom = simpleDateFormat.parse(createDateFrom);
        }
        if (!createDateTo.equals("")) {
            dateTo = simpleDateFormat.parse(createDateTo);
        }
        Float sFrom = null;
        Float sTo = null;

        if (!scoreFrom.equals("")) {
            sFrom = new Float(scoreFrom);
        }
        if (!scoreTo.equals("")) {
            sTo = new Float(scoreTo);
        }

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        if (empIds != null) {
            criteria.add(Restrictions.in("createBy.id", empIds));
        }
        if (!code.equals("")) {
            criteria.add(Restrictions.like("code", "%" + code + "%").ignoreCase());
        }
        if (!name.equals("")) {
            criteria.add(Restrictions.like("name", "%" + name + "%").ignoreCase());
        }
        if (!createDateFrom.equals("")) {
            criteria.add(Restrictions.ge("createDate", dateFrom));
        }
        if (!createDateTo.equals("")) {
            criteria.add(Restrictions.le("createDate", dateTo));
        }
        if (!scoreFrom.equals("")) {
            criteria.add(Restrictions.ge("maxScore", sFrom));
        }
        if (!scoreTo.equals("")) {
            criteria.add(Restrictions.le("maxScore", sTo));
        }
        if (!paperStatus.equals("")) {
            Integer pStatus = new Integer(paperStatus);
            if (pStatus != 0) {
                criteria.add(Restrictions.eq("paperStatus.id", new Integer(paperStatus)));
            }
        }
        criteria.addOrder(Order.asc("id"));
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.ne("code", "SYSTM"));

        List<ExamPaper> papers = criteria.list();

        for(ExamPaper examPaper : papers){
            getSession().refresh(examPaper);
        }

        return papers;
    }

//    public static Boolean checkReleasing(User user, ExamPaper examPaper){
    public static ReleaseExam checkReleasing(User user, ExamPaper examPaper){
        HibernateUtil.getSession().flush();
        Criteria criteria = getSession().createCriteria(ReleaseExam.class, "release");
        criteria.add(Restrictions.eq("pk.user", user));
        criteria.add(Restrictions.eq("pk.examPaper", examPaper));
        criteria.add(Restrictions.eq("checkRelease", 'Y'));
        ReleaseExam releaseExam = (ReleaseExam) criteria.uniqueResult();
        if(releaseExam != null){
            return releaseExam;
        }
        else{
            return null;
        }
    }

    public Boolean checkUserInRule(ExamPaper examPaper, User user){
        HibernateUtil.getSession().flush();
        Criteria criteria = getSession().createCriteria(ReleaseExam.class, "release");
        criteria.add(Restrictions.eq("pk.user", user));
        criteria.add(Restrictions.eq("pk.examPaper", examPaper));
        List<ReleaseExam> releaseExamList = criteria.list();
        if(releaseExamList.size() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean checkPaperRule(ExamPaper examPaper){
        HibernateUtil.getSession().flush();
        Criteria criteria = getSession().createCriteria(ReleaseExam.class, "release");
        criteria.add(Restrictions.eq("pk.examPaper", examPaper));
        criteria.add(Restrictions.ne("checkRelease", 'N'));
        List<ReleaseExam> releaseExamList = criteria.list();
        if(releaseExamList.size() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public List<ExamPaper> getOpenedPaperForUser(User user) {
        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.ne("code", "SYSTM"));
        criteria.add(Restrictions.eq("paperStatus", queryStatusDomain.getOpenStatus()));

        Criterion c1 = Restrictions.isNull("position");
        Criterion c2 = Restrictions.eq("position", user.getPosition());

        criteria.add(Restrictions.or(c1, c2));
        Criteria criteria2 = getSession().createCriteria(ExamRecord.class);
        criteria2.add(Restrictions.eq("user", user));
        List<ExamRecord> ERList = criteria2.list();

        List<Integer> EPidList = new ArrayList<Integer>();
        for (ExamRecord e : ERList) {
            if (e.getPaper() != null) {
                EPidList.add(e.getPaper().getId());
            }
        }
        if (!EPidList.isEmpty()) {
            criteria.add(Restrictions.not(Restrictions.in("id", EPidList)));
        }

        List<ExamPaper> papers = criteria.list();
        List list = new ArrayList();
        for(ExamPaper pap: papers){
            if(checkPaperRule(pap)){
                if(checkUserInRule(pap, user)){
                    ReleaseExam releaseExam = checkReleasing(user, pap);
                    if(releaseExam != null){
                        ExamPaper examPaper = new ExamPaper();
                        examPaper.setId(releaseExam.getExamPaper().getId());
                        examPaper.setName(releaseExam.getExamPaper().getName());
                        examPaper.setCreateDate(releaseExam.getExamPaper().getCreateDate());
                        examPaper.setMaxScore(releaseExam.getExamPaper().getMaxScore());
                        examPaper.setCreateBy(releaseExam.getExamPaper().getCreateBy());
                        examPaper.setCode(releaseExam.getExamPaper().getCode());
                        examPaper.setUpdateDate(releaseExam.getExamPaper().getUpdateDate());
                        examPaper.setTimeLimit(releaseExam.getExamPaper().getTimeLimit());
                        examPaper.setPosition(releaseExam.getExamPaper().getPosition());
                        examPaper.setPaperStatus(releaseExam.getExamPaper().getPaperStatus());
                        list.add(examPaper);
                    }
                }
            }
            else{
                list.add(pap);
            }

        }

        return list;
    }

    public List<ExamPaper> getDonePaperForUser(User user) {
        Criteria criteria = getSession().createCriteria(ExamPaper.class);

        criteria.add(Restrictions.eq("paperStatus", queryStatusDomain.getOpenStatus()));

        Criterion c1 = Restrictions.isNull("position");
        Criterion c2 = Restrictions.eq("position", user.getPosition());

        criteria.add(Restrictions.or(c1, c2));

        Criteria criteria2 = getSession().createCriteria(ExamRecord.class);
        criteria2.add(Restrictions.eq("user", user));
        List<ExamRecord> ERList = criteria2.list();

        List<Integer> EPidList = new ArrayList<Integer>();
        for (ExamRecord e : ERList) {
            if (e.getPaper() != null) {
                EPidList.add(e.getPaper().getId());
            }
        }
        if (EPidList.isEmpty()) {
            return null;
        }
        criteria.add(Restrictions.in("id", EPidList));

        return criteria.list();
    }

    public List getCode(Integer paperId) {

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.ne("id", paperId));
        criteria.setProjection(Projections.projectionList().add(Projections.property("code"), "code"));

        List codes = criteria.list();

        return codes;
    }

    public List getCodeCopy(){

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.setProjection(Projections.projectionList().add(Projections.property("code"), "code"));

        List codes = criteria.list();

        return codes;
    }

    public Integer getId(String code){

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.eq("code", code));
        criteria.setProjection(Projections.projectionList().add(Projections.property("id"), "id"));

        Integer paperId = (Integer)criteria.list().get(0);

        return paperId;
    }

    public void copyPaper(ExamPaper examPaper, List<PaperQuestion> paperQuestions, String paperCode, String paperName){

        ExamPaper copy = new ExamPaper();
        copy.setCode(paperCode);
        copy.setName(paperName);
        copy.setCreateBy(examPaper.getCreateBy());
        copy.setMaxScore(examPaper.getMaxScore());
        copy.setCreateDate(examPaper.getCreateDate());
        copy.setTimeLimit(examPaper.getTimeLimit());
        copy.setPaperStatus(examPaper.getPaperStatus());
        copy.setPosition(examPaper.getPosition());

        try{
            HibernateUtil.beginTransaction();
            getSession().save(copy);
            for(int i = 0; i < paperQuestions.size(); i++){
                PaperQuestion paperQuestionCopy = new PaperQuestion();
                paperQuestionCopy.setExamPaper(copy);
                paperQuestionCopy.setQuestion(paperQuestions.get(i).getQuestion());
                paperQuestionCopy.setScore(paperQuestions.get(i).getScore());
                getSession().save(paperQuestionCopy);
            }
            HibernateUtil.commitTransaction();
        } catch(Exception e){
            System.out.println("=========ERROR While create copy paper========");
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }
    }

    public List<ExamPaper> orderPaper(List paperCodes, String orderBy, String orderType){

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        criteria.add(Restrictions.in("code", paperCodes));

        if(orderType.equals("asc")){
            criteria.addOrder(Order.asc(orderBy));
        }

        if(orderType.equals("desc")){
            criteria.addOrder(Order.desc(orderBy));
        }

        List<ExamPaper> examPapers = criteria.list();

        return examPapers;
    }

    public List<ExamPaper> paperPagination(List empIds, String code, String name, String createDateFrom, String createDateTo, String scoreFrom, String scoreTo, String paperStatus, Integer page) throws ParseException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
        Date dateFrom = null;
        Date dateTo = null;
        if (!createDateFrom.equals("")) {
            dateFrom = simpleDateFormat.parse(createDateFrom);
        }
        if (!createDateTo.equals("")) {
            dateTo = simpleDateFormat.parse(createDateTo);
        }
        Float sFrom = null;
        Float sTo = null;

        if (!scoreFrom.equals("")) {
            sFrom = new Float(scoreFrom);
        }
        if (!scoreTo.equals("")) {
            sTo = new Float(scoreTo);
        }

        Criteria criteria = getSession().createCriteria(ExamPaper.class);
        if (empIds != null) {
            criteria.add(Restrictions.in("createBy.id", empIds));
        }
        if (!code.equals("")) {
            criteria.add(Restrictions.like("code", "%" + code + "%").ignoreCase());
        }
        if (!name.equals("")) {
            criteria.add(Restrictions.like("name", "%" + name + "%").ignoreCase());
        }
        if (!createDateFrom.equals("")) {
            criteria.add(Restrictions.ge("createDate", dateFrom));
        }
        if (!createDateTo.equals("")) {
            criteria.add(Restrictions.le("createDate", dateTo));
        }
        if (!scoreFrom.equals("")) {
            criteria.add(Restrictions.ge("maxScore", sFrom));
        }
        if (!scoreTo.equals("")) {
            criteria.add(Restrictions.le("maxScore", sTo));
        }
        if (!paperStatus.equals("")) {
            Integer pStatus = new Integer(paperStatus);
            if (pStatus != 0) {
                criteria.add(Restrictions.eq("paperStatus.id", new Integer(paperStatus)));
            }
        }
        criteria.addOrder(Order.asc("id"));
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.ne("code", "SYSTM"));
        criteria.setFirstResult((page - 1) * 3);
        criteria.setMaxResults(3);

        List<ExamPaper> papers = criteria.list();

        for(ExamPaper examPaper : papers){
            getSession().refresh(examPaper);
        }

        return papers;
    }

    public void addRule(int userId, String paperCode, User updateBy, String date){

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
        QueryPaperDomain queryPaperDomain = new QueryPaperDomain();
        ExamPaper examPaper = queryPaperDomain.getPaperByCode(paperCode);
        Date currentDate = new Date();
        try{
            currentDate = simpleDateFormat.parse(date);
            HibernateUtil.beginTransaction();
            User user = queryUserDomain.getUserById(userId);
            ReleaseExamPk releaseExamPk = new ReleaseExamPk();
            releaseExamPk.setUser(user);
            releaseExamPk.setExamPaper(examPaper);
            releaseExamPk.setUpdateBy(updateBy);

            ReleaseExam releaseExam = new ReleaseExam(releaseExamPk, null, currentDate, 'Y', null);
            getSession().save(releaseExam);
            HibernateUtil.commitTransaction();

        } catch (ParseException e){
            e.printStackTrace();
        }
    }
}
