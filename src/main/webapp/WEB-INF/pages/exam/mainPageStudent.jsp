<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="f" uri="http://springapp.com/mvc/util" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<link rel="stylesheet" href="<c:url value="/resources/css/exam/autoGeneratePaper.css"/>"/>

<script>
    var context = '${context}';

    if ('${status}' == '' || '${status}' == 'staff') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<h3 class="h3">เลือกทำข้อสอบ</h3>

<ul class="nav nav-tabs">
    <li class="active">
        <a href="#select-paper" data-toggle="tab">ชุดข้อสอบออกโดยพนักงาน</a>
    </li>

    <li id="generate-paper-tab" class="">
        <a href="#select-paper-by-system-generate" data-toggle="tab">ชุดข้อสอบออกโดยระบบ</a>
    </li>
</ul>
<br/>

<div class="tab-content">
    <div id="select-paper" class="container-fluid tab-pane fade in active">
        <div class="row">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="label-primary small bg-primary">
                    <tr>
                        <th style="text-align: center">รหัสชุดข้อสอบ</th>
                        <th style="text-align: center">ชื่อชุดข้อสอบ</th>
                        <th style="text-align: center">ชื่อผู้สร้าง</th>
                        <th style="text-align: center">ประเภทผู้สอบ</th>
                        <th style="text-align: center">คะแนนเต็ม</th>
                        <th style="text-align: center">เวลาในการทำข้อสอบ</th>
                        <th style="text-align: center">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    <!-- Available Paper -->
                    <c:forEach var="paper" items="${openPaperList}">
                        <tr>
                            <td align="center">${paper.code}</td>
                            <td>${paper.name}</td>
                            <td>${paper.createBy.thFname}&nbsp;${paper.createBy.thLname}</td>
                            <c:if test="${paper.position.posiName != null}">
                                <td>${paper.position.posiName}</td>
                            </c:if>
                            <c:if test="${paper.position.posiName == null}">
                                <td>ทั้งหมด</td>
                            </c:if>
                            <td align="center">${paper.maxScore}</td>
                            <c:set var="hour" value="${f:parseInt(paper.timeLimit / 60)}"/>
                            <td align="center">${hour}.${paper.timeLimit % 60} ชั่วโมง</td>
                            <td style="text-align: center;">
                                    <%--<a class="doExamBtn" location="${context}/TDCS/exam/doExam?paperId=${paper.id}">--%>
                                <button class="btn btn-primary doExamBtn" paperId="${paper.id}" type="button">
                                    เริ่มทำข้อสอบ
                                </button>
                                    <%--</a>--%>
                            </td>
                        </tr>
                    </c:forEach>

                    <!-- Paper That has been done -->
                    <c:forEach var="paper" items="${donePaperList}">
                        <tr>
                            <td align="center">${paper.code}</td>
                            <td>${paper.name}</td>
                            <td>${paper.createBy.thFname}&nbsp;${paper.createBy.thLname}</td>
                            <c:if test="${paper.position.posiName != null}">
                                <td>${paper.position.posiName}</td>
                            </c:if>
                            <c:if test="${paper.position.posiName == null}">
                                <td>ทั้งหมด</td>
                            </c:if>
                            <td align="center">${paper.maxScore}</td>
                            <c:set var="hour" value="${f:parseInt(paper.timeLimit / 60)}"/>
                            <td align="center">${hour}.${paper.timeLimit % 60} ชั่วโมง</td>
                            <td style="text-align: center;">
                                <button class="btn" type="button" disabled >เคยทำข้อสอบชุดนี้ไปแล้ว</button>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="select-paper-by-system-generate" class="container tab-pane fade">
        <div id="waiting-icon" style="display:none;width:69px;height:89px;border:1px solid black;position:absolute;top:50%;left:50%;padding:2px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" width="64" height="64"/>
        </div>

        <div class="row">
            <div class="table-responsive">
                <div class="table-responsive">
                    <table class="table table-hover table-bordered table-striped">
                        <col width=""/>
                        <col width="10%">
                        <thead>
                        <tr>
                            <th>หมวดหมู่</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody id="tbody-generate-papers">
                        <c:forEach items="${listCategories}" var="category">
                            <tr>
                                <td>
                                    <c:out value="${category.category.name}"/>
                                    <span class="badge"><c:out value="${category.numberOfQuestions}"/></span>
                                </td>
                                <td>
                                    <c:choose>
                                        <c:when test="${category.numberOfQuestions >= '10'}">
                                            <button cid="${category.category.id}" class="btn btn-default btn-sm" type="button" data-toggle="collapse" data-target=".select-paper">
                                                เลือกชุดข้อสอบ&nbsp;<span class="caret"></span>
                                            </button>
                                        </c:when>
                                        <c:otherwise>
                                            <button class="btn btn-primary btn-sm disabled" type="button">ข้อสอบไม่เพียงพอ
                                            </button>
                                        </c:otherwise>
                                    </c:choose>
                                </td>
                            </tr>
                            <c:forEach items="${listAvailable}" var="available">
                                <c:forEach items="${available['paper']}" var="paper">
                                    <c:set var="check1" value="${category.category.id}"/>
                                    <c:set var="check2" value="${available['category'].id}"/>
                                    <c:choose>
                                        <c:when test="${check1 eq check2}">
                                            <tr class="collapse select-paper info">
                                                <td>
                                                    <span class="glyphicon glyphicon-triangle-right"></span>
                                                    <c:out value="${paper.examPaper.name}"/>&nbsp;<span class="badge available">Available</span>
                                                </td>
                                                <td>
                                                    <button cid="${category.category.id}" class="btn btn-primary btn-sm active do-exam" type="button">
                                                        เริ่มทำข้อสอบ
                                                    </button>
                                                </td>
                                            </tr>
                                        </c:when>
                                    </c:choose>
                                </c:forEach>
                            </c:forEach>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="confirmationModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" align="center">
                เมื่อเริ่มทำข้อสอบแล้วออกจากหน้าระบบจะทำการบันทึกข้อมูลทันที<br>และจะทำให้ไม่สามารถเข้าทำข้อสอบนี้ได้อีก
                <br><br>
                ต้องการที่จะทำข้อสอบนี้หรือไม่
            </div>
            <div class="modal-body" align="center">
                <div class="row">
                    <div class="col-md-3 col-md-offset-3">
                        <button class="btn btn-primary btn-block" id="doExamConfirmedBtn">&nbsp;ใช่&nbsp;</button>
                    </div>

                    <div class="col-md-3">
                        <button class="btn btn-gray btn-block" data-dismiss="modal">&nbsp;ไม่&nbsp;</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/mainPageStudent.js"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/autoGeneratePaper.js"/>"></script>