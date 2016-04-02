package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;

/**
 * Created by wanchana on 23/11/2558.
 */
public class CheckCategoryInUse {

    private String id;
    private String name;
    private User createBy;
    private Boolean check;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }
}
