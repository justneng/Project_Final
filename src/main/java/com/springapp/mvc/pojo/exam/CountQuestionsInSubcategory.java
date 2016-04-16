package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;

/**
 * Created by wanchana on 16/4/2559.
 */
public class CountQuestionsInSubcategory {
    private Integer id;
    private String name;
    private Category category;
    private User createBy;
    private Integer numberOfQuestion;

    public CountQuestionsInSubcategory(Integer id, String name, Category category, User createBy, Integer numberOfQuestion) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.createBy = createBy;
        this.numberOfQuestion = numberOfQuestion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

    public Integer getNumberOfQuestion() {
        return numberOfQuestion;
    }

    public void setNumberOfQuestion(Integer numberOfQuestion) {
        this.numberOfQuestion = numberOfQuestion;
    }
}
