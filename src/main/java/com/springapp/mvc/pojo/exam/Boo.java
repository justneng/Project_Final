package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T on 7/1/2015.
 */
@Entity
@Table(name="BOOLEAN")
public class Boo implements Serializable {

    @Id
    @Column(name="BOOLEAN_VALUE")
    private Integer value;

    @Column(name="BOOLEAN_DESCRIPTION")
    private String description;


    public boolean getBoolean(){
        if(value == 1){
            return true;
        }else{
            return false;
        }
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
