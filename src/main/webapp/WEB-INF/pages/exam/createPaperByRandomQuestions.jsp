<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 11/4/2559
  Time: 12:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <h3 class="h3">แบบฟอร์มสร้างชุดข้อสอบแบบสุ่ม</h3>
    <hr>
</div><br/><br/>

<div class="row">
    <%--<div class="well">--%>
    <form class="form-horizontal" role="form">
        <div class="row">
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                    <span style="color:red;">*</span><label for="newPaperId" class="label-control"><h5
                        style="margin-top: 5px">รหัสชุดข้อสอบ</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <input id="newPaperId" class="form-control input-sm" type="search" maxlength="5"
                           placeholder="โปรดกรอกรหัสชุดข้อสอบ"
                           required/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="label-create-paper label-create-paper col-sm-4 text-right">
                    <label for="newPaperName" class="label-control"><h5 style="margin-top: 5px">
                        ชื่อชุดข้อสอบ</h5>
                    </label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <input id="newPaperName" class="form-control input-sm" type="text"
                           placeholder="โปรดกรอกชื่อชุดข้อสอบ"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                    <span style="color:red;">*</span><label for="newPaperScore" class="label-control"><h5
                        style="margin-top: 5px">คะแนน</h5></label>
                </div>
                <div class="col-sm-4" style="padding: 0;">
                    <input id="newPaperScore" class="form-control input-sm" type="number" min="0"
                           oninput="validity.valid||(value='');" placeholder="โปรดกรอกคะแนน" required/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 text-right">
                    <span style="color:red;">*</span><label for="newPaperForPosition" class="label-control">
                    <h5
                            style="margin-top: 5px">ประเภทผู้สอบ</h5></label>
                </div>
                <div class="label-create-paper col-sm-7" style="padding: 0;">
                    <select id="newPaperForPosition" class="form-control input-sm">
                        <option active>โปรดเลือก</option>
                        <option value="0">ทั้งหมด</option>
                        <option value="1">Software Developer Trainee</option>
                        <option value="2">Assistant Business Analyst</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                    <span style="color:red;">*</span><label class="label-control"><h5
                        style="margin-top: 5px">
                    เวลา</h5></label>
                </div>
                <div class="col-sm-7" style="padding: 0;">
                    <div class="form-inline">
                        <input id="hours" class="form-control input-sm" type="number" style="width: 35%;"
                               max="60" min="0" placeholder="ชม." oninput="validity.valid||(value='');"
                               required/>
                        ชั่วโมง
                        <input id="minutes" class="form-control input-sm" type="number" style="width: 35%;"
                               max="60" min="0" placeholder="น." oninput="validity.valid||(value='');"
                               required/>
                        นาที
                    </div>
                </div>
            </div>
        </div>

    </form>
    <%--</div>--%>

    <div id="random-question" class="">
        <div class="row">
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                    <span class='label label-primary'>หมวดหมู่ / หัวข้อเรื่อง</span>
                </div>

                <%--<div class="col-sm-7" style="padding: 0;">--%>
                    <%--<input id="check-random-by-category" type="checkbox" data-toggle="collapse"--%>
                           <%--data-target="#random-by-category"/>--%>
                <%--</div>--%>
            </div>
        </div>
        <br/>

        <div id="random-by-category" class="row">
            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 col-sm-offset-1 text-right">
                    หมวดหมู่
                </div>

                <div class="col-sm-7" style="padding: 0;">
                    <div class="input-group">
                        <input type="text" class="form-control input-sm" name="cat"
                               id="selectCategoryToSelection"
                               placeholder="ค้นหาหมวดหมู่"
                               data-width="100%" autocomplete="off"/>
                <span class="input-group-addon input-group-sm input-sm" id="selectCat">
                    <i onclick="listcatSelectInput()" style="cursor: pointer; height: 20px;">
                        <span class="glyphicon glyphicon-search"></span></i>
                </span>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="label-create-paper col-sm-4 text-right">
                    หัวข้อเรื่อง
                </div>
                <div class="label-create-paper col-sm-7" style="padding: 0;">
                    <select id="selectSubCategoryToSelection" class="form-control input-sm"
                            data-width="100%"></select>
                </div>
            </div>
        </div>
        <br/>

        <div class="row">
            <div class="col-sm-6">
                <div class="col-sm-4 col-sm-offset-1 text-right">
                    <spna class="label label-primary">กำหนดจำนวนข้อ</spna>
                </div>

                <%--<div class="col-sm-7" style="padding: 0;">--%>
                    <%--<input type="checkbox" data-toggle="collapse" data-target="#random-by-question"/>--%>
                <%--</div>--%>
            </div>
        </div>
        <br/>

        <div id="random-by-question">
            <div class="row form-group">
                <div class="col-sm-6">
                    <div class="col-sm-4 col-sm-offset-1 text-right">
                        ระดับง่าย
                    </div>

                    <div class="col-sm-4" style="padding: 0;">
                        <input type="number" class="form-control input-sm" min="0" step="1"
                               oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-sm-6">
                    <div class="col-sm-4 col-sm-offset-1 text-right">
                        ระดับปานกลาง
                    </div>

                    <div class="col-sm-4" style="padding: 0;">
                        <input type="number" class="form-control input-sm" min="0" step="1"
                               oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-sm-6">
                    <div class="col-sm-4 col-sm-offset-1 text-right">
                        ระดับยาก
                    </div>

                    <div class="col-sm-4" style="padding: 0;">
                        <input type="number" class="form-control input-sm" min="0" step="1"
                               oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row col-sm-12 text-right">
    <button id="createPaperBtn" class="btn btn-primary btn-sm" type="button">
        <span class="glyphicon glyphicon-saved"></span>&nbsp;
        บันทึก
    </button>

    <button class="btn btn-primary btn-sm createQuestionBtn" data-target="#createQuest" data-toggle="modal">
        <span class="glyphicon glyphicon-plus"></span>&nbsp;
        สร้างข้อสอบใหม่
    </button>

    <%--<a href="${context}/TDCS/exam/managePapers">--%>
    <%--<button id="cancelCreatePaperBtn" class="btn btn-gray btn-sm" type="button">--%>
    <%--<span class="glyphicon glyphicon-circle-arrow-left"></span> &nbsp;--%>
    <%--ย้อนกลับ--%>
    <%--</button>--%>
    <%--</a>--%>
</div>

<div class="row">
    <button id="removeRowQuestionSelect" class="btn btn-gray btn-sm" type="button"
            style="height: 30px; display: none;">
        <span class="glyphicon glyphicon-remove-sign"></span>
        &nbsp;เอาออก
    </button>

    <table id="tbSelectedQuestionToPaper" class="table table-bordered table-hover" style="display: none;">
        <thead class="bg-default small">
        <tr>
            <th style="text-align: center ;">
                <input class="checkAllQuestionFromCreatePaperPage" type="checkbox">
            </th>
            <th style="text-align: center ;" width="20%">
                <label value="category"><strong>หมวดหมู่</strong></label>
            </th>
            <th style="text-align: center ;" width="20%">
                <label value="subcategory"><strong>หัวข้อเรื่อง</strong></label>
            </th>
            <th style="text-align: center ;" width="35%">
                <label value="description"><strong>คำถาม</strong></label>
            </th>
            <th style="text-align: center ;">
                <label value="type"><strong>ประเภท</strong></label>
            </th>
            <th style="text-align: center ;">
                <label value="level"><strong>ระดับ</strong></label>
            </th>
            <th style="text-align: center ;">
                <label value="score"><strong>คะแนน</strong></label>
            </th>
        </tr>
        </thead>
        <tbody id="tbodySelectedQuestionToPaper">

        </tbody>
    </table>
</div>
<br/>

<div id="sum-score" class="form-inline text-right" hidden>
    <div class="form-group">
        คะแนน
        <input class="form-control input-sm" readonly="true" size="4" name="score" id="score"
               style="text-align: center">
    </div>
    &nbsp;

    <div class="form-group">
        เต็ม
        <input class="form-control input-sm" readonly="true" size="4" name="score" id="maxScore"
               style="text-align: center">
    </div>
</div>