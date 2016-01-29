package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by l3eal2 on 9/2/2558.
 */

@Entity
@Table(name = "TDCS_FACULTY")
public class Faculty {
    @Id
    @Column(name = "FAC_ID")
    private Integer facId;

    @Column(name = "FAC_NAME")
    private String facName;


//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "UNI_ID", insertable = false,updatable = false)
//    private University university;

    public Integer getFacId() {
        return facId;
    }

    public void setFacId(Integer facId) {
        this.facId = facId;
    }

    public String getFacName() {
        return facName;
    }

    public void setFacName(String facName) {
        this.facName = facName;
    }

    @Override
    public String toString() {
        return "Faculty{" +
                "facId=" + facId +
                ", facName='" + facName + '\'' +
                '}';
    }
}
