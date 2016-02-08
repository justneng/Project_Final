package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.Category;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ExamRecord;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Phuthikorn_T on 18-Sep-15.
 */
@Service
public class QueryExamRecordDomain extends HibernateUtil {

    public void saveExamRecord(ExamRecord examRecord){

        getSession().save(examRecord);
    }

    public ExamRecord getExamRecordByPaperAndUser (ExamPaper paper,User user){
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("paper", paper));
        criteria.add(Restrictions.eq("user", user));
        return (ExamRecord)criteria.uniqueResult();
    }

    public ExamRecord getExamRecordById (Integer id){
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("id",id));
        return  (ExamRecord)criteria.uniqueResult();
    }

//    Add By Mr.Wanchana
    public Boolean checkExamRecordInUse(Integer paperId){

        Boolean check = false;
        QueryPaperDomain queryPaperDomain = new QueryPaperDomain();
        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("paper", examPaper));

        if(criteria.list().size() != 0){
            check = true;
        }

        return check;
    }

    public List<ExamRecord> getExamRecordByExamPaper(ExamPaper examPaper){

        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("paper", examPaper));

        if(criteria.list().size() > 0){
            return criteria.list();
        }
        else{
            return null;
        }
    }

    public void mergeUpdateExamRecord(ExamRecord examRecord){
        getSession().merge(examRecord);
    }
}
