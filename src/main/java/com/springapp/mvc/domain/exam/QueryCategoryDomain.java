package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Category;
import com.springapp.mvc.pojo.exam.SubCategory;
import com.springapp.mvc.util.BeanUtils;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.*;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/5/2015.
 */
@Service
public class QueryCategoryDomain extends HibernateUtil {

    public static final Logger logger = Logger.getLogger(Category.class.getName());

    public void insertCategory(Category category){

        HibernateUtil.beginTransaction();
        getSession().save(category);
        HibernateUtil.commitTransaction();
        closeSession();
    }



//    public boolean checkDuplicateName(String name) {
//        Criteria criteria = getSession().createCriteria(Category.class);
//        criteria.add(Restrictions.eq("name", name));
//        boolean result = criteria.list().isEmpty();
//        return result;
//    }

    public Category getCategoryByName(String name){
        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.add(Restrictions.eq("name", name));
        Category resultCategory = (Category)criteria.list().get(0);
        return resultCategory;
    }

    public Category getCategoryById(String id){
        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.add(Restrictions.eq("id", id));
        List<Category> categories = criteria.list();

        if (categories.isEmpty())
        {
            return null;
        }else {
            return categories.get(0);
        }
//        Category resultCategory = (Category)criteria.list().get(0);
//        return resultCategory;
    }

    //------------Add by Mr.Wanchana
    public List<Category> getListCategories(){

        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.addOrder(Order.asc("id"));
        criteria.setProjection(Projections.projectionList()
                .add(Projections.property("name"), "name")
                .add(Projections.property("id"), "id"));
        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Category> categories = criteria.list();
        closeSession();

        return categories;
    }

    public List<Category> getAllCategory(){

        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.addOrder(Order.asc("id"));
        return criteria.list();
    }

    public Integer getCategoryIdByName(String catName) {

        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.add(Restrictions.like("name", catName).ignoreCase());
        Integer catId = (Integer) criteria.list().get(0);

        return catId;
    }

    public void deleteCategory(Category category){

//        for(int i = 0; i < categoryIds.size(); i ++){
//            System.out.println(categoryIds.get(i));
//            Category category = getCategoryById((String) categoryIds.get(i));
//            getSession().delete(category);
//            commitTransaction();
//        }
        try{
            HibernateUtil.beginTransaction();
            getSession().delete(category);
            HibernateUtil.commitTransaction();
        }catch(HibernateException hEx){
            System.out.println("++++++++++++ERROR+++++++++++++\n"+hEx);
        }finally {
            HibernateUtil.closeSession();
        }
    }

    public void editCategory(Category category){

        try{
            HibernateUtil.beginTransaction();
            getSession().merge(category);
            HibernateUtil.commitTransaction();
        } catch(Exception e){
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }

    }

    public Boolean checkCategoryInUse(Category category){

        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("category", category));
        List<SubCategory> subCategory = criteria.list();

        if(subCategory.size() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean checkCateoryCode(String code){

        Criteria criteria = getSession().createCriteria(Category.class);
        criteria.add(Restrictions.eq("id", code));

        if(criteria.list() != null){
            return false;
        }
        else{
            return true;
        }
    }

    public List<Category> searchCategory(String  categoryId){

        Criteria criteria = getSession().createCriteria(Category.class, "category");
//        criteria.createAlias("SubCategory.category", "category");
        criteria.addOrder(Order.asc("category.id"));


        if (!categoryId.equals("")) {
//            criteria.add(Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase());

            Criterion cri = Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase();
            Criterion cri2 = Restrictions.like("category.name", "%" + categoryId + "%").ignoreCase();
            criteria.add(Restrictions.or(cri,cri2));
        }
//        if (categoryName != "") {
//            criteria.add(Restrictions.like("category.name", "%" + categoryName + "%").ignoreCase());
//        }

//        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Category> categories = criteria.list();
        closeSession();
        return categories;






//        logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + categoryId.toLowerCase() + " " + categoryName.toLowerCase());
//        if(categoryId == ""){
//// in case sensitive
////            String queryStatement = "from Category where name like :categoryName";
//            String queryStatement = "from Category where lower(name) like :categoryName";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("categoryName", "%" + categoryName + "%");
//            List<Category> categories = query.list();
//
//            return categories;
//        }
//        else if(categoryName == ""){
//
//            String queryStatement = "from Category where lower(id) like :categoryId";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("categoryId", "%" + categoryId + "%");
//            List<Category> categories = query.list();
//
//            return categories;
//        }
//        else {
//            String queryStatement = "from Category where lower(id) like :categoryId and lower(name) like :categoryName order by id";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("categoryId", "%" + categoryId + "%");
//            query.setParameter("categoryName", "%" + categoryName + "%");
//            List<Category> categories = query.list();
//
//            return categories;
//        }
        //criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);

    }


    public List<Category> getCategoryByIdLOV(String categoryId){
        Criteria criteria = getSession().createCriteria(Category.class, "category");
//        criteria.createAlias("category.category", "category");
        criteria.addOrder(Order.asc("category.id"));

//        if(categoryId != "") {
//            criteria.add(Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase());

            Criterion cri = Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase();
            Criterion cri2 =Restrictions.like("category.name", "%" + categoryId + "%").ignoreCase();
            criteria.add(Restrictions.or(cri,cri2));
//        }
        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Category> getCategoryByIdLOV = criteria.list();
        closeSession();
        return getCategoryByIdLOV;
    }


        public List<Category> LOVCategory(){
            Session session = getSession();
            Criteria criteria = session.createCriteria(Category.class);
            List<Category> list = criteria.list();
            return list;

        }
}

