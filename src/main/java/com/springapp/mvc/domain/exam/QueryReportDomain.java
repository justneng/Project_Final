package com.springapp.mvc.domain.exam;

import com.springapp.mvc.domain.QueryTeamDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wanchana on 19/3/2559.
 */
@Service
public class QueryReportDomain {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryTeamDomain queryTeamDomain;

    public Map getParameterStudentReport(User user){
        User staff = queryUserDomain.getUserById(user.getStaffId());
        Map parameterReport = new HashMap();
        parameterReport.put("studentId", user.getEmpId());
        parameterReport.put("team", staff.getTeam().getTeamName());
        parameterReport.put("studentName", user.getThFname() + " " + user.getThLname());
        parameterReport.put("faculty", user.getUniversityFacultyMajor().getUniversityFaculty().getFaculty().getFacName());
        parameterReport.put("major", user.getUniversityFacultyMajor().getMajor().getMajName());
        parameterReport.put("university", user.getUniversityFacultyMajor().getUniversityFaculty().getUniversity().getUniversity_name());
        parameterReport.put("startWorking", user.getStartWork() + " - " + user.getEndWork());
        parameterReport.put("section", user.getPosition().getPosiName());
        parameterReport.put("apprentice", user.getApprentice().getAptName());
        parameterReport.put("staff", staff.getThFname() + " " + staff.getThLname());
        parameterReport.put("image", getImageUser(user.getImange()));

        return parameterReport;
    }

    public static BufferedImage getImageUser(String image){
        String currentPath = System.getProperty("user.dir");
        String filePath = currentPath + "\\src\\main\\webapp\\resources\\pictureUpload\\" + image;

        BufferedImage bufferedImage = null;
        try{
            File file = new File(filePath);
            bufferedImage = ImageIO.read(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return bufferedImage;
    }
}
