/**
 * Created by Jobz on 6/10/2558.
 */
//$(document).ready(function(){
//    searchExampaper();
//})
$('#tbExamRecordSearch').hide();
$('#sortBy').hide();
$("#btnExamRecordSearch").on('click',function() {
    searchExampaper();
});
$('#orderPaperBy').on('change',function(){
    sortBy();
    });
$('#orderPaperType').on('change',function(){
    sortBy();
    });
$("#btnExamRecordSearchClearInput").on('click',function(){
    clearInput();
});
function clearInput(){
    $("#searchPaperInput").val("");
    $("#forPosition").val(0);
    $("#showEmployeeSelected").empty();
    $('#searchNameTrainee').val("");
    $('#orderPaperBy').val("paperCode");
    $('#orderPaperType').val("desc");

}
var itemLenght;
var code;
var position;
var traineeNameEmpId;
var arrayItemToQuery = new Array();
var tempArray = new Array();
var jsonObj = {};
var orderPaperBy ;
var orderPaperType;
function searchExampaper() {
    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    code = $("#searchPaperInput").val();
    position = $("#forPosition").val();
    orderPaperBy = $('#orderPaperBy').val();
    orderPaperType = $('#orderPaperType').val();
    code = code.substr(0, code.indexOf(' '));
    traineeNameEmpId = $('#searchNameTrainee').val();
    traineeNameEmpId = traineeNameEmpId.substr(0, traineeNameEmpId.indexOf(':'));
    if (itemLenght > 0) {
        for (i = 0; i < itemLenght; i++) {
            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
            temp = temp.substring(temp.indexOf('_') + 1, temp.indexOf('z'));
            arrayItemToQuery.push(temp);

        }
    }
    for (var idx = 0; idx < arrayItemToQuery.length; idx++) {
        var items = {
            userId: arrayItemToQuery[idx]
        }
        tempArray.push(items);
    }

    ajax();
}
function ajax(){
    var a = {
        code: code,
        position: position,
        empId: traineeNameEmpId,
        orderPaperBy: orderPaperBy,
        orderPaperType: orderPaperType
    }
    tempArray.push(a);
    arrayItemToQuery = [];
    jsonObj = JSON.stringify(tempArray);
    //alert(jsonObj);
    var dataResponse = $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getQueryExamRecordSearch",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            async: false,
            data: jsonObj,
        success: function(data){
            $("#tbodyExamRecord").empty();
            if(data.length == 0){
                $("#paperNotFound").show();
                $('#tbExamRecordSearch').hide();
                $('#sortBy').hide();
            }

            for(var i = 0; i < data.length; i ++){
                $("#paperNotFound").hide();
                $('#tbExamRecordSearch').show();
                $('#sortBy').show();
                var testResult;
                var paperName = data[i].examRecord.paper.name;
                testResult =  Number(data[i].objectiveScore)+ Number (data[i].subjectiveScore);
                    if (data[i].examRecord.user.position.posiName == "Software Developer Trainee") {
                        data[i].examRecord.user.position.posiName = "Dev";
                    }
                    if (data[i].examRecord.user.position.posiName == "Assistant Business Analyst") {
                        data[i].examRecord.user.position.posiName = "BA";
                    }if (paperName == null) {
                        paperName = "";
                    }

                    $("#tbodyExamRecord").append(
                        '<tr>' +
                        '<td class="text-center"><label ><a>' + data[i].examRecord.paper.code + '</a></label></td>' +
                        '<td><label >' + paperName + '</label></td>' +
                        '<td><label >' + data[i].examRecord.user.thFname + "    " + data[i].examRecord.user.thLname + '</label></td>' +
                        '<td class="text-center"><label >' + data[i].examRecord.user.position.posiName + '</label></td>' +
                        '<td class="text-center" resultId="' + data[i].id + '"><label >'+(data[i].objectiveScore + data[i].subjectiveScore)+'</label></td>' +
                        '<td class="text-center">' + data[i].examRecord.paper.maxScore + '</td>' +
                        '<td><label >' + data[i].examRecord.paper.createBy.thFname + '</label></td>' +
                        '<td class="text-center"><label >' + data[i].status.description + '</label></td>' +
                       '</tr>'
                    );
            }
        },
        error: function(){
            alert("error");
        }
    });
    arrayItemToQuery = [];
    tempArray = [];

    $("#searchPaperInput").keyup(function(e) {
        if (e.which > 0) {
            e.preventDefault();
            listSearchPaper();
        }
    });
}

function sortBy(){
    orderPaperBy = $('#orderPaperBy').val();
    orderPaperType = $('#orderPaperType').val();
    ajax();
}

var tbodytrResuiltId;
$('#tbodyExamRecord').on('click','tr',function(){
    $('#alertModalChangPage').modal('show');
    tbodytrResuiltId = $(this).children('td:eq(4)').attr('resultId') ;
});

$("#okBtnChangPage").on("click",function(){
    location.href =context+ "/TDCS/exam/marking?resultId="+ tbodytrResuiltId;
});

function listSearchPaper() {
    var availableall = [];
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllPapers",
        async: false,
        success: function (data) {

            data.forEach(function (value) {
                availableall.push(value.examPaper.code + ' : ' + value.examPaper.name);
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });

    var search = $("#searchPaperInput").val();
    $("#searchPaperInput").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20
    }).focus().val('').keyup().val(search);
}

function listNameTrainee(){
    var listAllNameTrainee = [];
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllUserTrainee",
        async: false,
        success: function (data) {

            data.forEach(function (value) {
                listAllNameTrainee.push(value.empId+':'+value.thFname + '  ' + value.thLname);
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });

    var search = $("#searchNameTrainee").val();
    $("#searchNameTrainee").typeahead('destroy').typeahead({
        source: listAllNameTrainee,
        minLength: 0,
        items: 20
    }).focus().val('').keyup().val(search);

}