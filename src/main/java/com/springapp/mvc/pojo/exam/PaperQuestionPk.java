package com.springapp.mvc.pojo.exam;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 17-Sep-15.
 */
@Embeddable
public class PaperQuestionPk implements Serializable{

    @ManyToOne
    private ExamPaper examPaper;

    @ManyToOne
    private Question question;

    public ExamPaper getExamPaper() {
        return examPaper;
    }

    public void setExamPaper(ExamPaper examPaper) {
        this.examPaper = examPaper;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

}
