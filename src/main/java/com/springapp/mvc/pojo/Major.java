package com.springapp.mvc.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by l3eal2 on 9/2/2558.
 */
@Entity
@Table(name = "TDCS_MAJOR")
public class Major {
    @Id
    @Column(name = "MAJ_ID")
    private Integer majId;

    @Column(name = "MAJ_NAME")
    private String majName;

    public Integer getMajId() {
        return majId;
    }

    public void setMajId(Integer majId) {
        this.majId = majId;
    }

    public String getMajName() {
        return majName;
    }

    public void setMajName(String majName) {
        this.majName = majName;
    }

    @Override
    public String toString() {
        return "Major{" +
                "majId=" + majId +
                ", majName='" + majName + '\'' +
                '}';
    }
}
