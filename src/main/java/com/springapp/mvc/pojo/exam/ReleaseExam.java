package com.springapp.mvc.pojo.exam;


import com.springapp.mvc.pojo.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by wanchana on 23/3/2559.
 */
@Entity
@Table(name = "TDCS_USERS_PAPERS")
@AssociationOverrides({
        @AssociationOverride(name = "pk.user", joinColumns = @JoinColumn(name = "USER_ID")),
        @AssociationOverride(name = "pk.examPaper", joinColumns = @JoinColumn(name = "PAPER_ID")),
        @AssociationOverride(name = "pk.updateBy", joinColumns = @JoinColumn(name = "UPDATE_BY"))
})
public class ReleaseExam implements Serializable{
    @EmbeddedId
    private ReleaseExamPk pk = new ReleaseExamPk();

    @Column(name = "RELEASE_DATE_FROM")
    private Date releaseDateFrom;

    @Column(name = "RELEASE_DATE_TO")
    private Date releaseDateTo;

    @Column(name = "RELEASING")
    private char checkRelease;

    @Column(name = "IN_TIME")
    private Integer checkInTime;

    public ReleaseExam(ReleaseExamPk pk, Date releaseDateFrom, Date releaseDateTo, char checkRelease, Integer checkInTime) {
        this.pk = pk;
        this.releaseDateFrom = releaseDateFrom;
        this.releaseDateTo = releaseDateTo;
        this.checkRelease = checkRelease;
        this.checkInTime = checkInTime;
    }

    public ReleaseExam(){

    }

    public Date getReleaseDateFrom() {
        return releaseDateFrom;
    }

    public void setReleaseDateFrom(Date releaseDateFrom) {
        this.releaseDateFrom = releaseDateFrom;
    }

    public Date getReleaseDateTo() {
        return releaseDateTo;
    }

    public void setReleaseDateTo(Date releaseDateTo) {
        this.releaseDateTo = releaseDateTo;
    }

    @Transient
    public ExamPaper getExamPaper(){
        return pk.getExamPaper();
    }
    public void setExamPaper(ExamPaper ep){
        pk.setExamPaper(ep);
    }

    @Transient
    public User getUpdateBy(){
        return pk.getUpdateBy();
    }
    public void setUpdateBy(User updateBy){
        pk.setUpdateBy(updateBy);
    }

    @Transient
    public User getUser(){
        return pk.getUser();
    }
    public void setUser(User user){
        pk.setUser(user);
    }

    public ReleaseExamPk getPk() {
        return pk;
    }

    public void setPk(ReleaseExamPk pk) {
        this.pk = pk;
    }

    public char getCheckRelease() {
        return checkRelease;
    }

    public void setCheckRelease(char checkRelease) {
        this.checkRelease = checkRelease;
    }

    public Integer getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(Integer checkInTime) {
        this.checkInTime = checkInTime;
    }
}
