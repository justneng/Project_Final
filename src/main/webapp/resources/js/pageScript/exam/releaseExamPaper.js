var releaseDateField = $('#release-exam-date-field');
var releaseDateBtn = $('#release-exam-date-btn');
var currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
var currentPaperCode = "";

$(document).ajaxStart(function(){
    $('#on-loading').css('display', 'block');
});

$(document).ajaxComplete(function(){
    $('#on-loading').css('display', 'none');
});

$(document).on('click', '.release-exam', function(){
    $('#open-exam-only-today').prop('checked', false);
    $('.get-currentdate').text(getCurrentDateThaiFormat());
    var paperCode = $(this).attr('papercode');
    currentPaperCode = paperCode;
    var paperName = $(this).attr('paperName');
    var positionId = $(this).attr('positionid');
    var currentDate = getCurrentDateSQLFormat(new Date());
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getUsersInPosition?paperCode=" + paperCode + "&positionId=" + positionId,
        async: false,
        success: function(data){
            $('#release-exam-modal').modal('show');
            $('form[where="add-student"]').empty();
            $('#student-in-rule').empty();
            $('#label-modal-header').empty().append(
                paperCode + ' : ' + paperName
            );

            data.forEach(function(value){
                if(value.release == 'Y'){
                    $('.modal-footer').hide();
                    $('#setting-2').show();
                    if(Number(value.intime) == 1){
                        $('#student-in-rule').append(
                            '<li>' + value.fname + ' ' + value.lname + '&nbsp;<span class="label label-success">ทำชุดข้อสอบเรียบร้อยแล้ว</li>'
                        );
                    }
                    else{
                        $('#student-in-rule').append(
                            '<li>' + value.fname + ' ' + value.lname + '</li>'
                        );
                    }
                }
                else{
                    $('.modal-footer').show();
                    $('#setting-1').show();
                    fillDataToReleaseExamModal(value.userId, value.fname, value.lname, value.permiss);
                }
            });
        },
        error: function(){
            alert("error");
        }
    });

});

$('#release-exam-modal').on('hidden.bs.modal', function(){
    $('#setting-2').hide();
    $('#setting-1').hide();
    $('.modal-footer').hide();
    $('#add-student-collapse').removeClass('in');
});

$("#save-rule-btn").on('click', function(){
    var userIds = [];
    var currentDate = getCurrentDateSQLFormat();
    var paperCode = currentPaperCode;

    $('.add-permiss').each(function(){
        if(this.checked){
            userIds.push($(this).attr('userid'));
        }
    });

    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/addReleaseExamPaperRule?userIds=" + userIds + "&currentDate=" + currentDate + "&paperCode=" + paperCode,
        async: false,
        success: function(data){
            alert("บันทึกการตั้งค่าเรียบร้อยแล้ว");
        },
        error: function(){
            alert("error");
        }
    });
});

releaseDateField.datepicker({
    startDate: currentDate
});

releaseDateField.datepicker().on('changeDate', function () {
    releaseDateField.datepicker('hide');
});

releaseDateBtn.on('click', function () {
    var input = releaseDateField;
    input.datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });
    input.focus();
});

function fillDataToReleaseExamModal(userId, fname, lname, permiss){
    $('form[where="add-student"]').append(
        '<div class="form-group">'+
            '<div class="col-sm-3 text-right">'+
                '<input class="add-permiss" userId="'+userId+'" type="checkbox"/>'+
            '</div>'+

            '<div class="col-sm-7">'+
                '<label class="label-on-release-exam-modal">'+ fname + ' ' + lname + '</label>'+
            '</div>'+
        '</div>'
    );
}

var getCurrentDateThaiFormat = function(){
    var month = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
        "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
        "ตุลาคม", "พฤศจิกายน", "ธันวาคม");

    var date = new Date();
    var currentDate = date.getDate();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    return currentDate + " " + month[currentMonth] + " " + (currentYear + 543);
};

var getCurrentDateSQLFormat = function(){
    //var month = new Array("JAN", "FEB", "MAR",
    //    "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
    //    "OCT", "NOV", "DEC");

    var month = new Array("01", "02", "03",
        "04", "05", "06", "07", "08", "09",
        "10", "11", "12");

    var date = new Date();
    var currentDate = date.getDate();
    var currentMonth = date.getMonth();
    var currentFullYear = date.getFullYear();
    //var current2DigitYear = currentFullYear.substring(1, 3);
    return currentDate + "/" + month[currentMonth] + "/" + currentFullYear;
};