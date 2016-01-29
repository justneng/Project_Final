package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Company;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Service
public class QueryCompanyDomain extends HibernateUtil{
    public List<Company> getCompanyList(){
        Criteria criteria = getSession().createCriteria(Company.class);
        List<Company> list = (List<Company>)criteria.list();
        closeSession();
        return list;
    }
}
