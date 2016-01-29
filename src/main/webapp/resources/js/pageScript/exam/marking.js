/**
 * Created by Phuthikorn_T on 1/10/2558.
 */

var markingBody = $("#marking-body");
var isCurrent = true;

$(document).ready(function () {
    $(".choiceDescRadio").prop('disabled', true)
    //$(".choiceCorrectness:not(.hidden)").parent().parent().find('.choiceDescRadio:checked').closest('.containerObjective').find('.scoreInputObjective')
    $.each($(".choiceCorrectness:not(.hidden)").parent().parent().find('.choiceDescRadio:checked').closest('.containerObjective').find('.scoreInputObjective'), function () {
        $(this).val(parseFloat($(this).attr('maxScore')))
    })
    $('.scoreInput').focusout()
})

var showObjective = false
$("#showObjective").on('click', function () {
    if (showObjective == false) {
        $(".containerObjective").removeClass("hidden")
        $(this).text('เลิกแสดงข้อปรนัย')
        showObjective = true

    } else {
        $(".containerObjective").addClass("hidden")
        $(this).text('แสดงข้อปรนัย')
        showObjective = false
    }
})


$('#marking-body').on('focusout', '.scoreInput', function () {
    var maxScore = parseFloat($(this).parent().parent().parent().find(".maxScore").text());
    if (!isNaN(($(this).val()))) {
        if ($(this).val() > maxScore) {
            alert('คะแนนที่ให้มากกว่าคะแนนเต็ม');
            $(this).val('');
            document.getSelection().removeAllRanges();
            jumpToElement($(this), 250)
        } else if ($(this).val() < 0) {
            alert('ให้คะแนนติดลบ')
            jumpToElement($(this), 250)
        }
        updateSumScore()
    } else {
        alert('กรุณากรอกคะแนนเป็นตัวเลข');
        $(this).val('');
        document.getSelection().removeAllRanges();
        jumpToElement($(this), 250)
    }
})

$('#confirmSubmitMarkingCONFIRM').on('click', function () {

    checkCurrentVersion()
    if(isCurrent){
        var confirmation = confirm('หากยืนยันผลตรวจนักศึกษาจะสามารถดูผลตรวจได้ และจะไม่สามารถแก้ไขผลตรวจได้อีก ต้องการยืนยันผลตรวจหรือไม่')
        if (confirmation) {
            submitMarking(true)
        }
    }else{
        var confirmation = confirm('\t\t\t\t\t มีการส่งผลตรวจเข้ามาในระบบในขณะคุณกำลังตรวจอยู่  \n\nหากยืนยันผลตรวจนักศึกษาจะสามารถดูผลตรวจได้ และจะไม่สามารถแก้ไขผลตรวจได้อีก ต้องการยืนยันผลตรวจหรือไม่')
        if (confirmation) {
            submitMarking(true)
        }
    }
})

$('#confirmSubmitMarking').on('click', function () {

    checkCurrentVersion()
    if(isCurrent){
        var confirmation = confirm('ทำการบันทึกผลตรวจลงในฐานข้อมูล แต่นักศึกษาจะยังไม่สามารถเห็นผลตรวจได้')
        if (confirmation) {
            submitMarking(false);
        }
    }else{
        var confirmation = confirm('\t\t มีการส่งผลตรวจเข้ามาในระบบในขณะคุณกำลังตรวจอยู่ \n\nทำการบันทึกผลตรวจลงในฐานข้อมูล แต่นักศึกษาจะยังไม่สามารถเห็นผลตรวจได้')
        if (confirmation) {
            submitMarking(false);
        }
    }

})

$(".backBtn").on('click', function () {
    var confirmation = confirm('ต้องการกลับไปหน้าก่อนหน้านี้หรือไม่\n หากคุณย้อนกลับข้อมูลจะไม่ถูกบันทึก')
    if (confirmation) {
        location.href = context + "/TDCS/exam/examRecordSearch"
    }
})

//var goToUnfinishBtn = $('#goToUnfinish');
//var goToUnfinishBtnInitialText = goToUnfinishBtn.text();
//$(".submitMarkingBtn").on('click', function () {
//    confirmationModalUpdate()
//})

//goToUnfinishBtn.on('click', function () {
//    jumpToElement($('.containerSubjective[questionNo="' + $(this).val() + '"'), 100)
//})

$('#toTop').on('click', function () {
    $("html, body").animate({scrollTop: 0}, "fast");
})

$('#toBottom').on('click', function () {
    $("html, body").animate({scrollTop: $(document).height()}, "fast");
})


//-------------------------------------------------
function markingRecord(answerRecordId, score) {
    this.answerRecord = answerRecordId;
    this.score = score;
}

var checkCurrentVersion = function(){
    console.log(markingBody.attr('resultId'))
    console.log(markingBody.attr('resultVersion'))
    $.ajax({
        type:"POST",
        url: context+"/TDCS/exam/marking/checkCurrentVersion",
        async:false,
        data:{
            resultVersion:markingBody.attr('resultVersion'),
            resultId:markingBody.attr('resultId')
        },
        success:function(data){
            isCurrent = data;
        },error:function(){
            alert('error in checking version')
        }
    })
}

var submitMarking = function (confirmation) {
    var questions = $('#marking-body .containerSubjective');
    var markingArray = [];

    $.each(questions, function (index, value) {
        var answerRecordId = $(this).attr('answerRecordId')
        var score = parseFloat($(this).find('.scoreInput').val())

        if (!isNaN(score)) {
            markingArray.push(new markingRecord(answerRecordId, score))
        } else {
            markingArray.push(new markingRecord(answerRecordId, 0))
        }
    })

    $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/marking/submit",
        data: {
            markingRecord: JSON.stringify(markingArray),
            resultId: $('#marking-body').attr('resultId'),
            comment: $('#comment').val(),
            confirmation: confirmation
        },
        success: function () {
            alert('บันทึกข้อมูลสำเร็จ')
            location.href = context + "/TDCS/exam/examRecordSearch"
        },
        error: function (xhr) {
            if (xhr.status = 418) {
                alert('บันทึกข้อมูลล้มเหลว : ข้อสอบอยู่ในสถานะ ' + xhr.description)
            } else {
                alert('บันทึกข้อมูลล้มเหลว')
            }
        }
    })
}

//var confirmationModalUpdate = function () {
//    unmarkedQuestionArray = checkMarkingCompletion();
//    var confirmMessage = '';
//    var confirmMessageElement = $('#submitMarkingModalMessage');
//
//    if (unmarkedQuestionArray != null) {
//        confirmMessage = 'มีข้อสอบที่ยังไม่ได้ให้คะแนน ได้แก่ข้อที่<br/>[ ';
//        for (var i = 0; i < unmarkedQuestionArray.length; i++) {
//            if (i == 0) {
//                confirmMessage = confirmMessage + unmarkedQuestionArray[i]
//            } else {
//                confirmMessage = confirmMessage + ", " + unmarkedQuestionArray[i]
//            }
//        }
//        confirmMessage += " ]";
//        goToUnfinishBtn.val(unmarkedQuestionArray[0]);
//        goToUnfinishBtn.text(goToUnfinishBtnInitialText + " " + unmarkedQuestionArray[0])
//        goToUnfinishBtn.show();
//    } else {
//        confirmMessage = 'ยืนยันการส่งผลตรวจ'
//        goToUnfinishBtn.hide()
//    }
//    confirmMessageElement.empty();
//    confirmMessageElement.append(confirmMessage)
////}

//var checkMarkingCompletion = function () {
//    var questions = $('#marking-body .containerSubjective')
//    var unfinishedArray = [];
//
//    $.each(questions, function (index, value) {
//        var questionNo = $(this).attr('questionNo');
//        if (isNaN(parseFloat($(this).find('.scoreInput').val()))) {
//            unfinishedArray.push(questionNo)
//        }
//    })
//    if (unfinishedArray.length == 0) {
//        // unfinishedArray is empty == all Question are answered
//        return null
//    } else {
//        return unfinishedArray
//    }
//}

var objectiveScore = $('#sumScore').attr('objectiveScore')
var updateSumScore = function () {
    var sumScore = parseFloat(objectiveScore);

    $.each($('.scoreInput'), function (index, value) {
        if (!isNaN(parseFloat(value.value))) {
            sumScore = sumScore + parseFloat(value.value);
        }
    })
    $('#sumScore').val(parseFloat(sumScore))
}

var jumpToElement = function (element, offset) {
    $('html, body').animate({
        scrollTop: (element.offset().top - offset)
    });
}