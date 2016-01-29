/**
* Created by Pongpipat on 13/3/2558.
*/

(function($) {
    $('#telMoblie').bind('blur', function(e) {
        var $this = $(this)
        if ($this.val().length < 10 && $this.val().length != 0) {
            alert('คุณกรอกเบอร์มือถือไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style','border:solid 1px red');
            return false;
        }else{
            $this.attr('style','');
        }
    });
})(jQuery);

(function($) {
    $('#password').bind('blur', function(e) {
        var $this = $(this)
        if ($this.val().length < 6) {
            alert('คุณกรอกรหัสผ่านไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style','border:solid 1px red');
            return false;
        }else{
            $this.attr('style','');
            $('#cpassword').attr('style','');
        }
    });
})(jQuery);

(function($) {
    $('#phoneNumber').bind('blur', function(e) {
        var $this = $(this)
        if ($this.val().length < 10 && $this.val().length != 0) {
            alert('คุณกรอกเบอร์โทรศัพท์มือถือไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style','border:solid 1px red');
            return false;
        }else{
            $this.attr('style','');
        }
    });
})(jQuery);


///////////////////////////////////check compare password /////////////////////

$("#password").change(function() {
    if($("#password").val().length>=6) {
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

$("#cpassword").change(function(){
    if($("#cpassword").val().length>=6) {
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


var picture = "";
function fullfulegrade(){
    var grade = $("#inputGrade").val();
    for(var i = $("#inputGrade").val().length;i<4;i++){
        grade += "0";
    }
    $("#inputGrade").val(grade);
}

$("#inputGrade").blur(function(){
    var grade = $("#inputGrade").val();
    for(var i = $("#inputGrade").val().length;i<4;i++){
        grade += "0";
    }
    $("#inputGrade").val(grade);
});

function shoeDepartMent(){
    $("#filterDep").val($("#comboDep").val());
    $("#comboDep").val("");
    $('#listDep').modal('show');
    $("#filterDep").keyup();
}

function showFacuty(){
    $("#filterFac").val($("#comboFac").val());
    $("#comboFac").val("");
    $('#listFac').modal('show');
    $("#comboDep").val("");
    $("#depid").val("0");
    $("#filterFac").keyup();
}

function selectFacAndgetDepartment(fac){
    $("#comboFac").val($(fac).html());
    $("#facid").val(fac.id);
    var facid = fac.id;
    if(facid!=""){
            var data = $.ajax({
                type: "POST",
                url: context+'/TDCS/getDep',
                data : {
                    facutyid : facid
                },
            async: false
        }).responseText;
        $('#trDepartment').empty();
        if(data != "") {
            departmentData = JSON.parse(data);
            for (var j = 0; j < departmentData.length; j++) {
                $('#trDepartment').append('<tr><td onclick="selectDepartment(this)" id="'+departmentData[j].uniFacMajId+'" style="cursor: pointer">' + departmentData[j].major.majName + '</td></tr>');
            }
        }
    }
    $('#listFac').modal('hide');
}
function selectDepartment(department){
    $("#comboDep").val($(department).html());
    $("#depid").val(department.id);
    $('#listDep').modal('hide');
}
$(document).ready(function () {
    if(statusUser=='admin'){
        $("#formregis").attr('action',context+'/TDCS/addingStu');
    }else{
        $("#formregis").attr('action',context+'/TDCS/submiting');
    }


    $("#profile").click(function(){
        $("#profile").attr('src','../../resources/pictureUpload/25580217171720.jpg');
    });

    (function ($) {
        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })

    }(jQuery));

    (function ($) {
        $('#filterFac').keyup(function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();
        })

    }(jQuery));

    (function ($) {
        $('#filterDep').keyup(function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();
        })
    }(jQuery));
});

function listuni(){
    var uniName = $("#univerName").val();
    $("#univerName").val("");
    var uniNameTr;
    var data = $.ajax({
        type: "POST",
        url: context+'/TDCS/getUniver',
        data : {
            UniversityName : uniName
        },
        async: false
    }).responseText;
    $('#trUniversity').empty();
    if(data != "") {
        uniNameTr = JSON.parse(data);
        for (var j = 0; j < uniNameTr.length; j++) {
            $('#trUniversity').append("<tr><td id='"+uniNameTr[j].id+"' name='"+uniNameTr[j].university_name+"' style='cursor: pointer' onclick='selectUniversity(this)'>" + uniNameTr[j].university_name + "</td></tr>");
        }
    }else {
        $("#univerName").val("");
    }
//    if(uniNameTr.length>1) {
    $("#filter").val(uniName);
    $('#listUniver').modal('show');
    $("#comboFac").val("");
    $("#comboDep").val("");
    $("#depid").val("0");

//    }else if(uniNameTr.length==1){
//        $("#univerName").val(uniNameTr[0].university_name);
//        facutyQuery();
//    }
}
function selectUniversity(univerName){
//    alert();
    $("#univerName").val($(univerName).html());
    $("#universityId").val(univerName.id);
    facutyQuery(univerName.id);
    $('#listUniver').modal('hide');
}
function facutyQuery(univerId){
//    var uniName = $("#univerName").val();
//    alert(uniName);
    if(univerId!=""){
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/getFac',
            data : {
                univerID : univerId
            },
            async: false
        }).responseText;
        $('#trFacuty').empty();
        if(data != "") {
            facutyData = JSON.parse(data);
            for (var j = 0; j < facutyData.length; j++) {
                $('#trFacuty').append('<tr><td id="'+facutyData[j].uniFacId+'" style="cursor: pointer" onclick="selectFacAndgetDepartment(this)">' + facutyData[j].faculty.facName + '</td></tr>');
            }
        }
    }
}




var facutyData,departmentData;

function getTimeWork(){
    if($("#startTime").val()!=""&&$("#endTime").val()!=""){
        var stDate = $("#startTime").val().split('/');
        var dString = stDate[2]+","+ stDate[1] +","+ stDate[0];
        var endDate = $("#endTime").val().split('/');
        var enString = endDate[2]+","+ endDate[1] +","+ endDate[0];

        var d1 = new Date(dString);
        var d2 = new Date(enString);
        var y = DateDiff.inYears(d1, d2),m = DateDiff.inMonths(d1,d2),d = DateDiff.inDays(d1,d2);
        var rerultShow = "";
        if(d>0) {
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
        }else{
            alert("ระยะเวลาฝึกงานไม่ถูกต้อง");
            $("#startTime").val("");
            $("#endTime").val("");
        }
        $("#sumDate").val(rerultShow);

    }else{
        $("#sumDate").val("");
    }
}

$(document).ready(function(){
    $("#inputGrade").keyup(function(){
        var textValue = $("#inputGrade").val();

        if(parseFloat(textValue)>4.0){
            $("#inputGrade").val("");
            return false;
        }
        if(textValue.length==1){
            $("#inputGrade").val(textValue+".");
        }
    });

    $("#cleardata").click(function(){
        var element = document.body.childNodes;
        for (var i = 0; i < c.length; i++) {
            txt = txt + c[i].nodeName + "<br>";
        }
    });

    //combobox click
    $('.combobox').combobox();
//        datepicker ////////////////////////////////
    $("#addData").attr('class','dropdown active');
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
    $("#sBirthday").datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        endDate: 'd'
    });
//        ////////////////////////////////////////////

        //genarate username & email ssg //////////////
    $("#engfname").keyup(function(){
        $("#username").val('its-'+$("#engfname").val().toLowerCase()+'_'+$("#englname").val().toLowerCase().charAt(0));
        $("#ssgMail").val('its-'+$("#engfname").val().toLowerCase()+'_'+$("#englname").val().toLowerCase().charAt(0));
    });
    $("#englname").keyup(function(){
        $("#username").val('its-'+$("#engfname").val().toLowerCase()+'_'+$("#englname").val().toLowerCase().charAt(0));
        $("#ssgMail").val('its-'+$("#engfname").val().toLowerCase()+'_'+$("#englname").val().toLowerCase().charAt(0));
    });

//        ////////////////////////////////////////////
    $("#birthday").change(function(){
        var splitDate = $("#birthday").val().split('/');
        $("#age").val(_calculateAge(splitDate[2]+"/"+splitDate[1]+"/"+splitDate[0]));
    });

});

function saveData(){
    var datasend = 'empId='+$("#stuid").val()+
        '&userName='+$("#username").val()+
        '&password='+$("#password").val()+
        '&thFname='+$("#fname").val()+
        '&thLname='+$("#lname").val()+
        '&enFname='+$("#engfname").val()+
        '&enLname='+$("#englname").val()+
        '&nickName='+$("#nickname").val()+
        '&grade='+$("#inputGrade").val()+
        '&levelStu='+$("#level").val()+
        '&birthDate='+$("#birthday").val()+
        '&tell1='+$("#telHome").val()+
        '&tell2='+$("#telMoblie").val()+
        '&eMail1='+$("#ssgMail").val()+
        '&eMail2='+$("#email").val()+
        '&address='+$("#address").val()+
        '&skype='+$("#skypeAcc").val()+
        '&startWork='+$("#startTime").val()+
        '&endWork='+$("#endTime").val()+
        '&staffId='+$("#advisor").val()+
        '&uniFacMajId='+$("#depid").val()+
        '&aptId='+$("#type").val()+
        '&posiId='+$("#position").val()+
        '&status=3';

    var url = "";
    if(statusUser=='admin'){
        url = context+'/TDCS/addingStu';
    }else{
        url = context+'/TDCS/submiting';
    }
    var dat = $.ajax({

        type: "POST",
        url:url,
        data: datasend,
        success:function(data){
            console.log("|"+$("#image").val()+"|");
            if($("#image").val()!=""){
                prepareLoad(data);
            }else{
                if(statusUser=='admin'){
                    $("#ID").val(data);
                    $("#formAfterAdd").submit();
//                location.href = "/TDCS/openLoginAfterRegis";
                }else{
                    location.href = context+"/TDCS/openLoginAfterRegis";
                }
            }

        }
    }).responseText;
//    alert(dat);
}

function prepareLoad(data)
{
    console.log("inprepare"+data);
    var fileName = $("#image").val().split('.');
//    alert(fileName[fileName.length-1]);
    if(fileName[fileName.length-1]=="jpg"||fileName[fileName.length-1]=="png") {
        var oMyForm = new FormData();
        oMyForm.append("file", image.files[0]);
//        oMyForm.append("name", $("#fileUpload").val());
//        oMyForm.append("havefile", picture);
        var data3 = $.ajax({
            url: context+'/TDCS/uploadFile',
            data: oMyForm,
            dataType: 'text',
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data2){
                if(statusUser=='admin'){
                    $("#ID").val(data);
                    $("#formAfterAdd").submit();
//                location.href = "/TDCS/openLoginAfterRegis";
                }else{
                    location.href = context+"/TDCS/openLoginAfterRegis";
                }

            }
        }).responseText;
    }else{
        alert("ชนิดไฟล์รูปไม่ถูกต้อง");
    }
}

function checkEmpty(){

    var countError = 0;
    var elementFirst;
    var element = [ $("#stuid"), $("#username"), $("#password"),$("#cpassword"), $("#fname"), $("#lname"), $("#engfname"), $("#englname"),
        $("#nickname"),  $("#birthday"),$("#university"), $("#comboFac"),$("#comboDep"),$("#position"),$("#inputGrade"), $("#address"),
        /*$("#telHome"),$("#ssgMail"),*/$("#email"), $("#startTime"),$("#endTime"),$("#skypeAcc"),$("#level"),
        $("#type"),$("#job"), $("#advisor"), $("#telMoblie"), $("#univerName"),$("#advisor")];
    if($("#password").val()!=$("#cpassword").val()){
        $("#password").val("");
        $("#cpassword").val("");
    }
    for(var i=0;i<element.length;i++){
        if(element[i].val()==""){
//            alert(element[i].val()+"~~~"+element[i].selector);
            countError++;
            if(countError==1){
                elementFirst = element[i].selector;
            }
            element[i].attr('style','border:solid 1px red');
        }else{
            element[i].attr('style','');
        }
    }
    if(countError>0){
//        alert(elementFirst);
//        $("#btnSubmit").click();
        alert("คุณกรอกข้อมูลไม่ครบ");
        return false;
    }
    if( $("#startTime").val()==""||$("#endTime").val()==""|| $("#birthday").val()==""){
        alert("คุณกรอกข้อมูลไม่ครบ");
        return false;
    }

    if($("#stuid").val().length<6){
        $("#stuid").change();
        setTimeout(function(){$("#stuid").focus()}, 1);
        return false;
    }

    if($("#password").val().length<6){
        $("#password").blur();
        setTimeout(function(){$("#password").focus()}, 1);
        return false;
    }

    if($("#telHome").val().length<10&&$("#telHome").val().length>0){
        $("#telHome").blur();
        setTimeout(function(){$("#telHome").focus()}, 1);
        return false;
    }

    if($("#telMoblie").val().length<10){
        $("#telMoblie").blur();
        setTimeout(function(){$("#telMoblie").focus()}, 1);
        return false;
    }

    if (confirm('====== ยืนยันการเพิ่มข้อมูล ? ======')) {
        saveData();
        alert("บันทึกข้อมูลสำเร็จ");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////vilidate


$("#stuid").change(function(){
    var $this = $(this);
    if ($this.val().length < 6 && $this.val().length != 0) {
        alert('คุณกรอกรหัสนักศึกษาฝึกงานไม่ครบ');
//                $("#Amount").focus();
//            setTimeout(function(){$this.focus()}, 1);
        $this.attr('style','border:solid 1px red');
        return false;
    }else{
        $this.attr('style','');
    }
    if($("#stuid").val()!=""){
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/checkStudentOrEmployeeId',
            data : {
                stduOrEmpId : $("#stuid").val()
            },
            async: false
        }).responseText;
        if(data>0){
            var url = window.location.href;
            alert("รหัสนักศึกษานี้มีอยู่แล้ว");
            $("#stuid").val("");
        }
    }
});

$("#ssgMail").blur(function(){
//    console.log("ff");
    checkUserName();
});
//$("#englname").blur(function(){
////    alert("ff");
////    console.log("ff");
//    checkUserName();
//});
function checkUserName(){
//    for(var i=1;i<=$("#englname").val().length;i++){
//        alert(data +"~~~~"+ i + "~~~~~" + $("#englname").val().length);
    if($("#ssgMail").val().length>0){
        var userName = $("#username");
        var data = $.ajax({
            type: "POST",
            url: context+'/TDCS/checkUserName',
            data : {
                userName : $("#ssgMail").val()
            },
            async: false
        }).responseText;
        if(data>0){
            alert("อีเมลนี้ผู้ใช้อยู่แล้ว");
            $("#ssgMail").val("");
        }else{
            $("#username").val($("#ssgMail").val());
        }
    }else{
        $("#username").val("");
    }
//    }

}
$("#univerName").keypress(function(){
    $("#universityId").val("0");
});
$("#comboDep").keypress(function(){
    $("#depid").val("0");
});
$("#comboFac").keypress(function(){
    $("#facid").val("0");
});

$("#sumDate").change(function(){
    if ($("#startTime").val() != "" && $("#endTime").val() != "") {
        var s = $("#startTime").val().split("/")
        var e = $("#endTime").val().split("/")
        timediff(s[1] + "/" + s[0] + "/" + s[2] + " 00:00", e[1] + "/" + e[0] + "/" + e[2] + " 00:00");
    }
});

function timediff(start_actual_time, end_actual_time) {
    start_actual_time = new Date(start_actual_time);
    end_actual_time = new Date(end_actual_time);

    var diff = end_actual_time - start_actual_time;

    var diffSeconds = diff / 1000;
    var HH = Math.floor(diffSeconds / 3600);
    var MM = Math.floor(diffSeconds % 3600) / 60;

    var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM);
    if (formatted.charAt(1) == '-') {
        alert("คุณใส่เวลาไม่ถูกต้อง");
        $("#startTime").val("");
        $("#endTime").val("");
    }
    return formatted;
}

function reloadfunc(){
    if(confirm("คุณต้องการล้างข้อมูลหรือไม่")){
        window.location.href = context+"/TDCS/signup.html";
    }

}
//function canclefunc(){
//    if(confirm("คุณต้องการล้างข้อมูลหรือไม่")){
//        location.reload();
//    }
//}
if(statusUser == 'user' && confirm("คุณต้างการไปหน้าหลักโดยไม่บันทึกข้อมูลใช่หรือไม่")){
    window.location.href = context+"/TDCS/index.html";
}
$("#cancel").click(function(){
    if(confirm("คุณต้างการไปหน้าหลักโดยไม่บันทึกข้อมูลใช่หรือไม่")){
        if(statusUser == ''){
            window.location.href = context+"/TDCS/index.html";
        }else {
            window.location.href = context+"/TDCS/addStudent.html";
        }
    }
});

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