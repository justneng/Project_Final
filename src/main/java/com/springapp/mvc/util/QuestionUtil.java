package com.springapp.mvc.util;

import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by PTang_000 on 20-Apr-16.
 */
public class QuestionUtil {

    public static List<Question> getRandomlyPickQuestionFromPaper(ExamPaper paper,List<Question> questions,List<Question> depletedQuestion){
        List<Question> resultList = new ArrayList<Question>();
        List<Question> easyList = new ArrayList<Question>();
        List<Question> mediocreList = new ArrayList<Question>();
        List<Question> hardList = new ArrayList<Question>();

        for(Question q : questions){
            switch (q.getDifficultyLevel().getLevel()){
                case 1:if(!depletedQuestion.contains(q)){
                    easyList.add(q);
                }
                    break;
                case 2:if(!depletedQuestion.contains(q)){
                    mediocreList.add(q);
                }
                    break;
                case 3:if(!depletedQuestion.contains(q)){
                    hardList.add(q);
                }
                    break;
            }
        }

        //Start picking process
        Random random = new Random();

        List<Question> pickedQuestions = new ArrayList<Question>();
        for(int picked = 0 ; picked < paper.getQuestionEasy() ; picked++ ){
            int numberPicked = random.nextInt(easyList.size());
            pickedQuestions.add(easyList.get(numberPicked));
            easyList.remove(numberPicked);
        }

        for(int picked = 0 ; picked < paper.getQuestionNormal() ; picked++ ){
            int numberPicked = random.nextInt(mediocreList.size());
            pickedQuestions.add(mediocreList.get(numberPicked));
            mediocreList.remove(numberPicked);
        }

        for(int picked = 0 ; picked < paper.getQuestionHard() ; picked++ ){
            int numberPicked = random.nextInt(hardList.size());
            pickedQuestions.add(hardList.get(numberPicked));
            mediocreList.remove(numberPicked);
        }

        //Prevent duplicate Function


        return pickedQuestions;
    }
}
