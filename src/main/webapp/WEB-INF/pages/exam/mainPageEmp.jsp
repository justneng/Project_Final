<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 9/7/2558
  Time: 9:05
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row">
    <div class=" col-md-offset-2 col-md-4">
        <div class="panel panel-primary">
            <%--edit change language ENG to THAI--%>
            <div class="panel-heading" style=" font-size: x-large" id="create">สร้าง</div>
            <div class="panel-body ">
                <div class=" col-md-6 col-md-offset-3" align="center">
                    <div class="row">
                        <button data-toggle="modal" data-target="#createCat" class="btn btn-default" align="center"
                                style="width:125px;height:35px">วิชา
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <button data-toggle="modal" data-target="#createSub" class="btn btn-default"
                                class="btn btn-default" align="center"
                                style="width:125px;height:35px">หัวข้อเรื่อง
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <button data-toggle="modal" data-target="#createQuest" class="btn btn-default"
                                style="width:125px;height:35px">ข้อสอบ
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/exam/createPaper" class="btn btn-default"
                           style="width:125px;height:35px">ชุดข้อสอบ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%--<div class=" col-md-4">--%>
    <%--<div class="panel panel-default">--%>
    <%--<div class="panel-heading" style="background-color: lightpink ;font-size: x-large">แก้ไข</div>--%>
    <%--<div class="panel-body">--%>
    <%--<div class="col-md-6 col-md-offset-3" align="center">--%>


    <%--<div class="row">--%>
    <%--<a href="/TDCS/editQuestions" class="btn btn-default"--%>
    <%--style="background-color:lightpink ;color: black ;width:85px;height:35px">ข้อสอบ--%>
    <%--</a>--%>
    <%--</div>--%>
    <%--<br>--%>

    <%--&lt;%&ndash;<div class="row">--%>
    <%--<button class="btn btn-default"--%>
    <%--style="background-color:lightpink ;color: black ;width:85px;height:35px">ข้อสอบ--%>
    <%--</button>--%>
    <%--</div>--%>
    <%--<br>&ndash;%&gt;--%>

    <%--<div class="row">--%>
    <%--<a href="/TDCS/managePapers" class="btn btn-default"--%>
    <%--style="background-color:lightpink ;color: black ;width:85px;height:35px">ชุดข้อสอบ--%>
    <%--</a>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>
    <%--</div>--%>

    <div class=" col-md-4">
        <div class="panel panel-primary">
            <div class="panel-heading" style="font-size: x-large">จัดการ</div>
            <div class="panel-body">
                <div class="col-md-6 col-md-offset-3" align="center">


                    <div class="row">
                        <a href="${context}/TDCS/exam/manageCategory" class="btn btn-default"
                           style="width:125px;height:35px">วิชา
                        </a>
                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/exam/manageSubCategory" class="btn btn-default"
                           style="width:125px;height:35px">หัวข้อเรื่อง
                        </a>
                    </div>
                    <br>

                    <div class="row">

                        <a href="${context}/TDCS/exam/examRecordSearch" class="btn btn-default"
                           style="width:125px;height:35px">ตรวจข้อสอบ
                        </a>

                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/exam/manageQuestion" class="btn btn-default"
                           style="width:125px;height:35px">ข้อสอบ
                        </a>

                    </div>
                    <br>

                    <div class="row">

                        <a href="${context}/TDCS/exam/managePapers" class="btn btn-default"
                           style="width:125px;height:35px">ชุดข้อสอบ
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<%@include file="modal/createCategoryModal.jsp"%>

<%@include file="modal/createSubCategoryModal.jsp" %>

<%@include file="modal/createQuestionModal.jsp" %>
