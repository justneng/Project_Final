package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Description;
import com.springapp.mvc.pojo.Subtopic;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Pongpipat on 21/4/2558.
 */
@Service
public class QueryDescriptionDomain extends HibernateUtil{
    @Autowired
    QuerySubTopicDomain querySubTopicDomain;
    public List<Description> getDescriptionByTopicId(Integer topicId){
        List list = querySubTopicDomain.getSubtoIdpicByTopic(topicId);
        Criteria criteria = getSession().createCriteria(Description.class,"description");
        if(list.size()>0) {
            criteria.add(Restrictions.in("subtopicId", list));
            criteria.addOrder(Order.asc("subtopicId"));
            criteria.addOrder(Order.asc("grade"));
            return criteria.list();
        }
        return new ArrayList<Description>();
    }

    public Integer saveDrescription(Description description){
        HibernateUtil.beginTransaction();
        Subtopic subtopic = querySubTopicDomain.getSubtopicDatas(description.getSubtopicId());
        description.setSubtopic(subtopic);
        getSession().save(description);
        getSession().flush();
        HibernateUtil.commitTransaction();

        return description.getDescriptionId();
    }

    public Integer sumScoreDrecriptionByTopicId(Integer topicId){
        Integer resultScore;
        List list = querySubTopicDomain.getSubtoIdpicByTopic(topicId);
        Criteria criteria = getSession().createCriteria(Description.class);
        if(list.size()>0) {
            criteria.add(Restrictions.in("subtopicId", list));
            criteria.add(Restrictions.eq("grade","A"));
            criteria.setProjection(Projections.sum("max"));

            resultScore = (Integer) criteria.uniqueResult();
        }else {
            resultScore = 0;
        }
        return resultScore;
    }

    public Description getSubtopicDatas(Integer id) {
        Criteria criteria = getSession().createCriteria(Description.class);
        criteria.add(Restrictions.eq("descriptionId", id));
        Description description = (Description) criteria.uniqueResult();
        closeSession();
        return description;
    }

    public void deleteDescription(Integer subtopicId){
        Criteria criteria = getSession().createCriteria(Description.class);
        criteria.add(Restrictions.eq("subtopicId",subtopicId));
        List<Description> descriptions = criteria.list();
        HibernateUtil.beginTransaction();
        for (int i=0;i<descriptions.size();i++){
            getSession().delete(descriptions.get(i));
        }
        HibernateUtil.commitTransaction();
    }

    public void saveEditDescription(Description description){
        HibernateUtil.beginTransaction();
        getSession().merge(description);
        HibernateUtil.commitTransaction();
    }
}
