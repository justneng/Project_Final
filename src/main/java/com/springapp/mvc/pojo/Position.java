package com.springapp.mvc.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Pongpipat on 10/2/2558.
 */
@Entity
@Table(name = "TDCS_POSITION")
public class Position {
    @Id
    @Column(name = "POSI_ID")
    private Integer posiId;

    @Column(name = "POSI_FOR")
    private String posiFor;

    @Column(name = "POSI_NAME")
    private String posiName;

    public Integer getPosiId() {
        return posiId;
    }

    public void setPosiId(Integer posiId) {
        this.posiId = posiId;
    }

    public String getPosiFor() {
        return posiFor;
    }

    public void setPosiFor(String posiFor) {
        this.posiFor = posiFor;
    }

    public String getPosiName() {
        return posiName;
    }

    public void setPosiName(String posiName) {
        this.posiName = posiName;
    }

    @Override
    public String toString() {
        return "Position{" +
                "posiId=" + posiId +
                ", posiFor='" + posiFor + '\'' +
                ", posiName='" + posiName + '\'' +
                '}';
    }
}
