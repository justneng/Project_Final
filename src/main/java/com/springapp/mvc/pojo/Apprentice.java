package com.springapp.mvc.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Pongpipat on 10/2/2558.
 */
@Entity
@Table(name = "TDCS_APPRENTICE")
public class Apprentice {
    @Id
    @Column(name = "APT_ID")
    private Integer aptId;

    @Column(name = "APT_NAME")
    private String aptName;

    public Integer getAptId() {
        return aptId;
    }

    public void setAptId(Integer aptId) {
        this.aptId = aptId;
    }

    public String getAptName() {
        return aptName;
    }

    public void setAptName(String aptName) {
        this.aptName = aptName;
    }

    @Override
    public String toString() {
        return "Apprentice{" +
                "aptId=" + aptId +
                ", aptName='" + aptName + '\'' +
                '}';
    }
}
