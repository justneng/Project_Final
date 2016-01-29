<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>

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
<form:form method="POST" action="${context}/TDCS/insertStaff" modelAttribute="staffData" id="formregis">
<div class="col-md-2 col-md-offset-1 text-center">
    <input type='file' id="image" name="image" style="display: none" autocomplete="off"/>
    <img id="myImg" src="<c:url value="/resources/images/blank.jpg" />" alt="your image" width="100%" height="190px"/>
    <label for="image">แก้ไข</label>
</div>
<div class="col-md-8">
<div class="form-horizontal">

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-2 control-label" style="padding-right: 0px">
            <small>รหัสพนักงาน</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="empId" id="stuid" name="stuid" class="form-control"
                        maxlength="5" onkeypress="return numberAndEnglist(event)" required="true"/>
        </div>
        <label for="username" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;">
            <small>ชื่อผู้ใช้</small>
        </label>
        <form:input path="status" type="hidden" value="2" />
        <div class="col-md-4">
            <form:input path="userName" id="username" name="username" class="form-control" readonly="true" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="password" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>รหัสผ่าน</small><small style="color: red">*</small>
        </label>
        <div class="col-md-4">
            <div id="passdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <form:input path="password" type="password" id="password" onkeypress="return numberAndEnglist(event)" title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                            maxlength="8" autocomplete="off" cssClass="form-control error" required="true"/>
                <span id="passspan" aria-hidden="true"></span>
            </div>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>ยืนยันรหัสผ่าน</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div id="cpassdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <input type="password" class="form-control" id="cpassword" aria-describedby="inputSuccess2Status" title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                       maxlength="8" onkeypress="return numberAndEnglist(event)" required="true"/>
                <span id="cpassspan" aria-hidden="true"></span>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="fname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(ไทย)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="thFname" id="fname" name="fname" class="form-control " onkeypress="return isThai(event)" required="true"/>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="thLname"  id="lname" name="lname" class="form-control" onkeypress="return isThai(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="engfname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อ(อังกฤษ)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="enFname" id="engfname" name="engfname" class="form-control " onkeypress="return isEnglish(event)" required="true"/>
        </div>

        <label for="englname" class="col-md-2 control-label" style="padding: 7px 0px 7px 0px;"><small>นามสกุล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="enLname"  id="englname" name="englname" class="form-control" onkeypress="return isEnglish(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ชื่อเล่น</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="nickName" id="nickname" name="username" class="form-control" onkeypress="return isThai(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>วันเกิด</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <div class="col-md-5" style="padding-left: 0px;padding-right: 25px">
                <div class='input-group date' id='sBirthday'>
                    <form:input path="birthDate" id="birthday" type='text' class="form-control" readonly="true"
                                style="cursor:pointer;background-color:white" required="true"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                </div>
            </div>
            <div class="col-md-6">
                <label class="col-md-4 control-label" style="padding-right: 0px;"><small>อายุ</small></label>
                <div class="col-md-6" style="padding-right: 0px;padding-left:24px">
                    <input id="age" type="text" class="form-control text-center" disabled="disabled" />
                </div>
                <div class="col-md-1">
                    <label class="control-label">ปี</label>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="password" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>สังกัด</small><small style="color: red">*</small>
        </label>
        <div class="col-md-4">
            <form:select path="compId" id="ddlCom" class="form-control" autocomplete="off" required="true">
                <option value="">เลือกสังกัด</option>
                <c:forEach var="conpanyList" items="${listComp}">
                    <option value="${conpanyList.compId}">
                            ${conpanyList.compName}
                    </option>
                </c:forEach>
            </form:select>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>แผนก</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <form:select path="sectionId" id="section" class="form-control" required="true">
                    <option value="">เลือกแผนก</option>
                    <c:forEach var="sectionList" items="${listSection}">
                        <option value="${sectionList.sectionId}">
                                ${sectionList.sectionName}
                        </option>
                    </c:forEach>
                </form:select>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="password" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ตำแหน่ง</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <form:select path="spId" id="job" class="form-control" required="true">
                    <option value="">เลือกตำแหน่ง</option>
                    <c:forEach var="SectionPositionList" items="${listSectionPosition}">
                        <option value="${SectionPositionList.spId}">
                                ${SectionPositionList.position}
                        </option>
                    </c:forEach>
                </form:select>
            </div>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>ทีม</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <form:select path="teamId" id="team" class="form-control" disabled="true"  required="true">
                    <%--<option value="">เลือกทีม</option>--%>
                </form:select>
                <input class="form-control" id="txbTeam" name="txbTeam" required="true" autocomplete="off" style="display:none" />
            </div>
        </div>
    </div>
</div>

<div class="form-group" id="formGroupPiority" style="display: none">
    <div class="row col-md-12">
        <label for="password" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ชื่อสายรหัส</small>
            <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <input class="form-control" name="piority" id="piority" maxlength="7" autocomplete="off"
                       onkeypress="return numberAndEnglist(event)"/>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>เริ่มทำงาน</small><small style="color: red">*</small>
        </label>
        <div class="col-md-10">
            <div class="col-md-5" style="padding-left: 0px;padding-right: 25px">
                <div class='input-group date' id='dpStartWork'>
                    <form:input path="startWork" id="startWork" type='text' class="form-control" readonly="true"
                                style="cursor:pointer;background-color:white" required="true"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                </div>
            </div>
            <div class="col-md-6">
                <label class="col-md-4 control-label" style="padding-right: 0px;"><small>รวม</small></label>
                <div class="col-md-6" style="padding-right: 0px;padding-left: 23px">
                    <input id="workeLoad" type="text" class="form-control text-center" disabled="disabled" />
                </div>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ที่อยู่</small><small style="color: red">*</small>
        </label>
        <div class="col-md-10">
            <form:textarea path="address" onkeyup="textAreaAdjust(this)" id="address" class="form-control" required="true" style="resize:none"></form:textarea>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>มือถือ</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="tell2" id="telMoblie" class="form-control" maxlength="10" onkeypress="return isNumber(event)" required="true"/>
        </div>

        <label for="stuid" class="col-md-2 control-label" style="padding: 7px 0px 7px 0px;"><small>โทร</small></label>
        <div class="col-md-4">
            <form:input path="tell1" id="telHome" class="form-control " maxlength="10" onkeypress="return isNumber(event)"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-2 control-label" style="padding-right: 0px">
            <small>อีเมล</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="eMail1" id="ssgMail" name="stuid" class="form-control"
                        onkeypress="return numberAndEnglist(event)" readonly="true" required="true"/>
        </div>
        <label class="col-md-2 control-label" style="text-align: left;"><small>@softsquaregroup.com</small></label>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-2 control-label" style="padding-right: 0px">
            <small>อีเมล(สำรอง)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="eMail2" id="othEmail" name="stuid" class="form-control"
                        onkeypress="return checkEmail(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="stuid" class="col-md-2 control-label" style="padding-right: 0px">
            <small>Skype Account</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="skype" id="skypeAcc" name="stuid" class="form-control"
                        onkeypress="return numberEnglishEmegency(event)" required="true"/>
        </div>
    </div>
</div>

<form:input path="imange" type="file" name="file" id="fileUpload" style="display: none"/>
<div class="form-group">
    <div class="row col-md-6 col-md-offset-3">
        <input type="submit" id="btnSubmit" style="display: none" />

        <input type="button" class="btn btn-primary pull-left" value="&nbsp;&nbsp;&nbsp;&nbsp;ตกลง&nbsp;&nbsp;&nbsp;&nbsp;" onclick="checkEmpty()" />

        <a id="cleardata" class="btn btn-primary pull-left" style="margin-left: 20px" onclick="window.location.href =${context}'/TDCS/addStaff.html'">
            &nbsp;ล้างข้อมูล&nbsp;
        </a>
        <a id="cancel" class="btn" style="background-color: rgba(193, 193, 198, 0.83); color: #000000;margin-left: 20px" href=${context}"/TDCS/home.html">
            &nbsp;&nbsp;&nbsp;&nbsp;ยกเลิก&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
    </div>
</div>
</div>
</div>
</form:form>
</div>

<form id="formAfterAdd" action="${context}/TDCS/getStaffDataAfterAdd" method="post">
    <input type="hidden" id="ID" name="ID" value=""/>
</form>

<script>
    function textAreaAdjust(o) {
        o.style.height = "1px";
        o.style.height = (25+o.scrollHeight)+"px";
    }
</script>
<script src="<c:url value="/resources/js/pageScript/addStaff.js" />"></script>