package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.*;
import com.springapp.mvc.util.ConvertListToJson;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class AddStaffController {
    @Autowired
    QueryTeamDomain queryTeamDomain;
    @Autowired
    QuerySectionDomain querySectionDomain;
    @Autowired
    QueryJobDomain queryJobDomain;
    @Autowired
    QueryUserDomain queryUserDomain;
    @Autowired
    FindAllDataTableDomain findAllDataTableDomain;

    private JavaMailSender mailSender;

    @RequestMapping(value = "/getTeam", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> positionSearch(Model model, @ModelAttribute("section_Id") String section_Id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Team> teams = (List<Team>) queryTeamDomain.getTeamList_where_one_colum("sectionId", section_Id);

        String jsonList = null;
        try {
            jsonList = ConvertListToJson.toJson(teams);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }
        return new ResponseEntity<String>(jsonList, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getJob", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> getJob(Model model, @ModelAttribute("sec_id") Integer section_id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SectionPosition> list = findAllDataTableDomain.searchByIntegerColumn(SectionPosition.class, "sectionId", section_id);

        String jsonList = new Gson().toJson(list);
        return new ResponseEntity<String>(jsonList, headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "insertTeam")
    @ResponseBody
    public String insertTeam(ModelMap model, @Valid Team team,
                             HttpServletRequest request, HttpServletResponse response) {
        Integer isTeamID = queryTeamDomain.InsertTeam(team.getTeamName());
        return isTeamID + "";
    }

    @RequestMapping(method = RequestMethod.POST, value = "insertStaff")
    @ResponseBody
    public String insertStaff(ModelMap model, @Valid User user,
//                                      @ModelAttribute("txbTeam")String team,
//                                      @ModelAttribute("piority") String piority,
                              HttpServletRequest request, HttpServletResponse response) {
        String userName = request.getSession().getAttribute("username").toString();
//        Integer isTeamID = 0;
        String piority = "";
        boolean isPM = false;
        if (user.getPiority() == null) {
            piority = queryTeamDomain.findPiorityByTeamId(user.getTeamId());
        } else {
            piority = user.getPiority();
            isPM = true;
        }
        List<User> list = queryUserDomain.insertUser(user, piority, userName, isPM);
        if (isPM) {
            queryTeamDomain.updateUserTeam(list.get(0).getUserId(), user.getTeamId(), list.get(0).getSectionPosition().getSectionId());
            querySectionDomain.updateUserSection(list.get(0).getUserId(), list.get(0).getSectionPosition().getSectionId());
        }
        try {
            SimpleMailMessage semail = new SimpleMailMessage();
            semail.setFrom("Administrator");
            semail.setTo(user.geteMail1() + "@softsquaregroup.com");
            semail.setSubject("TDCS Member");
            semail.setText("User : " + user.getUserName() + "\nPassword : " + user.getPassword());
            mailSender.send(semail);
        } catch (Exception e) {

        }
        request.getSession().setAttribute("picusername", list.get(0).getUserName());
        return list.get(0).getUserId() + "";
    }

    @RequestMapping(method = RequestMethod.POST, value = "getStaffDataAfterAdd")
    public String getStaffDataAfterAdd(Model model, @ModelAttribute("ID") Integer userId) {
        List<User> users = findAllDataTableDomain.searchByIntegerColumn(User.class, "userId", userId);
        model.addAttribute("userdata", users);
        return "addedStaff";
    }


    @RequestMapping(value = "/checkTeamName", method = RequestMethod.POST)
    @ResponseBody
    public String checkTeamName(Model model, @ModelAttribute("teamName") String teamName) {
        List<Team> list = findAllDataTableDomain.searchId(Team.class, "teamName", teamName);
        String result = list.size() + "";

        return result;
    }

    @RequestMapping(value = "/checkPiority", method = RequestMethod.POST)
    @ResponseBody
    public String checkPiority(Model model, @ModelAttribute("piority") String piority) {
        List<User> list = findAllDataTableDomain.searchId(User.class, "piority", piority);
        String result = list.size() + "";

        return result;
    }
}
