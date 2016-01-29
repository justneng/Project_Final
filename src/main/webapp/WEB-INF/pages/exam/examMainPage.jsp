<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 9/7/2558
  Time: 9:05
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row">
    <div class=" col-md-4">
        <div class="panel panel-default">
            <%--edit change language ENG to THAI--%>
            <div class="panel-heading" style="background-color: lightgreen; font-size: x-large" id="create">สร้าง</div>
            <div class="panel-body ">
                <div class=" col-md-6 col-md-offset-3" align="center">
                    <div class="row">
                        <button data-toggle="modal" data-target="#createCat" class="btn btn-default" align="center"
                                style="background-color:lightgreen ;color: black ;width:85px;height:35px">หมวดหมู่
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <button data-toggle="modal" data-target="#createSub" class="btn btn-default"
                                class="btn btn-default" align="center"
                                style="background-color:lightgreen ;color: black;width:85px;height:35px">หัวข้อเรื่อง
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <button data-toggle="modal" data-target="#createQuest" class="btn btn-default"
                                style="background-color:lightgreen ;color: black ;width:85px;height:35px">ข้อสอบ
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/createPaper" class="btn btn-default"
                           style="background-color:lightgreen  ;color:black ;width:85px;height:35px">ชุดข้อสอบ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class=" col-md-4">
        <div class="panel panel-default">
            <div class="panel-heading" style="background-color: lightpink ;font-size: x-large">แก้ไข</div>
            <div class="panel-body">
                <div class="col-md-6 col-md-offset-3" align="center">
                    <div class="row">
                        <a href="${context}/TDCS/editCategories" class="btn btn-default"
                                style="background-color:lightpink ;color: black ;width:85px;height:35px">หมวดหมู่
                        </a>
                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/editQuestions" class="btn btn-default"
                                style="background-color:lightpink ;color: black ;width:85px;height:35px">ข้อสอบ
                        </a>
                    </div>
                    <br>

                    <%--<div class="row">
                        <button class="btn btn-default"
                                style="background-color:lightpink ;color: black ;width:85px;height:35px">ข้อสอบ
                        </button>
                    </div>
                    <br>--%>

                    <div class="row">
                        <a href="${context}/TDCS/editPapers" class="btn btn-default"
                           style="background-color:lightpink ;color: black ;width:85px;height:35px">ชุดข้อสอบ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class=" col-md-4">
        <div class="panel panel-default">
            <div class="panel-heading" style="background-color: lightblue ; font-size: x-large">จัดการ</div>
            <div class="panel-body">
                <div class="col-md-6 col-md-offset-3" align="center">
                    <div class="row">
                        <button class="btn btn-default"
                                style="background-color:lightblue ;color: black ;width:125px;height:35px">ตรวจข้อสอบ
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <button class="btn btn-default"
                                style="background-color:lightblue ;color: black;width:125px;height:35px"><label
                                style="align-content: center">เปิดให้ทำข้อสอบ</label></button>
                    </div>
                    <br>

                    <div class="row">
                        <button class="btn btn-default"
                                style="background-color:lightblue ;color: black ;width:125px;height:35px">ค้นหาข้อสอบ
                        </button>
                    </div>
                    <br>

                    <div class="row">
                        <a href="${context}/TDCS/searchPaper" class="btn btn-default"
                                style="background-color:lightblue ;color: black ;width:125px;height:35px">ค้นหาชุดข้อสอบ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<%--Modal--%>
<div class="modal fade" id="createCat">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h3 class="modal-title" align="center">สร้างหมวดหมู่</h3>
            </div>
            <div class="modal-body" style="height: 80px">
                <div class="row">
                    <div class="col-md-3">
                        <h4><label class="label label-success"
                                   style="background-color: lightgreen ; color: black ; font-weight: 100">ชื่อหมวดหมู่
                            :</label></h4>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="cat"/>
                    </div>
                    <button class="btn btn-primary" type="submit" data-dismiss="modal">ตกลง</button>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div class="modal fade" id="createSub">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h3 class="modal-title" align="center">สร้างหัวข้อเรื่อง</h3>
            </div>
            <div class="modal-body">
                <div class="row form-group">
                    <div class="col-md-4">
                        <h4><label class="label label-success"
                                   style="background-color: lightgreen ; color: black ; font-weight: 100">เลือก หมวดหมู่
                            :</label></h4>
                    </div>
                    <div class="input-group col-md-5">
                        <input type="text" class="form-control" name="cat" style="width: 245px"/>
                        <span class="input-group-addon" id="search"><a class="glyphicon glyphicon-search" href="#"></a></span>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-4">
                        <h4><label class="label label-success"
                                   style="background-color: lightgreen ; color: black ; font-weight: 100">ชื่อหัวข้อเรื่อง
                            :</label></h4>
                    </div>
                    <div class="col-md-6" style="padding-left: 0px">
                        <input type="text" class="form-control" name="subcat"/>
                    </div>
                    <button class="btn btn-primary" type="submit" data-dismiss="modal">ตกลง</button>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<%--<!--Create Question Modal-->--%>


<%--<div class="modal fade" id="createQuest">--%>
    <%--<div class="modal-dialog">--%>
        <%--<div class="modal-content">--%>
            <%--<div class="modal-header">--%>
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--%>
                <%--<h3 class="modal-title" align="center">สร้างคำถาม</h3>--%>
            <%--</div>--%>
            <%--<div class="modal-body" id="modalBody">--%>
                <%--<div class="row form-group">--%>
                    <%--<div class="col-md-4" align="right">--%>
                        <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">หมวดหมู่ :</label></h4>--%>
                    <%--</div>--%>
                    <%--<div class="input-group col-md-5">--%>
                        <%--<input type="text" class="form-control" name="cat"/>--%>
                        <%--<span class="input-group-addon" id="selectCat"><i class="glyphicon glyphicon-search"></i></span>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <%--<div class="row form-group">--%>
                    <%--<div class="col-md-4" align="right">--%>
                        <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ชื่อหัวข้อเรื่อง :</label></h4>--%>
                    <%--</div>--%>
                    <%--<div class="input-group col-md-5">--%>
                        <%--<input type="text" class="form-control" name="subcat" />--%>
                        <%--<span class="input-group-addon" id="selectSubCat"><i class="glyphicon glyphicon-search"></i></span>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="row form-group">--%>
                    <%--<div class="col-md-4" align="right">--%>
                        <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ประเภทข้อสอบ :</label></h4>--%>
                    <%--</div>--%>
                    <%--<div class="input-group col-md-5">--%>
                        <%--<select class="form-control" id="select-QuestionType">--%>
                            <%--<option disabled selected></option>--%>
                            <%--<option id="obj" value="Objective">ปรนัย</option>--%>
                            <%--<option id="sub" value="Subjective">อัตนัย</option>--%>
                        <%--</select>--%>
                    <%--</div>--%>
                    <%--<br>--%>
                    <%--<div class="modal-footer" id="question">--%>
                        <%--&lt;%&ndash; Start Objective&ndash;%&gt;--%>
                        <%--<div class="row form-group" id="objective" style="display: none">--%>
                            <%--<div class="col-md-4">--%>
                                <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ข้อสอบ :</label></h4>--%>
                            <%--</div>--%>
                            <%--<div class="col-md-5" style="padding: 0px">--%>
                                <%--<textarea class="form-control" style="resize: none"></textarea>--%>
                            <%--</div>--%>
                            <%--<div class="col-md-3" align="left">--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="hard">ยาก</label>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="normal">ปานกลาง</label>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="easy">ง่าย</label>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="row form-group" id="objective2" style="display: none">--%>
                            <%--<div class="col-md-5 col-md-offset-4" style="padding: 0px" align="left">--%>
                                <%--<div class="radio">--%>
                                    <%--<input type="radio" name="level"/>--%>
                                    <%--<input class="form-control" type="text" id="choiceA"/>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<input type="radio" name="level"/>--%>
                                    <%--<input class="form-control" type="text" id="choiceB"/>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<input type="radio" name="level"/>--%>
                                    <%--<input class="form-control" type="text" id="choiceC"/>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<input type="radio" name="level"/>--%>
                                    <%--<input class="form-control" type="text" id="choiceD"/>--%>
                                <%--</div>--%>
                                <%--<div class="btn col-md-offset-1">--%>
                                    <%--<button class="btn btn-primary">ตกลง</button>--%>
                                    <%--<button class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>--%>
                                <%--</div>--%>
                            <%--</div>--%>

                            <%--<div class="col-md-1 col-md-offset-1">--%>
                                <%--<div class="row form-group">--%>
                                    <%--<div>--%>
                                        <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">คะแนน</label></h4>--%>
                                        <%--<input type="text" class="form-control" name="score"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--&lt;%&ndash;End Objective&ndash;%&gt;--%>

                        <%--&lt;%&ndash;Start Subjective&ndash;%&gt;--%>
                        <%--<div class="row form-group" id="subjective" style="display: none">--%>
                            <%--<div class="col-md-4">--%>
                                <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ข้อสอบ :</label></h4>--%>
                            <%--</div>--%>
                            <%--<div class="col-md-5" style="padding: 0px">--%>
                                <%--<textarea class="form-control" style="resize: none"></textarea>--%>
                            <%--</div>--%>
                            <%--<div class="col-md-3" align="left">--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="hard">ยาก</label>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="normal">ปานกลาง</label>--%>
                                <%--</div>--%>
                                <%--<div class="radio">--%>
                                    <%--<label><input type="radio" name="level" value="easy">ง่าย</label>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div class="row form-group" id="subjective2" style="display: none">--%>
                            <%--<div class="col-md-5 col-md-offset-4" align="left">--%>
                                <%--<div class="row">--%>
                                    <%--<textarea class="form-control" style="resize: none"></textarea>--%>
                                <%--</div>--%>
                                <%--<br>--%>
                                <%--<div class="btn col-md-offset-1">--%>
                                    <%--<button class="btn btn-primary">ตกลง</button>--%>
                                    <%--<button class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="col-md-1 col-md-offset-1">--%>
                                <%--<div class="row form-group">--%>
                                    <%--<div>--%>
                                        <%--<h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">คะแนน</label></h4>--%>
                                        <%--<input type="text" class="form-control" name="score"/>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--&lt;%&ndash;End Subjective&ndash;%&gt;--%>

                    <%--</div><!--Modal footer-->--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div><!-- /.modal-content -->--%>
    <%--</div><!-- /.modal-dialog -->--%>
<%--</div><!-- /.modal -->--%>
<%--<!-- End Modal Create Question -->--%>


<%--<!-- End Create Question Modal -->--%>


<%--<script>--%>

    <%--$('#select-QuestionType').on('change',function(){--%>

        <%--if(this.value == 'Objective'){--%>
            <%--$('#objective').show();--%>
            <%--$('#objective2').show();--%>
            <%--$('#subjective').hide();--%>
            <%--$('#subjective2').hide();--%>
        <%--}--%>
        <%--else if(this.value == 'Subjective'){--%>
            <%--$('#subjective').show();--%>
            <%--$('#subjective2').show();--%>
            <%--$('#objective').hide();--%>
            <%--$('#objective2').hide();--%>
        <%--}--%>
    <%--})--%>

<%--</script>--%>
<%@include file="modal/createQuestionModal.jsp" %>
