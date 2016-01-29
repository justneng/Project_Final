package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Difficulty;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryDifficultyDomain extends HibernateUtil {

    public Difficulty getDifficultyByInteger(Integer level){
        Criteria criteria = getSession().createCriteria(Difficulty.class);
        criteria.add(Restrictions.eq("level",level));
        return (Difficulty)criteria.list().get(0);
    }

}
