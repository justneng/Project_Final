package com.springapp.mvc.controller;

import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by Pongpipat on 6/2/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class RegisController {

    @Autowired
    private QueryUserDomain queryUserDomain;
    @Autowired
    private FindAllDataTableDomain findAllDataTableDomain;
    private JavaMailSender mailSender;

    @RequestMapping(method = RequestMethod.POST, value = "/submiting")
    public String addstdu(ModelMap modelMap, @Valid User user,
                          HttpServletRequest request, HttpServletResponse response) {
        String userCreate;
        User user1 = QueryUserDomain.getUserDatas(user.getStaffId());

        if ((request.getSession().getAttribute("username") + "").equals("null")) {
            userCreate = user.getUserName();
        } else {
            userCreate = user1.getUserName();
        }
        boolean isPM = false;
        List<User> list = queryUserDomain.insertUser(user, user1.getPiority(), userCreate, isPM);
        request.getSession().setAttribute("picusername", list.get(0).getUserName());
        try {
            if (request.getSession().getAttribute("status").toString().equals("admin")) {
                SimpleMailMessage semail = new SimpleMailMessage();
                semail.setFrom("Administrator");
                semail.setTo(user.geteMail1() + "@internal.ssg");
                semail.setSubject("รหัสผ่านสำหรับเข้าใช้งาน");
                semail.setText("ชื่อผู้ใช้ของคุณคือ : " + user.getUserName() + "\nรหัสผ่านของคุณคือ : " + user.getPassword());
                mailSender.send(semail);

                return "addStudent";
            }
        } catch (Exception e) {
            modelMap.addAttribute("RegisSuc", 1);
            try {
                if (request.getSession().getAttribute("status").toString().equals("admin")) {
                    return "addStudent";
                }
            } catch (Exception ex) {
            }
            request.getSession().setAttribute("username", list.get(0).getUserName());
            return "login";
        }

        modelMap.addAttribute("RegisSuc", 1);
        return "login";
    }

    @RequestMapping(value = "/openLoginAfterRegis", method = RequestMethod.GET)
    public String openLoginAfterRegis(ModelMap modelMap) {
        modelMap.addAttribute("RegisSuc", 1);
        return "login";
    }

    @RequestMapping(value = "/checkStudentOrEmployeeId", method = RequestMethod.POST)
    @ResponseBody
    public String checkId(Model model, @ModelAttribute("stduOrEmpId") String stduEmpId) {
        List<User> list = queryUserDomain.searchUserOneStringColum("empId", stduEmpId);
        String result = list.size() + "";

        return result;
    }

    @RequestMapping(value = "/checkUserName", method = RequestMethod.POST)
    @ResponseBody
    public String checkUserName(Model model, @ModelAttribute("userName") String userName) {
        List<User> list = queryUserDomain.searchUserOneStringColum("userName", userName);
        String result = list.size() + "";

        return result;
    }
}
