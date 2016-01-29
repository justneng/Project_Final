<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if ('${status}' == '') {
        window.location.href = context+"/TDCS/index.html";
    }

    var status = '${status}';
</script>
<div class="form-horizontal">
<div class="row">
    <c:if test="${status == 'admin'}">
        <script type="text/javascript" src="<c:url value="/resources/js/pageScript/evaluationAdmin.js" />"></script>
        <h3 class="h3">เพิ่มแบบประเมิน</h3>
    </c:if>
    <c:if test="${status == 'user'}">
        <script type="text/javascript" src="<c:url value="/resources/js/pageScript/evaluation.js" />"></script>
        <h3 class="h3">ประเมินตัวเอง</h3>
    </c:if>
    <c:if test="${status == 'staff'}">
        <script type="text/javascript" src="<c:url value="/resources/js/pageScript/evaluation.js" />"></script>
        <h3 class="h3">ประเมินนักศึกษา</h3>
    </c:if>
    <hr/>
</div>

<c:if test="${status == 'admin'}">
    <div role="tabpanel">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
                <a id="topicTab" href="#Topic" aria-controls="home" role="tab" data-toggle="tab">Topic</a>
            </li>
            <li role="presentation">
                <a href="#subTopic" aria-controls="profile" role="tab" data-toggle="tab">Sub Topic</a>
            </li>
                <%--<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>--%>
                <%--<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>--%>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="Topic">
                <br/>
                <div class="form-horizontal">
                    <div class="row form-group">
                        <label class="col-md-2 col-md-offset-2 label-control text-right">Topic Name<label style="color: red">*</label></label>
                        <div class="col-md-4">
                            <input class="form-control" type="text" id="topicName" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-md-2 col-md-offset-2 label-control text-right">Score<label style="color: red">*</label></label>
                        <div class="col-md-2">
                            <input type="text" class="form-control" id="topicScore" onkeypress="return isNumber(event)"/>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-1 col-md-offset-4">
                            <a class="btn btn-primary" id="btnAddTopic">&nbsp;&nbsp;เพิ่ม&nbsp;&nbsp;</a>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-10 col-md-offset-1">
                            <table class="table table-bordered">
                                <thead>
                                <tr class="grayTh">
                                    <th class="text-center" rowspan="2" style="width:70%;vertical-align:middle">Topic Name</th>
                                    <th class="text-center" style="width:10%">Score</th>
                                    <th class="text-center" rowspan="2" style="width:20%"></th>
                                </tr>
                                <tr class="grayTh">
                                    <th class="text-center" >
                                        <label id="maxScoreTh"></label>
                                    </th>
                                </tr>
                                </thead>
                                <tbody id="tbodyTopic">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="subTopic">
                <br/>
                <div class="form-horizontal">
                    <div class="row form-group">
                        <div class="row form-group">
                            <label class="col-md-2 col-md-offset-2 label-control text-right">Topic<label style="color: red">*</label></label>
                            <div class="col-md-4">
                                <select class="form-control" type="text" id="selectTopic"> </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-md-2 col-md-offset-2 label-control text-right">Sub Topic<label style="color: red">*</label></label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="subTopicData" autocomplete="off"/>
                            </div>
                        </div>

                        <div id="tableAddSubTopic" class="row form-group" style="display: none">
                            <div class="col-md-10 col-md-offset-1">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr class="grayTh">
                                        <th class="text-center" rowspan="2" style="width:20%;vertical-align:middle">
                                            LIMIT SCORE
                                        </th>
                                        <th class="text-center" rowspan="2" style="width:10%;vertical-align: middle">GRADE</th>
                                        <th class="text-center" colspan="2" style="width:20%;vertical-align: middle">SCORE</th>
                                        <th class="text-center" rowspan="30" style="width: 30%;;vertical-align: middle">DESCRIPTION</th>
                                    </tr>
                                    <tr class="grayTh">
                                        <th class="text-center">
                                            <label>Min</label>
                                        </th>
                                        <th class="text-center" >
                                            <label>Max</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="tbodySubTopicAdd">
                                    <tr>
                                        <td rowspan="5" style=" text-align: center"> <label id="remainingScore"></label> </td>
                                        <td class="text-center">A</td>
                                        <td><input id="aMin" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>
                                        <td><input id="aMax" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off"/> </td>
                                        <td><textarea id="textareaA" class="form-control" ></textarea> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">B</td>
                                        <td><input id="bMin" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>
                                        <td><input id="bMax" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>

                                        <td><textarea id="textareaB" class="form-control" ></textarea> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">C</td>
                                        <td><input id="cMin" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>
                                        <td><input id="cMax" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>

                                        <td><textarea id="textareaC" class="form-control" ></textarea> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">D</td>
                                        <td><input id="dMin" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>
                                        <td><input id="dMax" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>

                                        <td><textarea id="textareaD" class="form-control" ></textarea> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">F</td>
                                        <td><input id="fMin" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>
                                        <td><input id="fMax" class="form-control text-center" onkeypress="return isNumber(event)" autocomplete="off" /> </td>

                                        <td><textarea id="textareaF" class="form-control" ></textarea> </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="tableButtonSubTopic" class="row form-group text-center" style="display: none">
                            <button id="btnAdd" class="btn btn-primary">เพิ่ม</button>
                            <button class="btn btn-gray">ยกเลิก</button>
                        </div>

                        <div id="tableShowSubTopic" class="row form-group" style="display: none">
                            <div class="col-md-10 col-md-offset-1">
                                <table id="SubtopicTable" class="table table-bordered">
                                    <thead>
                                    <tr class="grayTh">
                                        <th class="text-center" rowspan="2" style="width:20%;vertical-align:middle">SUB TOPIC</th>
                                        <th class="text-center" colspan="2" style="width:20%;vertical-align: middle">SCORE</th>
                                        <th class="text-center" rowspan="2" style="width:10%;vertical-align: middle">GRADE</th>
                                        <th class="text-center" rowspan="30" style="width: 30%;;vertical-align: middle">DESCRIPTION</th>
                                        <th class="text-center" rowspan="2" style="width: 20%"></th>
                                    </tr>
                                    <tr class="grayTh">
                                        <th class="text-center">
                                            <label>Min</label>
                                        </th>
                                        <th class="text-center" >
                                            <label>Max</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="tbodySubTopic">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</c:if>

<%-------------------------------------------------------------------------------User------------------------------------------%>
<c:if test="${status == 'user' || status == 'staff'}">
    <div class="row">
        <div class="form-horizontal">
            <div class="col-md-12">

                <c:if test="${status == 'staff'}">
                    <div class="row form-group">
                        <label class="col-md-3 control-label">โปรดเลือกผู้ถูกประเมิน</label>

                        <div class="col-md-4">
                            <select id="selectStudentForEvaluation" class="form-control">
                                <option value="0">โปรดเลือกนักศึกษา</option>
                            </select>
                        </div>
                    </div>
                </c:if>

                <div class="row form-group">
                    <table class="table table-striped table-hover table-bordered">
                        <thead class="bg-primary">

                        <tr>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;" width="15%">หัวข้อ</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;" width="15%">หัวข้อย่อย</th>
                            <th rowspan="1" colspan="2" class="text-center">คะแนน</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;" width="10%">เกรด</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;" width="30%">รายละเอียด</th>
                            <c:if test="${status == 'user'}">
                                <th rowspan="1" colspan="2" class="text-center" width="30%">นักศึกษา</th>
                            </c:if>
                            <c:if test="${status == 'staff'}">
                                <th rowspan="1" colspan="2" class="text-center"width="30%">พนักงาน</th>
                                <th rowspan="1" colspan="2" class="text-center">นักศึกษา</th>
                            </c:if>
                        </tr>
                        <tr>
                            <c:if test="${status == 'staff'}">
                                <th rowspan="1" colspan="1" class="text-center">ต่ำสุด</th>
                                <th rowspan="1" colspan="1" class="text-center">สูงสุด</th>
                                <th rowspan="1" colspan="1" class="text-center">กรอกคะแนน</th>
                                <th rowspan="1" colspan="1" class="text-center">หมายเหตุ</th>
                                <th rowspan="1" colspan="1" class="text-center">คะแนน</th>
                                <th rowspan="1" colspan="1" class="text-center">หมายเหตุ</th>
                            </c:if>
                            <c:if test="${status == 'user'}">
                                <th rowspan="1" colspan="1" class="text-center">ต่ำสุด</th>
                                <th rowspan="1" colspan="1" class="text-center">สูงสุด</th>
                                <th rowspan="1" colspan="1" class="text-center">กรอกคะแนน</th>
                                <th rowspan="1" colspan="1" class="text-center">หมายเหตุ</th>
                            </c:if>
                        </tr>
                        </thead>
                        <tbody id="result">

                        </tbody>
                    </table>
                </div>

                <div class="col-md-4 col-md-offset-4 text-center">
                    <input type="button" id="subEvaluation" class="btn btn-primary"
                           value="&nbsp;&nbsp;ตกลง&nbsp;&nbsp;"/>&nbsp;&nbsp;
                    <button id="disEvaluation" type="button" class="btn btn-danger" data-toggle="modal"
                            data-target="">
                        ล้างข้อมูล
                    </button>
                </div>


            </div>
        </div>
    </div>
</c:if>
</div>
