package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 6/3/2558.
 */
@Entity
@Table(name = "TDCS_UNIVERSITY_FACULTY_MAJOR")
public class UniversityFacultyMajor {

    @Id
    @Column(name = "UNI_FAC_MAJ_ID")
    private Integer uniFacMajId;

    @Column(name = "UNI_FAC_ID")
    private Integer uniFacId;

    @Column(name = "MAJ_ID")
    private Integer majId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UNI_FAC_ID", insertable = false,updatable = false)
    private UniversityFaculty universityFaculty;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MAJ_ID", insertable = false,updatable = false)
    private Major major;

    public UniversityFaculty getUniversityFaculty() {
        return universityFaculty;
    }

    public void setUniversityFaculty(UniversityFaculty universityFaculty) {
        this.universityFaculty = universityFaculty;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public Integer getUniFacMajId() {
        return uniFacMajId;
    }

    public void setUniFacMajId(Integer uniFacMajId) {
        this.uniFacMajId = uniFacMajId;
    }

    public Integer getUniFacId() {
        return uniFacId;
    }

    public void setUniFacId(Integer uniFacId) {
        this.uniFacId = uniFacId;
    }

    public Integer getMajId() {
        return majId;
    }

    public void setMajId(Integer majId) {
        this.majId = majId;
    }

    @Override
    public String toString() {
        return "UniversityFacultyMajor{" +
                "uniFacMajId=" + uniFacMajId +
                ", uniFacId=" + uniFacId +
                ", majId=" + majId +
                ", universityFaculty=" + universityFaculty +
                ", major=" + major +
                '}';
    }
}
