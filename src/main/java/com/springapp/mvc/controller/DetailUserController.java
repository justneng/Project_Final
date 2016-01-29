package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QueryCompanyDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.Company;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.ConvertListToJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.sound.midi.Soundbank;
import java.util.List;

/**
 * Created by l3eal2 on 17/2/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class DetailUserController {
    @Autowired
    QueryUserDomain queryUserDomain;
    @Autowired
    private QueryCompanyDomain queryCompanyDomain;


    @RequestMapping(method = RequestMethod.POST, value = "detail")
    public String detail(ModelMap model, @ModelAttribute("id") Integer id, HttpServletRequest request) {
        User user = queryUserDomain.getUserDatas(id);
        model.addAttribute("user", user);
        List<User> users = queryUserDomain.getStudentUserDataList(user.getUserId(), "user");
        model.addAttribute("users", users);

        return "detail";
    }

    //EDIT BY PEEM

    @RequestMapping(method = RequestMethod.POST, value = "viewData")
    public String viewData(ModelMap model, @ModelAttribute("id") Integer id, HttpServletRequest request) {
        User user = queryUserDomain.getUserDatas(id);
        model.addAttribute("user", user);
        List<User> users = queryUserDomain.getStudentUserDataList(user.getUserId(), "user");
        model.addAttribute("users", users);

        return "viewData";
    }

    @RequestMapping(method = RequestMethod.POST, value = "viewStaffData")
    public String viewStaffData(ModelMap model, @ModelAttribute("id") Integer id, HttpServletRequest request) {
        User user = queryUserDomain.getUserDatas(id);
        model.addAttribute("user", user);
        List<User> users = queryUserDomain.getStaff();
        model.addAttribute("users", users);
        List<Company> companyList = queryCompanyDomain.getCompanyList();
        model.addAttribute("listComp", companyList);

        return "viewStaffData";
    }


//    @RequestMapping(method = RequestMethod.GET, value = "/viewData")
//    public String viewData(ModelMap model,
////                           @ModelAttribute("userId") Integer userId,
//                           @RequestParam( value = "userId", required = false) Integer userId) {
//        User user = queryUserDomain.getUserDatas(userId);
//        model.addAttribute("user", user);
//        model.addAttribute("listStaff", queryUserDomain.getStaff());
//        List<User> users = queryUserDomain.getStudentUserDataList(user.getUserId(), "user");
//        model.addAttribute("users", users);
//
//        return "viewData";
//    }
    //EDIT BY PEEM

    @RequestMapping(value = "/findStaffName", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> positionSearch(Model model, @ModelAttribute("piority") String piority) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List list = queryUserDomain.getUserDataByPiority(piority);

        String jsonList = null;
        try {
            jsonList = ConvertListToJson.toJson(list);
        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        }
        return new ResponseEntity<String>(jsonList, headers, HttpStatus.OK);
    }
}
