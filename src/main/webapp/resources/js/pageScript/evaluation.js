/**
 * Created by l3eal2 on 17/3/2558.
 */

var subTopicId = [];
var sumScoreS = 0;
var checkHaveScoreS = true;
var checkInputScore = [];
var maxInputScore = [];
var minInputScore = [];
var countAdd = 0;
var userId = "" // EDIT BY PEEM
$(document).ready(function () {
    $("#evaluation").attr('class', 'active');
    if (status == 'user') {
        checkEvaluation();
        setDataEvaluationForm();
        $("#subEvaluation").click(function () {
            for (var i = 0; i < subTopicId.length; i++) {
                if ($("#scoreSubId" + subTopicId[i]).val() == "") {
                    alert('คุณกรอกข้อมูลไม่ครบ');
                    $("#scoreSubId" + subTopicId[i]).focus()
                    return false;
                }
            }

            for (var i = 0; i < checkInputScore.length; i++) {
                if (!checkInputScore[i]) {
                    alert('คุณกรอกข้อมูลไม่ถูกต้อง');
                    $("#scoreSubId" + subTopicId[i]).focus()
                    return false;
                }
            }

            if (confirm('====== ยืนยันการประเมินผล ? ======\n !!! หากประเมินแล้วจะไม่สามารถแก้ไขได้ !!!')) {
                $(".dv-background").show();
                for (var i = 0; i < subTopicId.length; i++) {
                    saveEvaluate(subTopicId[i], $("#scoreSubId" + subTopicId[i]).val(), $("#textareaSubId" + subTopicId[i]).val(), 's', "");
                }
                $(".dv-background").hide();
                alert('บึนทึกข้อมูลสำเร็จ');
                window.location.href = 'viewevaluate';
            }
        });

    } else if (status == "staff") {
        $("#subEvaluation").click(function () {
            for (var i = 0; i < subTopicId.length; i++) {
                if ($("#scoreSubId" + subTopicId[i]).val() == "") {
                    alert('คุณกรอกข้อมูลไม่ครบ');
                    $("#scoreSubId" + subTopicId[i]).focus()
                    return false;
                }
            }

            for (var i = 0; i < checkInputScore.length; i++) {
                if (!checkInputScore[i]) {
                    alert('คุณกรอกข้อมูลไม่ถูกต้อง');
                    $("#scoreSubId" + subTopicId[i]).focus()
                    return false;
                }
            }

            if ($("#selectStudentForEvaluation").val() != "0") {
                if (confirm('====== ยืนยันการประเมินผล ? ======\n !!! หากประเมินแล้วจะไม่สามารถแก้ไขได้ !!!')) {
                    $(".dv-background").show();
                    for (var i = 0; i < subTopicId.length; i++) {
                        saveEvaluate(subTopicId[i], $("#scoreSubId" + subTopicId[i]).val(), $("#textareaSubId" + subTopicId[i]).val(), 'e', $("#selectStudentForEvaluation").val());
                    }
                    $(".dv-background").hide();

                    insertScore();


                    alert('บึนทึกข้อมูลสำเร็จ');
                }
            } else {
                alert("กรุณาเลือกนักศึกษาที่จะประเมิน")
            }
        });

        setDataEvaluationForm();
        var listStudent = $.ajax({
            type: 'POST',
            url:context+ '/TDCS/getStudentForSelect',
            data:{
                page : "eva"
            },
            async: false
        }).responseText;

        if (listStudent != "") {
            var listStudents = JSON.parse(listStudent)
            for (var i = 0; i < listStudents.length; i++) {
                $("#selectStudentForEvaluation").append('<option value="' + listStudents[i].userId + '">' + listStudents[i].thFname + ' ' + listStudents[i].thLname + '</option>')
            }
        }
    }

    //EDIT BY PEEM
    $("#selectStudentForEvaluation").change(function () {

        if (status == 'user') {
            userId = "";
        } else {
            userId = $("#selectStudentForEvaluation").val();
        }
        $(".dv-background").show();
        setDataEvaluationForm();
        $(".dv-background").hide();
    });
    //EDIT BY PEEM

    $("#disEvaluation").click(function () {
        for (var i = 0; i < subTopicId.length; i++) {
            $("#scoreSubId" + subTopicId[i]).val("");
            $("#textareaSubId" + subTopicId[i]).val("");
        }
    });
});

function insertScore() {
    var evaGrade;
    var dataScore = $.ajax({
        type: "POST",
        url: context+'/TDCS/sumScore',
        data: {
            userId: $("#selectStudentForEvaluation").val()
        },
        success: function (xhr) {
            if (xhr >= 80)
                evaGrade = "A";
            else if (xhr >= 70)
                evaGrade = "B";
            else if (xhr >= 60)
                evaGrade = "C";
            else if (xhr >= 50)
                evaGrade = "D";
            else
                evaGrade = "F";

            var setEvaGrade = $.ajax({
                type: "POST",
                url: context+'/TDCS/setEvaGrade',
                data: {
                    userId: $("#selectStudentForEvaluation").val(),
                    evaGrade: evaGrade
                },
                complete: function () {
                    location.reload();
                },
                async: false
            }).responseText;
        },
        async: false
    }).responseText;
}

function checkEvaluation() {
    var dataCheck = $.ajax({
        type: 'POST',
        url:context+'/TDCS/checkEvaluation',
        async: false
    }).responseText;
    if (dataCheck == "change")
        window.location.href = 'viewevaluate.html';
}

function saveEvaluate(subId, score, note, type, userId) {
    var saveDate = 'subId=' + subId +
        '&score=' + score +
        '&note=' + note +
        '&type=' + type +
        '&userId=' +     userId;

    var subId = [];
    var data = $.ajax({
        type: "POST",
        url: context+'/TDCS/addEvaluate',
        data: saveDate,
        success: function () {

        },async: false

    }).responseText;
//    countAdd++;
}

function setDataEvaluationForm() {
    var data = $.ajax({
        type: 'POST',
        url: context+'/TDCS/evaluationDescription',
        async: false
    }).responseText;
    var dataDescription = JSON.parse(data);

    var data1 = $.ajax({
        type: 'POST',
        url: context+'/TDCS/evaluationTopic',
        async: false
    }).responseText;
    var dataTopic = JSON.parse(data1);

    var data2 = $.ajax({
        type: 'POST',
        url: context+'/TDCS/evaluationSubtopic',
        async: false
    }).responseText;
    var dataSubtopic = JSON.parse(data2);

    // set subtopic id //
    $(dataSubtopic).each(function (index, valueSubtopic) {
        subTopicId[index] = valueSubtopic.subtopicId;
    });

    var strBodyHeadLeft = ""; // column 1,2
    var strBodyHeadRight = "";// column 7,8
    var strScoreStudent = "";// EDIT BY PEEM column 9,10
    var strBodyDetail; // column 3,4,5,6
    var strSummaryRow = "";

    $('#result').empty();
    var indexSubtopic = 0;
    $(dataTopic).each(function (indexTopic, valueTopic) {
        var countSubtopic = dataSubtopic.filter(function (e) {
            return e.topicId === valueTopic.topicId;
        }).length
        var setTopic = 0;
        strSummaryRow = "";
        strBodyHeadLeft = "";
        var trOpen = "<tr>";
        var trClose = "</tr>";
        strBodyHeadLeft = "<td rowspan='" + countSubtopic * 5 + "' class='text-center'>" + valueTopic.topicData + "</td>";
        $(dataSubtopic).each(function (indexSubtopic, valueSubtopic) {
            var firstCount = 0;
            if (valueTopic.topicId == valueSubtopic.topicId) {
                if (setTopic == 0) {
                    strBodyHeadLeft += "<td rowspan='5' class='text-center'>" + valueSubtopic.subtopicData + "</td>";
                    setTopic++;
                } else {
                    strBodyHeadLeft = "<td rowspan='5' class='text-center'>" + valueSubtopic.subtopicData + "</td>";
                }
                strSummaryRow += trOpen.concat(strBodyHeadLeft);
                strBodyDetail = "";

                // EDIT BY PEEM
                var dataStudentScore = $.ajax({
                    type: 'POST',
                    data: {
                        userId: userId,
                        subId: valueSubtopic.subtopicId,
                        type: "s"
                    },
                    url:context+ '/TDCS/getResultEvaluation',
                    async: false
                }).responseText;

                var scoreS, noteS;
                if (dataStudentScore != "") {
                    var dataStudentScores = JSON.parse(dataStudentScore)
                    scoreS = dataStudentScores[0].score;
                    if (dataStudentScores[0].note != null) {
                        noteS = dataStudentScores[0].note;
                    } else {
                        noteS = "-"
                    }
                    sumScoreS += scoreS;
                    checkHaveScoreS = true;
                }
                else {
                    scoreS = "";
                    noteS = ""
                }

                console.log(scoreS);

                // EDITBY PEEM


                strBodyHeadRight = "<td rowspan='5' class='text-center'>" +
                    "<div id='divScore" + valueSubtopic.subtopicId + "' class='col-md-8 col-md-offset-2' style='padding: 0px;'>" +
                    "<input onkeypress='return isNumberEvaluate(event)' onchange='checkNumber(" + valueSubtopic.subtopicId + "," + indexSubtopic + ")' title='คะแนน' id='scoreSubId" + valueSubtopic.subtopicId + "' type='text' maxlength='5' class='form-control text-center' />" +
                    "<span id='spanScore" + valueSubtopic.subtopicId + "' aria-hidden='true'></span>" +
                    "</div>" +
                    "</td>" +
                    "<td rowspan='5' class='text-center'><textarea title='หมายเหตุ' id='textareaSubId" + valueSubtopic.subtopicId + "' class='form-control'></textarea></td>";

                if (status == "staff"){
                    strScoreStudent = "<td rowspan='5' class='text-center'>"+scoreS+"</td>" +
                        "<td rowspan='5' class='text-center'>"+noteS+"</td>";
                }
                $(dataDescription).each(function (indexDescription, valueDescription) {
                    if (valueDescription.subtopicId == valueSubtopic.subtopicId) {
                        var min, max, desc;
                        if (valueDescription.min == null)
                            min = "-";
                        else
                            min = valueDescription.min;

                        if (valueDescription.max == null)
                            max = "-";
                        else
                            max = valueDescription.max;

                        if (valueDescription.descriptionData == null)
                            desc = "-";
                        else
                            desc = valueDescription.descriptionData;
                        strBodyDetail = "<td class='text-center'>" + min + "</td>" +
                            "<td class='text-center'>" + max + "</td>" +
                            "<td class='text-center'>" + valueDescription.grade + "</td>" +
                            "<td class='text-center'>" + desc + "</td>";
                        if (firstCount == 0) {
                            maxInputScore[indexSubtopic] = valueDescription.max;
                            strSummaryRow = strSummaryRow.concat(strBodyDetail).concat(strBodyHeadRight).concat(strScoreStudent).concat(trClose);
                            firstCount++;
                        } else {
                            strSummaryRow += trOpen.concat(strBodyDetail).concat(trClose);
                        }
                        if (valueDescription.min != null) {
                            minInputScore[indexSubtopic] = valueDescription.min;
                        }

                    }
                });
                indexSubtopic++;
            }
        });
        $('#result').append(strSummaryRow);
    });

}

function checkNumber(subId, index) {
    var checkDot = 0;
    var checkDotAtLast = false;
    var classDivError = 'has-error has-feedback col-md-8 col-md-offset-2 text-center';
    var classDivOk = 'has-success has-feedback col-md-8 col-md-offset-2 text-center';
    var classSpanError = 'glyphicon glyphicon-remove form-control-feedback';
    var classSpanOk = 'glyphicon glyphicon-ok form-control-feedback';
    for (var i = 0; i < $("#scoreSubId" + subId).val().length; i++) {
        if ($("#scoreSubId" + subId).val().charAt(i) == ".") {
            checkDot++;
        }
        if ($("#scoreSubId" + subId).val().charAt(i) == "." && i == $("#scoreSubId" + subId).val().length - 1) {
            checkDotAtLast = true;
        }
    }
    if (!checkDotAtLast) {
        if ($("#scoreSubId" + subId).val() != "") {
            if (checkDot > 1) {
                $("#divScore" + subId).attr('class', classDivError);
                $("#spanScore" + subId).attr('class', classSpanError);
                checkInputScore[index] = false;
            } else {
                var score = parseFloat($("#scoreSubId" + subId).val());
                if (score <= maxInputScore[index] && score >= minInputScore[index]) {
                    $("#divScore" + subId).attr('class', classDivOk);
                    $("#spanScore" + subId).attr('class', classSpanOk);
                    checkInputScore[index] = true;
                } else {
                    $("#divScore" + subId).attr('class', classDivError);
                    $("#spanScore" + subId).attr('class', classSpanError);
                    checkInputScore[index] = false;
                }
            }
        } else {
            $("#divScore" + subId).attr('class', classDivError);
            $("#spanScore" + subId).attr('class', classSpanError);
            checkInputScore[index] = false;
        }
    } else {
        $("#divScore" + subId).attr('class', classDivError);
        $("#spanScore" + subId).attr('class', classSpanError);
        checkInputScore[index] = false;
    }
    checkDot = 0;
}
