package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.QuestionType;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryQuestionTypeDomain extends HibernateUtil{

    public QuestionType getQuestionTypeById(Integer id){
        Criteria criteria = getSession().createCriteria(QuestionType.class);
        criteria.add(Restrictions.eq("id", id));
        return (QuestionType)criteria.list().get(0);
    }

    public QuestionType getObjective(){
        Criteria criteria = getSession().createCriteria(QuestionType.class);
        criteria.add(Restrictions.eq("id",1));
        return (QuestionType)criteria.list().get(0);
    }

    public QuestionType getSubjective(){
        Criteria criteria = getSession().createCriteria(QuestionType.class);
        criteria.add(Restrictions.eq("id",2));
        return (QuestionType)criteria.list().get(0);
    }

    public Boolean isObjective(QuestionType questionType){
//        QuestionType objective = getObjective();
        return questionType.getId() == 1;
    }
    public Boolean isSubjective(QuestionType questionType){
//        QuestionType subjective = getSubjective();
        return questionType.getId() == 2;
    }
}
