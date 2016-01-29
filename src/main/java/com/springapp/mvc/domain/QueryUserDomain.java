package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.UniversityFacultyMajor;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.BeanUtils;
import com.springapp.mvc.util.HibernateUtil;
import com.springapp.mvc.util.LengthExpression;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by l3eal2 on 9/2/2558.
 */
@Service
public class QueryUserDomain extends HibernateUtil {
    private List<User> allUserTrainee;

    public List<User> getStudentData(String fName, String lName, String nickName, String staff, String position, String piority, Integer status) {
        Criteria criteria = getSession().createCriteria(User.class);
        if (BeanUtils.isNotEmpty(fName) && BeanUtils.isNotEmpty(lName)) {
            if (BeanUtils.isNotEmpty(fName)) {
                criteria.add(Restrictions.like("thFname", "%" + fName + "%"));
            }
            if (BeanUtils.isNotEmpty(lName)) {
                criteria.add(Restrictions.like("thLname", "%" + lName + "%"));
            }
        } else if (BeanUtils.isEmpty(lName) && BeanUtils.isNotEmpty(fName)) {
            criteria.add(Restrictions.or(Restrictions.like("thFname", "%" + fName + "%"), Restrictions.like("thLname", "%" + fName + "%")));
        }

        if (BeanUtils.isNotEmpty(nickName)) {
            criteria.add(Restrictions.like("nickName", "%" + nickName + "%"));
        }

        if (BeanUtils.isNotEmpty(staff)) {
            criteria.add(Restrictions.eq("staffId", Integer.parseInt(staff))); //Edit by PEEM
        }

        if (BeanUtils.isNotEmpty(position)) {
            criteria.add(Restrictions.eq("posiId", Integer.parseInt(position)));
        }

        criteria.add(Restrictions.eq("status", 3));
        criteria.add(Restrictions.eq("validateStu", 1));
        if (status == 2) {
            criteria.add(Restrictions.like("piority", "%" + piority + "%"));
            criteria.add(Restrictions.ne("piority", piority));
        }
//        page = (page-1)*10;
//        criteria.setFirstResult(page);
//        criteria.setMaxResults(10);
        List<User> list = (List<User>) criteria.list();
        closeSession();
        return list;
    }

    public List<User> getStaffData(String fName, String lName, String nickName, String company, String employeeId) {
        Criteria criteria = getSession().createCriteria(User.class);
        if (BeanUtils.isNotEmpty(fName) && BeanUtils.isNotEmpty(lName)) {
            if (BeanUtils.isNotEmpty(fName)) {
                criteria.add(Restrictions.like("thFname", "%" + fName + "%"));
            }
            if (BeanUtils.isNotEmpty(lName)) {
                criteria.add(Restrictions.like("thLname", "%" + lName + "%"));
            }
        } else if (BeanUtils.isEmpty(lName) && BeanUtils.isNotEmpty(fName)) {
            criteria.add(Restrictions.or(Restrictions.like("thFname", "%" + fName + "%"), Restrictions.like("thLname", "%" + fName + "%")));
        }
        if (BeanUtils.isNotEmpty(nickName)) {
            criteria.add(Restrictions.like("nickName", "%" + nickName + "%"));
        }
        if (BeanUtils.isNotEmpty(employeeId)) {
            criteria.add(Restrictions.like("empId", "%" + employeeId + "%"));
        }
        if (BeanUtils.isNotEmpty(company)) {
            criteria.add(Restrictions.eq("compId", Integer.parseInt(company)));
        }


        criteria.add(Restrictions.eq("status", 2));
        List<User> list = (List<User>) criteria.list();
        closeSession();
        return list;
    }

    public List<User> getUserValidate(String piority, Integer page) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("validateStu", 0));
        criteria.add(Restrictions.like("piority", "%" + piority + "%"));
        criteria.addOrder(Order.asc("dateCreate"));
        page = (page - 1) * 10;
        criteria.setFirstResult(page);
        criteria.setMaxResults(10);
        List<User> list = (List<User>) criteria.list();
        closeSession();
        return list;
    }

    public List insertUser(User user, String piority, String usernameInsert, boolean isPM) {
//        user.setId(1);
        Integer countPiority = 0;
        StringBuffer newPiority = new StringBuffer();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);

        Date date = new Date();
        String dateStr = dateFormat.format(date);
        HibernateUtil.beginTransaction();
        if (user.getStatus() == 3) {
            user.setValidateStu(0);
            user.setViewEav(0);
        } else {
            user.setValidateStu(1);
        }
        user.setUserCreate(usernameInsert);
        user.setDateCreate(dateStr);

        if (isPM) {
            countPiority = 0;
        } else {
            countPiority = findPiority(piority, user.getStatus());
        }

        if (countPiority > 0) {

            if (countPiority < 10) {
                newPiority.append("00" + countPiority);
            } else if (countPiority < 100) {
                newPiority.append("0" + countPiority);
            } else {
                newPiority.append(countPiority);
            }
        } else {
            newPiority.append("");
        }
        user.setPiority(piority + newPiority.toString());
        getSession().save(user);
        HibernateUtil.commitTransaction();
        closeSession();

        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userName", user.getUserName()));
        List<User> list = criteria.list();
        closeSession();
        return list;
    }

    public static Integer findPiority(String pior, Integer status) {
        Integer sizePioruty = 0;
        StringBuffer piorityBuffer = new StringBuffer();
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.like("piority", pior + "%"));
        criteria.add(Restrictions.eq("status", status));
        criteria.add(new LengthExpression("piority", pior.length() + 3));
        criteria.addOrder(Order.asc("piority"));
        List<User> list = (List<User>) criteria.list();
        sizePioruty = list.size();

        if ((list.size() > 0 && status == 3) || (status == 2 && list.size() > 0)) {
            piorityBuffer.append(list.get(list.size() - 1).getPiority().charAt(list.get(list.size() - 1).getPiority().length() - 3) + "");
            piorityBuffer.append(list.get(list.size() - 1).getPiority().charAt(list.get(list.size() - 1).getPiority().length() - 2) + "");
            piorityBuffer.append(list.get(list.size() - 1).getPiority().charAt(list.get(list.size() - 1).getPiority().length() - 1) + "");
            sizePioruty = Integer.parseInt(piorityBuffer.toString()) + 1;
        }
        if (list.size() <= 0 && status == 2) {
            sizePioruty++;
        }
        if (list.size() <= 0 && status == 3) {

            sizePioruty++;
        }
        return sizePioruty;
    }

    public List<User> getStaff() {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("status", 2));
        List list = criteria.list();
        closeSession();
        return list;
    }

    public boolean checkInteger(String input) {
        try {
            Integer.parseInt(input);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public static User getUserDatas(Integer id) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userId", id));
        User user = (User) criteria.uniqueResult();
        closeSession();
        return user;
    }

    public List<User> getUserDataByPiority(String piority) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("piority", piority));
        List<User> users = (List<User>) criteria.list();


        closeSession();
        return users;
    }

    public void setUserValidate(String id) {
        User user = getUserDatas(Integer.parseInt(id));
        user.setValidateStu(1);
        HibernateUtil.beginTransaction();
        getSession().merge(user);
//        getSession().flush();
//        getSession().clear();
        HibernateUtil.commitTransaction();
    }

    public void setUserEvaGrade(Integer id, String evaGrade) {
        User user = getUserDatas(id);
        user.setEvaGrade(evaGrade);
        HibernateUtil.beginTransaction();
        getSession().merge(user);
        HibernateUtil.commitTransaction();
    }

    public void setViewEva(Integer id) {
        User user = getUserDatas(id);
        user.setViewEav(1);
        HibernateUtil.beginTransaction();
        getSession().merge(user);
        HibernateUtil.commitTransaction();
    }

    public void resetPassword(Integer id, String newPass) {
        User user = getUserDatas(id);
        user.setPassword(newPass);
        HibernateUtil.beginTransaction();
        getSession().merge(user);
//        getSession().flush();
//        getSession().clear();
        HibernateUtil.commitTransaction();
    }

    public List<User> checkLogin(String username, String password) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userName", username));
        criteria.add(Restrictions.eq("password", password));
        List<User> list = criteria.list();
        closeSession();
        return list;
    }

    public Long getCountUserValidate(String staffPiority) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("validateStu", 0));
        criteria.add(Restrictions.like("piority", "%" + staffPiority + "%"));
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.count("validateStu"));
        criteria.setProjection(projectionList);

        Long count = (Long) criteria.uniqueResult();
        closeSession();
        return count;
    }

    public Integer getViewEva(Integer userId) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userId", userId));
        criteria.add(Restrictions.eq("viewEav", 0));
        criteria.add(Restrictions.isNotNull("evaGrade"));


        List<User> users = criteria.list();

        Integer count = users.size();
        closeSession();
        return count;
    }

    public void deleteUser(Integer id) {
        User user = getUserDatas(id);
        HibernateUtil.beginTransaction();
        getSession().delete(user);
        HibernateUtil.commitTransaction();
    }

    public List<User> searchUserOneStringColum(String colum, String value) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq(colum, value));
        List<User> list = criteria.list();
        closeSession();
        return list;
    }

    public void Updateimage(String value, Integer id) {
        User user = getUserDatas(id);
        user.setImange(value);
        HibernateUtil.beginTransaction();
        getSession().merge(user);
//        getSession().flush();
//        getSession().clear();
        HibernateUtil.commitTransaction();
    }

    public void EditProfile(User user) {
        User user1 = getUserDatas(user.getUserId());

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);

        Date date = new Date();
        String dateStr = dateFormat.format(date);
        user.setViewEav(user1.getViewEav());
        user.setUserUpdate(user.getUserName());
        user.setDateUpdate(dateStr);
        user.setPassword(user1.getPassword());
        user.setValidateStu(user1.getValidateStu());
        user.setStatus(user1.getStatus());
        user.setUserCreate(user1.getUserCreate());
        user.setDateCreate(user1.getDateCreate());
        user.setPiority(user1.getPiority());
        user.setImange(user1.getImange());
        if (!user.getStaffId().equals(user1.getStaffId())) {
            StringBuffer newPiority = new StringBuffer();
            User userBuffer = getUserDatas(user.getStaffId());
            Integer countPiority = findPiority(userBuffer.getPiority(), 3);
            if (countPiority > 0) {
                if (countPiority < 10) {
                    newPiority.append("00" + countPiority);
                } else if (countPiority < 100) {
                    newPiority.append("0" + countPiority);
                } else {
                    newPiority.append(countPiority);
                }
            } else {
                newPiority.append("");
            }
            user.setPiority(userBuffer.getPiority() + newPiority.toString());
        }

        HibernateUtil.beginTransaction();
        getSession().merge(user);
        HibernateUtil.commitTransaction();
    }

    public void editProfileStaff(User user, String pioruty) {
        User user1 = getUserDatas(user.getUserId());

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.US);

        Date date = new Date();
        String dateStr = dateFormat.format(date);
        user.setUserUpdate(user.getUserName());
        user.setDateUpdate(dateStr);
        user.setPassword(user1.getPassword());
        user.setValidateStu(user1.getValidateStu());
        user.setStatus(user1.getStatus());
        user.setUserCreate(user1.getUserCreate());
        user.setDateCreate(user1.getDateCreate());
        user.setImange(user1.getImange());

        if (user.getTeamId().toString().equals(user1.getTeamId().toString())) {//No change team
            user.setPiority(user1.getPiority());
        } else { //Chang teame
            if (pioruty.length() <= 0) {//Not PM
                StringBuffer newPiority = new StringBuffer();
                Integer countPiority = findPiority(user.getPiority(), 2);
                if (countPiority > 0) {
                    if (countPiority < 10) {
                        newPiority.append("00" + countPiority);
                    } else if (countPiority < 100) {
                        newPiority.append("0" + countPiority);
                    } else {
                        newPiority.append(countPiority);
                    }
                } else {
                    newPiority.append("");
                }
                user.setPiority(user.getPiority() + newPiority.toString());
            } else {//PM of new team
                user.setPiority(pioruty);
                // edit team and section
            }

        }

        HibernateUtil.beginTransaction();
        getSession().merge(user);
        HibernateUtil.commitTransaction();
    }


    public List<User> getStudentUserDataList(Integer userID, String status) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userId", userID));
        List<User> list = criteria.list();
        closeSession();
        if (status.equals("user")) {
            Criteria criteria1 = getSession().createCriteria(UniversityFacultyMajor.class);
            criteria1.add(Restrictions.eq("uniFacMajId", list.get(0).getUniFacMajId()));
            List<UniversityFacultyMajor> list1 = criteria1.list();
            closeSession();
            list.get(0).setUniversityFacultyMajor(list1.get(0));
        }
        return list;
    }


    public User getUserByUsernameAndId(String username, Integer id) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userName", username));
        criteria.add(Restrictions.eq("userId", id));
        List<User> list = criteria.list();
        if (!list.isEmpty()) {
            return list.get(0);
        } else return null;
    }

    public User getCurrentUser(HttpServletRequest request) {

//        User currentUser = getUserByUsernameAndId(request.getSession().getAttribute("username").toString()
//                , Integer.parseInt(request.getSession().getAttribute("userid").toString()));
        Object userIdObj = request.getSession().getAttribute("userid");
        if (userIdObj != null) {
            User currentUser = getUserById(Integer.parseInt(userIdObj.toString()));
            return currentUser;
        }else{
            return null;
        }
    }

    public User getUserById(Integer userId) {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("userId", userId));
        List<User> list = criteria.list();
//        closeSession();
        if (!list.isEmpty()) {
            return list.get(0);
        } else return null;
    }

//Create by JOB
    public List<User> getAllUserTrainee() {
        Criteria criteria = getSession().createCriteria(User.class);
        criteria.setProjection(Projections.projectionList()
                .add(Projections.property("empId"), "empId")
                .add(Projections.property("thFname"),"thFname")
                .add(Projections.property("thLname"),"thLname"));
        Criterion cri = Restrictions.eq("aptId", 1);
        Criterion cri2 = Restrictions.eq("aptId", 2);
        criteria.add(Restrictions.or(cri,cri2));

        criteria.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<User> allUserTrainee = criteria.list();
        return allUserTrainee;
    }
}
