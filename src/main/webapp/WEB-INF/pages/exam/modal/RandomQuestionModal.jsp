<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!-- Modal -->
<div class="modal fade" id="randomQuestionModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body" width="100%">
                <button type="button" class="close"aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <div class="container">
                    <div class="row">
                        <h4>สุ่มข้อสอบ</h4>
                        <hr>
                    </div>
                    <div class="row">
                        <%@include file="/WEB-INF/pages/exam/template/selectCategoryInputRandom.jsp" %>
                    </div>
                    <div id="amountPerDifficulty" class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-1 text-right" style="padding: 0;">
                                <h5 style="margin-top: 5px;">ระดับ :</h5>
                            </div>
                            <div class="col-sm-1 text-right">
                                <label style="margin-top: 3px;">ง่าย</label>
                            </div>
                            <div class="col-sm-2" style="padding: 0;">
                                <input id="randEasy" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                            </div>
                            <div class="col-sm-4">
                                <div class="col-sm-4 text-right">
                                    <label style="margin-top: 3px;">ปานกลาง</label>
                                </div>
                                <div class="col-sm-7" style="padding: 0;">
                                    <input id="randNormal" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');"
                                           placeholder="จำนวนข้อ"/>
                                </div>
                            </div>
                            <div class="col-sm-1 text-right">
                                <label style="margin-top: 3px;">ยาก</label>
                            </div>
                            <div class="col-sm-2" style="padding: 0;">
                                <input id="randHard" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <hr/>
                            <button id="randBtn" class="btn btn-primary btn-sm" type="button" data-dismiss = "modal">สุ่มผลลัพธ์</button>
                            <button id="randResetBtn" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
