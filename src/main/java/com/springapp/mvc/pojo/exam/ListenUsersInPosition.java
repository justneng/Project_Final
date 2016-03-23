package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 24/3/2559.
 */
public class ListenUsersInPosition {

    private Integer userId;
    private String fname;
    private String lname;
    private Integer positionId;
    private String positionName;

    public ListenUsersInPosition(Integer userId, String fname, String lname, Integer sectionId, String sectionName) {
        this.userId = userId;
        this.fname = fname;
        this.lname = lname;
        this.positionId = sectionId;
        this.positionName = sectionName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public Integer getSectionId() {
        return positionId;
    }

    public void setSectionId(Integer sectionId) {
        this.positionId = sectionId;
    }

    public String getSectionName() {
        return positionName;
    }

    public void setSectionName(String sectionName) {
        this.positionName = sectionName;
    }

}
