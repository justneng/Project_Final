package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QueryUserDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by l3eal2 on 6/3/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class ValidateController {
    @Autowired
    private QueryUserDomain queryUserDomain;

    @RequestMapping(method = RequestMethod.POST, value = "/setValidate")
    public String setValidate(ModelMap model, @ModelAttribute("id") String id) {
        queryUserDomain.setUserValidate(id);
        return "validate";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/getCountUserValidate")
    public String countUserValidate(ModelMap model, HttpServletRequest request) {
        model.addAttribute("countUserValidate", queryUserDomain.getCountUserValidate(request.getSession().getAttribute("session_piority").toString()));
        return "validate";
    }
}
