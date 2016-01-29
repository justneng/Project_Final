<%--By Jokkiz--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="col-sm-12">
    <div class="col-sm-1 text-right" style="padding: 0;">
        <h5>หมวดหมู่ :</h5>
    </div>
    <div class="col-sm-4">
        <div class="input-group">
            <input type="text" class="form-control input-sm" name="cat" id="selectCategoryToSelectionForRandom"
                   placeholder="ค้นหาหมวดหมู่" autocomplete="off"/>
            <span class="input-group-addon input-group-sm input-sm" id="selectCatForRandom" style="height: 10px;">
                <i class="" onclick="listcatSelectInputForRandom()"
                   style="cursor: pointer; height: 20px;">
                    <span class="glyphicon glyphicon-search"></span>
                </i>
            </span>
        </div>
    </div>
    <div class="col-sm-2 text-right">
        <h5>หัวข้อเรื่อง :</h5>
    </div>
    <div class="col-sm-4 form-group" style="padding: 0;">
        <select id="selectSubCategoryToSelectionForRandom" class="form-control input-sm" data-width="100%">
        </select>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/selectCategoryInputRandom.js" charset="utf-8"></script>