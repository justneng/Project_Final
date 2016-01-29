package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Apprentice;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 10/2/2558.
 */
@Service
public class QueryApprentieDomain extends HibernateUtil{
    public List<Apprentice> getApprentice(){
        Criteria criteria = getSession().createCriteria(Apprentice.class);
        List<Apprentice> appList = (List<Apprentice>)  criteria.list();
        closeSession();
        return appList;
    }
}
