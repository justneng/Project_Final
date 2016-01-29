package com.springapp.mvc.controller.exam;

import com.springapp.mvc.pojo.exam.Category;

/**
 * Created by wanchana on 23/1/2559.
 */
public class PrepareCategory {

    private Category category;
    private int numberOfQuestions;

    public PrepareCategory(Category category, int numberOfQuestions){
        this.category = category;
        this.numberOfQuestions = numberOfQuestions;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}
