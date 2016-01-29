package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.ExamAnswerRecord;
import com.springapp.mvc.pojo.exam.ExamMarkingRecord;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Service;

/**
 * Created by PTang_000 on 05-Oct-15.
 */
@Service
public class QueryMarkingRecord extends HibernateUtil{
    public void saveMarkingRecord(ExamMarkingRecord markingRecord){
        getSession().save(markingRecord);
    }

    public ExamMarkingRecord getMarkingRecordByAnswerRecord(ExamAnswerRecord ar){
        Criteria criteria = getSession().createCriteria(ExamMarkingRecord.class);
        criteria.add(Restrictions.eq("answerRecord", ar));
        return (ExamMarkingRecord) criteria.uniqueResult();
    }

    public void mergeUpdateMarkingRecord(ExamMarkingRecord mr){
        getSession().merge(mr);
    }
}
