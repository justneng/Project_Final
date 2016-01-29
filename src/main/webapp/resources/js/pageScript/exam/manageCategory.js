$("#dropdownExamEmp").attr('class', 'dropdown-toggle active');
var checkAll;
var checkCurrent;
var categoryIdArray = new Array();


$(document).ready(function () {
    //viewCategory();
    searchResultNotFound();
    $("#deleteCategory").on('click', function () {
        deleteCategory();
    });
    $("#submitCreateCategoryBtn").on('click', function () {
        saveCategory();
    });

    $("#tbodyCategory").on('click', '.selectCheckbox', function(){
        $("#selectAllCheckbox").checked = false;
        count();
        if(checkCurrent != checkAll){
            $("#selectAllCheckbox").prop('checked', false);
        }
        else{
            $("#selectAllCheckbox").prop('checked', true);
        }
    });
    $("#selectAllCheckbox").prop('checked', false);
    $("#selectAllCheckbox").on('click', function () {
        if (this.checked) {
            $(".selectCheckbox:not(':disabled')").each(function () {
                this.checked = true;
            })
        }
        else {
            $(".selectCheckbox").each(function () {
                this.checked = false;
            })
        }
    });

    $("#addCategory").on('click', function () {
        $("#categoryIdText").val("");
        $("#categoryNameText").val("");

    });

    $("#searchCategory").click(function(){
        search();
    });
    $("#resetBtnSearchCategory").on('click', function(){
        $("#categoryId").val('');
        $("#categoryName").val('');
    });
});

function checkCategoryNameInUse(categoryId){
    var check = $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/checkCategoryInUse",
        async: false,
        data: {
            categoryId: categoryId
        },
        success: function(data){
            $("#data" + categoryId).text(data.name);
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    }).responseText;

    return check;
}

function onLoadPageAfterCreateOrDeleteCategorySuccessful(){
    viewCategory();
}

function searchResultNotFound(){
    $("#searchCatNotFound").show();
    $("#tblCategory").hide();
    $("#deleteCategory").hide();
}

function searchResultFound(){
    $("#searchCatNotFound").hide();
    $("#tblCategory").show();
    $("#deleteCategory").show();
}

function viewCategory() {

    $("#tbodyCategory").empty();
    $("#thEdit").text("แก้ไข");
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context + "/TDCS/exam/getAllCategory",
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                var check = checkCategoryNameInUse(value.id);
                var str = "";
                if(check == 'true'){
                      str = 'disabled';
                }
                $("#tbodyCategory").append(
                    '<tr>' +
                    '<td class="col-sm-1" style="text-align: center;"><input class="selectCheckbox" type="checkbox" '+str+' cateId="' + value.id + '"/></td>' +
                    '<td class="col-sm-3" style="text-align: center;"><label id="id' + value.id + '">' + value.id + '</label>' +
                    '<input id="editId' + value.id + '" class="form-control input-sm" type="text" value="' + value.id + '" style="display: none;">' +
                    '<td><label id="data' + value.id + '">' + value.name + '</label>' +
                    '<input id="editData' + value.id + '" class="form-control input-sm" type="text" value="' + value.name + '" style="display: none;">' +
                    '</td>' +
                    '<td class="col-sm-1" style="text-align: center; padding-right: 0; padding-left: 0;"><button id="editBtn' + value.id + '" class="btn btn-primary btn-sm" onclick="editCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                    '<button class="btn btn-success btn-sm" id="save' + value.id + '" style="display: none; margin: 5px;" type="button" onclick="updateCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-ok"></span></button>' +
                    '<button class="btn btn-danger btn-sm" id="cancel' + value.id + '" style="display: none;" type="button" onclick="cancel(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-remove"></span></button>' +
                        //'&nbsp;<button id="updateBtn' + value.id + '" class="btn btn-primary btn-sm" style="display: none;" onclick="updateCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
                        //    '<td style="text-align: center;"><button class="btn btn-danger" id="deleteBtn'+value.id+'" type="button" onclick="deleteCategory('+ "'" +value.id+ "'"+')"><span class="glyphicon glyphicon-trash"></span></button></td>'+

                    '</td>' +
                    '</tr>'
                )
            });
        },
        error: function () {
            alert('error while request...');
        }
    });
}

function cancel(categoryId) {
    $("#editBtn" + categoryId).show();
    $("#data" + categoryId).show();
    $("#thEdit").text("แก้ไข");
    $("#editData" + categoryId).hide();
    $("#save" + categoryId).hide();
    $("#cancel" + categoryId).hide();
}

function deleteCategory() {
    if (!confirm(" ยืนยันการลบข้อมูล ")) {
        return false;
    }
    var catId;
    $("#tblCategory input:checkbox:checked").each(function () {
        catId = $(this).parent().siblings(":first").text();
        $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/deleteCategory",
            data: {
                catId: catId
            },
            success: function () {
                alert("ลบข้อมูลสำเร็จ");
                onLoadPageAfterCreateOrDeleteCategorySuccessful();
            },
            error: function () {
                alert("ลบข้อมูลไม่สำเร็จ");

            }
        });
    });
}
function editCategory(categoryId) {

    $("#tbodyCategory").find('catid').val(categoryId).hide();

    $("#editBtn" + categoryId).hide();
    $("#data" + categoryId).hide();
    $("#thEdit").text("บันทึก");
    $("#editData" + categoryId).show();
    //$("#updateBtn" + categoryId).show();
    $("#save" + categoryId).show();
    $("#cancel" + categoryId).show();
}

function updateCategory(categoryId) {

    if ($("#editData" + categoryId).val() == "") {
        alert("ชื่อหมวดหมู่ต้องไม่เป็นค่าว่าง")
    }
    else {
        var id = $("#id" + categoryId).text();
        var name = $("#editData" + categoryId).val();
        var dataResponse = $.ajax({
            type: "POST",
            url: context + "/TDCS/exam/editCategory",
            data: "id=" + id + "&name=" + name,
            complete: function (xhr) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        alert("แก้ไขข้อมูลสำเร็จ");
                        //listcat();
                        cancel(id);
                        $("#data" + categoryId).show();
                        $("#data" + categoryId).text(name);
                    }
                    else {
                        alert("แก้ไขข้อมูลไม่สำเร็จ");
                        return false;
                    }
                } else {
                    alert("แก้ไขข้อมูลไม่สำเร็จ");
                    return false;
                }
            }
        });
    }
}

function getCategoryUpdated(categoryId) {
    $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/getCategoryById",
        async: false,
        data: {
            categoryId: categoryId
        },
        success: function(data){
            $("#data" + categoryId).text(data.name);
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });
}

function saveCategory() {
    var countError = 0;
    var elementFirst;
    var element = [$("#categoryIdText"), $("#categoryNameText")];
    for (var i = 0; i < element.length; i++) {
        if (element[i].val() == "") {
            countError++;
            if (countError == 0) {
                elementFirst = element[i].selector;
            }
            element[i].attr('style', 'border:solid 1px red');
        } else {
            element[i].attr('style', '');
        }
    }
    if (countError > 0) {
        alert("กรุณากรอกข้อมูล");
        return false;
    }

    //if(checkCategoryCode($("#categoryIdText").val()) == 'false'){
    //    alert('รหัสหมวดหมู่ซ้ำ');
    //    $("#categoryIdText").attr('style', 'border:solid 1px red');
    //    return false;
    //}

    var categoryName = $("#categoryNameText").val();
    var categoryId = $("#categoryIdText").val();

    var dat = $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/addCategory",
        data: 'id=' + categoryId + '&name=' + categoryName,
        success: function () {
            //alert('เพิ่มวิชา ' + categoryName + ' สำเร็จ ');
            alert("บันทึกข้อมูลสำเร็จ");
            $("#createCat").modal('hide');
            onLoadPageAfterCreateOrDeleteCategorySuccessful();
        },
        error: function (xhr) {
            if (xhr.status == 418) {
                alert('บันทึกข้อมูลไม่สำเร็จ : รหัสหมวดหมู่นี้มีอยู่แล้วในระบบ')
            } else {
                alert('บันทึกข้อมูลไม่สำเร็จ : ไม่ทราบสาเหตุ')
            }
        }
    });
}


$("#categoryName").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listcat();
    }
});
function listcat() {
    //alert("LOV");
    var availableall = [];
    var categoryId = $("#categoryName").val();

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

    //var search = $("#categoryName").val();
    $("#categoryName").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val("").keyup().val(search);

}


function search(){
    var categoryIdRequest = $("#categoryName").val();
    categoryIdRequest +=' ';
    categoryIdRequest =categoryIdRequest.substr(0,categoryIdRequest.indexOf(' '));

    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/searchCategory",
        data: {
            id: categoryIdRequest
        },
        async: false,
        success: function (data) {
            if(data != null){
                searchResultFound();
                $("#tbodyCategory").empty();

                checkAll = 0;
                $("#selectAllCheckbox").prop('checked', false);

                data.forEach(function (value) {
                    var check = value.check;
                    var str = "";
                    if(check == true){
                        str = 'disabled';
                    }
                    if(check == false){
                        checkAll = checkAll + 1;
                    }

                    $("#tbodyCategory").append(
                        '<tr>' +
                        '<td class="col-sm-1" style="text-align: center;"><input class="selectCheckbox" type="checkbox" '+str+' cateId="' + value.category.id + '"/></td>' +
                        '<td class="col-sm-3" style="text-align: center;"><label id="id' + value.category.id + '">' + value.category.id + '</label>' +
                        '<input id="editId' + value.category.id + '" class="form-control input-sm" type="text" value="' + value.category.id + '" style="display: none;">' +
                        '<td><label id="data' + value.category.id + '">' + value.category.name + '</label>' +
                        '<input id="editData' + value.category.id + '" class="form-control input-sm" type="text" value="' + value.category.name + '" style="display: none;">' +
                        '</td>' +
                        '<td check="'+value.check+'" class="col-sm-1" style="text-align: center; padding-right: 0; padding-left: 0;"><button id="editBtn' + value.category.id + '" class="btn btn-primary btn-sm" onclick="editCategory(' + "'" + value.category.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                        '<button class="btn btn-success btn-sm" id="save' + value.category.id + '" style="display: none; margin: 5px;" type="button" onclick="updateCategory(' + "'" + value.category.id + "'" + ')"><span class="glyphicon glyphicon-ok"></span></button>' +
                        '<button class="btn btn-danger btn-sm" id="cancel' + value.category.id + '" style="display: none;" type="button" onclick="cancel(' + "'" + value.category.id + "'" + ')"><span class="glyphicon glyphicon-remove"></span></button>' +

                        '</td>' +
                        '</tr>'
                    )
                });
            }
            else{
                searchResultNotFound();
            }
        },
        error: function(){
            alert("error");
        }
    });
}

function count(){
    checkCurrent = 0;
    $(".selectCheckbox:not(':disabled')").each(function () {
        if($(this).is(':checked')){
            checkCurrent = checkCurrent + 1;
        }
    });
}

//function checkCategoryCode(code){
//
//    var check = $.ajax({
//        type: "POST",
//        url: context + "/TDCS/exam/checkCategoryCode",
//        async: false,
//        data: {
//            code : code
//        },
//        success: function(check){
//        }
//    }).responseText;
//
//    return check;
//}