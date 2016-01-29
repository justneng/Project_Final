package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Category;
import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.pojo.exam.SubCategory;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;
import org.hibernate.criterion.*;


/**
 * Created by Phuthikorn_T on 8/7/2015.
 */

@Service

public class QuerySubCategoryDomain extends HibernateUtil {

    private static final Logger logger = Logger.getLogger(QuerySubCategoryDomain.class.getName());

    public void insertSubCategory(SubCategory subCategory) {

        beginTransaction();
        getSession().save(subCategory);
//        getSession().flush();    //Flush
        commitTransaction();
        closeSession();
    }

    public boolean checkSubCategoryDuplication(SubCategory subCategory) {
        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("name", subCategory.getName()));
        criteria.add(Restrictions.eq("category", subCategory.getCategory()));
        boolean result = criteria.list().isEmpty();
        closeSession();

        return result;
    }

    public List<SubCategory> getListSubCategories() {
        Criteria criteria = getSession().createCriteria(SubCategory.class, "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.addOrder(Order.asc("id"));
        ProjectionList projection = Projections.projectionList();

        projection.add(Projections.property("category.id"), "id");
        projection.add(Projections.property("category.name"), "name");
        projection.add(Projections.property("subCategory.id"), "subId");
        projection.add(Projections.property("subCategory.name"), "subName");
//        projection.add(Projections.property("subCategory.questions"),"questions");

        criteria.setProjection(projection);
        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);


        List<SubCategory> subCategories = criteria.list();
        return subCategories;
    }

    public SubCategory getSubCategoryByNameAndCategory(String name, Category category) {

        Criteria criteria = getSession().createCriteria(SubCategory.class);


        criteria.add(Restrictions.eq("name", name));
        criteria.add(Restrictions.eq("category", category));

        return (SubCategory)criteria.uniqueResult();
    }

    public SubCategory getSubCategoryById(Integer id) {

        Criteria criteria = getSession().createCriteria(SubCategory.class);


        criteria.add(Restrictions.eq("id", id));

        List<SubCategory> subCategories = criteria.list();
        return (SubCategory) subCategories.get(0);
    }


    public void deleteSubCategory(Integer subCategoryId) {

        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("id", subCategoryId));
        SubCategory subCat = (SubCategory)criteria.uniqueResult();

        HibernateUtil.beginTransaction();
//        SubCategory sc = new SubCategory();
//        sc.setId(subCategoryId);
//        getSession().delete(sc);
        getSession().delete(subCat);
        HibernateUtil.commitTransaction();
    }

    public void editSubCategory(SubCategory subCategory) {
        HibernateUtil.beginTransaction();
        getSession().merge(subCategory);
        getSession().flush();
        HibernateUtil.commitTransaction();
    }

    public List<SubCategory> getSubCategoryByName(String subName){
        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("name", subName));
        return criteria.list();
    }


//    public List<SubCategory> searchSubCategory(Integer subcategoryId, String subcategoryName) {
//
//        if (subcategoryId == null) {
//
//            String queryStatement = "from SubCategory where name like :subcategoryName";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("subcategoryName", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//
//            return subcategories;
//        }
//        return null;
//        else if (subcategoryName == null) {
//
//            String queryStatement = "from SubCategory where id like :subcategoryId";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("subcategoryId", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//
//            return subcategories;
//        } else {
//            String queryStatement = "from SubCategory where id like :subcategoryId and name like :subcategoryName";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("subcategoryId", "%" + subcategoryId + "%");
//            query.setParameter("subcategoryName", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//
//            return subcategories;
//        }
//        //criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
//    }


//    public List<SubCategory> searchSubCategory(String subcategoryName){
//            String queryStatement = "from SubCategory where name like :subcategoryName";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("subcategoryName", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//            return subcategories;
//    }


//    public List<SubCategory> searchSubCategory(String subcategoryName,String categoryId,String categoryName){
//        if (categoryId == null) {
//
//            String queryStatement = "from Category where name like :categoryName";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("categoryName", "%" + categoryName + "%");
//            List<SubCategory> subcategories = query.list();
//            return subcategories;
//        }
//        else if (categoryName == null) {
//
//            String queryStatement = "from Category where id like :categoryId";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameter("categoryId", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//
//            return subcategories;
//        } else {
//            String queryStatement = "from SubCategory where id like :subcategoryId and name like :subcategoryName";
//            Query query = getSession().createQuery(queryStatement);
////            query.setParameter("subcategoryId", "%" + subcategoryId + "%");
//            query.setParameter("subcategoryName", "%" + subcategoryName + "%");
//            List<SubCategory> subcategories = query.list();
//
//            return subcategories;
//        }

    public List<SubCategory> searchSubCategory(String subcategoryName, String categoryId, String categoryName) {
        Criteria criteria = getSession().createCriteria(SubCategory.class, "SubCategory");

        criteria.createAlias("SubCategory.category", "category");
//                ProjectionList projectionList = Projections.projectionList();
//                projectionList.add(Projections.property("category.id"),"catId");
//                projectionList.add(Projections.property("category.name"),"catName");
//                projectionList.add(Projections.property("sc.name"),"subName");
        criteria.addOrder(Order.asc("category.id"));
//                criteria.add(Restrictions.like("name", "%" + subcategoryName + "%").ignoreCase());
//                criteria.add(Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase());
//                criteria.add(Restrictions.like("category.name", "%" + categoryName + "%").ignoreCase());

        if (subcategoryName != "") {
            criteria.add(Restrictions.like("SubCategory.name", "%" + subcategoryName + "%").ignoreCase());
        }
        if (categoryId != "") {
//            criteria.add(Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase());

            Criterion cri = Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase();
            Criterion cri2 = Restrictions.like("category.name", "%" + categoryId + "%").ignoreCase();
            criteria.add(Restrictions.or(cri,cri2));
        }
        if (categoryName != "") {
            criteria.add(Restrictions.like("category.name", "%" + categoryName + "%").ignoreCase());
        }

//        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<SubCategory> subCategories = criteria.list();
        closeSession();
        return subCategories;
    }

    public List<SubCategory> getSubCategoryListByCategory(Category category) {
        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("category", category));

        return (List<SubCategory>) criteria.list();
    }

    public List<SubCategory> getAllSubCategory() {
        Criteria criteria = getSession().createCriteria(SubCategory.class);
        return (List<SubCategory>) criteria.list();
    }

    public List<SubCategory> getSubCategoryByCategoryId(Category category) {

        Criteria criteria = getSession().createCriteria(SubCategory.class);
        if (category != null) {
            criteria.add(Restrictions.eq("category", category));
        }
        return criteria.list();
    }


//    Add By Mr.Wanchana
public List<Integer> getSubCategoryIdsByName(String subName) {

    Criteria criteria = getSession().createCriteria(SubCategory.class);
    criteria.add(Restrictions.eq("name", subName).ignoreCase());
    List<SubCategory> subCategorys = criteria.list();
    List<Integer> ids = new ArrayList<Integer>();

    if(subCategorys != null){
        for(int i = 0; i < subCategorys.size(); i++){
            ids.add(subCategorys.get(i).getId());
        }
        return ids;
    }
    else {
        return null;
    }
}

    public Integer getSubCategoryIdByName(String subName){

        Criteria criteria = getSession().createCriteria(SubCategory.class);
        criteria.add(Restrictions.eq("name", subName).ignoreCase());
        SubCategory subCategory = (SubCategory) criteria.list().get(0);

        return subCategory.getId();
    }

    public List<SubCategory> getSubCategoryToDropDown(String categoryIdOrName) {
        Criteria criteria = getSession().createCriteria(SubCategory.class, "SubCategory");
        criteria.createAlias("SubCategory.category", "category");
        criteria.addOrder(Order.asc("category.id"));

                if (!categoryIdOrName.equals("") && categoryIdOrName != null) {
            Criterion cri = Restrictions.like("category.id", "%" + categoryIdOrName + "%").ignoreCase();
            Criterion cri2 =Restrictions.like("category.name", "%" + categoryIdOrName + "%").ignoreCase();

            criteria.add(Restrictions.or(cri,cri2));
        }
        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<SubCategory> subCategoriesToDropDown = criteria.list();
        closeSession();
        return subCategoriesToDropDown;
    }

//    public List<SubCategory> LOVSubCategory(String categoryId) {
//        Criteria criteria = getSession().createCriteria(Category.class, "Category");
//        criteria.createAlias("SubCategory.category", "category");
//        criteria.addOrder(Order.asc("category.id"));
//
//        if (!categoryId.equals("")) {
//            Criterion cri = Restrictions.like("category.id", "%" + categoryId + "%").ignoreCase();
//            Criterion cri2 =Restrictions.like("category.name", "%" + categoryId + "%").ignoreCase();
//
//            criteria.add(Restrictions.or(cri,cri2));
//        }
//        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
//        List<SubCategory> LOVSubCategory = criteria.list();
//        closeSession();
//        return LOVSubCategory;
//    }

    public Set<Integer> getUsedSubCategoryIds(){
        Criteria criteria1 = getSession().createCriteria(Question.class, "q");
        criteria1.createAlias("q.subCategory", "subCategory");
        criteria1.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<Question> qList = criteria1.list();
        Set<Integer> usedSubCatIds = new HashSet<Integer>();
        for(Question q : qList){
            usedSubCatIds.add(q.getSubCategory().getId());
        }
        return usedSubCatIds;

    }
}

