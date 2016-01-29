$(document).ready(function () {
    $("#advanceBtn").click(function () {
        var str = $("#search").prop('outerHTML') + "&nbsp" + $("#clear").prop('outerHTML');
        $("#advanceBody").collapse('toggle');

        if ($("#advanceBtn").children("span").hasClass("glyphicon glyphicon-chevron-down")) {
            $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
            $("#btnSearch").hide();
            $("#btnAdvanceSearch").show();
        }
        else {
            $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-up").addClass("glyphicon glyphicon-chevron-down");

            $("#btnSearch").show();
            $("#btnAdvanceSearch").hide();
        }
    });
    $(".datepicker").datepicker();
})

$("#calendarBtnFrom").on('click', function () {
    var input = $("#searchCreateDateFromInput")
    input.datepicker("show")
    input.focus()
})

$("#calendarBtnTo").on('click', function () {
    var input = $("#searchCreateDateToInput")
    input.datepicker("show")
    input.focus()
})

var searchQuestionResultList

var getSearchQuestionResultListBasic = function () {
    submitSearchQuestion('basic', 1)
    return searchQuestionResultList
}

var getSearchQuestionResultListAdv = function () {
    submitSearchQuestion('adv', 1)
    return searchQuestionResultList
}

var getSearchQuestionResultListPageChange = function (page) {
    submitSearchQuestion("pageChange", page);
    return searchQuestionResultList
}

var SI

var submitSearchQuestion = function (mode, page) {
    searchResultReady = false;
    if (mode != "pageChange") {
        SI = { // SearchInput
            category: getSearchCategoryInputValueId(),
            subCategory: getSearchSubCategoryInputValue(),
            createBy: getUserIds(),
            //questionId: null,
            questionDesc: null,
            createDateFrom: null,
            createDateTo: null,
            scoreFrom: null,
            scoreTo: null
            //status: null
            ,page: 1
            ,orderBy:orderBy
            ,orderType:orderType
        }
    }else{
        SI.page = parseInt(page)
    }

    if (mode == 'adv') {
        SI.questionDesc = $("#searchQuestionDescInput").val()
        SI.createDateFrom = $('#searchCreateDateFromInput').val()
        SI.createDateTo = $("#searchCreateDateToInput").val()
        SI.scoreFrom = $("#searchScoreFromInput").val()
        SI.scoreTo = $("#searchScoreToInput").val()
    }

    var ajaxDat = $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/searchQuestion",
        async: false,
        data: {
            categoryId: SI.category,
            subCatName: SI.subCategory,
            createBy: JSON.stringify(SI.createBy),
            //questionId: SI.questionId,
            questionDesc: SI.questionDesc,
            createDateFrom: SI.createDateFrom,
            createDateTo: SI.createDateTo,
            scoreFrom: SI.scoreFrom,
            scoreTo: SI.scoreTo,
            //status: SI.status
            page: SI.page,
            itemOnPage: itemOnPage
            ,orderBy:orderBy
            ,orderType:orderType
        },
        success: function (dat) {
            searchQuestionResultList = dat
        },
        error: function () {
            alert("เกิดข้อผิดพลาด")
        }
    })
}

var clearAllSearchQuestionField = function () {
    catAndSubcatSelectNothing();
    $('#searchQuestionIdInput').val("");
    $("#searchQuestionDescInput").val("");
    $('#searchCreateDateFromInput').val("");
    $("#searchCreateDateToInput").val("");
    $("#searchScoreFromInput").val("");
    $("#searchScoreToInput").val("");
    $("#searchStatusInput").val("");
    clearCreateByInput();
    $("#showEmployeeSelected").empty();
    $("#rEasy").val("");
    $("#rNormal").val("");
    $("#rHard").val("");
}

$(".searchInputClearBtn").on('click', function () {
    clearAllSearchQuestionField();
})

$("#advBtnReset").unbind('click').click(function () {
    alert('hi');
});



