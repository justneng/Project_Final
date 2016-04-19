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
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.IOUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
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

    @RequestMapping(value = "/exam/printReport", method = RequestMethod.GET)
    public void printReport(HttpServletRequest request,
                            HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

        File report = null;
        InputStream inputStream = null;
        List<StudentReport> studentReports = new ArrayList<StudentReport>();
        User user = queryUserDomain.getCurrentUser(request);
        List<ExamResult> examResults = queryExamResultDomain.getUserResult(user);

        try {
            String currentPath = System.getProperty("user.dir");
            String filePath = currentPath + "\\src\\main\\webapp\\WEB-INF\\report\\hopez.jasper";
            String fileXMLToCompile = currentPath + "\\src\\main\\webapp\\WEB-INF\\report\\hopez.jrxml";
            String filePdf = currentPath + "\\src\\main\\webapp\\WEB-INF\\report\\" + user.getEnFname() + ".pdf";
            report = new File(filePath);
            inputStream = new FileInputStream(report);

            float tmp = 0;
            int count = 0;

            for(ExamResult result: examResults){
                String grade = queryReportDomain.calculateGrade(result.getExamRecord().getPaper().getMaxScore(), (result.getObjectiveScore() + result.getSubjectiveScore()));
                StudentReport studentReport = new StudentReport(result.getExamRecord().getPaper().getCode()
                                                                , result.getExamRecord().getPaper().getName()
                                                                , result.getExamRecord().getPaper().getMaxScore()
                                                                , (result.getObjectiveScore() + result.getSubjectiveScore())
                                                                , grade);

                tmp = (float) (tmp + queryReportDomain.revertGradeStringToNumber(grade));
                studentReports.add(studentReport);
                count = count + 1;
            }

            Map param = queryReportDomain.getParameterStudentReport(user, Math.round((tmp/count)*100)/100, count);
            File file = ReportUtils.viewReport(studentReports, inputStream, param, filePdf, fileXMLToCompile);

//            For download pdf
            InputStream is = new FileInputStream(file);
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=\""
                    + file.getName() + "\"");
            OutputStream os = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
            os.flush();
            os.close();
            is.close();
            System.out.println(file.getName() + " was downloaded...");

        } catch (JRException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}