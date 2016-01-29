var questionIdString = new Array();
var allQuestionIdOnTableCreatePaper = new Array();

var minutes;
var hours;
var questionsInPaper = new Array();
var newQuestionScore = new Array();
var sumPaperScore = 0;

var btnSearchStatus;
var categoryId = "";
var subcategoryId = "";
var arrayEmpNameToQuery = new Array();
var jsonObj = {};
var itemLenght;
var tempArray = new Array();

var questionDescriptionSearch = "";
var questionCreateDateFromSearch = "";
var questionCreateDateToSearch = "";
var questionScoreToSearch = "";
var questionScoreFromSearch = "";

var tmpQ = new Array();
var itm = {};

var paperId = 0;
var searchQEasy = 0;
var searchQNormal = 0;
var searchQHard = 0;
var previousNumber = 1;

var checkAll = 0;
var checkCurrent;

var checkAll2 = 0;
var checkCurrent2;

var checkQuestionReady = "";
var sp;
var subCategoryIds = new Array();
var catId = "";

$(document).ready(function(){

    var value = getValueFromUrl();
    var id = value.substring(0, value.indexOf("#"));
    var paperStatus = value.substring(value.indexOf("#") + 1, value.length);
    if($.isNumeric(Number(id)) && paperStatus == "edit"){
        paperId = Number(id);
        onLoadPageEditPaper();
        showUpdatePaper(paperId);
    }
    else if($.isNumeric(Number(id)) && paperStatus == "info"){
        paperId = Number(id);
        showPaperInfo(paperId);
    }
    else{
        onLoadPageCreatePaper();
    }

    initRandomQuestion();

    $("#randomQuestionBtn").unbind('click').click(function(){
        resetRandomQuestion();
        countQuestionReady();
    });

    $("button[modal-number=2]").click(function(){
        $("#questionPaperDetail").modal('hide');
    });

    $("#randResetBtn").unbind('click').click(function(){
        resetRandomQuestion();
    });

    if($("#randomQuestionModal").is(':visible')){
        resetRandomQuestion();
    }

    $("#randBtn").unbind('click').click(function(){
        randomQuestion();
    });

    $("#tbodySelectQuestion").on('click','td:not(.xyz)', function(){
        $('#questionPaperDetail').modal('show');
        //var position = $(this).position().top + $(this).outerHeight(true);
        //$('#questionPaperDetail').css('top', position/1.75);
        //$('#questionPaperDetail').css('outline', 'none');
        var questionId = $(this).parent().find('label').attr('id');
        questionId = questionId.substring(questionId.indexOf('d')+1, questionId.length);
        showQuestionInfo(questionId);
    });

    $("#generalSearchButtonInModalSelectionQuestion").unbind('click').click(function(){
        //alert(getUserIds());
        btnSearchStatus = 0;

        generalSearchQuestion(btnSearchStatus);
    });

    $("#advSearchBtn").unbind('click').click(function(){
        btnSearchStatus = 1;
        generalSearchQuestion(btnSearchStatus);
    });

    $("#selectCategoryToSelection").change(function(){
        subcategoryId = $("#selectSubCategoryToSelection").val();
        categoryId = $("#selectCategoryToSelection").val();
        //if(subcategoryId == ""? subcategoryId = "": subcategoryId = $("#selectSubCategoryToSelection").val());
    });

    $("#selectSubCategoryToSelection").change(function(){
        subcategoryId = $("#selectSubCategoryToSelection").val();
        categoryId = $("#selectCategoryToSelection").val();
        //if(subcategoryId == ""? subcategoryId = "": subcategoryId = $("#selectSubCategoryToSelection").val());
    });

    $("#selectCategoryToSelectionForRandom").change(function(){
        subcategoryId = $("#selectSubCategoryToSelectionForRandom").val();
        categoryId = $("#selectCategoryToSelectionForRandom").val();
    });

    $("#selectSubCategoryToSelectionForRandom").change(function(){

        //subCategoryIds = [];
        //var str = $("#selectCategoryToSelectionForRandom").val();
        //catId = str.substring(0, str.indexOf(":") - 1);
        //subCategoryIds.push($("#selectSubCategoryToSelectionForRandom").val());
        //countQuestionReady();

        subcategoryId = $("#selectSubCategoryToSelectionForRandom").val();
        categoryId = $("#selectCategoryToSelectionForRandom").val();
    });

    if($("#newPaperScore").val() == ""){
        $("#maxScore").val(0);
    }

    $("#newPaperScore").change(function(){
        if($("#newPaperScore").val() == ""){
            $("#maxScore").val(0);
            $("#newPaperScore").val(0);
        }
        else{
            $("#maxScore").val($("#newPaperScore").val());
        }
    });

    $("#cancelCreatePaperBtn").unbind('click').click(function(){
        if($.isNumeric(Number(id)) && paperStatus == "edit"){
            if(!confirm('ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่')){
                return false;
            }
        }
        else if($.isNumeric(Number(id)) && paperStatus == "info"){
            return true;
        }
        else{
            if(!confirm('ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่')){
                return false;
            }
        }
    });

    //$("#selectionQuestionBtnInpagePaper").on('click' ,function(){
    $("#selectionQuestionBtnInpagePaper").unbind('click').click(function(){
        $("#selectQuest").modal('show');
        //viewQuestions();
        dataNotFound();
        if($("#tbSelectQuestion #tbodySelectQuestion tr").length == 0){
            $("#questionsAreEmpty").show();
            $("#addQuestionBtn").attr('disabled', 'disabled');
            $("#tbSelectQuestion").hide();
        }
        categoryId = "";
        subcategoryId = "";
        clearAllSearchQuestionField();
    });

    $("#checkQuestionAll").click(function(event){
        if(this.checked){
            $(".selectQ").each(function(){
                this.checked = true;
            });
        }
        else{
            $(".selectQ").each(function(){
                this.checked = false;
            });
        }
    });

    $("#tbodySelectQuestion").on('click', '.selectQ', function(){
        $("#checkQuestionAll").checked = false;
        countTbSelectQuestion();
        if(checkCurrent != checkAll){
            $("#checkQuestionAll").prop('checked', false);
        }
        else{
            $("#checkQuestionAll").prop('checked', true);
        }
    });

    $("#tbodySelectedQuestionToPaper").on('click', '.selectedQuestion', function(){
        countTbSelectedQuestionToPaper();
        $(".checkAllQuestionFromCreatePaperPage").checked = false;
        if(checkCurrent2 != checkAll2){
            $(".checkAllQuestionFromCreatePaperPage").prop('checked', false);
        }
        else{
            $(".checkAllQuestionFromCreatePaperPage").prop('checked', true);
        }
    });

    $(".checkAllQuestionFromCreatePaperPage").click(function(){
        if(this.checked){
            $(".selectedQuestion").each(function(){
                this.checked = true;
            });
        }
        else{
            $(".selectedQuestion").each(function(){
                this.checked = false;
            });
        }
    });
    $("#removeRowSelected").on('click', function(){
        $("#tbSelectQuestion tr").has('input[class="selectQ"]:checked').remove();
        viewQuestions();
    });
    $("#removeRowQuestionSelect").on('click', function(){
        $("#tbSelectedQuestionToPaper tr").has('input[class="selectedQuestion"]:checked').remove();
        scoreOnChange();
        questionsInPaper = [];
        checkAll2 = 0;
        $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
            var temp = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            questionsInPaper.push(temp);

            checkAll2 = checkAll2 + 1;
        });
        if($("#tbodySelectedQuestionToPaper tr").length == 0){
            $("#removeRowQuestionSelect").hide();
            $("#tbSelectedQuestionToPaper").hide();
            $("#questionNotFound").show();
            $("#score").val(0);
        }
    });

    $("#createPaperBtn").unbind('click').click(function(){
        newQuestionScore = [];
        $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
            newQuestionScore.push($(this).val());
        });
        minutes =  $("#minutes").val();
        if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
        hours = $("#hours").val();
        if(hours == ""? hours = 0: hours = $("#hours").val());

        createPaper();
    });

    //$("#copyPaperBtn").unbind('click').click(function(){
    //    onLoadPageCopyPaper();
    //});

    $("#cancelBtn").unbind('click').click(function(){
        window.location.reload(true);
    });

    $("#updatePaperBtn").unbind('click').click(function(){
        questionsInPaper = [];
        $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
            var qId = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            questionsInPaper.push(qId);
        });
        newQuestionScore = [];
        $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
            newQuestionScore.push($(this).val());
        });
        minutes =  $("#minutes").val();
        hours = $("#hours").val();
        if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
        if(hours == ""? hours = 0: hours =  $("#hours").val());
        updatePaper();
    });

    $("#saveCopyPaperBtn").unbind('click').click(function(){
        var paperCode = $("#newPaperId").val();
        var paperName = $("#newPaperName").val();

        if(paperCode != ""){
            $("#newPaperId").css('border-color', 'green');
        }

        if(paperCode == ""){
            $("#newPaperId").focus();
            $("#newPaperId").css('border-color', 'red');
            alert('กรุณากรอกรหัสชุดข้อสอบ');

            return false;
        }

        var check = true;
        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getPaperCodeCopy",
            async: false,
            success: function(codes){
                for(var i = 0; i < codes.length; i++){
                    if($("#newPaperId").val() == codes[i]){
                        alert('รหัสชุดข้อสอบซ้ำ');
                        $("#newPaperId").focus();
                        $("#newPaperId").css('border-color', 'red');
                        check = false;
                    }
                }
            }
        });

        if(check == false){
            return false;
        }

        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/copyPaper",
            async: true,
            data:{
                paperId: paperId,
                paperCode: paperCode,
                paperName: paperName
            },
            success: function(){
                alert('คัดลอกชุดข้อสอบเรียบร้อยแล้ว');
                //window.location.reload(true);
                window.location.href =context+ "/TDCS/exam/managePapers";
            },
            error: function(){
                alert('เกิดข้อผิดพลาด');
            }
        });
    });

    $("#date").datepicker();
    function select(){
        $('#obj').click(function(){
            $('#objective').show();
            $('#objective2').show();
            $('#subjective').hide();
            $('#subjective2').hide();
        });

        $('#sub').click(function(){
            $('#subjective').show();
            $('#subjective2').show();
            $('#objective').hide();
            $('#objective2').hide();
        })
    }
});

$("#addQuestionBtn").unbind('click').click(function(){

    if($("#tbodySelectQuestion tr input[type=checkbox]:checked").length > 0){
        $("#tbodySelectQuestion tr input[type=checkbox]:checked").each(function(){
            var qId = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            addQuestionToPaper(qId);
            scoreOnChange();

            checkAll2 = checkAll2 + 1;
        });
        if(checkAll2 > 0){
            $("#removeRowQuestionSelect").show();
        }
        $("#selectQuest").modal('hide');
    }
    else{
        if(!confirm('คุณยังไม่ได้เลือกข้อสอบ คุณต้องการออกจากหน้าต่างนี้หรือไม่?')){
            return false;
        }
        else{
            $("#selectQuest").modal('hide');
        }
    }
});

function viewQuestions(){
    if($("#tbSelectedQuestionToPaper").is(":hidden") || $("#selectQuest").is(":visible") || $("#questionsAreEmpty").is(':visible')){
        //if($("#tbodySelectedQuestionToPaper tr").length == 0){
        //    alert('1' + $("#tbodySelectQuestion tr").length);
        $("#checkQuestionAll").attr('checked', false);
        var dataResponse = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getAllQuestionDetail",
            async: false,
            success: function(dataResponse){
                dataFound();
                $("#tbodySelectQuestion").empty();
                dataResponse.forEach(function(value){

                    var str = "";
                    if(value.choices != null){
                        var i = 1;
                        (value.choices).forEach(function(value2){
                            if(Number(value.status.id) == 3){
                                str = str +'<td style="display: none;"><label id="labelChoice'+i+value.id+'">'+value2.description+'</td>'+
                                    '<td style="display: none;"><label id="labelChoiceCorrection'+i+value.id+'">'+value2.correction.value+'</td>';
                            }
                            i = i+1;
                        });
                    }
                    //

                    $("#tbodySelectQuestion").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                        '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                        str+

                        '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                        '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                        '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                        '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                        '<td><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                        '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                        '</tr>'
                    );
                });
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
    if($("#tbodySelectQuestion tr").length != 0 && $("#tbodySelectedQuestionToPaper tr").length != 0){
        $("#tbSelectQuestion").show();
        $("#questionsAreEmpty").hide();
        $("#addQuestionBtn").removeAttr('disabled');
        allQuestionIdOnTableCreatePaper = [];
        $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
            var temp = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            allQuestionIdOnTableCreatePaper.push(temp);
        });
        // converse array to json.
        var toJsonObject = {};
        var tempz = new Array();
        for(var i = 0; i < allQuestionIdOnTableCreatePaper.length; i++){
            var item = {
                "id" : allQuestionIdOnTableCreatePaper[i]
            };
            tempz.push(item);
        }
        toJsonObject = JSON.stringify(tempz);

        var dataResponse = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getQuestionNotInSelected",
            data: toJsonObject,
            async: false,
            success: function(data){
                if(data.length == 0){
                    //alert('2');
                    dataNotFound();
                }
                else{
                    dataFound();
                    //alert('3');
                    $("#checkQuestionAll").attr('checked', false);
                    $("#tbSelectQuestion").show();
                    $("#tbodySelectQuestion").empty();
                    data.forEach(function(value){

                       var str = "";
                        if(value.choices != null){
                            var i = 1;
                            (value.choices).forEach(function(value2){
                                if(Number(value.status.id) == 3){
                                    str = str +'<td style="display: none;"><label id="labelChoice'+i+value.id+'">'+value2.description+'</td>'+
                                        '<td style="display: none;"><label id="labelChoiceCorrection'+i+value.id+'">'+value2.correction.value+'</td>';
                                }
                                i = i+1;
                            });
                        }

                        $("#tbodySelectQuestion").append(
                            '<tr>'+
                            '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+
                            '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                            str+

                            '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                            '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                            '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                            '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                            '<td><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                            '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                            '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                            '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                            '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                            '</tr>'
                        );
                    });
                }
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
}

function addQuestionToPaper(qId){
    questionIdString = [];
    questionIdString.push(qId);
    var newScore = $('#labelScore'+qId).text();

    $("#tbSelectedQuestionToPaper").show();
    $("#tbodySelectedQuestionToPaper").append(
        '<tr>'+
        '<td style="display: none;">'+$("#labelQuestionId"+qId).text()+'</td>'+
        '<td style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
        '<td style="text-align: center;">'+$("#labelQuestionTypeDesc"+qId).text()+'</td>'+
        '<td>'+$("#labelCategoryName"+qId).text()+'</td>'+
        '<td>'+$("#labelSubCategoryName"+qId).text()+'</td>'+
        '<td>'+$("#labelQuestionDesc"+qId).text()+'</td>'+
        '<td style="text-align: center;">'+$("#labelDiffDesc"+qId).text()+'</td>'+
        '<td><input id="newScore'+qId+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+newScore+'"/></td>'+
        '<td style="text-align: center;">'+$("#labelQuestionCreateBy"+qId).text()+'</td>'+
        '</tr>'
    );
    $("#questionNotFound").hide();
    questionsInPaper.push(qId);
    sumScore(Number($("#newScore"+qId).val()));
    $("#score").val(sumPaperScore);
}

function createPaperValidation(){

    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));
    var valid = true;

    if($("#newPaperId").val() != ""){
        $("#newPaperId").css('border-color', 'green');
    }

    if($("#newPaperScore").val() != "" && $.isNumeric($("#newPaperScore").val()) == true){
        $("#newPaperScore").css('border-color', 'green');
    }
    if($("#newPaperForPosition").val() != "โปรดเลือก"){
        $("#newPaperForPosition").css('border-color', 'green');
    }
    if(paperTime > 0){
        $("#hours").css('border-color', 'green');
        $("#minutes").css('border-color', 'green');
    }

    if($("#newPaperId").val() == ""){
        $("#newPaperId").focus();
        $("#newPaperId").css('border-color', 'red');

        valid = false;
    }

    if($("#newPaperScore").val() == "" || $.isNumeric($("#newPaperScore").val()) == false){
        $("#newPaperScore").focus();
        $("#newPaperScore").css('border-color', 'red');

        valid = false;
    }
    if($("#newPaperForPosition").val() == "โปรดเลือก"){
        $("#newPaperForPosition").css('border-color', 'red');

        valid = false;
    }

    if(paperTime == 0){
        $("#hours").css('border-color', 'red');
        $("#minutes").css('border-color', 'red');

        valid = false;
    }
    if($("#questionNotFoundDesc").is(":visible")){
        alert('โปรดเลือกข้อสอบ');

        valid = false;
    }

    return valid;
}

function validateScore(){
    if($("#score").val() > $("#maxScore").val()){
        alert('คะแนนมากกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
    if($("#score").val() < $("#maxScore").val()){
        alert('คะแนนน้อยกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
}

function createPaper(){

    var check = true;
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperCode",
        data: {
            pId: paperId
        },
        async: false,
        success: function(codes){
            for(var i = 0; i < codes.length; i++){
                if($("#newPaperId").val() == codes[i]){
                    alert('รหัสชุดข้อสอบซ้ำ');
                    $("#newPaperId").focus();
                    $("#newPaperId").css('border-color', 'red');
                    check = false;
                }
            }
        }
    });

    if(check == false){
        return false;
    }

    if(createPaperValidation() == false){
        return false;
    }
    if(validateScore() == false){
        return false;
    }

    var paperCode = $("#newPaperId").val();
    var paperName = $("#newPaperName").val();
    var paperScore = $("#newPaperScore").val();
    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPosition = $("#newPaperForPosition").val();
    if(paperForPosition == ""? paperForPosition = 0: paperForPosition = $("#newPaperForPosition").val());
    var jsonObjQuestion = {};
    var tempArrayQuestion = new Array();

    for(var idx = 0; idx < questionsInPaper.length; idx++){
        //if((newQuestionScore[idx] == null) || (questionsInPaper[idx] == null)){
        //    if(newQuestionScore[idx] == null){
        //        alert('empty newQuestionScore' + newQuestionScore);
        //        break;
        //    }
        //    if(questionsInPaper[idx] == null){
        //        alert('empty questionsInPaper' + questionsInPaper);
        //        break;
        //    }
        //}
        //else{
        //    var item = {
        //        "qId": questionsInPaper[idx],
        //        "qScore" : newQuestionScore[idx]
        //    };
        //    tempArrayQuestion.push(item);
        //}
        var item = {
            "qId": questionsInPaper[idx],
            "qScore" : newQuestionScore[idx]
        };
        tempArrayQuestion.push(item);
    }
    jsonObjQuestion = JSON.stringify(tempArrayQuestion);

    $.ajax({
        type: "POST",
        url:context+ "/TDCS/exam/createPaper",
        data: {
            paperCode : paperCode,
            paperName : paperName,
            paperScore : paperScore,
            paperTime : paperTime,
            paperForPosition : paperForPosition,
            jsonObjQuestion : jsonObjQuestion
        },
        success: function(paperId){
            alert('บันทึกข้อมูลสำเร็จ');
            window.location.href = context+"/TDCS/exam/managePapers";
            //toUrl(paperId);
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });

    newQuestionScore = [];
}

function onLoadPageCreatePaper(){
    $("#copyPaperField").show();
    $("#removeRowQuestionSelect").hide();
    $("#questionNotFound").show();
    $("#tbSelectedQuestionToPaper").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#score").val(0);
    $("#maxScore").val(0);
    $("#hours").defaultValue = "0";
}

function onLoadPageCopyPaper(){
    $("h3").text('คัดลอกชุดข้อสอบ '+$("#newPaperId").val()+" : "+$("#newPaperName").val());
    //$("#copyPaperBtn").hide();
    $("#updatePaperBtn").hide();
    //$("#saveCopyPaperBtn").show();
    $("#cancelBtn").show();
    $("#cancelCreatePaperBtn").hide();
    $("#newPaperScore").attr('disabled', 'disabled');
    $("#newPaperForPosition").attr('disabled', 'disabled');
    $("#hours").attr('disabled', 'disabled');
    $("#minutes").attr('disabled', 'disabled');
    //$("body button:not(#saveCopyPaperBtn):not(#cancelBtn)").attr('disabled', 'disabled');
    $("#tbSelectedQuestionToPaper input[type=checkbox], #tbSelectedQuestionToPaper input[type=number]").attr('disabled', 'disabled');
}

function onLoadPageEditPaper(){
    //$("#copyPaperBtn").show();
    $("#copyPaperField").hide();
    $("#questionNotFound").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#score").val(0);
    $("#maxScore").val(0);
    $("#hours").defaultValue = "0";
    $("#tbSelectedQuestionToPaper").show();
}

function onLoadPagePaperInfo(){
    $("#copyPaperField").hide();
    $("#tbSelectedQuestionToPaper").hide();
    $(".btn:not(#cancelCreatePaperBtn)").hide();
    $("#tbPaperInfo").show();
    $("h3").text('ข้อมูลชุดข้อสอบ');
    $("#cancelCreatePaperBtn").text('ย้อนกลับ');
}

function sumScore(score){
    sumPaperScore = sumPaperScore + Number(score);
}

function scoreOnChange(){
    var sumScoreChanged = 0;
    $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
        validateNumber($(this).attr("id"));
        if(Number($(this).val()) < 1 || !$.isNumeric(Number($(this).val()))){
            $(this).val(previousNumber);
            sumScoreChanged = sumScoreChanged + Number($(this).val());
        }
        else{
            sumScoreChanged = sumScoreChanged + Number($(this).val());
        }
    });
    $("#score").val(sumScoreChanged);
}

function generalSearchQuestion(btnSearchStatus) {

    allQuestionIdOnTableCreatePaper = [];
    $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
        var temp = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        allQuestionIdOnTableCreatePaper.push(temp);
    });

    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    if(categoryId.indexOf(':')!=-1){
        categoryId = categoryId.substring(0, categoryId.indexOf(':') - 1);
    }
    else{
        categoryId = categoryId;
    }
    if((subcategoryId == null) || (subcategoryId == "") || (subcategoryId == "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้")? subcategoryId = "": subcategoryId = subcategoryId);
    questionDescriptionSearch = $("#searchQuestionDescInput").val();
    if(questionDescriptionSearch == ""? questionDescriptionSearch = "": questionDescriptionSearch = $("#searchQuestionDescInput").val());
    questionCreateDateFromSearch = $("#searchCreateDateFromInput").val();
    if(questionCreateDateFromSearch == ""? questionCreateDateFromSearch = "": questionCreateDateFromSearch = $("#searchCreateDateFromInput").val());
    questionCreateDateToSearch = $("#searchCreateDateToInput").val();
    if(questionCreateDateToSearch == ""? questionCreateDateToSearch = "": questionCreateDateToSearch = $("#searchCreateDateToInput").val());
    questionScoreFromSearch = $("#searchScoreFromInput").val();
    if(questionScoreFromSearch == ""? questionScoreFromSearch = "": questionScoreFromSearch = $("#searchScoreFromInput").val());
    questionScoreToSearch = $("#searchScoreToInput").val();
    if(questionScoreToSearch == ""? questionScoreToSearch = "": questionScoreToSearch = $("#searchScoreToInput").val());
    questionCreateDateFromSearch = $("#searchCreateDateFromInput").val();
    if(questionCreateDateFromSearch == ""? questionCreateDateFromSearch = "": questionCreateDateFromSearch = $("#searchCreateDateFromInput").val());
    questionCreateDateToSearch = $("#searchCreateDateToInput").val();
    if(questionCreateDateToSearch == ""? questionCreateDateToSearch = "": questionCreateDateToSearch = $("#searchCreateDateToInput").val());
    searchQEasy = $("#rEasy").val();
    if(searchQEasy == ""? searchQEasy = 0: searchQEasy = $("#rEasy").val());
    searchQNormal = $("#rNormal").val();
    if(searchQNormal == ""? searchQNormal = 0: searchQNormal = $("#rNormal").val());
    searchQHard = $("#rHard").val();
    if(searchQHard == ""? searchQHard = 0: searchQHard = $("#rHard").val());

    //alert(searchQEasy + " " + searchQNormal + " " + searchQHard);

    if(itemLenght > 0){

        for (var i = 0; i < itemLenght; i++) {
            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
            temp = temp.substring(temp.indexOf('_')+1, temp.indexOf('z'));
            arrayEmpNameToQuery.push(temp);
        }
        if(btnSearchStatus == 0){

            for (var index = 0; index < allQuestionIdOnTableCreatePaper.length; index ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index]
                };
                tmpQ.push(itm);
            }
            var jsonString = JSON.stringify(tmpQ);

            for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
                var items = {
                    "thFname": arrayEmpNameToQuery[idx],
                    "subCategoryId": subcategoryId,
                    "categoryId": categoryId,
                    "btnSearchStatus" : btnSearchStatus,
                    "allQuestionIdOnTableCreatePaper" : jsonString,
                    "questionDescriptionSearch" : questionDescriptionSearch,
                    "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                    "questionCreateDateToSearch" : questionCreateDateToSearch,
                    "questionScoreToSearch" : questionScoreToSearch,
                    "questionScoreFromSearch" : questionScoreFromSearch,
                    "searchQEasy": searchQEasy,
                    "searchQNormal": searchQNormal,
                    "searchQHard": searchQHard
                };
                tempArray.push(items);
            }
            arrayEmpNameToQuery = [];
        }

        if(btnSearchStatus == 1){
            for (var index = 0; index < allQuestionIdOnTableCreatePaper.length; index ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index]
                };
                tmpQ.push(itm);
            }

            var jsonString = JSON.stringify(tmpQ);

            for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
                var items = {
                    "thFname": arrayEmpNameToQuery[idx],
                    "subCategoryId": subcategoryId,
                    "categoryId": categoryId,
                    "btnSearchStatus" : btnSearchStatus,
                    "allQuestionIdOnTableCreatePaper" : jsonString,
                    "questionDescriptionSearch" : questionDescriptionSearch,
                    "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                    "questionCreateDateToSearch" : questionCreateDateToSearch,
                    "questionScoreToSearch" : questionScoreToSearch,
                    "questionScoreFromSearch" : questionScoreFromSearch,
                    "searchQEasy": searchQEasy,
                    "searchQNormal": searchQNormal,
                    "searchQHard": searchQHard
                };
                tempArray.push(items);
            }
        }
    }
    else{
        if(btnSearchStatus == 0){
            for (var index3 = 0; index3 < allQuestionIdOnTableCreatePaper.length; index3 ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index3]
                };
                tmpQ.push(itm);
            }

            var jsonString = JSON.stringify(tmpQ);

            var item = {
                "thFname": '0',
                "subCategoryId": subcategoryId,
                "categoryId": categoryId,
                "btnSearchStatus" : btnSearchStatus,
                "allQuestionIdOnTableCreatePaper" : jsonString,
                "questionDescriptionSearch" : questionDescriptionSearch,
                "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                "questionCreateDateToSearch" : questionCreateDateToSearch,
                "questionScoreToSearch" : questionScoreToSearch,
                "questionScoreFromSearch" : questionScoreFromSearch,
                "searchQEasy": searchQEasy,
                "searchQNormal": searchQNormal,
                "searchQHard": searchQHard
            };
            tempArray.push(item);
        }
        if(btnSearchStatus == 1){
            for (var index4 = 0; index4 < allQuestionIdOnTableCreatePaper.length; index4 ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index4]
                };
                tmpQ.push(itm);
            }

            var jsonString = JSON.stringify(tmpQ);

            var item2 = {
                "thFname": '0',
                "subCategoryId": subcategoryId,
                "categoryId": categoryId,
                "btnSearchStatus" : btnSearchStatus,
                "allQuestionIdOnTableCreatePaper" : jsonString,
                "questionDescriptionSearch" : questionDescriptionSearch,
                "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                "questionCreateDateToSearch" : questionCreateDateToSearch,
                "questionScoreToSearch" : questionScoreToSearch,
                "questionScoreFromSearch" : questionScoreFromSearch,
                "searchQEasy": searchQEasy,
                "searchQNormal": searchQNormal,
                "searchQHard": searchQHard
            };
            tempArray.push(item2);
        }
    }
    jsonObj = JSON.stringify(tempArray);
    //alert(jsonObj);
    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/generalQuestionSearch",
        dataType: "json",
        contentType: 'application/json',
        mimeType: 'application/json',
        data: jsonObj,
        success: function (result) {
            checkAll = result.length;
            $("#checkQuestionAll").prop('checked', false);

            if(result.length > 0){
                dataFound();
                $("#tbodySelectQuestion").empty();
                result.forEach(function(value){

                    var str = "";
                    if(value.choices != null){
                        var j = 1;
                        (value.choices).forEach(function(value2){
                            if(Number(value.status.id) == 3){
                                str = str +'<td style="display: none;"><label id="labelChoice'+j+value.id+'">'+value2.description+'</td>'+
                                    '<td style="display: none;"><label id="labelChoiceCorrection'+j+value.id+'">'+value2.correction+'</td>';
                            }
                            j = j+1;
                        });
                    }
                    //
                    $("#tbodySelectQuestion").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                        '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                        str+

                        '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                        '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                        '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                        '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                        '<td style="text-align: center;"><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                        '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                        '</tr>'
                    );
                });
            }
            else{
                dataNotFound();
            }
        },
        error: function () {
            alert('ไม่พบข้อสอบ');
        }
    });
    searchQEasy = 0;
    searchQNormal = 0;
    searchQHard = 0;
    //categoryId = "";
    //subcategoryId = "";
    arrayEmpNameToQuery = [];
    tempArray = [];
    tmpQ = [];
    //allQuestionIdOnTableCreatePaper = [];
}

function dataNotFound(){
    $("#addQuestionBtn").hide();
    $("#questionsAreEmpty").show();
    $("#removeRowSelected").attr('disabled', 'disabled');
    $("#addQuestionBtn").attr('disabled', 'disabled');
    $("#tbSelectQuestion").hide();
}

function dataFound(){
    $("#addQuestionBtn").show();
    //$("#removeRowQuestionSelect").show();
    $("#questionsAreEmpty").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#tbSelectQuestion").show();
}

function toUrl(paperId){
    window.location.href = context+"/TDCS/exam/createPaper?pId="+paperId+"#edit";
}

function getValueFromUrl(){
    var pidFromUrl = window.location.href;
    pidFromUrl = pidFromUrl.substring(pidFromUrl.indexOf('?') + 5, pidFromUrl.length);

    return pidFromUrl;
}

function showUpdatePaper(paperId){

    $("title").text('แก้ไขชุดข้อสอบ');
    onLoadPageUpdatePaper();
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperQuestionByPaper",
        data : {
            paperId : paperId
        },
        async: false,
        success: function(value){
            $("#tbodySelectedQuestionToPaper").empty();
            //$("#removeRowQuestionSelect").show();
            //data.forEach(function(value){
            //    $("#newPaperId").val(value.examPaper.code);
            //    if($("#newPaperName").val(value.examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(value.examPaper.name));
            //    $("#newPaperScore").val(value.examPaper.maxScore);
            //    $("#maxScore").val(value.examPaper.maxScore);
            //
            //    var posiId;
            //    var posiName;
            //
            //    if(value.examPaper.position != null){
            //        posiId = value.examPaper.position.posiId;
            //    }
            //    else{
            //        posiId = 0;
            //    }
            //    $("#newPaperForPosition").val(Number(posiId));
            //
            //    var paperTime = value.examPaper.timeLimit;
            //    var hours = Math.floor(paperTime / 60);
            //    var minutes = paperTime % 60;
            //    $("#hours").val(hours);
            //    $("#minutes").val(minutes);
            //
            //    $("#tbodySelectedQuestionToPaper").append(
            //        '<tr>'+
            //        '<td style="display: none;">'+ value.question.id+'</td>'+
            //
            //        '<td style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
            //        '<td style="text-align: center;">'+ value.question.questionType.description+'</td>'+
            //        '<td>'+ value.question.subCategory.category.name+'</td>'+
            //        '<td>'+ value.question.subCategory.name+'</td>'+
            //        '<td style="text-align: left;">'+ value.question.description+'</td>'+
            //        '<td style="text-align: center;">'+ value.question.difficultyLevel.description+'</td>'+
            //        '<td><input id="newScore'+value.question.id+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value.score+'"/></td>'+
            //        '<td style="text-align: center;">'+ value.question.createBy.thFname+' '+value.question.createBy.thLname+'</td>'+
            //        '</tr>'
            //    );
            //    sumScore(value.score);
            //    $("#score").val(sumPaperScore);
            //});
            for(var i = 0; i < value.length; i ++){
                $("#newPaperId").val(value[0].examPaper.code);
                if($("#newPaperName").val(value[0].examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(value[0].examPaper.name));
                $("#newPaperScore").val(value[0].examPaper.maxScore);
                $("#maxScore").val(value[0].examPaper.maxScore);

                var posiId;
                var posiName;

                if(value[0].examPaper.position != null){
                    posiId = value[0].examPaper.position.posiId;
                }
                else{
                    posiId = 0;
                }
                $("#newPaperForPosition").val(Number(posiId));

                var paperTime = value[0].examPaper.timeLimit;
                var hours = Math.floor(paperTime / 60);
                var minutes = paperTime % 60;
                $("#hours").val(hours);
                $("#minutes").val(minutes);

                $("#tbodySelectedQuestionToPaper").append(
                    '<tr>'+
                    '<td style="display: none;">'+ value[i].question.id+'</td>'+

                    '<td style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                    '<td style="text-align: center;">'+ value[i].question.questionType.description+'</td>'+
                    '<td>'+ value[i].question.subCategory.category.name+'</td>'+
                    '<td>'+ value[i].question.subCategory.name+'</td>'+
                    '<td style="text-align: left;">'+ value[i].question.description+'</td>'+
                    '<td style="text-align: center;">'+ value[i].question.difficultyLevel.description+'</td>'+
                    '<td><input id="newScore'+value[i].question.id+'" onkeypress="return isNumber(event)" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value[i].score+'"/></td>'+
                    '<td style="text-align: center;">'+ value[i].question.createBy.thFname+' '+value[i].question.createBy.thLname+'</td>'+
                    '</tr>'
                );
                questionsInPaper.push(value[i].question.id);
                newQuestionScore.push(value[i].score);
                sumScore(value[i].score);
                $("#score").val(sumPaperScore);
            }
            checkAll2 = value.length;
            sumPaperScore = 0;
        },
        error: function(){
            alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
        }
    });
    sumPaperScore = 0;
    //onLoadPageUpdatePaper();
}

function showPaperInfo(pId){
    $("title").text('ข้อมูลชุดข้อสอบ');
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperQuestionByPaper",
        data : {
            paperId : paperId
        },
        async: false,
        success: function(data){
            onLoadPagePaperInfo();
            $("#tbPaperInfo tbody").empty();
            data.forEach(function(j){
                $("#newPaperId").val(j.examPaper.code).attr('disabled', 'disabled');
                if($("#newPaperName").val(j.examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(j.examPaper.name).attr('disabled', 'disabled'));
                $("#newPaperScore").val(j.examPaper.maxScore).attr('disabled', 'disabled');
                $("#maxScore").val(j.examPaper.maxScore);

                var posiId;
                var posiName;

                if(j.examPaper.position != null){
                    posiId = j.examPaper.position.posiId;
                }
                else{
                    posiId = 0;
                }
                $("#newPaperForPosition").val(posiId).attr('disabled', 'disabled');

                var paperTime = j.examPaper.timeLimit;
                var hours = Math.floor(paperTime / 60);
                var minutes = paperTime % 60;
                $("#hours").val(hours).attr('disabled', 'disabled');
                $("#minutes").val(minutes).attr('disabled', 'disabled');
                $("#divCreateDate").show();

                $("#tbPaperInfo tbody").append(
                    '<tr>'+
                    '<td style="display: none;">'+ j.question.id+'</td>'+
                    '<td style="text-align: center;">'+ j.question.questionType.description+'</td>'+
                    '<td>'+ j.question.subCategory.category.name+'</td>'+
                    '<td>'+ j.question.subCategory.name+'</td>'+
                    '<td style="text-align: left;">'+ j.question.description+'</td>'+
                    '<td style="text-align: center;">'+ j.question.difficultyLevel.description+'</td>'+
                    '<td style="text-align: center;">'+ j.score+'</td>'+
                    '<td style="text-align: center;">'+ j.question.createBy.thFname+' '+j.question.createBy.thLname+'</td>'+
                    '</tr>'
                );
                sumScore(j.score);
                $("#score").val(sumPaperScore);
            });
        },
        error: function(){
            alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
        }
    });
    sumPaperScore = 0;
    //onLoadPageUpdatePaper();
}

function onLoadPageUpdatePaper(){
    countTbSelectedQuestionToPaper();
    $("h3:not('#questionNotFoundDesc'):not('#questionsAreEmptyDesc')").text('แก้ไขชุดข้อสอบ');
    $("#createPaperBtn").hide();
    $("#updatePaperBtn").show();
    $("#removeRowQuestionSelect").show();
}

function resetRandomQuestion(){
    $("#randEasy").val('');
    $("#randNormal").val('');
    $("#randHard").val('');
    $("#selectCategoryToSelectionForRandom").empty();
    $("#selectSubCategoryToSelectionForRandom").empty();
    $("#selectCategoryToSelectionForRandom").val('');
    $("#selectSubCategoryToSelectionForRandom").val('');

    clearCategoryList();
    updateCategoryList();
    init();
}

function countQuestionReady(){

    var tmp = new Array();
    var idx;
    var qIds = {};
    var subCatIds = {};

    questionsInPaper = [];
    $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
        var temp = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        questionsInPaper.push(temp);
    });

    if(questionsInPaper.length > 0){
        for(idx = 0; idx < questionsInPaper.length; idx++){
            var item = {
                "qId": questionsInPaper[idx]
            };
            tmp.push(item);
        }
        qIds = JSON.stringify(tmp);
    }

    if(subCategoryIds.length > 0){
        tmp = [];
        for(idx = 0; idx < subCategoryIds.length; idx ++){
            var item = {
                "subId": subCategoryIds[idx]
            };
            tmp.push(item);
        }
        subCatIds = JSON.stringify(tmp);
    }

    if(catId == ""? catId = "": catId = catId);

    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/countQuestionReady",
        data: {
            qIds: qIds,
            subCatIds: subCatIds,
            catId: catId
        },
        async: false,
        success: function(response){
            checkQuestionReady = response;

            sp = checkQuestionReady.split('#');

            $("#randEasy").attr('data-original-title', 'จำนวนข้อที่สามารถสุ่มได้ ' + sp[1] + ' ข้อ');
            $("#randNormal").attr('data-original-title', 'จำนวนข้อที่สามารถสุ่มได้ ' + sp[2] + ' ข้อ');
            $("#randHard").attr('data-original-title', 'จำนวนข้อที่สามารถสุ่มได้ ' + sp[3] + ' ข้อ');

            $('[data-toggle="tooltip"]').tooltip();
            sp="";
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });
    subCategoryIds = [];
    questionsInPaper = [];
    catId = "";
}

function updatePaper(){

    var check = true;
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperCode",
        data: {
            pId: paperId
        },
        async: false,
        success: function(codes){
            for(var i = 0; i < codes.length; i++){
                if($("#newPaperId").val() == codes[i]){
                    alert('รหัสชุดข้อสอบซ้ำ');
                    $("#newPaperId").focus();
                    $("#newPaperId").css('border-color', 'red');
                    check = false;
                }
            }
        }
    });

    if(check == false){
        return false;
    }

    if(createPaperValidation() == false){
        return false;
    }
    if(validateScore() == false){
        return false;
    }

    var paperCodeUpdate = $("#newPaperId").val();
    var paperNameUpdate = $("#newPaperName").val();
    var paperScoreUpdate = $("#newPaperScore").val();
    var paperTimeUpdate = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPositionUpdate = $("#newPaperForPosition").val();
    if(paperForPositionUpdate == ""? paperForPositionUpdate = 0: paperForPositionUpdate = $("#newPaperForPosition").val());
    var jsonObjQuestionUpdate = {};
    var tempArrayQuestionUpdate = new Array();

    for(var idx = 0; idx < questionsInPaper.length; idx++){
        var item = {
            "qId": questionsInPaper[idx],
            "qScore" : newQuestionScore[idx]
        };
        tempArrayQuestionUpdate.push(item);
    }
    jsonObjQuestionUpdate = JSON.stringify(tempArrayQuestionUpdate);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/updatePaper",
        data: {
            paperCodeUpdate  : paperCodeUpdate,
            paperNameUpdate  : paperNameUpdate ,
            paperScoreUpdate  : paperScoreUpdate ,
            paperTimeUpdate  : paperTimeUpdate ,
            paperForPositionUpdate  : paperForPositionUpdate ,
            jsonObjQuestionUpdate  : jsonObjQuestionUpdate,
            paperIdUpdate : paperId
        },
        success: function(){
            alert('แก้ไขชุดข้อสอบเรียบร้อยแล้ว');
            window.location.href = context+"/TDCS/exam/managePapers";
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });
}

function randomQuestion(){

    if(categoryId.indexOf(':')!=-1){
        categoryId = categoryId.substring(0, categoryId.indexOf(':') - 1);
    }
    else{
        categoryId = categoryId;
    }
    if(subcategoryId == null? subcategoryId = "": subcategoryId = subcategoryId);

    questionsInPaper = [];
    $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
        var temp = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        questionsInPaper.push(temp);
    });

    var randEasy = $("#randEasy").val();
    var randNormal = $("#randNormal").val();
    var randHard = $("#randHard").val();
    var index = 0;

    if(questionsInPaper.length > 0? index = questionsInPaper.length: index = 1);
    if(randEasy == ""? randEasy = 0: randEasy =  $("#randEasy").val());
    if(randNormal == ""? randNormal = 0: randNormal = $("#randNormal").val());
    if(randHard == ""? randHard = 0: randHard = $("#randHard").val())

        var obj = {};
    var tempz = new Array();

    for(var i = 0; i < index; i++){
        var id = 0;
        if(questionsInPaper.length > 0? id = questionsInPaper[i]: id = 0);
        var item = {
            "randEasy": randEasy,
            "randNormal": randNormal,
            "randHard": randHard,
            "qid" : id,
            "categoryId": categoryId,
            "subCategoryId": subcategoryId
        };
        tempz.push(item);
    }
    obj = JSON.stringify(tempz);

    $.ajax({
        url: context+"/TDCS/exam/randomQuestions",
        type: "POST",
        contentType: "application/json",
        data: obj,
        success: function(data){
            var questionCount = (Number(randEasy) + Number(randNormal) + Number(randHard));
            var checkTrLength = $("#tbodySelectedQuestionToPaper tr").length ;
            var dataLength = 0;
            data.forEach(function(i){
                if(jQuery.type(i) === "object"){
                    dataLength ++;
                }
                else{
                    return;
                }
            });

            if((dataLength == 0 || data == null) && (checkTrLength == 0)){
                alert('ไม่พบข้อสอบ');
                dataNotFound();
            }
            if((dataLength == 0 || data == null) && (checkTrLength > 0)){
                alert('ไม่พบข้อสอบ');
                dataFound();
                $("#questionNotFound").hide();
                $("#checkQuestionAll").attr('checked', false);
                $("#tbSelectedQuestionToPaper").show();

            }
            if((dataLength != 0) && (data != null)){
                if(dataLength > 0) {
                    dataFound();
                    $("#questionNotFound").hide();
                    $("#checkQuestionAll").attr('checked', false);

                    if ((dataLength < questionCount)) {
                        var tmpArr = new Array(data[0], data[1], data[2]);
                        var message1 = "", message2 = "", message3 = "";
                        var str = "\t\t\tข้อสอบไม่เพียงพอ";
                        tmpArr.forEach(function(i){
                            if(jQuery.type(i) === "string"){
                                var str = i.split('#');
                                if(str[0] == "easy") {
                                    message1 = ":จำนวนข้อสอบระดับง่ายที่สามารถสุ่มได้มากที่สุด " + str[1] + " ข้อ";
                                }
                                if(str[0] == "normal") {
                                    message2 = ":จำนวนข้อสอบระดับปานกลางที่สามารถสุ่มได้มากที่สุด " + str[1] + " ข้อ";
                                }
                                if(str[0] == "hard") {
                                    message3 = ":จำนวนข้อสอบระดับยากที่สามารถสุ่มได้มากที่สุด " + str[1] + " ข้อ";
                                }
                            }
                            else{
                                return;
                            }
                        });

                        if(message1 != ""){
                            str = str + "\n" + message1;
                        }if(message2 != ""){
                            str = str + "\n" + message2;
                        }if(message3 != ""){
                            str = str + "\n" + message3;
                        }
                        str = str + "\n" +'\t\t  ต้องการดำเนินการต่อหรือไม่?';

                        if((message1 != "") && (message2 != "") && (message3 != "")){
                            str = 'ไม่พบข้อสอบ';
                        }

                        if (!confirm(str)) {
                            if($("#tbodySelectedQuestionToPaper tr").length > 0){
                                return false;
                            }
                            else{
                                $("#tbSelectedQuestionToPaper").hide();
                                $("#questionNotFound").show();
                                dataNotFound();
                                return false;
                            }
                        }
                        else {
                            $("#checkAllQuestionFromCreatePaperPage").checked = false;
                            data.forEach(function (value) {
                                if(jQuery.type(value) === "string"){
                                    return;
                                }
                                else{
                                    $("#tbSelectedQuestionToPaper").show();
                                    $("#removeRowQuestionSelect").show();
                                    $("#tbodySelectedQuestionToPaper").append(
                                        '<tr>' +
                                        '<td style="display: none;"><label id="labelQuestionId' + value.id + '">' + value.id + '</td>' +
                                        '<td style="display: none;"><label id="labelCreateDateId' + value.id + '">' + value.createDate + '</td>' +
                                        '<td style="text-align: center;"><input class="selectedQuestion" name="selectQ" type="checkbox"/></td>' +
                                        '<td style="text-align: center;"><label id="labelQuestionTypeDesc' + value.id + '">' + value.questionType.description + '</td>' +
                                        '<td style="text-align: left;"><label id="labelCategoryName' + value.id + '">' + value.subCategory.category.name + '<label></td>' +
                                        '<td style="text-align: left;"><label id="labelSubCategoryName' + value.id + '">' + value.subCategory.name + '</label></td>' +
                                        '<td style="text-align: left;"><label id="labelQuestionDesc' + value.id + '">' + value.description + '</label></td>' +
                                        '<td style="text-align: center;"><label id="labelDiffDesc' + value.id + '">' + value.difficultyLevel.description + '</td>' +
                                        '<td><input id="newScore' + value.id + '" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="' + value.score + '"/></td>' +

                                        '<td style="text-align: center;"><label id="labelQuestionCreateBy' + value.id + '">' + value.createBy.thFname + " " + value.createBy.thLname + '</td>' +
                                        '<td style="display: none;"><label id="labelQuestionCreateDate' + value.id + '">' + value.createDate + '</td>' +

                                        '</tr>'
                                    );
                                }
                            });
                        }
                    }

                    else if (dataLength == questionCount) {
                        $("#checkAllQuestionFromCreatePaperPage").checked = false;
                        $("#tbSelectedQuestionToPaper").show();
                        $("#removeRowQuestionSelect").show();
                        data.forEach(function (value) {
                            $("#tbodySelectedQuestionToPaper").append(
                                '<tr>' +
                                '<td style="display: none;"><label id="labelQuestionId' + value.id + '">' + value.id + '</td>' +
                                '<td style="display: none;"><label id="labelCreateDateId' + value.id + '">' + value.createDate + '</td>' +
                                '<td style="text-align: center;"><input class="selectedQuestion" name="selectQ" type="checkbox"/></td>' +
                                '<td style="text-align: center;"><label id="labelQuestionTypeDesc' + value.id + '">' + value.questionType.description + '</td>' +
                                '<td style="text-align: left;"><label id="labelCategoryName' + value.id + '">' + value.subCategory.category.name + '<label></td>' +
                                '<td style="text-align: left;"><label id="labelSubCategoryName' + value.id + '">' + value.subCategory.name + '</label></td>' +
                                '<td style="text-align: left;"><label id="labelQuestionDesc' + value.id + '">' + value.description + '</label></td>' +
                                '<td style="text-align: center;"><label id="labelDiffDesc' + value.id + '">' + value.difficultyLevel.description + '</td>' +
                                '<td><input id="newScore' + value.id + '" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="' + value.score + '"/></td>' +

                                '<td style="text-align: center;"><label id="labelQuestionCreateBy' + value.id + '">' + value.createBy.thFname + " " + value.createBy.thLname + '</td>' +
                                '<td style="display: none;"><label id="labelQuestionCreateDate' + value.id + '">' + value.createDate + '</td>' +

                                '</tr>'
                            );
                        });
                    }
                    else{
                        $("#checkAllQuestionFromCreatePaperPage").checked = false;
                        $("#tbSelectedQuestionToPaper").show();
                        $("#removeRowQuestionSelect").show();
                        data.forEach(function (value) {

                            var str = "";
                            if (value.choices != null) {
                                var i = 1;
                                (value.choices).forEach(function (value2) {
                                    if (Number(value.status.id) == 3) {
                                        str = str + '<td style="display: none;"><label id="labelChoice' + i + value.id + '">' + value2.description + '</td>' +
                                            '<td style="display: none;"><label id="labelChoiceCorrection1' + value.id + '">' + value2.correction.value + '</td>';
                                    }
                                    i = i + 1;
                                });
                            }

                            $("#tbodySelectedQuestionToPaper").append(
                                '<tr>' +
                                '<td style="display: none;"><label id="labelQuestionId' + value.id + '">' + value.id + '</td>' +
                                '<td style="display: none;"><label id="labelCreateDateId' + value.id + '">' + value.createDate + '</td>' +
                                '<td style="text-align: center;"><input class="selectedQuestion" name="selectQ" type="checkbox"/></td>' +
                                '<td style="text-align: center;"><label id="labelQuestionTypeDesc' + value.id + '">' + value.questionType.description + '</td>' +
                                '<td style="text-align: left;"><label id="labelCategoryName' + value.id + '">' + value.subCategory.category.name + '<label></td>' +
                                '<td style="text-align: left;"><label id="labelSubCategoryName' + value.id + '">' + value.subCategory.name + '</label></td>' +
                                '<td style="text-align: left;"><label id="labelQuestionDesc' + value.id + '">' + value.description + '</label></td>' +
                                '<td style="text-align: center;"><label id="labelDiffDesc' + value.id + '">' + value.difficultyLevel.description + '</td>' +
                                '<td><input id="newScore' + value.id + '" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="' + value.score + '"/></td>' +

                                '<td style="text-align: center;"><label id="labelQuestionCreateBy' + value.id + '">' + value.createBy.thFname + " " + value.createBy.thLname + '</td>' +
                                '<td style="display: none;"><label id="labelQuestionCreateDate' + value.id + '">' + value.createDate + '</td>' +

                                '</tr>'
                            );
                        });
                    }
                }
            }

            scoreOnChange();
            categoryId = "";
            subcategoryId = "";
            sumPaperScore = 0;
            questionsInPaper = [];
            $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
                var qId = $(this).parent().siblings().map(function(){
                    return $(this).text();
                }).get(0);
                questionsInPaper.push(qId);
            });

            checkAll2 = 0;
            checkAll2 = questionsInPaper.length;
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });
}

function showQuestionInfo(qId){
    $("#categoryDetail").text($("#labelCategoryName"+qId).text());
    $("#subCategoryDetail").text($("#labelSubCategoryName"+qId).text());
    $("#createByDetail").text($("#labelQuestionCreateBy"+qId).text());
    $("#createDateDetail").text($("#labelCreateDateId"+qId).text());
    $("#questionTypeDetail").text($("#labelQuestionTypeDesc"+qId).text());
    $("#difficultyDetail").text($("#labelDiffDesc"+qId).text());
    $("#scoreDetail").text($("#labelScore"+qId).text());
    $("#questionDescDetail").text($("#labelQuestionDesc"+qId).text());

    if(Number($("#labelQuestionTypeId"+qId).text()) == 1){
        $("#choiceDetailContainer").show();
        for(var j = 1; j < 5; j ++ ){
            if($("#labelChoiceCorrection"+j+qId).text() == 'true'){
                $("#choiceDetail"+j).text($("#labelChoice"+j+qId).text());
                $("#correctDetail"+j).children('span').show();
            }
            else{
                $("#choiceDetail"+j).text($("#labelChoice"+j+qId).text());
                $("#correctDetail"+j).children('span').hide();
            }
        }
    }
    else{
        $("#choiceDetailContainer").hide();
    }
}

function validateNumber(id){
    $("#"+id).focus(function () {
        previousNumber.defaultValue = $("#"+id).val();
    }).change(function() {
        previousNumber = $(this).val();
    });
}

function countTbSelectQuestion(){
    checkCurrent = 0;
    $(".selectQ").each(function () {
        if($(this).is(':checked')){
            checkCurrent = checkCurrent + 1;
        }
    });
}

function countTbSelectedQuestionToPaper(){
    checkCurrent2 = 0;
    $(".selectedQuestion").each(function () {
        if($(this).is(':checked')){
            checkCurrent2 = checkCurrent2 + 1;
        }
    });
}


function initRandomQuestion(){
    $("#randEasy").attr('data-toggle', 'tooltip');
    $("#randNormal").attr('data-toggle', 'tooltip');
    $("#randHard").attr('data-toggle', 'tooltip');

    $("#randEasy").attr('title');
    $("#randNormal").attr('title');
    $("#randHard").attr('title');
}

