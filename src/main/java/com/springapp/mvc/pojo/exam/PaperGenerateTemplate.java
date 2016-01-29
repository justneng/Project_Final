package com.springapp.mvc.pojo.exam;

import org.hibernate.annotations.GenericGenerator;

import java.awt.print.Paper;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 * Created by wanchana on 22/1/2559.
 */
@Entity
@Table(name = "TDCS_PAPER_GENERATE_TEMPLATE")
public class PaperGenerateTemplate implements Serializable {

    @Id
    @GenericGenerator(name="paper_template_id" , strategy="increment")
    @GeneratedValue(generator = "paper_template_id")
    @Column(name = "ID")
    private Integer id;
    @Column(name = "NO")
    private Integer no;
    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;
    @OneToOne
    @JoinColumn(name = "PAPER_ID")
    private ExamPaper examPaper;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNo() {
        return no;
    }

    public void setNo(Integer no) {
        this.no = no;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public ExamPaper getExamPaper() {
        return examPaper;
    }

    public void setExamPaper(ExamPaper examPaper) {
        this.examPaper = examPaper;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PaperGenerateTemplate that = (PaperGenerateTemplate) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (no != null ? !no.equals(that.no) : that.no != null) return false;
        if (category != null ? !category.equals(that.category) : that.category != null) return false;
        return !(examPaper != null ? !examPaper.equals(that.examPaper) : that.examPaper != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (no != null ? no.hashCode() : 0);
        result = 31 * result + (category != null ? category.hashCode() : 0);
        result = 31 * result + (examPaper != null ? examPaper.hashCode() : 0);
        return result;
    }
}
