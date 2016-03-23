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

    .alert-info, .alert-danger {
        margin-top: 3px;

    }

    #tbodyManagePaper label {
        font-weight: normal !important;
    }

    th {
        text-align: center;
    }

    .add-paper {
        padding-left: 0;
    }

    span .glyphicon-triangle-bottom, .glyphicon-triangle-top {
        font-size: 1px;
        cursor: pointer;
        color: #777777;
    }

    .sorting-column {
        display: inline-block;
        width: 15px;
        vertical-align: middle;
    "
    }

    #paper-not-found-message, #deletePapers {
        display: none;
    }

    .release-exam {
        cursor: pointer;
    }

    #release-exam-time-from, #release-exam-time-to{
        padding-left: 0;
    }

    .well{
        padding-bottom: 0;
    }

    .label-on-release-exam-modal{
        font-weight: normal;
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
                <th width="18%">
                    <label value="position">ประเภทผู้สอบ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="">
                    <label value="paperStatus">สถานะ</label>
                    <span class="sorting-column">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th width="5%" style="vertical-align: middle;">
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

<%--Modal Release Modal Details--%>
<div id="release-exam-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <label><span class="glyphicon glyphicon-cog"></span>&nbsp;ตั้งค่า</label>
                <div class="well">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-3 control-label text-right label-on-release-exam-modal">วันที่เปิดสอบ</label>
                            <div class="col-sm-7">
                                <div class="input-group">
                                    <input id="release-exam-date-field" type="text" data-date-format="dd/mm/yyyy" placeholder="&nbsp;&nbsp;วันที่เปิดสอบ" date-format="dd/mm/yyyy"
                                           maxlength="10" class="form-control input-sm datepicker">
                                    <span id="release-exam-date-btn" class="input-group-addon"><span href="#"
                                                                                                 class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label text-right label-on-release-exam-modal">เวลาตั้งแต่</label>

                            <div id="release-exam-time-from" class="col-sm-6">
                                <div class="col-sm-6">
                                    <input id="hour-from" class="form-control input-sm" type="number" min="0" max="24" placeholder="ชม." oninput="validity.valid||(value='');" required/>
                                </div>

                                <div class="col-sm-6">
                                    <input id="minute-from" class="col-sm-5 form-control input-sm" type="number" min="0" max="24" placeholder="น." oninput="validity.valid||(value='');" required/>
                                </div>
                            </div>

                            <label class="control-label label-on-release-exam-modal">นาฬิกา</label>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label text-right label-on-release-exam-modal">ถึง</label>

                            <div id="release-exam-time-to" class="col-sm-6">
                                <div class="col-sm-6">
                                    <input id="hour-to" class="form-control input-sm" type="number" min="0" max="24" placeholder="ชม." oninput="validity.valid||(value='');" required/>
                                </div>

                                <div class="col-sm-6">
                                    <input id="minute-to" class="col-sm-5 form-control input-sm" min="0" max="24" type="number" placeholder="น." oninput="validity.valid||(value='');" required/>
                                </div>
                            </div>

                            <label class="control-label label-on-release-exam-modal">นาฬิกา</label>
                        </div>
                    </form>
                </div>

                <label><span class="glyphicon glyphicon-user"></span>&nbsp;เพิ่มนักศึกษา</label>
                <div class="well">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-3 text-right">
                                <input type="checkbox"/>
                            </div>

                            <div class="col-sm-7">
                                วันชนะ กรรขำ
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/paper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/selectEmployee.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/categoryDropdown.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/orderPaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/releaseExamPaper.js" />"></script>



