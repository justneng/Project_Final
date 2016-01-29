/**
 * Created by Pongpipat on 13/3/2558.
 */

function prepareLoad(data) {
    var fileName = $("#image").val().split('.');
//    alert(fileName[fileName.length-1]);
    if (fileName[fileName.length - 1] == "jpg" || fileName[fileName.length - 1] == "png") {
        var oMyForm = new FormData();
        oMyForm.append("file", image.files[0]);
//        oMyForm.append("name", $("#fileUpload").val());
//        oMyForm.append("username", picture);
        var data3 = $.ajax({
            url: context+'/TDCS/uploadFile',
            data: oMyForm,
            dataType: 'text',
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data2) {
                $("#ID").val(data);
                $("#formAfterAdd").submit();
//                location.href = "/TDCS/openLoginAfterRegis";
            }
        }).responseText;
    } else {
        alert("ชนิดไฟล์รูปไม่ถูกต้อง");
    }
}

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
//    $("#divImg").attr('style','width: 100%;height: 200px;background-image: url(<c:url value="'+e.target.result+'" />)')
};
//(function($) {
//    $('#telHome').bind('blur', function(e) {
//        var $this = $(this)
//        if ($this.val().length < 10 && $this.val().length != 0) {
//            alert('คุณกรอกเบอร์โทรไม่ครบ');
////                $("#Amount").focus();
//            $this.attr('style','border:solid 1px red');
////            setTimeout(function(){$this.focus()}, 1);
//            return false;
//        }else{
//            $this.attr('style','');
//        }
//    });
//})(jQuery);

(function ($) {
    $('#telMoblie').bind('blur', function (e) {
        var $this = $(this)
        if ($this.val().length < 10) {
            alert('คุณกรอกเบอร์มือถือไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style', 'border:solid 1px red');
//            setTimeout(function(){$this.focus()}, 1);
            return false;
        } else {
            $this.attr('style', '');
        }
    });
})(jQuery);

(function ($) {
    $('#password').bind('blur', function (e) {
        var $this = $(this)
        if ($this.val().length < 6 && $this.val().length != 0) {
            alert('คุณกรอกรหัสผ่านไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style', 'border:solid 1px red');
//            setTimeout(function(){$this.focus()}, 1);
            return false;
        } else {
            $this.attr('style', '');
            $('#cpassword').attr('style', '');
        }
    });
})(jQuery);

//(function($) {
//    $('#telHome').bind('blur', function(e) {
//        var $this = $(this)
//        if ($this.val().length < 10 && $this.val().length != 0) {
//            alert('คุณกรอกเบอร์โทรศัพท์ไม่ครบ');
////                $("#Amount").focus();
//            $this.attr('style','border:solid 1px red');
////            setTimeout(function(){$this.focus()}, 1);
//            return false;
//        }else{
//            $this.attr('style','');
//        }
//    });
//})(jQuery);


$("#addData").attr('class', 'dropdown active');
var picture = "";
var section_none_pm = [];

$("#startWork").change(function () {
    var stDate = $("#startWork").val().split('/');
    var dString = stDate[2] + "," + stDate[1] + "," + stDate[0];
    var d1 = new Date(dString);
    var d2 = new Date();
    var y = DateDiff.inYears(d1, d2), m = DateDiff.inMonths(d1, d2), d = DateDiff.inDays(d1, d2);
    var rerultShow = "";

    if (m >= 12) {
        y = m / 12;
        rerultShow += parseInt(y + "") + " ปี";
        if (m % 12 > 0) {
            m %= 12;
            m + " เดือน"
        }


    } else {
        rerultShow += m + " เดือน";
    }

//    if(y > 0){
//        m-=(y*12);
//        if(m<0){
//            y--;
//        }
//        rerultShow += y+" ปี ";
//    }
//    if(m > 0){
//        rerultShow += m + " เดือน ";
//    }
//    if(y <= 0 && m <= 0){
//        rerultShow += 0 + " เดือน";
//    }
    $("#workeLoad").val(rerultShow);
});

$("#section").change(function () {
    var section_Id = $("#section").val();
    var getJobJson;
    if (section_Id != "") {
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/getJob',
            data: {
                sec_id: section_Id
            },
            async: false
        }).responseText;
        $('#job').empty();
        $('#job').append('<option value="">เลือกตำแหน่ง</option>');
        if (data != "") {
            getJobJson = JSON.parse(data);
            for (var j = 0; j < getJobJson.length; j++) {
                var job_option = '<option value="' + getJobJson[j].spId + '"';
                if (in_array(section_none_pm, getJobJson[j].section.sectionId) && getJobJson[j].position.posiName != 'Project Manager') {
                    job_option += ' disabled="disabled" style="cursor: no-drop;"';

                }
                $('#job').append(job_option + '>' + getJobJson[j].position.posiName + '</option>');
            }

            if (in_array(section_none_pm, getJobJson[0].section.sectionId)) {
                $("#txbTeam").show();
                $("#team").hide();
                $("#team").attr("required", false);
                $("#formGroupPiority").show();
                $("#piority").attr("required", true);
                $("#txbTeam").attr("required", true);

            } else {

                $("#team").show();
                $("#formGroupPiority").hide();
                $("#team").attr("required", true);
                $("#piority").attr("required", false);
                $("#txbTeam").val("");
                $("#txbTeam").hide();
                $("#txbTeam").attr("required", false);
            }
        }
    } else {
        $("#job").empty();
        $("#txbTeam").hide();
        $("#formGroupPiority").hide();
        $("#team").show();
    }

    var getTeamJson;
    if (section_Id != "") {
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/getTeam',
            data: {
                section_Id: section_Id
            },
            async: false
        }).responseText;
        $('#team').empty();
//            $('#team').append('<option value="">ทีม</option>')
        if (data != "") {
            getTeamJson = JSON.parse(data);
            for (var j = 0; j < getTeamJson.length; j++) {
                $('#team').append('<option value="' + getTeamJson[j].teamId + '">' + getTeamJson[j].teamName + '</option>');
            }
        }
    }
});

$("#job").change(function () {
//        var jobId = $("#job").val();


});
function in_array(array, id) {
//            alert(array[0]+"jjjj"+id);
    for (var i = 0; i < array.length; i++) {
        if (array[i] == id) {
            return true;
        }
    }
    return false;
}
$("#ddlCom").change(function () {

    var compId = $("#ddlCom").val();
    var getSectionJson;
    if (compId != "") {
        var data = $.ajax({
            type: "POST",
            url:context+ '/TDCS/getSection',
            data: {
                comId: compId
            },
            async: false
        }).responseText;
        $('#section').empty();
        $('#section').append('<option value="">เลือกแผนก</option>');
        if (data != "") {
            getSectionJson = JSON.parse(data);
            for (var j = 0; j < getSectionJson.length; j++) {
                var option = '<option value="' + getSectionJson[j].sectionId + '">' + getSectionJson[j].sectionName;
//                    alert(getSectionJson[j].userId);
                if (getSectionJson[j].userId == undefined) {
                    section_none_pm[section_none_pm.length] = getSectionJson[j].sectionId;
                    option += '(ยังไม่มี PM)';
                }
                $('#section').append(option + '</option>');
            }
        }
    } else {
        $("#section").empty();
        $("#job").empty();
        $("#txbTeam").hide();
        $("#formGroupPiority").hide();
        $("#team").show();
    }
});

//$("#fileUpload").on('change',prepareLoad);

function selectDepartment(department) {
    $("#comboDep").val(department.id);
    $('#listDep').modal('hide');
}

function shoeDepartMent() {
    $("#filterDep").val($("#comboDep").val());
    $("#comboDep").val("");
    $('#listDep').modal('show');
    $("#filterDep").keyup();
}

function showFacuty() {
    $("#filterFac").val($("#comboFac").val());
    $("#comboFac").val("");
    $('#listFac').modal('show');
    $("#filterFac").keyup();
}

function selectFacAndgetDepartment(fac) {
    $("#comboFac").val(fac.id);
    var facName = $("#comboFac").val();
    if (facName != "") {
        var data = $.ajax({
            type: "POST",
            url:context+ '/TDCS/getDep',
            data: {
                facutyname: $("#comboFac").val()
            },
            async: false
        }).responseText;
        $('#trDepartment').empty();
        if (data != "") {
            departmentData = JSON.parse(data);
            for (var j = 0; j < departmentData.length; j++) {
                $('#trDepartment').append('<tr><td onclick="selectDepartment(this)" id="' + departmentData[j].majName + '" style="cursor: pointer">' + departmentData[j].majName + '</td></tr>');
            }
        }
    }
    $('#listFac').modal('hide');
}

$(document).ready(function () {
    $("#profile").click(function () {
        $("#profile").attr('src', '../../resources/pictureUpload/25580217171720.jpg');
    });

});

function listuni() {
    var uniName = $("#univerName").val();
    $("#univerName").val("");
    var uniNameTr;
    var data = $.ajax({
        type: "POST",
        url: context+'/TDCS/getUniver',
        data: {
            UniversityName: uniName
        },
        async: false
    }).responseText;
    $('#trUniversity').empty();
    if (data != "") {
        uniNameTr = JSON.parse(data);
        for (var j = 0; j < uniNameTr.length; j++) {
            $('#trUniversity').append("<tr><td id='" + uniNameTr[j].university_name + "' style='cursor: pointer' onclick='selectUniversity(this)'>" + uniNameTr[j].university_name + "</td></tr>");
        }
    } else {
        $("#univerName").val("");
    }
    if (uniNameTr.length > 1) {
        $("#filter").val(uniName);
        $('#listUniver').modal('show');
    } else if (uniNameTr.length == 1) {
        $("#univerName").val(uniNameTr[0].university_name);
        facutyQuery();
    }
}

//function prepareLoad(event)
//{
//    var fileName = $("#fileUpload").val().split('.');
//    //    alert(fileName[fileName.length-1]);
//    if(fileName[fileName.length-1]=="jpg"||fileName[fileName.length-1]=="png") {
//        var oMyForm = new FormData();
//        oMyForm.append("file", fileUpload.files[0]);
//        //        oMyForm.append("name", $("#fileUpload").val());
//        oMyForm.append("havefile", picture);
//        var data = $.ajax({
//            url: '/TDCS/uploadFile',
//            data: oMyForm,
//            dataType: 'text',
//            processData: false,
//            contentType: false,
//            type: 'POST',
//            beforeSend: function() {
//                //                $('.dv-background').show();
//            },
//            success: function(data){
//                //                bootbox.alert("Save Successful", function() {
//                //                });
//                picture = data;
//                $("#profile").attr('src',picture);
//            },
//            error: function () {
//                //                bootbox.alert("Save UnSuccessful", function() {
//                //                });
//            },
//            complete: function() {
//                //                $('.dv-background').hide();
//            }
//        }).responseText;
//    }
//}


var facutyData, departmentData;

function getTimeWork() {
    if ($("#startTime").val() != "" && $("#endTime").val() != "") {
        var resulttime = timediff($("#startTime").val(), $("#endTime").val());
        var week = parseInt((parseFloat(resulttime) / 24.0) / 7);
        var day = (parseFloat(resulttime) / 24.0) % 7;
        $("#sumDate").val(week + " สัปดาห์ " + day + "วัน");
    } else {
        $("#sumDate").val("");
    }
}

$(document).ready(function () {
    $("#inputGrade").keyup(function () {
        var textValue = $("#inputGrade").val();

        if (parseFloat(textValue) > 4.0) {
            $("#inputGrade").val("");
            return false;
        }
        if (textValue.length == 1) {
            $("#inputGrade").val(textValue + ".");
        }
    });

    //        $("#university").change(function(){
    //            var uniName = $("#university").val();
    //            if(uniName!=""){
    //                var data = $.ajax({
    //                    type: "POST",
    //                    url: '/JHRM/getFac',
    //                    data : {
    //                        univerName : uniName
    //                    },
    //                    async: false
    //                }).responseText;
    //                $('#browsers').empty();
    //                if(data != "") {
    //                    facutyData = JSON.parse(data);
    //                    for (var j = 0; j < facutyData.length; j++) {
    //                        $('#browsers').append('<option value="' + facutyData[j].facName + '">');
    //                    }
    //                }
    //            }
    //        });

    $("#comboFac").change(function () {
        //            for(var i=0;i<facutyData.length;i++){
        //                if($("#comboFac").val()==facutyData[i].facName){
        //                    $("#facData").val(facutyData[i].facId);
        //                    break;
        //                }
        //            }
        //            var facName = $("#comboFac").val();
        //            if(facName!=""){
        //                var data = $.ajax({
        //                    type: "POST",
        //                    url: '/JHRM/getDep',
        //                    data : {
        //                        facutyname : $("#comboFac").val()
        //                    },
        //                    async: false
        //                }).responseText;
        //                $('#depList').empty();
        //                if(data != "") {
        //                    departmentData = JSON.parse(data);
        //                    for (var j = 0; j < departmentData.length; j++) {
        //                        $('#depList').append('<option value="' + departmentData[j].majName + '">');
        //                    }
        //                }
        //            }
    });
    //        $("#comboDep").change(function(){
    //            for(var i =0;i<departmentData.length;i++){
    //                if(departmentData[i].majName== $("#comboDep").val()){
    //                    $("#depData").val(departmentData[i].majId);
    //                }
    //            }
    //
    //        });

//        $("#cleardata").click(function(){
//            var element = document.body.childNodes;
//            for (var i = 0; i < c.length; i++) {
//                txt = txt + c[i].nodeName + "<br>";
//            }
//        });

    $("#dpStartWork").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });
    $("#sBirthday").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });

    $("#birthday").change(function () {
        var splitDate = $("#birthday").val().split('/');
        $("#age").val(_calculateAge(splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0]));
    });

    //        ////////////////////////////////////////////

    // genarate username & email ssg //////////////
    $("#engfname").keyup(function () {
        $("#username").val($("#engfname").val().toLowerCase() + '_' + $("#englname").val().toLowerCase().charAt(0));
        $("#ssgMail").val($("#engfname").val().toLowerCase() + '_' + $("#englname").val().toLowerCase().charAt(0));
    });
    $("#englname").keyup(function () {
        $("#username").val($("#engfname").val().toLowerCase() + '_' + $("#englname").val().toLowerCase().charAt(0));
        $("#ssgMail").val($("#engfname").val().toLowerCase() + '_' + $("#englname").val().toLowerCase().charAt(0));
    });
    //check compare password /////////////////////

    $("#password").change(function () {
        if ($("#password").val().length >= 6) {
            if ($("#password").val() != "") {
                $("#passdiv").attr('class', 'col-md-12 has-success has-feedback');
                $("#passspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
            } else if ($("#password").val() == "") {
                $("#passdiv").attr('class', 'col-md-12');
                $("#passspan").attr('class', '');

                $("#cpassdiv").attr('class', 'col-md-12');
                $("#cpassspan").attr('class', '');
            }
            if ($("#cpassword").val() == $("#password").val()) {
                $("#cpassdiv").attr('class', 'col-md-12 has-success has-feedback');
                $("#cpassspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
            } else {
                $("#cpassdiv").attr('class', 'col-md-12 has-error has-feedback');
                $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
            }
        }
    });

    $("#cpassword").change(function () {
        if ($("#cpassword").val().length >= 6) {
            if ($("#cpassword").val() != "" && $("#password").val() != "") {
                if ($("#cpassword").val() == $("#password").val()) {
                    $("#cpassdiv").attr('class', 'col-md-12 has-success has-feedback');
                    $("#cpassspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
                } else {
                    $("#cpassdiv").attr('class', 'col-md-12 has-error has-feedback');
                    $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
                }
            }
        }
    });


    //        ////////////////////////////////////////////


    //        $("#university").change(function(){
    //            var uniName = $("#university").val();
    //
    //            if(uniName!=""){
    //                var data = $.ajax({
    //                    type: "POST",
    //                    url: '/JHRM/getFac',
    //                    data : {
    //                        univerName : uniName
    //                    },
    //                    async: false
    //                }).responseText;
    //                $('#browsers').empty();
    //                if(data != "") {
    //                    facutyData = JSON.parse(data);
    //                    for (var j = 0; j < facutyData.length; j++) {
    //                        $('#browsers').append('<option value="' + facutyData[j].facName + '">');
    //                    }
    //                }
    //            }
    //        });
    ////////////////////////////////////////////////////////////////////////////////////////////////vilidate
//    (function($) {
//        $('#stuid').bind('blur', function(e) {
//            var $this = $(this)
//            if ($this.val().length < 5 && $this.val().length != 0) {
//                alert('คุณกรอกรหัสนักศึกษาฝึกงานไม่ครบ');
////                $("#Amount").focus();
//                $this.attr('style','border:solid 1px red');
////            setTimeout(function(){$this.focus()}, 1);
//                return false;
//            }else{
//                $this.attr('style','');
//            }
//        });
//    })(jQuery);
    $("#stuid").change(function () {
        var $this = $(this);
        if ($this.val().length < 5 && $this.val().length != 0) {
            alert('คุณกรอกรหัสพนักงานไม่ครบ');
//                $("#Amount").focus();
//            setTimeout(function(){$this.focus()}, 1);
            $this.attr('style', 'border:solid 1px red');
            return false;
        } else {
            $this.attr('style', '');
        }
        var student_id = $("#stuid");
        if (student_id.val() != "") {
            var data = $.ajax({
                type: "POST",
                url:context+ '/TDCS/checkStudentOrEmployeeId',
                data: {
                    stduOrEmpId: student_id.val()
                },
                async: false
            }).responseText;
            if (data > 0) {
                var url = window.location.href;
                alert("รหัสพนักงานนี้มีอยู่แล้ว");
                student_id.val("");
            }
        }
    });
    $("#txbTeam").blur(function () {
        var teamName = $("#txbTeam");
        if (teamName.val() != "") {
            var data = $.ajax({
                type: "POST",
                url: context+'/TDCS/checkTeamName',
                data: {
                    teamName: teamName.val()
                },
                success: function (respond) {
                    if (respond > 0) {
                        alert("ชื่อทีมนี้มีอยู่แล้ว");
                        teamName.val("");
                    }
                },
                async: false
            }).responseText;
        }
    });

    $("#piority").blur(function () {
        var piority = $("#piority");
        if (piority.val() != "") {
            var data = $.ajax({
                type: "POST",
                url:context+ '/TDCS/checkPiority',
                data: {
                    piority: piority.val()
                },
                success: function (respond) {
                    if (respond > 0) {
                        alert("ชื่อทีมนี้มีอยู่แล้ว");
                        piority.val("");
                    }
                },
                async: false
            }).responseText;
        }
    });
});
function saveData() {
    var datasend = 'empId=' + $("#stuid").val() +
        '&userName=' + $("#username").val() +
        '&password=' + $("#password").val() +
        '&thFname=' + $("#fname").val() +
        '&thLname=' + $("#lname").val() +
        '&enFname=' + $("#engfname").val() +
        '&enLname=' + $("#englname").val() +
        '&nickName=' + $("#nickname").val() +
        '&birthDate=' + $("#birthday").val() +
        '&compId=' + $("#ddlCom").val() +
        '&spId=' + $("#job").val() +
        '&startWork=' + $("#startWork").val() +
        '&address=' + $("#address").val() +
        '&tell1=' + $("#telHome").val() +
        '&tell2=' + $("#telMoblie").val() +
        '&eMail1=' + $("#ssgMail").val() +
        '&eMail2=' + $("#othEmail").val() +
        '&skype=' + $("#skypeAcc").val() +

        '&status=2';
    if ($("#piority").val() != "") {
        datasend += ('&piority=' + $("#piority").val());
    }

    if ($("#txbTeam").val() != "") {
        var datasendTeam = 'teamName=' + $("#txbTeam").val();
        var dat = $.ajax({
            type: "POST",
            url: context+"/TDCS/insertTeam",
            data: datasendTeam,
            success:function(data){
                datasend += ('&teamId='+data);
//            location.href = "/TDCS/openLoginAfterRegis";
                var dat = $.ajax({
                    type: "POST",
                    url: context+"/TDCS/insertStaff",
                    data: datasend,
                    success: function (data) {
                        if ($("#image").val() != "") {
                            prepareLoad(data);
                        }
                        $("#ID").val(data);
                        $("#formAfterAdd").submit();
//            location.href = "/TDCS/openLoginAfterRegis";

                    }
                }).responseText;

            }
        }).responseText;
    } else {
        datasend += '&teamId=' + $("#team").val();
        var dat = $.ajax({
            type: "POST",
            url: context+"/TDCS/insertStaff",
            data: datasend,
            success: function (data) {
                if ($("#image").val() != "") {
                    alert(data);
                    prepareLoad(data);
                }
               $("#ID").val(data);
               $("#formAfterAdd").submit();
//            location.href = "/TDCS/openLoginAfterRegis";

            }
        }).responseText;
    }

}
function checkEmpty() {
    var element = [$("#stuid"), $("#username"), $("#password"), $("#cpassword"), $("#fname"), $("#lname"), $("#engfname"), $("#englname"),
        $("#nickname"), $("#birthday"), $("#university"), $("#comboFac"), $("#comboDep")/*,$("#level")*/, $("#inputGrade"), $("#address"),
//        $("#telHome"),
        $("#telMoblie"), $("#ssgMail"), $("#email"), $("#startTime"), $("#skypeAcc"), $("#othEmail"), $("#ddlCom"),
        $("#section"), $("#job"), $("#startWork")/*, $("#type"),$("#job"), $("#advisor")*/];

    var countError = 0;
    $('#team').removeAttr('disabled');

    if ($("#txbTeam").css('display') == 'none') {
//            $('#team').attr('disabled', 'disabled');
//            $("#txbTeam").val("~~~");
//            $("#piority").val("~~~");
    }

    if ($("#password").val() != $("#cpassword").val()) {
        countError++;
        $("#password").val("");
        $("#cpassword").val("");
        $("#piority").val("");
        $('#team').attr('disabled', 'disabled');
    }
    for (var i = 0; i < element.length; i++) {
        if (element[i].val() == "") {
            countError++;
            element[i].attr('style', 'border:solid 1px red');
            $('#team').attr('disabled', 'disabled');
        } else {
            element[i].attr('style', '');
        }
    }
    if (countError > 0) {
        alert("คุณกรอกข้อมูลไม่ครบ");
//        $("#btnSubmit").click();
        return false;
    }
    if ($("#stuid").val().length < 5) {
        $("#stuid").change();
        setTimeout(function () {
            $("#stuid").focus()
        }, 1);
        return false;
    }

    if ($("#password").val().length < 6) {
        $("#password").blur();
        setTimeout(function () {
            $("#password").focus()
        }, 1);
        return false;
    }

    if ($("#telHome").val().length < 10 && $("#telHome").val().length > 0) {
        $("#telHome").blur();
        setTimeout(function () {
            $("#telHome").focus()
        }, 1);
        return false;
    }

    if ($("#telMoblie").val().length < 10) {
        $("#telMoblie").blur();
        setTimeout(function () {
            $("#telMoblie").focus()
        }, 1);
        return false;
    }

    if (confirm('====== ยืนยันการเพิ่มข้อมูล ? ======')) {
        saveData();
        alert("บันทึกข้อมูลสำเร็จ");
    }
//    $("#btnSubmit").click();
}

//var i=1;
$("#ssgMail").blur(function () {
    checkUserName();
});
//$("#englname").blur(function(){
//    checkUserName();
//});

//var currentUser = "";
function checkUserName() {
    if ($("#ssgMail").val().length > 0) {
        var userName = $("#username");
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/checkUserName',
            data: {
                userName: $("#ssgMail").val()
            },
            async: false
        }).responseText;
        if (data > 0) {
            alert("อีเมลนี้ผู้ใช้อยู่แล้ว");
            $("#ssgMail").val("");
        } else {
            $("#username").val($("#ssgMail").val());
        }
    } else {
        $("#username").val("");
    }
}
