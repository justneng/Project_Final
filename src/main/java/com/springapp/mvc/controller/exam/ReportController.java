package com.springapp.mvc.controller.exam;

import com.springapp.mvc.controller.exam.reportutils.ReportUtils;
import com.springapp.mvc.domain.exam.QueryPaperDomain;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.PaperPaper;
import com.springapp.mvc.util.HibernateUtil;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRReportUtils;
import net.sf.jasperreports.view.JasperViewer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by wanchana on 11/3/2559.
 */
@Controller
@RequestMapping("/TDCS")
public class ReportController {

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @RequestMapping(value = "/exam/printReport", method = RequestMethod.POST)
    public String printReport(HttpServletRequest request,
                            HttpServletResponse response) throws ClassNotFoundException, SQLException {

        File report = null;
        InputStream inputStream = null;

        try {
            report = new File("G:\\TDCS-master\\src\\main\\webapp\\WEB-INF\\report\\viewScore.jasper");
            inputStream = new FileInputStream(report);
            List<PaperPaper> paperTest = new ArrayList<PaperPaper>();
            List<ExamPaper> examPapers = queryPaperDomain.getAllPapers();
            for(ExamPaper p : examPapers){
                PaperPaper pt = new PaperPaper();
                pt.setNAME(p.getName());
                paperTest.add(pt);
            }
//            PaperPaper pt = new PaperPaper();
//            pt.setCode("CODEE");
//            pt.setName("wanchana");
//            paperTest.add(pt);
//            PaperPaper pt2 = new PaperPaper();
//            pt2.setCode("CODEE");
//            pt2.setName("wanchana");
//            paperTest.add(pt2);

            List testList = new ArrayList();
            testList.add(paperTest);

            Map param = new HashMap();
            param.put("code", "T0001");
            param.put("name", "ทดลองสร้างชุดข้อสอ#1");
//            JasperPrint ip = JasperFillManager.fillReport("G:\\TDCS-master\\src\\main\\webapp\\WEB-INF\\report\\viewScore.jasper", param, new JRBeanCollectionDataSource(paperTest));
//            JasperViewer.viewReport(ip);
//            JasperViewer viewer = new JasperViewer(ip);
//            viewer.setVisible(true);
//            viewer.setFitPageZoomRatio();

            ReportUtils.viewReport(testList, inputStream, param, "test report viewer");

        } catch (JRException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        return "checkScore";
    }
}