<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: JOKIZZ
  Date: 13/8/2558
  Time: 10:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';

    if ('${status}' == 'user' || '${status}' == '') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>
<script>
    if ('${status}' != 'staff') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<div class="container row">
    <h3>จัดการหัวข้อเรื่อง</h3>
    <hr>
</div>
<div class="container">
    <div class="row">
        <div class="panel-collapse" id="searchCollapse">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h5 class="panel-title">ค้นหา</h5>
                </div>
                <div class="panel-body">

                    <div style="margin-bottom: 5px"></div>
                    <div class="row col-md-6 ">
                        <div class="col-md-5  text-right">
                            <label style="margin-top: 4px;">หมวดหมู่ :</label>
                        </div>
                        <div class="col-md-6 input-group">
                            <input id="categoryId" class="form-control" autocomplete="off" placeholder="ค้นหาหมวดหมู่">

                            <span class="input-group-addon">
                            <i class="glyphicon glyphicon-search" onclick="listsubcat()"
                               style="cursor: pointer; height: 20px;"></i>
                             </span>
                        </div>
                    </div>
                    <div style="margin-bottom: 5px"></div>

                    <div class="row col-ms-5">
                        <div class="col-md-2 text-right">
                            <label style="margin-top: 4px;">หัวข้อเรื่อง :</label>
                        </div>
                        <div class="col-md-3">
                            <select id="sSubCat" class="form-control" data-width="100%">
                            </select>
                        </div>
                    </div>

                </div>
                <div class="panel-footer">
                    <div class="row" id="btnSearch">
                        <div class="col-md-12 text-center">
                            <button id="searchSubCategory" class="btn btn-primary btn-sm" type="button">ค้นหา</button>
                            <button id="clearsearchinput" class="btn btn-sm btn-gray    " type="button">ล้างข้อมูล
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 5px;">
            <button id="addSubcategory" data-toggle="modal" data-target="#createSub" class="btn btn-success btn-sm"
                    align="center"
                    ><span class="glyphicon glyphicon-plus"></span>
            </button>
            <button align="center" class="btn btn-danger btn-sm" onclick="deleteSubCategory()">
                <span class="glyphicon glyphicon-minus"></span>
            </button>
        </div>

        <table class="table table-bordered" id="tblSubCategory">
            <col width="10%"/>
            <col width="40%"/>
            <col width="40%"/>
            <col width="10%"/>
            <thead class="bg-primary label-primary small">
            <tr>
                <th style="text-align: center; color: white;"><input id="selectAllSubCategory" type="checkbox"/></th>
                <th style="text-align: center; color: white;">หมวดหมู่</th>
                <th style="text-align: center; color: white;">หัวข้อเริ่อง</th>
                <th id="thEdit" style="text-align: center; color: white">แก้ไข</th>
            </tr>
            </thead>
            <tbody id="tbodySubCategory">


            </tbody>
        </table>
        <div class="bg-info" id="alertMess">
            <h3 id="alertMessDesc" style="text-align: center;">ไม่พบข้อมูลที่ค้นหา</h3>
        </div>
    </div>
</div>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/manageSubCategory.js" />"></script>
<%@include file="modal/createSubCategoryModal.jsp" %>

<style>
    #alertMess {
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }

    #alertMessDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

    #categoryId + .dropdown-menu {
        /*font-size: 12px;*/
        max-width: 100%;
        max-height: 150px;
        overflow-y: auto;
    }

    .typeahead {
        width: 100%;
    }

    #tbodySubCategory td {
        font-size: 13px;
    }


</style>


