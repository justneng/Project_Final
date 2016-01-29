package com.springapp.mvc.pojo.exam;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 7/1/2015.
 */
@Entity
@Table(name="TDCS_CHOICES")
public class Choice  implements Serializable {

    @Id
    @GenericGenerator(name="choice_id" , strategy="increment")
    @GeneratedValue(generator="choice_id")
    @Column(name="CHOICE_ID")
    private Integer id;

    @Column(name="CHOICE_DESCRIPTION")
    private String description;

    @Column(name="CHOICE_CORRECTION")
    @Type(type = "yes_no")
    private boolean correction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "CHOICE_STATUS")
    private Status status;

    public Boolean getCorrection() {
        return correction;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCorrection() {
        return correction;
    }

    public void setCorrection(boolean correction) {
        this.correction = correction;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question questionId) {
        this.question = questionId;
    }
}
