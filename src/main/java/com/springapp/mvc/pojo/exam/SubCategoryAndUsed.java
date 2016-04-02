package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;

import java.util.Set;

/**
 * Created by wanchana on 2/4/2559.
 */
public class SubCategoryAndUsed {
    private Integer id;
    private String name;
    private User createBy;
    private Category category;
    private Boolean isUsed;

    public SubCategoryAndUsed cloneFromSubCategory(SubCategory sc, Set<Integer> usedSubCatIds) {
        this.id = sc.getId();
        this.name = sc.getName();
        this.createBy = sc.getCreateBy();
        this.category = sc.getCategory();
        this.isUsed = false;

        for (Integer i : usedSubCatIds) {
            if (this.id.equals(i)) {
                this.isUsed = true;
                System.out.println(isUsed);
            }
        }
        return this;
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

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(Boolean isUsed) {
        this.isUsed = isUsed;
    }
}
