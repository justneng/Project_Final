<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/pages/exam/template/selectCategoryInputRandom.jsp" %>

<style>
    #rand-easy-label, #rand-normal-label, #rand-hard-label, #rand-subcategory, #rand-category{
        padding: 0;
        top: 3px;
    }

    #randEasy, #randHard, #randNormal{

    }
</style>

<div class="container-fluid">
    <div class="row">
        <div class="form-group col-sm-6">
            <label id="rand-easy-label" class="col-sm-offset-2 col-sm-2 col-xm-2 col-lg-2 control-label text-right">ระดับง่าย</label>
            <div class="col-sm-4">
                <input id="randEasy" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
            </div>

            <div class="col-sm-4">
                <h5><span id="easy-remaining" class="label label-success"></span></h5>
            </div>
        </div>

        <div class="form-group col-sm-offset-1 col-sm-5">
            <label class="checkbox-inline"><input id="check-only-easy" type="checkbox" value="">เลือกเฉพาะระดับง่าย</label>
        </div>
    </div>

    <div class="row">
        <div class="form-group col-sm-6">
            <label id="rand-normal-label" class="col-sm-4 col-xm-4 col-lg-4 control-label text-right">ระดับปานกลาง</label>
            <div class="col-sm-4">
                <input id="randNormal" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
            </div>

            <div class="col-sm-4">
                <h5><span id="normal-remaining" class="label label-success"></span></h5>
            </div>
        </div>

        <div class="form-group col-sm-offset-1 col-sm-5">
            <label class="checkbox-inline"><input id="check-only-normal" type="checkbox" value="">เลือกเฉพาะระดับปานกลาง</label>
        </div>
    </div>

    <div class="row">
        <div class="form-group col-sm-6">
            <label id="rand-hard-label" class="col-sm-offset-2 col-sm-2 col-xm-2 col-lg-2 control-label text-right">ระดับยาก</label>
            <div class="col-sm-4">
                <input id="randHard" type="number" class="form-control input-sm" min="0" step="1" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
            </div>

            <div class="col-sm-4">
                <h5><span id="hard-remaining" class="label label-success"></span></h5>
            </div>
        </div>

        <div class="form-group col-sm-offset-1 col-sm-5">
            <label class="checkbox-inline"><input id="check-only-hard" type="checkbox" value="">เลือกเฉพาะระดับยาก</label>
        </div>
    </div>

    <div id="random-question-alert" class="row alert alert-info text-center" hidden>
        <strong>เพิ่มข้อสอบเรียบร้อยแล้ว</strong>
    </div>

    <div class="row text-center">
        <button id="randBtn" class="btn btn-primary btn-sm" type="button" data-dismiss = "modal">สุ่มผลลัพธ์</button>
        <button id="randResetBtn" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
    </div>
</div>

