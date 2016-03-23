package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by wanchana on 23/3/2559.
 */
@Embeddable
public class ReleaseExamPk implements Serializable{

    @ManyToOne
    private User user;

    @ManyToOne
    private ExamPaper examPaper;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ExamPaper getExamPaper() {
        return examPaper;
    }

    public void setExamPaper(ExamPaper examPaper) {
        this.examPaper = examPaper;
    }
}
