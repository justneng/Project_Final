package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Entity
@Table(name = "TDCS_SECTION")
public class Section {

    @Id
    @Column(name = "SECTION_ID")
    Integer sectionId;

    @Column(name = "SECTION_NAME")
    String sectionName;

    @Column(name = "COMP_ID")
    Integer conpId;

    @Column(name = "USER_ID")
    Integer userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COMP_ID", insertable = false,updatable = false)
    private Company company;

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Integer getConpId() {
        return conpId;
    }

    public void setConpId(Integer conpId) {
        this.conpId = conpId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "Section{" +
                "sectionId=" + sectionId +
                ", sectionName='" + sectionName + '\'' +
                ", conpId=" + conpId +
                ", userId=" + userId +
                ", company=" + company +
                '}';
    }
}
