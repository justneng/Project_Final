package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.FindAllDataTableDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/TDCS")
public class SearchStaffController {
    @Autowired
    private QueryUserDomain queryUserDomain;
    @Autowired
    private FindAllDataTableDomain findAllDataTableDomain;

    @RequestMapping(value = "/searchStaffData", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
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
                                                 HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<User> list = queryUserDomain.getStaffData(thFn, thLn, nick, company, empId);

        for (int i = 0; i < list.size(); i++) {
            if (BeanUtils.isNotEmpty(position)) {
                if (list.get(i).getSectionPosition().getPosiId() != Integer.parseInt(position)) {
                    list.remove(i);
                    i = -1;
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

        String json = new Gson().toJson(list);
        if (list.size() == 0)
            json = "";

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }
}
