/**
 * Created by l3eal2 on 13/3/2558.
 */
var data2 , checkTime,chkData=0;
$(document).ready(function () {
    $("#table").hide();

    $("#addSearch").attr('class', 'dropdown active');
    $("#sStartTime").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });
    $("#sEndTime").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });

    $("#sStartTime").change(function () {
//        if ($("#startTime").val() != "" && $("#endTime").val() != "") {
            var s = $("#startTime").val().split("/")
            var e = $("#endTime").val().split("/")
            timediffInPage(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
//        }
    });

    $("#sEndTime").change(function () {
//        if ($("#startTime").val() != "" && $("#endTime").val() != "") {
            var s = $("#startTime").val().split("/")
            var e = $("#endTime").val().split("/")
            timediffInPage(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
//        }
    });

    $("#search").click(function () {
        var s = $("#startTime").val().split("/")
        var e = $("#endTime").val().split("/")
        timediffInPage(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
        if (!checkTime) {
            search();
            //CREATE BY PEEM
            for(var i = 0 ; i < data2.length ; i++) {
                $('#resultSearch').append('<tr align="center">' +
                '<td>'+
                '<form method="post" action="'+context+'/TDCS/viewStaffData.html"><input value="' + data2[i].userId + '" name="id" style="display: none;" /><button class="btn btn-info" id="' + data2[i].userId + '">Info</button></form>'+
                '</td> ' +
                '<td>' + data2[i].empId + '</td>' +
                '<td>' + data2[i].thFname + '</td>' +
                '<td>' + data2[i].company + '</td>' +
                '<td>' + data2[i].sectionPosition + '</td>' +
                '<td>' + data2[i].position + '</td>' +
                '<td>' + data2[i].sectionPosition + '</td>' +
                '<td>' + data2[i].startWork + '</td>' +
                '</tr> ')
            };
            //CREATE BY PEEM

            //$('#table').bootstrapTable({
            //    data: data2
            //}); COMMENT BY PEEM
            if (chkData != 0)
                $("#table").show();
            else
                $("#table").hide();
        }else {
            alert('คุณเลือกระยะเวลาไม่ถูกต้อง');
        }
            // COMMENT BY PEEM
            //$("#forAddResultTable").hide();
            //
            //$("#forAddResultTable").html(
            //        '<table id="table"' +
            //        'data-pagination="true"' +
            //        'data-page-list="[10, 20, 50, 100, 200]"' +
            //        'data-sort-name="empId"' +
            //        'data-sort-order="asc">' +
            //        '<thead class="bg-primary">' +
            //        '<tr>' +
            //        '<th data-field="empId" data-align="center" data-sortable="true">รหัสพนักงาน</th>' +
            //        '<th data-field="thFname" data-align="center" data-sortable="true">ชื่อ-นามสกุล</th>' +
            //        '<th data-field="company" data-align="center" data-sortable="true">สังกัด</th>' +
            //        '<th data-field="team" data-align="center" data-sortable="true">ทีม</th>' +
            //        '<th data-field="position" data-align="center" data-sortable="true">ตำแหน่ง</th>' +
            //        '<th data-field="sectionPosition" data-align="center" data-sortable="true">แผนก</th>' +
            //        '<th data-field="startWork" data-align="center">ระยะเวลาการทำงาน</th>' +
            //        '</tr>' +
            //        '</thead>' +
            //        '</table>'
            //);
            // COMMENT BY PEEM
    });

    function search() {
        var spName;
        var spNames;
        var spLastName;
        if ($("#sName").val() != "") {
            spName = $("#sName").val().split(" ");
            spNames = spName[0];
            spLastName = spName[1];
        }
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/searchStaffData',
            data: {
                tFname: spNames,
                tLname: spLastName,
                nickName: $("#sNickName").val(),
                empId: $("#sEmpId").val(),
                company: $("#sCompany").val(),
                section: $("#sSection").val(),
                position: $("#sPosition").val(),
                startTime: $("#startTime").val(),
                endTime: $("#endTime").val()
            },
            beforeSend: function () {
                $('.dv-background').show();
            },
            complete: function () {
                $('.dv-background').hide();
            },
            async: false
        }).responseText;



        if (data != "") {
            $('#resultSearch').empty();
            data2 = JSON.parse(data);
            for (var j = 0; j < data2.length; j++) {
                data2[j].thFname = data2[j].thFname + " " + data2[j].thLname;
                //data2[j].team = data2[j].team.teamName;
                data2[j].company = data2[j].company.compName;
                data2[j].position = data2[j].sectionPosition.position.posiName;
                data2[j].sectionPosition = data2[j].sectionPosition.section.sectionName;
                var stDate = data2[j].startWork.split('/');
                var dsString = stDate[2] + "," + stDate[1] + "," + stDate[0];
                var d1 = new Date(dsString);
                var d2 = new Date();

                data2[j].startWork = DateDiff.inYears(d1, d2) + " ปี "+Math.floor(DateDiff.inMonths(d1, d2)/12)+" เดือน";
            }
            console.log(data2);
            $("#alertMess").hide();
            chkData = 1;
        } else {
            chkData = 0;
            $("#alertMess").hide();
            $("#alertMess").slideDown();
        }
    }
});

function timediffInPage(start_actual_time, end_actual_time) {
    start_actual_time = new Date(start_actual_time);
    end_actual_time = new Date(end_actual_time);

    var diff = end_actual_time - start_actual_time;

    var diffSeconds = diff / 1000;
    var HH = Math.floor(diffSeconds / 3600);
    var MM = Math.floor(diffSeconds % 3600) / 60;

    var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
    if (formatted.charAt(1) == '-' || formatted == '00:00') {
        $('#aleartdata').html("คุณเลือกระยะเวลาไม่ถูกต้อง");
        $('#aleartdata').slideDown();
        checkTime = true;
    } else {
        $('#aleartdata').slideUp();
        checkTime = false;
    }
};

//---------------- EDIT BY PEEM ---------------------------
//window.actionEvents = {
//    'click .reset': function (e, value, row, index) {
//        if (confirm("คุณต้องการรีเซ็ตรหัสผ่านของ " + row.thFname + " (" + row.empId + ")")) {
//            var rString = randomString(8);
//            var id = row.userId;
//            var email = row.userName + "@internal.ssg";
//            var data = $.ajax({
//                type: "POST",
//                url: '/TDCS/resetPassword',
//                data: {
//                    id: id,
//                    email: email,
//                    newPass: rString
//                },
//                beforeSend: function () {
//                    $('.dv-background').show();
//                },
//                complete: function () {
//                    $('.dv-background').hide();
//                },
//                async: false
//            }).responseText;
//            alert(data)
//        }
////            console.log(value, row, index);
//    }
//};
//---------------- EDIT BY PEEM ---------------------------