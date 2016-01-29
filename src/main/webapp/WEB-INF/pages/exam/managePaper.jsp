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
    #tbodyManagePaper td{
        font-size: 13px;
    }
    #paperNotFound {
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }

    #paperNotFoundDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
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
        <div class="col-sm-6 add-paper">
            <a href="${context}/TDCS/exam/createPaper" style="bottom: 0;">
                <button class="btn btn-success btn-sm" align="center">
                    <span class="glyphicon glyphicon-plus"><label>&nbsp;<strong>สร้างชุดข้อสอบ</strong></label></span>
                </button>
            </a>
            <button id="deletePapers" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-minus"><label>&nbsp;<strong>ลบออก</strong></label></span></button>
        </div>
        <div class="col-sm-5 col-sm-offset-1">
            <div class="form-inline">
                <div class="form-group">
                    <label for="orderPaperByColumn" class="control-label">จัดเรียงตาม :</label>
                    <select id="orderPaperByColumn" class="form-control input-sm" width="100%">
                        <option value="code">รหัสชุดข้อสอบ</option>
                        <option value="name">ชื่อชุดข้อสอบ</option>
                        <option value="createBy">สร้างโดย</option>
                        <option value="maxScore">คะแนน</option>
                        <option value="position">ประเภทผู้สอบ</option>
                        <option value="paperStatus">สถานะ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="orderPaperType" lass="control-label">รูปแบบ :</label>
                    <select id="orderPaperType" class="form-control input-sm" width="100%">
                        <option value="desc">จากมากไปน้อย</option>
                        <option value="asc">จากน้อยไปมาก</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <table id="tbManagePaper" class="table table-responsive table-hover table-bordered table-striped">
            <thead class="table-header small">
                <tr>
                    <th style="text-align: center"><input id="checkPaperAll" type="checkbox"/></th>
                    <th style="text-align: center">รหัสชุดข้อสอบ</th>
                    <th style="text-align: center">ชื่อชุดข้อสอบ</th>
                    <th style="text-align: center">สร้างโดย</th>
                    <th style="text-align: center">คะแนน</th>
                    <th style="text-align: center">ประเภทผู้สอบ</th>
                    <th style="text-align: center">สถานะ</th>
                    <th style="text-align: center">แก้ไข</th>
                </tr>
            </thead>
            <tbody id="tbodyManagePaper" align="center">

            </tbody>
        </table>
        <%--<div id="paperNotFound" width="100%">--%>
            <%--<h3 id="paperNotFoundDesc">ไม่พบชุดข้อสอบ</h3>--%>
        <%--</div>--%>
    </div>

    <%@include file="template/paginationTemplate.jsp"%>

</div>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/paper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/categoryDropdown.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/orderPaper.js" />"></script>

<style>
    th {
        border:solid 1px white;
    }
    /*.btn-success{*/
        /*background-color: #5ecc2d;*/
        /*border-radius: 0;*/
        /*border: 1px solid #40731f;*/
    /*}*/
    /*.btn-danger{*/
        /*background-color: #f62200;*/
        /*border-radius: 0;*/
        /*border: 1px solid #9c1800;*/
    /*}*/
    .add-paper{
        padding-left: 0;
    }
    .table-header{
        background-color: #595d69;
    }
    tr th{
        color: white;
    }

</style>

