package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryCategoryDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.Category;
import com.springapp.mvc.pojo.exam.CheckCategoryInUse;
import flexjson.JSONSerializer;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/5/2015.
 */
@Controller
@RequestMapping("/TDCS")
public class CategoryController {

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    private static final Logger logger = Logger.getLogger(Category.class.getName());

    @RequestMapping(method = RequestMethod.POST, value = "/exam/addCategory")
    @ResponseBody
    public ResponseEntity<String> addCategory(ModelMap model, @Valid Category category
            , HttpServletRequest request, HttpServletResponse response) {

        HttpStatus httpStatus = HttpStatus.OK;

        User createBy = queryUserDomain.getCurrentUser(request);
        category.setCreateBy(createBy);

        try{
            queryCategoryDomain.insertCategory(category);
        }catch (ConstraintViolationException cve){
            httpStatus = HttpStatus.I_AM_A_TEAPOT;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new Gson().toJson(category);

        return new ResponseEntity<String>(json, headers, httpStatus);
    }

    //    Add by Mr. Wanchana
    @RequestMapping(value = "/exam/getAllCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllCategory() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Category> categories = queryCategoryDomain.getListCategories();
        String json = new Gson().toJson(categories);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/deleteCategory", method = RequestMethod.POST)
    @ResponseBody
    public void deleteCategory(@RequestParam(value = "catId", required = true) String catId) {

        Category category = queryCategoryDomain.getCategoryById(catId);
        queryCategoryDomain.deleteCategory(category);
    }

    @RequestMapping(value = "/exam/editCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity editCategory(@Valid Category category,
                                       HttpServletRequest request) {

        User createBy = queryUserDomain.getCurrentUser(request);
        category.setCreateBy(createBy);
        queryCategoryDomain.editCategory(category);

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/searchCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> searchCategory(@ModelAttribute("id") String categoryId,
                                                 HttpServletRequest request) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Category> categories = queryCategoryDomain.searchCategory(categoryId);
        List tmp = null;

//        if(categories.size() > 0){
//            tmp = new ArrayList();
//            for(int i = 0 ; i < categories.size(); i ++){
//                Boolean check = queryCategoryDomain.checkCategoryInUse(categories.get(i));
//                CheckCategoryInUse checkCategoryInUse = new CheckCategoryInUse();
//                checkCategoryInUse.setCategory(categories.get(i));
//                checkCategoryInUse.setCheck(check);
//
//                tmp.add(checkCategoryInUse);
//            }
//        }

//        String json = new Gson().toJson(tmp);
        String toJson = new JSONSerializer().include("choices").exclude("*.class").serialize(tmp);

        return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getCategoryById", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getCategoryById(@RequestParam(value="categoryId", required = true) String categoryId) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Category category = queryCategoryDomain.getCategoryById(categoryId);
        String json = new Gson().toJson(category);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/checkCategoryInUse", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> checkCategoryInUse(@RequestParam(value="categoryId", required = true) String categoryId) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Category category = queryCategoryDomain.getCategoryById(categoryId);
        Boolean check = queryCategoryDomain.checkCategoryInUse(category);
        String json = new Gson().toJson(check);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

//    @RequestMapping(value = "/exam/LOVcategory", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<String> LOVcategory(@RequestParam(value = "categoryId", required = false) String categoryId) {
//
//        logger.info(String.valueOf(categoryId+"+++++"));
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//
//        List<Category> getCategoryByIdLOV = queryCategoryDomain.getCategoryByIdLOV(categoryId);
//
//        String json = new Gson().toJson(getCategoryByIdLOV);
//
//        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
//    }

    @RequestMapping(value = "/exam/checkCategoryCode", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> checkCategoryCode(@RequestParam(value="code", required = true) String code) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Boolean check = queryCategoryDomain.checkCateoryCode(code);
        String json = new Gson().toJson(check);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }
}
