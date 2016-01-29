<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/validate.js" />"></script>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if ('${status}' != 'staff') {
        window.location.href = context+"/TDCS/index.html";
    }
</script>
<div class="container">

    <div class="row">
        <h3 class="h3">อนุมัตินักศึกษา</h3>
        <hr/>
    </div>

    <div class="row">
        <div class="col-md-12">
            <c:if test="${notPage == 0}">
                <c:if test="${countUserValidate != 0}">
                    <table class="table table-striped table-hover" style="border: solid 1px rgba(31, 31, 38, 0.83);">
                        <thead class="" style="background-color: #9D9D9D;">
                        <tr>
                            <th class="text-center"><input id="checkAll" type="checkbox"/></th>
                            <th class="text-center">วันที่</th>
                            <th class="text-center">รหัสนักศึกษา</th>
                            <th class="text-center">ชื่อ - นามสกุล</th>
                            <th class="text-center">มหาวิทยาลัย</th>
                            <th class="text-center">ตำแหน่ง</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="valid" items="${validate}">
                            <tr class="text-center">
                                <td><input type="checkbox" value="${valid.userId}"/></td>
                                <td>${valid.dateCreate}</td>
                                <td>
                                    <form method="post" action="${context}/TDCS/detail.html">
                                        <input value="${valid.userId}" name="id" style="display: none;" />
                                        <button class="btn btn-sm btn-warning" type="submit">
                                            ${valid.empId}
                                        </button>
                                    </form>
                                </td>
                                <td>${valid.thFname} ${valid.thLname}</td>
                                <td>${valid.universityFacultyMajor.universityFaculty.university.university_name}</td>
                                <td>${valid.position.posiName}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>

                    <c:if test="${countUserValidate > 0}">
                        <div class="text-center">
                            <nav>
                                <c:if test="${pageCount > 1}">
                                    <ul class="pagination" id="paging">
                                        <li id="previousPageClass">
                                            <a id="previousPage" href="javascript:void(0)" aria-label="Previous" title="ก่อนหน้า">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <c:forEach var="i" begin="1" end="${pageCount}">
                                            <li id="pageClass${i}"><a href="${context}/TDCS/validate.html?page=${i}" id="pageLink${i}" title="หน้า ${i}" >${i}</a></li>
                                        </c:forEach>
                                        <li id="nextPageClass">
                                            <a id="nextPage" href="javascript:void(0)" aria-label="Next" title="ถัดไป">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </c:if>
                            </nav>
                        </div>
                    </c:if>

                    <div class="col-md-4 col-md-offset-4 text-center">
                        <input type="button" id="subValidate" class="btn btn-primary"
                               value="&nbsp;&nbsp;อนุมัติ&nbsp;&nbsp;"/>&nbsp;&nbsp;
                            <%--<input type="button" id="disValidate" class="btn btn-danger" value="ไม่อนุมัติ"/>--%>
                        <button id="disValidate" type="button" class="btn btn-danger" data-toggle="modal" data-target="">
                            ไม่อนุมัติ
                        </button>
                            <%--<a href="/TDCS/sentmail" >sentmail</a>--%>
                    </div>

                </c:if>

                <c:if test="${countUserValidate == 0}">
                    <div class="container alert-info text-center jumbotron">
                        <h1 class="h1">ไม่มีนักศึกษารอการอนุมัติ</h1>
                    </div>
                </c:if>
            </c:if>

            <c:if test="${notPage == 1}">
                <div class="container alert-info text-center jumbotron">
                    <h1 class="h1">ไม่พบข้อมูลในหน้านี้</h1>
                </div>
            </c:if>

        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h3 class="modal-title" id="myModalLabel">ระบุเหตุผลที่ไม่อนุมัติ</h3>
            </div>
            <div class="modal-body">
                <textarea id="message" style="width: 100%;height: 150px;"></textarea>
            </div>
            <div class="modal-footer">
                <button id="sendEmail" type="button" class="btn btn-primary">ส่งอีเมล</button>
                <%--<button type="button" class="btn btn-default" data-dismiss="modal">ปิด</button>--%>
            </div>
        </div>
    </div>
</div>

<script>
    var currentPage = '${currentPage}';
    var maxPage = '${pageCount}';
</script>