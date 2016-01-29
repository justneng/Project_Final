package com.springapp.mvc.pojo;


import javax.persistence.*;

/**
 * Created by Pongpipat on 9/2/2558.
 */
@Entity
@Table(name = "TDCS_UNIVERSITY")
public class University {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO, generator="TDCS_UNI_SEQ_GEN")
    @SequenceGenerator(name="TDCS_UNI_SEQ_GEN", sequenceName="TDCS_UNI_SEQ")
    @Column(name = "UNI_ID")
    private Integer id;

    @Column(name = "UNIVERSITY_NAME")
    private String university_name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUniversity_name() {
        return university_name;
    }

    public void setUniversity_name(String university_name) {
        this.university_name = university_name;
    }

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    @Override
    public String toString() {
        return "University{" +
                "id=" + id +
                ", university_name='" + university_name + '\'' +
//                ", user=" + user +
                '}';
    }
}
