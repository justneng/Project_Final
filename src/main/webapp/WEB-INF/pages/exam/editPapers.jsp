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
<script>
    var context = '${context}';
</script>
<style>
    #tbManagePaper{
        margin-top: 3px;
    }
    td{
        font-size: 13px;
    }
</style>

<div class="container-fluid">
    <div class="row">
        <h3 class="h3">จัดการชุดข้อสอบ</h3>
        <hr/>
    </div>
    <div class="row">
        <%@include file="template/searchPaperTemplateNew.jsp" %>
    </div>
    <div class="row">
        <a href="${context}/TDCS/exam/createPaper">
            <button class="btn btn-success btn-sm" align="center">
                <span class="glyphicon glyphicon-plus"></span>
            </button>
        </a>
        <button id="deletePapers" class="btn btn-danger btn-sm"><span
                class="glyphicon glyphicon-minus"></span></button>
    </div>
    <div class="row">
        <table id="tbManagePaper" class="table table-responsive table-hover">
            <thead class="bg-primary small">
            <tr>
                <th style="text-align: center"><input id="checkPaperAll" type="checkbox"/></th>
                <th style="text-align: center">รหัสชุดข้อสอบ</th>
                <th style="text-align: center">ชื่อชุดข้อสอบ</th>
                <th style="text-align: center">สร้างโดย</th>
                <th style="text-align: center">คะแนน</th>
                <th style="text-align: center">ตำแหน่ง</th>
                <th style="text-align: center">สถานะ</th>
                <th style="text-align: center">แก้ไข</th>
            </tr>
            </thead>
            <tbody id="tbodyManagePaper" align="center">

            </tbody>
        </table>
    </div>
</div>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<style>
    th {
        border:solid 1px white;
    }
</style>

