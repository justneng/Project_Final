package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.Faculty;
import com.springapp.mvc.pojo.Major;
import com.springapp.mvc.pojo.University;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.util.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/TDCS")
public class SearchStudentController {
    @Autowired
    private QueryUserDomain queryUserDomain;
    @Autowired
    private FindAllDataTableDomain findAllDataTableDomain;
    @Autowired
    private QueryUniversityFacultyDomain queryUniversityFacultyDomain;
    @Autowired
    private QueryUniversityFacultyMajorDomain queryUniversityFacultyMajorDomain;

    @RequestMapping(value = "/searchStudentData", method = RequestMethod.POST, produces = "text/html", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> positionSearch(@ModelAttribute("tFname") String thFn,
                                                 @ModelAttribute("tLname") String thLn,
                                                 @ModelAttribute("nickName") String nick,
                                                 @ModelAttribute("univer") String uni,
                                                 @ModelAttribute("fac") String fac,
                                                 @ModelAttribute("major") String major,
                                                 @ModelAttribute("staff") String staff, //Edit by PEEM
                                                 @ModelAttribute("job") String position,
                                                 @ModelAttribute("startTime") String startTime,
                                                 @ModelAttribute("endTime") String endTime,
                                                 HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Faculty> faculties = null;
        List<Major> majors = null;
        if (BeanUtils.isNotEmpty(fac)) {
            faculties = (List<Faculty>) findAllDataTableDomain.searchByIntegerColumn(Faculty.class, "facId", Integer.parseInt(fac));
        }
        if (BeanUtils.isNotEmpty(major)) {
            majors = (List<Major>) findAllDataTableDomain.searchByIntegerColumn(Major.class, "majId", Integer.parseInt(major));
        }
        List uni_fac;
        List uni_fac_maj;
        List uni_fac_maj_id = new ArrayList();
        String json = "";
        List<University> universities = (List<University>) findAllDataTableDomain.searchId(University.class, "university_name", uni);
        if (universities.size() > 0 || uni.equals("")) {
            if(uni.equals("")){
                uni = "";
            }else {
                uni = universities.get(0).getId().toString();
            }
            if (faculties != null && faculties.size() > 0) {
                fac = faculties.get(0).getFacId().toString();
            } else {
                fac = "";
            }
            uni_fac = queryUniversityFacultyDomain.getUniversityFacutyById(uni, fac);
            if (uni_fac.size() > 0) {
                if (majors != null && majors.size() > 0) {
                    major = majors.get(0).getMajId().toString();
                } else {
                    major = "";
                }
                for (int i = 0; i < uni_fac.size(); i++) {
                    uni_fac_maj = queryUniversityFacultyMajorDomain.getUniversityFacutyMajorById(uni_fac.get(i).toString(), major);
                    if (uni_fac_maj.size() > 0) {
                        for (int j = 0; j < uni_fac_maj.size(); j++) {
                            uni_fac_maj_id.add(uni_fac_maj.get(j).toString());
                        }
                    }
                }
            }

//        System.out.println(uni_fac_maj_id);

            Integer status = 1;
            if (request.getSession().getAttribute("status").toString().equals("staff")) {
                status = 2;
            }
            if (uni_fac_maj_id.size() > 0) {
                List<User> users = queryUserDomain.getStudentData(thFn, thLn, nick, staff, position, request.getSession().getAttribute("session_piority").toString(), status); //Edit by PEEM
                List listOfIndex = new ArrayList();
                for (int i = 0; i < users.size(); i++) {
                    int count = 0;
                    for (int j = 0; j < uni_fac_maj_id.size(); j++) {
                        if (users.get(i).getUniFacMajId().toString().equals(uni_fac_maj_id.get(j))) {
                            count++;
                        }
                    }
                    if (count == 0 && uni_fac_maj_id.size() > 0) {
                        listOfIndex.add(i);
                    }
                }
                for (int i = 0; i < listOfIndex.size(); i++) {
                    for (int j = i + 1; j < listOfIndex.size(); j++) {
                        if (Integer.parseInt(listOfIndex.get(i).toString()) < Integer.parseInt(listOfIndex.get(j).toString())) {
                            listOfIndex.add(0, listOfIndex.get(j));
                            listOfIndex.remove(j + 1);
                        }
                    }
                }

                for (int i = 0; i < listOfIndex.size(); i++) {
                    users.remove(Integer.parseInt(listOfIndex.get(i).toString()));
                }

                for (int i = 0; i < users.size(); i++) {
                    if (BeanUtils.isNotEmpty(startTime) && BeanUtils.isNotEmpty(endTime)) {
                        String[] startWork = startTime.split("/");
                        String[] endWorkUser = users.get(i).getEndWork().toString().split("/");
                        if (Integer.parseInt(endWorkUser[2]) < Integer.parseInt(startWork[2])) {
                            users.remove(i);
                            i = -1;
                            continue;
                        } else if (Integer.parseInt(endWorkUser[2]) == Integer.parseInt(startWork[2])) {
                            if (Integer.parseInt(endWorkUser[1]) < Integer.parseInt(startWork[1])) {
                                users.remove(i);
                                i = -1;
                                continue;
                            } else if (Integer.parseInt(endWorkUser[1]) == Integer.parseInt(startWork[1])) {
                                if (Integer.parseInt(endWorkUser[0]) < Integer.parseInt(startWork[0])) {
                                    users.remove(i);
                                    i = -1;
                                    continue;
                                }
                            }
                        }
                        String[] endWork = endTime.split("/");
                        String[] startWorkUser = users.get(i).getStartWork().toString().split("/");
                        if (Integer.parseInt(startWorkUser[2]) > Integer.parseInt(endWork[2])) {
                            users.remove(i);
                            i = -1;
                            continue;
                        } else if (Integer.parseInt(startWorkUser[2]) == Integer.parseInt(endWork[2])) {
                            if (Integer.parseInt(startWorkUser[1]) > Integer.parseInt(endWork[1])) {
                                users.remove(i);
                                i = -1;
                                continue;
                            } else if (Integer.parseInt(startWorkUser[1]) == Integer.parseInt(endWork[1])) {
                                if (Integer.parseInt(startWorkUser[0]) > Integer.parseInt(endWork[0])) {
                                    users.remove(i);
                                    i = -1;
                                    continue;
                                }
                            }
                        }
                    } else {
                        if (BeanUtils.isNotEmpty(startTime)) {
                            String[] startWork = startTime.split("/");
                            String[] endWorkUser = users.get(i).getEndWork().toString().split("/");
                            if (Integer.parseInt(endWorkUser[2]) < Integer.parseInt(startWork[2])) {
                                users.remove(i);
                                i = -1;
                                continue;
                            } else if (Integer.parseInt(endWorkUser[2]) == Integer.parseInt(startWork[2])) {
                                if (Integer.parseInt(endWorkUser[1]) < Integer.parseInt(startWork[1])) {
                                    users.remove(i);
                                    i = -1;
                                    continue;
                                } else if (Integer.parseInt(endWorkUser[1]) == Integer.parseInt(startWork[1])) {
                                    if (Integer.parseInt(endWorkUser[0]) < Integer.parseInt(startWork[0])) {
                                        users.remove(i);
                                        i = -1;
                                        continue;
                                    }
                                }
                            }
                        }
                        if (BeanUtils.isNotEmpty(endTime)) {
                            String[] endWork = endTime.split("/");
                            String[] startWorkUser = users.get(i).getStartWork().toString().split("/");
                            if (Integer.parseInt(startWorkUser[2]) > Integer.parseInt(endWork[2])) {
                                users.remove(i);
                                i = -1;
                                continue;
                            } else if (Integer.parseInt(startWorkUser[2]) == Integer.parseInt(endWork[2])) {
                                if (Integer.parseInt(startWorkUser[1]) > Integer.parseInt(endWork[1])) {
                                    users.remove(i);
                                    i = -1;
                                    continue;
                                } else if (Integer.parseInt(startWorkUser[1]) == Integer.parseInt(endWork[1])) {
                                    if (Integer.parseInt(startWorkUser[0]) > Integer.parseInt(endWork[0])) {
                                        users.remove(i);
                                        i = -1;
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
                System.out.println(users);
                json = new Gson().toJson(users);
                if (users.size() == 0)
                    json = "";
            }
        } else {
            json = "";
        }


        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }
}
