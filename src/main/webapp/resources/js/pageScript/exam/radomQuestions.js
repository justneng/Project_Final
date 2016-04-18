/**
 * Created by wanchana on 11/4/2559.
 */

$(document).ready(function(){
    $('#select-paper-type').on('change', function(){
        if($('#select-paper-type').val() == 'random'){
            $('#div-random-questions').show();
            $('#div-save-create-paper').hide();
            $('#span-random-questions').show();
            sumPaperScore = 0;
            clearQuestionsInPaper();
        }
        if($('#select-paper-type').val() == 'static'){
            $('#div-random-questions').hide();
            $('#div-save-create-paper').show();
            $('#span-random-questions').hide();
            sumPaperScore = 0;
            clearQuestionsInPaper();
        }
    });

    $('.add-from-subcategory').on('click', function(){
        $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/getAllCategory",
            async: false,

            success: function (categories) {
                $('#selectCategories').empty();
                categories.forEach(function(category){
                    $('#selectCategories').append(
                        '<option value="'+category.id+'">'+category.id+ " : " +category.name+'</option>'
                    )
                });

                getSubcategoriesByCategoryId(categories[0].id);
            },
            error: function () {
                alert('error while request...');
            }
        });
    });

    $('#selectCategories').on('change', function(){
        getSubcategoriesByCategoryId($(this).val());
    });

    $('#add-questions-to-paper').on('click', function(){
        var subcategoriesId = [];

        $('.checked-subcategory').each(function(){
            if($(this).is(':checked')){
                subcategoriesId.push($(this).attr('subcategoryid'));
            }
        });

        allQuestionIdOnTableCreatePaper = [];
        $(".selectedQuestion").each(function(){
            allQuestionIdOnTableCreatePaper.push($(this).parent().attr("qid"));
        });

        $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/getQuestionsBySubcategoryId",
            async: false,
            data: {
                "subcategoriesId": JSON.stringify(subcategoriesId),
                "allQuestionIdOnTableCreatePaper": JSON.stringify(allQuestionIdOnTableCreatePaper)
            },
            success: function (questions) {
                if(questions.length > 0){
                    $(".checkAllQuestionFromCreatePaperPage").checked = false;
                    $("#tbSelectedQuestionToPaper").show();
                    $(".label-difficulty-level").show();
                    $("#esy, #nrm, #hrd").show();
                    $("#removeRowQuestionSelect").show();
                    $("#questionNotFoundDesc").hide();
                    $('#sum-score').show();

                    var esy = Number($("#esy").text());
                    var nrm = Number($("#nrm").text());
                    var hrd = Number($("#hrd").text());

                    if(questions.length > 0){
                        questions.forEach(function(value){
                            $("#tbodySelectedQuestionToPaper").append(
                                '<tr>'+
                                '<td level="'+value.difficultyLevel.level+'" qid="'+value.id+'" style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                                '<td>'+value.subCategory.category.name+'</td>'+
                                '<td>'+value.subCategory.name+'</td>'+
                                '<td>'+checkString(value.description)+'</td>'+
                                '<td style="text-align: center;">'+value.questionType.description+'</td>'+
                                '<td style="text-align: center;">'+value.difficultyLevel.description+'</td>'+
                                '<td><input id="newScore'+value.id+'" onchange="scoreOnChange()" type="number" name="newScore" class="form-control input-sm" value="1" readonly/></td>'+
                                '</tr>'
                            );

                            if(value.difficultyLevel.level == 1){
                                esy = esy + 1;
                            }

                            if(value.difficultyLevel.level == 2){
                                nrm = nrm + 1;
                            }

                            if(value.difficultyLevel.level == 3){
                                hrd = hrd + 1;
                            }
                        });

                        var elem;
                        if($('#span-random-questions').is(':visible')){
                            elem = $('#addQuestionBtn').siblings("#span-random-questions");
                        }
                        else{
                            elem = $('#addQuestionBtn').siblings(".createQuestionBtn");

                        }

                        $('<span class="label label-success" style="font-size: 13px;">เพิ่มข้อสอบลงชุดข้อสอบเรียบร้อบแล้ว</span>')
                            .insertAfter(elem)
                            .delay(1500)
                            .fadeOut(function() {
                                $(this).remove();
                            });

                        scoreOnChange();
                    }

                    $("#esy").text(esy);
                    $("#nrm").text(nrm);
                    $("#hrd").text(hrd);

                    viewQuestions();
                }
            },
            error: function () {
                alert('error while request...');
            }
        });
    });

    $('#createPaperRandomQuestionBtn').on('click', function(){
        if($('#createPaperRandomQuestionBtn').attr('button-status') == "create"){
            newQuestionScore = [];
            $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
                newQuestionScore.push($(this).val());
            });
            minutes =  $("#minutes").val();
            if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
            hours = $("#hours").val();
            if(hours == ""? hours = 0: hours = $("#hours").val());

            createPaper('random');
        }

        if($('#createPaperRandomQuestionBtn').attr('button-status') == "update"){
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
            updatePaper('random');
        }

    });

    $('#questionEasyCount').keyup(function(){
        if($('.label-difficulty-level').is(':visible')){
            if(Number($('#questionEasyCount').val()) > Number($('#esy').text())){
                $('#not-enough-easy-exam').show();
                return false;
            }
            else{
                $('#not-enough-easy-exam').hide();
            }
        }
    });

    $('#questionNormalCount').keyup(function(){
        if($('.label-difficulty-level').is(':visible')){
            if(Number($('#questionNormalCount').val()) > Number($('#nrm').text())){
                $('#not-enough-normal-exam').show();
                return false;
            }
            else{
                $('#not-enough-normal-exam').hide();
            }
        }
    });

    $('#questionHardCount').keyup(function(){
        if($('.label-difficulty-level').is(':visible')){
            if(Number($('#questionHardCount').val()) > Number($('#hrd').text())){
                $('#not-enough-hard-exam').show();
                return false;
            }
            else{
                $('#not-enough-hard-exam').hide();
            }
        }
    });
});

function getSubcategoriesByCategoryId(catId){
    allQuestionIdOnTableCreatePaper = [];
    $(".selectedQuestion").each(function(){
        allQuestionIdOnTableCreatePaper.push($(this).parent().attr("qid"));
    });

    $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/getSubCategoryByCatId",
        async: false,
        data: {
            "allQuestionIdOnTableCreatePaper" : JSON.stringify(allQuestionIdOnTableCreatePaper),
            "catId" : catId
        },
        success: function (subCategories) {
            $('#selectSubcategories').empty();
            subCategories.forEach(function(subcategory){
                var str;
                var checkQuestionsEmpty;
                if(Number(subcategory.numberOfQuestion) > 0){
                    checkQuestionsEmpty = "";
                    str = '<span class="badge" style="background-color: #00c1f4;">' + subcategory.numberOfQuestion + '</span>';
                }
                else{
                    checkQuestionsEmpty = "disabled = 'disabled'";
                    str = '<span class="badge">0</span>';
                }

                $('#selectSubcategories').append(
                    '<div class="form-group">'+
                        '<div class="col-sm-2 text-right">'+
                            '<input class="checked-subcategory" subcategoryId="'+subcategory.id+'" type="checkbox" '+checkQuestionsEmpty+'/>'+
                        '</div>'+

                        '<div class="col-sm-7" style="padding-left: 0;">'+
                            '<label>'+ subcategory.name + '</label>&nbsp;'+ str +
                        '</div>'+
                    '</div>'
                );
            });
        },
        error: function () {
            alert('error while request...');
        }
    });
}

function clearQuestionsInPaper(){
    allQuestionIdOnTableCreatePaper = [];
    $("#questionNotFoundDesc").show();
    $("#copyPaperField").show();
    $("#copyPaperLov").val('');
    $("#removeRowQuestionSelect").hide();
    $("#tbSelectedQuestionToPaper tbody").empty();
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