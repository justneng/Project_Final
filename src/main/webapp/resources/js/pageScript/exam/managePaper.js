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
        $('#createPaperBtn').attr('button-status', 'update');
        $('#createPaperRandomQuestionBtn').attr('button-status', 'update');
        //onLoadPageEditPaper();
        showUpdatePaper(paperId);
    }
    else if($.isNumeric(Number(id)) && paperStatus == "info"){
        paperId = Number(id);
        showPaperInfo(paperId);
    }
    else{
        $('#createPaperBtn').attr('button-status', 'create');
        $('#createPaperRandomQuestionBtn').attr('button-status', 'create');
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

    //$("#selectCategoryToSelectionForRandom").change(function(){
    //    subcategoryId = $("#selectSubCategoryToSelectionForRandom").val();
    //    categoryId = $("#selectCategoryToSelectionForRandom").val();
    //});
    //
    //$("#selectSubCategoryToSelectionForRandom").change(function(){
    //    subcategoryId = $("#selectSubCategoryToSelectionForRandom").val();
    //    categoryId = $("#selectCategoryToSelectionForRandom").val();
    //});

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

    $("#selectionQuestionBtnInpagePaper").unbind('click').click(function(){
        $("#selectQuest").modal('show');
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
                $(this).attr("check", "true");
            });
        }
        else{
            $(".selectQ").each(function(){
                this.checked = false;
                $(this).attr("check", "false");
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
    });

    $("#removeRowQuestionSelect").on('click', function(){
        var tmp = [];
        $('input[class="selectedQuestion"]:checked').each(function(){
            tmp.push($(this).parent().attr('level'));
        });

        for(var i = 0; i < tmp.length; i ++){
            if(Number(tmp[i]) == 1){
                $('#esy').text(Number($('#esy').text()) - 1);
            }
            if(Number(tmp[i]) == 2){
                $('#nrm').text(Number($('#nrm').text()) - 1);
            }
            if(Number(tmp[i]) == 3){
                $('#hrd').text(Number($('#hrd').text()) - 1);
            }
        }

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
            questionsInPaper = [];
            $("#removeRowQuestionSelect").hide();
            $("#tbSelectedQuestionToPaper").hide();
            $(".label-difficulty-level").hide();
            $("#esy, #nrm, #hrd").text(0).hide();
            $('#sum-score').hide();
            $("#score").val(0);
            $('#questionNotFoundDesc').show();
        }
    });

    $("#createPaperBtn").unbind('click').click(function(){
        if($('#createPaperBtn').attr('button-status') == "create"){
            newQuestionScore = [];
            $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
                newQuestionScore.push($(this).val());
            });
            minutes =  $("#minutes").val();
            if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
            hours = $("#hours").val();
            if(hours == ""? hours = 0: hours = $("#hours").val());

            createPaper('static');
        }
        if($('#createPaperBtn').attr('button-status') == "update") {
            questionsInPaper = [];
            $(".selectedQuestion").each(function(){
                questionsInPaper.push($(this).parent().attr("qid"));
            });
            newQuestionScore = [];
            $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
                newQuestionScore.push($(this).val());
            });
            minutes =  $("#minutes").val();
            hours = $("#hours").val();
            if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
            if(hours == ""? hours = 0: hours =  $("#hours").val());
            updatePaper('static');
        }
    });

    //$("#copyPaperBtn").unbind('click').click(function(){
    //    onLoadPageCopyPaper();
    //});

    $("#cancelBtn").unbind('click').click(function(){
        window.location.reload(true);
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

    $('#maintabs').unbind('click').click(function(){
        if($('#tbodySelectedQuestionToPaper tr').length > 0){
            $('#questionNotFoundDesc').hide();
        }
        else{
            $('#questionNotFoundDesc').show();
        }
    });

    $('#selecttabs').unbind('click').click(function(){
        viewQuestions();
    });

    $('#randomtabs').unbind('click').click(function(){
        resetRandomQuestion();
        countQuestionReady();
    });

    $("#addQuestionBtn").unbind('click').click(function(){
        var elem;
        if($('#span-random-questions').is(':visible')){
            elem = $('#addQuestionBtn').siblings("#span-random-questions");
        }
        else{
            elem = $('#addQuestionBtn').siblings(".createQuestionBtn");

        }

        var isRandom = false;
        if($('#select-paper-type').val() == 'random'){
            isRandom = true;
        }

        if($("#tbodySelectQuestion tr input[type=checkbox]:checked").length > 0){
            $("#tbodySelectQuestion tr input[type=checkbox]:checked").each(function(){
                var qId = $(this).parent().siblings().map(function(){
                    return $(this).text();
                }).get(0);
                addQuestionToPaper(qId, isRandom);
                scoreOnChange();
                checkAll2 = checkAll2 + 1;
            });

            if(checkAll2 > 0){
                $("#removeRowQuestionSelect").show();
            }

            $('<span class="label label-success" style="font-size: 13px;">เพิ่มข้อสอบลงชุดข้อสอบเรียบร้อบแล้ว</span>')
                .insertAfter(elem)
                .delay(1500)
                .fadeOut(function() {
                    $(this).remove();
                });

            $(".label-difficulty-level").show();
            $("#esy, #nrm, #hrd").show();
            viewQuestions();
            $('#checkQuestionAll').attr('checked', false);
        }
        else{
            $('#checkQuestionAll').checked = false;
            $('<span class="label label-danger" style="font-size: 13px;">คุณยังไม่ได้เลือกข้อสอบ</span>')
                .insertAfter(elem)
                .delay(1000)
                .fadeOut(function() {
                    $(this).remove();
                });
        }
    });

    $('#newPaperId').bind('keyup change', function(){
        $('#paper-code').text($('#newPaperId').val());
    });
    $('#newPaperName').bind('keyup change', function(){
        $('#paper-name').text($('#newPaperName').val());
    });

    $('#check-only-easy').unbind('click').click(function(){
        if($('#check-only-easy').is(':checked')){
            $('#randEasy').val('');
            $('#randEasy').attr('disabled', 'disabled');
        }
        else{
            $('#randEasy').removeAttr('disabled');
        }
    });

    $('#check-only-normal').unbind('click').click(function(){
        if($('#check-only-normal').is(':checked')){
            $('#randNormal').val('');
            $('#randNormal').attr('disabled', 'disabled');
        }
        else{
            $('#randNormal').removeAttr('disabled');
        }
    });

    $('#check-only-hard').unbind('click').click(function(){
        if($('#check-only-hard').is(':checked')){
            $('#randHard').val('');
            $('#randHard').attr('disabled', 'disabled');
        }
        else{
            $('#randHard').removeAttr('disabled');
        }
    });
});

function viewQuestions(){
    allQuestionIdOnTableCreatePaper = [];
    $(".selectedQuestion").each(function(){
        allQuestionIdOnTableCreatePaper.push($(this).parent().attr("qid"));
    });

    if(allQuestionIdOnTableCreatePaper == [] || allQuestionIdOnTableCreatePaper.length == 0){
        $("#checkQuestionAll").attr('checked', false);
        var dataResponse = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getAllQuestionDetail",
            async: false,
            success: function(dataResponse){
                dataFound();
                records = dataResponse;
                if(records.length <= 10){
                    checkAll = result.length;
                    notShowPagingSelectQuestions();
                }
                else{
                    showPagingSelectQuestions(records);
                }
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
    else{
        $("#tbSelectQuestion").show();
        $("#questionsAreEmpty").hide();
        $("#addQuestionBtn").removeAttr('disabled');

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
                    dataNotFound();
                }
                else{
                    dataFound();
                    records = data;
                    if(records.length <= 10){
                        checkAll = data.length;
                        notShowPagingSelectQuestions(records);
                    }
                    else{
                        showPagingSelectQuestions(records);
                    }
                }
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
}

function addQuestionToPaper(qId, isRandom){
    questionIdString = [];
    questionIdString.push(qId);
    var newScore = $('#labelScore'+qId).text();
    var str = "";

    if(isRandom){
        str = '<input id="newScore'+qId+'" type="number" name="newScore" class="form-control input-sm" value="1" readonly/>';
    }
    else{
        str = '<input id="newScore'+qId+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+newScore+'"/>';

    }

    $('.checkAllQuestionFromCreatePaperPage').checked = false;
    $("#tbSelectedQuestionToPaper").show();
    $('#sum-score').show();
    $("#tbodySelectedQuestionToPaper").append(
        '<tr>'+
        '<td level="'+$('#labelDiffLevel'+qId).text()+'" qid="'+qId+'" style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
        '<td>'+$("#labelCategoryName"+qId).text()+'</td>'+
        '<td>'+$("#labelSubCategoryName"+qId).text()+'</td>'+
        '<td>'+checkString($("#labelQuestionDesc"+qId).text())+'</td>'+
        '<td style="text-align: center;">'+$("#labelQuestionTypeDesc"+qId).text()+'</td>'+
        '<td style="text-align: center;">'+$("#labelDiffDesc"+qId).text()+'</td>'+
        '<td>'+str+'</td>'+
        '</tr>'
    );

    var esy = Number($("#esy").text());
    var nrm = Number($("#nrm").text());
    var hrd = Number($("#hrd").text());

    if($("#labelDiffDesc"+qId).text() === 'ง่าย'){
        esy = esy + 1;
    }

    if($("#labelDiffDesc"+qId).text() === 'ปานกลาง'){
        nrm = nrm + 1;
    }

    if($("#labelDiffDesc"+qId).text() === 'ยาก'){
        hrd = hrd + 1;
    }

    $("#esy").text(esy);
    $("#nrm").text(nrm);
    $("#hrd").text(hrd);

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
        alert('คะแนนรวมข้อสอบมากกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
    if($("#score").val() < $("#maxScore").val()){
        alert('คะแนนรวมข้อสอบน้อยกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
}

function validateScoreRandom(){
    var countEasy = Number($('#questionEasyCount').val());
    if(countEasy == ""? countEasy = 0: countEasy = countEasy);
    var countNormal = Number($('#questionNormalCount').val());
    if(countNormal == ""? countNormal = 0: countNormal = countNormal);
    var countHard = Number($('#questionHardCount').val());
    if(countHard == ""? countHard = 0: countHard = countHard);

    if((countEasy + countNormal + countHard) != Number($("#maxScore").val())){
        alert('คะแนนรวมข้อสอบไม่เพียงพอ');
        //alert('คะแนนรวมข้อสอบไม่เพียงพอ' + (countEasy + countNormal + countHard) + ' vs ' + Number($("#maxScore").val()));
        $("#questionEasyCount").focus();
        $("#questionEasyCount, #questionNormalCount, #questionHardCount").css('border-color', 'red');
        return false;
    }
    //else{
    //    alert((countEasy + countNormal + countHard) + ' vs ' + Number($("#maxScore").val()));
    //}
}

function createPaper(status){

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

    var paperCode = $("#newPaperId").val();
    var paperName = $("#newPaperName").val();
    var paperScore = $("#newPaperScore").val();
    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPosition = $("#newPaperForPosition").val();
    if(paperForPosition == ""? paperForPosition = 0: paperForPosition = $("#newPaperForPosition").val());
    var jsonObjQuestion = {};

    if(status === "static"){
        var tempArrayQuestion = new Array();
        for(var idx = 0; idx < questionsInPaper.length; idx++){
            var item = {
                "qId": questionsInPaper[idx],
                "qScore" : newQuestionScore[idx]
            };
            tempArrayQuestion.push(item);
        }
        jsonObjQuestion = JSON.stringify(tempArrayQuestion);

        if(check == false){
            return false;
        }

        if(createPaperValidation() == false){
            return false;
        }

        if(validateScore() == false){
            return false;
        }

        $.ajax({
            type: "POST",
            url:context+ "/TDCS/exam/createPaper",
            data: {
                paperCode : paperCode,
                paperName : paperName,
                paperScore : paperScore,
                paperTime : paperTime,
                paperForPosition : paperForPosition,
                jsonObjQuestion : jsonObjQuestion,
                questionEasyCount : null,
                questionNormalCount : null,
                questionHardCount : null,
                paperType : 'static'
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
    }

    if(status === "random") {
        var tempArrayQuestion = new Array();
        for(var idx = 0; idx < questionsInPaper.length; idx++){
            var item = {
                "qId": questionsInPaper[idx],
                "qScore" : newQuestionScore[idx]
            };
            tempArrayQuestion.push(item);
        }
        jsonObjQuestion = JSON.stringify(tempArrayQuestion);

        if(check == false){
            return false;
        }

        if(createPaperValidation() == false){
            return false;
        }

        if(validateScoreRandom() == false){
            return false;
        }

        var questionEasyCount = $('#questionEasyCount').val();
        if(questionEasyCount == ""? questionEasyCount = 0: questionEasyCount = questionEasyCount);
        var questionNormalCount = $('#questionNormalCount').val();
        if(questionNormalCount == ""? questionNormalCount = 0: questionNormalCount = questionNormalCount);
        var questionHardCount = $('#questionHardCount').val();
        if(questionHardCount == ""? questionHardCount = 0: questionHardCount = questionHardCount);

        $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/createPaper",
            data: {
                paperCode: paperCode,
                paperName: paperName,
                paperScore: paperScore,
                paperTime: paperTime,
                paperForPosition: paperForPosition,
                jsonObjQuestion: jsonObjQuestion,
                questionEasyCount: questionEasyCount,
                questionNormalCount: questionNormalCount,
                questionHardCount: questionHardCount,
                paperType: 'random'
            },
            success: function (paperId) {
                alert('บันทึกข้อมูลสำเร็จ');
                window.location.href = context + "/TDCS/exam/managePapers";
            },
            error: function () {
                alert('เกิดข้อผิดพลาด');
            }
        });
    }

    newQuestionScore = [];
}

function onLoadPageCreatePaper(){
    $("#copyPaperField").show();
    $("#removeRowQuestionSelect").hide();
    $("#questionNotFound").show();
    $("#tbSelectedQuestionToPaper").hide();
    $(".label-difficulty-level").hide();
    $("#esy, #nrm, #hrd").text(0).hide();
    $('#sum-score').hide();
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
    //$("#score").val(0);
    //$("#maxScore").val(0);
    //$("#hours").defaultValue = "0";
    //$("#tbSelectedQuestionToPaper").show();
    //$('#sum-score').show();
}

function onLoadPagePaperInfo(){
    $("#copyPaperField").hide();
    $("#tbSelectedQuestionToPaper").hide();
    $(".label-difficulty-level").hide();
    $("#esy, #nrm, #hrd").text(0).hide();
    $('#sum-score').hide();
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
    $(".selectedQuestion").each(function(){
        allQuestionIdOnTableCreatePaper.push($(this).parent().attr('qId'));
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
                    //"questionScoreToSearch" : questionScoreToSearch,
                    //"questionScoreFromSearch" : questionScoreFromSearch,
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
                    //"questionScoreToSearch" : questionScoreToSearch,
                    //"questionScoreFromSearch" : questionScoreFromSearch,
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
    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/generalQuestionSearch",
        dataType: "json",
        contentType: 'application/json',
        mimeType: 'application/json',
        data: jsonObj,
        success: function (result) {
            $("#checkQuestionAll").prop('checked', false);

            if(result.length == 0){
                dataNotFound();
            }

            if(result.length > 0){
                records = result;
                if(records.length <= 10){
                    checkAll = result.length;
                    notShowPagingSelectQuestions();
                }
                else{
                    showPagingSelectQuestions(records);
                }
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

function checkString(txt){
    txt = txt.replace("<", "&lt;");
    txt = txt.replace(">", "&gt;");
    txt = txt.replace("/", "&#8725;");

    return txt;
}

function dataNotFound(){
    $('#questionNotFoundDesc').show();
    $('.paging').hide();
    $('#addQuestionBtn').hide();
    $('#init-message-question').hide();
    $("#questionsAreEmpty").show();
    $("#removeRowSelected").attr('disabled', 'disabled');
    $("#addQuestionBtn").attr('disabled', 'disabled');
    $("#tbSelectQuestion").hide();
}

function dataFound(){
    $('#questionNotFoundDesc').hide();
    $('.paging').show();
    $('#addQuestionBtn').show();
    $('#init-message-question').hide();
    $('#questionsAreEmpty').hide();
    $("#addQuestionBtn").show();
    $('#init-message-show').hide();
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

            $("#tbSelectedQuestionToPaper").show();
            $(".label-difficulty-level").show();
            $("#esy, #nrm, #hrd").text(0).show();
            $('#sum-score').show();
            $("#tbodySelectedQuestionToPaper").empty();

            if(Number(value[0].examPaper.paperType.id == 1)){
                $('#select-paper-type').val('static');
                $('#div-random-questions').hide();
                $('#div-save-create-paper').show();
                $('#span-random-questions').hide();

                var esy = Number($("#esy").text());
                var nrm = Number($("#nrm").text());
                var hrd = Number($("#hrd").text());

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

                    $('#questionEasyCount').val(value[0].examPaper.questionEasy);
                    $('#questionNormalCount').val(value[0].examPaper.questionNormal);
                    $('#questionHardCount').val(value[0].examPaper.questionHard);

                    $("#tbodySelectedQuestionToPaper").append(
                        '<tr>'+
                        '<td qid="'+value[i].question.id+'" style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                        '<td>'+value[i].question.subCategory.category.name+'</td>'+
                        '<td>'+value[i].question.subCategory.name+'</td>'+
                        '<td>'+checkString(value[i].question.description)+'</td>'+
                        '<td style="text-align: center;">'+value[i].question.questionType.description+'</td>'+
                        '<td style="text-align: center;">'+value[i].question.difficultyLevel.description+'</td>'+
                        '<td><input id="newScore'+value[i].question.id+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value[i].score+'"/></td>'+
                        '</tr>'
                    );

                    questionsInPaper.push(value[i].question.id);
                    newQuestionScore.push(value[i].score);
                    sumScore(value[i].score);
                    $("#score").val(sumPaperScore);

                    if(value[i].question.difficultyLevel.level == 1){
                        esy = esy + 1;
                    }

                    if(value[i].question.difficultyLevel.level == 2){
                        nrm = nrm + 1;
                    }

                    if(value[i].question.difficultyLevel.level == 3){
                        hrd = hrd + 1;
                    }
                }
                $("#esy").text(esy);
                $("#nrm").text(nrm);
                $("#hrd").text(hrd);
            }

            if(Number(value[0].examPaper.paperType.id == 2)) {

                $('#select-paper-type').val('random');
                $('#div-random-questions').show();
                $('#div-save-create-paper').hide();
                $('#span-random-questions').show();

                var esy = Number($("#esy").text());
                var nrm = Number($("#nrm").text());
                var hrd = Number($("#hrd").text());

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

                    $('#questionEasyCount').val(value[0].examPaper.questionEasy);
                    $('#questionNormalCount').val(value[0].examPaper.questionNormal);
                    $('#questionHardCount').val(value[0].examPaper.questionHard);

                    $("#tbodySelectedQuestionToPaper").append(
                        '<tr>'+
                        '<td level="'+value[i].question.difficultyLevel.level+'" qid="'+value[i].question.id+'" style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                        '<td>'+value[i].question.subCategory.category.name+'</td>'+
                        '<td>'+value[i].question.subCategory.name+'</td>'+
                        '<td>'+checkString(value[i].question.description)+'</td>'+
                        '<td style="text-align: center;">'+value[i].question.questionType.description+'</td>'+
                        '<td style="text-align: center;">'+value[i].question.difficultyLevel.description+'</td>'+
                        '<td><input id="newScore'+value[i].question.id+'" onchange="scoreOnChange()" type="number" name="newScore" class="form-control input-sm" value="1" readonly/></td>'+
                        '</tr>'
                    );

                    questionsInPaper.push(value[i].question.id);
                    newQuestionScore.push(value[i].score);
                    sumScore(value[i].score);
                    $("#score").val(sumPaperScore);

                    if(value[i].question.difficultyLevel.level == 1){
                        esy = esy + 1;
                    }

                    if(value[i].question.difficultyLevel.level == 2){
                        nrm = nrm + 1;
                    }

                    if(value[i].question.difficultyLevel.level == 3){
                        hrd = hrd + 1;
                    }
                }
                $("#esy").text(esy);
                $("#nrm").text(nrm);
                $("#hrd").text(hrd);
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
    $('#removeRowQuestionSelect').show();
    $('#questionNotFoundDesc').hide();
}

function resetRandomQuestion(){
    $("#randEasy").val('');
    $("#randNormal").val('');
    $("#randHard").val('');
    $("#selectCategoryToSelectionForRandom").empty();
    $("#selectSubCategoryToSelectionForRandom").empty();
    $("#selectCategoryToSelectionForRandom").val('');
    $("#selectSubCategoryToSelectionForRandom").val('');
    $('#check-only-easy').checked = false;
    $('#check-only-normal').checked = false;
    $('#check-only-hard').checked = false;

    clearCategoryList();
    updateCategoryList();
    init();
}

function countQuestionReady(){

    subcategoryId = $("#selectSubCategoryToSelectionForRandom").val();
    categoryId = $("#selectCategoryToSelectionForRandom").val();

    var tmp = new Array();
    var idx;
    var qIds = {};
    var subCatIds = {};

    questionsInPaper = [];
    $(".selectedQuestion").each(function(){
        questionsInPaper.push($(this).parent().attr('qid'));
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

            if(sp[1] == 0){
                $('#easy-remaining').removeClass('label-success').addClass('label-danger').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[1] + ' ข้อ');
                $('#randEasy').attr('disabled', 'disabled');
                $('#check-only-easy').attr('disabled', 'disabled');
            }
            else{
                $('#easy-remaining').removeClass('label-danger').addClass('label-success').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[1] + ' ข้อ');
                $('#randEasy').attr('max', sp[1]);
                $('#randEasy').removeAttr('disabled', 'disabled');
                $('#check-only-easy').removeAttr('disabled', 'disabled');
            }

            if(sp[2] == 0){
                $('#normal-remaining').removeClass('label-success').addClass('label-danger').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[2] + ' ข้อ');
                $('#randNormal').attr('disabled', 'disabled');
                $('#check-only-normal').attr('disabled', 'disabled');

            }
            else{
                $('#normal-remaining').removeClass('label-danger').addClass('label-success').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[2] + ' ข้อ');
                $('#randNormal').attr('max', sp[2]);
                $('#randNormal').removeAttr('disabled', 'disabled');
                $('#check-only-normal').removeAttr('disabled', 'disabled');
            }

            if(sp[3] == 0){
                $('#hard-remaining').removeClass('label-success').addClass('label-danger').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[3] + ' ข้อ');
                $('#randHard').attr('disabled', 'disabled');
                $('#check-only-hard').attr('disabled', 'disabled');
            }
            else{
                $('#hard-remaining').removeClass('label-danger').addClass('label-success').text('จำนวนข้อที่สามารถสุ่มได้ ' + sp[3] + ' ข้อ');
                $('#randHard').attr('max', sp[3]);
                $('#randHard').removeAttr('disabled', 'disabled');
                $('#check-only-hard').removeAttr('disabled', 'disabled');
            }

            if((sp[1] == 0) && (sp[2] == 0) && (sp[3] == 0)){
                $('#randBtn').attr('disabled', 'disabled');
            }
            else{
                $('#randBtn').removeAttr('disabled');
            }

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

function updatePaper(status){

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

    var paperCode = $("#newPaperId").val();
    var paperName = $("#newPaperName").val();
    var paperScore = $("#newPaperScore").val();
    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPosition = $("#newPaperForPosition").val();
    if(paperForPosition == ""? paperForPosition = 0: paperForPosition = $("#newPaperForPosition").val());
    var jsonObjQuestion = {};

    var value = getValueFromUrl();
    var id = value.substring(0, value.indexOf("#"));
    pId = Number(id);

    if(status === "static"){
        var tempArrayQuestion = new Array();
        for(var idx = 0; idx < questionsInPaper.length; idx++){
            var item = {
                "qId": questionsInPaper[idx],
                "qScore" : newQuestionScore[idx]
            };
            tempArrayQuestion.push(item);
        }
        jsonObjQuestion = JSON.stringify(tempArrayQuestion);

        if(check == false){
            return false;
        }

        if(createPaperValidation() == false){
            return false;
        }

        if(validateScore() == false){
            return false;
        }

        $.ajax({
            type: "POST",
            url:context+ "/TDCS/exam/updatePaper",
            data: {
                paperCodeUpdate : paperCode,
                paperNameUpdate : paperName,
                paperScoreUpdate : paperScore,
                paperTimeUpdate : paperTime,
                paperForPositionUpdate : paperForPosition,
                jsonObjQuestionUpdate : jsonObjQuestion,
                questionEasyCount : null,
                questionNormalCount : null,
                questionHardCount : null,
                paperIdUpdate: pId,
                paperType : 'static'
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
    }

    if(status === "random") {
        var tempArrayQuestion = new Array();
        for(var idx = 0; idx < questionsInPaper.length; idx++){
            var item = {
                "qId": questionsInPaper[idx],
                "qScore" : newQuestionScore[idx]
            };
            tempArrayQuestion.push(item);
        }
        jsonObjQuestion = JSON.stringify(tempArrayQuestion);

        if(check == false){
            return false;
        }

        if(createPaperValidation() == false){
            return false;
        }

        if(validateScoreRandom() == false){
            return false;
        }

        var questionEasyCount = $('#questionEasyCount').val();
        if(questionEasyCount == ""? questionEasyCount = 0: questionEasyCount = questionEasyCount);
        var questionNormalCount = $('#questionNormalCount').val();
        if(questionNormalCount == ""? questionNormalCount = 0: questionNormalCount = questionNormalCount);
        var questionHardCount = $('#questionHardCount').val();
        if(questionHardCount == ""? questionHardCount = 0: questionHardCount = questionHardCount);

        $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/updatePaper",
            data: {
                paperCodeUpdate : paperCode,
                paperNameUpdate : paperName,
                paperScoreUpdate : paperScore,
                paperTimeUpdate : paperTime,
                paperForPositionUpdate : paperForPosition,
                jsonObjQuestionUpdate : jsonObjQuestion,
                questionEasyCount: questionEasyCount,
                questionNormalCount: questionNormalCount,
                questionHardCount: questionHardCount,
                paperIdUpdate: pId,
                paperType: 'random'
            },
            success: function (paperId) {
                alert('บันทึกข้อมูลสำเร็จ');
                window.location.href = context + "/TDCS/exam/managePapers";
            },
            error: function () {
                alert('เกิดข้อผิดพลาด');
            }
        });
    }

    newQuestionScore = [];
}

function randomQuestion(){

    var checkEasy = "";
    var checkNormal = "";
    var checkHard = "";

    if(categoryId.indexOf(':')!=-1){
        categoryId = categoryId.substring(0, categoryId.indexOf(':') - 1);
    }
    else{
        categoryId = categoryId;
    }
    if(subcategoryId == null? subcategoryId = "": subcategoryId = subcategoryId);

    questionsInPaper = [];
    $(".selectedQuestion").each(function(){
        questionsInPaper.push($(this).parent().attr('qid'));
    });

    if($('#check-only-easy').is(':checked')? checkEasy = 1: checkEasy = 0);
    if($('#check-only-normal').is(':checked')? checkNormal = 1: checkNormal = 0);
    if($('#check-only-hard').is(':checked')? checkHard = 1: checkHard = 0);


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
            "subCategoryId": subcategoryId,
            "checkEasy": checkEasy,
            "checkNormal": checkNormal,
            "checkHard": checkHard
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
            $(".checkAllQuestionFromCreatePaperPage").checked = false;
            $("#tbSelectedQuestionToPaper").show();
            $(".label-difficulty-level").show();
            $("#esy, #nrm, #hrd").text(0).show();
            $("#removeRowQuestionSelect").show();
            $("#questionNotFoundDesc").hide();
            $('#sum-score').show();

            data.forEach(function (value) {
                $("#tbodySelectedQuestionToPaper").append(
                    '<tr>'+
                    '<td qid="'+value.id+'" style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                    '<td>'+value.subCategory.category.name+'</td>'+
                    '<td>'+value.subCategory.name+'</td>'+
                    '<td>'+checkString(value.description)+'</td>'+
                    '<td style="text-align: center;">'+value.questionType.description+'</td>'+
                    '<td style="text-align: center;">'+value.difficultyLevel.description+'</td>'+
                    '<td><input id="newScore'+value.id+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value.score+'"/></td>'+
                    '</tr>'
                );
            });

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

            alert('เพิ่มข้อสอบเรียบร้อยแล้ว');
            resetRandomQuestion();
            countQuestionReady();
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

