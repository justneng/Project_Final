package com.springapp.mvc.domain;

import com.springapp.mvc.pojo.Team;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pongpipat on 23/2/2558.
 */
@Service
public class QueryTeamDomain extends HibernateUtil{
    public List<Team> getTeamList_where_one_colum(String colum,String value){
        Criteria criteria = getSession().createCriteria(Team.class);
        criteria.add(Restrictions.eq(colum,Integer.parseInt(value)));
        List<Team> list = criteria.list();
        closeSession();
        return list;
    }
    public String findPiorityByTeamId(Integer teamId){
        Integer userId;
        Criteria criteria = getSession().createCriteria(Team.class);
        criteria.add(Restrictions.eq("teamId",teamId));
        List<Team> list = (List<Team>)criteria.list();
        userId = list.get(0).getUserId();

        Criteria criteria1 = getSession().createCriteria(User.class);
        criteria1.add(Restrictions.eq("userId",userId));
        List<User> list1 = criteria1.list();
        return list1.get(0).getPiority();
    }
    public Integer InsertTeam(String teamName){
        Team team = new Team();
        HibernateUtil.beginTransaction();
        team.setTeamName(teamName);
//        team.setSectionId(sectionId);
        getSession().save(team);
        HibernateUtil.commitTransaction();
        closeSession();

        Criteria criteria = getSession().createCriteria(Team.class);
        criteria.add(Restrictions.eq("teamName",teamName));
        List<Team> list = criteria.list();
        closeSession();
        return list.get(0).getTeamId();
    }
    public void updateUserTeam(Integer user_id,Integer team_id,Integer section_id){
        Team team = getTeamDatas(team_id);
        team.setUserId(user_id);
        team.setSectionId(section_id);
        HibernateUtil.beginTransaction();
        getSession().merge(team);
//        getSession().flush();
//        getSession().clear();
        HibernateUtil.commitTransaction();
    }
    public Team getTeamDatas(Integer teamId){
        Criteria criteria = getSession().createCriteria(Team.class);
        criteria.add(Restrictions.eq("teamId",teamId));
        Team team = (Team) criteria.uniqueResult();
        closeSession();
        return team;
    }
}
