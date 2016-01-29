<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 8/18/2015
  Time: 2:17 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<div class="modal fade" id="questionDetailModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h3>ข้อมูลข้อสอบ</h3>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-2 text-right">วิชา :</div>
                    <span class="col-md-2" id="categoryDetail"></span>

                    <div class="col-md-2 text-right">หัวข้อเรื่อง :</div>
                    <span class="col-md-4" id="subCategoryDetail"></span>
                </div>
                <br>

                <div class="row">
                    <div class="col-md-2 text-right">สร้างโดย :</div>
                    <span class="col-md-2" id="createByDetail"></span>

                    <div class="col-md-2 text-right">วันที่สร้าง :</div>
                    <span class="col-md-2" id="createDateDetail"></span>

                    <div class="col-md-2 text-right">อัพเดทล่าสุด :</div>
                    <span class="col-md-2" id="updateDetail"></span>
                </div>
                <br>

                <div class="row">
                    <div class="col-md-2 text-right">ประเภท :</div>
                    <span class="col-md-2" id="questionTypeDetail"></span>

                    <div class="col-md-2 text-right">ความยาก :</div>
                    <span class="col-md-2" id="difficultyDetail"></span>

                    <div class="col-md-2 text-right">คะแนน :</div>
                    <span class="col-md-2" id="scoreDetail"></span>
                </div>
                <br>

                <div class="row">
                    <div class="col-md-2 text-right">คำถาม :</div>
                    <span class="col-md-8" id="questionDescDetail"></span>
                </div>

            </div>
            <div class="modal-footer">
                <div id="choiceDetailContainer">
                    <div class="row">
                        <div class="col-md-1 col-md-offset-1"><span class="glyphicon glyphicon-ok text-success hidden correction"></span></div>
                        <div class="col-md-8 text-left" id="choiceDetail1"></div>
                        <div class="col-md-1 " id="correctDetail1"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92)"></span></div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-1 col-md-offset-1"><span class="glyphicon glyphicon-ok text-success hidden correction"></span></div>
                        <div class="col-md-8 text-left" id="choiceDetail2"></div>
                        <div class="col-md-1 " id="correctDetail2"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92)"></span></div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-1 col-md-offset-1"><span class="glyphicon glyphicon-ok text-success hidden correction"></span></div>
                        <div class="col-md-8 text-left" id="choiceDetail3"></div>
                        <div class="col-md-1 " id="correctDetail3"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92)"></span></div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col-md-1 col-md-offset-1"><span class="glyphicon glyphicon-ok text-success hidden correction"></span></div>
                        <div class="col-md-8 text-left" id="choiceDetail4"></div>
                        <div class="col-md-1 " id="correctDetail4"><span class="glyphicon glyphicon-ok "
                                                                         style="color:rgb(92, 184, 92)"></span></div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-2 col-md-offset-4">
                        <button class="btn btn-primary btn-block detailEditBtn" id="detailEditBtn">แก้ไข</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-block" data-dismiss="modal">ปิด</button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- /.modal-content -->
</div>

<script src="${context}/resources/js/pageScript/exam/questionDetailModal.js" charset="UTF-8"></script>

