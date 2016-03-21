package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 14/3/2559.
 */
public class StudentReport {

    private String paperCode;
    private String paperName;
    private Float grade;
    private char gradeChar;

    public StudentReport(String paperCode, String paperName, Float grade, char gradeChar) {
        this.paperCode = paperCode;
        this.paperName = paperName;
        this.grade = grade;
        this.gradeChar = gradeChar;
    }

    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public Float getGrade() {
        return grade;
    }

    public void setGrade(Float grade) {
        this.grade = grade;
    }

    public char getGradeChar() {
        return gradeChar;
    }

    public void setGradeChar(char gradeChar) {
        this.gradeChar = gradeChar;
    }
}
