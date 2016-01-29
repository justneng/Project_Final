/**
 * Created by Pongpipat on 13/3/2558.
 */

$("#btnChangePass").click(function(){
    var pass = [$("#oldPassword"),$("#password"),$("#cpassword")];

    for(i=0;i<pass.length;i++){
        if(pass[i].val()==""){
            pass[i].attr('style','border:solid 1px red');
        }else{
            pass[i].attr('style','');
        }
    }

    if(pass[0].val()==""||pass[1].val()==""||pass[2].val()==""){
        alert("คุณกรอกข้อมูลไม่ครบ");
        $("#submitcahngePass").click();
        return false;
    }

    if(pass[1].val()!=pass[2].val()){
        alert("คุณต้องใส่รหัสผ่านที่เหมือนกันสองครั้งเพื่อเป็นการยืนยัน");
        $("#submitcahngePass").click();
        return false;
    }

    var dat = $.ajax({
        type: "POST",
        url:context+"/TDCS/checkOldPassword",
        data: {Password:pass[0].val()},
        success: function(data) {
            if(data<=0){
                alert("คุณใส่รหัสผ่านเดิมไม่ถูกต้อง");
                return false;
            }
            if(pass[1].val().length<6){
                alert("คุณกรอกรหัสผ่านสั้นเกินไป");
                return false;
            }

            var dat = $.ajax({
                type: "POST",
                url:context+"/TDCS/changPassword",
                data: {Password:pass[1].val()},
                success: function(data) {
                    alert("เปลี่ยนรหัสผ่านสำเร็จ");
                    window.location.href = context+"/TDCS/home.html";
                },
                asyn:false
            });
        },
        asyn:false
    });


});

//$('#tel1').bind('blur', function(e) {
//    var $this = $(this)
//    if ($this.val().length < 10 && $this.val().length != 0) {
//        alert('คุณกรอกเบอร์โทรไม่ครบ');
////                $("#Amount").focus();
//        $this.attr('style','border:solid 1px red');
////            setTimeout(function(){$this.focus()}, 1);
//        return false;
//    }else{
//        $this.attr('style','');
//    }
//});
//})(jQuery);

var updatesucess = false;
function changeValue(){
    var datasend =
            'userName='+$("#username").val() +
            '&empId='+ $("#stuid").val()+
            '&thFname='+$("#fname").val()+
            '&thLname='+$("#lname").val()+
            '&enFname='+$("#engfname").val()+
            '&enLname='+$("#englname").val()+
            '&nickName='+ $("#nickname").val()+
            '&grade='+$("#inputGrade").val()+
            '&levelStu='+$("#level").val()+
            '&birthDate='+$("#birthday").val()+
            '&tell1='+$("#tel1").val()+
            '&tell2='+$("#tel2").val()+
            '&eMail1='+$("#ssgMail").val()+
            '&eMail2='+$("#mail").val()+
            '&address='+$("#address").val()+
            '&skype='+$("#skype").val()+
            '&imange='+""+
            '&startWork='+$("#startTime").val()+
            '&endWork='+$("#endTime").val()+
            '&staffId='+$("#advisor").val()+
            '&teamId='+""+
            '&piority='+$("#position").val()+
            '&compId='+""+
            '&spId='+""+
            '&uniFacMajId='+$("#depid").val()+
            '&aptId='+$("#type").val()+
            '&sectionId='+""+
            '&posiId='+$("#position").val()+
            '&userId='+$("#userId").val();


    var dat = $.ajax({
        type: "POST",
        url:context+"/TDCS/saveData",
        data: datasend,
        complete: function(data) {
            if($("#image").val()!=""){
                prepareLoad();
            }else {
                updatesucess = true;
//            $("#linkhome").click();
                window.location.href =context+ "/TDCS/home.html";
            }

        },
        asyn:false
    });
}

window.onbeforeunload = function (e) {
    var e = e || window.event;
    var image = $("#image").val();
    var element = [$("#stuid").val(),$("#username").val(),$("#fname").val(),$("#lname").val(),$("#engfname").val(),$("#englname").val(),
        $("#nickname").val(),$("#birthday").val(),$("#depid").val(),$("#level").val(),$("#inputGrade").val(),$("#address").val(),
        $("#tel1").val(),$("#tel2").val(),$("#ssgMail").val(),$("#mail").val(),$("#skype").val(),$("#startTime").val(),$("#endTime").val(),
        $("#type").val(),$("#position").val(),$("#advisor").val()+""];

    for(i=0;i<element.length-1&&!updatesucess;i++) {
//        console.log(i+"<"+element.length);
//        if(i>=element.length){
//            break;
//        }
        if(element[i] != elementStart[i] || image!="") {
//            console.log(element[i]+"!="+elementStart[i]);
            // For IE and Firefox prior to version 4
            if (e) {
                e.returnValue = 'เนื้อหามีการแก้ไขคุณต้องการออกจากหน้านี้โดยไม่บันทึกหรือไม่';
            }
//            console.log(element[i]+"!="+elementStart[i]);
            // For Safari
//            return 'เนื้อหามีการแก้ไขคุณต้องการออกจากหน้านี้โดยไม่บันทึกหรือไม่';
        }
    }
};


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

function callculateAge(){
    var splitDate = $("#birthday").val().split('/');
    $("#age").val(_calculateAge(splitDate[2]+"/"+splitDate[1]+"/"+splitDate[0]));
}
$("#changePassword").click(function(){
//    alert("fsdfsdf");
//    $('#listDep').modal('show');
    $("#changePasswordModal").modal('show');
});
$( document ).ready(function(){
//    var cell = document.createElement("td");
//    var cellText = document.createTextNode("fffffffff");
//    cell.setAttribute("aligen","center");        //dosent work
//    cell.appendChild(cellText);
//    row.appendChild(cell);
//    console.log(facutyArrayElement[0]);
    var myElement1 = document.createElement('td');
    myElement1.setAttribute('id', facutyforFixid);
    myElement1.appendChild(document.createTextNode(facutyforfixName));

    selectFacAndgetDepartment(myElement1);
    facutyQuery(universityId);
    fullfulegrade();
    callculateAge();
    $("#startTime").change();
});
//        check compare password /////////////////////
//////////////////////////////////check compare password /////////////////////
$("#password").blur(function() {
    if( $("#password").val()!= "" && $("#password").val().length > 6) {
        $("#passdiv").attr('class', 'col-md-12 has-success has-feedback');
        $("#passspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
    }else if($("#password").val()==""){
        $("#passdiv").attr('class', 'col-md-12');
        $("#passspan").attr('class', '');

        $("#cpassdiv").attr('class', 'col-md-12');
        $("#cpassspan").attr('class', '');
    }else if($("#password").val().length < 6){
        alert("รหัสผ่านสั้นเกินไป");
        $("#passdiv").attr('class', 'col-md-12 has-error has-feedback');
        $("#passspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
    }


    if ($("#cpassword").val() == $("#password").val()) {
        $("#cpassdiv").attr('class', 'col-md-12 has-success has-feedback');
        $("#cpassspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
    } else {
        $("#cpassdiv").attr('class', 'col-md-12 has-error has-feedback');
        $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
    }
});

$("#cpassword").blur(function(){
    if($("#cpassword").val() != "" && $("#password").val()!= "") {
        if ($("#cpassword").val() == $("#password").val()) {
            $("#cpassdiv").attr('class', 'col-md-12 has-success has-feedback');
            $("#cpassspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
        } else {
            $("#cpassdiv").attr('class', 'col-md-12 has-error has-feedback');
            $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
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

//$("#fileUpload").on('change',prepareLoad);
function selectDepartment(department){
    $("#comboDep").val($(department).html());
    $("#depid").val(department.id);
    $('#listDep').modal('hide');
}

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

$(document).ready(function () {
    if('${status}'=='admin'){
        $("#formregis").attr('action',context+'/TDCS/addingStu');
    }else{
        $("#formregis").attr('action',context+'/TDCS/submiting');
    }


//    $("#profile").click(function(){
//        $("#profile").attr('src','../../resources/pictureUpload/25580217171720.jpg');
//    });

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
//    }else if(uniNameTr.length==1){
//        $("#univerName").val(uniNameTr[0].university_name);
//        facutyQuery();
//    }
}
function selectUniversity(univerName){
//    alert();
    $("#comboFac").val("");
    $("#comboDep").val("");
    $("#depid").val("0");
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
function prepareLoad(event)
{
    var fileName = $("#image").val().split('.');
//    alert(fileName[fileName.length-1]);
    if(fileName[fileName.length-1]=="jpg"||fileName[fileName.length-1]=="png") {
        var oMyForm = new FormData();
        oMyForm.append("file", image.files[0]);
//        oMyForm.append("name", $("#fileUpload").val());
//        oMyForm.append("havefile", picture);
        var data = $.ajax({
            url: context+'/TDCS/uploadFile',
            data: oMyForm,
            dataType: 'text',
            processData: false,
            contentType: false,
            type: 'POST',
            complete: function() {
                updatesucess = true;
//            $("#linkhome").click();
                window.location.href = context+"/TDCS/home.html";
//                $('.dv-background').hide();
            }
        }).responseText;
    }else{
        alert("ชนิดไฟล์รูปไม่ถูกต้อง");
    }
}


var facutyData,departmentData;

function getTimeWork(){
    if($("#startTime").val()!=""&& $("#endTime").val()!="") {
        var stDate = $("#startTime").val().split('/');
        var dString = stDate[2] + "," + stDate[1] + "," + stDate[0];
        var endDate = $("#endTime").val().split('/');
        var enString = endDate[2] + "," + endDate[1] + "," + endDate[0];

        var d1 = new Date(dString);
        var d2 = new Date(enString);
        var y = DateDiff.inYears(d1, d2), m = DateDiff.inMonths(d1, d2), d = DateDiff.inDays(d1, d2);
        var rerultShow = "";
        if (d > 0) {
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
        } else {
            alert("ระยะเวลาฝึกงานไม่ถูกต้อง");
            $("#startTime").val("");
            $("#endTime").val("");
        }
        $("#sumDate").val(rerultShow);
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
    $("#userData").attr('class','dropdown active');
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

//        genarate username & email ssg //////////////
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
//        $("#age").val(_calculateAge($("#birthday").val()));
//        alert("kcpe");
    });
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
});
function checkEmpty(){
    var countError = 0;
    var element = [$("#stuid"),$("#username"),$("#fname"),$("#lname"),$("#engfname"),$("#englname"),
        $("#nickname"),$("#birthday"),$("#depid"),$("#level"),$("#inputGrade"),$("#address"),$("#tel2"),
        $("#ssgMail"),$("#mail"),$("#skype"),$("#startTime"),$("#endTime"),
        $("#type"),$("#position"),$("#advisor")];;
    if($("#password").val()!=$("#cpassword").val()){
        $("#password").val("");
        $("#cpassword").val("");
    }
    for(var i=0;i<element.length;i++){
        if(element[i].val()==""){
            element[i].attr('style','border:solid 1px red');
            countError++;
        }else{
            element[i].attr('style','');
        }
    }

    if(countError>0){
        alert("คุณกรอกข้อมูลไม่ครบ");
        return false;
    }

    if($("#stuid").val().length<6){
        $("#stuid").change();
        setTimeout(function(){$("#stuid").focus()}, 1);
        return false;
    }

    if($("#tel1").val().length<10&&$("#tel1").val().length>0){
        $("#tel1").blur();
        setTimeout(function(){$("#tel1").focus()}, 1);
        return false;
    }

    if($("#tel2").val().length<10){
        $("#tel2").blur();
        setTimeout(function(){$("#tel2").focus()}, 1);
        return false;
    }

    changeValue();
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
    if($("#stuid").val() != elementStart[0]) {
        var student_id = $("#stuid");
        if (student_id.val() != "") {
            var data = $.ajax({
                type: "POST",
                url: context+'/TDCS/checkStudentOrEmployeeId',
                data: {
                    stduOrEmpId: student_id.val()
                },
                async: false
            }).responseText;
            if (data > 0) {
                var url = window.location.href;
                alert("รหัสนักศึกษานี้มีอยู่แล้ว");
                student_id.val("");
            }
        }
    }
});
var i=1;
$("#engfname").change(function(){
    checkUserName();
});
$("#englname").change(function(){
    checkUserName();
});
function checkUserName(){
    if($("#username").val() != elementStart[1]) {
        if ($("#engfname").val() != "" && $("#englname").val() != "") {
            var userName = $("#username");
            var data = $.ajax({
                type: "POST",
                url: context+'/TDCS/checkUserName',
                data: {
                    userName: userName.val()
                },
                async: false
            }).responseText;
            if (data > 0) {
                userName.val(userName.val() + $("#englname").val().charAt(i));
                $("#ssgMail").val($("#ssgMail").val() + $("#englname").val().charAt(i++));
                checkUserName();
            }

            if(data>0 && i>$("#englname").val().length){
                alert("ชื่อและนามสกุลนี้มีอยู่แล้ว");
                setTimeout(function(){$('#englname').focus()}, 1);
            }
        }
    }
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

//(function($) {
//    $('#tel1').bind('blur', function(e) {
//        var $this = $(this)
//        if ($this.val().length < 10 && $this.val().length != 0) {
//            alert('คุณกรอกเบอร์โทรศัพท์ไม่ครบ');
////                $("#Amount").focus();
//            $this.attr('style','border:solid 1px red');
//            return false;
//        }else{
//            $this.attr('style','');
//        }
//    });
//})(jQuery);

(function($) {
    $('#tel2').bind('blur', function(e) {
        var $this = $(this)
        if ($this.val().length < 10) {
            alert('คุณกรอกเบอร์โทรศัพท์มือถือไม่ครบ');
//                $("#Amount").focus();
            $this.attr('style','border:solid 1px red');
            return false;
        }else{
            $this.attr('style','');
        }
    });
})(jQuery);
