package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 10/2/2558.
 */
@Service
public class QueryJobDomain extends HibernateUtil{
    public List<Position> getJop(String status){
        Criteria criteria = getSession().createCriteria(Position.class);
        criteria.add(Restrictions.eq("posiFor",status));

        List list = criteria.list();
        closeSession();
        return list;
    }
    public List<Position> getJopList_where_one_colum(String colum,Integer value){
        Criteria criteria = getSession().createCriteria(Position.class);
        criteria.add(Restrictions.eq(colum,value));
        List<Position> list = (List<Position>)criteria.list();
        closeSession();
        return list;
    }
}
