<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<!-- Modal SelectQuestion-->
<style>
    #selectQuest {
        overflow-y: auto;
    }

    td {
        font-size: 13.85px;
    }

    #questionsAreEmpty {
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }

    #questionsAreEmptyDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

    #tbSelectQuestion {
        margin-top: 5px;
    }

    #tbodySelectQuestion td {
        font-size: 13px;
    }
</style>
<div class="modal fade" id="selectQuest" data-backdrop="false">
    <div class="modal-dialog modal-lg" style="width: 80%">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" aria-label="Close" data-dismiss="modal"><span
                        aria-hidden="true">&times;</span></button>
                <div class="container row">
                    <h4>เลือกข้อสอบ</h4>
                    <hr>
                </div>

                <div class="container">
                <%@include file="../template/searchQuestionTemplateNew.jsp"%>
                </div>

                <%--<button id="removeRowSelected" class="btn btn-danger btn-sm" type="button" style="height: 30px;"><span class="glyphicon glyphicon-trash"></span></button>--%>
                <button id="addQuestionBtn" class="btn btn-gray btn-sm" type="button">เพิ่มลงในชุดข้อสอบ</button>
                <table id="tbSelectQuestion" class="table table-responsive table-hover table-bordered">
                    <thead class="bg-primary small">
                    <tr>
                        <th style="text-align: center ;"><input id="checkQuestionAll" type="checkbox"></th>
                        <th style="text-align: center ;">หมวดหมู่</th>
                        <th style="text-align: center ;">หัวข้อเรื่อง</th>
                        <th style="text-align: center ;">คำถาม</th>
                        <th style="text-align: center ;">ข้อสอบ</th>
                        <th style="text-align: center ;">ระดับ</th>
                        <th style="text-align: center ;">คะแนน</th>
                        <th style="text-align: center ;">ผู้สร้าง</th>
                    </tr>
                    </thead>
                    <tbody id="tbodySelectQuestion">

                    </tbody>
                    <div id="questionsAreEmpty" width="100%">
                        <h3 id="questionsAreEmptyDesc">ไม่พบข้อสอบ</h3>
                    </div>
                </table>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- End Modal Select Question -->
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<%--Add By Mr.Wanchana--%>
<!-- Modal show Quertion Information -->
<div id="showQuestionInfoModal" class="modal fade" role="dialog" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">รายละเอียดข้อสอบ</h4>
            </div>
            <div class="modal-body" id="questionInfoBody">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="questionPaperDetail">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" modal-number="2" class="close"><span
                        aria-hidden="true">&times;</span></button>
                <h3>ข้อมูลข้อสอบ</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-2 text-right">หมวดหมู่ :</div>
                    <span class="col-md-2" id="categoryDetail"></span>

                    <div class="col-md-2 col-sm-offset-1 text-right">หัวข้อเรื่อง :</div>
                    <span class="col-md-4" id="subCategoryDetail"></span>
                </div>
                <div class="row">
                    <div class="col-md-2 text-right">สร้างโดย :</div>
                    <span class="col-md-3" id="createByDetail"></span>

                    <%--<div class="col-md-2 text-right">วันที่สร้าง :</div>--%>
                    <%--<span class="col-md-2" id="createDateDetail"></span>--%>
                    <div class="col-md-2 text-right">ความยาก :</div>
                    <span class="col-md-2" id="difficultyDetail"></span>
                </div>
                <div class="row">
                    <div class="col-md-2 text-right">ประเภท :</div>
                    <span class="col-md-2" id="questionTypeDetail"></span>

                    <%--<div class="col-md-2 col-sm-offset-1 text-right">ความยาก :</div>--%>
                    <%--<span class="col-md-2" id="difficultyDetail"></span>--%>
                </div>
                <div class="row">
                    <div class="col-md-2 text-right">คะแนน :</div>
                    <span class="col-md-2" id="scoreDetail"></span>
                </div>
                <%--<div class="row">--%>
                    <%--<div class="col-md-2 text-right">คำถาม :</div>--%>
                    <%--<span class="col-md-8" id="questionDescDetail"></span>--%>
                <%--</div>--%>
            </div>
            <div class="modal-footer">
                <div id="choiceDetailContainer">
                    <div class="row">
                        <div class="col-md-2 text-right">คำถาม :</div>
                        <span class="col-md-8 text-left" id="questionDescDetail"></span>
                    </div><br/>
                    <div class="row">
                        <div class="col-md-1 " id="correctDetail1"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92);"></span></div>
                        <div class="col-md-1">ก :</div>
                        <span class="col-md-8 text-left" id="choiceDetail1"></span>
                    </div>
                    <div class="row">
                        <div class="col-md-1 " id="correctDetail2"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92);"></span></div>
                        <div class="col-md-1">ข :</div>
                        <span class="col-md-8 text-left" id="choiceDetail2"></span>
                    </div>
                    <div class="row">
                        <div class="col-md-1 " id="correctDetail3"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92);"></span></div>
                        <div class="col-md-1">ค :</div>
                        <span class="col-md-8 text-left" id="choiceDetail3"></span>
                    </div>
                    <div class="row">
                        <div class="col-md-1 " id="correctDetail4"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92);"></span></div>
                        <div class="col-md-1">ง :</div>
                        <span class="col-md-8 text-left" id="choiceDetail4"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script>
//    $("#addQuestionBtn").on('click', function () {
//        $("#selectQuest").modal('hide');
//    });
    $(".btn-default").on('click', function () {
        $("#questionPaperDetail").modal('hide');
    });
</script>