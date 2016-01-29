package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 6/3/2558.
 */
@Entity
@Table(name = "TDCS_UNIVERSITY_FACULTY")
public class UniversityFaculty {

    @Id
    @Column(name = "UNI_FAC_ID")
    private Integer uniFacId;

    @Column(name = "UNI_ID")
    private Integer uniId;

    @Column(name = "FAC_ID")
    private Integer facId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UNI_ID", insertable = false,updatable = false)
    private University university;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FAC_ID", insertable = false,updatable = false)
    private Faculty faculty;

    public Integer getUniFacId() {
        return uniFacId;
    }

    public void setUniFacId(Integer uniFacId) {
        this.uniFacId = uniFacId;
    }

    public Integer getUniId() {
        return uniId;
    }

    public void setUniId(Integer uniId) {
        this.uniId = uniId;
    }

    public Integer getFacId() {
        return facId;
    }

    public void setFacId(Integer facId) {
        this.facId = facId;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    @Override
    public String toString() {
        return "UniversityFaculty{" +
                "uniFacId=" + uniFacId +
                ", uniId=" + uniId +
                ", facId=" + facId +
                ", university=" + university +
                ", faculty=" + faculty +
                '}';
    }
}
