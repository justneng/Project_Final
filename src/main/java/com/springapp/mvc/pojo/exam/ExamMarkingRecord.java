package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 7/15/2015.
 */
@Entity
@Table(name = "TDCS_EXAM_MARKING_RECORD")
public class ExamMarkingRecord implements Serializable {

    @Id
    @GenericGenerator(name="marking_record_id" , strategy="increment")
    @GeneratedValue(generator="marking_record_id")
    @Column(name = "MARKING_RECORD_ID")
    private Integer id;

    @Column(name = "MARKING_SCORE")
    private Float markingScore;

    @OneToOne
    @JoinColumn(name = "ANSWER_RECORD_ID")
    private ExamAnswerRecord answerRecord;

    @ManyToOne
    @JoinColumn(name = "MARKED_BY")
    private User markedBy;

    @ManyToOne
    @JoinColumn(name = "EXAM_RESULT_ID")
    private ExamResult examResult;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getMarkingScore() {
        return markingScore;
    }

    public void setMarkingScore(Float markingScore) {
        this.markingScore = markingScore;
    }

    public ExamAnswerRecord getAnswerRecord() {
        return answerRecord;
    }

    public void setAnswerRecord(ExamAnswerRecord answerRecord) {
        this.answerRecord = answerRecord;
    }

    public User getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(User markedBy) {
        this.markedBy = markedBy;
    }

    public ExamResult getExamResult() {
        return examResult;
    }

    public void setExamResult(ExamResult examResult) {
        this.examResult = examResult;
    }
}
