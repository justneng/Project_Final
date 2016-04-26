<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/16/2015
  Time: 10:18 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>

<script>
    var context = '${context}';
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    if ('${status}' == 'user' || '${status}' == '') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<style>
    a {
        cursor: pointer;
        cursor: hand;
    }

    #paperNotFound{
        display: none;
    }

    label {
        font-weight: normal;
    }

    .panel-heading {
        height: 35px;
    }

    .create-by .col-sm-10 {
        padding-left: 0;
    }
</style>

<tiles:insertTemplate template="/WEB-INF/pages/exam/modal/addEmployeeToInputModal.jsp"/>

<h3>เลือกตรวจข้อสอบ</h3>
<hr>

<div class="panel panel-default">
    <div class="panel-heading">
        <label><strong>ค้นหา</strong></label>
    </div>

    <div class="panel-body">
        <div class="form-horizontal">
            <div class="row">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label text-right">ชุดข้อสอบ</label>

                    <div class="col-sm-8 input-group">
                        <input id="searchPaperInput" class="form-control input-sm">
                            <span class="input-group-addon input-sm">
                                <i style="cursor: pointer; height: 20px;"
                                   onclick="listSearchPaper()">
                                    <span class="glyphicon glyphicon-search"></span>
                                </i>
                            </span>
                    </div>
                </div>

                <div class="col-sm-6">
                    <label class="col-sm-3 control-label text-right">ชื่อนักศึกษา</label>

                    <div class="col-md-8 input-group ">
                        <input id="searchNameTrainee" class="form-control input-sm">
                            <span class="input-group-addon input-group-sm input-sm">
                                <i style="cursor: pointer; height: 20px;"
                                   onclick="listNameTrainee()">
                                    <span class="glyphicon glyphicon-search"></span>
                                </i>
                            </span>
                    </div>
                </div>
            </div>
            <h5></h5>

            <div class="row">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label text-right">ตำแหน่ง</label>

                    <div class="col-sm-8" style="padding:0">
                        <select id="forPosition" class="form-control input-sm">
                            <option value="0"></option>
                            <option value="1">Software Developer Trainee</option>
                            <option value="2">Assistant Business Analyst</option>
                        </select>
                    </div>
                </div>
            </div>
            <h5></h5>

            <div class="row create-by" style="margin: 0 0 0 9px">
                <%@include file="template/selectCreateByInput.jsp" %>
            </div>

            <div class="col-md-offset-1" id="showEmployeeSelected" width="100%; ">

            </div>
        </div>
    </div>

    <div class="panel-footer">
        <div class="row">
            <div class="row" id="btnSearch">
                <div class="col-md-12 text-center">
                    <button id="btnExamRecordSearch" class="btn btn-primary btn btn-sm" type="button">
                        <span class="glyphicon glyphicon-search"></span>&nbsp;
                        ค้นหา
                    </button>

                    <button id="btnExamRecordSearchClearInput" class="btn btn-gray btn btn-sm" type="button">
                        ล้างข้อมูล
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="sortBy" class="row" style="margin-bottom: 15px">
    <div class="col-sm-6 col-sm-offset-6 text-right">
        <div class="form-inline">
            <div class="form-group">
                <label for="orderPaperBy" class="control-label">จัดเรียงตาม :</label>
                <select id="orderPaperBy" class="form-control input-sm" width="100%">
                    <option value="paperCode">รหัสชุดข้อสอบ</option>
                    <option value="paperName">ชื่อชุดข้อสอบ</option>
                    <option value="traineeName">ชื่อผู้สอบ</option>
                    <option value="paperForPosition">ประเภทผู้สอบ</option>
                    <option value="paperStatus">สถานะ</option>
                </select>
                <label for="orderPaperType" lass="control-label">รูปแบบ :</label>
                <select id="orderPaperType" class="form-control input-sm" width="100%">
                    <option value="desc">จากมากไปน้อย</option>
                    <option value="asc">จากน้อยไปมาก</option>
                </select>
            </div>
        </div>
    </div>
</div>

<a href="printStaticReport">
    <button class="btn btn-gray btn-sm" type="button"><strong
            style="color: whitesmoke;">สถิติการสอบ</strong>&nbsp;<span class="glyphicon glyphicon-save"></span>
    </button>
</a>

<div class="row">
    <div class="col-md-12">
        <table id="tbExamRecordSearch" class="table table-bordered table-responsive table-hover">
            <col width="10%"/>
            <col width="25%"/>
            <col width="20%"/>
            <col width="18%"/>
            <col width="8%"/>
            <col width="8%"/>
            <thead class="bg-primary small">
            <tr>
                <th class="text-center">รหัสชุดข้อสอบ</th>
                <th class="text-center">ชื่อชุดข้อสอบ</th>
                <th class="text-center">ชื่อผู้สอบ</th>
                <th class="text-center">ประเภทผู้สอบ</th>
                <th class="text-center">คะแนนสอบ</th>
                <%--<th class="text-center">คะแนนPost-Test</th>--%>
                <th class="text-center">คะเเนนเต็ม</th>
                <%--<th class="text-center">สร้างโดย</th>--%>
                <th class="text-center">สถานะ</th>
                <%--<th class="text-center">Review</th>--%>
            </tr>
            </thead>

            <!---------------------------------------------------- Generate Table --------------------------------------------------------------------------------->
            <tbody id="tbodyExamRecord">

            </tbody>
        </table>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="col-sm-12">
            <div id="init-message-show" class="row alert alert-info text-center">
                <strong>กรุณาค้นหาชุดข้อสอบที่ต้องการ</strong>
            </div>

            <div id="paperNotFound" class="row alert alert-danger text-center">
                <strong>ไม่พบข้อมูล</strong>
            </div>
        </div>
    </div>
</div>
<%-----------------------------------------------confirm modal------------------------------------------- --%>
<!-- alertModal-->
<div id="alertModalChangPage" class="modal fade">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <center>
                    <label><h4>ตรวจข้อสอบ</h4></label>
                </center>
            </div>
            <div class="modal-footer border">
                <center>
                    <button id="okBtnChangPage" class="btn btn-sm btn-primary" data-dismiss="modal">ตกลง
                    </button>
                    <button id="cancleBtnChangPage" class="btn btn-sm btn-gray"
                            data-dismiss="modal">ยกเลิก
                    </button>
                </center>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<%-----------------------------------------------confirm modal------------------------------------------- --%>
<!-- alertModal-->
<%--<div id="alertModalRemark" class="modal fade">--%>
<%--<div class="modal-dialog modal-sm">--%>
<%--<div class="modal-content">--%>
<%--<div class="modal-header">--%>
<%--<center>--%>
<%--<label><h4>ตรวจข้อสอบซ้ำ</h4></label>--%>
<%--</center>--%>
<%--</div>--%>
<%--<div class="modal-footer border">--%>
<%--<center>--%>
<%--<button id="testResultBtn" class="btn btn-sm btn-primary" data-dismiss="modal" >Pre-test--%>
<%--</button>--%>
<%--<button id="cancleBtn" class="btn btn-sm btn-danger"--%>
<%--data-dismiss="modal">ยกเลิก--%>
<%--</button>--%>
<%--</center>--%>
<%--</div>--%>
<%--</div>--%>
<%--<!-- /.modal-content -->--%>
<%--</div>--%>
<%--<!-- /.modal-dialog -->--%>
<%--</div>--%>
<%--<!-- /.modal -->--%>
<%--<%@include file="modal/addEmployeeToInputModal.jsp" %>--%>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/examRecordSearch.js" />"></script>
<script src="${context}/resources/js/pageScript/exam/selectEmployee.js"></script>
<%--end class row--%>