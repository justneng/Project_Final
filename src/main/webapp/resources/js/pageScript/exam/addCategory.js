function saveCategory(){
    var categoryName = $("#categoryNameText").val();
    var categoryId = $("#categoryIdText").val();
    var failed = false;

    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllCategory",
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                if (Number($("#categoryIdText").val()) == Number(value.id) && $("#categoryNameText").val() == value.name) {
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + ", ชื่อหมวดหมู่ " + $("#categoryNameText").val() + " มีอยู่แล้วในระบบ");
                }
                if (Number($("#categoryIdText").val()) == Number(value.id)) {
                    //alert("รหัสวิชา "+$("#categoryId").val()+" ซ่ำ");
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + " มีอยู่แล้วในระบบ");
                }
                if ($("#categoryNameText").val() == value.name) {
                    alert("ชื่อหมวดหมู่ " + $("#categoryName").val() + " มีอยู่แล้วในระบบ");
                }
            });

            var dat = $.ajax({
                type: "POST",
                url: context+"/TDCS/exam/addCategory",
                data: 'id=' + categoryId + '&name=' + categoryName,
                success: function () {
                    //alert('เพิ่มวิชา ' + categoryName + ' สำเร็จ ');
                    alert("บันทึกข้อมูลสำเร็จ")
                    viewCategory()
                    $("#createCat").modal('hide')
                },
                error: function () {
                    failed = true;
                }
                //}).responseText;
            });
        },
        error: function (data) {
            failed = true;
        }
    });
    if(failed){
        alert('บันทึกข้อมูลไม่สำเร็จ');
    }
    $("#categoryNameText").val("");
    $("#categoryIdText").val("");
}



