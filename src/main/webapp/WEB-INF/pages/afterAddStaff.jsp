<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if('${status}' == 'user' || '${status}' == 'staff' || '${status}' == ''){
        window.location.href = context+"/TDCS/index.html";
    }
</script>

<div class="container row">
    <c:choose>
        <c:when test='${status == "admin"}'><h3 class="h3">เพิ่มข้อมูลพนักงาน</h3></c:when>
    </c:choose>
    <hr/>
</div>
<br/><br/>
<div class="row">
<%--<div class="col-md-3">--%>
<%--<div class="form-group">--%>
<%--<div class="row">--%>
<%--<div class="col-md-12 text-center">--%>
<%--<img id="profile" class="" src="../../resources/images/Untitled.png" width="150px" height="150px"/>--%>
<%--</div>--%>
<%--</div>--%>
<%--<div class="row">--%>
<%--<div class="col-md-12 text-center">--%>
<%--<label for="fileUpload" style="color: #222;cursor: pointer">แก้ไข</label>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<form method="POST" action="${context}/TDCS/insertStaff" modelAttribute="staffData" id="formregis">
<div class="col-md-offset-1 col-md-2">
    <input type="hidden" id="userId" value="${userdata[0].userId}" />
    <%--<input type="hidden" id="piority" value="${user[0].piority}" />--%>
    <div class="form-group">
        <div class="row">
            <div class="col-md-12 text-center">
                <input type='file' id="image" name="image" style="display: none" autocomplete="off"/>
                |${userdata[0].imange}|
                <c:choose>
                    <c:when test="${userdata[0].imange == null}">
                        <img id="myImg" src="<c:url value="/resources/images/blank.jpg" />" alt="your image" width="100%" height="190px"/>
                    </c:when>
                    <c:otherwise>
                        <img id="myImg" src="<c:url value="/resources/pictureUpload/${userdata[0].imange}" />" alt="your image" width="100%" height="190px"/>
                    </c:otherwise>
                </c:choose>
                <%--</div>--%>
                <label for="image">แก้ไข</label>
            </div>

        </div>
    </div>
</div>
<div class="col-md-9">
<div class="form-horizontal">

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>รหัสพนักงาน</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="stuid" name="stuid" class="form-control" value="${userdata[0].empId}"
                        maxlength="5" disabled/>
        </div>
        <label for="username" class="col-md-1 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>ชื่อผู้ใช้</small>
        </label>
        <input path="status" type="hidden" value="2" />
        <div class="col-md-4">
            <input id="username" name="username" class="form-control" value="${userdata[0].userName}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="fname" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(ไทย)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="fname" name="fname" class="form-control " value="${userdata[0].thFname}" disabled="true"/>
        </div>

        <label for="lname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input  id="lname" name="lname" class="form-control" value="${userdata[0].thLname}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="engfname" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(อังกฤษ)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="engfname" name="engfname" class="form-control " value="${userdata[0].enFname}" disabled="true"/>
        </div>

        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="englname" name="englname" class="form-control" value="${userdata[0].enLname}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อเล่น</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="nickname" name="username" class="form-control" value="${userdata[0].nickName}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>วันเกิด</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="birthday" class="form-control" value="${userdata[0].birthDate}" disabled="true"/>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>อายุ</small><small style="color: red">*</small></label>
        <div class="col-md-2">
            <input id="age" class="form-control" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>สังกัด</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input name="username" class="form-control" value="${userdata[0].company.compName}" disabled="true"/>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>แผนก</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input class="form-control" value="${userdata[0].sectionPosition.section.sectionName}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ตำแหน่ง</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input name="username" class="form-control" value="${userdata[0].sectionPosition.position.posiName}" disabled="true"/>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>ทีม</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input class="form-control" value="${userdata[0].team.teamName}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group" id="formGroupPiority">
    <div class="row col-md-12">
        <label for="piority" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ชื่อสายรหัส</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <input class="form-control" name="piority" id="piority" value="${userdata[0].piority}" disabled="true"/>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>เริ่มทำงาน</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="startWork" class="form-control" value="${userdata[0].startWork}" disabled="true"/>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>รวม</small><small style="color: red">*</small></label>
        <div class="col-md-2">
            <input id="workload" class="form-control" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ที่อยู่</small><small style="color: red">*</small>
        </label>
        <div class="col-md-9">
            <textarea id="address" class="form-control" disabled="true">${userdata[0].address}</textarea>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>โทร</small></label>
        <div class="col-md-4">
            <input path="tell1" class="form-control " value="${userdata[0].tell1}" disabled="true"/>
        </div>

        <label for="stuid" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>มือถือ</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input path="tell2" id="telMoblie" class="form-control" value="${userdata[0].tell2}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>อีเมล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="ssgMail" name="stuid" class="form-control"
                   value="${userdata[0].eMail1}" disabled="true"/>
        </div>
        <label class="col-md-3 control-label" style="text-align: left;"><small>@softsquaregroup.com</small></label>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>อีเมล(สำรอง)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="othEmail" name="stuid" class="form-control"
                   value="${userdata[0].eMail2}" disabled="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>Skype Account</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input path="skype" id="skypeAcc" name="stuid" class="form-control"
                   value="${userdata[0].skype}" disabled="true"/>
        </div>
    </div>
</div>

<input path="imange" type="file" name="file" id="fileUpload" style="display: none"/>
<br/>
<div class="form-group">
    <div class="row col-md-6 col-md-offset-3" style="padding-left: 7px">
        <a id="cleardata" class="btn btn-primary pull-left" onclick="window.location.href = context+'/TDCS/addStaff.html'">
            เพิ่มพนักงาน
        </a>
    </div>
</div>
</div>
</div>
</form>
</div>
<script>
    $(document).ready(function () {
        var age = $("#birthday").val().split("/");
        $("#age").val(_calculateAge(age[2]+"/"+age[1]+"/"+age[0]));
    });


    var stDate = $("#startWork").val().split('/');
    var dString = stDate[2]+","+ stDate[1] +","+ stDate[0];
    var d1 = new Date(dString);
    var d2 = new Date();
    var y = DateDiff.inYears(d1, d2),m = DateDiff.inMonths(d1,d2),d = DateDiff.inDays(d1,d2);
    var rerultShow = "";

    if(m>=12){
        y=m/12;
        rerultShow += parseInt(y+"")+" ปี";
        if(m%12>0){
            m%=12;
            m+" เดือน"
        }



    }else{
        rerultShow += m+" เดือน";
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
    $("#workload").val(rerultShow);
</script>