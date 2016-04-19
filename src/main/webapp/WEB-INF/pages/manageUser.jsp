<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageUser.js" />"></script>
<script>
    var context = '${context}';

    if ('${status}' == 'user' || '${status}' == 'staff' || '${status}' == '') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<style>
    .search-staff-input{
        padding: 0;
    }

    th{
        font-size: 13px;
    }
</style>

<div class="container">
    <div class="row">
        <h3 class="h3">จัดการบัญชีผู้ใช้</h3>
        <hr/>
    </div>

    <div class="form-horizontal">
        <div class="col-md-offset-1 col-md-10">

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sName" class="col-md-4 control-label">
                        <small>ชื่อ หรือ นามสกุล</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <input id="sName" type="text" class="form-control" placeholder="ชื่อ หรือ นามสกุล"/>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sNickName" class="col-md-4 control-label">
                        <small>ชื่อเล่น</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <input id="sNickName" type="text" class="form-control" placeholder="ชื่อเล่น"/>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sEmpId" class="col-md-4 control-label">
                        <small>รหัสพนักงาน</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <input id="sEmpId" class="form-control" placeholder="รหัสพนักงาน"/>
                    </div>
                </div>

                <div class="col-md-6" style="padding: 0;">
                    <label for="email" class="col-md-4 control-label">
                        <small>อีเมลล์</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <input id="email" class="form-control" placeholder="อีเมล"/>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sPosition" class="col-md-4 control-label">
                        <small>ตำแหน่งงาน</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <select id="sPosition" class="form-control">
                            <option value="">โปรดเลือกตำแหน่งงาน</option>
                            <%--<c:forEach var="position" items="${listPosition}">--%>
                                <%--<option value="${position.posiId}">${position.posiName}</option>--%>
                            <%--</c:forEach>--%>
                            <option value="3">Project Manager</option>
                            <option value="5">Business Analysis</option>
                            <option value="2">Assistant Business Analyst</option>
                            <option value="4">Software Developer</option>
                            <option value="1">Software Developer Trainee</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-6" style="padding: 0;">
                    <label class="col-md-4 control-label">
                        <small>ประเภทผู้ใช้งาน</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <select id="userType" required="true" class="form-control">
                            <option value="0">เลือกประเภทผู้ใช้</option>
                            <option value="2">พนักงาน</option>
                            <option value="3">นักศึกษา</option>
                            <option value="1">ผู้ดูแลระบบ</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sStartTime" class="col-md-4 control-label">
                        <small>เริ่มทำงาน</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <div class='input-group date' id='sStartTime'>
                            <input id="startTime" type='text' class="form-control datepicker" placeholder="  เริ่มทำงาน"/>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sEndTime" class="col-md-4 control-label">
                        <small>ถึง</small>
                    </label>

                    <div class="col-md-8 search-staff-input">
                        <div class='input-group date' id='sEndTime'>
                            <input id="endTime" type='text' class="form-control datepicker" placeholder="  ถึง"/>
                        <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-10 col-md-offset-1">
                <div id="aleartdata" class="alert alert-danger text-center" style="padding: 2px;display: none"
                     role="alert"></div>
            </div>

            <hr/>
            <div class="row form-group">
                <div class="col-md-offset-4 col-md-4 text-center">
                    <button class="btn btn-primary btn-sm" href="javascript:void(0)" id="searchUsers"><span class="glyphicon glyphicon-search"></span>&nbsp;ค้นหา</button>
                    <button class="btn btn-gray btn-sm reset-input-search" style="background-color: rgba(193, 193, 198, 0.83); color: #000000;">
                        ล้างข้อมูล
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="row col-md-offset-1 col-md-10">
        <div id="alertMess" class="alert alert-danger text-center" style="display: none;">ไม่พบข้อมูลพนักงาน</div>
    </div>

    <hr/>
</div>

<div class="row">
    <table class="table" id="tableUsers" style="display: none;">
        <thead class="bg-primary">
        <tr>
            <%--<th style="text-align: center ; border: 1px solid white">ดูข้อมูล</th>--%>
            <th style="text-align: center ; border-left: 1px solid white">รหัสพนักงาน</th>
            <th style="text-align: center ; border-left: 1px solid white">ชื่อ-นามสกุล</th>
            <th style="text-align: center ; border-left: 1px solid white">ประเภทผู้ใช้งาน</th>
            <th style="text-align: center ; border-left: 1px solid white">ตำแหน่ง</th>
            <th style="text-align: center ; border-left: 1px solid white">อีเมล</th>
            <th style="text-align: center ; border-left: 1px solid white">บล็อก</th>
            <th style="text-align: center ; border-left: 1px solid white">ลบ</th>
            <%--<th style="text-align: center ; border: 1px solid white">ระยะเวลาการทำงาน</th>--%>
        </tr>
        </thead>
        <tbody id="resultSearch">

        </tbody>
    </table>
</div>

<div id="init-message-mangeusers" class="alert alert-info text-center">
    <strong>กรุณาค้นหาข้อมูล</strong>
</div>

<div id="users-not-found" class="alert alert-danger text-center" style="display: none;">
    <strong>ไม่พบข้อมูล</strong>
</div>