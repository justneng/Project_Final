package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ExamRecord;
import com.springapp.mvc.pojo.exam.ReleaseExam;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;

/**
 * Created by wanchana on 24/3/2559.
 */
@Service
public class QueryReleaseExamDomain extends HibernateUtil{
    @Autowired
    private QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    private QueryStatusDomain queryStatusDomain;

    public List<ReleaseExam> getReleaseExam(List<User> users, ExamPaper paper){
        List<ReleaseExam> releaseExamList = new ArrayList<ReleaseExam>();
        List<ExamRecord> examRecordList = queryExamRecordDomain.getAllExamRecord();

//        for(int i = 0; i < users.size(); i ++){
//            for(int j = 0; j < examRecordList.size(); j ++){
//                if((users.get(i) == examRecordList.get(j).getUser())
//                        && (examRecordList.get(j).getPaper() == paper)){
//
//                    users.remove(i);
//                    if(users.size() <= 0){
//                        break;
//                    }
//                }
//            }
//        }

        if(users.size() > 0){
            try{
                Date currentDate = DateUtil.getDateWithRemovedTime(new java.util.Date());
                Criteria criteria = getSession().createCriteria(ReleaseExam.class, "release");
                criteria.add(Restrictions.in("pk.user", users));
                criteria.add(Restrictions.eq("pk.examPaper", paper));
                criteria.add(Restrictions.eq("releaseDateTo", currentDate));
                criteria.add(Restrictions.eq("checkRelease", 'Y'));
                releaseExamList = criteria.list();
            } catch (Exception e){
                e.printStackTrace();
            }
            return releaseExamList;
        }
        else{
            return null;
        }
    }

    private static Logger logger = Logger.getLogger(QueryReleaseExamDomain.class.getName());
    public void checkExpireRule(Date date){

        try{
            HibernateUtil.beginTransaction();
            Criteria criteria = getSession().createCriteria(ReleaseExam.class, "release");
            criteria.add(Restrictions.lt("releaseDateTo", date));
            criteria.add(Restrictions.eq("checkRelease", 'Y'));
            List<ReleaseExam> examPapers = criteria.list();
            if(examPapers.size() > 0){
                for(ReleaseExam pap: examPapers){
                    logger.info("base : " + examPapers.get(0).getReleaseDateTo() + " vs " + date);
                    pap.setCheckRelease('N');
                    pap.setCheckInTime(0);
                    ExamPaper examPaper = pap.getExamPaper();
                    examPaper.setPaperStatus(queryStatusDomain.getDeletedStatus());
                    getSession().merge(examPaper);
                    getSession().merge(pap);
                }
            }
            HibernateUtil.commitTransaction();

        }catch (Exception e){
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }

    }

    public static List<ReleaseExam> getAllExamPaperRule(){
        Criteria criteria = getSession().createCriteria(ReleaseExam.class);
        List<ReleaseExam> rel = criteria.list();
        HibernateUtil.closeSession();

        return rel;
    }

    public void setDoExamInTime(User user, ExamPaper paper){
        Date currentDate = DateUtil.getDateWithRemovedTime(new java.util.Date());

        HibernateUtil.beginTransaction();
        Criteria criteria = getSession().createCriteria(ReleaseExam.class);
        criteria.add(Restrictions.eq("pk.user", user));
        criteria.add(Restrictions.eq("pk.examPaper", paper));
        criteria.add(Restrictions.eq("releaseDateTo", currentDate));
        criteria.add(Restrictions.eq("checkRelease", 'Y'));
        ReleaseExam releaseExam = (ReleaseExam) criteria.uniqueResult();

        if(releaseExam != null){
            releaseExam.setCheckInTime(1);
            HibernateUtil.getSession().merge(releaseExam);
        }

        HibernateUtil.commitTransaction();
    }
}
