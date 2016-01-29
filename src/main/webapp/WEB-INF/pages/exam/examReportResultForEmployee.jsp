<%--
  Created by IntelliJ IDEA.
  User: JobzPC
  Date: 22/10/2558
  Time: 10:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>


<script>
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
</script>
<style>

</style>

<h3>รายงานแสดงผลคะแนน</h3>
<hr>


<div>
  <div class="panel panel-primary">
    <div class="panel-heading"><h5 class="panel-title">รายงานแสดงผลคะแนน</h5></div>
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <div class="form-inline">
                <label class="col-sm-2 control-label ">ชื่อนักศึกษา :</label>

                <div class="col-sm-3 input-group">
                  <input id="reportTraineeName" class="form-control">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listSearchPaper()"></i>
                                    </span>
                </div>
                <label class="control-label col-sm-offset-1">ถึง :</label>

                <div class="col-sm-3 input-group">
                  <input id="reportTraineeNameTo" class="form-control">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listSearchPaper()"></i>
                                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <div class="form-inline">
                <label class="col-sm-2 control-label ">ชื่อชุดข้อสอบ :</label>

                <div class="col-sm-3 input-group">
                  <input id="reportPaperName" class="form-control">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listSearchPaper()"></i>
                                    </span>
                </div>
                <label class="control-label col-sm-offset-1">ถึง :</label>

                <div class="col-sm-3 input-group">
                  <input id="reportPaperNameTo" class="form-control">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listSearchPaper()"></i>
                                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <div class="form-inline">
                <label class="col-sm-2 control-label ">วันที่ :</label>

                <div class='col-sm-3 input-group input-append date' id='datetimepicker'>
                  <input type='text' class="form-control"/>
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                </div>
                <label class="control-label col-sm-offset-1">ถึง :</label>

                <div class='col-sm-3 input-group date' id='datetimepickerTo'>
                  <input type='text' class="form-control"/>
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <div class="row">
          <div class="row" id="btnSearch">
            <div class="col-md-12 text-center">
              <button id="btnExamRecordSearch" class="btn btn-primary btn btn-sm" type="button">รายงาน</button>
            </div>
          </div>
        </div>
      </div>
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
          <button id="cancleBtnChangPage" class="btn btn-sm btn-danger"
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
<%@include file="modal/addEmployeeToInputModal.jsp" %>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/examReportResultForEmployee.js" />"></script>
<%--end class row--%>
