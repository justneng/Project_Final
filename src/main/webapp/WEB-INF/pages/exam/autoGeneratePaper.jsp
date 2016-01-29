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
                   <thead>
                   <tr>
                       <th>รายวิชา</th>
                       <th>ประวัติ</th>
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
                               <button class="btn btn-primary btn-circle btn-sm glyphicon glyphicon-time"></button>
                           </td>
                           <td>
                               <c:choose>
                                   <c:when test="${category.numberOfQuestions >= '10'}">
                                       <button cid="${category.category.id}" class="btn btn-primary btn-sm active do-exam" type="button">เริ่มทำข้อสอบ</button>
                                   </c:when>
                                   <c:otherwise>
                                       <button class="btn btn-primary btn-sm disabled" type="button">ข้อสอบไม่เพียงพอ</button>
                                   </c:otherwise>
                               </c:choose>
                           </td>
                       </tr>
                   </c:forEach>
                   </tbody>
               </table>
           </div>
       </div>
    </div>
</div>

