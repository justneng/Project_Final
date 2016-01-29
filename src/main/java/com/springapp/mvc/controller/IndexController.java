package com.springapp.mvc.controller;

import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.University;
import com.springapp.mvc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/TDCS")
public class IndexController {
    @Autowired
    private QueryUniversityDomain queryUniversityDomain;
    @Autowired
    private QueryApprentieDomain queryApprentieDomain;
    @Autowired
    private QueryJobDomain queryJobDomain;
    @Autowired
    private QueryUserDomain queryUserDomain;
    @Autowired
    private FindAllDataTableDomain findAllDataTableDomain;

	@RequestMapping(method = RequestMethod.GET,value = "index")
	public String printWelcome(ModelMap model,HttpServletRequest request,HttpServletResponse response) {
        request.getSession().removeAttribute("status");
        request.getSession().removeAttribute("username");
        request.getSession().removeAttribute("password");
        request.getSession().removeAttribute("userid");
		return "login";
	}

    @RequestMapping(value = "login")
    public String checkLogin(ModelMap model,@RequestParam(value = "id",required = false)String username,
                             @RequestParam(value = "pass",required = false)String pass,
                             HttpServletRequest request,HttpServletResponse response) {

        if (username != "" && pass != "") {
            List<User> userList = queryUserDomain.checkLogin(username, pass);
//            System.out.println(userList.get(0).getId());

            if (userList.size() > 0) {
                if(userList.get(0).getValidateStu()==0){
                    model.addAttribute("RegisSuc",1);
                    return "login";
                }
                if (userList.get(0).getStatus() == 1) {
                    request.getSession().setAttribute("status", "admin");
                    request.getSession().setAttribute("username",username);
                    request.getSession().setAttribute("session_piority","");
                    request.getSession().setAttribute("password",pass);
                    request.getSession().setAttribute("userid",userList.get(0).getUserId());
//                    model.addAttribute("user",queryUserDomain.getUserDatas(userList.get(0).getUserId()));
//                    request.getSession().setAttribute("username",username);


                    return "loginComplete";
                } else if (userList.get(0).getStatus() == 2) {
                    request.getSession().setAttribute("status", "staff");
                    request.getSession().setAttribute("username",username);
                    request.getSession().setAttribute("session_id",userList.get(0).getUserId());
                    request.getSession().setAttribute("session_piority",userList.get(0).getPiority());
                    request.getSession().setAttribute("countUserValidate",queryUserDomain.getCountUserValidate(request.getSession().getAttribute("session_piority").toString()));
                    request.getSession().setAttribute("password",pass);
                    request.getSession().setAttribute("userid",userList.get(0).getUserId());
                    model.addAttribute("countUserValidate",request.getSession().getAttribute("countUserValidate"));

//                    model.addAttribute("user",queryUserDomain.getUserDatas(userList.get(0).getUserId()));

                    return "loginComplete";
                } else if (userList.get(0).getStatus() == 3) {
                    request.getSession().setAttribute("status", "user");
                    request.getSession().setAttribute("username",username);
                    request.getSession().setAttribute("password",pass);
                    request.getSession().setAttribute("userid",userList.get(0).getUserId());
                    List<User> users = findAllDataTableDomain.searchId(User.class,"userName",request.getSession().getAttribute("username").toString());
                    model.addAttribute("user",users);

                    model.addAttribute("listApp",queryApprentieDomain.getApprentice());
                    model.addAttribute("listPosition",queryJobDomain.getJop("s"));
                    model.addAttribute("listUser",queryUserDomain.getStaff());

                    return "loginComplete";
                }
            } else {
                model.addAttribute("ch", "fail");
                return "login";
            }
        }
        return "login";
    }
//        if (username.equals("admin")   && pass.equals("admin") ) {
////            set session;
//            request.getSession().setAttribute("status","admin");
////            ///////////
//           return "home";
//        }    else if (username.equals("staff")   && pass.equals("staff") ) {
////            set session
//            request.getSession().setAttribute("status","staff");
////            ///////////
//            return "home";
//        }else if (username.equals("user")   && pass.equals("user") ) {
////            set session
//            request.getSession().setAttribute("status","user");
////            ///////////
//            return "home";
//        }
//        else {
//            model.addAttribute("ch", "fail");
//            return "login";
//        }

    @RequestMapping(method = RequestMethod.GET,value = "signup")
    public String register(ModelMap model,@ModelAttribute("studentData")User user) {
        List<University> lisUniver = queryUniversityDomain.getAllUniversity();
        List<User> listUser = queryUserDomain.getStaff();
        List<Position> positions  = queryJobDomain.getJop("s");
        model.addAttribute("listUser",listUser);
        model.addAttribute("listUni",lisUniver);
        model.addAttribute("listApp",queryApprentieDomain.getApprentice());
        model.addAttribute("listPosition",positions);
        return "signup";
    }
}