package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Topic;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 17/4/2558.
 */
@Service
public class QueryTopicDomain extends HibernateUtil{
    public List<Topic> getAllTopic(){
        Criteria criteria = getSession().createCriteria(Topic.class);
        criteria.addOrder(Order.asc("topicId"));
        List<Topic> topics = criteria.list();
//        Topic topic = new Topic();
        for(int i=0;i<topics.size();i++) {
            getSession().evict(topics.get(i));
//        getSession().close();
        }
        return topics;
    }
    public void SaveTopic(Topic topic){
        HibernateUtil.beginTransaction();
        getSession().save(topic);
        HibernateUtil.commitTransaction();
        closeSession();
    }
    public void DeleteTopic(Integer id){
        Topic topic = getTopicClass(id);
        HibernateUtil.beginTransaction();
        getSession().delete(topic);
        HibernateUtil.commitTransaction();
    }

    public Topic getTopicClass(Integer id){
        Criteria criteria = getSession().createCriteria(Topic.class);
        criteria.add(Restrictions.eq("topicId", id));
        Topic topic = (Topic) criteria.uniqueResult();
        return topic;
    }

    public void editTopic(Topic topic){
        Session session = getSession();
        HibernateUtil.beginTransaction();
        Topic topic1 = getTopicClass(topic.getTopicId());
        topic1.setScore(topic.getScore());
        session.merge(topic1);
        session.flush();
        HibernateUtil.commitTransaction();
    }

    public String getRepleceTopic(String topicName){
        long maxLength = 0l;
        Criteria criteria = getSession().createCriteria(Topic.class);
        criteria.add(Restrictions.eq("topicData",topicName));
        criteria.setProjection(Projections.rowCount());
        List list = criteria.list();
        return list.get(0).toString();
    }
}
