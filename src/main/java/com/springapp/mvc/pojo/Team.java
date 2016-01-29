package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Entity
@Table(name = "TDCS_TEAM")
public class Team {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO, generator="TDCS_TEAM_SEQ_GEN")
    @SequenceGenerator(name="TDCS_TEAM_SEQ_GEN", sequenceName="TDCS_TEAM_SEQ")
    @Column(name = "TEAM_ID")
    Integer teamId;

    @Column(name = "TEAM_NAME")
    String teamName;

    @Column(name = "SECTION_ID")
    Integer sectionId;

    @Column(name = "USER_ID")
    Integer userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SECTION_ID", insertable = false,updatable = false)
    private Section section;

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    @Override
    public String toString() {
        return "Team{" +
                "teamId=" + teamId +
                ", teamName='" + teamName + '\'' +
                ", sectionId=" + sectionId +
                ", userId=" + userId +
                ", section=" + section +
                '}';
    }
}
