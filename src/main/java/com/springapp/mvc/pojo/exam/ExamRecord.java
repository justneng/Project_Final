package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by Phuthikorn_T on 8/5/2015.
 */
@Entity
@Table(name = "TDCS_EXAM_RECORDS")
public class ExamRecord implements Serializable {

    @Id
    @GenericGenerator(name="exam_record_id" , strategy="increment")
    @GeneratedValue(generator="exam_record_id")
    @Column(name = "RECORD_ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "PAPER_ID")
    private ExamPaper paper;

    @Column(name = "EXAM_DATE")
    private Date examDate;

    @Column(name = "TIME_TAKEN_MINUTE")
    private Integer timeTaken;

//    @Column(name = "COUNT")
//    private Integer count;

    @OneToMany(mappedBy = "examRecord",fetch = FetchType.EAGER)
    @Cascade(CascadeType.ALL)
    private List<ExamAnswerRecord> examAnswerRecords;

    @OneToOne(mappedBy = "examRecord")
    @Cascade(CascadeType.ALL)
    private ExamResult examResult;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExamRecord)) return false;

        ExamRecord that = (ExamRecord) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        if (getUser() != null ? !getUser().equals(that.getUser()) : that.getUser() != null) return false;
        if (getPaper() != null ? !getPaper().equals(that.getPaper()) : that.getPaper() != null) return false;
        if (getExamDate() != null ? !getExamDate().equals(that.getExamDate()) : that.getExamDate() != null)
            return false;
        if (getTimeTaken() != null ? !getTimeTaken().equals(that.getTimeTaken()) : that.getTimeTaken() != null)
            return false;
        if (getExamAnswerRecords() != null ? !getExamAnswerRecords().equals(that.getExamAnswerRecords()) : that.getExamAnswerRecords() != null)
            return false;
        return !(getExamResult() != null ? !getExamResult().equals(that.getExamResult()) : that.getExamResult() != null);

    }

    public ExamResult getExamResult() {
        return examResult;
    }

    public void setExamResult(ExamResult examResult) {
        this.examResult = examResult;
    }

    public List<ExamAnswerRecord> getExamAnswerRecords() {
        return examAnswerRecords;
    }

    public void setExamAnswerRecords(List<ExamAnswerRecord> examAnswerRecords) {
        this.examAnswerRecords = examAnswerRecords;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer recordId) {
        this.id = recordId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User userId) {
        this.user = userId;
    }

    public ExamPaper getPaper() {
        return paper;
    }

    public void setPaper(ExamPaper paperId) {
        this.paper = paperId;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }

//    public Integer getCount() {
//        return count;
//    }
//
//    public void setCount(Integer count) {
//        this.count = count;
//    }
}
