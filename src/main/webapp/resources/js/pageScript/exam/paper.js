var pId;
var itemLenght;
var code;
var name;
var arrayEmployeeToSearch = new Array();
var createDateFrom;
var createDateTo;
var scoreFrom;
var scoreTo;
var paperStatus;
var btnSearchStatus;
var tempArray = new Array();
var paperIdArray = new Array();
var checkTime;
var checkScore;
var checkAll;
var checkCurrent;

$(document).ready(function(){

    //getAllPapers();
    paperNotFound();

    if($("#tbodyManagePaper tr").length == 0){
        paperNotFound();
    }

    $("#advPaperResetBtn").unbind('click').click(function(){
        resetAdvInput();
    });

    $("#resetSearchPaper").unbind('click').click(function(){
        resetInput();
    });

    $('#tbodyManagePaper tr').mouseover(function(){
        $(this).css('cursor', 'pointer');
    });

    $('#tbodyManagePaper').on('click','td:not(.pCheck):not(.pSelect):not(.pButton)',function(){
        var paperId = $(this).parent().find("button").attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        window.location.href = context+"/TDCS/exam/createPaper?pId="+paperId+"#info";
    });

    $("#searchPaperStatus").on('change', function(){
        paperStatus = $("#searchPaperStatus").val();
    });

    //$(".panel-body").on('click', '#searchPaper', function(){
    $("#searchPaper").unbind('click').click(function(){
        //alert('hi');
        btnSearchStatus = 0;
        generalSearchPaper(btnSearchStatus);
    });

    //$(".panel-footer").on('click', '#advPaperSearchBtn', function(){
    $("#advPaperSearchBtn").unbind('click').click(function(){
        btnSearchStatus = 1;
        generalSearchPaper(btnSearchStatus);
    });

    $("#pStartTime").change(function(){
        var s = $("#searchCreateDateFromInput").val().split("/");
        var e = $("#searchCreateDateToInput").val().split("/");
        timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
    });

    $("#pToTime").change(function(){;
        var s = $("#searchCreateDateFromInput").val().split("/");
        var e = $("#searchCreateDateToInput").val().split("/");
        timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
    });

    $("#searchScoreFromInput").change(function(){
        scoreDiff($("#searchScoreFromInput").val(), $("#searchScoreToInput").val());
    });

    $("#searchScoreToInput").change(function(){
        scoreDiff($("#searchScoreFromInput").val(), $("#searchScoreToInput").val());
    });

    $("#tbodyManagePaper").on('click', 'td > button', function(){
        var paperId = $(this).attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);

        $.ajax({
            //url: context+"/TDCS/exam/checkExamPaperInUse",
            url: context+"/TDCS/exam/checkExamPaperIfMarkConfirmed",
            type: "POST",
            data: {
                paperId: paperId
            },
            success: function(check){
                if(check == true || $("#dropdownId"+pId).val() == 1){
                    alert('ไม่สามารถแก้ไขชุดข้อสอบนี้ได้');
                }
                else{
                    toUrl(paperId);
                }
            }
        });
    });

    $("#tbodyManagePaper").on('click', '.checkPaper', function(){

        var paperId = $(this).parent().parent().find("button").attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);

        //var check = $.ajax({
        //    //url: context+"/TDCS/exam/checkExamPaperInUse",
        //    url: context+"/TDCS/exam/checkExamPaperIfMarkConfirmed",
        //    type: "POST",
        //    data: {
        //        paperId: paperId
        //    },
        //    async: false,
        //    success: function(check){
        //
        //    }
        //}).responseText;

        //if(check == 'true'){
            //if(!confirm('ชุดข้อสอบนี้ได้ถูกใช้งานแล้ว คุณต้องการลบชุดข้อสอบนี้ใช่หรือไม่')){
            //    this.checked = false;
            //
            //    return false;
            //}
            //else{
            //    this.checked = true;
            //}
        //    $(this).attr('disabled', 'disabled');
        //}

        if($("#dropdownId"+pId).val() == 1){
            alert('ไม่สามารถลบชุดข้อสอบนี้ได้');
            this.checked = false;
        }

        //$("#checkPaperAll").checked = false;
        counter();
        checkAll = $(".checkPaper:not(input[type=checkbox]:disabled)").length;
        if(checkCurrent != checkAll){
            $("#checkPaperAll").prop('checked', false);
        }
        else{
            $("#checkPaperAll").prop('checked', true);
        }

    });

    $("#checkPaperAll").on('click', function(){
        if(this.checked){
            $(".checkPaper").each(function(){
                pId = $(this).parent().siblings().map(function(){
                    return $(this).text();
                }).get(0);
                //
                //if($("#dropdownId"+pId).val() == 1 || $(this).attr('check') == 'true'){
                //    this.checked = false;
                //}
                //else{
                //    this.checked = true;
                //}
                if($(this).is(':disabled')){
                    //$(this).parent().parent().find('select').val() == 1
                    this.checked = false;
                }
                else{
                    this.checked = true;
                }
            });
        }
        else{
            $(".checkPaper").each(function(){
                this.checked = false;
            });
        }
    });

    $("#tbodyManagePaper").on('change', 'select[name="paperStatus"]', function(){
        var paperId = $(this).attr('id');
        paperId = paperId.substr(10);
        updatePaperStatus(paperId);
        //$(".checkPaper").each(function(){
        //    this.checked = false;
        //});
        //$("#checkPaperAll").removeAttr('checked');
        var paperStatus = $("#dropdownId" + paperId).val();
        if(paperStatus == 1){
            $(this).parent().parent().find('input').removeAttr('checked', 'checked');
            $(this).parent().parent().find('input').attr('disabled', 'disabled');
        }
        else{
            $(this).parent().parent().find('input').removeAttr('disabled', 'disabled');
        }
    });

    $("#deletePapers").on('click', function(){
        if(!confirm('คุณต้องการลบชุดข้อสอบที่เลือกใช่หรือไม่?')){
            return false;
        }
        $("#tbodyManagePaper tr input[type='checkbox']:checked").each(function(){
            pId = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            paperIdArray.push(pId);
        });
        deletePapers();
    });
});

function getAllPapers(){
    $.ajax({
        type : "POST",
        url : context+"/TDCS/exam/getAllPapers",
        contentType: "application/json",
        async: false,
        success : function(data){
            $("#tbodyManagePaper").empty();
            data.forEach(function (value) {
                var paperName = value.examPaper.name;
                if(paperName == undefined? paperName = "-": paperName = value.examPaper.name);

                var posiId;
                var posiName;

                if(value.examPaper.position != null){
                    posiId = value.examPaper.position.posiId;
                    posiName = value.examPaper.position.posiName;
                }
                else{
                    posiId = 0;
                    posiName = "ทั้งหมด";
                }

                var str1 = "";
                var str2 = "";
                var check = false;

                if(value.check == 'true') {
                    str1 = "disabled";
                    str2 = "disabled";
                }

                //if((value.check == 'false') && (value.examPaper.paperStatus.id != 1)){
                //    checkAll = checkAll + 1;
                //}

                if(value.examPaper.paperStatus.id == 1){
                    str1 = "disabled";
                    str2 = "";
                }

                $("#tbodyManagePaper").append(
                    '<tr>'+
                    '<td style="display: none;"><label id="'+value.examPaper.id+'">'+value.examPaper.id+'</label></td>'+
                    '<td class="pCheck"><input class="checkPaper" '+str1+' type="checkbox" check="'+check+'"/></td>'+
                    '<td><label id="lpaperCode'+value.examPaper.code+'">'+value.examPaper.code+'</label></td>'+
                    '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+paperName+'</label></td>'+
                    '<td><label id="lpaperCreateBy'+value.examPaper.createBy.empId+'">'+value.examPaper.createBy.thFname+' '+value.examPaper.createBy.thLname+'</label></td>'+
                    '<td><label id="lpaperScore'+value.examPaper.maxScore+'" class="label-control">'+value.examPaper.maxScore+'</label></td>'+
                    '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
                    '<td class="pSelect">'+
                    '<select id="dropdownId'+value.examPaper.id+'" name="paperStatus" '+str2+' class="btn btn-success btn-sm" style="text-align: left;">'+
                        //'<option value="3">ยังไม่เผยแพร่</option>'+
                    '<option value="1">เปิดใช้งาน</option>'+
                    '<option value="2">ปิดใช้งาน</option>'+
                    '</select>'+
                    '</td>'+
                    '<td class="pButton"><button id="'+value.examPaper.id+'" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                    '</tr>'
                );
                presentStatus(value.examPaper.id, value.examPaper.paperStatus.id);
            });
        }
    });
}


function updatePaperStatus(paperId) {
    var paperStatus = $("#dropdownId" + paperId).val();
    $.ajax({
        type: "POST",
        url:context+"/TDCS/exam/updatePaperStatus",
        data: {
            paperId: paperId,
            paperStatus: paperStatus
        },
        success: function () {
            alert('อัพเดทสถานะเรียบร้อยแล้ว');
        },
        error: function () {
            alert('error');
        }
    });
    setColorDropdown(paperId, paperStatus);
}

function presentStatus(paperId, presentStatus){
    $("#dropdownId"+paperId).val(presentStatus);
    setColorDropdown(paperId, presentStatus);
}

function setColorDropdown(paperId, paperStatus){
    if(paperStatus == 1) {
        $("#dropdownId"+paperId).css('background-color', '#33CC33');
        $("#dropdownId"+paperId).css('border-color', '#33CC33');
    }
    if(paperStatus == 2) {
        $("#dropdownId"+paperId).css('background-color', 'gray');
        $("#dropdownId"+paperId).css('border-color', 'gray');
    }
    if(paperStatus == 3) {
        $("#dropdownId"+paperId).css('background-color', '#33CCFF');
        $("#dropdownId"+paperId).css('border-color', '#33CCFF');
    }
}

function deletePapers(){
    var jsonObj = {};
    var tmpArray = new Array();
    for(var i = 0; i < paperIdArray.length; i++){
        var item = {
            "paperId": paperIdArray[i]
        };
        tmpArray.push(item);
    }
    jsonObj = JSON.stringify(tmpArray);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/deletePaper",
        contentType: "application/json",
        data: jsonObj,
        success: function () {
            alert('ลบชุดข้อสอบเรียบร้อยแล้ว');
            //window.location.reload();
            getAllPapers();
        },
        error: function () {
            alert('ลบชุดข้อสอบผิดพลาด');
        }
    });
    paperIdArray = [];
}

function generalSearchPaper(btnSearchStatus) {

    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    code = $("#paperCodeSearch").val();
    if (code == "" ? code = "" : code = $("#paperCodeSearch").val());
    name = $("#paperName").val();
    if (name == "" ? name = "" : name = $("#paperName").val());
    createDateFrom = $("#searchCreateDateFromInput").val();
    if (createDateFrom == "" ? createDateFrom = "" : createDateFrom = $("#searchCreateDateFromInput").val());
    createDateTo = $("#searchCreateDateToInput").val();
    if (createDateTo == "" ? createDateTo = "" : createDateTo = $("#searchCreateDateToInput").val());
    scoreFrom = $("#searchScoreFromInput").val();
    if (scoreFrom == "" ? scoreFrom = "" : scoreFrom = $("#searchScoreFromInput").val());
    scoreTo = $("#searchScoreToInput").val();
    if (scoreTo == "" ? scoreTo = "" : scoreTo = $("#searchScoreToInput").val());
    if (paperStatus == 0 ? paperStatus = "0" : paperStatus = $("#searchPaperStatus").val());
    arrayEmployeeToSearch = [];

    var s = $("#searchCreateDateFromInput").val().split("/");
    var e = $("#searchCreateDateToInput").val().split("/");
    timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");

    if(!checkTime && !checkScore){
        if (itemLenght > 0) {
            for (var i = 0; i < itemLenght; i++) {
                var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
                temp = temp.substring(temp.indexOf('_') + 1, temp.indexOf('z'));
                arrayEmployeeToSearch.push(temp);
            }
            if (btnSearchStatus == 0) {
                for (var idx = 0; idx < arrayEmployeeToSearch.length; idx++) {
                    var empIds = {
                        "empId": arrayEmployeeToSearch[idx],
                        "code": code,
                        "name": name,
                        "createDateFrom": createDateFrom,
                        "createDateTo": createDateTo,
                        "scoreFrom": scoreFrom,
                        "scoreTo": scoreTo,
                        "paperStatus": paperStatus,
                        "buttonStatus": btnSearchStatus
                    };
                    tempArray.push(empIds);
                }
            }
            if (btnSearchStatus == 1) {
                for (var idx1 = 0; idx1 < arrayEmployeeToSearch.length; idx1++) {
                    var empIds1 = {
                        "empId": arrayEmployeeToSearch[idx1],
                        "code": code,
                        "name": name,
                        "createDateFrom": createDateFrom,
                        "createDateTo": createDateTo,
                        "scoreFrom": scoreFrom,
                        "scoreTo": scoreTo,
                        "paperStatus": paperStatus,
                        "buttonStatus": btnSearchStatus
                    };
                    tempArray.push(empIds1);
                }
            }
        }
        else {
            if (btnSearchStatus == 0) {
                var empIds2 = {
                    "empId": '0',
                    "code": code,
                    "name": name,
                    "createDateFrom": createDateFrom,
                    "createDateTo": createDateTo,
                    "scoreFrom": scoreFrom,
                    "scoreTo": scoreTo,
                    "paperStatus": paperStatus,
                    "buttonStatus": btnSearchStatus
                };
                tempArray.push(empIds2);
            }
            if (btnSearchStatus == 1) {
                var empIds3 = {
                    "empId": '0',
                    "code": code,
                    "name": name,
                    "createDateFrom": createDateFrom,
                    "createDateTo": createDateTo,
                    "scoreFrom": scoreFrom,
                    "scoreTo": scoreTo,
                    "paperStatus": paperStatus,
                    "buttonStatus": btnSearchStatus
                };
                tempArray.push(empIds3);
            }
        }
        var jsonObjz = JSON.stringify(tempArray);

        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/searchPaper",
            dataType: "json",
            contentType: 'application/json',
            mimeType: 'application/json',
            data: jsonObjz,
            success: function (data) {
                checkAll = 0;
                $("#checkPaperAll").prop('checked', false);

                if(data == null){
                    paperNotFound();
                }
                else{
                    //For pagination
                    records = data;
                    if(records.length <= 5){
                        notShowPaging();
                    }
                    else{
                        showPaging(records);
                    }
                }
            }
        });
        tempArray = [];
    }
    else{
        if(checkTime == true){
            alert('ระยะเวลาไม่ถูกต้อง');
            $("#searchCreateDateFromInput").css('border-color', 'red');
            $("#searchCreateDateToInput").css('border-color', 'red');
        }
        if(checkScore == true){
            alert('คะแนนไม่ถูกต้อง');
            $("#searchScoreFromInput").css('border-color', 'red');
            $("#searchScoreToInput").css('border-color', 'red');
        }
    }
}

function paperNotFound(){
    $('.paging').attr('hidden');

    $('#orderPaper').hide();
    $('#deletePapers').hide();
    $("#paperNotFound").show();
    $("#tbManagePaper").hide();
}

function paperFound(){
    $('.paging').removeAttr('hidden');

    $('#deletePapers').show();
    $("#paperNotFound").hide();
    $("#tbManagePaper").show();
}

function resetInput(){
    $("#paperCodeSearch").val('');
    $("#paperName").val('');
    $("#showEmployeeSelected").empty();
}

function resetAdvInput(){
    $("#paperCodeSearch").val('');
    $("#paperName").val('');
    $("#showEmployeeSelected").empty();
    $("#searchCreateDateFromInput").val('');
    $("#searchCreateDateToInput").val('');
    $("#searchScoreFromInput").val('');
    $("#searchScoreToInput").val('');
    $("#searchPaperStatus").val(0);
    $("#showEmployeeSelected").empty();
}

function scoreDiff(sFrom, sTo){
    checkScore = false;
    if((sFrom != "") && (sTo != "")){
        if(Number(sFrom) > Number(sTo)){
            checkScore = true;
            $("#searchScoreFromInput").css('border-color', 'red');
            $("#searchScoreToInput").css('border-color', 'red');
        }
        if(Number(sFrom) < Number(sTo)){
            $("#searchScoreFromInput").css('border-color', '');
            $("#searchScoreToInput").css('border-color', '');
        }
    }
    else{
        $("#searchScoreFromInput").css('border-color', '');
        $("#searchScoreToInput").css('border-color', '');
    }
    return checkScore;
}

function timediff(start_actual_time, end_actual_time) {
    start_actual_time = new Date(start_actual_time);
    end_actual_time = new Date(end_actual_time);

    var diff = end_actual_time - start_actual_time;

    var diffSeconds = diff / 1000;
    var HH = Math.floor(diffSeconds / 3600);
    var MM = Math.floor(diffSeconds % 3600) / 60;

    var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
    if (formatted.charAt(1) == '-' || formatted == '00:00') {
        $("#searchCreateDateFromInput").css('border-color', 'red');
        $("#searchCreateDateToInput").css('border-color', 'red');
        checkTime = true;
    } else {
        $("#searchCreateDateFromInput").css('border-color', '');
        $("#searchCreateDateToInput").css('border-color', '');
        checkTime = false;
    }
};

function counter(){
    checkCurrent = 0;
    $(".checkPaper:not(':disabled')").each(function () {
        if($(this).is(':checked')){
            checkCurrent = checkCurrent + 1;
        }
    });
}