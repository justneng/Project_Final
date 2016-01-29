package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by l3eal2 on 17/2/2558.
 */
@Service
public class QuerySendMailDomain extends HibernateUtil {
    public List<User> getUser(Integer id){
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userId",id));
        List<User> users = criteria.list();
        return users;
    }
    public List<User> getUserByEmail(String mail){
        Criteria criteria = getSession().createCriteria(User.class);
        String[] email = mail.split("@");
        if(email.length > 1) {
            if (email[1].trim().equals("internal.ssg") || email[1].trim().equals("softsquaregroup.com")) {
                criteria.add(Restrictions.like("eMail1", "%" + email[0] + "%"));
            } else {
                criteria.add(Restrictions.like("eMail2", "%" + mail + "%"));
            }
        }else {
            criteria.add(Restrictions.like("eMail2", "%" + mail + "%"));
        }

        List<User> users = criteria.list();

        return users;
    }
}
