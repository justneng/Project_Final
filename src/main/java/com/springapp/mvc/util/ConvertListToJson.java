package com.springapp.mvc.util;


import java.lang.reflect.*;
import java.util.*;
/**
 * Created by sugree_t on 11/14/2014.
 */
public class ConvertListToJson {

    public static void main(String[] args) throws Exception
    {
        //TEST
        //    System.out.println(Class.forName("ttt").getDeclaredFields()[0].getModifiers());
//        List list=new ArrayList();
//        list.add(new ttt());
//        list.add(new ttt());
//        list.add(new ttt());
//        toJson(list);
    }

    public static String toJson(List list) throws Exception
    {
        StringBuffer result=new StringBuffer();
        if(list==null && list.size()==0)
        {
            return result.toString();
        }
        Object obj=list.get(0);
        Method[] method=obj.getClass().getDeclaredMethods();

        result.append("[");
        for(int i=0;i<list.size();i++)
        {
            obj=list.get(i);
            if(i > 0){
                result.append(",");
            }
            result.append("{");
            for(int j=0;j<method.length;j++)
            {
                if(method[j].getName().startsWith("get"))
                {
                    result.append("\""+toFieldName(method[j].getName())+"\"");
                    result.append(":");
                    result.append("\"" + method[j].invoke(obj) + "\"");
                    result.append(",");
                }
            }
            result.deleteCharAt(result.length()-1);
            result.append("}");
        }
        result.append("]");

        return result.toString();
    }

    public static String toFieldName(String methodName)
    {
        String result="";
        result+=(char)(methodName.charAt(3)+32);
        for(int i=4;i<methodName.length();i++)
        {
            result+=methodName.charAt(i);
        }
        return result;
    }

}
