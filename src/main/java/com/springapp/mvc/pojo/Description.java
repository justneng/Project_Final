package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by l3eal2 on 17/3/2558.
 */
@Entity
@Table(name = "TDCS_DESCRIPTION")
public class Description {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator="TDCS_DESCRI_SEQ_GEN")
    @SequenceGenerator(name="TDCS_DESCRI_SEQ_GEN", sequenceName="TDCS_DESCRI_SEQ")
    @Column(name = "DESC_ID")
    private Integer descriptionId;

    @Column(name = "SUB_ID")
    private Integer subtopicId;

    @Column(name = "DESC_DATA")
    private String descriptionData;

    @Column(name = "GRADE")
    private String grade;

    @Column(name = "MIN")
    private Integer min;

    @Column(name = "MAX")
    private Integer max;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SUB_ID", insertable = false, updatable = false)
    private Subtopic subtopic;

    public Integer getDescriptionId() {
        return descriptionId;
    }

    public void setDescriptionId(Integer descriptionId) {
        this.descriptionId = descriptionId;
    }

    public Integer getSubtopicId() {
        return subtopicId;
    }

    public void setSubtopicId(Integer subtopicId) {
        this.subtopicId = subtopicId;
    }

    public String getDescriptionData() {
        return descriptionData;
    }

    public void setDescriptionData(String descriptionData) {
        this.descriptionData = descriptionData;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public Subtopic getSubtopic() {
        return subtopic;
    }

    public void setSubtopic(Subtopic subtopic) {
        this.subtopic = subtopic;
    }

    @Override
    public String toString() {
        return "Description{" +
                "descriptionId=" + descriptionId +
                ", subtopicId=" + subtopicId +
                ", descriptionData='" + descriptionData + '\'' +
                ", grade='" + grade + '\'' +
                ", min=" + min +
                ", max=" + max +
                ", subtopic=" + subtopic +
                '}';
    }
}
