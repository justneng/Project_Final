package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Major;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 10/2/2558.
 */
@Service
public class QueryMajorDomain extends HibernateUtil{
    public List<Major> getAllMajor(){
        Criteria criteria = getSession().createCriteria(Major.class);
        List list = criteria.list();
        closeSession();
        return list;
    }
}
