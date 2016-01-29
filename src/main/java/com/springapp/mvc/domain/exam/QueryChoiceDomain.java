package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Choice;
import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Phuthikorn_T on 8/11/2015.
 */
@Service
public class QueryChoiceDomain extends HibernateUtil {

    @Autowired
    QueryStatusDomain queryStatusDomain;

    public void insertAllChoice(Question question, List<String> description, int correctChoice) {

        List<Choice> choiceList = new ArrayList<Choice>();
        for (int i = 0; i < description.size(); i++) {
            Choice choice = new Choice();

            choice.setDescription(description.get(i));
            choice.setQuestion(question);

            choice.setStatus(queryStatusDomain.getReadyStatus());

//            if (i + 1 == correctChoice) { // choice correction range 1~4
//                choice.setCorrection(queryBooDomain.getTrue());
//            } else {
//                choice.setCorrection(queryBooDomain.getFalse());
//            }

            if (i + 1 == correctChoice) { // choice correction range 1~4
                choice.setCorrection(true);
            } else {
                choice.setCorrection(false);
            }

            choiceList.add(choice);
        }

        for (Choice c : choiceList) {
            getSession().save(c);
        }

    }

    public List<Choice> getChoiceListByQuestionId(Integer questionId) {
        Criteria criteria = getSession().createCriteria(Choice.class, "c");

        criteria.createAlias("question", "quest");

        criteria.addOrder(Order.asc("c.id"));
        criteria.add(Restrictions.eq("quest.id", questionId));
        criteria.add(Restrictions.eq("status", queryStatusDomain.getReadyStatus()));

        return (List<Choice>) criteria.list();
    }

    public Choice getChoiceById(Integer choiceId) {
        Criteria criteria = getSession().createCriteria(Choice.class);
        criteria.add(Restrictions.eq("id", choiceId));
        return (Choice) criteria.uniqueResult();
    }

    public void deleteChoiceFromQuestion(Question q){
        for(Choice c : q.getChoices()){
            getSession().delete(c);
        }
    }
}
