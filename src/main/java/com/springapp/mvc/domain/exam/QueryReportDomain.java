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

    public Map getParameterStudentReport(User user, float percentage, int count){
        User staff = queryUserDomain.getUserById(user.getStaffId());
        String image = "";
        if(user.getImange() == null){
            image = "";
        }
        else{
            image = user.getImange();
        }

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
        parameterReport.put("image", getImageUser(image));
        parameterReport.put("percentage", percentage);
        parameterReport.put("sumGrade", getGradeByScore(percentage));
//        parameterReport.put("sumGrade", calculateGrade(percentage , new Float(count * 100)));

        return parameterReport;
    }

    public static BufferedImage getImageUser(String image){
        String currentPath = System.getProperty("user.dir");
        String filePath = "";

        if(image.equals("")){
            filePath = currentPath + "\\src\\main\\webapp\\resources\\pictureUpload\\no-image.png";
        }
        else{
            filePath = currentPath + "\\src\\main\\webapp\\resources\\pictureUpload\\" + image;
        }

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

    public static Double revertGradeStringToNumber(String grade){
        if(grade.equals("A")){
            return 100.0;
        }
        else if(grade.equals("B+")){
            return 75.0;
        }
        else if(grade.equals("B")){
            return 70.0;
        }
        else if(grade.equals("C+")){
            return 65.0;
        }
        else if(grade.equals("C")){
            return 60.0;
        }
        else if(grade.equals("D+")){
            return 55.0;
        }
        else if(grade.equals("D")){
            return 50.0;
        }
        else{
            return 0.0;
        }
    }

    public static String calculateGrade(float maxScore, float userScore){
//        float percentage = maxScore / 100;
//        float realPercentage = userScore / percentage;
        float realPercentage = maxScore / userScore;

        if(realPercentage >= 80){
            return "A";
        }
        else if(realPercentage >= 75 && realPercentage <= 79){
            return "B+";
        }
        else if(realPercentage >= 70 && realPercentage <= 74){
            return "B";
        }
        else if(realPercentage >= 65 && realPercentage <= 69){
            return "C+";
        }
        else if(realPercentage >= 60 && realPercentage <= 64){
            return "C";
        }
        else if(realPercentage >= 55 && realPercentage <= 59){
            return "D+";
        }
        else if(realPercentage >= 50 && realPercentage <= 54){
            return "D";
        }
        else{
            return "F";
        }
    }

    public String getGradeByScore(Float score){

        if(score >= 80){
            return "A";
        }
        else if(score >= 75 && score <= 79){
            return "B+";
        }
        else if(score >= 70 && score <= 74){
            return "B";
        }
        else if(score >= 65 && score <= 69){
            return "C+";
        }
        else if(score >= 60 && score <= 64){
            return "C";
        }
        else if(score >= 55 && score <= 59){
            return "D+";
        }
        else if(score >= 50 && score <= 54){
            return "D";
        }
        else{
            return "F";
        }
    }
}
