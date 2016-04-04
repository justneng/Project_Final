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
    
    .glyphicon-remove-sign{
        color: red;
    }

    .on-modal{
        padding: 0;
    }
</style>

<div class="container row">
    <h3>จัดการหมวดหมู่</h3>
    <hr>
</div>

<div class="container">
    <%--<div class="row">--%>
        <%--<div class="panel panel-default">--%>
            <%--<div class="panel-heading">--%>
                <%--<label><strong>ค้นหา</strong></label>--%>
            <%--</div>--%>

            <%--<div class="panel-body ">--%>
                <%--<div class="row">--%>
                    <%--<div class="form-group">--%>
                        <%--<%@include file="template/selectCategoryInput.jsp" %>--%>
                        <%--&nbsp;&nbsp;--%>
                        <%--<button id="searchCategory" class="btn btn-primary btn-sm" type="button">--%>
                            <%--<span class="glyphicon glyphicon-search"></span>&nbsp;ค้นหา</button>--%>
                        <%--<button id="resetBtnSearchCategory" type="button" class="btn btn-gray btn-sm" >ล้างข้อมูล</button>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>

    <div class="row">
        <button id="addCategory" data-toggle="modal" data-target="#createCat" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus">&nbsp;เพิ่มหมวดหมู่</span></button>
    </div>

    <div class="row">
        <table class="table table-bordered table-hover" id="tblCategory">
            <col width=""/>
            <col width="10%"/>
            <col width="20%"/>
            <tbody>
                <c:forEach items="${LIST_OF_CATEOGRIES}" var="category">
                    <tr>
                        <td>
                            <%--<label class="label${category.id}" hidden>${category.name}</label>--%>
                            <b><c:out value="${category.id} : "></c:out></b>
                            <label class="label${category.id}" style="font-size: 14px; font-weight: normal;">${category.name}</label>
                            &nbsp;<input class="input${category.id}" type="text" value="${category.name}" style="display: none;" size="50">
                        </td>

                        <td>
                            <%--<button class="btn btn-primary btn-sm update-category" type="button" cateoryId="${category.id}" data-toggle="modal" data-target="#category-details"><span class="glyphicon glyphicon-pencil"></span></button>--%>
                            <button class="btn btn-primary btn-sm update-category" type="button" cateoryId="${category.id}"><span class="glyphicon glyphicon-pencil"></span></button>
                            <button class="btn btn-success btn-sm save-update-category" type="button" cateoryId="${category.id}" style="display: none;"><span class="glyphicon glyphicon-ok"></span></button>

                            <c:choose>
                                <c:when test="${category.check eq false}">
                                    <button class="btn btn-gray btn-sm remove-category" cateoryId="${category.id}" type="button"><span class="glyphicon glyphicon-trash"></span></button>
                                </c:when>
                            </c:choose>

                            <button class="btn btn-danger btn-sm cancel-update-category" cateoryId="${category.id}" type="button" style="display: none;"><span class="glyphicon glyphicon-remove"></span></button>
                        </td>

                        <td>
                            <button class="btn btn-link btn-sm" type="button" data-toggle="collapse" data-target=".${category.id}">ดูหัวข้อเรื่อง&nbsp;<span class="caret"></span></button>
                            <button class="btn btn-primary btn-sm manage-subcategory" cateoryId="${category.id}" type="button" data-toggle="modal" data-target="#category-details"><span class="glyphicon glyphicon-edit"></span></button>
                        </td>
                    </tr>
                    <c:forEach items="${LIST_OF_SUBCATEGORIES}" var="subcategory">
                        <c:set var="op1">${subcategory.category.id}</c:set>
                        <c:set var="op2">${category.id}</c:set>
                        <c:choose>
                            <c:when test="${op1 eq op2}">
                                <tr class="collapse ${subcategory.category.id} info" subid="${subcategory.id}">
                                    <td colspan="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-tag" inuse="${subcategory.isUsed}"/>
                                        &nbsp;<c:out value="${subcategory.name}"/>

                                    </td>
                                    <%--<td>--%>
                                        <%--<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-pencil"></span></button>--%>
                                        <%--<button class="btn btn-gray btn-sm" type="button"><span class="glyphicon glyphicon-trash"></span></button>--%>
                                    <%--</td>--%>
                                    <%--<td>--%>
                                        <%--<button class="btn btn-primary btn-sm update-subcategory" type="button" cateoryId="${subcategory.category.id}"><span class="glyphicon glyphicon-pencil"></span></button>--%>
                                        <%--<button class="btn btn-success btn-sm save-update-subcategory" type="button" cateoryId="${subcategory.category.id}" style="display: none;"><span class="glyphicon glyphicon-ok"></span></button>--%>
                                        <%--<button class="btn btn-gray btn-sm delete-subcategory" type="button" cateoryId="${subcategory.category.id}"><span class="glyphicon glyphicon-trash"></span></button>--%>
                                        <%--<button class="btn btn-danger btn-sm cancel-update-subcategory" cateoryId="${subcategory.category.id}" type="button" style="display: none;"><span class="glyphicon glyphicon-remove"></span></button>--%>
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
                <%--<label>หมวดหมู่</label>--%>
                <%--<div class="well">--%>
                    <%--<form class="form-horizontal" where="category">--%>
                        <%--<div class="form-group">--%>
                            <%--<label class="col-sm-2 control-label text-right label-category-id"></label>--%>
                            <%--<div class="col-sm-8 on-modal">--%>
                                <%--<input class="form-control input-sm input-category" value=""/>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</form>--%>
                <%--</div>--%>

                <label>หัวข้อเรื่อง</label>
                <button id="add-subcategory" class="btn btn-link btn-sm" type="button"><span class="glyphicon glyphicon-plus"></span></button>
                <div class="well">

                    <form class="form-horizontal" where="subcategories">

                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <div class="text-center">
                    <button id="update-subcategoory-btn" class="btn btn-primary btn-sm">
                        <span class="glyphicon glyphicon-save"></span>
                        &nbsp;บันทึก
                    </button>
                </div>

                <%--<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>--%>
            </div>
        </div>

    </div>
</div>

<%@include file="modal/createCategoryModal.jsp"%>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageCategory.js" />"></script>
