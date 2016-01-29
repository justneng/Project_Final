/**
 * Created by JOKIZZ on 17/8/2558.
 */


$("#dropdownExamEmp").attr('class', 'dropdown-toggle active');

$(document).ready(function () {
    $("#alertMess").hide();
    $("#selectAllSubCategory").prop('checked',false);
    clearsearch();
    search();
});

$("tbody").on('click',".selectSubCategory",function(){
    if($(".selectSubCategory:enabled").size() == $(".selectSubCategory:enabled:checked").size()){
        $("#selectAllSubCategory").prop('checked',true);
    }else{
        $("#selectAllSubCategory").prop('checked',false);
    }
});

$("#searchSubCategory").on('click', function () {
    search();
});

$("#clearsearchinput").on('click', function () {
    clearsearch();
});

$("#selectAllSubCategory").on('click', function () {
    if (this.checked) {
        $(".selectSubCategory:enabled").each(function () {
            this.checked = true;
        })
    }
    else {
        $(".selectSubCategory:enabled").each(function () {
            this.checked = false;
        })
    }
});

$("#addSubcategory").on('click', function(){
    $("#sCat").val("");
    $("#subcategoryNameadd").val("");
})

function deleteSubCategory(subCategoryId) {
    if (!confirm(" ยืนยันการลบข้อมูล ")) {
        return false;
    }
    $("#tbodySubCategory input:checkbox:checked").each(function () {
        var subCategoryId = ($(this).attr('subCatId'));
        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/deleteSubCategory",
            data: {
                id: subCategoryId
            },
            async: false,
            success: function () {
                alert(' ลบข้อมูลสำเร็จ ');
                search()
            },
            error: function (xhr) {
                if(xhr.status == 418){
                    alert("ลบข้อมูลไม่สำเร็จ : ข้อมูลถูกใช้งาน");
                }else{
                    alert("ลบข้อมูลไม่สำเร็จ");
                }
            }
        });
    })
}

function editSubCategory(subcategoryId) {
    $("#editBtn" + subcategoryId).hide();
    $("#subName" + subcategoryId).hide();
    $("#editsubName" + subcategoryId).show();
    $("#updateBtn" + subcategoryId).show();
    $("#cancleUpdateBtn" + subcategoryId).show();
}

function cancleEditSubCategory(subcategoryId){
    $("#editBtn" + subcategoryId).show();
    $("#subName" + subcategoryId).show();
    $("#editsubName" + subcategoryId).hide();
    $("#editsubName" + subcategoryId).val($("#subName" + subcategoryId).text());
    $("#updateBtn" + subcategoryId).hide();
    $("#cancleUpdateBtn" + subcategoryId).hide();
}

function updateSubCategory(subcategoryId) {

    var subName = $("#editsubName" + subcategoryId).val();
    var subNameDiv = $("#subName"+subcategoryId)
    console.log(subName+" : "+subNameDiv.text())
    if (subName == "") {
        alert("ไม่สามารถเป็นค่าว่างได้");
    }else if(subName == subNameDiv.text()){
        cancleEditSubCategory(subNameDiv.attr('subCatId'));
        return null;
    }

    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/editSubCategory",
        data: {
            subcategoryId: subcategoryId,
            subcategoryName: subName
        },
        complete: function (xhr) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert("แก้ไขข้อมูลสำเร็จ");
                    //window.location.reload();
                    subNameDiv.text(subName)
                    cancleEditSubCategory(subNameDiv.attr('subCatId'));
                }
                else {
                    alert("ชื่อซ้ำ");
                }
            } else {
                alert("แก้ไขข้อมูลไม่สำเร็จ");
            }
        }
    });
}

function clearsearch() {
    $("#categoryId").val("");
    $("#sSubCat").empty();
}

function search() {
    var categoryId = $("#categoryId").val();
    var subcategoryName = $("#sSubCat").val();
    var length = $("#categoryId").val().length;
    categoryId += " ";
    categoryId = categoryId.substr(0, categoryId.indexOf(' '));

    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/searchSubCategory",
        data: {
            categoryId: categoryId,
            subcategoryName: subcategoryName
        },
        async: false,
        success: function (data) {
            $("#tbodySubCategory").empty();
            if (data.size == null) {
                $("#alertMess").show();
            }
            data.forEach(function (value) {
                $("#alertMess").hide();
                var trCode =
                    '<tr>'
                if(value.isUsed){
                    trCode += '<td style="text-align: center;"><input class="selectSubCategory" disabled type="checkbox" subCatId="' + value.id + '"></input>'
                }else{
                    trCode += '<td style="text-align: center;"><input class="selectSubCategory" type="checkbox" subCatId="' + value.id + '"></input>'
                }
                trCode +=
                    '<td style="text-align: left;"><label id="catName' + value.category.name + '">' + value.category.id + " : " + value.category.name + '</label>' +
                    '</td>' +
                    '<td style="text-align: left;"><label subCatId="'+value.id+'" id="subName' + value.id + '">' + value.name + '</label>' +
                    '<input id="editsubName' + value.id + '" class="form-control" type="text" value="' + value.name + '" style="display: none;">' +
                    '<td style="text-align: center">' +
                    '<button id="editBtn' + value.id + '" type="button" class="btn btn-primary btn-sm" onclick="editSubCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                    '<button id="updateBtn' + value.id + '" class="btn-sm btn btn-success" style="display: none;" onclick="updateSubCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-ok"></span></button>' +
                    '&nbsp;<button id="cancleUpdateBtn' + value.id + '" class="btn-sm btn btn-danger" style="display: none;" onclick="cancleEditSubCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-remove"></span></button></td>' +
                    '</td>' +
                    '</tr>'

                $("#tbodySubCategory").append(trCode);
            });

        },
        error: function () {
            alert("error");
        }
    })





}

/////////////////////////////////////////////LOV+++++

$("#categoryId").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listsubcat();
    }
});
function listsubcat() {
    var availableall = [];
    var categoryId = $("#categoryId").val();

    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllCategory",
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
    var search = $("#categoryId").val();
    $("#categoryId").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
};

$("#categoryId, #selectCategoryToSelection, #selectCategoryToSelectionForRandom").on('change', function () {
        $("#sSubCat").empty();
        var categoryId = $("#categoryId").val();
        var subcategoryName = $("#sSubCat").val();
        if(categoryId.trim() !=""){
            if(categoryId.indexOf(':')!=-1){
                categoryId.indexOf(':');
                var categoryId2 =  categoryId.substr(0, categoryId.indexOf(' '));
                categoryId = categoryId2;
                selectSubCatUpdate(categoryId);
            }else{
                selectSubCatUpdate(categoryId);
            }
        }else{
            selectSubCatUpdate(null)
        }
    }
)

function selectSubCatUpdate(categoryId){
    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getSubCategoryToDropDown",
        data: {
            categoryId: categoryId
        },
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                $("#sSubCat").append(
                    '<option >' + value.SubCategory.name + '</option>'
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
    else if (($("#sSubCat").val() != null)) {
        $("#sSubCat").prepend(
            '<option value="" selected></option>'
        )
    }
}






