/**
 * Created by Phuthikorn_T on 14/8/2558.
 */
var pagination = $('#pagination')
var itemOnPage = 20;
var orderBy = "id"
var orderType = "desc"

$(function () {
    pagination.pagination({
        items: 0,
        itemsOnPage: itemOnPage,
        cssStyle: 'light-theme',
        onPageClick: function () {
            listSearchQuestion("pageChange", pagination.pagination("getCurrentPage"))
        }
    });
});

$(document).ready(function () {
    clearAllSearchQuestionField()
    $('#selectAllItem').prop('checked', false)
    //listSearchQuestion();
    $("#searchCatNotFound").hide();
    pagination.pagination("destroy")

//    ---------------------------------------------------------------------

})

$("#selectOrderType").on('change', function () {
    orderType = $(this).val()
    listSearchQuestion("pageChange", pagination.pagination("getCurrentPage"))
})

$("#selectOrderBy").on('change', function () {
    orderBy = $(this).val()
    listSearchQuestion("pageChange", pagination.pagination("getCurrentPage"))
})


$('tbody').on('change', '.questionSelectBox', function () {

    if ($('.questionSelectBox').size() == $('.questionSelectBox:checked').size()) {
        $('#selectAllItem').prop('checked', true)
    } else {
        $('#selectAllItem').prop('checked', false)
    }
})

$('body').on('click', '.detailEditBtn', function () {
    $('#questionDetailModal').modal('hide')
    $('#submitCreateBtn').text('ยืนยัน');
    $('#createQuestModalTitle').text('แก้ไขข้อสอบ');
    var qId = $(this).closest('tr').attr('questionId');
    if (qId == undefined) {
        qId = $(this).val()
    }
    setEditModalParameter(qId);
    $('#createQuest').modal('show')
})


$('body').on('click', 'td .detailEditBtn', function () {
    setQuestionObj($(this).closest('tr'))
})

$('#tableBody').on('click', 'td:not(.questionSelect)td:not(.questionEditColumn)', function () {
    var questionDetailModal = $('#questionDetailModal')
    questionDetailModal.modal('hide');
    questionDetailModal.modal('show');

    updateDetailModal($(this).parent());
    setQuestionObj($(this).parent())
})

$('.deleteSelectedBtn').on('click', function () {
    deleteSelectedQuestion();
})

$('.createQuestionBtn').on('click', function () {
    if ($('#createQuestModalTitle').text() != 'สร้างข้อสอบ') {
        $('#createQuestModalTitle').text('สร้างข้อสอบ');
        $('#submitCreateBtn').text('ตกลง');
        createQuestionModalClearInput();
    }
})

$('.searchSubmitBtn').on('click', function () {
    listSearchQuestion($(this));
})

var deleteSelectedQuestion = function () {
    var selectedQuestions = $('.questionSelectBox:checked');
    var questionIds = [];
    var i = 0;
    selectedQuestions.each(function () {
        questionIds[i] = $(this).parent().parent().attr('questionId')
        i++
    })
    var confirmation = confirm('ยืนยันการลบข้อมูล');
    if (confirmation == true) {
        deleteQuestions(questionIds);
    }
}

$('#selectAllItem').on('click', function () {
    if ($(this).prop('checked')) {
        $('tbody').find('.questionSelectBox').prop('checked', true)
    } else {
        $('tbody').find('.questionSelectBox').prop('checked', false)
    }
})

var questionObj;
var setQuestionObj = function (tr) {
    questionObj = tr;
}

editQuestion = function () { // THIS FUNCTION IS CALLED FROM webapp/WEB-INF/pages/exam/modal/createQuestionModal.jsp
    var questionId = questionObj.attr('questionId');
    var cat = $("#categoryInputForCreateQuestion")
    var catText = cat.parent().find('ul li.active').text()
    var categoryId = catText.substr(0, catText.indexOf(":")).trim();
    if (categoryId == "") {
        categoryId = cat.val().substr(0, cat.val().indexOf(':')).trim()
    }
    var subCategoryName = $("#sSubCat").val();
    var questionTypeString = $("#select-QuestionType").val();
    var score = $("#questionScoreForCreateQuestion").val();
    var choiceDesc = null;
    var questionDesc = $("#questionDescription").val();
    var difficulty = $("input[name='level']:checked").val();
    var correctC = $(".correctRadio:checked")
    var correctChoice = correctC.val();

    if (correctChoice == undefined) {
        correctChoice = 0;
    }

    var questionType = null;
    if (questionTypeString == 'Objective') {
        questionType = 1;
    } else {
        questionType = 2;
    }

    choiceDesc = new Array($('#choice1').val(), $('#choice2').val(), $('#choice3').val(), $('#choice4').val());

    var dat = $.ajax({
            type: 'POST',
            url: context + '/TDCS/exam/editQuestion',
            data: {
                questionId: questionId,
                categoryId: categoryId,
                subCategoryName: subCategoryName,
                questionDesc: questionDesc,
                choiceDescArray: choiceDesc.toString(),
                correctChoice: parseInt(correctChoice),
                questionType: questionType,
                difficulty: parseInt(difficulty),
                score: parseInt(score)
            }
            ,
            success: function (q) {
                alert('แก้ไขข้อมูลสำเร็จ');
                if (q != null) {
                    var createDate = new Date(q.createDate);
                    var updateDate = new Date(q.updateDate);
                    var formattedDate
                    if (updateDate == null) {
                        formattedDate = createDate.getDate() + "/" + (parseInt(createDate.getMonth()) + 1) + "/" + createDate.getFullYear();
                    } else {
                        formattedDate = updateDate.getDate() + "/" + (parseInt(updateDate.getMonth()) + 1) + "/" + updateDate.getFullYear();
                    }
                    $('tr[questionId="' + questionId + '"]').remove();

                    $(".table-container").removeClass("hidden")

                    $("#tableBody").prepend('<tr questionId=' + q.id + '>' +
                    '<td style="vertical-align: middle;" class="questionSelect"><input type="checkbox" class="questionSelectBox"/></td>' +
                    '<td style="vertical-align: middle;" class="questionType">' + q.questionType.description + '</td>' +
                    '<td style="vertical-align: middle;" class="questionCategory">' + q.subCategory.category.name + '</td>' +
                    '<td style="vertical-align: middle;" class="questionSubCategory">' + q.subCategory.name + '</td>' +
                    '<td style="vertical-align: middle;" class="questionDescription" align="left">' + q.description.substring(0, 100) + '</td>' +
                        //'<td class="questionDifficulty">' + q.difficultyLevel.description + '</td>' +
                    '<td style="vertical-align: middle;" class="questionScore">' + q.score + '</td>' +
                    '<td style="vertical-align: middle;" class="questionCreateBy">' + q.createBy.thFname + ' ' + q.createBy.thLname + '</td>' +
                    '<td style="vertical-align: middle;" class="questionCreateDate">' + formattedDate + '</td>' +
                    '<td style="vertical-align: middle;" class="questionEditColumn"><button class="detailEditBtn btn btn-primary" value="' + q.id + '"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
                    "</tr>")
                    $("#searchCatNotFound").hide();
                    if (q.description.length > 100) {
                        $('td[class="questionDescription"]:last').append("....")
                    }
                }
            },
            error: function (xhr) {
                if (xhr.status == 418) {
                    // do nothing
                } else {
                    alert('แก้ไขข้อมูลไม่สำเร็จ');
                    $('#createQuest').modal('show')
                }
            }
        }
    )

}

var setEditModalParameter = function (questionId) {

    //var tr = questionObj;
    var ajaxDat1 = $.ajax({ //quesotion
        type: "POST",
        url: context + "/TDCS/exam/getQuestionDetail",
        data: {
            questionId: questionId
        },
        success: function (question) {
            createQuestionModalClearInput();
            setCreateModalCategory(question.subCategory.category.id + " : " + question.subCategory.category.name);
            var categoryInput = $("#categoryInputForCreateQuestion");
            categoryInput.change();
            $('#sSubCat').find('option[value="' + question.subCategory.name + '"]').prop("selected", true)
            setCreateModalQuestionType(question.questionType.description);
            setCreateModalDufficulty(question.difficultyLevel.level);
            setCreateModalScore(question.score);
            setCreateModalQuestionDesc(question.description);
            updateCreateModalLayout();
            var ith = 1;
            question.choices.forEach(function (choice) {
                setCreateModalIthChoice(choice.description, ith);
                if (choice.correction) {
                    setCreateModalCorrectQuestion(ith);
                }
                ith = ith + 1;
            })

        },
        error: function () {
            console.log("fail in ajaxDat1");
        }
    })
}

var deleteQuestions = function (questionIds) {
    $.ajax({
        type: 'POST',
        url: context + '/TDCS/exam/deleteQuestion',
        data: {
            questionArray: JSON.stringify(questionIds)
        },
        success: function () {
            alert("ลบข้อมูลสำเร็จ");
            if($("#tableBody tr").size() <= 1 ){
                $("#searchCatNotFound").show();
                pagination.pagination("destroy")
                $(".table-container").addClass("hidden")
            }else{
                listSearchQuestion("pageChange",pagination.pagination('getCurrentPage'));
            }
        }, error: function () {
            alert("ลบข้อมูลไม่สำเร็จ");
        }
    })

}

var listSearchQuestion = function (btn, page) {
    var data = null;
    var itemCount = 0;
    if (btn != "pageChange") {
        if (btn.attr('id') != 'advSearchBtn') {
            data = getSearchQuestionResultListBasic();
        }
        else {
            data = getSearchQuestionResultListAdv();
        }
    } else {
        data = getSearchQuestionResultListPageChange(page)
    }

    $("tbody").empty();

    if (data == undefined) {
        return null;
    }
    if (!(data.length > 0)) {
        $("#searchCatNotFound").show()
        $('#pagination').pagination('destroy');
        $(".table-container").addClass("hidden")
    } else {
        $(".table-container").removeClass("hidden")
        data.forEach(function (q) {
            var createDate = new Date(q.createDate);
            var formattedDate = createDate.getDate() + "/" + (parseInt(createDate.getMonth()) + 1) + "/" + createDate.getFullYear();
            $("#tableBody").append('<tr questionId=' + q.id + '>' +
            '<td style="vertical-align: middle;" class="questionSelect"><input type="checkbox" class="questionSelectBox"/></td>' +
            '<td style="vertical-align: middle;" class="questionType">' + q.questionType.description + '</td>' +
            '<td style="vertical-align: middle;" class="questionCategory">' + q.subCategory.category.name + '</td>' +
            '<td style="vertical-align: middle;" class="questionSubCategory">' + q.subCategory.name + '</td>' +
            '<td style="vertical-align: middle;" class="questionDescription" align="left">' + q.description.substring(0, 100) + '</td>' +
                //'<td class="questionDifficulty">' + q.difficultyLevel.description + '</td>' +
            '<td style="vertical-align: middle;" class="questionScore">' + q.score + '</td>' +
            '<td style="vertical-align: middle;" class="questionCreateBy">' + q.createBy.thFname + ' ' + q.createBy.thLname + '</td>' +
            '<td style="vertical-align: middle;" class="questionCreateDate">' + formattedDate + '</td>' +
            '<td style="vertical-align: middle;" class="questionEditColumn"><button class="detailEditBtn btn btn-primary" value="' + q.id + '"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
            "</tr>")
            $("#searchCatNotFound").hide();
            if (q.description.length > 100) {
                $('td[class="questionDescription"]:last').append("....")
            }
            if (itemCount == 0) {
                itemCount = q.itemCount;
            }

        })

        $('tbody tr td:not(.questionSelect)').css('cursor', 'pointer');
        $('.questionSelectBox').css('cursor', 'pointer');
        pagination.pagination('redraw');
        pagination.pagination("updateItems", itemCount);
    }
}

//===================================================================================EVENT TRIGGER=================================================================================================//


$(".searchInputSubmitBtn").on('click', function () {
    listSearchQuestion()
})






