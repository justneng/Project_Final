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

    @RequestMapping(value = "/exam/getSubCategoryToDropDown", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryToDropDown(@RequestParam(value = "categoryId", required = false) String categoryIdOrName) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subCategoriesToDropDown = querySubCategoryDomain.getSubCategoryToDropDown(categoryIdOrName);

        String json = new JSONSerializer().include("choices").exclude("*.class").serialize(subCategoriesToDropDown);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

}

class SubCategoryAndUsed {
    private Integer id;
    private String name;
    private User createBy;
    private Category category;
    private Boolean isUsed;

    public SubCategoryAndUsed cloneFromSubCategory(SubCategory sc, Set<Integer> usedSubCatIds) {
        this.id = sc.getId();
        this.name = sc.getName();
        this.createBy = sc.getCreateBy();
        this.category = sc.getCategory();
        this.isUsed = false;

        for (Integer i : usedSubCatIds) {
            if (this.id.equals(i)) {
                this.isUsed = true;
                System.out.println(isUsed);
            }
        }
        return this;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(Boolean isUsed) {
        this.isUsed = isUsed;
    }
}
