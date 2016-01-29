package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by wanchana on 21/8/2558.
 */
@Service
public class QueryEmployeeDomain extends HibernateUtil{

    public List<User> searchEmployeeByName(String employeeName){

        if(employeeName != ""){

            String queryStatement = "from User "+
                                    "where (thFname in(select thFname from User where thFname like :employeeName) "+
                                    "or thLname in(select thLname from User where thLname like :employeeName)"+
                                    "or enFname in(select enFname from User where enFname like :employeeName)"+
                                    "or enLname in(select enLname from User where enLname like :employeeName))"+
                                    "and userName not in (select userName from User where userName like 'its-%')"+
                                    "and userName not in('admin')";
            Query query = getSession().createQuery(queryStatement);
            query.setParameter("employeeName", "%" + employeeName + "%");
            List<User> users = query.list();

            return users;
        }
        else{

            String queryStatement = "from User where userName not in (select userName from User where userName like 'its-%')";
            Query query = getSession().createQuery(queryStatement);
            List<User> users = query.list();

            return users;
        }
    }

    public List<User> searchEmployeeByNameNotInSelected(List<User> empNames, String employeeName){

        if((empNames != null) && (employeeName != null)){
            String queryStatement = "from User "+
                    "where (thFname in(select thFname from User where thFname like :employeeName) "+
                    "or thLname in(select thLname from User where thLname like :employeeName)"+
                    "or enFname in(select enFname from User where enFname like :employeeName)"+
                    "or enLname in(select enLname from User where enLname like :employeeName))"+
                    "and userName not in (select userName from User where userName like 'its-%')"+
                    "and userName not in('admin')"+
                    "and thFname not in(:empNames)";
            Query query = getSession().createQuery(queryStatement);
            query.setParameter("employeeName", "%"+employeeName+"%");
            query.setParameterList("empNames", empNames);
            List<User> users = query.list();

            return users;
        }
        else{
            String queryStatement = "from User "+
                    "where userName not in (select userName from User where userName like 'its-%')"+
                    "and userName not in('admin')"+
                    "and thFname not in(:empNames)";
            Query query = getSession().createQuery(queryStatement);
            query.setParameterList("empNames", empNames);
            List<User> users = query.list();

            return users;
        }

//            String queryStatement = "from User "+
//                    "where (thFname in(select thFname from User where thFname like :employeeName) "+
//                    "or thLname in(select thLname from User where thLname like :employeeName)"+
//                    "or enFname in(select enFname from User where enFname like :employeeName)"+
//                    "or enLname in(select enLname from User where enLname like :employeeName))"+
//                    "and userName not in (select userName from User where userName like 'its-%')"+
//                    "and userName not in('admin')"+
//                    "and thFname not in(:empNames)";
//            Query query = getSession().createQuery(queryStatement);
//            query.setParameterList("empNames", empNames);
//            query.setParameter("employeeName", "%" + employeeName + "%");
//            List<User> users = query.list();
//
//            return users;
    }
}
