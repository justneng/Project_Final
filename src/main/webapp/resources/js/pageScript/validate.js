/**
 * Created by l3eal2 on 24/3/2558.
 */

$(document).ready(function () {
    $("#validate").attr('class', 'dropdown active');

    for(var i = 1;i<=maxPage;i++) {
        if(currentPage == i) {
            $("#pageClass" + i).attr('class', 'active');
            $("#pageLink" + i).attr('href', 'javascript:void(0)');
        }
    }

    if(currentPage == 1)
        $("#previousPageClass").attr('class','disabled');
    if(currentPage == maxPage)
        $("#nextPageClass").attr('class','disabled');

    $("#previousPage").click(function(){
        if(currentPage != 1) {
            currentPage--;
            window.location.href = context+"/TDCS/validate.html?page=" + currentPage;
        }
    });

    $("#nextPage").click(function(){
        if(currentPage != maxPage) {
            currentPage++;
            window.location.href = context+"/TDCS/validate.html?page=" + currentPage;
        }
    });

    $("#subValidate").click(function () {
        var size = $('tbody').children().length;
        var sizeOfCheckBox = 0;
        $('.dv-background').show();
        for (var i = 0; i < size; i++) {
            if ($('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().is(':checked')) {
                sizeOfCheckBox++;
                var data = $.ajax({
                    type: "POST",
                    url: context+'/TDCS/setValidate',
                    data: {
                        id: $('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().val()
                    },
                    beforeSend: function () {
//                            $('.dv-background').show();
                    },
                    complete: function () {
//                            $('.dv-background').hide();
                    }, success: function () {
//                            alert('บันทึกข้อมูลสำเร็จ');
//                            window.location.href = "/TDCS/validate.html";
                    }, error: function () {
//                            alert('2')
                    },
                    async: false
                }).responseText;
                var data = $.ajax({
                    type: "POST",
                    url: context+'/TDCS/sendmailForValidate',
                    data: {
                        uId: $('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().val()
                    },
                    async: false
                }).responseText;
            }
        }
        $('.dv-background').hide();
        if (sizeOfCheckBox == 0)
            alert('กรุณาเลือกนักศึกษาที่จะอนุมัติ');
        else {
            alert('บันทึกข้อมูลสำเร็จ');
            window.location.href = context+"/TDCS/validate.html";
//                window.location.reload();
        }
    });

    $("#disValidate").click(function () {
        var size = $('tbody').children().length;
        var sizeOfCheckBox = 0;
        for (var i = 0; i < size; i++) {
            if ($('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().is(':checked')) {
                sizeOfCheckBox++;
            }
        }
        if (sizeOfCheckBox == 0) {
            alert('กรุณาเลือกนักศึกษาที่จะไม่อนุมัติ');
        } else {
            $("#myModal").modal("show");
        }
    });

    $("#sendEmail").click(function () {
        if($("#message").val() != "") {
            var size = $('tbody').children().length;
            for (var i = 0; i < size; i++) {
                if ($('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().is(':checked')) {
                    var data = $.ajax({
                        type: "POST",
                        url: context+'/TDCS/sendmailForNotValidate',
                        data: {
                            uId: $('tbody').children('tr:eq(' + i + ')').children('td:eq(0)').children().val(),
                            message: $("#message").val()
                        }, success: function () {
//                            alert('success');
//                            window.location.href = "/TDCS/validate.html";
                        }, error: function () {
//                            alert('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
//                            return false;
//                            window.location.href = "/TDCS/validate.html";
                        },
                        async: false
                    }).responseText;
                }
            }
            alert('ระบบส่ง E-mail เรียบร้อยแล้ว');
            window.location.href = context+"/TDCS/validate.html";
        }else {
            alert('กรุณากรอกเหตผลที่ไม่อนุมัติ');
            $("#message").focus();
        }
    });

    $("#checkAll").click(function () {
        if ($("#checkAll").is(':checked')) {
            $('input:checkbox').not(this).prop('checked', this.checked);
        } else {
            $('input:checkbox').removeAttr('checked');
        }
    });

});