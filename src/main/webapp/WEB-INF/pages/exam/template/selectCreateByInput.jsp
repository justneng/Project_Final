<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 17/7/2558
  Time: 16:34
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>

<style>
    @media (max-width: 767px) {
        .text-right {
            text-align:left;
        }
    }
</style>

<script>
    var context = '${context}';
</script>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="addEmpCreateByBtn" class="label-control">สร้างโดย</label>
    </div>
    <div class="col-sm-10">
        <button id="addEmpCreateByBtn" data-toggle="modal" data-target="#modalSearchByEmployeeName" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span></button>
        <div id="showEmployeeSelected" class="">

        </div>
    </div>
</div>

<%@include file="../modal/addEmployeeToInputModal.jsp" %>
<script src="${context}/resources/js/pageScript/exam/selectEmployee.js" ></script>
<script src="${context}/resources/js/pageScript/exam/selectCreateByInput.js"></script>


<script>
    $(document).ready(function () {
        $("#selectAllEmployeeName").click(function (event) {
            if (this.checked) {
                $(".userSelectCheckbox").each(function () {
                    this.checked = true;
                });
            }
            else {
                $(".userSelectCheckbox").each(function () {
                    this.checked = false;
                });
            }
        })
    });
</script>

