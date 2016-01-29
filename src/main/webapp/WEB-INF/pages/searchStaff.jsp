<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link class="cssdeck" href="<c:url value="/resources/bootstarpTable/bootstrap-table.css" />" rel="stylesheet" >
<script type="text/javascript" src="<c:url value="/resources/bootstarpTable/bootstrap-table.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/searchStaff.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/randomString.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/callculatetime.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if('${status}' == 'user' || '${status}' == 'staff' || '${status}' == ''){
        window.location.href = context+"/TDCS/index.html";
    }
</script>
<div class="container">
    <div class="row">
        <h3 class="h3">ค้นหาข้อมูลพนักงาน</h3>
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
                    <label for="sEmpId" class="col-md-4 control-label"><small>รหัสพนักงาน</small></label>
                    <div class="col-md-8">
                        <input id="sEmpId" class="form-control" placeholder="รหัสพนักงาน"/>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sCompany" class="col-md-4 control-label"><small>บริษัท</small></label>
                    <div class="col-md-8">
                        <select id="sCompany" class="form-control">
                            <option value="">โปรเลือกบริษัท</option>
                            <c:forEach var="company" items="${listCompany}">
                                <option value="${company.compId}">${company.compName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sSection" class="col-md-4 control-label"><small>แผนก</small></label>
                    <div class="col-md-8">
                        <select id="sSection" class="form-control">
                            <option value="">โปรดเลือกแผนก</option>
                            <c:forEach var="section" items="${listSection}">
                                <option value="${section.sectionId}">${section.sectionName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="col-md-6" style="padding: 0;">
                    <label for="sPosition" class="col-md-4 control-label"><small>ตำแหน่งงาน</small></label>
                    <div class="col-md-8">
                        <select id="sPosition" class="form-control">
                            <option value="">โปรดเลือกตำแหน่งงาน</option>
                            <c:forEach var="position" items="${listPosition}">
                                <option value="${position.posiId}">${position.posiName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-md-6" style="padding: 0;">
                    <label for="sStartTime" class="col-md-4 control-label"><small>เริ่มทำงาน</small></label>
                    <div class="col-md-8">
                        <div class='input-group date' id='sStartTime'>
                            <input id="startTime" type='text' class="form-control" placeholder="เริ่มทำงาน" />
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
                            <input id="endTime" type='text' class="form-control" placeholder="ถึง" />
                        <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-10 col-md-offset-1">
                <div id="aleartdata" class="alert alert-danger text-center" style="padding: 2px;display: none" role="alert"></div>
            </div>


            <div class="row form-group">
                <div class="col-md-offset-4 col-md-4 text-center">
                    <a class="btn btn-primary" href="javascript:void(0)" id="search">&nbsp;&nbsp;&nbsp;&nbsp;ค้นหา&nbsp;&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;
                    <a class="btn" style="background-color: rgba(193, 193, 198, 0.83); color: #000000;" href="searchStaff.html">&nbsp;&nbsp;ล้างข้อมูล&nbsp;&nbsp;</a>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
        <div class="col-md-2"></div>

    </div>

        <div class="row col-md-offset-1 col-md-10">
            <div id="alertMess" class="alert alert-danger text-center" style="display: none;">ไม่พบข้อมูลพนักงาน</div>
        </div>
</div>
<%--CREATE BY PEEM--%>
<div class="row">
    <table class="table" id="table">
        <thead class="bg-primary">
        <tr>
            <th style="text-align: center ; border: 1px solid white">ดูข้อมูล</th>
            <th style="text-align: center ; border-left: 1px solid white">รหัสพนักงาน</th>
            <th style="text-align: center ; border-left: 1px solid white">ชื่อ-นามสกุล</th>
            <th style="text-align: center ; border-left: 1px solid white">สังกัด</th>
            <th style="text-align: center ; border-left: 1px solid white">ทีม</th>
            <th style="text-align: center ; border-left: 1px solid white">ตำแหน่ง</th>
            <th style="text-align: center ; border: 1px solid white">แผนก</th>
            <th style="text-align: center ; border: 1px solid white">ระยะเวลาการทำงาน</th>
        </tr>
        </thead>
        <tbody id="resultSearch">

        </tbody>
    </table>
</div>
<%--CREATE BY PEEM--%>
