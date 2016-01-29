package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QuerySendMailDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by l3eal2 on 16/2/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class SentMailController {
    private JavaMailSender mailSender;
    @Autowired
    QuerySendMailDomain querySendMailDomain;
    @Autowired
    QueryUserDomain queryUserDomain;

    @RequestMapping(method = RequestMethod.POST, value = "sendmailForNotValidate")
    public String sentMailForFail(ModelMap model, @ModelAttribute("message") String message, @ModelAttribute("uId") Integer id) {
        List<User> users = querySendMailDomain.getUser(id);
        queryUserDomain.deleteUser(id);
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("Administrator");
        email.setTo(users.get(0).geteMail1() + "@internal.ssg");
        email.setSubject("FIX SUBJECT Fail");
        email.setText(message);
        mailSender.send(email);
        return "validate";
    }

    @RequestMapping(method = RequestMethod.POST, value = "sendmailForValidate")
    public String sentMailForSuccess(ModelMap model, @ModelAttribute("uId") Integer id) {
        List<User> users = querySendMailDomain.getUser(id);
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("Administrator");
        email.setTo(users.get(0).geteMail1() + "@internal.ssg");
        email.setSubject("FIX SUBJECT Success");
        email.setText("สามารถเข้าระบบได้แล้ว");
        mailSender.send(email);
        return "validate";
    }

    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> forgetPassword(Model model, @ModelAttribute("email") String email) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        String text;
        List<User> users = querySendMailDomain.getUserByEmail(email);
        SimpleMailMessage semail = new SimpleMailMessage();
        if (users.size() > 0) {
            semail.setFrom("Administrator");
            semail.setTo(email);
            semail.setSubject("Forget Password");
            semail.setText("ชื่อผู้ใช้ของคุณคือ : " + users.get(0).getUserName() + "\nรหัสผ่านของคุณคือ : " + users.get(0).getPassword());
            mailSender.send(semail);
            text = "ส่งรหัสผ่านเข้า E-mail เรียบร้อยแล้ว~1";
        } else {
            text = "ไม่พบข้อมูล ... กรุณาตรวจสอบ E-mail ที่กรอกอีกครั้ง~0";
        }

        String jsonList = null;
        try {
//            jsonList = ConvertListToJson.toJson(list);
//            model.addAttribute("listFacName",facultyList);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }
        return new ResponseEntity<String>(text, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/resetPassword", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> resetPassword(Model model, @ModelAttribute("email") String email, @ModelAttribute("newPass") String newPass, @ModelAttribute("id") Integer id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        String text;
        List<User> users = querySendMailDomain.getUserByEmail(email);
        queryUserDomain.resetPassword(id, newPass);
        SimpleMailMessage semail = new SimpleMailMessage();
        semail.setFrom("Administrator");
        semail.setTo(email);
        semail.setSubject("Reset Password");
        semail.setText("ชื่อผู้ใช้ของคุณคือ : " + users.get(0).getUserName() + "\nรหัสผ่านใหม่ของคุณคือ : " + newPass);
        mailSender.send(semail);
        text = "ส่งรหัสผ่านใหม่เข้า E-mail เรียบร้อยแล้ว";

        String jsonList = null;
        try {
//            jsonList = ConvertListToJson.toJson(list);
//            model.addAttribute("listFacName",facultyList);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }
        return new ResponseEntity<String>(text, headers, HttpStatus.OK);
    }

}
