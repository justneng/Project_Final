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
    statusUser = '${status}';
    <%--if('${status}' == 'user' || '${status}' == 'staff' || '${status}' == ''){--%>
        <%--window.location.href = "/TDCS/index.html";--%>
    <%--}--%>
</script>
<div class="container row">
    <c:choose>
        <c:when test='${status == "admin"}'>
            <h3 class="h3">เพิ่มข้อมูลนักศึกษาฝึกงาน</h3>
            <hr/>
            <br/><br/>
        </c:when>
        <c:when test='${status == "staff"}'>
            <h3 class="h3">เพิ่มข้อมูลนักศึกษาฝึกงาน</h3>
            <hr/>
            <br/><br/>
        </c:when>
        <c:otherwise>
            <h3 class="h3">ลงทะเบียนนักศึกษา</h3>
            <hr/>
            <br/><br/>
        </c:otherwise>
    </c:choose>

</div>

<div class="row">
<%--<div class="col-md-1"></div>--%>
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
<form:form method="POST" action="" modelAttribute="studentData" id="formregis">
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
           <small>รหัสนักศึกษา</small><small style="color: red">*</small></label>
        <form:input path="status" type="hidden" value="3" />
        <div class="col-md-4">
            <form:input path="empId" id="stuid" name="stuid" class="form-control" title="รหัสนักศึกษาฝึกงาน"
                        maxlength="6" onkeypress="return numberAndEnglist(event)" required="true"/>
        </div>
        <label for="username" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;">
            <small>ชื่อผู้ใช้</small>
        </label>
        <div class="col-md-4">
            <form:input path="userName" id="username" name="username" class="form-control" autocomplete="off" readonly="true" />
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="password" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>รหัสผ่าน</small>
        <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div id="passdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <form:input path="password" type="password" id="password" maxlength="8" title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                            onkeypress="return numberAndEnglist(event)" placeholder="6-8 ตัวอักษร"
                            autocomplete="off" cssClass="form-control error" required="true"/>
                <span id="passspan" aria-hidden="true"></span>
            </div>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
            <small>ยืนยันรหัสผ่าน</small>
        <small style="color: red">*</small></label>
        <div class="col-md-4">
            <div id="cpassdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                <input type="password" class="form-control" id="cpassword"
                       aria-describedby="inputSuccess2Status" placeholder="6-8 ตัวอักษร" title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                       onkeypress="return numberAndEnglist(event)" maxlength="8" required="true"/>
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
        <div class="col-md-2">
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
                <label class="col-md-4 control-label" style="padding-right: 0px"><small>อายุ</small></label>
                <div class="col-md-6" style="padding-right: 0px;padding-left:27px">
                    <input id="age" type="text" class="form-control text-center" disabled="disabled" />
                </div>
                <label class="col-md-1 control-label"><small>ปี</small></label>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>สถาบันการศึกษา</small><small style="color: red">*</small>
        </label>
        <div class="col-md-10">
            <input type="hidden" id="universityId" name="universityId" value="0" />
            <div class="input-group">

                <input id="univerName" name="universityName" type="text" class="form-control" onchange="listuni()" required="true"/>
                <span class="input-group-addon">
                    <i class="glyphicon glyphicon-search" onclick="listuni()" style="cursor: pointer"></i>
                </span>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>คณะ</small><small style="color: red">*</small>
        </label>
        <div class="col-md-4">
            <%--<form:input path="facId" type="hidden" id="facData" value="" />--%>
            <%--<input id="comboFac" class="form-control" list="browsers" name="facName" autocomplete="off" required="true"/>--%>
            <%--<datalist id="browsers">--%>
            <%--</datalist>--%>
            <div class="input-group">
                <%--<form:input path="uniFacId" type="hidden" id="facid" name="facid" value="0" />--%>
                <input id="comboFac" name="facName" type="text" class="form-control" onchange="showFacuty()" required="true"/>
                <span class="input-group-addon">
                    <i class="glyphicon glyphicon-search" onclick="showFacuty()" style="cursor: pointer"></i>
                </span>
            </div>
        </div>
        <label for="depid" class="col-md-2 control-label" style="padding: 7px 0px 7px 0px;">
            <small>สาขา</small><small style="color: red">*</small>
        </label>
        <div class="col-md-4">
            <%--<form:input path="majId" type="hidden" id="depData" value="" />--%>
            <%--<input id="comboDep" class="form-control" list="depList" name="depaName" autocomplete="off" required="true"/>--%>
            <%--<datalist id="depList">--%>
            <%--</datalist>--%>
            <form:input path="uniFacMajId" type="hidden" id="depid" name="depid" value="0" />
            <div class="input-group">

                <input id="comboDep" name="depaName" type="text" class="form-control" onchange="shoeDepartMent()" required="true"/>
                <span class="input-group-addon">
                    <i class="glyphicon glyphicon-search" onclick="shoeDepartMent()" style="cursor: pointer"></i>
                </span>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px">
            <small>ชั้นปี</small><small style="color: red">*</small>
        </label>
        <%--<div class="col-md-9">--%>
            <div class="col-md-2">
                <form:select path="levelStu" id="level" class="form-control" required="true">
                    <option value="">เลือก</option>
                    <c:forEach var="i" begin="1" end="8">
                        <option value="${i}"><c:out value="${i}"/></option>
                    </c:forEach>
                </form:select>
            </div>
            <label for="inputGrade" class="col-md-4 control-label" style="padding: 7px 0px 7px 0px;">
                <small>เกรดเฉลี่ยสะสม</small><small style="color: red">*</small>
            </label>
            <div class="col-md-4">
                <%--<div class="col-md-12">--%>
                    <form:input id="inputGrade" path="grade" class="form-control" maxlength="4"
                                onchange="fullfulegrade()" onkeypress="return isNumberPoint(event)" required="true"/>
                <%--</div>--%>
            </div>
        <%--</div>--%>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ที่อยู่</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <form:textarea path="address" id="address" class="form-control" required="true"></form:textarea>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label for="fname" class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>มือถือ</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="tell2" id="telMoblie" class="form-control" maxlength="10" onkeypress="return isNumber(event)" required="true"/>
        </div>

        <label for="lname" class="col-md-2 control-label" style="padding: 7px 0px 7px 0px;"><small>โทร</small></label>
        <div class="col-md-4">
            <form:input path="tell1" id="telHome" class="form-control " maxlength="10" onkeypress="return isNumber(event)"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-right: 0px"><small>อีเมล</small><small style="color: red">*</small></label>
        <%--<div class="col-md-9">--%>
            <div class="col-md-4">
                <form:input path="eMail1" id="ssgMail" class="form-control" onkeypress="return numberEnglishEmegency(event)"
                            required="true" readonly="true"/>
            </div>
            <label class="col-md-2 control-label" style="text-align: left;"><small>@internal.ssg</small></label>
        </div>
    <%--</div>--%>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>อีเมล(สำรอง)</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="eMail2" id="email" class="form-control" onkeypress="return checkEmail(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>Skype Account</small><small style="color: red">*</small></label>
        <div class="col-md-4">
            <form:input path="skype" id="skypeAcc" class="form-control"  onkeypress="return numberEnglishEmegency(event)" required="true"/>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ระยะเวลาฝึกงาน</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <div class="col-md-5" style="padding-left: 0px;padding-right: 25px">
                <div class='input-group date' id='sStartTime'>
                    <form:input path="startWork" id="startTime" type='text'
                                class="form-control" placeholder="เริ่มฝึกงาน" onchange="getTimeWork()" readonly="true" required="true"
                                style="margin-top:0px;cursor:pointer;background-color:white"
                            />
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                </div>
            </div>
            <div class="col-md-2 text-right" style="padding-left: 50px;">
                <label class="col-md-3 control-label">
                    <small>ถึง</small><small style="color: red">*</small>
                </label>
            </div>
            <div class="col-md-5" style="padding-right: 0px;padding-left: 20px">
                <div class='input-group date' id='sEndTime'>
                    <form:input path="endWork" id="endTime" type='text'
                                class="form-control" placeholder="ถึง" onchange="getTimeWork()" readonly="true" required="true"
                                style="margin-top:0px;cursor:pointer;background-color:white"
                            />
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label"><small>รวม</small></label>
        <%--<div class="col-md-9">--%>
            <div class="col-md-4">
                <input id="sumDate" name="username" class="form-control" disabled="disabled" />
            </div>
        <%--</div>--%>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>ประเภทการฝึก</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <form:select path="aptId" id="type" class="form-control" required="true">
                <option value="">เลือกประเภทการฝึก</option>
                <c:forEach var="getApp" items="${listApp}">
                    <option value="${getApp.aptId}"> ${getApp.aptName} </option>
                </c:forEach>
            </form:select>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>เข้าฝึกตำแหน่ง</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <%--<form:select path="posiId"  id="job" class="form-control" name="jobName" required="true">--%>
                <%--<option value="">เลือกตำแหน่ง</option>--%>
                <%--<c:forEach var="positionList" items="${listPosition}">--%>
                    <%--<option value="${positionList.posiId}"> ${positionList.posiName} </option>--%>
                <%--</c:forEach>--%>
            <%--</form:select>--%>

                <form:select path="posiId" id="position" name="position" class="form-control" required="true">
                    <option value="">เลือกตำแหน่ง</option>
                    <c:forEach var="positionList" items="${listPosition}">
                        <option value="${positionList.posiId}"> ${positionList.posiName}</option>
                    </c:forEach>
                </form:select>

                <%--<form:select path="jobId" id="position" class="form-control combobox" data-width="100%">--%>
                <%--<c:forEach var="getJob" items="${listJob}">--%>
                <%--<option value="${getJob.jobId}"> ${getJob.jobName} </option>--%>
                <%--</c:forEach>--%>
                <%--</form:select>--%>
        </div>
    </div>
</div>

<div class="form-group">
    <div class="row col-md-12">
        <label class="col-md-2 control-label" style="padding-left: 0px;padding-right: 0px"><small>พนักงานที่ปรึกษา</small><small style="color: red">*</small></label>
        <div class="col-md-10">
            <form:select path="staffId" id="advisor" name="advisor" class="form-control" required="true">
                <option value="">เลือกพนักงานที่ปรึกษา</option>
                <c:forEach var="getStaff" items="${listUser}">
                    <option value="${getStaff.userId}"> ${getStaff.thFname} ${getStaff.thLname} (${getStaff.nickName})</option>
                </c:forEach>
            </form:select>
        </div>
    </div>
</div>
<form:input path="imange" type="file" name="file" id="fileUpload" style="display: none"/>
<div class="form-group">
    <div class="row col-md-6 col-md-offset-3">
        <input type="submit" id="btnSubmit" style="display: none"/>
        <input type="button" class="btn btn-primary pull-left" value="&nbsp;&nbsp;&nbsp;&nbsp;ตกลง&nbsp;&nbsp;&nbsp;&nbsp;"
               onclick="checkEmpty()" />

        <a id="cleardata" class="btn btn-primary pull-left" style="margin-left: 20px" onclick="reloadfunc()">
            &nbsp;ล้างข้อมูล&nbsp;
        </a>
        <a id="cancel" class="btn" style="background-color: rgba(193, 193, 198, 0.83); color: #000000;margin-left: 20px">
            &nbsp;&nbsp;&nbsp;&nbsp;ยกเลิก&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
    </div>
</div>
</div>
</div>
</form:form>

</div>

<!-- Button trigger modal -->
<%--<a data-toggle="modal" href="#myModal" class="btn btn-primary btn-lg">Launch demo modal</a>--%>

<!-- Modal -->

<div id="listUniver" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>--%>
                <div class="input-group">
                    <span class="input-group-addon">ชื่อสถาบันการศึกษา</span>
                    <input id="filter" type="text" class="form-control" placeholder="ชื่อสถาบันการศึกษา">
                </div>
            </div>
            <div class="modal-body">
                <table class="table table-striped table-hover">
                    <tbody class="searchable" id="trUniversity">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="listFac" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>--%>
                <div class="input-group">
                    <span class="input-group-addon">ชื่อคณะ</span>
                    <input id="filterFac" type="text" class="form-control" placeholder="ชื่อคณะ">
                </div>
            </div>
            <div class="modal-body">
                <table class="table table-striped table-hover">
                    <tbody class="searchable" id="trFacuty">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="listDep" class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>--%>
                <div class="input-group">
                    <span class="input-group-addon">ชื่อสาขา</span>
                    <input id="filterDep" type="text" class="form-control" placeholder="ชื่อสาขา">
                </div>
            </div>
            <div class="modal-body">
                <table class="table table-striped table-hover">
                    <tbody class="searchable" id="trDepartment">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<form id="formAfterAdd" action="${context}/TDCS/showStudentData" method="post">
    <input type="hidden" id="ID" name="ID" value=""/>
</form>

<script src="<c:url value="/resources/js/pageScript/addStudent.js" />"></script>
