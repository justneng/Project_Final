package com.springapp.mvc.controller.exam;

import com.springapp.mvc.controller.exam.reportutils.ReportUtils;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryExamResultDomain;
import com.springapp.mvc.domain.exam.QueryPaperDomain;
import com.springapp.mvc.domain.exam.QueryReportDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.ExamResult;
import com.springapp.mvc.pojo.exam.StudentReport;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.SQLException;
import java.util.*;

import static org.apache.tiles.servlet.context.ServletUtil.getServletContext;

/**
 * Created by wanchana on 11/3/2559.
 */
@Controller
@RequestMapping("/TDCS")
public class ReportController {

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryReportDomain queryReportDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @RequestMapping(value = "/exam/printReport", method = RequestMethod.POST)
    public void printReport(HttpServletRequest request,
                            HttpServletResponse response) throws ClassNotFoundException, SQLException {

        File report = null;
        InputStream inputStream = null;
        List<StudentReport> studentReports = new ArrayList<StudentReport>();
        User user = queryUserDomain.getCurrentUser(request);
        List<ExamResult> examResults = queryExamResultDomain.getUserResult(user);

        try {
            String currentPath = System.getProperty("user.dir");
            String filePath = currentPath + "\\src\\main\\webapp\\WEB-INF\\report\\hopez.jasper";
            report = new File(filePath);
            inputStream = new FileInputStream(report);

            for(ExamResult result: examResults){
                StudentReport studentReport = new StudentReport(result.getExamRecord().getPaper().getCode()
                                                                , result.getExamRecord().getPaper().getName()
                                                                , (result.getObjectiveScore() + result.getSubjectiveScore()), 'E');

                studentReports.add(studentReport);
            }

            Map param = queryReportDomain.getParameterStudentReport(user);
            ReportUtils.viewReport(studentReports, inputStream, param, "ผลการสอบ");

        } catch (JRException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}