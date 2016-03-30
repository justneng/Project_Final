package com.springapp.mvc.pojo.exam;

import java.util.Date;

/**
 * Created by wanchana on 24/3/2559.
 */
public class ListenUsersInPosition {

    private Integer userId;
    private String fname;
    private String lname;
    private Integer positionId;
    private String positionName;
    private Boolean permiss;
    private Date dateTo;
    private char release;
    private Integer intime;

    public ListenUsersInPosition(Integer userId, String fname, String lname, Integer sectionId, String sectionName, char release, Integer intime) {
        this.userId = userId;
        this.fname = fname;
        this.lname = lname;
        this.positionId = sectionId;
        this.positionName = sectionName;
        this.release = release;
        this.intime = intime;
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

    public Integer getPositionId() {
        return positionId;
    }

    public void setPositionId(Integer positionId) {
        this.positionId = positionId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public Boolean getPermiss() {
        return permiss;
    }

    public void setPermiss(Boolean permiss) {
        this.permiss = permiss;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }

    public char getRelease() {
        return release;
    }

    public void setRelease(char release) {
        this.release = release;
    }

    public Integer getIntime() {
        return intime;
    }

    public void setIntime(Integer intime) {
        this.intime = intime;
    }
}
