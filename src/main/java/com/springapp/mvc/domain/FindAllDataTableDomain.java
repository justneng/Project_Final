package com.springapp.mvc.domain;

import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 11/2/2558.
 */

@Service
public class FindAllDataTableDomain extends HibernateUtil{
    public List searchId(Class aClass,String columName,String value){
        Criteria criteria = getSession().createCriteria(aClass);
        criteria.add(Restrictions.eq(columName,value));
        List list = criteria.list();
        closeSession();
        return list;
    }
    public List searchByIntegerColumn(Class aClass,String columName,Integer value){
        Criteria criteria = getSession().createCriteria(aClass);
        criteria.add(Restrictions.eq(columName,value));
        List list = criteria.list();
        closeSession();
        return list;
    }
}
