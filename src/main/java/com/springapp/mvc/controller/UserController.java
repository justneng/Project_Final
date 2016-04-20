package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QueryPositionDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.BeanUtils;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSONSerializer;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

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


    @RequestMapping(method = RequestMethod.POST, value = "/editUser")
    @ResponseBody
    public ResponseEntity<String> editUser(ModelMap model,
                                               @RequestParam(value = "thFname", required = true) String thFname,
                                               @RequestParam(value = "thLname", required = true) String thLname,
                                               @RequestParam(value = "enFname", required = true) String enFname,
                                               @RequestParam(value = "enLname", required = true) String enLname,
                                               @RequestParam(value = "eMail2", required = false) String email2
            , HttpServletRequest request, HttpServletResponse response) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        User user = queryUserDomain.getCurrentUser(request);
        user.setThFname(thFname);
        user.setThLname(thLname);
        user.setEnFname(enFname);
        user.setEnLname(enLname);
        user.seteMail2(email2);

        queryUserDomain.updateUser(user);


        String json = "";
//        if (newQuestion == null) {
//            json = new JSONSerializer().exclude("*.class").serialize(question);
//        }else{
//            json = new JSONSerializer().exclude("*.class").serialize(newQuestion);
//        }
        return null;
    }
//Add By Wanchana
    @RequestMapping(value = "/searchUserData", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> positionSearch(@ModelAttribute("tFname") String thFn,
                                                 @ModelAttribute("tLname") String thLn,
                                                 @ModelAttribute("nickName") String nick,
                                                 @ModelAttribute("empId") String empId,
                                                 @ModelAttribute("company") String company,
                                                 @ModelAttribute("section") String section,
                                                 @ModelAttribute("position") String position,
                                                 @ModelAttribute("startTime") String startTime,
                                                 @ModelAttribute("endTime") String endTime,
                                                 @ModelAttribute("userType") Integer userType,
                                                 HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        User currentUser = queryUserDomain.getCurrentUser(request);
        List<User> list = queryUserDomain.getAllUser(thFn, thLn, nick, company, empId, userType, currentUser);

        for (int i = 0; i < list.size(); i++) {
            if (BeanUtils.isNotEmpty(position)) {
                if(list.get(i).getSectionPosition() != null){
                    if (list.get(i).getSectionPosition().getPosiId() != Integer.parseInt(position)) {
                        list.remove(i);
                        i = -1;
                    }
                }
            }
        }
        for (int i = 0; i < list.size(); i++) {
            if (BeanUtils.isNotEmpty(section)) {
                if (list.get(i).getSectionPosition().getSectionId() != Integer.parseInt(section)) {
                    list.remove(i);
                    i = -1;
                }
            }
        }

        for (int i = 0; i < list.size(); i++) {
            if (BeanUtils.isNotEmpty(endTime)) {
                String[] endWork = endTime.split("/");
                String[] startWorkUser = list.get(i).getStartWork().toString().split("/");
                if (Integer.parseInt(startWorkUser[2]) > Integer.parseInt(endWork[2])) {
                    list.remove(i);
                    i = -1;
                } else if (Integer.parseInt(startWorkUser[2]) == Integer.parseInt(endWork[2])) {
                    if (Integer.parseInt(startWorkUser[1]) > Integer.parseInt(endWork[1])) {
                        list.remove(i);
                        i = -1;
                    } else if (Integer.parseInt(startWorkUser[1]) == Integer.parseInt(endWork[1])) {
                        if (Integer.parseInt(startWorkUser[0]) > Integer.parseInt(endWork[0])) {
                            list.remove(i);
                            i = -1;
                        }
                    }
                }
            }
        }

        String json = new JSONSerializer().exclude("*.class").serialize(list);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/blockUser", method = RequestMethod.POST)
    public ResponseEntity<String> blockUser(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "empid") String empid){

        queryUserDomain.blockUser(empid);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/deleteUser", method = RequestMethod.POST)
    public ResponseEntity<String> deleteUser(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "empid") String empid){

        queryUserDomain.deleteUser(empid);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/resetBlock", method = RequestMethod.POST)
    public ResponseEntity<String> resetBlock(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "empid") String empid){

        queryUserDomain.resetBlock(empid);

        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
