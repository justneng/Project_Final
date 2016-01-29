<%--
  Created by IntelliJ IDEA.
  User: l3eal2
  Date: 30/3/2558
  Time: 16:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/viewEvaluation.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<script>
    if ('${status}' == '') {
        window.location.href = context+"/TDCS/index.html";
    }

    var status = '${status}';
</script>

<div class="form-horizontal">
    <div class="row">
        <h3 class="h3">ผลการประเมิน
            <c:if test="${status == 'user'}">
                <label style="color: red"><span id="checkEvaluate"></span></label>
            </c:if>
        </h3>
        <hr/>
    </div>

    <div class="row">
        <div class="form-horizontal">
            <div class="col-md-12">

                <c:if test="${status == 'staff'}">
                    <div class="row form-group">
                        <label class="col-md-3 control-label">โปรดเลือกผู้ถูกประเมิน</label>

                        <div class="col-md-4">
                            <select id="selectStudentForEvaluation" class="form-control">
                                <option value="0">โปรดเลือกนักศึกษา</option>
                            </select>
                        </div>
                    </div>
                </c:if>

                <div class="row form-group">
                    <table class="table table-striped table-hover table-bordered">
                        <thead class="bg-primary">

                        <tr>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;">หัวข้อ</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;">หัวข้อย่อย</th>
                            <th rowspan="1" colspan="2" class="text-center">คะแนน</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;">เกรด</th>
                            <th rowspan="2" class="text-center" style="vertical-align: middle;">รายละเอียด</th>
                            <th rowspan="1" colspan="2" class="text-center">นักศึกษา</th>
                            <th rowspan="1" colspan="2" class="text-center">พนักงาน</th>
                        </tr>
                        <tr>
                            <th rowspan="1" colspan="1" class="text-center">ต่ำสุด</th>
                            <th rowspan="1" colspan="1" class="text-center">สูงสุด</th>
                            <th rowspan="1" colspan="1" class="text-center">คะแนน</th>
                            <th rowspan="1" colspan="1" class="text-center">หมายเหตุ</th>
                            <th rowspan="1" colspan="1" class="text-center">คะแนน</th>
                            <th rowspan="1" colspan="1" class="text-center">หมายเหตุ</th>
                        </tr>
                        </thead>
                        <tbody id="result">

                        </tbody>

                    </table>

                    <div class="pull-right col-md-4" style="padding-right: 0px">
                        <table class="table table-bordered">
                            <thead class="bg-primary">
                            <tr>
                                <th colspan="2" class="text-center">นักศึกษา</th>
                                <th colspan="2" class="text-center">พนักงาน</th>
                            </tr>
                            <tr>
                                <th>SCORE</th>
                                <th>GRADE</th>
                                <th>SCORE</th>
                                <th>GRADE</th>
                            </tr>
                            </thead>
                            <tbody id="resultScore">

                            </tbody>
                        </table>
                    </div>

                </div>

                <%--<div class="col-md-4 col-md-offset-4 text-center">--%>
                <%--<input type="button" id="subEvaluation" class="btn btn-primary" value="&nbsp;&nbsp;ตกลง&nbsp;&nbsp;"/>&nbsp;&nbsp;--%>
                <%--<button id="disEvaluation" type="button" class="btn btn-danger" data-toggle="modal" data-target="">--%>
                <%--ล้างข้อมูล--%>
                <%--</button>--%>
                <%--</div>--%>


            </div>
        </div>
    </div>
</div>