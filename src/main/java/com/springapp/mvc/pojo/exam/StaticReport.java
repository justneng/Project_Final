package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 25/4/2559.
 */
public class StaticReport {

    private String PAPER_CODE;
    private String PAPER_NAME;
    private String NAME;
    private Float REALSCORE;
    private Float PAPER_MAX_SCORE;

    public String getPAPER_CODE() {
        return PAPER_CODE;
    }

    public void setPAPER_CODE(String PAPER_CODE) {
        this.PAPER_CODE = PAPER_CODE;
    }

    public String getPAPER_NAME() {
        return PAPER_NAME;
    }

    public void setPAPER_NAME(String PAPER_NAME) {
        this.PAPER_NAME = PAPER_NAME;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public Float getREALSCORE() {
        return REALSCORE;
    }

    public void setREALSCORE(Float REALSCORE) {
        this.REALSCORE = REALSCORE;
    }

    public Float getPAPER_MAX_SCORE() {
        return PAPER_MAX_SCORE;
    }

    public void setPAPER_MAX_SCORE(Float PAPER_MAX_SCORE) {
        this.PAPER_MAX_SCORE = PAPER_MAX_SCORE;
    }
}
