package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import flexjson.JSONSerializer;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by Phuthikorn_T on 6/30/2015.
 */

@Entity
@Table(name = "TDCS_QUESTIONS")
public class Question implements Serializable, Cloneable {

    @Id
    @GenericGenerator(name = "question_id", strategy = "increment")
    @GeneratedValue(generator = "question_id")
    @Column(name = "QUESTION_ID")
    private Integer id;

    @Column(name = "QUESTION_DESCRIPTION")
    private String description;

    @Column(name = "QUESTION_SCORE")
    private Float score;

    @Column(name = "QUESTION_CREATE_DATE")
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "DIFFICULTY_LEVEL")
    private Difficulty difficultyLevel;

    @ManyToOne
    @JoinColumn(name = "SUB_CATEGORY_ID")
    private SubCategory subCategory;

    @ManyToOne
    @JoinColumn(name = "QUESTION_TYPE_ID")
    private QuestionType questionType;

    @ManyToOne
    @JoinColumn(name = "QUESTION_CREATE_BY")
    private User createBy;

    @ManyToOne
    @JoinColumn(name = "QUESTION_STATUS")
    private Status status;

    @Column(name = "QUESTION_UPDATE_DATE")
    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "QUESTION_UPDATE_BY")
    private User updateBy;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question")
    private List<Choice> choices;

    public String toJson() {

        return new JSONSerializer().exclude("choices.question").exclude("").serialize(this);
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.question", cascade =
            {CascadeType.PERSIST, CascadeType.MERGE})
    @Cascade({org.hibernate.annotations.CascadeType.SAVE_UPDATE,
            org.hibernate.annotations.CascadeType.DELETE_ORPHAN})
    private List<PaperQuestion> papers;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Question)) return false;

        Question question = (Question) o;

        if (getId() != null ? !getId().equals(question.getId()) : question.getId() != null) return false;
        if (getDescription() != null ? !getDescription().equals(question.getDescription()) : question.getDescription() != null)
            return false;
        if (getScore() != null ? !getScore().equals(question.getScore()) : question.getScore() != null) return false;
        if (getCreateDate() != null ? !getCreateDate().equals(question.getCreateDate()) : question.getCreateDate() != null)
            return false;
        if (getDifficultyLevel() != null ? !getDifficultyLevel().equals(question.getDifficultyLevel()) : question.getDifficultyLevel() != null)
            return false;
        if (getSubCategory() != null ? !getSubCategory().equals(question.getSubCategory()) : question.getSubCategory() != null)
            return false;
        if (getQuestionType() != null ? !getQuestionType().equals(question.getQuestionType()) : question.getQuestionType() != null)
            return false;
        if (getCreateBy() != null ? !getCreateBy().equals(question.getCreateBy()) : question.getCreateBy() != null)
            return false;
        if (getStatus() != null ? !getStatus().equals(question.getStatus()) : question.getStatus() != null)
            return false;
        if (getUpdateDate() != null ? !getUpdateDate().equals(question.getUpdateDate()) : question.getUpdateDate() != null)
            return false;
        if (getUpdateBy() != null ? !getUpdateBy().equals(question.getUpdateBy()) : question.getUpdateBy() != null)
            return false;
        if (getChoices() != null ? !getChoices().equals(question.getChoices()) : question.getChoices() != null)
            return false;
        return !(getPapers() != null ? !getPapers().equals(question.getPapers()) : question.getPapers() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (getScore() != null ? getScore().hashCode() : 0);
        result = 31 * result + (getCreateDate() != null ? getCreateDate().hashCode() : 0);
        result = 31 * result + (getDifficultyLevel() != null ? getDifficultyLevel().hashCode() : 0);
        result = 31 * result + (getSubCategory() != null ? getSubCategory().hashCode() : 0);
        result = 31 * result + (getQuestionType() != null ? getQuestionType().hashCode() : 0);
        result = 31 * result + (getCreateBy() != null ? getCreateBy().hashCode() : 0);
        result = 31 * result + (getStatus() != null ? getStatus().hashCode() : 0);
        result = 31 * result + (getUpdateDate() != null ? getUpdateDate().hashCode() : 0);
        result = 31 * result + (getUpdateBy() != null ? getUpdateBy().hashCode() : 0);
        result = 31 * result + (getChoices() != null ? getChoices().hashCode() : 0);
        result = 31 * result + (getPapers() != null ? getPapers().hashCode() : 0);
        return result;
    }

    public Date getBestDate() {
        if (updateDate == null) {
            return createDate;
        } else {
            return updateDate;
        }
    }

    public List<PaperQuestion> getPapers() {
        return papers;
    }

    public void setPapers(List<PaperQuestion> papers) {
        this.papers = papers;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public User getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(User updateBy) {
        this.updateBy = updateBy;
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

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Difficulty getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(Difficulty difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategoryId) {
        this.subCategory = subCategoryId;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(QuestionType questionTypeId) {
        this.questionType = questionTypeId;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
