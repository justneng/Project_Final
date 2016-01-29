package com.springapp.mvc.pojo;

import javax.persistence.*;

/**
 * Created by Pongpipat on 6/3/2558.
 */
@Entity
@Table(name = "TDCS_SECTION_POSITION")
public class SectionPosition {

    @Id
    @Column(name = "SP_ID")
    private Integer spId;

    @Column(name = "SECTION_ID")
    private Integer sectionId;

    @Column(name = "POSI_ID")
    private Integer posiId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SECTION_ID", insertable = false,updatable = false)
    private Section section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "POSI_ID", insertable = false,updatable = false)
    private Position position;



    public Integer getSpId() {
        return spId;
    }

    public void setSpId(Integer spId) {
        this.spId = spId;
    }

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public Integer getPosiId() {
        return posiId;
    }

    public void setPosiId(Integer posiId) {
        this.posiId = posiId;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    @Override
    public String toString() {
        return "SectionPosition{" +
                "spId=" + spId +
                ", sectionId=" + sectionId +
                ", posiId=" + posiId +
                ", section=" + section +
                ", position=" + position +
                '}';
    }
}
