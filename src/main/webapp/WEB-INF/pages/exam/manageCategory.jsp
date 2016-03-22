<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 15/7/2558
  Time: 15:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<link rel="stylesheet" href="<c:url value="/resources/css/exam/category.css"/>"/>

<script>
    var context = '${context}';

    if ('${status}' != 'staff') {
        window.location.href = context+"/TDCS/index.html";
    }

</script>

<style>
    td{
        font-size: 14px;
    }
    #tblCategory{
        margin-top: 5px;
    }
</style>

<div class="container row">
    <h3>จัดการหมวดหมู่</h3>
    <hr>
</div>

<div class="container">
    <div class="row">
        <div class="panel panel-default">
            <div class="panel-heading">
                <label><strong>ค้นหา</strong></label>
            </div>

            <div class="panel-body ">
                <div class="row">
                    <div class="form-group">
                        <%@include file="template/selectCategoryInput.jsp" %>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <table class="table table-bordered table-hover" id="tblCategory">
            <%--<col width="5%"/>--%>
            <%--<col width="40%"/>--%>
            <%--<col width="40%"/>--%>
            <thead>
                <tr>
                    <%--<th><input id="selectAllCheckbox" checked="" type="checkbox"/></th>--%>
                    <th>หมวดหมู่</th>
                    <th>หมวดหมู่</th>
                    <th>แก้ไข</th>
                </tr>
            </thead>

            <tbody>
                <c:forEach items="${LIST_OF_CATEOGRIES}" var="category">
                    <tr>
                        <td><c:out value="${category.id} : ${category.name}"/></td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>

    <%--<div class="row">--%>
        <%--<c:forEach items="${LIST_OF_CATEOGRIES}" var="category">--%>
            <%--<div panel-body>--%>
                <%--AAAA--%>
            <%--</div>--%>
        <%--</c:forEach>--%>
    <%--</div>--%>
</div>
<%@include file="modal/createCategoryModal.jsp"%>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageCategory.js" />"></script>
