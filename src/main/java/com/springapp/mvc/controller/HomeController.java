package com.springapp.mvc.controller;

import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by Pongpipat on 17/3/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class HomeController {

    @Autowired
    private QueryUserDomain queryUserDomain;
    @Autowired
    private QueryTeamDomain queryTeamDomain;
    @Autowired
    private QuerySectionDomain querySectionDomain;
    @Autowired
    private QuerySectionPositionDomain querySectionPositionDomain;

    @RequestMapping(value = "/saveData",method = RequestMethod.POST)
    @ResponseBody
    public String saveData(@Valid User user,HttpServletRequest request,@RequestBody String json) {

//        if(request.getSession().getAttribute("status").toString().equals("user")){
//            user.setStatus(3);
//        }
//        user.setPassword(request.getSession().getAttribute("password").toString());
//        user.setValidateStu(1);
        queryUserDomain.EditProfile(user);
        request.getSession().removeAttribute("username");
        request.getSession().removeAttribute("password");
//        request.getSession().removeAttribute("userid");

//        request.getSession().setAttribute("status", "user");
        request.getSession().setAttribute("username",user.getUserName());
        request.getSession().setAttribute("password",user.getPassword());
//        request.getSession().setAttribute("userid",userList.get(0).getUserId());
//        return  new ModelAndView("redirect:/TDCS/home.html");
        request.getSession().setAttribute("picusername",user.getUserName());
        return "success";
    }

    @RequestMapping(value = "/checkOldPassword",method = RequestMethod.POST)
    @ResponseBody
    public String checkOldPassword(@ModelAttribute("Password")String oldPassword,HttpServletRequest request) {
        List<User> users = queryUserDomain.checkLogin(request.getSession().getAttribute("username").toString(),oldPassword);

        return users.size()+"";
    }

    @RequestMapping(value = "/changPassword",method = RequestMethod.POST)
    @ResponseBody
    public String changPassword(@ModelAttribute("Password")String newPassword,HttpServletRequest request) {
        queryUserDomain.resetPassword(Integer.parseInt(request.getSession().getAttribute("userid").toString()),newPassword);
        request.getSession().removeAttribute("password");
        request.getSession().setAttribute("password",newPassword);
        return "";
    }

    @RequestMapping(value = "/editprofileStaff",method = RequestMethod.POST)
    @ResponseBody
    public String editprofileStaff(@Valid User user,HttpServletRequest request) {
        String piority = "";
        boolean isPM = false;
        if(user.getPiority()==null) {
            user.setPiority(queryTeamDomain.findPiorityByTeamId(user.getTeamId()));
        }else {
            piority = user.getPiority();
            isPM = true;
        }
        queryUserDomain.editProfileStaff(user,piority);
        if(isPM){
            user.setSectionPosition(querySectionPositionDomain.getSectionPositionClass(user.getSpId()));
            queryTeamDomain.updateUserTeam(user.getUserId(),user.getTeamId(),user.getSectionPosition().getSectionId());
            querySectionDomain.updateUserSection(user.getUserId(),user.getSectionPosition().getSectionId());
        }
        request.getSession().removeAttribute("username");
        request.getSession().setAttribute("picusername",user.getUserName());
        return "";
    }
}
