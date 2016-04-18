var useDefaultUsername = true;
var useDefaultPassword = true;

$(document).ready(function(){
    $("#password").change();

})

var isEmailString = function(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($("#email").val());
}

var checkEmailString = function(){
    var isEmail = isEmailString();
    if(!isEmail){
        $('#email').addClass('validate-fail')
    }else{
        $('#email').removeClass('validate-fail')
    }
}

var isUsernameString = function(){
    var re =  /^[a-z][a-z0-9_\.]{0,24}$/i;
    return re.test($("username").val())
}

var checkUsernameString = function(){
    var isUsername = isUsernameString();
    console.log(isUsername)
    if(!isUsername){
        $('#username').addClass('validate-fail')
    }else{
        $('#username').removeClass('validate-fail')
    }
}


$("#enFname").keyup(function () {
    if(useDefaultUsername){
        if($("#enFname").val() != "" || $("#enLname").val() != "")
        $("#username").val($("#enFname").val().toLowerCase() + '_' + $("#enLname").val().toLowerCase().charAt(0));
    }
});
$("#enLname").keyup(function () {
    if(useDefaultUsername){
        if($("#enFname").val() != "" || $("#enLname").val() != "")
            $("#username").val($("#enFname").val().toLowerCase() + '_' + $("#enLname").val().toLowerCase().charAt(0));
    }
});

$('#useDefaultUsername').on('change',function(){
    useDefaultUsername = $('#useDefaultUsername').prop('checked');
    if(useDefaultUsername){;
        $("#enFname").keyup();
        $('#username').prop('disabled',true)
    }else{
        $('#username').prop('disabled',false)
    }
})

$('#useDefaultPassword').on('change',function(){
    useDefaultPassword = $('#useDefaultPassword').prop('checked');
    if(useDefaultPassword){;
        $("#password").val('000000');
        $("#cpassword").val('000000');
        $("#password").keyup();
        $('#password').prop('disabled',true)
        $('#cpassword').prop('disabled',true)
    }else{
        $('#password').prop('disabled',false)
        $('#cpassword').prop('disabled',false)
    }
})

$("#password").change(function () {
    if ($("#password").val().length >= 6) {
        $("#passdiv").attr('class', 'col-md-12 has-success has-feedback');
        $("#passspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
    } else {
        $("#passdiv").attr('class', 'col-md-12 has-error has-feedback');
        $("#passspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');

        $("#cpassdiv").attr('class', 'col-md-12  has-error has-feedback');
        $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
    }
    if ($("#cpassword").val() == $("#password").val()) {
        $("#cpassdiv").attr('class', 'col-md-12 has-success has-feedback');
        $("#cpassspan").attr('class', 'glyphicon glyphicon-ok form-control-feedback');
    } else {
        $("#cpassdiv").attr('class', 'col-md-12 has-error has-feedback');
        $("#cpassspan").attr('class', 'glyphicon glyphicon-remove form-control-feedback');
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

$("#clearInputBtn").on('click',function(){
    clearInput();
})

var clearInput = function(){
    $("#username").val("")
    $("#thFname").val("")
    $("#thLname").val("")
    $("#enFname").val("")
    $("#enLname").val("")
    $("#empId").val("")
    $("#email").val("")
    $("#position").val("0")
    $("#userType").val("0")
    $('#useDefaultPassword').prop('checked',true)
    $('#useDefaultPassword').change()
}

$('#submitAddUserBtn').on('click',function(){
    if(validationCheck()){
        var comfirmation = confirm("ยืนยันการเพิ่มข้อมูลผู้ใช้");
        if(comfirmation){
            saveUser();
        }
    }else{
        alert("กรอกข้อมูลไม่ครบถ้วน")
    }

})

var validationCheck = function(){
    var valid = true;
    if($("#username").val().length <= 5){
        valid = false;
        $("#username").addClass('validate-fail')
    }else{
        $("#username").removeClass('validate-fail')
    }

    if($("#thFname").val() == ""){
        valid = false
        $("#thFname").addClass('validate-fail')
    }else{
        $("#thFname").removeClass('validate-fail')
    }

    if($("#thLname").val() == ""){
        valid = false;
        $("#thLname").addClass('validate-fail')
    }else{
        $("#thLname").removeClass('validate-fail')
    }

    if($("#enFname").val() == ""){
        valid = false;
        $("#enFname").addClass('validate-fail')
    }else{
        $("#enFname").removeClass('validate-fail')
    }

    if($("#enLname").val() == ""){
        valid = false;
        $("#enLname").addClass('validate-fail')
    }else{
        $("#enLname").removeClass('validate-fail')
    }

    if($("#empId").val().length <= 4){
        valid = false;
        $("#empId").addClass('validate-fail')
    }else{
        $("#empId").removeClass('validate-fail')
    }

    if($("#email").val().length <= 5){
        valid = false;
        $("#email").addClass('validate-fail')
    }else{
        $("#email").removeClass('validate-fail')
    }

    if($("#position").val() == "0"){
        valid = false;
        $("#position").addClass('validate-fail')
    }else{
        $("#position").removeClass('validate-fail')
    }

    if($("#userType").val() == "0"){
        valid = false;
        $("#userType").addClass('validate-fail')
    }else{
        $("#userType").removeClass('validate-fail')
    }

    if($("#password").val() != $("#cpassword").val()){
        valid = false;
        $("#password").addClass('validate-fail')
        $("#cpassword").addClass('validate-fail')
    }else{
        $("#password").removeClass('validate-fail')
        $("#cpassword").removeClass('validate-fail')
    }
    if($("#password").val().length < 6){
        valid = false;
        $("#password").addClass('validate-fail')
        $("#cpassword").addClass('validate-fail')
    }else{
        $("#password").removeClass('validate-fail')
        $("#cpassword").removeClass('validate-fail')
    }

    return valid;
}

var saveUser = function(){
    var ajaxDat1 = $.ajax({
        type: "POST",
        url: context + "/TDCS/saveUser",
        data: {
            empId: $("#empId").val(),
            username : $("#username").val(),
            thFname : $("#thFname").val(),
            thLname : $("#thLname").val(),
            enFname : $("#enFname").val(),
            enLname : $("#enLname").val(),
            password : $("#password").val(),
            email : $("#email").val(),
            position : $("#position").val(),
            userType : $("#userType").val()
        },
        success: function (question) {
            alert("บันทึกข้อมูลเสร็จสิ้น")
            clearInput()
        },
        error: function (xhr) {
            if(xhr.status == 418){
                alert("ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว")
                $("#username").addClass('validate-fail')
            }else if(xhr.status == 410){
                alert("รหัสหนักงานนี้มีอยู่ในระบบแล้ว")
                $("empId").addClass("validate-fail")
            }else if(xhr.status == 200){
                alert("บันทึกข้อมูลเสร็จสิ้น")
                clearInput()
            }else{
                alert("บันทึกข้อมูลล้มเหลว")
            }
        }
    })
}


