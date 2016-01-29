<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/17/2015
  Time: 4:11 PM
  To change this template use File | Settings | File Templates.
--%>

<!-- Slect Category and Sub Category (หมวดหมู่ และ หัวข้อเรื่อง)-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="selectCategoryToSelection" class="control-label"><h5 style="margin-top: 5px;">หมวดหมู่ :</h5></label>
    </div>
    <div class="col-sm-3" style="padding: 0;">
        <div class="input-group">
            <input type="text" class="form-control input-sm" name="cat" id="selectCategoryToSelection" placeholder="ค้นหาหมวดหมู่"
                   data-width="100%" autocomplete="off"/>
        <span class="input-group-addon input-group-sm input-sm" id="selectCat">
            <i onclick="listcatSelectInput()" style="cursor: pointer; height: 20px;">
                <span class="glyphicon glyphicon-search"></span></i>
        </span>
        </div>
    </div>
    <div class="col-sm-2 text-right">
        <label for="selectCategoryToSelection" class="control-label"><h5 style="margin-top: 5px;">หัวข้อเรื่อง :</h5></label>
    </div>
    <div class="col-sm-3" style="padding: 0;">
        <select id="selectSubCategoryToSelection" class="form-control input-sm" data-width="100%"></select>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/selectCategoryInput.js" charset="utf-8"></script>