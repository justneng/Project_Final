package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.PaperType;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

/**
 * Created by wanchana on 16/4/2559.
 */
@Service
public class QueryPaperTypeDomain extends HibernateUtil{

    public PaperType getPaperTypeById(Integer id){
        Criteria criteria = getSession().createCriteria(PaperType.class);
        criteria.add(Restrictions.eq("id", id));
        PaperType paperType = (PaperType) criteria.list().get(0);

        return paperType;
    }
}
