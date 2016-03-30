package com.springapp.mvc.controller;

import com.springapp.mvc.domain.QueryCompanyDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryPaperDomain;
import com.springapp.mvc.domain.exam.QueryReleaseExamDomain;
import com.springapp.mvc.pojo.Company;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ListenUsersInPosition;
import com.springapp.mvc.pojo.exam.ReleaseExam;
import com.springapp.mvc.util.ConvertListToJson;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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

    @Autowired
    private QueryPaperDomain queryPaperDomain;

    @Autowired
    private QueryReleaseExamDomain queryReleaseExamDomain;


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

//    Add by wanchana
    @RequestMapping(value = "/exam/getUsersInPosition", method = RequestMethod.POST)
    public ResponseEntity<String> getUsersInPosition(HttpServletRequest request, HttpServletResponse response,
                                                     @RequestParam(value = "paperCode") String paperCode,
                                                     @RequestParam(value = "positionId") Integer positionId){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        ExamPaper paper = queryPaperDomain.getPaperByCode(paperCode);
        List<ListenUsersInPosition> usersInPositionList = new ArrayList<ListenUsersInPosition>();
        List<User> users = queryUserDomain.getAllStudentInPosition(positionId);
        List<ReleaseExam> releaseExamList = queryReleaseExamDomain.getReleaseExam(users, paper);

        if(releaseExamList.size() > 0){
            for(ReleaseExam releaseExam : releaseExamList){
                ListenUsersInPosition rel = new ListenUsersInPosition(releaseExam.getPk().getUser().getUserId()
                        , releaseExam.getPk().getUser().getThFname()
                        , releaseExam.getPk().getUser().getThLname()
                        , releaseExam.getPk().getUser().getPosition().getPosiId()
                        , releaseExam.getPk().getUser().getPosition().getPosiName(), 'Y', releaseExam.getCheckInTime());
                usersInPositionList.add(rel);
            }

            String toJson = new JSONSerializer().exclude("*.class").serialize(usersInPositionList);
            return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
        }
        else{
            for(User user : users){
                usersInPositionList.add(new ListenUsersInPosition(user.getUserId(), user.getThFname(), user.getThLname(),
                        user.getPosition().getPosiId(), user.getPosition().getPosiName(), 'N', null));
            }

            String toJson = new JSONSerializer().exclude("*.class").serialize(usersInPositionList);
            return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
        }
    }
}
