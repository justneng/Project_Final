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

    #tbSelectQuestion {
        margin-top: 5px;
    }

    #tbodySelectQuestion td {
        font-size: 13px;
    }

    .sorting-questions{
        display: inline-block;
        width: 15px;
        vertical-align: middle;"
    }

    #addQuestionBtn{
        display: none;
    }
</style>

<div class="row">

    <%@include file="template/searchQuestionTemplateNew.jsp"%>

    <button id="addQuestionBtn" class="btn btn-default btn-sm" type="button">
        <span class="glyphicon glyphicon-transfer">&nbsp;<strong>เพิ่มลงในชุดข้อสอบ</strong></span>
    </button>

    <span id="span-random-questions" hidden>
        <button class="btn btn-primary btn-sm add-from-subcategory" data-toggle="modal" data-target="#select-questions-by-category">
            <span class="glyphicon glyphicon-list-alt"><strong>&nbsp;เพิ่มจากหัวข้อเรื่อง</strong></span>
        </button>

        <button class="btn btn-primary btn-sm createQuestionBtn" data-target="#createQuest" data-toggle="modal">
            <span class="glyphicon glyphicon-plus"><strong>&nbsp;สร้างข้อสอบใหม่</strong></span>
        </button>
    </span>

    <div id="tbSelectQuestions" class="table-responsive">
        <table id="tbSelectQuestion" class="table table-responsive table-hover table-bordered" hidden>
            <thead class="bg-default small">
            <tr>
                <th style="text-align: center ; vertical-align: middle;" width="3%">
                    <input id="checkQuestionAll" type="checkbox">
                </th>
                <th style="text-align: center ;" width="20%">
                    <label value="category"><strong>หมวดหมู่</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th style="text-align: center ;" width="20%">
                    <label value="subcategory"><strong>หัวข้อเรื่อง</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th style="text-align: center ;" width="35%">
                    <label value="description"><strong>คำถาม</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th style="text-align: center ;">
                    <label value="type"><strong>ประเภท</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th style="text-align: center ;">
                    <label value="level"><strong>ระดับ</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
                <th style="text-align: center ;">
                    <label value="score"><strong>คะแนน</strong></label>
                    <span class="sorting-questions">
                        <span class="glyphicon glyphicon-triangle-top" value="desc"></span><br/>
                        <span class="glyphicon glyphicon-triangle-bottom" value="asc"></span>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody id="tbodySelectQuestion">

            </tbody>
        </table>
    </div>
</div>

<div id="init-message-question" class="row alert alert-info text-center">
    <strong>กรุณาเลือกข้อสอบ</strong>
</div>

<div id="questionsAreEmpty" class="row alert alert-danger text-center" hidden>
    <strong>ไม่พบข้อมูล</strong>
</div>

<%@include file="template/paginationTemplate.jsp" %>

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

<%@include file="modal/selectQuestionByCategory.jsp" %>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/orderQuestions.js" />"></script>
<script>
    $(".btn-default").on('click', function () {
        $("#questionPaperDetail").modal('hide');
    });
</script>