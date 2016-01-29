var getSearchCategoryInputValueId = function () {

    var text = $('#selectCategoryToSelection + ul li[class="active"] a').text();
    var id = text.substr(0, text.indexOf(":")).trim();

    if ($('#selectCategoryToSelection').val() == "") {
        return null
    }
    if (id != null) {
        return id;
    } else {
        return null;
    }
}

var getSearchSubCategoryInputValue = function () {
    var val = $('#selectSubCategoryToSelection').val();
    if (val != null) {
        return $('#selectSubCategoryToSelection').val();
    } else {
        return null
    }
}

var clearCategoryList = function () {
    var categorySelect = $('#selectCategoryToSelection');
    categorySelect.empty();
    categorySelect.append("<option selected value=''></option>");
}

$(document).ready(function () {
    clearCategoryList();
    //listSubCategory();
    initCategoryDropdown();
    //$("#selectSubCategoryToSelection").prepend('<option value="">'+"เลือกหัวข้อเรื่อง"+'</option>');
    //var data = $.ajax({
    //    type: "POST",
    //    contentType: "application/json",
    //    url: context + "/TDCS/exam/getAllSubCategory",
    //    async: false,
    //    success: function (data) {
    //        $("#selectSubCategoryToSelection").append(
    //            '<option value="" >' + "" + '</option>'
    //        )
    //        data.forEach(function (value) {
    //            $("#selectSubCategoryToSelection").append(
    //                '<option >' + value.id + " : " + value.subName + '</option>'
    //            )
    //        });
    //
    //    },
    //    error: function (data) {
    //
    //    }
    //});
})

function initCategoryDropdown(){
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllSubCategory",
        async :false,
        success: function (data) {
            $("#selectSubCategoryToSelection").append(
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
                $("#selectSubCategoryToSelection").append(
                    '<option>' + uniqueSubName[i] + '</option>'
                )
            }
        },
        error :function(data){

        }
    });
}

var catAndSubcatSelectNothing = function () {
    $('#selectCategoryToSelection option:selected').removeAttr("selected");
    $('#selectCategoryToSelection').val("");
    $('#selectCategoryToSelection option[value=""]').attr('selected', 'selected');

}


$("#selectCategoryToSelection").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listcatSelectInput();
    }
});
function listcatSelectInput() {
    //alert("LOV");
    var availableall = [];
    var categoryId = $("#selectCategoryToSelection").val();

    var data = $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/getAllCategory",
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
    var search = $("#selectCategoryToSelection").val();
    $("#selectCategoryToSelection").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
};


/////To Dropdown
$("#selectCategoryToSelection").on('change', function () {

        //if ($("#selectCategoryToSelection").val() != "") {
        listSubCategory();
        //}
    }
)

var listSubCategory = function () {

    $("#selectSubCategoryToSelection").empty();
    var categoryId = $("#selectCategoryToSelection").val();
    if (categoryId.indexOf(':') != -1) {
        categoryId.indexOf(':');
        var categoryId2 = categoryId.substr(0, categoryId.indexOf(' '));
        categoryId = categoryId2;
        var data = $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getSubCategoryToDropDown",
            data: {
                categoryId: categoryId
            },
            async: false,

            success: function (data) {
                data.forEach(function (value) {
                    $("#selectSubCategoryToSelection").append(
                        '<option >' + value.SubCategory.name + '</option>'
                    )
                });
            },
            error: function (data) {
                alert('error while request...');
            }
        });
        if (($("#selectSubCategoryToSelection").val() == null)) {
            $("#selectSubCategoryToSelection").append(
                '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
            )
        }
        else if (($("#selectSubCategoryToSelection").val() != null)) {
            $("#selectSubCategoryToSelection").prepend(
                '<option value="" selected></option>'
            )
        }
    } else {
        var data = $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getSubCategoryToDropDown",
            data: {
                categoryId: categoryId
            },
            async: false,

            success: function (data) {
                data.forEach(function (value) {
                    $("#selectSubCategoryToSelection").append(
                        '<option >' + value.name + '</option>'
                    )
                });

            },
            error: function (data) {
                alert('error while request...');
            }
        });
        if (($("#selectSubCategoryToSelection").val() == null)) {
            $("#selectSubCategoryToSelection").append(
                '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
            )
        }
        else if (($("#selectSubCategoryToSelection").val() != null)) {
            $("#selectSubCategoryToSelection").prepend(
                '<option value="" selected></option>'
            )
        }
    }
}




