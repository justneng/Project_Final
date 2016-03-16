package com.springapp.mvc.controller.exam.reportutils;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.view.JRSaveContributor;
import net.sf.jasperreports.view.save.JRPdfSaveContributor;

/**
 * Created by ref:http://na5cent.blogspot.com/2013/04/inject-jasper-pdf-viewer-into-java.html
 */
public class JasperViewer extends net.sf.jasperreports.view.JasperViewer {

    public JasperViewer(JasperPrint jasperPrint, String title) {
        super(jasperPrint, false);
        setTitle(title);
        JRSaveContributor[] contrib = viewer.getSaveContributors();
        for (JRSaveContributor ct : contrib) {
            if (!(ct instanceof JRPdfSaveContributor)) {
                viewer.removeSaveContributor(ct);
            }
        }

    }
}
