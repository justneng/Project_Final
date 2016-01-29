package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Subtopic;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 21/4/2558.
 */
@Service
public class QuerySubTopicDomain extends HibernateUtil{
    public List<Subtopic> getSubtoIdpicByTopic(Integer id){
        Criteria criteria = getSession().createCriteria(Subtopic.class);
        criteria.add(Restrictions.eq("topicId",id));
        criteria.setProjection(Projections.property("id"));
        return criteria.list();
    }

    public Integer saveSubtopic(Subtopic subtopic){
        HibernateUtil.beginTransaction();
        getSession().save(subtopic);
        HibernateUtil.commitTransaction();
        return subtopic.getSubtopicId();
    }

    public void removeSubTpic(Integer subTopicId){
        Subtopic subtopic = getSubtopicDatas(subTopicId);
        HibernateUtil.beginTransaction();
        getSession().delete(subtopic);
        HibernateUtil.commitTransaction();
    }

    public Subtopic getSubtopicDatas(Integer id) {
        Criteria criteria = getSession().createCriteria(Subtopic.class);
        criteria.add(Restrictions.eq("subtopicId", id));
        Subtopic subTopic = (Subtopic) criteria.uniqueResult();
        return subTopic;
    }

    public void editSubTopic(Subtopic subtopic){
        HibernateUtil.beginTransaction();
        getSession().merge(subtopic);
        HibernateUtil.commitTransaction();
    }

    public String getRepleceSubtopic(Integer subTopicId,Integer topicId,String subTopicName){
        Criteria criteria = getSession().createCriteria(Subtopic.class);
        criteria.add(Restrictions.eq("topicId",topicId));
        criteria.add(Restrictions.eq("subtopicData",subTopicName));
        if(subTopicId != 0){
            criteria.add(Restrictions.ne("subtopicId",subTopicId));
        }
        criteria.setProjection(Projections.rowCount());
        List list = criteria.list();
        return list.get(0).toString();
    }
}
