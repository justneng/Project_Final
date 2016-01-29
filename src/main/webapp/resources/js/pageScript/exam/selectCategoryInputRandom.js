var getSearchCategoryInputValueId = function () {

    var text = $('#selectCategoryToSelectionForRandom + ul li[class="active"] a').text();
    var id = text.substr(0,text.indexOf(":")).trim();

    if($('#selectCategoryToSelectionForRandom').val() == ""){
        return null
    }
    if(id != null) {
        return id;
    }else{
        return null;
    }
}

var getSearchSubCategoryInputValue = function () {
    var val = $('#selectSubCategoryToSelectionForRandom').val();
    if(val != null){
        return $('#selectSubCategoryToSelectionForRandom').val();
    }else{
        return null
    }
}

var updateCategoryList = function () {
    clearCategoryList()
    var ajaxDat = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllCategory",
        success: function (catList) {
            catList.forEach(function (category) {
                $('#selectCategoryToSelectionForRandom').append('<option class="category" categoryId="' + category.id + '"' +
                ' categoryName="' + category.name + ' value=' + category.id + '">' + category.id + ' : ' + category.name + '')
            })
        },
        error: function () {
            alert("error in updateCategoryList()")
        }
    })
}

var updateSubCategoryList = function () {
    var catSelect = $('#selectCategoryToSelectionForRandom');
    var subcatSelect = $('#selectSubCategoryToSelectionForRandom');
    subcatSelect.empty();
    subcatSelect.append("<option selected value=''></option>");
    var data = null;
    if (catSelect.children('.category:selected').val()) {
        data = catSelect.children('.category:selected').attr('categoryId')
    } else(
        data = ""
    )
    console.log(data.length)

    var ajaxDat = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllSubCategoryInCategory",
        data: {
            categoryId: data
        },
        success: function (item) {
            if (jQuery.isEmptyObject(item)) {
                subcatSelect.empty();
                //if (catSelect.val() == "") {
                //    subcatSelect.append("<option selected value=''></option>");
                //}
            }
            if (item) {
                item.forEach(function (item) {
                    subcatSelect.append('<option class="subCategory" subCategoryId="' + item.id + '"' +
                    ' subCategoryName="' + item.name + '" subCategoryId="' + item.id + '"' +
                    'value="' + item.name + '""> ' + item.name+
                    '</option>')
                })
            }
        },
        error: function () {
            alert("error in updateSubCategoryList()")
        }
    })
}
var clearCategoryList = function () {
    var categorySelect = $('#selectCategoryToSelectionForRandom');
    categorySelect.empty();
    categorySelect.append("<option selected value=''></option>");
}

$(document).ready(function () {
    clearCategoryList();
    updateCategoryList();
    init();
    //$("#selectSubCategoryToSelection").prepend('<option value="">'+"เลือกหัวข้อเรื่อง"+'</option>');
})

function init(){
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllSubCategory",
        async :false,
        success: function (data) {
            $("#selectSubCategoryToSelectionForRandom").append(
                '<option value="" ></option>'
            );
            var catNameArr = new Array();
            data.forEach(function (value) {
                catNameArr.push(value.subName);
            });
            var uniqueSubName = [];
            $.each(catNameArr, function(i, el){
                if($.inArray(el, uniqueSubName) === -1) uniqueSubName.push(el);
            });

            for(var i = 0; i < uniqueSubName.length; i ++){
                $("#selectSubCategoryToSelectionForRandom").append(
                    '<option>' + uniqueSubName[i] + '</option>'
                )
            }
        },
        error :function(data){

        }
    });
}

$('#selectCategoryToSelectionForRandom').on('change', function () {
    console.log("event on category change")
    $('selectSubCategoryToSelectionForRandom').children('.subCategory').remove()
    updateSubCategoryList()
})

var catAndSubcatSelectNothing = function () {
    $('#selectCategoryToSelectionForRandom option:selected').removeAttr("selected");
    $('#selectCategoryToSelectionForRandom').val("");
    $('#selectCategoryToSelectionForRandom option[value=""]').attr('selected', 'selected');
    //updateSubCategoryList();

}



$("#selectCategoryToSelectionForRandom").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listcatSelectInputForRandom();

    }
});
function listcatSelectInputForRandom() {

    //alert("LOV");
    var availableall = [];
    var categoryId = $("#selectCategoryToSelectionForRandom").val();

    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllCategory",

        async: false,

        success: function (data) {
            data.forEach(function (value) {
                availableall.push(value.id + ' : ' + value.name);
            });
            //alert("SUCC");
        },
        error: function (data) {
            alert('error while request...');
        }
    });
    var search = $("#selectCategoryToSelectionForRandom").val();
    $("#selectCategoryToSelectionForRandom").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
};


/////To Dropdown
$("#selectCategoryToSelectionForRandom").on('change', function () {

    $("#selectSubCategoryToSelectionForRandom").empty();
    var categoryId = $("#selectCategoryToSelectionForRandom").val();

    var subcategoryName = $("#selectSubCategoryToSelectionForRandom").val();
    //categoryId += " ";
    //var length = categoryId.length
    //alert(length);

    //categoryId = categoryId.substr(0, categoryId.indexOf(' '));
    if (categoryId.trim() != "") {
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
                        $("#selectSubCategoryToSelectionForRandom").append(
                            '<option >' + value.SubCategory.name + '</option>'
                        )
                    });
                },
                error: function (data) {
                    alert('error while request...');
                }
            });
            if (($("#selectSubCategoryToSelectionForRandom").val() == null)) {
                $("#selectSubCategoryToSelectionForRandom").append(
                    '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                )
            }
            else if (($("#selectSubCategoryToSelectionForRandom").val() != null)) {
                $("#selectSubCategoryToSelectionForRandom").prepend(
                    '<option value="" selected></option>'
                )
            }
        } else {
            //console.log(categoryId+" 1 part");

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
                        $("#selectSubCategoryToSelectionForRandom").append(
                            '<option >' + value.name + '</option>'
                        )
                    });

                },
                error: function (data) {
                    alert('error while request...');
                }

            });
            if (($("#selectSubCategoryToSelectionForRandom").val() == null)) {
                $("#selectSubCategoryToSelectionForRandom").append(
                    '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                )
            }
            //else if (($("#selectSubCategoryToSelection").val() != null)) {
            //    $("#selectSubCategoryToSelection").prepend(
            //        '<option value="" selected>' + "ทั้งหมด" + '</option>'
            //    )
            //}
        }

    } else {

        var data = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context + "/TDCS/exam/getAllSubCategory",
            async: false,
            success: function (data) {
                $("#selectSubCategoryToSelectionForRandom").append(
                    '<option value="" selected></option>'
                )
                data.forEach(function (value) {
                    $("#selectSubCategoryToSelectionForRandom").append(
                        '<option >' + value.subName + '</option>'
                    )
                });

            },
            error: function (data) {

            }


        });

    }

    subCategoryIds = [];
    var str = $("#selectCategoryToSelectionForRandom").val();
    catId = str.substring(0, str.indexOf(":") - 1);

    $("#selectSubCategoryToSelectionForRandom option:not(':first-child')").each(function () {
        subCategoryIds.push($(this).val());
    });
    countQuestionReady();
});



