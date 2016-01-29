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
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h5 class="panel-title">ค้นหา</h5>
            </div>
            <div class="panel-body ">
                <div style="margin-bottom: 5px"></div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="form-group col-md-12">
                                <div class="col-md-2 col-lg-offset-3 text-right">
                                    <label for="categoryName" class="control-label">หมวดหมู่ : </label>
                                </div>

                                <div class="col-md-3 input-group" >
                                    <input id="categoryName" class="form-control input-sm"  type="text"placeholder="รหัสหมวดหมู่ : ชื่อหมวดหมู่" >
                                <%--onkeydown="listcat()"--%>
                                    <span class="input-group-addon input-group-sm" >
                                        <i onclick="listcat()" style="cursor: pointer; height: 20px;">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            <div style="margin-top: -10px"></div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <button id="searchCategory" class="btn btn-primary btn-sm" type="button">ค้นหา</button>
                        <button id="resetBtnSearchCategory" type="button" class="btn btn-gray btn-sm" >ล้างข้อมูล</button>
                        <%--style="background-color: rgba(193, 193, 198, 0.83); color: #000000;"--%>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="row">
        <div>
            <button id="addCategory" data-toggle="modal" data-target="#createCat" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span></button>
            <button id="deleteCategory" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-minus"></span></button>
            </div>
            <table class="table table-bordered table-hover" id="tblCategory">
                <thead class="label-primary small">
                    <tr>
                        <th style="text-align: center; color: white;"><input id="selectAllCheckbox" checked="" type="checkbox"/></th>
                        <th style="text-align: center; color: white;">รหัสหมวดหมู่</th>
                        <th style="text-align: center; color: white;">หมวดหมู่</th>
                        <th id="thEdit" style="text-align: center; color: white;">แก้ไข</th>
                    </tr>
                </thead>
                <tbody id="tbodyCategory">
                    <%--<c:forEach var="category" items="${LIST_OF_CATEOGRIES}">--%>
                        <%--<tr>--%>
                            <%--<td>${category.id}</td>--%>
                            <%--<td>${category.name}</td>--%>
                            <%--<td style="text-align: center">--%>
                                <%--<button type="button" class="btn btn-warning"><span--%>
                                        <%--class="glyphicon glyphicon-pencil"></span>--%>
                                <%--</button>--%>
                                <%--<button type="button" class="btn btn-danger"><span--%>
                                        <%--class="glyphicon glyphicon-trash"></span>--%>
                                <%--</button>--%>
                            <%--</td>--%>
                        <%--</tr>--%>
                    <%--</c:forEach>--%>
                </tbody>
            </table>
            <div class="bg-info" id="searchCatNotFound">
                <%--<p class="bg-info">--%>
                    <h3 id="searchCatDescNotFound" style="text-align: center;">ไม่พบข้อมูลที่ค้นหา</h3>
                <%--</p>--%>
            </div>
        </div>
    </div>
</div>

<style>
    #searchCatNotFound{
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }
    #searchCatDescNotFound{
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }
    #categoryName + .dropdown-menu {
        /*font-size: 12px;*/
        max-width: 100%;
        max-height: 150px;
        overflow-y: auto;
    }
    .typeahead {
        width: 100%;
    }

    #tbodyCategory td{
        font-size: 13px;
    }

</style>
<%@include file="modal/createCategoryModal.jsp"%>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageCategory.js" />"></script>
<%--<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/searchCategory.js" />"></script>--%>
