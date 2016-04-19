/**
 * Created by Phuthikorn_T on 14/8/2558.
 */
var itemOnPage = 10;
var orderBy = "id"
var orderType = "desc"
var itemCount;

$(function () {
    //pagination.pagination({
    //    items: 0,
    //    itemsOnPage: itemOnPage,
    //    cssStyle: 'light-theme',
    //    onPageClick: function () {
    //        //listSearchQuestion("pageChange", pagination.pagination("getCurrentPage"))
    //    }
    //});
});

$(document).ready(function () {
    clearAllSearchQuestionField()
    $('#selectAllItem').prop('checked', false)
    //listSearchQuestion();
    $("#searchCatNotFound").hide();

//    ---------------------------------------------------------------------

})

$("#selectOrderType").on('change', function () {
    orderType = $(this).val()
    listSearchQuestion("pageChange", getCurrentPageNumber())
})

$("#selectOrderBy").on('change', function () {
    orderBy = $(this).val()
    listSearchQuestion("pageChange", getCurrentPageNumber())
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
    }
    createQuestionModalClearInput();

})

$('.searchSubmitBtn').on('click', function () {
    listSearchQuestion($(this));
})

$('#advSearchBtn').on('click',function(){
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
                //score: parseInt(score)
                score: 1
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
                    '<td style="vertical-align: middle;" class="questionDescription" align="left">' + transformString(q.description.substring(0, 100)) + '</td>' +
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
            setCreateModalQuestionDesc(transformString(question.description));
            updateCreateModalLayout();
            var ith = 1;
            question.choices.forEach(function (choice) {
                setCreateModalIthChoice(transformString(choice.description), ith);
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
            listSearchQuestion("pageChange", getCurrentPageNumber());

        }, error: function () {
            alert("ลบข้อมูลไม่สำเร็จ");
        }
    })

}

var listSearchQuestion = function (btn, page) {
    $('#init-message-show').hide();
    $('#first-page').attr('where', '');
    var data = null;
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
        hidePagination();
        $(".table-container").addClass("hidden")
        $('.deleteSelectedBtn').addClass("hidden")
        $(".init-message-show").removeClass("hidden")
    } else {
        $('.deleteSelectedBtn').removeClass('hidden')
        $(".table-container").removeClass("hidden")
        $(".init-message-show").addClass("hidden")
        data.forEach(function (q) {
            var createDate = new Date(q.createDate);
            var qDesc = (q.description.substring(0, 100));
            var formattedDate = createDate.getDate() + "/" + (parseInt(createDate.getMonth()) + 1) + "/" + createDate.getFullYear();
            $("#tableBody").append('<tr questionId=' + q.id + '>' +
            '<td style="vertical-align: middle;" class="questionSelect"><input type="checkbox" class="questionSelectBox"/></td>' +
            '<td style="vertical-align: middle;" class="questionType">' + q.questionType.description + '</td>' +
            '<td style="vertical-align: middle;" class="questionCategory">' + q.subCategory.category.name + '</td>' +
            '<td style="vertical-align: middle;" class="questionSubCategory">' + q.subCategory.name + '</td>' +
            '<td style="vertical-align: middle;" class="questionDescription" align="left">' + transformString(qDesc) + '</td>' +
                //'<td class="questionDifficulty">' + q.difficultyLevel.description + '</td>' +
            //'<td style="vertical-align: middle;" class="questionScore">' + q.score + '</td>' +
            '<td style="vertical-align: middle;" class="questionCreateBy">' + q.createBy.thFname + ' ' + q.createBy.thLname + '</td>' +
            '<td style="vertical-align: middle;" class="questionCreateDate">' + formattedDate + '</td>' +
            '<td style="vertical-align: middle;" class="questionEditColumn"><button class="detailEditBtn btn btn-primary" value="' + q.id + '"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
            "</tr>")
            $("#searchCatNotFound").hide();
            if (q.description.length > 100) {
                $('td[class="questionDescription"]:last').append("....")
            }
            itemCount = q.itemCount;

        })
        $('tbody tr td:not(.questionSelect)').css('cursor', 'pointer');
        $('.questionSelectBox').css('cursor', 'pointer');
        //pagination.pagination('redraw');
        //pagination.pagination("updateItems", itemCount);
        if (btn != "pageChange") {
            showPagination(itemCount);
            $('.currentPage').css({
                'background-color': '#2F4133',
                'color': 'white'
            })
        }
    }
}

var showPagination = function (totalRecordLength) {
    $('.paging').show();
    totalPage(totalRecordLength, "");
    setStyle($('#prev-page').next().find('a'));
}

var hidePagination = function () {
    $('.paging').hide();
}

var toPage = function (pageNumber, row) {
    listSearchQuestion("pageChange", getCurrentPageNumber());
}

var getCurrentPageNumber = function () {
    return parseInt($('.currentPage').text());
}

var totalPage = function (lenght, where) {

    var allPages = Math.ceil(lenght / 10);
    var str = '';

    if (where === "paper") {
        for (var i = 1; i <= allPages; i++) {
            str = str + '<li><a>' + i + '</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where="paper"><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where="paper"><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where="paper"><a>&#x276f;</a></li>' +
            '<li id="last-page" where="paper"><a>&#x276f;&#x276f;</a></li>'
        );
    }

    else if (where === "questions") {
        for (var i = 1; i <= allPages; i++) {
            str = str + '<li><a>' + i + '</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where="questions"><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where="questions"><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where="questions"><a>&#x276f;</a></li>' +
            '<li id="last-page" where="questions"><a>&#x276f;&#x276f;</a></li>'
        );
    }
    else {
        for (var i = 1; i <= allPages; i++) {
            str = str + '<li><a>' + i + '</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where=""><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where=""><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where=""><a>&#x276f;</a></li>' +
            '<li id="last-page" where=""><a>&#x276f;&#x276f;</a></li>'
        );
    }
};

$(document).ready(function () {
    $('.pagination').on('click', 'li > a', function () {
        currentPage($(this));
        if (typeof toPage == 'function') {
            toPage(getCurrentPageNumber, 10);
        }
    });
});

function setStyle(elem){

    $(elem).css({
        'background-color': '#2F4133',
        'color': 'white'
    }).addClass('currentPage');

    $(".pagination > li > a").not(elem).not('#next-page').css({
        'background-color': 'white',
        'color':     '#337ab7'
    }).removeClass('currentPage');
}

function currentPage(currentElem) {
    var elem = currentElem.parent();
    var where = $('#first-page').attr('where');

    if (elem.attr('id') == 'first-page') {
        var first = elem.siblings().find('a:contains("1")');
        setStyle(first);
    }
    else if (elem.attr('id') == 'last-page') {
        var last = elem.siblings().find('a:contains("' + Math.ceil(itemCount / 10) + '")');
        setStyle(last);
    }
    else if (elem.attr('id') == 'next-page') {
        var next = elem.siblings().find('a').filter('.currentPage').parent().next().find('a');

        if (next.parent().attr('id') == 'next-page') {
            return;
        }
        else {
            setStyle(next);
        }
    }
    else if (elem.attr('id') == 'prev-page') {
        var prev = elem.siblings().find('a').filter('.currentPage').parent().prev().find('a');

        if (prev.parent().attr('id') == 'prev-page') {
            return;
        }
        else {
            setStyle(prev);
        }
    }
    else {
        setStyle(currentElem);
    }

}

//===================================================================================EVENT TRIGGER=================================================================================================//







