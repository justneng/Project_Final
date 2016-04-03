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

function transformString(txt){
    var finalForm = '';
    for(var idx = 0; idx < txt.length; idx ++){
        if(txt.charAt(idx) == ("<")){
            finalForm += "<span class='lessThanSign'><</span>";
        }else if(txt.charAt(idx) == (">")){
            finalForm += "<span class='greaterThanSign'>></span>";
        }else{
            finalForm += txt.charAt(idx);
        }
    }
    return finalForm;
}