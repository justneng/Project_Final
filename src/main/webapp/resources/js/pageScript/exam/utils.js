function checkString(txt){
    for(var idx = 0; idx < txt.length; idx ++){
        if(txt.charAt(idx) == ("<")){
            txt.replace(txt[idx], "&lt");
        }
        if(txt.charAt(idx) == (">")){
            txt.replace(txt[idx], "&gt");
        }
    }

    return txt;
}