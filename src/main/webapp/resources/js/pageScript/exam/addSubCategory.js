function saveSubCategory() {
    var countError = 0;
    var elementFirst;
    var element = [ $("#subcategoryNameadd"), $("#sCat")];
    for(var i=0;i<element.length;i++){
        if(element[i].val()==""){
            countError++;
            if(countError==0){
                elementFirst = element[i].selector;
            }
            element[i].attr('style','border:solid 1px red');
        }else{
            element[i].attr('style','');
        }
    }
    if(countError>0){
        alert("กรุณากรอกข้อมูล");
        return false;
    }
    var categoryId = $("#sCat").val();
    var categoryName = $("#sCat").children(":selected").attr("categoryName");
    var subcategoryNameadd = $("#subcategoryNameadd").val().trim();

    var dat = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/addSubCategory",
        data: {
            categoryId: categoryId,
            subcategoryNameadd: subcategoryNameadd
        },
        success: function (xhr) {
            alert("บันทึกข้อมูลสำเร็จ");
            search()
            $("#createSub").modal('hide')
        },
        error: function (xhr) {
            if(xhr.status == 418){
                alert('บันทึกข้อมูลไม่สำเร็จ : หัวข้อเรื่องนี้มีอยู่แล้วในระบบ');
            }
        }
    });
}