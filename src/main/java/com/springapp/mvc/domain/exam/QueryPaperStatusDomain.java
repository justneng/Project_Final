package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Status;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

/**
 * Created by wanchana on 30/9/2558.
 */
@Service
public class QueryPaperStatusDomain extends HibernateUtil{
    public Status getStatusById(int statusId){
        Criteria criteria = getSession().createCriteria(Status.class);
        criteria.add(Restrictions.eq("id", statusId));
        Status status = (Status)criteria.list().get(0);

        return status;
    }
}
