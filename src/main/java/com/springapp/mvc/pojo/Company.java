package com.springapp.mvc.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Entity
@Table(name = "TDCS_COMPANY")
public class Company {
    @Id
    @Column(name = "COMP_ID")
    Integer compId;

    @Column(name = "COMP_NAME")
    String compName;

    public Integer getCompId() {
        return compId;
    }

    public void setCompId(Integer compId) {
        this.compId = compId;
    }

    public String getCompName() {
        return compName;
    }

    public void setCompName(String compName) {
        this.compName = compName;
    }

    @Override
    public String toString() {
        return "Company{" +
                "compId=" + compId +
                ", compName='" + compName + '\'' +
                '}';
    }
}
