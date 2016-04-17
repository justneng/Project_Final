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
                    $(".label-difficulty-level").show();
                    $("#esy, #nrm, #hrd").text(0).show();
                    $('#sum-score').show();
                    $("#tbodySelectedQuestionToPaper").empty();
                    for(var i = 0; i < value.length; i ++){
                        var str = "";
                        if($('#select-paper-type').val() == 'random'){
                            alert(value.length)
                            $("#score").val(value.length);
                            str = '<input id="newScore'+value[i].question.id+'" type="number" name="newScore" class="form-control input-sm" value="1" readonly/>';
                        }
                        else{
                            sumScore(value[i].score);
                            $("#score").val(sumPaperScore);
                            str = '<input id="newScore'+value[i].question.id+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+value[i].score+'"/>';
                        }

                        $("#tbodySelectedQuestionToPaper").append(
                            '<tr>'+
                            '<td level="'+value[i].question.difficultyLevel.level+'" qid="'+value[i].question.id+'"style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                            '<td>'+ value[i].question.subCategory.category.name+'</td>'+
                            '<td>'+ value[i].question.subCategory.name+'</td>'+
                            '<td style="text-align: left;">'+ checkString(value[i].question.description)+'</td>'+
                            '<td style="text-align: left;">'+ value[i].question.questionType.description+'</td>'+
                            '<td style="text-align: center;">'+ value[i].question.difficultyLevel.description+'</td>'+
                            '<td>'+str+'</td>'+
                            '</tr>'
                        );

                        var esy = Number($("#esy").text());
                        var nrm = Number($("#nrm").text());
                        var hrd = Number($("#hrd").text());

                        if(Number(value[i].question.difficultyLevel.level) == 1){
                            esy = esy + 1;
                        }

                        if(Number(value[i].question.difficultyLevel.level) == 2){
                            nrm = nrm + 1;
                        }

                        if(Number(value[i].question.difficultyLevel.level) == 3){
                            hrd = hrd + 1;
                        }

                        $("#esy").text(esy);
                        $("#nrm").text(nrm);
                        $("#hrd").text(hrd);
                        $('#maxScore').val($('#newPaperScore').val());

                        questionsInPaper.push(value[i].question.id);
                        newQuestionScore.push(value[i].score);
                    }
                    sumPaperScore = 0;

                }
                else{
                    $("#tbodySelectedQuestionToPaper").empty();
                    $("#score").val(0);
                    $("#tbSelectedQuestionToPaper").hide();
                    $(".label-difficulty-level").hide();
                    $("#esy, #nrm, #hrd").text(0).hide();
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