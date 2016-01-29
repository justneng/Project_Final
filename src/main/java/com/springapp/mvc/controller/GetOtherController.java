package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.*;
import com.springapp.mvc.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by l3eal2 on 6/3/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class GetOtherController {
    @Autowired
    private QueryFacutyDomain queryFacuty;
    @Autowired
    private QueryMajorDomain queryMajor;
    @Autowired
    private FindAllDataTableDomain findAllDataTableDomain;
    @Autowired
    private QueryUniversityDomain queryUniversityDomain;
    @Autowired
    private QuerySectionDomain querySectionDomain ;

    @RequestMapping(value = "/getFac",method = RequestMethod.POST, produces = "text/html",headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> positionSearch(Model model,@ModelAttribute("univerID")Integer uni ) {
//        logger.info("vocabulary Searchlist ");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

//        List<University> universities = (List<University>) findAllDataTableDomain.searchId(University.class,"university_name",uni);

        List<UniversityFaculty> universityFacultyList = findAllDataTableDomain.searchByIntegerColumn(UniversityFaculty.class,"uniId",uni);

//        List<Faculty> facultyList = queryFacuty.getFacuty(uni,universities);

//        List<String> list = new ArrayList<String>();
        String jsonList = new Gson().toJson(universityFacultyList);
//        String test = "ttttt";
//        try {
//            jsonList = ConvertListToJson.toJson(facultyList);
//            model.addAttribute("facName",facultyList);
//        } catch (Exception e) {
//            e.getMessage();
//            e.printStackTrace();
//        }
//        list.add(jsonList);
//        list.add(test);
//        return new ResponseEntity<String>(list.toString(), headers, HttpStatus.OK);
        return new ResponseEntity<String>(jsonList, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getDep",method = RequestMethod.POST, produces = "text/html",headers = "Accept=application/json")
    @ResponseBody
    public  ResponseEntity<String> searchFacuty(Model model,@ModelAttribute("facutyid")Integer fac ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
//        List<Faculty> list = (List<Faculty>) findAllDataTableDomain.searchId(Faculty.class,"facName",fac);
//        List<Major> facultyList = queryMajor.getFacuty(list.get(0).getFacId());
//        List<UniversityFacultyMajor>
//        List<UniversityFacultyMajor> list = findAllDataTableDomain.searchByIntegerColumn(UniversityFacultyMajor.class,"UNI_FAC_ID",fac);
        List<UniversityFacultyMajor> list = findAllDataTableDomain.searchByIntegerColumn(UniversityFacultyMajor.class,"uniFacId",fac);
        String json = new Gson().toJson(list);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getUniver",method = RequestMethod.POST, produces = "text/html",headers = "Accept=application/json")
    @ResponseBody
    public  ResponseEntity<String> getUniversity(Model model,@ModelAttribute("UniversityName")String univer ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<University> list = queryUniversityDomain.quryUniversityLike(univer);

        String jsonList = new Gson().toJson(list);
//        try {
//            jsonList = ConvertListToJson.toJson(list);
////            model.addAttribute("listFacName",facultyList);
//        } catch (Exception e) {
//            e.getMessage();
//            e.printStackTrace();
//        }
        return new ResponseEntity<String>(jsonList, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/getSection",method = RequestMethod.POST, produces = "text/html",headers = "Accept=application/json")
    @ResponseBody
    public  ResponseEntity<String> getSection(@ModelAttribute("comId")Integer id ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List list = querySectionDomain.getSectionList_where_one_colum("conpId",id);
        String json = new Gson().toJson(list);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }



}
