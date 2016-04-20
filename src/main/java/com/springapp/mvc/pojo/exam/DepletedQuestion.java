package com.springapp.mvc.pojo.exam;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by PTang_000 on 20-Apr-16.
 */
@Entity
@Table(name="TDCS_DEPLETED_QUESTION")
public class DepletedQuestion {
    @Id
    @GenericGenerator(name = "depleted_question_id", strategy = "increment")
    @GeneratedValue(generator = "depleted_question_id")
    @Column(name = "ID")
    private  String id;

    @ManyToOne
    @JoinColumn(name = "PAPER_ID")
    private ExamPaper paper;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ExamPaper getPaper() {
        return paper;
    }

    public void setPaper(ExamPaper paper) {
        this.paper = paper;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DepletedQuestion)) return false;

        DepletedQuestion that = (DepletedQuestion) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        if (getPaper() != null ? !getPaper().equals(that.getPaper()) : that.getPaper() != null) return false;
        return !(getQuestion() != null ? !getQuestion().equals(that.getQuestion()) : that.getQuestion() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getPaper() != null ? getPaper().hashCode() : 0);
        result = 31 * result + (getQuestion() != null ? getQuestion().hashCode() : 0);
        return result;
    }
}
