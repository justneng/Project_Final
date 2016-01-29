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
    if('${status}' == 'user' || '${status}' == ''){
        window.location.href =context+ "/TDCS/index.html";
    }
</script>

<div class="container row">
    <%--<c:choose>--%>
        <%--<c:when test='${status == "admin"}'><h3 class="h3">เพิ่มข้อมูลพนักงาน</h3></c:when>--%>
    <%--</c:choose>--%>
    <h3>ข้อมูลส่วนตัว</h3>
    <hr/>
</div>
<br/><br/>
<div class="row">
<form method="POST" action="${context}/TDCS/insertStaff" modelAttribute="staffData" id="formregis">
<div class="col-md-offset-1 col-md-2">
    <input type="hidden" id="userId" value="${user[0].userId}" />
    <%--<input type="hidden" id="piority" value="${user[0].piority}" />--%>
    <div class="form-group">
        <div class="row">
            <div class="col-md-12 text-center">
                <input type='file' id="image" name="image" style="display: none" autocomplete="off"/>
                <c:choose>
                    <c:when test="${user[0].imange == null}">
                        <img id="myImg" src="<c:url value="/resources/images/blank.jpg" />" alt="your image" width="100%" height="190px"/>
                    </c:when>
                    <c:otherwise>
                        <img id="myImg" src="<c:url value="/resources/pictureUpload/${user[0].imange}" />" alt="your image" width="100%" height="190px"/>
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
            <input id="stuid" name="stuid" class="form-control" value="${user[0].empId}"
                   onkeypress="return numberAndEnglist(event)" maxlength="5" />
        </div>
        <label for="username" class="col-md-1 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>ชื่อผู้ใช้</small>
        </label>
        <input path="status" type="hidden" value="2" />
        <div class="col-md-4">
            <input id="username" name="username" class="form-control" value="${user[0].userName}" disabled/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="fname" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(ไทย)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="fname" name="fname" class="form-control " value="${user[0].thFname}" onkeypress="return isThai(event)" />
        </div>

        <label for="lname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input  id="lname" name="lname" class="form-control" value="${user[0].thLname}" onkeypress="return isThai(event)" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="engfname" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(อังกฤษ)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="engfname" name="engfname" class="form-control " value="${user[0].enFname}"  onkeypress="return isEnglish(event)" />
        </div>

        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="englname" name="englname" class="form-control" value="${user[0].enLname}"  onkeypress="return isEnglish(event)" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อเล่น</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="nickname" name="username" class="form-control" value="${user[0].nickName}" onkeypress="return isThai(event)" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>วันเกิด</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <%--<input id="birthday" class="form-control" value="${user[0].birthDate}" />--%>
                <%--<div class="col-md-5" style="padding: 0px;">--%>
                    <div class='input-group date' id='sBirthday'>
                        <input id="birthday" type='text' class="form-control" readonly="true" value="${user[0].birthDate}"
                               style="cursor:pointer;background-color:white" required="true"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                    </div>
                <%--</div>--%>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
            <small>อายุ</small><small style="color: red">*</small>
        </label>
        <div class="col-md-2">
            <input id="age" class="form-control" disabled/>
        </div>
        <div class="col-md-1">
            <label class="control-label">ปี</label>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>สังกัด</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <%--<input name="username" class="form-control" value="${user[0].company.compName}" />--%>
            <c:set var="companyId" scope="session" value="${user[0].compId}"/>
            <select id="ddlCom" class="form-control" autocomplete="off" required="true">
                <option value="">เลือกสังกัด</option>
                <c:forEach var="conpanyList" items="${listComp}">
                    <option value="${conpanyList.compId}" <c:if test="${conpanyList.compId==companyId}"> selected="selected" </c:if> >
                            ${conpanyList.compName}
                    </option>
                </c:forEach>
            </select>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>แผนก</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input type="hidden" id="sectionIdHiden" value="${user[0].sectionPosition.sectionId}" />
            <%--<input class="form-control" value="${user[0].sectionPosition.section.sectionName}" />--%>
            <select id="section" class="form-control" required="true">
                <%--<option value="">เลือกแผนก</option>--%>
                <%--<c:set var="sectionId" scope="session" value="${user[0].sectionPosition.sectionId}"/>--%>
                <option value="">เลือกแผนก</option>
                <%--<c:forEach var="listSection" items="${listSection}">--%>
                    <%--<option value="${listSection.sectionId}" <c:if test="${listSection.sectionId==sectionId}"> selected="selected" </c:if> >--%>
                            <%--${listSection.sectionName}--%>
                    <%--</option>--%>
                <%--</c:forEach>--%>
            </select>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>ตำแหน่ง</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <%--<input name="username" class="form-control" value="${user[0].sectionPosition.position.posiName}" />--%>
            <%--<c:set var="positionId" scope="session" value="${user[0].spId}"/>--%>
            <input type="hidden" id="jobIdHiden" value="${user[0].spId}" />
            <select <%--path="spId"--%> id="job" class="form-control" required="true">
                <option value="">เลือกตำแหน่ง</option>
                <%--<c:forEach var="sectionPositionList" items="${listSectionPosition}">--%>
                    <%--<option value="${sectionPositionList.spId}" <c:if test="${sectionPositionList.spId==positionId}"> selected="selected" </c:if> >--%>
                            <%--${sectionPositionList.position.posiName}--%>
                    <%--</option>--%>
                <%--</c:forEach>--%>
            </select>
        </div>
        <label for="englname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>ทีม</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <%--<input class="form-control" value="${user[0].team.teamName}" />--%>
            <select id="team" class="form-control" disabled="true"  required="true">
                <%--<option value="">เลือกทีม</option>--%>
                <option value="${user[0].teamId}">${user[0].team.teamName}</option>
            </select>
            <input class="form-control" id="txbTeam" name="txbTeam" required="true" autocomplete="off" style="display:none" />
        </div>
    </div>
</div>

<div class="form-group" id="formGroupPiority" style="display: none">
    <div class="row col-md-12">
        <label for="piority" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ชื่อสายรหัส</small>
            <small style="color: red">*</small>
        </label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <input class="form-control" name="piority" id="piority" value="" autocomplete="off" onkeypress="return isEnglish(event)" />
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>เริ่มทำงาน</small><small style="color: red">*</small>
        </label>
        <div class="col-md-9">
            <div class="col-md-5" style="padding: 0px;">
                <div class='input-group date' id='dpStartWork'>
                    <input id="startWork" type='text' class="form-control" readonly="true" value="${user[0].startWork}"
                                style="cursor:pointer;background-color:white" required="true"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                </div>
            </div>
            <div class="col-md-6">
                <label class="col-md-3 control-label" style="padding-right: 0px;"><small>รวม</small></label>
                <div class="col-md-6" style="padding-right: 0px;">
                    <input id="workeLoad" type="text" class="form-control text-center" disabled="disabled" />
                </div>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ที่อยู่</small><small style="color: red">*</small>
        </label>
        <div class="col-md-9">
            <textarea id="address" class="form-control" >${user[0].address}</textarea>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px"><small>มือถือ</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input path="tell2" id="telMoblie" class="form-control" value="${user[0].tell2}" maxlength="10" onkeypress="return isNumber(event)" />

        </div>

        <label for="stuid" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;"><small>โทร</small>
        </label>
        <div class="col-md-4">
            <input path="tell1" id="telHome" class="form-control " value="${user[0].tell1}" maxlength="10" onkeypress="return isNumber(event)" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>อีเมล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="ssgMail" name="stuid" class="form-control" disabled
                   value="${user[0].eMail1}" />
        </div>
        <label class="col-md-3 control-label" style="text-align: left;"><small>@softsquaregroup.com</small></label>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>อีเมล(สำรอง)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input id="othEmail" name="stuid" class="form-control"  onkeypress="return checkEmail(event)"
                   value="${user[0].eMail2}" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-3 control-label" style="padding-right: 0px">
            <small>Skype Account</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <input path="skype" id="skypeAcc" name="stuid" class="form-control" onkeypress="return numberEnglishEmegency(event)"
                   value="${user[0].skype}" />
        </div>
    </div>
</div>

<input path="imange" type="file" name="file" id="fileUpload" style="display: none"/>
<br/>
<div class="form-group">
    <div class="row">
        <div class="col-md-1 col-md-offset-3">
            <input class="btn btn-primary" type="button" value="ตกลง" onclick="checkEmpty()"/>
        </div>
        <div class="col-md-2 col-md-offset-0" style="margin-left: 5px">
            <input id="changePassword" type="button" class="btn btn-primary" value="เปลี่ยนรหัสผ่าน" />
        </div>
    </div>
</div>
</div>
</div>
</form>
</div>

<div id="changePasswordModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="input-group">
                    เปลี่ยนรหัสผ่าน
                </div>
            </div>
            <div class="modal-body">
                <form id="changPasswordForm" method="post" action="">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class="row">
                                <label for="oldPassword" class="col-md-3 control-label">รหัสผ่านเดิม<label style="color: red">*</label></label>
                                <div class="col-md-7">
                                    <input id="oldPassword" type="password" class="form-control"
                                           onkeypress="return numberAndEnglist(event)" autocomplete="off" required="true"/>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label for="password" class="col-md-3 control-label">รหัสผ่านใหม<label style="color: red">*</label></label>
                                <div class="col-md-7">
                                    <%--<input id="newPassword" type="text" class="form-control" />--%>
                                    <div id="passdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                                        <input type="password" class="form-control" id="password" maxlength="8" onkeypress="return numberAndEnglist(event)"
                                               autocomplete="off"    autocomplete="off" cssClass="form-control error" required="true"/>
                                        <span id="passspan" aria-hidden="true"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label for="cpassword" class="col-md-3 control-label">ยืนยันรหัสผ่านใหม่<label style="color: red">*</label></label>
                                <div class="col-md-7">
                                    <%--<input id="confirmNewPassword" type="text" class="form-control" />--%>
                                    <div id="cpassdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                                        <input type="password" class="form-control" id="cpassword" aria-describedby="inputSuccess2Status"
                                               autocomplete="off" onkeypress="return numberAndEnglist(event)" maxlength="8" required="true"/>
                                        <span id="cpassspan" aria-hidden="true"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <input type="submit" id="submitcahngePass" style="display: none"/>
                <div class="row text-center">
                    <input id="btnChangePass" type="button" class="btn btn-primary" value="ตกลง" />
                    <button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">ยกเลิก</button>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>
    var elementStart;
    $(document).ready(function () {
        var age = $("#birthday").val().split("/");
        $("#age").val(_calculateAge(age[2]+"/"+age[1]+"/"+age[0]));

        <%--elementStart = ['${user[0].empId}','${user[0].userName}','${user[0].thFname}','${user[0].thLname}','${user[0].enFname}','${user[0].enLname}',--%>
            <%--'${user[0].nickName}','${user[0].birthDate}','${user[0].address}','${user[0].tell1}','${user[0].tell2}','${user[0].eMail1}',--%>
            <%--'${user[0].eMail2}','${user[0].skype}','${user[0].startWork}'];--%>
        elementStart = [ '${user[0].empId}', '${user[0].userName}','${user[0].thFname}','${user[0].thLname}','${user[0].enFname}','${user[0].enLname}',
            '${user[0].nickName}','${user[0].birthDate}', '${user[0].address}','${user[0].tell1}',
            '${user[0].tell2}','${user[0].eMail1}','${user[0].skype}','${user[0].eMail2}','${user[0].compId}',
            '${user[0].spId}','${user[0].startWork}'];
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
    $("#workload").val(rerultShow);
</script>
<script src="<c:url value="/resources/js/pageScript/homeStaff.js" />"></script>