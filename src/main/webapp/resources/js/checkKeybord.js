function isNumberPoint(evt) {//for me only
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//        alert(charCode);
    if (((charCode >= 48 && charCode <= 57) || charCode == 8) || otherKey(evt)) {
        if (charCode == 8) {
            $("#inputGrade").val("");
        }
        return true;
    }
    return false;
}

function isNumberEvaluate(evt) {//for me only
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//        alert(charCode);
    if (((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46) || otherKey(evt)) {
        return true;
    }
    return false;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//    alert(charCode);
    if ((charCode >= 48 && charCode <= 57) || otherKey(evt)) {
        return true;
    }

    return false;
}

function isEmergency(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//        alert(charCode);
    if ((charCode >= 37 && charCode <= 40) || (charCode >= 58 && charCode <= 95) || (charCode >= 33 && charCode <= 47) || otherKey(evt)) {
        return true;
    }
    return false;
}

function isEnglish(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//        alert(charCode);
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || otherKey(evt)) {
        return true;
    }
    return false;
}

function isThai(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode >= 3585 && charCode <= 3660) || otherKey(evt)) {
        return true;
    }
    return false;
}
function otherKey(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 9 || charCode == 8 || charCode == 39 || charCode == 37) {
        return true;
    }
}
function numberAndEnglist(evt) {
//    var charCode = (evt.which) ? evt.which : evt.keyCode;
//    alert(charCode)
    if (isNumber(evt) || isEnglish(evt) || otherKey(evt)) {
        return true;
    }
    return false;
}
function numberEnglishEmegency(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
//    alert(charCode);
    if (isNumber(evt) || isEmergency(evt) || isEnglish(evt) || otherKey(evt)) {
        return true;
    }
    return false;
}
function checkEmail(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (isNumber(evt) || isEnglish(evt) || charCode == 64 || charCode == 46 || charCode == 95 || otherKey(evt)) {
        return true;
    }
    return false;
}