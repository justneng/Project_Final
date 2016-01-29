package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.UniversityFacultyMajor;
import com.springapp.mvc.util.BeanUtils;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by l3eal2 on 11/3/2558.
 */
@Service
public class QueryUniversityFacultyMajorDomain extends HibernateUtil {
    public List getUniversityFacutyMajorById(String universityFacultyId,String majorId){
        Criteria criteria = getSession().createCriteria(UniversityFacultyMajor.class);
        if (BeanUtils.isNotEmpty(universityFacultyId)) {
            criteria.add(Restrictions.eq("uniFacId", Integer.parseInt(universityFacultyId)));
        }
        if (BeanUtils.isNotEmpty(majorId)) {
            criteria.add(Restrictions.eq("majId", Integer.parseInt(majorId)));
        }
        criteria.setProjection(Projections.property("uniFacMajId"));
        List list = criteria.list();
        return  list;
    }
}
