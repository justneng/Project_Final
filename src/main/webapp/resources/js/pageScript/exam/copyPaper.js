$(document).ready(function(){
    clearList();
    getPaperToCopy();

    $("#copyPaperLov").on('change', function(){
        var paperCode = $(this).val();
        if(paperCode.indexOf(':') != -1){
            var str = $(this).val();
            paperCode = str.substring(0, str.indexOf(' '));
        }
        else{
            paperCode = $(this).val();
        }

        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getPaperByCode",
            async: false,
            data:{
                paperCode: paperCode
            },
            success: function(value){
                if(value.length > 0){
                    dataFound();
                    questionsInPaper = [];
                    $("#questionNotFound").hide();
                    $("#removeRowQuestionSelect").show();
                    $("#tbSelectedQuestionToPaper").show();
                    $('#sum-score').show();
                    $("#tbodySelectedQuestionToPaper").empty();
                    for(var i = 0; i < value.length; i ++){
                        $("#tbodySelectedQuestionToPaper").append(
                            '<tr>'+
                            '<td qid="'+value[i].question.id+'"style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                            '<td>'+ value[i].question.subCategory.category.name+'</td>'+
                            '<td>'+ value[i].question.subCategory.name+'</td>'+
                            '<td style="text-align: left;">'+ checkString(value[i].question.description)+'</td>'+
                            '<td style="text-align: left;">'+ value[i].question.questionType.description+'</td>'+
                            '<td style="text-align: center;">'+ value[i].question.difficultyLevel.description+'</td>'+
                            '<td><input id="newScore'+value[i].question.id+'" onkeypress="return isNumber(event)" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value[i].score+'"/></td>'+
                            '</tr>'
                        );

                        questionsInPaper.push(value[i].question.id);
                        newQuestionScore.push(value[i].score);
                        sumScore(value[i].score);
                        $("#score").val(sumPaperScore);
                    }
                    sumPaperScore = 0;
                }
                else{
                    $("#tbodySelectedQuestionToPaper").empty();
                    $("#score").val(0);
                    $("#tbSelectedQuestionToPaper").hide();
                    $('#sum-score').hide();
                    $("#removeRowQuestionSelect").hide();
                    $("#questionNotFound").show();
                }
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    });
});

function clearList(){
    $("#copyPaperLov").empty();
    $("#copyPaperLov").append("<option selected value=''></option>");
}

function getPaperToCopy(){
    var ajaxDat = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllPapers",
        success: function (data) {
            data.forEach(function (index) {
                $('#copyPaperLov').append('<option class="paper" paperCode="' + index.examPaper.code + '"' +
                ' categoryName="' + index.examPaper.name + '" value="' + index.examPaper.id + '">' + index.examPaper.code + ' : ' + index.examPaper.name + '')
            })
        },
        error: function () {
            alert("เกิดข้อผิดพลาด");
        }
    })
}

$("#copyPaperLov").keyup(function(e){
    if (e.which > 0) {
        e.preventDefault();
        listPaperToLov();
    }
});

function listPaperToLov(){

    var available = [];
    var search = $('#copyPaperLov').val();

    $("#copyPaperLov option:not(:first-child)").each(function(){
        available.push($(this).text());
    });

    $('#copyPaperLov').typeahead('destroy').typeahead({
        source: available,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
}