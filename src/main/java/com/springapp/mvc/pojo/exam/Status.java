package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T on 7/13/2015.
 */
@Entity
@Table(name = "TDCS_STATUS")
public class Status implements Serializable {

    @Id
    @Column(name = "STATUS_ID")
    private Integer id;

    @Column(name = "STATUS_NAME")
    private String name;

    @Column(name = "STATUS_DESCRIPTION")
    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
