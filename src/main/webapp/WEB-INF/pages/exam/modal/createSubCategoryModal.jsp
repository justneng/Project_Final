<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 8/6/2015
  Time: 11:13 AM
  To change this template use File | Settings | File Templates.
--%>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>


<div class="modal fade" id="createSub">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" align="center">เพิ่มหัวข้อเรื่อง</h4>
            </div>
            <div class="modal-body">

                <div class="row form-group">


                    <div class="col-md-4" align="right">
                        <label class="control-label" style="color: black ; font-weight: 100">
                            <small style="color: red">*</small>
                            หมวดหมู่ :
                        </label>
                    </div>
                    <div class="col-md-6">
                        <%--<input type="text" class="form-control" name="cat" id="categoryName-forAddSubCat" style="width: 245px"/>--%>
                        <%--<select class="selectpicker" id="sCat" class="form-control" data-width="100%">--%>
                            <form:select path="listCat" id="sCat" name="advisor" class="form-control" required="true" >
                            <option value="">รหัส : ชื่อหมวดหมู่</option>
                            <c:forEach var="category" items="${listCat}">
                                <option categoryName="${category.name} " value="${category.id}">${category.id}
                                    : ${category.name}</option>
                            </c:forEach>
                            </form:select>

                        <%--</select>--%>
                    </div>
                </div>

                <%--<form class="form-horizontal" id="subcatform" method="post">--%>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-4" align="right">
                            <label for="subcategoryNameadd" class="control-label" style="color:black;font-weight: 100"><small style="color: red">*</small>หัวข้อเรื่อง :</label>
                        </div>
                        <div class="col-md-6 controls">
                            <input type="text" class="form-control" id="subcategoryNameadd" placeholder="กรอกชื่อหัวข้อเรื่อง" name="subcategoryNameadd" required="true" >
                            </input>
                        </div>
                        <%--<div class="help-block with-errors">error+++</div>--%>
                    </div>
                </div>
                <%--</form>--%>


                <div style="margin-bottom: 5px"></div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <button id="submitCreateSubCategoryBtn" class="btn btn-primary" type="submit"  onclick="saveSubCategory()">บันทึก
                        </button>

                        <button id="hiddenBtn2" class="btn btn-danger" class="hidden" data-dismiss="modal">
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<%--<spring:url value="../../../resources/js/pageScript/exam/addSubCategory.js" var="addSubCategory"> </spring:url>--%>
<%--<script src="${addSubCategory}" type="text/javascript"><!--Not Empty --></script>--%>

<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/addSubCategory.js" />"></script>

<%--<style>--%>

    <%--#category + .dropdown-menu{--%>
        <%--/*font-size: 12px;*/--%>
        <%--max-width: 100%;--%>
        <%--max-height: 50px;--%>
        <%--overflow-y: auto;--%>
    <%--}--%>
<%--</style>--%>
<script>
    function closeModal(){
        var catId = $("#sCat").val();
        var catName = $("#subcategoryNameadd").val();
        if(catId == "" && catName ==""){

            $("#createSub").modal('hide');
        }
        else {
            if(!confirm(" ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่"))
                return false;
            $("#createSub").modal('hide');
        }
    };
    $("#hiddenBtn2").on('click',function(){
        closeModal();
    });
    $(".close").on('click',function(){
        closeModal();
    });

</script>











