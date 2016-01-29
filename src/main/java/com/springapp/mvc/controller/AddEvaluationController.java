package com.springapp.mvc.controller;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryDescriptionDomain;
import com.springapp.mvc.domain.QuerySubTopicDomain;
import com.springapp.mvc.domain.QueryTopicDomain;
import com.springapp.mvc.pojo.Description;
import com.springapp.mvc.pojo.Subtopic;
import com.springapp.mvc.pojo.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pongpipat on 17/4/2558.
 */
@Controller
@RequestMapping("/TDCS")
public class AddEvaluationController {
    @Autowired
    private QueryTopicDomain queryTopicDomain;
    @Autowired
    private QuerySubTopicDomain querySubTopicDomain;
    @Autowired
    private QueryDescriptionDomain queryDescriptionDomain;

    @RequestMapping(value ="/getAllTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllTopic(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<Topic> list = queryTopicDomain.getAllTopic();
        return new ResponseEntity<String>(new Gson().toJson(list),headers, HttpStatus.OK);
    }

    @RequestMapping(value ="/saveTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity saveTopic(@Valid Topic topic){
        queryTopicDomain.SaveTopic(topic);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value ="/deleteTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity deleteTopic(@ModelAttribute("id")Integer id){
        queryTopicDomain.DeleteTopic(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value ="/getSubtopicByTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubtopicByTopic(@ModelAttribute("id")Integer id){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<Map> result = new ArrayList<Map>();
        List<Description> subtopics = queryDescriptionDomain.getDescriptionByTopicId(id);
        Integer subTopicId = 0,index = 0;
        if(subtopics.size()>0){
            subTopicId = subtopics.get(0).getSubtopicId();
        }
        Map listBuffer = new HashMap();
        for (int i=0;i<subtopics.size();i++){
            if(subtopics.size()==1){
                Map description = new HashMap();
                description.put("descriId",subtopics.get(i).getDescriptionId());
                description.put("descriData",subtopics.get(i).getDescriptionData());
                description.put("max",subtopics.get(i).getMax());
                description.put("min",subtopics.get(i).getMin());
                description.put("grade",subtopics.get(i).getGrade());
                description.put("subtoppicId",subtopics.get(i).getSubtopicId());

                listBuffer.put(index++,description);

                Map topicBuffer = new HashMap();
                topicBuffer.put("SubTopic", subtopics.get(i).getSubtopic());
                topicBuffer.put("lenght", listBuffer.size());
                topicBuffer.put("Description", listBuffer);
//                topicBuffer.put("score",  subtopics.get(i - 1).getSubtopic().getTopic().getScore());
                result.add(topicBuffer);
                subTopicId = subtopics.get(i).getSubtopicId();
                index = 0;
                listBuffer = new HashMap();
                break;
            }
            if((!subtopics.get(i).getSubtopicId().toString().equals(subTopicId+""))||i==subtopics.size()-1){
                if(i==subtopics.size()-1) {
                    Map description = new HashMap();
                    description.put("descriId", subtopics.get(i).getDescriptionId());
                    description.put("descriData", subtopics.get(i).getDescriptionData());
                    description.put("max", subtopics.get(i).getMax());
                    description.put("min", subtopics.get(i).getMin());
                    description.put("grade", subtopics.get(i).getGrade());
                    description.put("subtoppicId", subtopics.get(i).getSubtopicId());

                    listBuffer.put(index++, description);
                }
                Map topicBuffer = new HashMap();
                topicBuffer.put("SubTopic", subtopics.get(i - 1).getSubtopic());
                topicBuffer.put("lenght", listBuffer.size());
                topicBuffer.put("Description", listBuffer);
//                topicBuffer.put("score",  subtopics.get(i - 1).getSubtopic().getTopic().getScore());
                result.add(topicBuffer);
                subTopicId = subtopics.get(i).getSubtopicId();
                index = 0;
                listBuffer = new HashMap();
            }
            Map description = new HashMap();
            description.put("descriId",subtopics.get(i).getDescriptionId());
            description.put("descriData",subtopics.get(i).getDescriptionData());
            description.put("max",subtopics.get(i).getMax());
            description.put("min",subtopics.get(i).getMin());
            description.put("grade",subtopics.get(i).getGrade());
            description.put("subtoppicId",subtopics.get(i).getSubtopicId());

            listBuffer.put(index++,description);
        }

        return new ResponseEntity(new Gson().toJson(result),headers,HttpStatus.OK);
    }
    @RequestMapping(value ="/getScoreTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity getScoreTopic(@ModelAttribute("id")Integer id){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        Topic topic = queryTopicDomain.getTopicClass(id);
        return new ResponseEntity(topic.getScore().toString(),headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/saveSubtopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity saveSubtopic(@Valid Subtopic subtopic){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        Integer id = querySubTopicDomain.saveSubtopic(subtopic);
        return new ResponseEntity(id+"",headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/saveDescription",method = RequestMethod.POST)
    public ResponseEntity saveDescription(@Valid Description description)
    {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        Integer id = queryDescriptionDomain.saveDrescription(description);
        return new ResponseEntity(id+"",headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/editTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity editTopic(@Valid Topic topic){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        queryTopicDomain.editTopic(topic);
        return new ResponseEntity(headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/getScoreInUserOfTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity getScoreInUserOfTopic(@ModelAttribute("topicId")Integer topicId){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        Integer score = queryDescriptionDomain.sumScoreDrecriptionByTopicId(topicId);
        return new ResponseEntity(score+"",headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/deleteDiscription",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity deleteDiscription(@ModelAttribute("subTopicId")Integer subTopicId){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        queryDescriptionDomain.deleteDescription(subTopicId);
        querySubTopicDomain.removeSubTpic(subTopicId);
        return new ResponseEntity(headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/editDescription",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity editDescription(@Valid Description description){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        Subtopic subtopic = querySubTopicDomain.getSubtopicDatas(description.getSubtopicId());
        description.setSubtopic(subtopic);
        queryDescriptionDomain.saveEditDescription(description);
        return new ResponseEntity(headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/editSubTopic",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity editSubTopic(@Valid Subtopic subtopic){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        querySubTopicDomain.editSubTopic(subtopic);
        return new ResponseEntity(headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/checkTopicInuse",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity checkTopicInuse(@ModelAttribute("topicName")String topicName){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String inUse = queryTopicDomain.getRepleceTopic(topicName);
        return new ResponseEntity(inUse,headers,HttpStatus.OK);
    }
    @RequestMapping(value ="/checkSubTopicInuse",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity checkSubTopicInuse(@ModelAttribute("subTopicName")String subTopicName,
                                             @ModelAttribute("topicId")Integer topicId){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String inUse = querySubTopicDomain.getRepleceSubtopic(0,topicId,subTopicName);
        return new ResponseEntity(inUse,headers,HttpStatus.OK);
    }

    @RequestMapping(value ="/checkSubTopicInuseEdit",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity checkSubTopicInuseEdit(@ModelAttribute("subtopicData")String subTopicName,
                                                 @ModelAttribute("topicId")Integer topicId,
                                                 @ModelAttribute("subtopicId")Integer subtopicId){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String inUse = querySubTopicDomain.getRepleceSubtopic(subtopicId,topicId,subTopicName);
        return new ResponseEntity(inUse,headers,HttpStatus.OK);
    }

}
