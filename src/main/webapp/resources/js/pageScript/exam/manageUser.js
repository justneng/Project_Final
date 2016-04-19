var checkie;

$(document).ready(function(){
    $("#startTime, #endTime").datepicker();

    $("#startTime, #endTime").datepicker().on('changeDate', function () {
        $("#startTime, #endTime").datepicker('hide');
    });

    $('#searchUsers').on('click', function(){
        searchUsers();
    });

    $('.reset-input-search').on('click', function(){
        $('#sName, #sNickName, #sEmpId, #email, #startTime, #endTime').val('');
        $('#sPosition').val("");
        $('#userType').val(0);
    });
});

function searchUsers(){
    var spName;
    var spNames;
    var spLastName;

    if($("#sName").val() != "") {
        spName = $("#sName").val().split(" ");
        spNames = spName[0];
        spLastName = spName[1];
    }

    //var s = $("#startTime").val().split("/");
    //var e = $("#endTime").val().split("/");
    //timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00", 3);
    //
    //if(checkie == false){
    //    return false;
    //}

    $.ajax({
        type: "POST",
        url: context + '/TDCS/searchUserData',
        async: false,
        data: {
            tFname: spNames,
            tLname: spLastName,
            nickName: $("#sNickName").val(),
            empId: $("#sEmpId").val(),
            company: $("#sCompany").val(),
            section: $("#sSection").val(),
            position: $("#sPosition").val(),
            startTime: $("#startTime").val(),
            endTime: $("#endTime").val(),
            userType: $("#userType").val()
        },
        success: function (data) {
            if(data != null){
                usersFound();
                $('#resultSearch').empty();
                data.forEach(function(val){
                    var status;
                    var email;
                    var position;
                    var block;

                    if((val.enabled == 0) && (val.loginFailedTimeTo == null) && (val.loginFailedTimeFrom == null) ){
                        block = '<button class="btn btn-danger btn-sm reset-block-user" empId="'+val.empId+'" name="'+val.thFname + '&nbsp;&nbsp;' + val.thLname+'">ยกเลิกบล็อก</button>';
                    }

                    else{
                        block = '<button class="btn btn-link btn-sm block-user" empId="'+val.empId+'" name="'+val.thFname + '&nbsp;&nbsp;' + val.thLname+'">บล็อก</button>';
                    }

                    if(val.position == null? position = "": position = val.position.posiName);

                    if(Number(val.status) == 1){
                        status = "ผู้ดูแลระบบ";
                        email = val.eMail1+"@softsquaregroup.com";
                    }
                    else if(Number(val.status) == 2){
                        status = "พนักงาน";
                        email = val.eMail1+"@softsquaregroup.com";
                    }
                    else{
                        status = "นักศึกษา";
                        email = val.eMail1+"@internal.ssg";
                    }

                    $('#resultSearch').append(
                        '<tr>'+
                        '<td>' + val.empId + '</td>' +
                        '<td>' + val.thFname + '&nbsp;&nbsp;' + val.thLname +'</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' + position + '</td>' +
                        '<td>' + email + '</td>' +
                        '<td>' + block + '</td>' +
                        '<td><button class="btn btn-primary btn-sm delete-user" empId="'+val.empId+'" name="'+val.thFname + '&nbsp;&nbsp;' + val.thLname+'">ลบ</button></td>' +
                        '</tr> '
                    )
                });
            }

            if(data.length <= 0){
                usersNotFound();
            }

        }
    });
}

$(document).on('click', '.block-user', function(){
    if (confirm("คุณต้องการบล็อกบัญชีของ : " + $(this).attr('name') + " ใช่หรือไม่?")) {
        $.ajax({
            type: "POST",
            url: context + '/TDCS/exam/blockUser?empid=' + $(this).attr('empid'),
            async: false,
            success: function () {
                alert('บล็อกบัญชีผู้ใช้งานเรียบร้อยแล้ว');
                searchUsers();
            },
            error: function () {
                alert('เกิดข้อผิดพลาด');
            }
        });
    }
});

$(document).on('click', '.delete-user', function(){
    if (confirm("คุณต้องการลบบัญชีของ : " + $(this).attr('name') + " ใช่หรือไม่?")) {
        $.ajax({
            type: "POST",
            url: context + '/TDCS/exam/deleteUser?empid=' + $(this).attr('empid'),
            async: false,
            success: function () {
                alert('ลบบัญชีผู้ใช้งานเรียบร้อยแล้ว');
                searchUsers();
            },
            error: function () {
                alert('เกิดข้อผิดพลาด');
            }
        });
    }
});

$(document).on('click', '.reset-block-user', function(){
    if (confirm("คุณต้องยกเลิกการบล็อกบัญชีของ : " + $(this).attr('name') + " ใช่หรือไม่?")) {
        $.ajax({
            type: "POST",
            url: context + '/TDCS/exam/resetBlock?empid=' + $(this).attr('empid'),
            async: false,
            success: function () {
                alert('ยกเลิกการบล็อกบัญชีผู้ใช้งานเรียบร้อยแล้ว');
                searchUsers();
            },
            error: function () {
                alert('เกิดข้อผิดพลาด');
            }
        });
    }
});


function usersFound(){
    $('#tableUsers').show();
    $('#init-message-mangeusers').hide();
    $('#users-not-found').hide();
}

function usersNotFound(){
    $('#tableUsers').hide();
    $('#init-message-mangeusers').hide();
    $('#users-not-found').show();
}