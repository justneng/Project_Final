<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 23/1/2559
  Time: 2:25
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>

<link rel="stylesheet" href="<c:url value="/resources/css/exam/autoGeneratePaper.css"/>"/>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/autoGeneratePaper.js"/>"></script>

<script>
    var context = '${context}';
    if ('${status}' == '' || '${status}' == 'staff') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<div class="container">
    <div class="row">
        <div class="table-responsive">
            <div class="table-responsive">
                <table class="table table-hover table-bordered table-striped">
                    <col width=""/>
                    <col width="10%">
                    <thead>
                    <tr>
                        <th>รายวิชา</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
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
                        <%--<c:choose>--%>
                            <%--<c:when test="${category.numberOfQuestions >= '10'}">--%>
                                <%--<c:forEach items="${listAvailable}" var="paper">--%>
                                    <%--<c:set var="paperName" value="${paper['paper']}"/>--%>
                                    <%--<c:forEach items="${paper}" var="numb" varStatus="i">--%>
                                        <%--<c:set var="paperNumber" value="${numb.value}"/>--%>
                                    <%--</c:forEach>--%>
                                <%--</c:forEach>--%>
                                <%--<tr class="collapse choose">--%>
                                    <%--<td>--%>
                                        <%--<span class="glyphicon glyphicon-triangle-right"></span>&nbsp;--%>
                                        <%--<span class="newTemplate glyphicon glyphicon-plus"><c:out value="${paperNumber}"/></span>--%>
                                    <%--</td>--%>
                                    <%--<td>--%>
                                        <%--<button cid="${category.category.id}" class="btn btn-primary btn-sm active do-exam" type="button">--%>
                                            <%--เริ่มทำข้อสอบ--%>
                                        <%--</button>--%>
                                    <%--</td>--%>
                                <%--</tr>--%>
                            <%--</c:when>--%>
                        <%--</c:choose>--%>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

