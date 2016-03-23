package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by wanchana on 23/3/2559.
 */
@Entity
@Table(name = "TDCS_USERS_EXAMS")
@AssociationOverrides({
        @AssociationOverride(name = "pk.user", joinColumns = @JoinColumn(name = "USER_ID")),
        @AssociationOverride(name = "pk.examPaper", joinColumns = @JoinColumn(name = "PAPER_ID"))
})
public class ReleaseExam implements Serializable{
    @EmbeddedId
    private ReleaseExamPk pk = new ReleaseExamPk();
    @Column(name = "RELEASE_DATE_FROM")
    @Transient
    private Date releaseDateFrom;
    @Transient
    @Column(name = "RELEASE_DATE_TO")
    private Date releaseDateTo;

    public Date getReleaseDateFrom() {
        return releaseDateFrom;
    }

    public void setReleaseDateFrom(Date releaseDateFrom) {
        this.releaseDateFrom = releaseDateFrom;
    }

    public Date getReleaseDateTo() {
        return releaseDateTo;
    }

    public void setReleaseDateTo(Date releaseDateTo) {
        this.releaseDateTo = releaseDateTo;
    }

    public ReleaseExamPk getPk() {
        return pk;
    }

    public void setPk(ReleaseExamPk pk) {
        this.pk = pk;
    }
}
