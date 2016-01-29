package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.PaperQuestion;
import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by PTang_000 on 06-Oct-15.
 */
@Service
public class QueryPaperQuestionDomain extends HibernateUtil{

    public PaperQuestion getPaperQuestion(ExamPaper examPaper,Question question){
        Criteria criteria = getSession().createCriteria(PaperQuestion.class);
        criteria.add(Restrictions.eq("pk.examPaper",examPaper));
        criteria.add(Restrictions.eq("pk.question",question));

        return (PaperQuestion)criteria.uniqueResult();
    }

//    Add By Wanchana
    public List<PaperQuestion> getPaperQuestionByExamPaper(ExamPaper examPaper){

        Criteria criteria = getSession().createCriteria(PaperQuestion.class);
        criteria.add(Restrictions.eq("pk.examPaper", examPaper));
        List<PaperQuestion> paperQuestions = criteria.list();

        for(int i = 0; i < paperQuestions.size(); i ++){
            getSession().refresh(paperQuestions.get(i));
        }

        return paperQuestions;
    }
}
