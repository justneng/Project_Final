<%--By Jokkiz--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="container-fluid">
    <div class="row">
        <div class="form-group col-sm-6 col-xm-6 col-lg-6">
            <label id="rand-category" class="col-sm-offset-2 col-sm-2 col-xm-2 col-lg-2 control-label text-right">หมวดหมู่</label>
            <div class="col-sm-8 col-xm-8 col-lg-8">
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
        </div>

        <div class="form-group col-sm-6 col-xm-6 col-lg-6">
            <label id="rand-subcategory" class="col-sm-2 col-xm-2 col-lg-2 control-label text-right">หัวข้อเรื่อง</label>
            <div class="col-sm-8 col-xm-8 col-lg-8">
                <select id="selectSubCategoryToSelectionForRandom" class="form-control input-sm" data-width="100%">
                </select>
            </div>
        </div>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/selectCategoryInputRandom.js" charset="utf-8"></script>