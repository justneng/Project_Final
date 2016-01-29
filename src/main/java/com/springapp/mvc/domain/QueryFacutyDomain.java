package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Faculty;
import com.springapp.mvc.pojo.University;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 9/2/2558.
 */

@Service
public class QueryFacutyDomain extends HibernateUtil{

    public List<Faculty> getAllFaculty(){
        Criteria criteria = getSession().createCriteria(Faculty.class);
        List<Faculty> faculty = (List<Faculty>) criteria.list();
        return faculty;
    }

    public List<Faculty> getFacuty(String uniName,List<University> universityList){
//        Integer univerID;
//        Session session = getSession();
//        Criteria findUniID = session.createCriteria(University.class);
//        findUniID.add(Restrictions.eq("university_name",uniName));
//        List<University> listUni = (List<University>) findUniID.list();
//        univerID = listUni.get(0).getId();

        Criteria criteria = getSession().createCriteria(Faculty.class);
        criteria.add(Restrictions.eq("id",universityList.get(0).getId()));
        criteria.addOrder(Order.asc("id"));
        List<Faculty> list = (List<Faculty>) criteria.list();
        closeSession();
        return list;
    }
}
