package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.exam.QueryEmployeeDomain;
import com.springapp.mvc.pojo.User;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by wanchana on 21/8/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class EmployeeController {

    private static final Logger logger = Logger.getLogger(User.class.getName());

    @Autowired
    QueryEmployeeDomain queryEmployeeDomain;

    @RequestMapping(value = "/exam/selectEmployee", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> selectEmployee(@ModelAttribute("userName") String userNameRequest,
                                                 HttpServletRequest request, HttpServletResponse response){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<User> users = queryEmployeeDomain.searchEmployeeByName(userNameRequest);
        logger.info(String.valueOf(users));

        String json = new Gson().toJson(users);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/selectEmployeeNotInSelected", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> selectEmployeeNotInSelected(@RequestBody String jsoN) throws JSONException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        JSONArray jsonArray = new JSONArray(jsoN);
        logger.info(jsoN);
        List empNames = new ArrayList();
        String nameSearch = "";
        for(int i = 0; i < jsonArray.length(); i ++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            empNames.add(jsonObject.getString("thFname"));
            if(i == 0){
                nameSearch = jsonObject.getString("empName");
            }
        }
        logger.info(jsoN + " ====== " +nameSearch);
        List<User> users = queryEmployeeDomain.searchEmployeeByNameNotInSelected(empNames, nameSearch);
        String json = new Gson().toJson(users);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
//        return null;
    }
}
