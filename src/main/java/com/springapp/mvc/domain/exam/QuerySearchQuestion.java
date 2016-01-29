package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Question;
import com.springapp.mvc.util.HibernateUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by wanchana on 24/8/2558.
 */
@Service
public class QuerySearchQuestion extends HibernateUtil{

    private static final Logger logger = Logger.getLogger(QuerySearchQuestion.class.getName());

//    public List<Question> generalSearch(String categoryName, String subCategoryName, String createBy){
//
//        if((categoryName != "") && (subCategoryName != "") && (createBy != "")) {
//
////            String queryStatement = "from Question"+
////                    "where categoryName like : categoryName"+
////                    "and subCategoryName like : subCategoryName"
////        }
//        }
//
//    }
}
