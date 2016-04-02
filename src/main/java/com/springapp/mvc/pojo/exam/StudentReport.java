package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 14/3/2559.
 */
public class StudentReport {

    private String paperCode;
    private String paperName;
    private Float maxScore;
    private Float realScore;
    private String gradeChar;

    public StudentReport(String paperCode, String paperName, Float maxScore, Float realScore, String gradeChar) {
        this.paperCode = paperCode;
        this.paperName = paperName;
        this.maxScore = maxScore;
        this.realScore = realScore;
        this.gradeChar = gradeChar;
    }

    public Float getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Float maxScore) {
        this.maxScore = maxScore;
    }

    public Float getRealScore() {
        return realScore;
    }

    public void setRealScore(Float realScore) {
        this.realScore = realScore;
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

    public String getGradeChar() {
        return gradeChar;
    }

    public void setGradeChar(String gradeChar) {
        this.gradeChar = gradeChar;
    }
}
