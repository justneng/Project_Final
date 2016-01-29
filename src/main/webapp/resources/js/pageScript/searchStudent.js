/**
 * Created by l3eal2 on 13/3/2558.
 */

var data2, chkData = 0 , checkTime;
status = status.trim();
var thName = [];
var checkId;
$(document).ready(function () {
    $("#table").hide();

    $("#addSearch").attr('class', 'dropdown active');

    $("#sStartTime").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    $("#sEndTime").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    $("#sStartTime").change(function () {
//        if ($("#startTime").val() != "" && $("#endTime").val() != "") {
            var s = $("#startTime").val().split("/")
            var e = $("#endTime").val().split("/")
            timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
//        }
    });

    $("#sEndTime").change(function () {
//        if ($("#startTime").val() != "" && $("#endTime").val() != "") {
            var s = $("#startTime").val().split("/")
            var e = $("#endTime").val().split("/")
            timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
//        }
    });


    $("#search").click(function () {
        var s = $("#startTime").val().split("/")
        var e = $("#endTime").val().split("/")
        timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
        if (!checkTime) {
            search();
            if(status != 'staff'){
                for(var i = 0 ; i < data2.length ; i++){
                    $('#resultSearch').append('<tr align="center">' +
                                                '<td>'+
                                                '<form method="post" action="'+context+'/TDCS/viewData.html"><input value="' + data2[i].userId + '" name="id" style="display: none;" /><button type="submit" class="btn btn-info" id="' + data2[i].userId + '">Info</button></form>'+
                                                '</td>'+
                                                '<td>'+ data2[i].empId+'</td>'+
                                                '<td>'+ data2[i].thFname +'</td>'+
                                                '<td>'+ data2[i].university +'</td>'+
                                                '<td>'+ data2[i].major +'</td>'+
                                                '<td>'+ data2[i].apprentice +'</td>'+
                                                '<td>'+ data2[i].startWork +'</td>'+
                                              '</tr>')
                }
            }else{
                for(var i = 0 ; i < data2.length ; i++){
                    $('#resultSearch').append('<tr align="center">' +
                                                '<td>'+
                                                '<form method="post" action="'+context+'/TDCS/viewData.html"><input value="' + data2[i].userId + '" name="id" style="display: none;" /><button type="submit" class="btn btn-info" id="' + data2[i].userId + '">Info</button></form>'+
                                                '</td>'+
                                                '<td>'+ data2[i].empId+'</td>'+
                                                '<td>'+ data2[i].thFname +'</td>'+
                                                '<td>'+ data2[i].university +'</td>'+
                                                '<td>'+ data2[i].major +'</td>'+
                                                '<td>'+ data2[i].apprentice +'</td>'+
                                                '<td>'+ data2[i].startWork +'</td>'+
                                                '<td>'+ data2[i].evaGrade +'</td>'+
                                              '</tr> ')
                }
            }



            if (chkData != 0) {
                $("#table").show();
                console.log("have data");
            }
            else {
                $("#table").hide();
                console.log("don't have data");
            }
        } else {
            alert('คุณเลือกระยะฝึกงานไม่ถูกต้อง');
        }
//      COMMENT BY PEEM
//            if (status != 'staff') {
//                console.log("not staff");
//                $("#forAddResultTable").html(
//                        '<table id="table"' +
////                    'data-query-params="queryParams"'+
//                        'data-pagination="true"' +
//                        'data-page-list="[10, 20, 50, 100, 200]"' +
////                    'data-show-toggle="true"' +
//                        'data-sort-name="empId"' +
//                        'data-sort-order="desc">' +
//                        '<thead class="bg-primary">' +
//                        '<tr>' +
//                        '<th data-field="viewData" data-align="center">ดูข้อมูล</th>' +
//                        '<th data-field="empId" data-align="center" data-sortable="true">รหัสนักศึกษา</th>' +
//                        '<th data-field="thFname" data-align="center" data-sortable="true">ชื่อ-นามสกุล</th>' +
//                        '<th data-field="university" data-align="center" data-sortable="true">สถาบัน</th>' +
//                        '<th data-field="major" data-align="center" data-sortable="true">สาขา</th>' +
//                        '<th data-field="apprentice" data-align="center" data-sortable="true">ประเภทการฝึก</th>' +
//                        '<th data-field="position" data-align="center" data-sortable="true">ตำแหน่ง</th>' +
//                        '<th data-field="startWork" data-align="center">ระยะเวลาฝึก</th>' +
//                        '</tr>' +
//                        '</thead>' +
//                        '</table>'
//                );
//            } else {
//                console.log("staff");
//                $("#forAddResultTable").html(
//                        '<table id="table"' +
////                    'data-query-params="queryParams"'+
//                        'data-pagination="true"' +
//                        'data-page-list="[10, 20, 50, 100, 200]"' +
////                    'data-show-toggle="true"' +
//                        'data-sort-name="empId"' +
//                        'data-sort-order="desc">' +
//                        '<thead class="bg-primary">' +
//                        '<tr>' +
//                        '<th data-field="viewData" data-align="center">ดูข้อมูล</th>' +
//                        '<th data-field="empId" data-align="center" data-sortable="true">รหัสนักศึกษา</th>' +
//                        '<th data-field="thFname" data-align="center" data-sortable="true">ชื่อ-นามสกุล</th>' +
//                        '<th data-field="university" data-align="center" data-sortable="true">สถาบัน</th>' +
//                        '<th data-field="major" data-align="center" data-sortable="true">สาขา</th>' +
//                        '<th data-field="apprentice" data-align="center" data-sortable="true">ประเภทการฝึก</th>' +
//                        '<th data-field="position" data-align="center" data-sortable="true">ตำแหน่ง</th>' +
//                        '<th data-field="evaGrade" data-align="center">ผลการประเมิน</th>' +
//                        '</tr>' +
//                        '</thead>' +
//                            '<tbody id="resultSearch">' +
//                            '</tbody>'+
//                        '</table>'
//                );
//            }
//      COMMENT BY PEEM


            //$('#table').bootstrapTable({
            //    data: data2
            //});  COMMENT BY PEEM

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
            url: context+'/TDCS/searchStudentData',
            data: {
                tFname: spNames,
                tLname: spLastName,
                nickName: $("#sNickName").val(),
                univer: $("#sUniversity").val(),
                fac: $("#sFaculty").val(),
                major: $("#sMajor").val(),
                staff: $("#sStaff").val(),
                job: $("#sPosition").val(),
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
                var stDate = data2[j].startWork.split('/');
                var enDate = data2[j].endWork.split('/');
                var dsString = stDate[2] + "," + stDate[1] + "," + stDate[0];
                var deString = enDate[2] + "," + enDate[1] + "," + enDate[0];
                var d1 = new Date(dsString);
                var d2 = new Date(deString);
                var grade;
                data2[j].startWork = DateDiff.inMonths(d1, d2) + " เดือน";
                data2[j].university = data2[j].universityFacultyMajor.universityFaculty.university.university_name;
                data2[j].major = data2[j].universityFacultyMajor.major.majName;
                data2[j].apprentice = data2[j].apprentice.aptName;
                data2[j].position = data2[j].position.posiName;
                data2[j].thFname += " " + data2[j].thLname;
                if (data2[j].evaGrade == null)
                    data2[j].evaGrade = "ยังไม่มีการประเมิน";
                else grade = data2[j].evaGrade;
            }
            $("#alertMess").hide();
            chkData = 1;
        } else {
            chkData = 0;
            $("#alertMess").hide();
            $("#alertMess").slideDown();
        }
        console.log(data2);
        console.log(data);
    }

    $("#cancel").click(function () {
        window.location.href = context+"/TDCS/searchStudent.html";
    });

});

function timediff(start_actual_time, end_actual_time) {
    start_actual_time = new Date(start_actual_time);
    end_actual_time = new Date(end_actual_time);

    var diff = end_actual_time - start_actual_time;

    var diffSeconds = diff / 1000;
    var HH = Math.floor(diffSeconds / 3600);
    var MM = Math.floor(diffSeconds % 3600) / 60;

    var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
    if (formatted.charAt(1) == '-' || formatted == '00:00') {
        $('#aleartdata').html("คุณเลือกระยะฝึกงานไม่ถูกต้อง");
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