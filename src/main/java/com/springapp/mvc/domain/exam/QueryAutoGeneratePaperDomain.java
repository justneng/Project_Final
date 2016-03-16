package com.springapp.mvc.domain.exam;

import com.springapp.mvc.controller.exam.PrepareCategory;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Paper;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by wanchana on 23/1/2559.
 */
@Service
public class QueryAutoGeneratePaperDomain extends HibernateUtil{

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryQuestionDomain queryQuestionDomain;

    @Autowired
    QueryStatusDomain queryStatusDomain;

    public List<PrepareCategory> getCategoryToGenerate(){
        List<Category> categories = queryCategoryDomain.getAllCategory();
        List<PrepareCategory> prepareCategories = new ArrayList<PrepareCategory>();

        for(Category category: categories){
            PrepareCategory prepareCategory = new PrepareCategory(category, queryQuestionDomain.countQuestionsInCategory(category.getId()));
            prepareCategories.add(prepareCategory);
        }
        return prepareCategories;
    }

    public boolean isNotCreated(String cid){
        getSession().flush();
        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("category.id", cid));

        if(criteria.list().size() == 0){
            return true;
        }
        else{
            System.out.println(criteria.list());

            return false;
        }
    }

    public int checkExamPaperTime(int currentTime){
        getSession().flush();
        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("no", currentTime + 1));
        if(criteria.uniqueResult() != null){
            PaperGenerateTemplate paperGenerateTemplate = (PaperGenerateTemplate) criteria.uniqueResult();
            return paperGenerateTemplate.getExamPaper().getId();
        }
        else{
            return 0;
        }
    }

    public int getFirstExam(){
        getSession().flush();
        Criteria criteria = HibernateUtil.getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("no", 1));
        PaperGenerateTemplate paperGenerateTemplate = (PaperGenerateTemplate) criteria.uniqueResult();
        return paperGenerateTemplate.getExamPaper().getId();
    }

    public int currentNumber(String cid, User user){
<<<<<<< 94164463eb48811be54f2ae8ff886469cc3b93d5
        getSession().flush();
        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("category.id", cid));
        criteria.addOrder(Order.desc("examPaper.id"));
        List<PaperGenerateTemplate> paperGenerateTemplates = criteria.list();
        int i = 0;
        if(paperGenerateTemplates.size() != 0){
            List<Integer> paperIds = new ArrayList();
            for(i = 0; i < paperGenerateTemplates.size(); i ++){
                paperIds.add(paperGenerateTemplates.get(i).getExamPaper().getId());
            }
            Criteria criteria1 = getSession().createCriteria(ExamRecord.class);
            criteria1.add(Restrictions.in("paper.id", paperIds));
            criteria1.add(Restrictions.eq("user", user));
            criteria1.addOrder(Order.desc("count"));
            criteria1.setMaxResults(1);
            ExamRecord examRecords = (ExamRecord) criteria1.uniqueResult();
            int count = 0;
            if(examRecords != null){
                count = examRecords.getCount();
                if(count > 0){
                    return count;
                }
                else{
                    return 0;
                }
            }
            else{
                return 0;
            }
        }
        else{
            return 0;
        }
=======
//        getSession().flush();
//        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
//        criteria.add(Restrictions.eq("category.id", cid));
//        criteria.addOrder(Order.desc("examPaper.id"));
//        List<PaperGenerateTemplate> paperGenerateTemplates = criteria.list();
//        int i = 0;
//        if(paperGenerateTemplates.size() != 0){
//            List<Integer> paperIds = new ArrayList();
//            for(i = 0; i < paperGenerateTemplates.size(); i ++){
//                paperIds.add(paperGenerateTemplates.get(i).getExamPaper().getId());
//            }
//            Criteria criteria1 = getSession().createCriteria(ExamRecord.class);
//            criteria1.add(Restrictions.in("paper.id", paperIds));
//            criteria1.add(Restrictions.eq("user", user));
//            criteria1.addOrder(Order.desc("count"));
//            criteria1.setMaxResults(1);
//            ExamRecord examRecords = (ExamRecord) criteria1.uniqueResult();
//            int count = 0;
//            if(examRecords != null){
//                count = examRecords.getCount();
//                if(count > 0){
//                    return count;
//                }
//                else{
//                    return 0;
//                }
//            }
//            else{
//                return 0;
//            }
//        }
//        else{
            return 0;
//        }
>>>>>>> update project
    }

    public int getCurrentExamPaperNo(String cid){
        getSession().flush();
        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("category.id", cid));
        criteria.addOrder(Order.desc("id"));
        criteria.setMaxResults(1);
        PaperGenerateTemplate paperGenerateTemplate = (PaperGenerateTemplate) criteria.uniqueResult();
        return paperGenerateTemplate.getNo();
    }

    public int generateNewPaper(String cid, int time){
        Status status = queryStatusDomain.getStatusById(1);
        List<Question> allQuestions = queryQuestionDomain.getQuestionsObjectBy(cid);
        List<Question> questionsKeeper = new ArrayList<Question>();
        List index = new ArrayList();
        int sumItem = 0;
        int i = 0;
        float maxScore = 0;
        String paperName = "";

        Category category = queryCategoryDomain.getCategoryById(cid);
        paperName = category.getName() + " ครั้งที " + time;

        for(i = 0; i < allQuestions.size(); i ++){
            index.add(i);
        }
        for(i = 0; i < allQuestions.size(); i ++){
            if(sumItem < 10){
                Collections.shuffle(index);
                questionsKeeper.add(allQuestions.get((Integer) index.get(0)));
                maxScore = maxScore + allQuestions.get(i).getScore();
                index.remove(0);
                sumItem = sumItem + 1;
            }
            else{
                continue;
            }
        }

        ExamPaper examPaper = new ExamPaper();
        examPaper.setName(paperName);
        examPaper.setCode("SYSTM");
        examPaper.setMaxScore(maxScore);
        examPaper.setCreateDate(DateUtil.getCurrentDateWithRemovedTime());
        examPaper.setTimeLimit(30);
        examPaper.setPaperStatus(status);

        PaperGenerateTemplate paperGenerateTemplate = new PaperGenerateTemplate();
        paperGenerateTemplate.setCategory(category);
        paperGenerateTemplate.setExamPaper(examPaper);
        paperGenerateTemplate.setNo(time);

        try{
            getSession().flush();
            HibernateUtil.beginTransaction();
            getSession().save(examPaper);
            getSession().save(paperGenerateTemplate);

            for (i = 0; i < questionsKeeper.size(); i++) {
                PaperQuestion paperQuestion = new PaperQuestion();
                paperQuestion.setExamPaper(examPaper);
                paperQuestion.setQuestion(questionsKeeper.get(i));
                paperQuestion.setScore(questionsKeeper.get(i).getScore());
                getSession().save(paperQuestion);
            }

            HibernateUtil.commitTransaction();
            getSession().flush();
        } catch(Exception e){
            System.out.println("Error While Generate Paper");
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }
        return examPaper.getId();
    }

    public int getPaperGenerateTemplateNo(ExamPaper examPaper){
        getSession().flush();
        Criteria criteria = getSession().createCriteria(PaperGenerateTemplate.class);
        criteria.add(Restrictions.eq("examPaper", examPaper));
        PaperGenerateTemplate paperGenerateTemplate = (PaperGenerateTemplate) criteria.uniqueResult();
        return paperGenerateTemplate.getNo();
    }
}
