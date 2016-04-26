package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<ExamRecord> getAllExamRecord(){

        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        List<ExamRecord> records = criteria.list();

        if(records.size() > 0){
            return records;
        }
        else{
            return null;
        }
    }

    public void mergeUpdateExamRecord(ExamRecord examRecord){
        getSession().merge(examRecord);
    }

    public List<StaticReport> getStaticReportDatasource() {

        Criteria criteria = getSession().createCriteria(ExamRecord.class, "record");
        criteria.createAlias("record.examResult", "result");
        criteria.createAlias("record.paper", "paper");
        criteria.createAlias("paper.paperStatus", "paperStatus");
        criteria.createAlias("result.status", "resultStatus");
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.eq("resultStatus.id", 7));
        criteria.add(Restrictions.ne("paper.code", "SYSTM"));

        List<ExamRecord> records = criteria.list();
        List<StaticReport> staticReports = new ArrayList<StaticReport>();

        if (records.size() > 0) {
            for (ExamRecord record : records) {
                StaticReport staticReport = new StaticReport();
                staticReport.setNAME(record.getUser().getThFname() + " " + record.getUser().getThLname());
                staticReport.setPAPER_CODE(record.getPaper().getCode());
                staticReport.setPAPER_MAX_SCORE(record.getPaper().getMaxScore());
                staticReport.setPAPER_NAME(record.getPaper().getName());
                staticReport.setREALSCORE(record.getExamResult().getObjectiveScore() + record.getExamResult().getSubjectiveScore());

                staticReports.add(staticReport);
            }
        }

        return staticReports;
    }

    public List<ExamRecord> getAllRecords(List<Integer> userId,String code,Position position,String empId) {

        Criteria criteria = getSession().createCriteria(ExamRecord.class, "record");
        criteria.createAlias("record.examResult", "result");
        criteria.createAlias("record.paper", "paper");
        criteria.createAlias("paper.paperStatus", "paperStatus");
        criteria.createAlias("result.status", "resultStatus");
        criteria.createAlias("record.user", "user");
        criteria.add(Restrictions.ne("paperStatus.id", 4));
        criteria.add(Restrictions.eq("resultStatus.id", 7));
        criteria.add(Restrictions.ne("paper.code", "SYSTM"));
        criteria.add(Restrictions.ne("paper.createBy", "createBy"));

        if(userId.size() > 0){
            criteria.add(Restrictions.in("createBy.userId", userId));
        }

        if(!code.equals("")){
            criteria.add(Restrictions.eq("paper.code", code));
        }

        if(position != null){
            criteria.add(Restrictions.eq("paper.position", position));
        }

        if(!empId.equals("")){
            criteria.add(Restrictions.eq("createBy.empId", empId));
        }

        List<ExamRecord> records = criteria.list();

        if(records.size() > 0){
            return records;
        }
        else{
            return null;
        }
    }
}
