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

function textareaToDatabase(txt){

    //for(var idx = 0; idx < txt.length; idx ++){
    //    if(txt.charAt(idx) == (" ")){
    //        finalForm += "&nbsp;";
    //    }else{
    //        finalForm += txt.charAt(idx);
    //    }
    //}

    //var result = txt.replace(/\r\n|\r|\n/g,"<br />");


    return txt
}

function DatabaseToTextarea(txt){
    //var result = transformString(txt).replace(/<br\s?\/?>/g,"\n")
    //var result = txt.replace(/<br\s?\/?>/g,"\n");
    return txt
}

var boxingComma = function(txt){
    return txt.replace(/,/g,"%coMMa%")
}

var unboxingComma = function(txt){
    return txt.replace(/%coMMa%/g,",")
}