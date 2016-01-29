package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.SectionPosition;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

/**
 * Created by Pongpipat on 1/4/2558.
 */
@Service
public class QuerySectionPositionDomain extends HibernateUtil{
    public SectionPosition getSectionPositionClass(Integer spID){
        Criteria criteria = getSession().createCriteria(SectionPosition.class);
        criteria.add(Restrictions.eq("spId", spID));
        SectionPosition sectionPosition = (SectionPosition) criteria.uniqueResult();
        closeSession();
        return sectionPosition;
    }
}
