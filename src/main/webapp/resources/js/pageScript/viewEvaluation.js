/**
 * Created by l3eal2 on 29/04/2015.
 */
var subTopicId = [];
var maxInputScore = [];
var minInputScore = [];
var sumScoreS = 0;
var sumScoreE = 0;
var checkHaveScoreS = true;
var checkHaveScoreE = true;
var userId = ""
$(document).ready(function () {
    if (status == 'staff') {
        var listStudent = $.ajax({
            type: 'POST',
            url:context+ '/TDCS/getStudentForSelect',
            data: {
                page: "view"
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

    $(".dv-background").show();
    setDataEvaluationForm();
    $(".dv-background").hide();

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

});


function setDataEvaluationForm() {
    sumScoreS = 0;
    sumScoreE = 0;
    $('#resultScore').empty();
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

                var dataStudentScore = $.ajax({
                    type: 'POST',
                    data: {
                        userId: userId,
                        subId: valueSubtopic.subtopicId,
                        type: "s"
                    },
                    url: context+'/TDCS/getResultEvaluation',
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

                var dataStaffScore = $.ajax({
                    type: 'POST',
                    data: {
                        userId: userId,
                        subId: valueSubtopic.subtopicId,
                        type: "e"
                    },
                    url: context+'/TDCS/getResultEvaluation',
                    async: false
                }).responseText;

                var scoreE, noteE;
                if (dataStaffScore != "") {
                    var dataStaffScores = JSON.parse(dataStaffScore)
                    scoreE = dataStaffScores[0].score;
                    if (dataStaffScores[0].note != null) {
                        noteE = dataStaffScores[0].note;
                    } else {
                        noteE = "-"
                    }
                    sumScoreE += scoreE;
                    checkHaveScoreE = true;
                }
                else {
                    scoreE = "";
                    noteE = ""
                }

                console.log(scoreE);
                console.log(scoreS);
                if (scoreE == "" && scoreS == "") {
                    $("#checkEvaluate").html('(ยังไม่มีการประเมินผล)');
                } else if (scoreE == "") {
                    $("#checkEvaluate").html('(ยังไม่มีการประเมินผลจากพี่เลี้ยง)');
                }

                strBodyHeadRight = "<td rowspan='5' class='text-center'>" + scoreS + "</td>" +
                    "<td rowspan='5' class='text-center'>" + noteS + "</td>" +
                    "<td rowspan='5' class='text-center'>" + scoreE + "</td>" +
                    "<td rowspan='5' class='text-center'>" + noteE + "</td>";
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
                            strSummaryRow = strSummaryRow.concat(strBodyDetail).concat(strBodyHeadRight).concat(trClose);
                            firstCount++;
                        } else {
                            strSummaryRow += trOpen.concat(strBodyDetail).concat(trClose);
                        }
                        if ((indexDescription + 1) % 5 == 0) {
                            minInputScore[indexSubtopic++] = valueDescription.min;
                        }

                    }
                });
            }
        });
        $('#result').append(strSummaryRow);

    });

    var gradeS, gradeE, maxScore = 0;
    for (var i = 0; i < maxInputScore.length; i++) {
        maxScore += maxInputScore[i];
    }
    if (checkHaveScoreS) {
        if (sumScoreS/maxScore >= 0.8)
            gradeS = "A"
        else if (sumScoreS/maxScore >= 0.7)
            gradeS = "B";
        else if (sumScoreS/maxScore >= 0.6)
            gradeS = "C";
        else if (sumScoreS/maxScore >= 0.5)
            gradeS = "D";
        else
            gradeS = "F";
    } else {
        sumScoreS = "";
        gradeS = "";
    }

    if (checkHaveScoreE) {
        if (sumScoreE/maxScore >= 0.8)
            gradeE = "A"
        else if (sumScoreE/maxScore >= 0.7)
            gradeE = "B";
        else if (sumScoreE/maxScore >= 0.6)
            gradeE = "C";
        else if (sumScoreE/maxScore >= 0.5)
            gradeE = "D";
        else
            gradeE = "F";
    } else {
        sumScoreE = "";
        gradeE = "";
    }

    $('#resultScore').append(
            "<tr>" +
            "<td class='text-center' style='vertical-align: middle'>" + sumScoreS + "</td>" +
            "<td class='text-center' style='vertical-align: middle'>" + gradeS + "</td>" +
            "<td class='text-center' style='vertical-align: middle'>" + sumScoreE + "</td>" +
            "<td class='text-center' style='vertical-align: middle'>" + gradeE + "</td>" +
            "</tr>"
    );
}