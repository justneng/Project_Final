package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.DepletedQuestion;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by PTang_000 on 20-Apr-16.
 */
@Service

public class QueryDepletedQuestionDomain extends HibernateUtil{

    public void insertDepletedQuestion(DepletedQuestion depletedQuestion){
        HibernateUtil.beginTransaction();
        getSession().save(depletedQuestion);
        getSession().flush();
        HibernateUtil.commitTransaction();
        closeSession();
    }
    public void updateDepletedQuestion(DepletedQuestion depletedQuestion){
        HibernateUtil.beginTransaction();
        getSession().merge(depletedQuestion);
        getSession().flush();
        HibernateUtil.commitTransaction();
        closeSession();
    }
    public void deleteDepletedQuestion(DepletedQuestion depletedQuestion){
        HibernateUtil.beginTransaction();
        getSession().delete(depletedQuestion);
        getSession().flush();
        HibernateUtil.commitTransaction();
        closeSession();
    }

    public List<Question> getQuestionFromDepletedQuestionByPaper(ExamPaper paper){
        Criteria criteria = getSession().createCriteria(DepletedQuestion.class);
        criteria.add(Restrictions.eq("paper",paper));

        return criteria.list();
    }
}
