package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryCategoryDomain;
import com.springapp.mvc.domain.exam.QueryQuestionDomain;
import com.springapp.mvc.domain.exam.QueryStatusDomain;
import com.springapp.mvc.domain.exam.QuerySubCategoryDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import flexjson.JSONSerializer;
import org.hibernate.exception.ConstraintViolationException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/7/2015.
 */
@Controller
@RequestMapping("/TDCS")
public class SubCategoryController {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryQuestionDomain queryQuestionDomain;

    @Autowired
    QueryStatusDomain queryStatusDomain;

    private static final Logger logger = Logger.getLogger(SubCategoryController.class.getName());

    @RequestMapping(method = RequestMethod.POST, value = "/exam/addSubCategory")
    @ResponseBody
    public ResponseEntity<String> addSubCategory(Model model,
                                                 @RequestParam(value = "categoryId", required = true) String categoryId,
                                                 @RequestParam(value = "subcategoryNameadd", required = true) String subcategoryName,
                                                 HttpServletRequest request, HttpServletResponse response) {
//            throws Exception {
        HttpStatus httpStatus = HttpStatus.OK;
        SubCategory subCategory = new SubCategory();

        subCategory.setName(subcategoryName);
        subCategory.setCategory(queryCategoryDomain.getCategoryById(categoryId));

        User currentUser = queryUserDomain.getCurrentUser(request);

        subCategory.setCreateBy(currentUser);
        try {
            querySubCategoryDomain.insertSubCategory(subCategory);
        } catch (ConstraintViolationException cve) {
            httpStatus = HttpStatus.I_AM_A_TEAPOT;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
//        String json = new Gson().toJson(subCategory);
        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(subCategory);
        return new ResponseEntity<String>(json, headers, httpStatus);
    }

    //end add
    @RequestMapping(value = "/exam/getAllSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllSubCategory() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subcategories = querySubCategoryDomain.getListSubCategories();
        String json = new Gson().toJson(subcategories);
//        logger.info(subcategories.toString());

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/deleteSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity deleteSubCategory(@ModelAttribute("id") Integer subCategoryId) {

        SubCategory subCategory = querySubCategoryDomain.getSubCategoryById(subCategoryId);
        if (queryQuestionDomain.searchQuestionQuery(null, subCategory.getName(), null, null, null, null, null, null, null, null, null, null).isEmpty()) {
            if (queryQuestionDomain.searchQuestionQuery(null, subCategory.getName(), null, null, null, null, null, null, null, queryStatusDomain.getDeletedStatus().getId(), null, null).isEmpty()) {
                querySubCategoryDomain.deleteSubCategory(subCategoryId);
            }
        } else {
            return new ResponseEntity((HttpStatus.I_AM_A_TEAPOT));
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/editSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public void editSubCategory(Model model,
//                              @RequestParam(value = "categoryId", required = true) String categoryId,
                                @RequestParam(value = "subcategoryId", required = true) Integer subcategoryId,

                                @RequestParam(value = "subcategoryName", required = true) String subcategoryName,
                                HttpServletRequest request, HttpServletResponse response) {

        SubCategory subCategory = querySubCategoryDomain.getSubCategoryById(subcategoryId);
        subCategory.setName(subcategoryName);
//        subCategory.setCategory(queryCategoryDomain.getCategoryById(categoryId));
        User currentUser = queryUserDomain.getCurrentUser(request);
        subCategory.setCreateBy(currentUser);
        querySubCategoryDomain.editSubCategory(subCategory);
    }

    @RequestMapping(value = "/exam/searchSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> searchSubCategory(@ModelAttribute("subcategoryName") String subcategoryName,
                                                    @ModelAttribute("categoryId") String categoryId,
                                                    @ModelAttribute("categoryName") String categoryName)
//                                                    @ModelAttribute("subcategoryId") Integer subcategoryId)
    {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<SubCategory> subcategories = querySubCategoryDomain.searchSubCategory(subcategoryName, categoryId, categoryName);
        Set<Integer> usedSubCatIdsSet = new HashSet<Integer>(querySubCategoryDomain.getUsedSubCategoryIds());
        List<SubCategoryAndUsed> subCategoryAndUseds = new ArrayList<SubCategoryAndUsed>();
        for (SubCategory sc : subcategories) {
            SubCategoryAndUsed scau = new SubCategoryAndUsed();
            scau = scau.cloneFromSubCategory(sc, usedSubCatIdsSet);
            subCategoryAndUseds.add(scau);
        }
        String json = new JSONSerializer().exclude("*.class").serialize(subCategoryAndUseds);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/exam/getAllSubCategoryInCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllSubCategoryInCategory(@RequestParam(value = "categoryId", required = true) String catId) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subcategories = null;

        if (catId.length() == 0) {
            return null;
//            subcategories = querySubCategoryDomain.getAllSubCategory();
        } else {
            Category category = queryCategoryDomain.getCategoryById(catId);
            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(category);
        }

        String json = new Gson().toJson(subcategories);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getSubCategoryByCategoryId", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryByCategoryId(@RequestBody String searchSubCategory) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<SubCategory> subcategories = null;
        if (searchSubCategory != null && searchSubCategory != "") {
            Category category = queryCategoryDomain.getCategoryById(searchSubCategory);
            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(category);
        } else {
//            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(null);
        }
        String json = new Gson().toJson(subcategories);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getSubCategoryByCatId", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryByCatId(@RequestParam(value = "catId") String catId,
                                                        @RequestParam(value = "allQuestionIdOnTableCreatePaper") JSONArray allQuestionIdOnTableCreatePaper) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Category category = queryCategoryDomain.getCategoryById(catId);
        List<SubCategory> subcategories = querySubCategoryDomain.getSubCategoryListByCategory(category);
        List<CountQuestionsInSubcategory> countQuestionsInSubcategories = new ArrayList<CountQuestionsInSubcategory>();
        List questionIds = new ArrayList();

        if(allQuestionIdOnTableCreatePaper.length() > 0){
            for(int i = 0; i < allQuestionIdOnTableCreatePaper.length(); i ++){
                Integer id = allQuestionIdOnTableCreatePaper.optInt(i);
                questionIds.add(id);
            }

            for(SubCategory subCategory : subcategories){
                countQuestionsInSubcategories.add(new CountQuestionsInSubcategory(subCategory.getId()
                        , subCategory.getName()
                        , subCategory.getCategory()
                        , subCategory.getCreateBy()
                        , queryQuestionDomain.countQuestionRemainingBySubcategory(subCategory, questionIds)));
            }
        }
        else{
            for(SubCategory subCategory : subcategories){
                countQuestionsInSubcategories.add(new CountQuestionsInSubcategory(subCategory.getId()
                        , subCategory.getName()
                        , subCategory.getCategory()
                        , subCategory.getCreateBy()
                        , queryQuestionDomain.countQuestionRemainingBySubcategory(subCategory, null)));
            }
        }


        String json = new JSONSerializer().exclude("*.class").serialize(countQuestionsInSubcategories);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getSubCategoryToDropDown", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryToDropDown(@RequestParam(value = "categoryId", required = false) String categoryIdOrName) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subCategoriesToDropDown = querySubCategoryDomain.getSubCategoryToDropDown(categoryIdOrName);

        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(subCategoriesToDropDown);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }


//    Add by wanchana
    @RequestMapping(value = "/exam/updateAndSaveSubcategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryByCategoryId(@RequestParam(value = "jsonOldSubcategory") String jsonOldSubcategory
                                                            ,@RequestParam(value = "jsonNewSubcategory") String jsonNewSubcategory
                                                            ,@RequestParam(value = "categoryId") String categoryId
                                                            ,HttpServletRequest request, HttpServletResponse response) {

        User currentUser = queryUserDomain.getCurrentUser(request);
        JSONArray jsonArray1 = null;
        JSONArray jsonArray2 = null;
        List subcategoryRemove = new ArrayList();
        List<Map> update = new ArrayList<Map>();
        List newSubcategoryNames = new ArrayList();
        int i = 0;

        if (!jsonOldSubcategory.equals("")) {
            jsonArray1 = new JSONArray(jsonOldSubcategory);
            for (i = 0; i < jsonArray1.length(); i++) {
                JSONObject jsonObject = jsonArray1.getJSONObject(i);
                if (jsonObject.getBoolean("remove") == true) {
                    subcategoryRemove.add(jsonObject.getInt("id"));
                } else {
                    Map subcategoryUpdate = new HashMap();
                    subcategoryUpdate.put("id", jsonObject.getInt("id"));
                    subcategoryUpdate.put("name", jsonObject.getString("name"));
                    update.add(subcategoryUpdate);
                }
            }
        }
        if (!jsonNewSubcategory.equals("")) {
            jsonArray2 = new JSONArray(jsonNewSubcategory);
            for (i = 0; i < jsonArray2.length(); i++) {
                JSONObject jsonObject = jsonArray2.getJSONObject(i);
                newSubcategoryNames.add(jsonObject.getString("name"));
            }
        }

        if (subcategoryRemove != null) {
            for (i = 0; i < subcategoryRemove.size(); i++) {
                querySubCategoryDomain.deleteSubCategory((Integer) subcategoryRemove.get(i));
            }
        }

        if (update != null) {
            for (i = 0; i < update.size(); i++) {
                SubCategory subCategory = querySubCategoryDomain.getSubCategoryById((Integer) update.get(i).get("id"));
                subCategory.setName((String) update.get(i).get("name"));
                querySubCategoryDomain.editSubCategory(subCategory);
            }
        }

        if (newSubcategoryNames != null) {
            for (i = 0; i < newSubcategoryNames.size(); i++) {
                SubCategory subCategory = new SubCategory();
                subCategory.setName((String) newSubcategoryNames.get(i));
                subCategory.setCategory(queryCategoryDomain.getCategoryById(categoryId));
                subCategory.setCreateBy(currentUser);
                querySubCategoryDomain.insertSubCategory(subCategory);
            }
        }

        return new ResponseEntity<String>(HttpStatus.CREATED);
    }
}
