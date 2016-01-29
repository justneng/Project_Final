package com.springapp.mvc.controller.exam.pagination;

import com.springapp.mvc.domain.exam.QueryExamRecordDomain;
import com.springapp.mvc.domain.exam.QueryExamResultDomain;
import com.springapp.mvc.domain.exam.QueryPaperDomain;
import com.springapp.mvc.pojo.exam.CheckPaperInUse;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ExamRecord;
import flexjson.JSONException;
import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wanchana on 13/1/2559.
 */
@Controller
@RequestMapping("/TDCS")
public class PaperPagination {

    @Autowired
    private QueryPaperDomain queryPaperDomain;

    @Autowired
    private QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    private QueryExamResultDomain queryExamResultDomain;


    @RequestMapping(value = "exam/paperPagination", method = RequestMethod.POST)
    public ResponseEntity<String> paperPagination(@RequestParam(value="fetch") String fetch,
                                                  @RequestParam(value="page") Integer page) throws JSONException, ParseException{

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Integer> empIds = new ArrayList<Integer>();

        String code = "";
        String name = "";
        String createDateFrom = "";
        String createDateTo = "";
        String scoreFrom = "";
        String scoreTo = "";
        String paperStatus = "";

        JSONArray jsonArray = new JSONArray(fetch);
        JSONObject jsonObj = jsonArray.getJSONObject(0);

        Integer check = new Integer(jsonObj.getString("empId"));

        if(check == 0){
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            code = jsonObject.getString("code");
            name = jsonObject.getString("name");

            createDateFrom = jsonObject.getString("createDateFrom");
            createDateTo = jsonObject.getString("createDateTo");
            scoreFrom = jsonObject.getString("scoreFrom");
            scoreTo = jsonObject.getString("scoreTo");
            paperStatus = jsonObject.getString("paperStatus");
        }
        else{
            for(int i = 0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                empIds.add(new Integer(jsonObject.getString("empId")));
                if(i == 0){
                    code = jsonObject.getString("code");
                    name = jsonObject.getString("name");
                    createDateFrom = jsonObject.getString("createDateFrom");
                    createDateTo = jsonObject.getString("createDateTo");
                    scoreFrom = jsonObject.getString("scoreFrom");
                    scoreTo = jsonObject.getString("scoreTo");
                    paperStatus = jsonObject.getString("paperStatus");
                }
            }
        }

        if(empIds.size() == 0){
            empIds = null;
        }

        List<ExamPaper> papers = queryPaperDomain.paperPagination(empIds, code, name, createDateFrom, createDateTo, scoreFrom, scoreTo, paperStatus, page);
        List checkPaperInUses = null;

        if(papers.size() > 0){
            checkPaperInUses = new ArrayList();

            for(int i = 0; i < papers.size(); i ++){
                Boolean bool = false;
                List<ExamRecord> examRecord = queryExamRecordDomain.getExamRecordByExamPaper(papers.get(i));
                CheckPaperInUse checkPaperInUse = new CheckPaperInUse();

                if(examRecord != null){
                    bool = queryExamResultDomain.checkResultIsDone(examRecord);
                    checkPaperInUse.setExamPaper(papers.get(i));
                    checkPaperInUse.setCheck(bool);
                }
                else{
                    checkPaperInUse.setExamPaper(papers.get(i));
                    checkPaperInUse.setCheck(bool);
                }

                checkPaperInUses.add(checkPaperInUse);
            }

        }
        String toJson = new JSONSerializer().include("choices").exclude("*.class").serialize(checkPaperInUses);

        return new ResponseEntity<String>(toJson, headers, HttpStatus.OK);
    }
}
