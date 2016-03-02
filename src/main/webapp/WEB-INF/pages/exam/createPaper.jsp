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
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/copyPaper.js" />"></script>
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

    #tbSelectedQuestionToPaper td, #tbSelectedQuestionToPaper input, #tbPaperInfo td {
        font-size: 13px;
    }

    #tbSelectedQuestionToPaper, #tbPaperInfo {
        margin-top: 5px;
    }

    #tbodySelectedQuestionToPaper input[type=number] {
        width: 75px;;
    }

    .well {
        margin-right: 0;
        margin-left: 0;
    }

    label {
        font-weight: normal;
    }

    @media (max-width: 767px) {
        .text-right {
            text-align: left;
            padding-left: 0;
        }
    }

</style>

<ul id="create-paper-tabs" class="nav nav-tabs">
    <li id="maintabs" class="">
        <a id="maintabs-link" href="#create-paper-form-content" data-toggle="tab">
            แบบฟอร์มสร้างชุดข้อสอบ
        </a>
    </li>

    <li id="selecttabs" class="">
        <a href="#select-questions-content" data-toggle="tab">
            เลือกข้อสอบ
        </a>
    </li>

    <li id="randomtabs" class="active">
        <a href="#random-questions-content" data-toggle="tab">
            สุ่มข้อสอบ
        </a>
    </li>

</ul>

<div id="create-paper-content" class="tab-content">

    <div class="container tab-pane fade" id="create-paper-form-content">
        <div class="row">
            <button id="updatePaperBtn" class="btn btn-success btn-sm" type="button" style="display: none;">บันทึก
            </button>
            <button id="saveCopyPaperBtn" class="btn btn-success btn-sm" type="button" style="display: none;">บันทึก
            </button>
            <button id="cancelBtn" class="btn btn-danger btn-sm" type="button" style="display: none;">ยกเลิก</button>
            <button id="copyPaperBtn" class="btn btn-default btn-sm" type="button" style="display: none;">
                คัดลอกชุดข้อสอบ
            </button>
        </div>
        <br/><br/>

        <div class="row">
            <button id="createPaperBtn" class="btn btn-primary btn-sm" type="button">
                <span class="glyphicon glyphicon-saved"></span>&nbsp;
                บันทึก
            </button>
            <a href="${context}/TDCS/exam/managePapers">
                <button id="cancelCreatePaperBtn" class="btn btn-gray btn-sm" type="button">
                    <span class="glyphicon glyphicon-circle-arrow-left"></span> &nbsp;
                    ย้อนกลับ
                </button>
            </a>
        </div>

        <div class="row">
            <label><h2 id="paper-code"></h2></label>
            <label><h4 id="paper-name"></h4></label>
        </div>

        <div class="row">
            <div class="well">
                <form class="form-horizontal" role="form">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                                <span style="color:red;">*</span><label for="newPaperId" class="label-control"><h5
                                    style="margin-top: 5px">รหัสชุดข้อสอบ</h5></label>
                            </div>
                            <div class="col-sm-7" style="padding: 0;">
                                <input id="newPaperId" class="form-control input-sm" type="search" maxlength="5"
                                       placeholder="โปรดกรอกรหัสชุดข้อสอบ"
                                       required/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="label-create-paper label-create-paper col-sm-4 text-right">
                                <label for="newPaperName" class="label-control"><h5 style="margin-top: 5px">
                                    ชื่อชุดข้อสอบ</h5>
                                </label>
                            </div>
                            <div class="col-sm-7" style="padding: 0;">
                                <input id="newPaperName" class="form-control input-sm" type="text"
                                       placeholder="โปรดกรอกชื่อชุดข้อสอบ"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                                <span style="color:red;">*</span><label for="newPaperScore" class="label-control"><h5
                                    style="margin-top: 5px">คะแนน</h5></label>
                            </div>
                            <div class="col-sm-7" style="padding: 0;">
                                <input id="newPaperScore" class="form-control input-sm" type="number" min="0"
                                       oninput="validity.valid||(value='');" placeholder="โปรดกรอกคะแนน" required/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="label-create-paper col-sm-4 text-right">
                                <span style="color:red;">*</span><label for="newPaperForPosition" class="label-control">
                                <h5
                                        style="margin-top: 5px">ประเภทผู้สอบ</h5></label>
                            </div>
                            <div class="label-create-paper col-sm-7" style="padding: 0;">
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
                            <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                                <span style="color:red;">*</span><label class="label-control"><h5
                                    style="margin-top: 5px">
                                เวลา</h5></label>
                            </div>
                            <div class="col-sm-7" style="padding: 0;">
                                <div class="form-inline">
                                    <input id="hours" class="form-control input-sm" type="number" style="width: 35%;"
                                           max="60" min="0" placeholder="ชม." oninput="validity.valid||(value='');"
                                           required/>
                                    <label style="width: 15%;">ชั่วโมง</label>
                                    <input id="minutes" class="form-control input-sm" type="number" style="width: 35%;"
                                           max="60" min="0" placeholder="น." oninput="validity.valid||(value='');"
                                           required/>
                                    <label style="width: 10%;">นาที</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="copyPaperField">
                        <div class="col-sm-6">
                            <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                                <label class="label-control"><h5 style="margin-top: 5px">คัดลอกชุดข้อสอบ</h5></label>
                            </div>

                            <div class="col-sm-7" style="padding: 0;">
                                <div class="input-group">
                                    <input id="copyPaperLov" class="form-control input-sm" type="text"
                                           placeholder="รหัสชุดข้อสอบ : ชื่อชุดข้อสอบ" autocomplete="off"/>
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
            </div>
        </div>

        <div class="row">
            <button id="removeRowQuestionSelect" class="btn btn-gray btn-sm" type="button"
                    style="height: 30px; display: none;">
                <span class="glyphicon glyphicon-remove-sign"></span>
                &nbsp;เอาออก
            </button>

            <table id="tbSelectedQuestionToPaper" class="table table-bordered table-hover" style="display: none;">
                <thead class="bg-default small">
                    <tr>
                        <th style="text-align: center ;">
                            <input class="checkAllQuestionFromCreatePaperPage" type="checkbox">
                        </th>
                        <th style="text-align: center ;" width="20%">
                            <label value="category"><strong>หมวดหมู่</strong></label>
                        </th>
                        <th style="text-align: center ;" width="20%">
                            <label value="subcategory"><strong>หัวข้อเรื่อง</strong></label>
                        </th>
                        <th style="text-align: center ;" width="35%">
                            <label value="description"><strong>คำถาม</strong></label>
                        </th>
                        <th style="text-align: center ;">
                            <label value="type"><strong>ประเภท</strong></label>
                        </th>
                        <th style="text-align: center ;">
                            <label value="level"><strong>ระดับ</strong></label>
                        </th>
                        <th style="text-align: center ;">
                            <label value="score"><strong>คะแนน</strong></label>
                        </th>
                    </tr>
                </thead>
                <tbody id="tbodySelectedQuestionToPaper">

                </tbody>
            </table>

            <div id="questionNotFoundDesc" class="alert alert-info text-center">
                <strong>ยังไม่มีข้อสอบในชุดข้อสอบ</strong>
            </div>
        </div>
        <br/>

        <div class="row">
            <div class="col-sm-4 col-sm-offset-8">
                <label class="col-sm-2" style="bottom: 3px;"><h5>คะแนน</h5></label>

                <div class="col-sm-4">
                    <input class="form-control input-sm" readonly="true" name="score" id="score"
                           style="text-align: center">
                </div>
                <label class="col-sm-1" style="bottom: 3px;"><h5>เต็ม</h5></label>

                <div class="col-sm-4">
                    <input class="form-control input-sm" readonly="true" name="score" id="maxScore"
                           style="text-align: center">
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid tab-pane fade" id="select-questions-content">
        <br/><br/>
        <%@include file="selectQuestionPage.jsp" %>
    </div>

    <div class="container-fluid tab-pane fade in active" id="random-questions-content">
        <br/><br/>
        <%@include file="randomQuestions.jsp" %>
    </div>

</div>

<script>
    if ('${status}' != 'staff') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>
