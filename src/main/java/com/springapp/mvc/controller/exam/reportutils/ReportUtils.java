package com.springapp.mvc.controller.exam.reportutils;

import com.springapp.mvc.pojo.exam.PaperPaper;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by ref:http://na5cent.blogspot.com/2013/04/inject-jasper-pdf-viewer-into-java.html
 */
public class ReportUtils {

    public static void viewReport(List<PaperPaper> models, InputStream inputStream, Map params, String title) throws JRException {
        JRBeanCollectionDataSource beans = new JRBeanCollectionDataSource(models);
        JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, params, beans);
        JasperViewer viewer = new JasperViewer(jasperPrint, title);
        viewer.setVisible(true);
        viewer.setFitPageZoomRatio();
    }
}
