<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<!--Create Question Modal-->


<div class="modal fade" id="createQuest">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" dat-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title" align="left" id="createQuestModalTitle">สร้างข้อสอบ</h3>
            </div>
            <div class="modal-body" id="modalBody">
                <div class="row form-group" id="categorySelectContainer">
                    <div class="col-md-4" align="right">
                        <h5><label style=" font-weight: 100"><span class="mandatory">*</span>หมวดหมู่ :</label></h5>
                    </div>
                    <div class="col-md-5">
                        <div class="input-group">
                            <input type="text" class="form-control" name="cat" id="categoryInputForCreateQuestion"
                                   autocomplete="off"/>
                            <span class="input-group-addon" id="selectCat">
                                <i class="glyphicon glyphicon-search" onclick="listcatCreateQues()"
                                   style="cursor: pointer; height: 20px;"></i>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-success btn-block form-control" id="createCategoryBtn"><span
                                class="glyphicon glyphicon-plus"></span></button>
                    </div>
                </div>

                <div class="row form-group hidden" id="categoryCreateContainer">
                    <div class="col-md-4" align="right">
                        <h5><label style=" font-weight: 100"><span class="mandatory">*</span>หมวดหมู่ :</label></h5>
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" maxlength="10" placeholder="รหัสหมวดหมู่"
                               id="createCategoryIdInput">
                    </div>
                    <div class=" col-md-3">
                        <input type="text" class="form-control" placeholder="ชื่อหมวดหมู่" id="createCategoryNameInput">
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-success btn-block form-control" id="createCategorySubmitBtn"><span
                                class="glyphicon glyphicon-ok"></span></button>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger btn-block form-control" id="createCategoryCancleBtn"><span
                                class="glyphicon glyphicon-remove"></span></button>
                    </div>

                </div>

                <div class="row form-group" id="subCategorySelectContainer">
                    <div class="col-md-4" align="right">
                        <h5><label style="font-weight: 100"><span class="mandatory">*</span>หัวข้อเรื่อง :</label></h5>
                    </div>
                    <div class="col-md-5">

                        <select id="sSubCat" class="form-control" data-width="100%">
                        </select>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-success btn-block form-control" id="createSubCategoryBtn"><span
                                class="glyphicon glyphicon-plus"></span></button>
                    </div>
                </div>

                <div class="row form-group hidden" id="subCategoryCreateContainer">
                    <div class="col-md-4" align="right">
                        <h5><label style="font-weight: 100"><span class="mandatory">*</span>หัวข้อเรื่อง :</label></h5>
                    </div>
                    <div class="col-md-5">
                        <input id="createSubCategoryNameInput" class="form-control" placeholder="ชื่อหัวข้อเรื่อง">
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-success btn-block form-control" id="createSubCategorySubmitBtn"><span
                                class="glyphicon glyphicon-ok"></span></button>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger btn-block form-control" id="createSubCategoryCancleBtn"><span
                                class="glyphicon glyphicon-remove "></span></button>
                    </div>

                </div>


                <div class="row form-group">
                    <div class="col-md-4" align="right">
                        <h5><label style="font-weight: 100"><span class="mandatory">*</span>ประเภทข้อสอบ :</label></h5>
                    </div>
                    <div class="col-md-5">
                        <select class="form-control" id="select-QuestionType">
                            <option disabled selected></option>
                            <option id="obj" value="Objective">ปรนัย</option>
                            <option id="sub" value="Subjective">อัตนัย</option>
                        </select>
                    </div>
                </div>

                <div class="modal-footer" id="question">

                    <div class="row form-group" id="questionContainer">
                        <div class="col-md-4">
                            <h5><label style="font-weight: 100"><span class="mandatory">*</span>คำถาม :</label></h5>
                        </div>
                        <div class="col-md-5" style="padding: 0px">
                            <textarea id="questionDescription" class="form-control" style="resize: vertical"
                                      maxlength="1200"></textarea>
                        </div>
                    </div>
                    <div class="row form-group form-inline text-left" id="difficultyContainer" style="padding: 0;">
                        <div class="col-md-4 text-right">
                            <h5><span class="mandatory">*</span>ระดับความยาก :</h5>
                        </div>
                        <div id="diffRadioContainer" class="col-md-3" align="left">
                            <div class="form-inline">
                                <label><input class="form-control" type="radio" name="level" value="3"
                                              style="box-shadow: none;"><h5 style="display: inline;">ยาก </h5>
                                </label>
                                <label style="margin-left: 10px;"><input class="form-control" type="radio"
                                                                         name="level" value="2"
                                                                         style="box-shadow: none;"><h5
                                        style="display: inline;">ปานกลาง </h5></label>
                                <label style="margin-left: 10px;"><input class="form-control" type="radio"
                                                                         name="level" value="1"
                                                                         style="box-shadow: none;"><h5
                                        style="display: inline;">ง่าย </h5></label>
                            </div>
                        </div>

                    </div>
                    <div class="row form-group">
                        <div class="col-md-4 text-right">
                            <h5><label style="font-weight: 100"><span class="mandatory">*</span>คะแนน :</label></h5>
                        </div>
                        <div class="col-md-2" style="padding: 0;">
                            <input class="form-control" type="number" min="0" step="0.01" max="999"
                                   oninput="validity.valid||(value='');" id="questionScoreForCreateQuestion"
                                   style="width: 100%">
                        </div>
                    </div>

                    <div class="row form-group" id="answerInput" style="display: none">
                        <div class="col-md-4 choiceLabelContainer">
                            <h5><span class="mandatory">*</span>ตัวเลือกคำตอบ</h5>
                        </div>
                        <div class="row">

                            <div class="col-md-8 col-md-offset-2" style="padding: 0px" align="left">
                                <div class="input-group">
                                    <input class="form-control choiceDesc" maxlength="300" type="text"
                                           id="choice1"/>
                                        <span class="input-group-addon choiceRadioAddon">
                                            <input class="correctRadio" type="radio" name="choiceRadio"
                                                   value="1"/>
                                            <div class=" glyphicon glyphicon-ok"></div>
                                    </span>
                                </div>

                                <br>

                                <div class="input-group">
                                    <input class="form-control choiceDesc" maxlength="300" type="text" id="choice2"/>
                                    <span class="input-group-addon choiceRadioAddon">
                                            <input class="correctRadio" type="radio" name="choiceRadio" value="2"/>
                                        <div class=" glyphicon glyphicon-ok"></div>
                                    </span>
                                </div>
                                <br>

                                <div class="input-group">
                                    <input class="form-control choiceDesc" maxlength="300" type="text" id="choice3"/>
                                        <span class="input-group-addon choiceRadioAddon">
                                            <input class="correctRadio" type="radio" name="choiceRadio" value="3"/>
                                            <div class=" glyphicon glyphicon-ok"></div>
                                    </span>
                                </div>

                                <br>

                                <div class="input-group">
                                    <input class="form-control choiceDesc" maxlength="300" type="text" id="choice4"/>
                                        <span class="input-group-addon choiceRadioAddon">
                                            <input class="correctRadio" type="radio" name="choiceRadio" value="4"/>
                                            <div class=" glyphicon glyphicon-ok "></div>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <%--End Objective--%>

                    <div class="col-md-12" id="submitBtnContainer" hidden align="center">
                        <div class="col-md-1 col-md-offset-5">
                            <button class="btn btn-primary" id="submitCreateBtn">บันทึก</button>
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-danger" dat-dismiss="modal">ยกเลิก</button>
                        </div>
                    </div>


                </div>
                <!--Modal footer-->
            </div>
        </div>
    </div>
    <!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->
<!-- /.modal -->
<%--</div>--%>
<!-- End Modal Create Question -->


<!-- End Create Question Modal -->

<script src="${context}/resources/js/pageScript/exam/createQuestionModal.js" charset="UTF-8"></script>

<style>
    .input-group-addon.success {
        color: rgb(255, 255, 255);
        background-color: rgb(92, 184, 92);
        border-color: rgb(76, 174, 76);
    }

    .input-group-addon.warning {
        color: rgb(255, 255, 255);
        background-color: rgb(240, 173, 78);
        border-color: rgb(238, 162, 54);
    }

    .typeahead {
        width: 100%;
    }

    .validate-fail {
        border: solid red 1px;
        /*border-color: red;*/
    }

    .mandatory {
        color: red;
    }

</style>