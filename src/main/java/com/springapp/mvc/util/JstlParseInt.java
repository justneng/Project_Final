package com.springapp.mvc.util;

public final class JstlParseInt {

    private  JstlParseInt(){

    }
    public static Integer parseInt(Float i){
        return Math.round(i);
    }
}
