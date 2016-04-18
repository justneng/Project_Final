<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 27/7/2558
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>

<%@include file="../modal/addEmployeeToInputModal.jsp" %>

<style>
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;

        /* Non-prefixed version, currently
                               not supported by any browser */
    }

    .glyphicon-triangle-bottom, .glyphicon-triangle-top{
        font-size: 1px;
        cursor: pointer;
        color: #777777;
    }

    .panel-heading{
        height: 35px;
    }

    #advanceBtn{
        background-color: #f5f5f5;
        border: hidden;
    }

    @media (max-width: 768px) {
        [where='search-question']{
            text-align:left;
            padding-left: 15px;
            padding-right: 15px;;
        }
    }

    label[for='addEmpCreateByBtn']{
        font-weight: normal;
    }

    label[for='searchQuestionDescInput'], label[for='searchCreateDateFromInput']
    , label[for="searchCreateDateFromInput"], label[for="searchCreateDateToInput"]
    , label[for="searchScoreFromInput"], label[for="searchScoreToInput"]{
        margin-top: 3px;
    }

    .show-employee-selected{
        padding-top: 0;
        padding-right: 0;
        padding-left: 0;
        margin-bottom: 12px;
        margin-top: 10px;
    }

    .label-create-by{
        margin-top: 15px;
    }

    #buttons-search{
        padding-left: 4px;
    }

    .panel-default{
        padding: 0;
    }

    .label-create-by{
        bottom: 3px;
    }

</style>

<div id="searchPanel" class="panel panel-default ">
    <div class="panel-heading">
        <label><strong>ค้นหา</strong></label>
        <button id="advanceBtn" class="btn btn-default btn-sm" data-toggle="collapse"
                data-target="#question-advance-search-panel" type="button">
            <span class="glyphicon glyphicon-chevron-down"></span>
        </button>
    </div>

    <div class="panel-body">
        <div class="row" where="search-question">
            <div class="form-group">
                <%@include file="selectCategoryInput.jsp" %>
                <div id="buttons-search" class="col-sm-2">
                    <button id="generalSearchButtonInModalSelectionQuestion" class="btn btn-primary btn-sm searchSubmitBtn" type="button">
                        <span class="glyphicon glyphicon-search"></span>
                        ค้นหา
                    </button>
                    <button id="resetInputSearchQuestion" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
                </div>
            </div>
        </div>

        <div id="question-advance-search-panel" class="collapse" >
            <div class="row" where="search-question">
                <div class="form-group">
                    <label class="control-label col-sm-2 col-xm-2 col-lg-2 text-right label-create-by" for="addEmpCreateByBtn">สร้างโดย</label>
                    <div class="col-sm-9 col-xm-9 col-lg-9 show-employee-selected">
                        <button id="addEmpCreateByBtn" data-toggle="modal" data-target="#modalSearchByEmployeeName" class=" btn btn-primary btn-sm" ><span class="glyphicon glyphicon-user"></span></button>
                        <div id="showEmployeeSelected" class="">

                        </div>
                    </div>
                </div>
            </div>

            <div class="row" where="search-question">
                <div class="form-group">
                    <div class="col-sm-2 col-xm-2 col-lg-2 text-right">
                        <label class="control-label" for="searchQuestionDescInput" >คำถาม</label>
                    </div>

                    <div class="col-sm-8 col-xm-8 col-lg-8 form-group" style="padding: 0;">
                        <input id="searchQuestionDescInput" type="text" class="form-control input-sm" placeholder="ค้นหาคำถาม"/>
                    </div>
                </div>
            </div>

            <div class="row" where="search-question">
                <div class="form-group">
                    <div class="col-sm-2 text-right">
                        <label for="searchCreateDateFromInput" class="control-label">วันที่สร้าง</label>
                    </div>

                    <div class="col-md-3 form-group" style="padding: 0;">
                        <div class="input-group">
                            <input id="searchCreateDateFromInput" type="text" class="form-control input-sm datepicker" maxlength="10" data-date-format="dd/mm/yyyy" placeholder="  สร้างข้อสอบตั้งแต่วันที่"/>
                            <span class="input-group-addon btn" id="calendarBtnFrom"><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                        </div>
                    </div>

                    <div class="col-sm-offset-1 col-sm-1 text-right">
                        <label for="searchCreateDateToInput">ถึง</label>
                    </div>

                    <div class="col-md-3 form-group" style="padding: 0;">
                        <div class="input-group">
                            <input id="searchCreateDateToInput" type="text" class="form-control input-sm datepicker" maxlength="10" data-date-format="dd/mm/yyyy" placeholder="  ถึง"/>
                            <span class="input-group-addon btn" id="calendarBtnTo" ><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                        </div>
                    </div>
                </div>
            </div>

            <%--<div class="row" where="search-question">--%>
                <%--<div class="form-group">--%>
                    <%--<div class="col-sm-2 col-xm-2 col-lg-2 text-right">--%>
                        <%--<label for="searchScoreFromInput">คะแนน</label>--%>
                    <%--</div>--%>

                    <%--<div class="col-md-3 col-xm-3 col-lg-3 form-group" style="padding: 0;">--%>
                        <%--<input id="searchScoreFromInput" class="form-control input-sm" placeholder="ตั้งแต่"--%>
                               <%--min=0 oninput="validity.valid||(value='');" type="number" step="0.1"/>--%>
                    <%--</div>--%>

                    <%--<div class="col-sm-1 col-xm-1 col-lg-1 col-sm-offset-1 text-right">--%>
                        <%--<label for="searchScoreToInput">ถึง</label>--%>
                    <%--</div>--%>

                    <%--<div class="col-md-3 col-xm-3 col-lg-3 form-group" style="padding: 0;">--%>
                        <%--<input id="searchScoreToInput" class="form-control input-sm" placeholder="ถึง"--%>
                               <%--min=0 oninput="validity.valid||(value='');" type="number" step="0.1"/>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>

            <div class="row" where="search-question">
                <div class="form-group">
                    <div class="col-sm-2 col-xm-2 col-lg-2 text-right">
                        <label style="margin-top: 3px;">ง่าย</label>
                    </div>

                    <div class="col-sm-2 col-xm-2 col-lg-2" style="padding: 0;">
                        <input id="rEasy" type="number" class="form-control input-sm" min="0" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>

                    <div class="col-sm-1 col-xm-1 col-lg-1 text-right">
                        <label style="margin-top: 3px;">ปานกลาง</label>
                    </div>

                    <div class="col-sm-2 col-xm-2 col-lg-2" style="padding: 0;">
                        <input id="rNormal" type="number" class="form-control input-sm" min="0" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>

                    <div class="col-sm-1 col-xm-1 col-lg-1 text-right">
                        <label style="margin-top: 3px;">ยาก</label>
                    </div>

                    <div class="col-sm-2 col-xm-2 col-lg-2" style="padding: 0;">
                        <input id="rHard" type="number" class="form-control input-sm" min="0" oninput="validity.valid||(value='');" placeholder="จำนวนข้อ"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="buttons-adv-search" class="panel-footer" hidden>
        <div class="row text-center">
            <button id="advSearchBtn" class="btn btn-primary btn-sm" type="button"><span
                    class="glyphicon glyphicon-search"></span>&nbsp;ค้นหา</button>
            <button id="advResetBtn" class="btn btn-gray btn-sm" type="button">ล้างข้อมูล</button>
        </div>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/selectEmployee.js" ></script>
<script src="${context}/resources/js/pageScript/exam/selectCreateByInput.js"></script>
<script src="${context}/resources/js/pageScript/exam/searchQuestionTemplate.js" charset="UTF-8"></script>

<script>
    var context = '${context}';
    var showAdvSearchBtn = function(){}
    var hideAdvSearchBtn = function(){}
    var chevronDown = true;

    $(document).ready(function () {

        showAdvSearchBtn = function(){
            $('#buttons-search').hide();
            $('#buttons-adv-search').show();
        }

        hideAdvSearchBtn = function(){
            $('#buttons-search').show();
            $('#buttons-adv-search').hide();
        }

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
        });

        $("#searchCreateDateFromInput").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true
        });
        $("#searchCreateDateToInput").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true
        });
    });

//    $("#advanceBtn").on('click',function(){
//        var glyphicon = $(this).find('span')
//        if (chevronDown) {
//            console.log("hello")
//            glyphicon.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
////            $("#searchPanel").find("#buttons-search").hide()
////            $("#searchPanel").find('#buttons-adv-search').show()
////            $('#buttons-search').hide();
////            $('#buttons-adv-search').show();
//            showAdvSearchBtn()
//            chevronDown=false
//        }
//        else {
//            glyphicon.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
////            $("#searchPanel").find("#buttons-search").show()
////            $("#searchPanel").find('#buttons-adv-search').hide()
////            $('#buttons-search').show();
////            $('#buttons-adv-search').hide();
//            hideAdvSearchBtn()
//            chevronDown=true
//        }
//    });
</script>
