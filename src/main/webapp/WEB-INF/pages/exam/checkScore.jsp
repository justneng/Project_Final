<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';

    if('${status}' == ''||'${status}' == 'staff'){
        window.location.href = context+"/TDCS/index.html";
    }
</script>
<div class="container row">
    <h3 class="h3">ผลคะแนนการสอบ</h3>
</div>
<hr/>

<div class="container">
    <div class="row">
        <table class="table table-bordered table-hover">
            <thead class="bg-primary label-primary small">
            <tr>
                <th style="text-align: center">รหัสชุดข้อสอบ</th>
                <th style="text-align: center">ชื่อชุดข้อสอบ</th>
                <th style="text-align: center" width="20%">คะแนนเต็ม</th>
                <th style="text-align: center" width="20%">คะแนนที่ได้</th>
            </tr>
            </thead>
            <tbody>

            <c:forEach items="${examResults}" var="result">
                    <c:if test="${fn:indexOf(result.objectiveScore + result.subjectiveScore,',') != 0}">
                        <c:set var="score"
                               value="${fn:substring(result.objectiveScore + result.subjectiveScore , 0 , (fn:indexOf(result.objectiveScore + result.subjectiveScore, '.')+3))}"/>
                    </c:if>

                    <tr resultId="${result.id}">
                        <td align="center">${result.examRecord.paper.code}</td>
                        <td>${result.examRecord.paper.name}</td>
                        <td align="center" class="col-max-score">
                                ${result.examRecord.paper.maxScore}
                        </td>
                        <c:choose>
                            <c:when test="${result.status.id == 7}">

                                <td align="center" class="col-score">
                                        ${score}
                                    <button class="btn btn-link btn-info btn-sm resultDetail" type="button" data-toggle="modal"
                                            data-target="#showScore" resultId="${result.id}">
                                        <span class="glyphicon glyphicon-info-sign" href="#"></span>
                                    </button>
                                </td>

                            </c:when>
                            <c:otherwise>
                                <td align="center" class="col-score">
                                    ยังไม่ตรวจ
                                </td>
                            </c:otherwise>
                        </c:choose>
                    </tr>
            </c:forEach>
            </tbody>
        </table>

        <c:if test="${fn:length(examResults) <= 0}">
            <div class="bg-info" id="b3rd">
                <h3 id="b4th" style="text-align: center;">ไม่พบข้อมูล</h3>
            </div>
        </c:if>
    </div>
</div>


<%@include file="modal/showScoreModal.jsp" %>
<script src="${context}/resources/js/pageScript/exam/checkScore.js"></script>

<style>

    #b3rd {
        background-color: #b2e0ff;
        height: 100px;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }

    #b4th {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

</style>