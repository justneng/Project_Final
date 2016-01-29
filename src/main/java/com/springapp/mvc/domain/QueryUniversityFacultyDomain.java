package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.UniversityFaculty;
import com.springapp.mvc.util.BeanUtils;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 6/3/2558.
 */
@Service
public class QueryUniversityFacultyDomain extends HibernateUtil{
    public List getUniversityFacutyById(String universityId,String facultyId){
        Criteria criteria = getSession().createCriteria(UniversityFaculty.class);
        if (BeanUtils.isNotEmpty(universityId)) {
            criteria.add(Restrictions.eq("uniId", Integer.parseInt(universityId)));
        }
        if (BeanUtils.isNotEmpty(facultyId)) {
            criteria.add(Restrictions.eq("facId", Integer.parseInt(facultyId)));
        }
        criteria.setProjection(Projections.property("uniFacId"));
        List list = criteria.list();
        return  list;
    }
}
