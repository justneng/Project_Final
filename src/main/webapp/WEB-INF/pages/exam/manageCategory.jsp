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
                        &nbsp;&nbsp;
                        <button id="searchCategory" class="btn btn-primary btn-sm" type="button">
                            <span class="glyphicon glyphicon-search"></span>&nbsp;ค้นหา</button>
                        <button id="resetBtnSearchCategory" type="button" class="btn btn-gray btn-sm" >ล้างข้อมูล</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <button id="addCategory" data-toggle="modal" data-target="#createCat" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span></button>
    </div>

    <div class="row">
        <table class="table table-bordered table-hover" id="tblCategory">
            <col width=""/>
            <col width="10%"/>
            <col width="15%"/>
            <tbody>
                <c:forEach items="${LIST_OF_CATEOGRIES}" var="category">
                    <tr>
                        <td><label class="label${category.id}" hidden>${category.name}</label><c:out value="${category.id} : ${category.name}"/></td>

                        <td>
                            <button class="btn btn-primary btn-sm update-category" type="button" cateoryId="${category.id}" data-toggle="modal" data-target="#category-details"><span class="glyphicon glyphicon-pencil"></span></button>
                            <button class="btn btn-gray btn-sm" type="button"><span class="glyphicon glyphicon-trash"></span></button>
                        </td>

                        <td>
                            <button class="btn btn-link btn-sm" type="button" data-toggle="collapse" data-target=".${category.id}">ดูหัวข้อเรื่องทั้งหมด&nbsp;<span class="caret"></span></button>
                        </td>
                    </tr>
                    <c:forEach items="${LIST_OF_SUBCATEGORIES}" var="subcategory">
                        <c:set var="op1">${subcategory.category.id}</c:set>
                        <c:set var="op2">${category.id}</c:set>
                        <c:choose>
                            <c:when test="${op1 eq op2}">
                                <tr class="collapse ${subcategory.category.id} info">
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-tag"/>&nbsp;<c:out value="${subcategory.name}"/></td>
                                    <%--<td>--%>
                                        <%--<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-pencil"></span></button>--%>
                                        <%--<button class="btn btn-gray btn-sm" type="button"><span class="glyphicon glyphicon-trash"></span></button>--%>
                                    <%--</td>--%>
                                </tr>
                            </c:when>
                        </c:choose>
                    </c:forEach>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<%--Modal Category Details--%>
<div id="category-details" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <label>หมวดหมู่</label>
                <div class="well">
                    <form class="form-horizontal" where="category">
                        <div class="form-group">
                            <label class="col-sm-2 control-label text-right label-category-id"></label>
                            <div class="col-sm-8 on-modal">
                                <input class="form-control input-sm input-category" value=""/>
                            </div>
                        </div>
                    </form>
                </div>

                <label>หัวข้อเรื่อง</label>
                <button id="add-subcategory" class="btn btn-link btn-sm" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                <div class="well">

                    <form class="form-horizontal" where="subcategories">

                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>

<%@include file="modal/createCategoryModal.jsp"%>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageCategory.js" />"></script>
