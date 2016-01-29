<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 13/7/2558
  Time: 13:53
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<style>
    #questionNotFound {
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }

    #questionNotFoundDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

    #tbSelectedQuestionToPaper td , #tbSelectedQuestionToPaper input, #tbPaperInfo td{
        font-size: 13px;
    }

    #tbSelectedQuestionToPaper , #tbPaperInfo{
        margin-top: 5px;
    }

    #tbodySelectedQuestionToPaper input[type=number]{
        width: 75px;;
    }

</style>

<h3>สร้างชุดข้อสอบ</h3>
<hr>
<div class="container">
    <div class="row">
        <a href="${context}/TDCS/exam/managePapers">
            <button id="cancelCreatePaperBtn" class="btn btn-warning btn-sm" type="button">
                ย้อนกลับ
            </button>
        </a>
        <button id="createPaperBtn" class="btn btn-success btn-sm" type="button">บันทึก</button>
        <button id="updatePaperBtn" class="btn btn-success btn-sm" type="button" style="display: none;">บันทึก</button>
        <button id="saveCopyPaperBtn" class="btn btn-success btn-sm" type="button" style="display: none;">บันทึก</button>
        <button id="cancelBtn" class="btn btn-danger btn-sm" type="button" style="display: none;">ยกเลิก</button>
        <button id="copyPaperBtn" class="btn btn-default btn-sm" type="button" style="display: none;">คัดลอกชุดข้อสอบ</button>
    </div><br/><br/>
    <form class="form-horizontal" role="form">
        <div class="row">
            <div class="col-sm-6">
                <div class="col-sm-4 col-sm-offset-1 " align="right">
                    <span style="color:red;">*</span><label for="newPaperId" class="label-control"><h5
                        style="margin-top: 5px">รหัสชุดข้อสอบ :</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <input id="newPaperId" class="form-control input-sm" type="text" maxlength="5" placeholder="โปรดกรอกรหัสชุดข้อสอบ"
                           required/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="col-sm-4" align="right">
                    <label for="newPaperName" class="label-control"><h5 style="margin-top: 5px">ชื่อชุดข้อสอบ :</h5>
                    </label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <input id="newPaperName" class="form-control input-sm" type="text" placeholder="โปรดกรอกชื่อชุดข้อสอบ"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="col-sm-4 col-sm-offset-1" align="right">
                    <span style="color:red;">*</span><label for="newPaperScore" class="label-control"><h5
                        style="margin-top: 5px">คะแนน :</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <input id="newPaperScore" class="form-control input-sm" type="number" min="0" oninput="validity.valid||(value='');" placeholder="โปรดกรอกคะแนน" required/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="col-sm-4" align="right">
                    <span style="color:red;">*</span><label for="newPaperForPosition" class="label-control"><h5
                        style="margin-top: 5px">ประเภทผู้สอบ :</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <select id="newPaperForPosition" class="form-control input-sm">
                        <option active>โปรดเลือก</option>
                        <option value="0">ทั้งหมด</option>
                        <option value="1">Software Developer Trainee</option>
                        <option value="2">Assistant Business Analyst</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="col-sm-4 col-sm-offset-1" align="right">
                    <span style="color:red;">*</span><label class="label-control"><h5 style="margin-top: 5px">เวลา :</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <div class="form-inline">
                        <input id="hours" class="form-control input-sm" type="number" style="width: 35%;" max="60" min="0" placeholder="ชม." oninput="validity.valid||(value='');" required/>
                        <label style="width: 15%;">ชั่วโมง</label>
                        <input id="minutes" class="form-control input-sm" type="number" style="width: 35%;" max="60" min="0" placeholder="น." oninput="validity.valid||(value='');" required/>
                        <label style="width: 10%;">นาที</label>
                    </div>
                </div>
            </div>
            <%--<div id="divCreateDate" class="col-sm-7" style="display: none;">--%>
                <%--<div class="col-sm-3" align="right">--%>
                    <%--<label for="questionCreatedDate" class="label-control"><h5 style="margin-top: 5px">วันที่สร้าง :</h5></label>--%>
                <%--</div>--%>
                <%--<div class="col-sm-5" style="padding: 0;">--%>
                    <%--<input id="questionCreatedDate" class="form-control input-sm" disabled/>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>
        <div class="row" id="copyPaperField" style="display: none;">
            <div class="col-sm-6">
                <div class="col-sm-4 col-sm-offset-1" align="right">
                    <label class="label-control"><h5 style="margin-top: 5px">คัดลอกชุดข้อสอบ :</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <div class="input-group">
                        <input id="copyPaperLov" class="form-control input-sm" type="text" placeholder="รหัสชุดข้อสอบ : ชื่อชุดข้อสอบ" autocomplete="off"/>
                        <span id="selectPaper" class="input-group-addon input-sm">
                            <i onclick="listPaperToLov()" style="cursor: pointer;">
                                <span class="glyphicon glyphicon-search"></span>
                            </i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <br/>
    <div class="row">
        <div class="col-sm-12" style="text-align: center">
            <button id="selectionQuestionBtnInpagePaper" data-toggle="modal" data-backdrop="static" class="btn btn-gray btn-sm">เลือกข้อสอบ
            </button>
            <button id="randomQuestionBtn" data-toggle="modal" data-target="#randomQuestionModal" class="btn btn-gray btn-sm">สุ่มข้อสอบ
            </button>
        </div>
    </div>

    <div class="row">
        <hr/>
        <button id="removeRowQuestionSelect" class="btn btn-danger btn-sm" type="button" style="height: 30px; display: none;"><span
                class="glyphicon glyphicon-minus"></span></button>
        <%--<button id="createPaperBtn" class="btn btn-success btn-sm" type="button">บันทึก</button>--%>
        <%--<button id="updatePaperBtn" class="btn btn-success btn-sm" type="button" style="display: none;">บันทึก</button>--%>
        <%--<a href="/TDCS/exam/managePapers">--%>
        <%--<button id="cancelCreatePaperBtn" class="btn btn-warning btn-sm" type="button">--%>
        <%--ยกเลิก--%>
        <%--</button>--%>
        <%--</a>--%>
        <table id="tbSelectedQuestionToPaper" class="table table-bordered table-hover" style="display: none;">
            <thead class="bg-primary small">
            <tr>
                <th style="text-align: center ;"><input class="checkAllQuestionFromCreatePaperPage" type="checkbox"></th>
                <th style="text-align: center ;">ประเภท</th>
                <th style="text-align: center ;">หมวดหมู่</th>
                <th style="text-align: center ;">หัวข้อเรื่อง</th>
                <th style="text-align: center ;">ข้อสอบ</th>
                <th style="text-align: center ;">ระดับ</th>
                <th style="text-align: center ;" width="8%">คะแนน</th>
                <th style="text-align: center ;">ผู้สร้าง</th>
            </tr>
            </thead>
            <tbody id="tbodySelectedQuestionToPaper">

            </tbody>
        </table>
        <table id="tbPaperInfo" class="table table-bordered table-hover" style="display:  none;">
            <thead class="bg-primary small">
            <tr>
                <th style="text-align: center ;">ประเภท</th>
                <th style="text-align: center ;">หมวดหมู่</th>
                <th style="text-align: center ;">หัวข้อเรื่อง</th>
                <th style="text-align: center ;">ข้อสอบ</th>
                <th style="text-align: center ;">ระดับ</th>
                <th style="text-align: center ;">คะแนน</th>
                <th style="text-align: center ;">ผู้สร้าง</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
        <div id="questionNotFound" width="100%">
            <h3 id="questionNotFoundDesc">ยังไม่มีข้อสอบในชุดข้อสอบ</h3>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-sm-4 col-sm-offset-8">
            <label align="right" class="col-sm-2" style="bottom: 3px;"><h5>คะแนน</h5></label>
            <div class="col-sm-4">
                <input class="form-control input-sm" readonly="true" name="score" id="score" style="text-align: center">
            </div>
            <label align="right" class="col-sm-1" style="bottom: 3px;"><h5>เต็ม</h5></label>
            <div class="col-sm-4">
                <input class="form-control input-sm" readonly="true" name="score" id="maxScore" style="text-align: center">
            </div>
        </div>
    </div>
</div>

<%--<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/categoryDropdown.js" />"></script>--%>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/managePaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/copyPaper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/paper.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<%--<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/searchQuestion.js" />"></script>--%>

<%@include file="modal/createQuestionModal.jsp" %>
<%@include file="modal/RandomQuestionModal.jsp" %>
<%@include file="modal/selectQuestionModal.jsp" %>

<script>
    if ('${status}' != 'staff') {
        window.location.href = context+"/TDCS/index.html";
    }
    //        $("#selectionQuestionBtnInpagePaper").unbind('click').click(function(){
    //            alert('hi');
    //            $('#selectQuest').modal({
    //                backdrop: 'static'
    //            });
    //        });
</script>
