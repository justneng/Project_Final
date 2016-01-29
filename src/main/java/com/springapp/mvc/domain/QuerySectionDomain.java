package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Section;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Service
public class QuerySectionDomain extends HibernateUtil{
    public List<Section> getSectionList_where_one_colum(String colum,Integer value){
        Criteria criteria = getSession().createCriteria(Section.class);
        criteria.add(Restrictions.eq(colum,value));
        criteria.addOrder(Order.asc("sectionId"));
        List<Section> list = (List<Section>)criteria.list();
        closeSession();
        return list;
    }

    public void updateUserSection(Integer user_id,Integer section_id){
        Section section = getSectionDatas(section_id);
        section.setUserId(user_id);
        HibernateUtil.beginTransaction();
        getSession().merge(section);
//        getSession().flush();
//        getSession().clear();
        HibernateUtil.commitTransaction();
    }
    public Section getSectionDatas(Integer section_Id){
        Criteria criteria = getSession().createCriteria(Section.class);
        criteria.add(Restrictions.eq("sectionId",section_Id));
        Section section = (Section) criteria.uniqueResult();
        closeSession();
        return section;
    }
    public List<Section> getAllSection(){
        Criteria criteria = getSession().createCriteria(Section.class);
        List<Section> section = criteria.list();
        closeSession();
        return section;
    }

}
