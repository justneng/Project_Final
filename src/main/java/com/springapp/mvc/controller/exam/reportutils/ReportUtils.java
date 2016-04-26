package com.springapp.mvc.controller.exam.reportutils;

import com.springapp.mvc.pojo.exam.StaticReport;
import com.springapp.mvc.pojo.exam.StudentReport;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.view.JasperViewer;

import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created and modified by wanchana
 * ref:http://na5cent.blogspot.com/2013/04/inject-jasper-pdf-viewer-into-java.html
 */
public class ReportUtils {

    public static File viewStudentReport(List<StudentReport> models, InputStream inputStream, Map params, String filePdf, String toCompile) throws JRException {

        JRBeanCollectionDataSource beans = null;
        if(models != null){
            beans = new JRBeanCollectionDataSource(models);
        }
        File file = new File(filePdf);
        if(file.exists()){
            file.delete();
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(toCompile);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, beans);
//        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, params, beans);
        JasperExportManager.exportReportToPdfFile(jasperPrint, filePdf);

        return new File(filePdf);
//        JasperViewer viewer = new JasperViewer(jasperPrint, false);
//        viewer.setVisible(true);
//        viewer.setFitPageZoomRatio();
    }

    public static File viewStatictReport(List<StaticReport> models, InputStream inputStream, Map params, String filePdf, String toCompile) throws JRException {

        JRBeanCollectionDataSource beans = null;
        if(models != null){
            beans = new JRBeanCollectionDataSource(models);
        }
        File file = new File(filePdf);
        if(file.exists()){
            file.delete();
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(toCompile);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, beans);
        JasperExportManager.exportReportToPdfFile(jasperPrint, filePdf);

        return new File(filePdf);
    }

}
