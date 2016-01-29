/**
 * Created by Phuthikorn_T on 13/8/2558.
 */

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    $('#rHard').closest('.row').addClass('hidden')
});

$(document).ready(function () {
    createQuestionModalClearInput()
})

$("#createCategoryBtn").on('click', function () {
    if ($("#subCategoryCreateContainer.hidden").size()) {
        showCreateCategory()
    }
})
$("#createCategorySubmitBtn").on('click', function () {
    saveCategory()
})
$("#createCategoryCancleBtn").on('click', function () {
    hideCreateCategory()
})

$("#createSubCategoryBtn").on('click', function () {
    showCreateSubCategory()
    hideCreateCategory()
})
$("#createSubCategorySubmitBtn").on('click', function () {
    saveSubCategory()
})
$("#createSubCategoryCancleBtn").on('click', function () {
    hideCreateSubCategory()
})

$(".choiceRadioAddon").on('click', function () {
    $(this).children().prop("checked", true);
    var correctRadioNotChecked = $('.correctRadio:not(:checked)')
    correctRadioNotChecked.parent().removeClass('success');
    correctRadioNotChecked.show();
    correctRadioNotChecked.parent().children('div').hide();
    var correctRadioChecked = $('.correctRadio:checked')
    correctRadioChecked.parent().addClass('success');
    correctRadioChecked.parent().children('div').show();
    correctRadioChecked.hide();
})

$('button[dat-dismiss="modal"]:not(#submitCreateBtn)').on('click', function () {
    if ($("#categoryInputForCreateQuestion").val() != "" ||
        $("#subCategoryInputForCreateQuestion").val() != "" ||
        $("#questionScoreForCreateQuestion").val() != "" ||
        $("#questionDescription").val() != "" ||
        $(".choiceDesc").val() != ""
    ) {
        var confirmation = confirm('ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่')
        if (confirmation) {
            $('#createQuest').modal('hide');
        }
    } else {
        $('#createQuest').modal('hide');
    }
})

$('#select-QuestionType').on('change', function () {
    updateCreateModalLayout()
})


$('#submitCreateBtn').on('click', function () {
    if ($('#createQuestModalTitle').text() == 'สร้างข้อสอบ') {
        if (checkCreateQuestionModalFieldComplete()) {
            saveQuestion();
            $('#createQuest').modal('hide')
        }
    } else if ($('#createQuestModalTitle').text() == 'แก้ไขข้อสอบ') {
        if (checkCreateQuestionModalFieldComplete()) {
            var confirmation = confirm('ยืนยันการแก้ไขข้อมูล');
            if (confirmation) {
                editQuestion();
                $('#createQuest').modal('hide')
            }
        }
    } else {
        alert('Fail to determine function please Check createQuestionModal.js')
    }
})

var editQuestion = function () {
} // FOR EDIT FROM webapp/WEB-INF/page/exam/manageQuestion.jsp

function saveQuestion() {

    var catText = $("#categoryInputForCreateQuestion").parent().find('ul li.active').text()
    var categoryId = catText.substr(0, catText.indexOf(":")).trim();

    var subCategoryName = $("#sSubCat").val();
    var questionTypeString = $("#select-QuestionType").val();
    var score = $("#questionScoreForCreateQuestion").val();
    var choiceDesc = null;
    var questionDesc = $("#questionDescription").val();
    var difficulty = $("input[name='level']:checked").val();
    var correctChoice = parseInt($(".correctRadio:checked").val());

    var questionType = null;
    if (questionTypeString == 'Objective') {
        questionType = 1;
    } else if (questionTypeString == 'Subjective') {
        questionType = 2;
    }

    //if (questionType == 1) {
    if(questionType == 1) {
        choiceDesc = new Array($('#choice1').val(), $('#choice2').val(), $('#choice3').val(), $('#choice4').val()).toString();
    }else{
        choiceDesc = null;
        correctChoice = null;
    }

    var dat = $.ajax({
        type: 'POST',
        url: context + '/TDCS/exam/addQuestion',
        data: {
            categoryId: categoryId,
            subCategoryName: subCategoryName,
            questionDesc: questionDesc,
            choiceDescArray: choiceDesc,
            correctChoice: correctChoice,
            questionType: questionType,
            difficulty: parseInt(difficulty),
            score: parseFloat(score)
        }
        ,
        success: function (q) {
            alert('บันทึกข้อมูลสำเร็จ');
            if ($('.h3').text() == "จัดการข้อสอบ") {
                $(".table-container").removeClass("hidden")
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
                $('tbody tr td:not(.questionSelect)').css('cursor', 'pointer');
                $('.questionSelectBox').css('cursor', 'pointer');
                pagination.pagination('redraw');
                pagination.pagination("updateItems",itemCount);
            }

        },
        error: function () {

            alert('บันทึกข้อมูลไม่สำเร็จ');

        }
    })
    //} else {
    //    var dat = $.ajax({
    //        type: 'POST',
    //        url: context + '/TDCS/exam/addQuestion',
    //        //async: false,
    //        data: {
    //            categoryId: categoryId,
    //            subCategoryName: subCategoryName,
    //            questionDesc: questionDesc,
    //            questionType: questionType,
    //            difficulty: parseInt(difficulty),
    //            score: parseFloat(score)
    //        }
    //        ,
    //        success: function (q) {
    //            alert('บันทึกข้อมูลสำเร็จ');
    //            if ($('.h3').text() == "จัดการข้อสอบ") {
    //                var createDate = new Date(q.createDate);
    //                var formattedDate = createDate.getDate() + "/" + (parseInt(createDate.getMonth()) + 1) + "/" + createDate.getFullYear();
    //                $("#tableBody").prepend('<tr questionId=' + q.id + '>' +
    //                '<td class="questionSelect"><input type="checkbox" class="questionSelectBox"/></td>' +
    //                '<td class="questionType">' + q.questionType.description + '</td>' +
    //                '<td class="questionCategory">' + q.subCategory.category.name + '</td>' +
    //                '<td class="questionSubCategory">' + q.subCategory.name + '</td>' +
    //                '<td class="questionDescription" align="left">' + q.description.substring(0, 100) + '</td>' +
    //                '<td class="questionScore">' + q.score + '</td>' +
    //                '<td class="questionCreateBy">' + q.createBy.thFname + ' ' + q.createBy.thLname + '</td>' +
    //                '<td class="questionCreateDate">' + formattedDate + '</td>' +
    //                "</tr>")
    //            }
    //        },
    //        error: function () {
    //
    //            alert('บันทึกข้อมูลไม่สำเร็จ');
    //
    //        }
    //    })
    //}
    createQuestionModalClearInput();
}

var checkCreateQuestionModalFieldComplete = function () {

    var complete = categoryValidate();

    var subcat = $("#sSubCat")
    if (subcat.val() == "" || subcat.val() == null) {
        subcat.addClass("validate-fail")
        complete = false
    } else {
        subcat.removeClass("validate-fail")
    }

    var questType = $("#select-QuestionType")
    if (questType.val() == "" || questType.val() == null) {
        questType.addClass("validate-fail")
        complete = false
    } else {
        questType.removeClass("validate-fail")
    }

    var qScore = $("#questionScoreForCreateQuestion")
    if (qScore.val() == "" || isNaN(qScore.val()) || qScore.val() > 999) {
        qScore.addClass("validate-fail")
        complete = false
    } else {
        qScore.removeClass("validate-fail")
    }

    var qDescr = $("#questionDescription")
    if (qDescr.val() == "") {
        qDescr.addClass("validate-fail")
        complete = false
    } else {
        qDescr.removeClass("validate-fail")
    }
    if (!$("input[name='level']:checked").length) {
        $('#diffRadioContainer').addClass("validate-fail")
        complete = false
    } else {
        $('#diffRadioContainer').removeClass("validate-fail")
    }

    if (questType.val() == "Objective" || questType == null || questType == "") {
        $.each($(".choiceDesc"), function () {
            if ($(this).val() == "") {
                $(this).addClass("validate-fail")
                complete = false;
            } else {
                $(this).removeClass("validate-fail")
            }
        })

        if (!$('.correctRadio:checked').length) {
            $(".choiceRadioAddon").addClass("validate-fail")
        } else {
            $(".choiceRadioAddon").removeClass("validate-fail")
        }
    }

    return complete;
}

var createQuestionModalClearInput = function () {
    $("#categoryInputForCreateQuestion").val("");

    $("#sSubCat").empty();
    $("#select-QuestionType").val("");
    $("#questionScoreForCreateQuestion").val("");
    $("#questionDescription").val("");
    $("input[name='level']").attr('checked', false);
    //$(".correctRadio").attr('checked', false);
    $(".choiceDesc").val("");
    $("#submitBtnContainer").hide();
    $("#answerInput").hide()
    //var correctRadioNotChecked = $('.correctRadio:not(:checked)')
    //correctRadioNotChecked.parent().removeClass('success');
    //correctRadioNotChecked.show();
    //correctRadioNotChecked.parent().children('div').hide();
    hideCreateCategory()
    hideCreateSubCategory()
}

var setCreateModalCategory = function (category) {
    $("#categoryInputForCreateQuestion").val(category);
}
var setCreateModalSubCategory = function (subCategory) {
    $("#subCategoryInputForCreateQuestion").val(subCategory);
}
var setCreateModalQuestionType = function (questionType) {
    if (questionType == 'อัตนัย') {
        $("#select-QuestionType").val("Subjective")
    } else if (questionType == 'ปรนัย') {
        $("#select-QuestionType").val("Objective")
    }
}
var setCreateModalScore = function (score) {
    $("#questionScoreForCreateQuestion").val(score);
}
var setCreateModalDufficulty = function (difficultyLevel) {
    $("input[name='level']").prop('checked', false)
    $("input[name='level'][value=" + difficultyLevel + "]").prop('checked', true)
}
var setCreateModalCorrectQuestion = function (correctQuestion) {
    $(".correctRadio").prop('checked', false);
    $(".correctRadio:eq(" + (correctQuestion - 1) + ")").click();
}
var setCreateModalIthChoice = function (cDesc, position) {
    $("#choice" + position).val(cDesc);
}
var setCreateModalQuestionDesc = function (questionDesc) {
    $("#questionDescription").val(questionDesc);
}
var createModalShowObjevtive = function () {
    $('#answerInput').show();
    $('#submitBtnContainer').val('Objective');
}
var createModalShowSubjevtive = function () {
    $('#answerInput').hide();
    $('#submitBtnContainer').val('Subjective');
}
var updateCreateModalLayout = function () {
    $('#submitBtnContainer').show();

    if ($('#select-QuestionType').val() == 'Objective') {
        createModalShowObjevtive();
    }
    else if ($('#select-QuestionType').val() == 'Subjective') {
        createModalShowSubjevtive();
    }
}

// LOV By JoKizz
$(document).ready(function () {
    $("#categoryInputForCreateQuestion").on('click', function () {

    })
});


$("#categoryInputForCreateQuestion").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listcatCreateQues();
    }
});
function listcatCreateQues() {
    var availableall = [];
    var categoryId = $("#categoryInputForCreateQuestion").val();

    var data = $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/getAllCategory",

        async: false,

        success: function (data) {
            data.forEach(function (value) {
                availableall.push(value.id + ' : ' + value.name);
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });
    var search = $("#categoryInputForCreateQuestion").val();
    $("#categoryInputForCreateQuestion").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
};


///  get data to DropDownlist
$("#categoryInputForCreateQuestion").on('change', function () {
        $("#sSubCat").empty();
        var categoryId = $("#categoryInputForCreateQuestion").val();
        var subcategoryName = $("#sSubCat").val();
        if (categoryId != "") {
            if (categoryId.indexOf(':') != -1) {
                categoryId.indexOf(':');
                var categoryId2 = categoryId.substr(0, categoryId.indexOf(' '));
                categoryId = categoryId2;
                var data = $.ajax({
                    type: "POST",
                    url: context + "/TDCS/exam/getSubCategoryToDropDown",
                    data: {
                        categoryId: categoryId
                        //subcategoryName: subcategoryName
                    },
                    async: false,

                    success: function (data) {
                        data.forEach(function (value) {
                            $("#sSubCat").append(
                                '<option value="' + value.SubCategory.name + '">' + value.SubCategory.name + '</option>'
                            )
                        });
                    },
                    error: function (data) {
                        alert('error while request...');
                    }
                });
                if (($("#sSubCat").val() == null)) {
                    $("#sSubCat").append(
                        '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                    )
                }
            } else {
                var data = $.ajax({
                    type: "POST",
                    url: context + "/TDCS/exam/getSubCategoryToDropDown",
                    data: {
                        categoryId: categoryId
                    },
                    async: false,
                    success: function (data) {
                        data.forEach(function (value) {
                            $("#sSubCat").append(
                                '<option value="' + value.SubCategory.name + '">' + value.SubCategory.name + '</option>'
                            )
                        });

                    },
                    error: function (data) {
                        alert('error while request...');
                    }
                });
                if (($("#sSubCat").val() == null)) {
                    $("#sSubCat").append(
                        '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                    )
                }
            }
        }
    }
)

var hideCreateCategory = function () {
    $("#categoryCreateContainer").addClass("hidden")
    $("#categorySelectContainer").removeClass("hidden")

}
var showCreateCategory = function () {
    $("#categorySelectContainer").addClass("hidden")
    $("#categoryCreateContainer").removeClass("hidden")
}
var hideCreateSubCategory = function () {
    $("#subCategoryCreateContainer").addClass("hidden")
    $("#subCategorySelectContainer").removeClass("hidden")
}
var showCreateSubCategory = function () {
    $("#subCategorySelectContainer").addClass("hidden")
    $("#subCategoryCreateContainer").removeClass("hidden")
}

var categoryValidate = function () {
    var valid = true;

    var cat = $("#categoryInputForCreateQuestion")
    if (cat.val() == "") {
        cat.addClass("validate-fail")
        valid = false
    } else {
        cat.removeClass("validate-fail")
    }

    return valid
}

var saveCategory = function () {
    var valid = true;

    var catId = $('#createCategoryIdInput');
    var catName = $('#createCategoryNameInput');
    if (catId.val() == "" || catId.val() == null) {
        catId.addClass("validate-fail")
        valid = false
    } else {
        catId.removeClass("validate-fail")
    }
    if (catName.val() == "" || catName.val() == null) {
        catName.addClass("validate-fail")
        valid = false
    } else {
        catName.removeClass("validate-fail")
    }
    if (valid) {
        var dat = $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/addCategory",
            data: 'id=' + catId.val() + '&name=' + catName.val(),
            success: function (category) {
                alert("บันทึกข้อมูลสำเร็จ");
                setCreateModalCategory(category.id + " : " + category.name);
                var categoryInput = $("#categoryInputForCreateQuestion");
                categoryInput.change();
                hideCreateCategory()
            },
            error: function (xhr) {
                if (xhr.status == 418) {
                    alert('บันทึกข้อมูลไม่สำเร็จ : รหัสหมวดหมู่ซ้ำ')
                } else {
                    alert('บันทึกข้อมูลไม่สำเร็จ');
                }

            }
        });


    }
}

var saveSubCategory = function () {

    var valid = categoryValidate();
    if (!valid) {
        alert('กรุณาเลือกหมวดหมู่ของหัวข้อเรื่อง')
    }

    var subCat = $('#createSubCategoryNameInput');
    if (subCat.val() == null || subCat.val() == "") {
        subCat.addClass("validate-fail")
        valid = false
    } else {
        subCat.removeClass("validate-fail")
    }

    if (valid) {
        var catText = $("#categoryInputForCreateQuestion").parent().find('ul li.active').text()

        var dat = $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/addSubCategory",
            data: {
                categoryId: catText.substr(0, catText.indexOf(":")).trim(),
                subcategoryNameadd: subCat.val()
            },
            success: function (subCat) {
                alert("บันทึกข้อมูลสำเร็จ");
                $("#categoryInputForCreateQuestion").change();
                $('#sSubCat').find('option[value="' + subCat.name + '"]').prop("selected", true)
            },
            error: function (xhr) {
                if (xhr.status == 418) {
                    alert('บันทึกข้อมูลไม่สำเร็จ : มีหัวข้อเรื่องดังกล่าวอยู่แล้ว')
                } else {
                    alert('บันทึกข้อมูลไม่สำเร็จ');
                }
            }
        });

        hideCreateSubCategory()
    }

}