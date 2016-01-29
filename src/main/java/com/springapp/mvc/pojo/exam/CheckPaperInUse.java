package com.springapp.mvc.pojo.exam;

/**
 * Created by wanchana on 23/11/2558.
 */
public class CheckPaperInUse {


    private ExamPaper examPaper;
    private boolean check;
    private Integer countRow;

    public CheckPaperInUse(){

    }

    public CheckPaperInUse(ExamPaper examPaper, Boolean check){
        this.examPaper = examPaper;
        this.check = check;
    }

    public ExamPaper getExamPaper() {
        return examPaper;
    }

    public void setExamPaper(ExamPaper examPaper) {
        this.examPaper = examPaper;
    }

    public boolean isCheck() {
        return check;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }

    public Integer getCountRow() {
        return countRow;
    }

    public void setCountRow(Integer countRow) {
        this.countRow = countRow;
    }
}
