package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryEvaluationDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.*;
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
import javax.swing.plaf.synth.SynthOptionPaneUI;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by l3eal2 on 17/3/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class EvaluationController {
    @Autowired
    QueryEvaluationDomain queryEvaluationDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    @RequestMapping(value = "/evaluationDescription", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> evaluationDescription() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Description> list = queryEvaluationDomain.getAllDescription();
        String json = new Gson().toJson(list);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/evaluationTopic", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> evaluationTopic() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Topic> list = queryEvaluationDomain.getAllTopic();
        String json = new Gson().toJson(list);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/evaluationSubtopic", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> evaluationSubtopic() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Subtopic> list = queryEvaluationDomain.getAllSubtopic();
        String json = new Gson().toJson(list);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getStudentForSelect", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> getStudentForSelect(HttpServletRequest request, @ModelAttribute("page") String page) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<User> users = null;
        try {
            String piority = request.getSession().getAttribute("session_piority").toString();
            users = queryEvaluationDomain.getStudentForSelect(piority, page);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String json = new Gson().toJson(users);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/addEvaluate", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> addEvaluate(@Valid Evaluate evaluate, HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        String textReturn = "";
        if (evaluate.getUserId() == null) {
            try {
                Integer userId = Integer.parseInt(request.getSession().getAttribute("userid").toString());
                if (BeanUtils.isNotEmpty(request.getSession().getAttribute("userid").toString())) {
                    evaluate.setUserId(userId);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        queryEvaluationDomain.insertEvaluate(evaluate);

        return new ResponseEntity<String>(textReturn, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/sumScore", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> sumScore(@ModelAttribute("userId") Integer userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        Float sum = queryEvaluationDomain.sumScore(userId);

        return new ResponseEntity<String>(sum + "", headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/setEvaGrade", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> setEvaGrade(@ModelAttribute("userId") Integer userId, @ModelAttribute("evaGrade") String evaGrade) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        queryUserDomain.setUserEvaGrade(userId, evaGrade);

        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/checkEvaluation", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> checkEvaluation(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        String textReturn = "";
        try {
            Integer userId = Integer.parseInt(request.getSession().getAttribute("userid").toString());
            List<Evaluate> evaluates = queryEvaluationDomain.checkEvaluation(userId);
            if (evaluates.size() > 0)
                textReturn = "change";
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>(textReturn, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getResultEvaluation", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> getResultEvaluation(HttpServletRequest request,
                                                      @ModelAttribute("subId") Integer subId,
                                                      @ModelAttribute("type") String type,
                                                      @ModelAttribute("userId") String userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Evaluate> evaluates = null;
        try {
            if (BeanUtils.isEmpty(userId)) {
                userId = request.getSession().getAttribute("userid").toString();
            }
            evaluates = queryEvaluationDomain.getEvaluation(Integer.parseInt(userId), subId, type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String result = "";
        if (evaluates.size() > 0)
            result = new Gson().toJson(evaluates);


        return new ResponseEntity<String>(result, headers, HttpStatus.OK);
    }

}
