package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QueryPositionDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.DateUtil;
import flexjson.JSONSerializer;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/TDCS")
public class UserController {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryPositionDomain queryPositionDomain;

    @RequestMapping(method = RequestMethod.POST, value = "/saveUser")
    @ResponseBody
    public ResponseEntity<String> saveUser(ModelMap model,
                                              @RequestParam(value = "empId", required = true) String empId,
                                              @RequestParam(value = "username", required = true) String username,
                                              @RequestParam(value = "password", required = true) String password,
                                              @RequestParam(value = "thFname", required = false) String thFname,
                                              @RequestParam(value = "thLname", required = false) String thLname,
                                              @RequestParam(value = "enFname", required = true) String enFname,
                                              @RequestParam(value = "enLname", required = true) String enLname,
                                              @RequestParam(value = "email", required = true) String email,
                                              @RequestParam(value = "position", required = true) String position,
                                              @RequestParam(value = "userType", required = true) String userType,
             HttpServletRequest request, HttpServletResponse response) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        User user = queryUserDomain.getUserByUsername(username);
        if(user == null){
            user = queryUserDomain.getUserByEmpId(empId);
            if(user == null){
                user = new User();
                user.setUserName(username);
                user.setUserCreate(queryUserDomain.getCurrentUser(request).getUserName());
                user.setPassword(password);
                user.setThFname(thFname);
                user.setThLname(thLname);
                user.setEmpId(empId);
                user.setEnFname(enFname);
                user.setEnLname(enLname);
                user.seteMail2(email);

                Integer pos = Integer.parseInt(position);
                Integer ut = Integer.parseInt(userType);
                if(pos == 1 && ut == 1){
                    user.setPosition(queryPositionDomain.getPositionById(4));
                    user.setStatus(2);
                }else if(pos == 1 && ut == 2){
                    user.setPosition(queryPositionDomain.getPositionById(5));
                    user.setStatus(2);
                }else if(pos == 2 && ut == 1){
                    user.setPosition(queryPositionDomain.getPositionById(1));
                    user.setStatus(3);
                }else if(pos ==2 && ut == 2){
                    user.setPosition(queryPositionDomain.getPositionById(2));
                    user.setStatus(3);
                }else if (pos ==3){
                    user.setPosition(queryPositionDomain.getPositionById(3));
                    user.setStatus(1);
                }else{
                    System.out.println("case1");
                    return new ResponseEntity<String>(null, headers, HttpStatus.NOT_ACCEPTABLE);
                }

                queryUserDomain.addUser(user);

            }else{
                System.out.println("case2");
                return new ResponseEntity<String>(null, headers, HttpStatus.GONE);
            }
        }else{
            System.out.println("case3");
            return new ResponseEntity<String>(null, headers, HttpStatus.I_AM_A_TEAPOT);
        }


        System.out.println("case4");
        return new ResponseEntity<String>(null, headers, HttpStatus.OK);
    }
}
