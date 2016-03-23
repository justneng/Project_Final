var releaseExam = $('.release-exam');
var releaseDateField = $('#release-exam-date-field');
var releaseDateBtn = $('#release-exam-date-btn');
var releaseTimeFrom = $('#release-exam-time-from');
var currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
var jsonDev = [];
var jsonBA = [];
var jsonAllPosition = [];

releaseExam.on('click', function(){
    fillReleaseExamModal($(this).attr('positionid'));
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

function getStudentBySection(){
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getUsersInPosition",
        async: false,
        success: function(data){
            jsonDev = {};
            jsonBA = {};
            jsonAllPosition = {};

            data.forEach(function(value){
                if(Number(value.positionId) == 1){
                    var json = {};
                    json["userId"] = value.userId;
                    json["fname"] = value.fname;
                    json["lname"] = value.lname;
                    json["positionId"] = value.positionId;
                    json["positionName"] = value.positionName;
                    jsonDev.push(json);
                }
                else if(Number(this.positionId) == 2){
                    var json = {};
                    json["userId"] = value.userId;
                    json["fname"] = value.fname;
                    json["lname"] = value.lname;
                    json["positionId"] = value.positionId;
                    json["positionName"] = value.positionName;
                    jsonBA.push(json);
                }
                else{
                    var json = {};
                    json["userId"] = value.userId;
                    json["fname"] = value.fname;
                    json["lname"] = value.lname;
                    json["positionId"] = value.positionId;
                    json["positionName"] = value.positionName;
                    jsonAllPosition.push(json);
                }
            });
        },
        error: function(){
            alert("error");
        }
    });
}

function fillReleaseExamModal(positionId){
    var str = '';
    $('.form-horizontal').empty();
    if(positionId == 1){
        jsonDev.each(function(){
            str = '<div class="form-group">'+
                        '<div class="col-sm-3 text-right">'+
                            '<input type="checkbox"/>'+
                        '</div>'+

                        '<div class="col-sm-7">'+
                            this.fname + '"  "' + this.lname
                        '</div>'+
                    '</div>'
        });
    }
    else if(positionId == 2){
        jsonBA.each(function(){
            str = '<div class="form-group">'+
                '<div class="col-sm-3 text-right">'+
                '<input type="checkbox"/>'+
                '</div>'+

                '<div class="col-sm-7">'+
                this.fname + '"  "' + this.lname
            '</div>'+
            '</div>'
        });
    }
    else{
        jsonAllPosition.each(function(){
            str = '<div class="form-group">'+
                '<div class="col-sm-3 text-right">'+
                '<input type="checkbox"/>'+
                '</div>'+

                '<div class="col-sm-7">'+
                this.fname + '"  "' + this.lname
            '</div>'+
            '</div>'
        });
    }

    $('.form-horizontal').append(
        '<div class="form-group">'+
        '<div class="col-sm-3 text-right">'+
        '<input type="checkbox"/>'+
        '</div>'+

        '<div class="col-sm-7">'+
        str +
        '</div>'+
        '</div>'
    );

}
