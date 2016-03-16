<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 15/7/2558
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<style>
    #tbManagePaper {
        margin-top: 3px;
        display: none;
    }

    #tbodyManagePaper td {
        font-size: 13px;
    }

    .alert-info, .alert-danger{
        margin-top: 3px;

    }

    #tbodyManagePaper label{
        font-weight: normal !important;
    }

    th {
        text-align: center;
    }

    .add-paper {
        padding-left: 0;
    }

    span .glyphicon-triangle-bottom, .glyphicon-triangle-top{
        font-size: 1px;
        cursor: pointer;
        color: #777777;
    }

    .sorting-column{
        display: inline-block;
        width: 15px;
        vertical-align: middle;"
    }

    #paper-not-found-message ,#deletePapers{
        display: none;
    }

</style>

<script>
    var context = '${context}';
    $('#flash').hide();
</script>

<div class="container-fluid">
    <div class="row">
        <h3 class="h3">จัดการชุดข้อสอบ</h3>
        <hr/>
    </div>

    <div class="row">
        <%@include file="template/searchPaperTemplateNew.jsp" %>
    </div>

    <div class="row">
        <div class="col-sm-6 add-paper">
            <a href="${context}/TDCS/exam/createPaper" style="bottom: 0;">
                <button class="btn btn-primary btn-sm" align="center">
                    <span class="glyphicon glyphicon-plus"><label>&nbsp;<strong>สร้างชุดข้อสอบ</strong></label></span>
                </button>
            </a>
            <button id="deletePapers" class="btn btn-gray btn-sm"><span class="glyphicon glyphicon-minus"><label>
                &nbsp;<strong>ลบออก</strong></label></span></button>
        </div>
    </div>
    <div class="row table-responsive">
        <table id="tbManagePaper" class="table table-bordered table-hovered" width="100%">
            <thead class="table-header small">
            <tr>
                <th width="3%" style="vertical-align: middle;"><input id="checkPaperAll" type="checkbox"/></th>
                <th width="12%">
                    <label value="code">รหัสชุดข้อสอบ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="30%">
                    <label value="name">ชื่อชุดข้อสอบ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="15%">
                    <label value="createBy">สร้างโดย</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="8%">
                    <label value="maxScore">คะแนน</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="21%">
                    <label value="position">ประเภทผู้สอบ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="8%">
                    <label value="paperStatus">สถานะ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="5%"style="vertical-align: middle;">
                    แก้ไข
                </th>
            </tr>
            </thead>
            <tbody id="tbodyManagePaper" align="center">

            </tbody>
        </table>
    </div>

    <div id="init-message-show" class="row alert alert-info text-center">
        <strong>กรุณาค้นหาชุดข้อสอบที่ต้องการ</strong>
    </div>

    <div id="paper-not-found-message" class="row alert alert-danger text-center">
        <strong>ไม่พบข้อมูล</strong>
    </div>

    <%@include file="template/paginationTemplate.jsp" %>

</div>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/paper.js" />"></script>
<<<<<<< 94164463eb48811be54f2ae8ff886469cc3b93d5
=======
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/selectEmployee.js" />"></script>
>>>>>>> update project
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/categoryDropdown.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/orderPaper.js" />"></script>



