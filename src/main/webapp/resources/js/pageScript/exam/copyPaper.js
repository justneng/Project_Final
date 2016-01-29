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
                    $("#tbodySelectedQuestionToPaper").empty();
                    for(var i = 0; i < value.length; i ++){
                        //$("#newPaperId").val(value[0].examPaper.code);
                        //if($("#newPaperName").val(value[0].examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(value[0].examPaper.name));
                        //$("#newPaperScore").val(value[0].examPaper.maxScore);
                        //$("#maxScore").val(value[0].examPaper.maxScore);
                        //
                        //var posiId;
                        //var posiName;
                        //
                        //if(value[0].examPaper.position != null){
                        //    posiId = value[0].examPaper.position.posiId;
                        //}
                        //else{
                        //    posiId = 0;
                        //}
                        //$("#newPaperForPosition").val(Number(posiId));
                        //
                        //var paperTime = value[0].examPaper.timeLimit;
                        //var hours = Math.floor(paperTime / 60);
                        //var minutes = paperTime % 60;
                        //$("#hours").val(hours);
                        //$("#minutes").val(minutes);

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
                    sumPaperScore = 0;
                }
                else{
                    $("#tbodySelectedQuestionToPaper").empty();
                    $("#score").val(0);
                    $("#tbSelectedQuestionToPaper").hide();
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