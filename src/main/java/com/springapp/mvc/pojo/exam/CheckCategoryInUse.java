package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 23/11/2558.
 */
public class CheckCategoryInUse {

    private Category category;
    private Boolean check;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }
}
