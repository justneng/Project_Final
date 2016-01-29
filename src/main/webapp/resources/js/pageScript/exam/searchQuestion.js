//$("#generalSearchButtonInModalSelectionQuestion").unbind('click').click(function(){
//        generalSearchQuestion();
//    });
//function generalSearchQuestion() {
//    var i;
//    var categoryId = $("#selectCategoryToSelection").val();
//    categoryId = categoryId.substring(0, 5);
//    var subcategoryId = $("#selectSubCategoryToSelection").val();
//    var empName = $("#selectCreateBySearchInput").val();
//    alert(categoryId + " " + subcategoryId);
//    var arrayEmpNameToQuery = new Array();
//
//    if(($("#showEmployeeSelected").children("button")).length != 0){
//        var itemLenght = ($("#showEmployeeSelected").children("button")).length;
//        for (i = 0; i < itemLenght; i++) {
//            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
//            temp = temp.substr(0, temp.indexOf(' '));
//            temp.toString();
//            arrayEmpNameToQuery.push(temp);
//        }
//        var jsonObj = {};
//        var tempArray = new Array();
//
//        for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
//            var item = {
//                "thFname": arrayEmpNameToQuery[idx],
//                "subCategoryId": subcategoryId
//            };
//            tempArray.push(item);
//        }
//        jsonObj = JSON.stringify(tempArray);
//        alert(jsonObj);
//
//        var dataResponse = $.ajax({
//            type: "POST",
//            url: "/TDCS/exam/generalQuestionSearch",
//            dataType: "json",
//            contentType: 'application/json',
//            mimeType: 'application/json',
//            data: jsonObj,
//            success: function () {
//                alert('Hi');
//            },
//            error: function () {
//                alert('เกิดข้อผิดพลาด');
//            }
//        });
//    }
//    else{
//        var jsonObj = {};
//        var tempArray = new Array();
//
//        for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
//            var item = {
//                "subCategoryId": subcategoryId
//            };
//            tempArray.push(item);
//        }
//        jsonObj = JSON.stringify(tempArray);
//        alert(jsonObj);
//
//        var dataResponse = $.ajax({
//            type: "POST",
//            url: "/TDCS/exam/generalQuestionSearch",
//            dataType: "json",
//            contentType: 'application/json',
//            mimeType: 'application/json',
//            data: jsonObj,
//            success: function (result) {
//                $("#tbodySelectQuestion").empty();
//                result.forEach(function(i){
//                    var qDescriptions = i.descriptions;
//                    if(i.descriptions.length > 60){
//                        qDescriptions = (i.descriptions).substring(0, 50);
//                    }
//                    $("#tbodySelectQuestion").append(
//                        '<tr>'+
//                        '<td style="display: none;"><label id="labelQuestionId'+i.ids+'">'+i.ids+'</td>'+
//                        '<td><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
//                        '<td style="text-align: left;"><label id="labelCategoryName'+i.ids+'">'+i.subCategorys.category.name+'<label></td>'+
//                        '<td style="text-align: left;"><label id="labelSubCategoryName'+i.ids+'">'+i.subCategorys.name+'</label></td>'+
//                        '<td style="text-align: left;"><button class="btn btn-link btn-info btn-sm" type="button"><span class="glyphicon glyphicon-info-sign"></span></span></button><label id="labelQuestionDesc'+i.ids+'">'+qDescriptions+'</label></td>'+
//                        '<td><label id="labelQuestionTypeDesc'+i.ids+'">'+i.questionTypes.description+'</td>'+
//                        '<td><label id="labelDiffDesc'+i.ids+'">'+i.difficultyLevels.description+'</td>'+
//                        '<td><label id="labelScore'+i.ids+'">'+i.scores+'</td>'+
//
//                        '<td><label id="labelQuestionCreateBy'+i.ids+'">'+i.createBys.thFname+" "+i.createBys.thLname+'</td>'+
//                        '<td style="display: none;"><label id="labelQuestionCreateDate'+i.ids+'">'+i.createDates+'</td>'+
//
//                        '<td style="display: none; text-align: center"><button id="btnQuestionInfo'+i.ids+'" data-toggle="modal" data-target="#showQuestionInfoModal" class="btn btn-info" type="button" onclick="showInfo('+i.ids+')"><span class="glyphicon glyphicon-book"></span></button></td>'+
//                        '</tr>'
//                    );
//                });
//            },
//            error: function () {
//                alert('เกิดข้อผิดพลาด');
//            }
//        });
//    }
//}

//$(document).ready(function(){
//    $("#advanceBtn").on('click', function(){
//        if($("#collapse").hasClass("glyphicon-arrow-down")){
//            alert("general");
//        }
//    });
//});

//function generalSearchQuestion(){
//    var i;
//    var categoryId = $("#selectCategoryToSelection").val();
//    var subcategoryId = $("#selectSubCategoryToSelection").val();
//    var empName = $("#selectCreateBySearchInput").val();
//    var arrayEmpNameToQuery = new Array();
//    var itemLenght = ($("#showEmployeeSelected").children("button")).length;
//
//    for(i = 0; i < itemLenght; i++){
//        var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
//        temp = temp.substr(0, temp.indexOf(' '));
//        temp.toString();
//        arrayEmpNameToQuery.push(temp);
//    }
//
//    //converse array to JSON
//    var jsonObj = {};
//    var tempArray = new Array();
//    for(var idx = 0; idx < arrayEmpNameToQuery.length; idx ++){
//        var item = {
//          "thFname" : arrayEmpNameToQuery[idx],
//          "categoryId" : categoryId,
//          "subCategoryId" : subcategoryId,
//          "empName" : empName
//        };
//        tempArray.push(item);
//    }
//    jsonObj = JSON.stringify(tempArray);
//    //alert(jQuery.type(arrayEmpNameToQuery));
//    //alert(jsonObj + jQuery.type(jsonObj));
//    alert(jsonObj);
//
//    var dataResponse = $.ajax({
//        type: "POST",
//        url: "/TDCS/exam/generalQuestionSearch",
//        dataType: "json",
//        contentType: 'application/json',
//        mimeType: 'application/json',
//        data: jsonObj,
//        success: function(){
//            //alert('Hi');
//        },
//        error: function(){
//            alert('เกิดข้อผิดพลาด');
//        }
//    });
//}
