package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.*;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by l3eal2 on 17/3/2558.
 */
@Service
public class QueryEvaluationDomain extends HibernateUtil {
    public List<Description> getAllDescription() {
        Criteria criteria = getSession().createCriteria(Description.class);
        criteria.addOrder(Order.asc("subtopicId"));
//        criteria.addOrder(Order.desc("min"));
//        criteria.addOrder(Order.desc("max"));
        criteria.addOrder(Order.asc("grade"));
        List<Description> descriptions = criteria.list();
        return descriptions;
    }

    public List<Topic> getAllTopic() {
        Criteria criteria = getSession().createCriteria(Topic.class);
        criteria.addOrder(Order.asc("topicId"));
        List<Topic> topics = criteria.list();
        return topics;
    }

    public List<Subtopic> getAllSubtopic() {
        Criteria criteria = getSession().createCriteria(Subtopic.class);
        criteria.addOrder(Order.asc("subtopicId"));
        List<Subtopic> subtopics = criteria.list();
        return subtopics;
    }

    public void insertEvaluate(Evaluate evaluate) {
        HibernateUtil.beginTransaction();
        getSession().save(evaluate);
        HibernateUtil.commitTransaction();
        closeSession();
    }

    public List<Evaluate> checkEvaluation(Integer userId) {
        Criteria criteria = getSession().createCriteria(Evaluate.class);
        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("type", "s"));
        List<Evaluate> evaluates = criteria.list();
        return evaluates;
    }

    public List<Evaluate> getEvaluation(Integer userId, Integer subId, String type) {
        Criteria criteria = getSession().createCriteria(Evaluate.class);
        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("subId", subId));
        criteria.add(Restrictions.eq("type", type));
        List<Evaluate> evaluates = criteria.list();
        return evaluates;
    }

    public List<User> getStudentForSelect(String piority, String page) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.ne("piority", piority));
        criteria.add(Restrictions.like("piority", piority + "%"));
        criteria.add(Restrictions.eq("validateStu", 1));
        criteria.add(Restrictions.eq("status", 3));
        if (page.equals("view"))
            criteria.add(Restrictions.isNotNull("evaGrade"));
        else if (page.equals("eva"))
            criteria.add(Restrictions.isNull("evaGrade"));
        List<User> users = criteria.list();
        return users;
    }


    public Float sumScore(Integer userId) {
        Criteria criteria = getSession().createCriteria(Evaluate.class);
        criteria.add(Restrictions.eq("type","e"));
        criteria.add(Restrictions.eq("userId", userId));
        criteria.setProjection(Projections.sum("score"));
        Float sum = (Float) criteria.uniqueResult();
        System.out.print("SUMMMMMMMMMMMMMMMMMMMMMMMMMMMMM   " + sum);
        return sum;
    }

}
