package com.springapp.mvc.pojo.exam;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by wanchana on 15/4/2559.
 */
@Entity
@Table(name = "TDCS_PAPER_TYPES")
public class PaperType implements Serializable {

    @Id
    @Column(name = "PAPER_TYPE_ID")
    private Integer id;

    @Column(name = "PAPER_TYPE_NAME")
    private String name;

    public PaperType() {
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
}
