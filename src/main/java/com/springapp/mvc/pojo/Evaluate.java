package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by l3eal2 on 30/3/2558.
 */
@Entity
@Table(name = "TDCS_EVALUATE")
public class Evaluate {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO, generator="TDCS_EVALUATE_SEQ_GEN")
    @SequenceGenerator(name="TDCS_EVALUATE_SEQ_GEN", sequenceName="TDCS_EVALUATE_SEQ")
    @Column(name = "EVA_ID")
    private Integer evaId;

    @Column(name = "SUB_ID")
    private Integer subId;

    @Column(name = "SCORE")
    private Float score;

    @Column(name = "NOTE")
    private String note;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "USER_ID")
    private Integer userId;

    public Integer getEvaId() {
        return evaId;
    }

    public void setEvaId(Integer evaId) {
        this.evaId = evaId;
    }

    public Integer getSubId() {
        return subId;
    }

    public void setSubId(Integer subId) {
        this.subId = subId;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Evaluate{" +
                "evaId=" + evaId +
                ", subId=" + subId +
                ", score=" + score +
                ", note='" + note + '\'' +
                ", type='" + type + '\'' +
                ", userId=" + userId +
                '}';
    }
}
