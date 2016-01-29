package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by l3eal2 on 9/2/2558.
 */
@Service
public class QueryPositionDomain extends HibernateUtil {
    public List getPositionByStatus(String status){
        Criteria criteria = getSession().createCriteria(Position.class);
        criteria.add(Restrictions.eq("posiFor", status));
        List<Position> list = (List<Position>) criteria.list();
        closeSession();
        return list;
    }

//    Add By Wanchana
    public Position getPositionById(Integer id){
        Criteria criteria = getSession().createCriteria(Position.class);
        criteria.add(Restrictions.eq("posiId", id));
        Position position = (Position) criteria.uniqueResult();

        return position;
    }
}
