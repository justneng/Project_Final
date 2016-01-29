package com.springapp.mvc.controller;

import com.springapp.mvc.domain.FindAllDataTableDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by Pongpipat on 3/3/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class AddStudentController {
    @Autowired
    FindAllDataTableDomain findAllDataTableDomain;
    @Autowired
    QueryUserDomain queryUserDomain;
    private JavaMailSender mailSender;

    @RequestMapping(method = RequestMethod.POST,value = "/addingStu")
    @ResponseBody
    public String addstdu(ModelMap modelMap,
                                @Valid User user,
//                                @ModelAttribute("staffId")String staffId,
                                HttpServletRequest request,HttpServletResponse response){
        String userCreate;
        User user1 = QueryUserDomain.getUserDatas(user.getStaffId());
        if((request.getSession().getAttribute("username")+"").equals("null")){
            userCreate = user.getUserName();
        }else {
            userCreate = request.getSession().getAttribute("username").toString();
        }

        boolean isPM = false;
        List<User> users = queryUserDomain.insertUser(user,user1.getPiority(),userCreate ,isPM);
        request.getSession().setAttribute("picusername",users.get(0).getUserName());
//        try{
//            SimpleMailMessage semail = new SimpleMailMessage();
//            semail.setFrom("Administrator");
//            semail.setTo(user.geteMail1()+"@internal.ssg");
//            semail.setSubject("TDCS Member");
//            semail.setText("User : "+user.getUserName()+"\nPassword : "+user.getPassword());
//            mailSender.send(semail);
//        }catch (Exception e){}


//        modelMap.clear();
//        return new ModelAndView("redirect:/TDCS/shoeStudentData.html?ID=" + users.get(0).getUserId());
        return users.get(0).getUserId()+"";
    }

    @RequestMapping(method = RequestMethod.POST,value = "/showStudentData")
    public String delailUser(Model model,@ModelAttribute("ID") Integer id){
        model.addAttribute("user",queryUserDomain.getUserDatas(id));
        return "added";
    }
}
