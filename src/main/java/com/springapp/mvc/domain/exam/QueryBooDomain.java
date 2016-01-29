package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Boo;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryBooDomain extends HibernateUtil{

    public Boo getFalse(){
        Criteria criteria = getSession().createCriteria(Boo.class);
        criteria.add(Restrictions.eq("value",0));

        return (Boo)criteria.list().get(0);
    }

    public Boo getTrue(){
        Criteria criteria = getSession().createCriteria(Boo.class);
        criteria.add(Restrictions.eq("value",1));

        return (Boo)criteria.list().get(0);
    }
}
