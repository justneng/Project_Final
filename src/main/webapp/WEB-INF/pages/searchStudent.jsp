<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link class="cssdeck" href="<c:url value="/resources/bootstarpTable/bootstrap-table.css" />" rel="stylesheet" >
<script type="text/javascript" src="<c:url value="/resources/bootstarpTable/bootstrap-table.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/randomString.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/searchStudent.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if ('${status}' == 'user' || '${status}' == '') {
        window.location.href = context+"/TDCS/index.html";
    }
</script>
<div class="container">
    <div class="row">
        <h3 class="h3">ค้นหาข้อมูลนักศึกษา</h3>
        <hr/>
    </div>

    <div class="form-horizontal">
        <div class="col-md-offset-1 col-md-10">

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sName" class="col-md-4 control-label"><small>ชื่อ หรือ นามสกุล</small></label>
                    <div class="col-md-8">
                        <input id="sName" type="text" class="form-control" placeholder="ชื่อ หรือ นามสกุล"/>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sNickName" class="col-md-4 control-label"><small>ชื่อเล่น</small></label>
                    <div class="col-md-8">
                        <input id="sNickName" type="text" class="form-control" placeholder="ชื่อเล่น"/>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sUniversity" class="col-md-4 control-label"><small>สถาบันการศึกษา</small></label>
                    <div class="col-md-8">
                        <input id="sUniversity" class="form-control" list="univer" autocomplete="off" placeholder="โปรดเลือกสถาบันการศึกษา"/>
                        <datalist id="univer">
                            <c:forEach var="getUni" items="${listUni}">
                                <option value="${getUni.university_name}"> ${getUni.university_name} </option>
                            </c:forEach>
                        </datalist>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sFaculty" class="col-md-4 control-label"><small>คณะ</small></label>
                    <div class="col-md-8">
                        <select id="sFaculty" class="form-control" data-width="100%">
                            <option value="">โปรดเลือกคณะ</option>
                            <c:forEach var="faculty" items="${listFac}">
                                <option value="${faculty.facId}">${faculty.facName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sMajor" class="col-md-4 control-label"><small>สาขา</small></label>
                    <div class="col-md-8">
                        <select id="sMajor" class="form-control" data-width="100%">
                            <option value="">โปรดเลือกสาขา</option>
                            <c:forEach var="major" items="${listMaj}">
                                <option value="${major.majId}">${major.majName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sPosition" class="col-md-4 control-label"><small>ตำแหน่ง</small></label>
                    <div class="col-md-8">
                        <select id="sPosition" class="form-control" data-width="100%">
                            <option value="">โปรเลือกตำแหน่งงาน</option>
                            <c:forEach var="getJob" items="${listJob}">
                                <option value="${getJob.posiId}"> ${getJob.posiName} </option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sStartTime" class="col-md-4 control-label"><small>เริ่มฝึกงาน</small></label>
                    <div class="col-md-8">
                        <div class='input-group date' id='sStartTime'>
                            <input id="startTime" type='text' class="form-control" placeholder="เริ่มฝึกงาน"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sEndTime" class="col-md-4 control-label"><small>ถึง</small></label>
                    <div class="col-md-8">
                        <div class='input-group date' id='sEndTime'>
                            <input id="endTime" type='text' class="form-control" placeholder="สิ้นสุดฝึกงาน"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- START PEEM'S EDIT-->
            <c:if test="${status == 'admin'}">
                <div class="row form-group">
                    <div class="col-md-12" style="padding: 0;">
                        <label for="sStaff" class="col-md-2 control-label"><small>พนักงานที่ปรึกษา</small></label>
                        <div class="col-md-10">
                            <select id="sStaff" class="form-control" data-width="100%">
                                <option value="">โปรดเลือกพนักงานที่ปรึกษา</option>
                                <c:forEach var="staff" items="${listUser}">
                                    <option value="${staff.userId}">${staff.thFname} ${staff.thLname} (${staff.nickName})</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
            </c:if>
            <!-- END PEEM'S EDIT -->

            <div class="col-md-10 col-md-offset-1">
                <div id="aleartdata" class="alert alert-danger text-center" style="padding: 2px;display: none" role="alert"></div>
            </div>

            <div class="row form-group">
                <div class="col-md-offset-4 col-md-4 text-center">
                    <a id="search" class="btn btn-primary" href="javascript:void(0);">&nbsp;&nbsp;&nbsp;&nbsp;ค้นหา&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;
                    <a id="cancel" class="btn" style="background-color: rgba(193, 193, 198, 0.83); color: #000000;"
                       href="javascript:void(0);">&nbsp;&nbsp;ล้างข้อมูล&nbsp;&nbsp;</a>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
        <div class="col-md-2"></div>
    </div>



        <div class="row col-md-offset-1 col-md-10">
            <div id="alertMess" class="alert alert-danger text-center" style="display: none;">ไม่พบข้อมูลนักศักษา</div>
        </div>

</div>

<%--CREATE BY PEEM--%>
<div class="row">
            <table class="table" id="table">
                <thead class="bg-primary">
                    <tr>
                        <th style="text-align: center ; border: 1px solid white">ดูข้อมูล</th>
                        <th style="text-align: center ; border-left: 1px solid white">รหัสนักศึกษา</th>
                        <th style="text-align: center ; border-left: 1px solid white">ชื่อ-นามสกุล</th>
                        <th style="text-align: center ; border-left: 1px solid white">สถาบัน</th>
                        <th style="text-align: center ; border-left: 1px solid white">สาขา</th>
                        <th style="text-align: center ; border-left: 1px solid white">ประเภทการฝึก</th>
                        <th style="text-align: center ; border: 1px solid white">ระยะเวลาฝึก</th>
                        <c:if test="${status == 'staff'}">
                            <th style="text-align: center ; border: 1px solid white">ผลการประเมิน</th>
                        </c:if>
                    </tr>
                </thead>
                <tbody id="resultSearch">

                </tbody>
            </table>
</div>
<%--CREATE BY PEEM--%>
<script>
    var status = '${status}';
</script>

</div>
