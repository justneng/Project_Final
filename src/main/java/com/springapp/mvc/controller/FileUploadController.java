package com.springapp.mvc.controller;

/**
 * Created by Pongpipat on 13/2/2558.
 */

import com.springapp.mvc.domain.FindAllDataTableDomain;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

/**
 * Handles requests for the application file upload requests
 */

@Controller
@RequestMapping("/TDCS")
public class FileUploadController {
    @Autowired
    ServletContext servletContext;
    @Autowired
    QueryUserDomain queryUserDomain;
    @Autowired
    FindAllDataTableDomain findAllDataTableDomain;


//    private static final Logger logger = LoggerFactory
//            .getLogger(FileUploadController.class);

    /**
     * Upload single file using Spring Controller
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public @ResponseBody
    String uploadFileHandler(@RequestParam("file") MultipartFile file,
                             /*@RequestParam("havefile") String havefile,*/HttpServletRequest request) {
        String webappRoot = servletContext.getRealPath("/");
        List<User> users = findAllDataTableDomain.searchId(User.class,"userName", request.getSession().getAttribute("picusername").toString());

        String name = users.get(0).getUserId().toString()+".jpg";
        queryUserDomain.Updateimage(name,users.get(0).getUserId());
        if (!file.isEmpty()) {
            try {
                byte bytes[] = file.getBytes();

                // Creating the directory to store file
                Integer indexEndSubString = 0;
                String rootPath = /*System.getProperty("catalina.home");*/webappRoot;
                for (int i=0;i<rootPath.length();i++){
                    if(rootPath.charAt(i)=='t'&&rootPath.charAt(i+1)=='a'&&rootPath.charAt(i+2)=='r'
                            &&rootPath.charAt(i+3)=='g'&&rootPath.charAt(i+4)=='e'&&rootPath.charAt(i+5)=='t'){
                        indexEndSubString = i;
                        break;
                    }
                }
                rootPath = rootPath.substring(0,indexEndSubString) + "src"+File.separator+"main"+File.separator+"webapp"+File.separator+"resources";
                File dir = new File(rootPath + File.separator + "pictureUpload");
//                System.out.println(dir.getAbsolutePath());
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));

                stream.write(bytes);
                stream.close();

                File checkFile = new File(dir.getAbsolutePath()+File.separator+name);
                while (!checkFile.exists()){
//                    System.out.println("kkkkk");
                }
                return name;
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name
                    + " because the file was empty.";
        }
    }
}
