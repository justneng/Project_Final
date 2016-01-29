<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 27/7/2558
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>

<script>
    var context = '${context}';
</script>

<link rel="stylesheet" href="<c:url value="/resources/css/exam/searchTemplate.css"/>"/>
<script src="${context}/resources/js/pageScript/exam/selectEmployee.js"></script>
<script src="${context}/resources/js/pageScript/exam/addCreateBy.js"></script>
<script src="${context}/resources/js/pageScript/exam/searchPaperTemplateNew.js"></script>

<div class="panel panel-default">
    <div class="panel-heading">ค้นหา</div>
    <div class="panel-body">
        <div class="row">
            <div class="form-group">
                <div class="col-sm-2 text-right">
                    <div class="col-sm-4">
                        <div class="row">
                            <button id="advanceBtn" class="btn btn-default btn-sm" data-toggle="collapse"
                                    data-target="#paper-advance-search-panel" type="button"><span
                                    class="glyphicon glyphicon-triangle-bottom"></span></button>
                        </div>
                    </div>
                    <label for="paperCodeSearch">รหัสชุดข้อสอบ</label>
                </div>

                <div class="col-sm-3">
                    <input id="paperCodeSearch" type="text" class="form-control input-sm" maxlength="5"
                           placeholder="รหัสชุดข้อสอบ" size="30"/>
                </div>

                <div class="col-sm-2 text-right">
                    <label for="paperName" class="control-label">ชื่อชุดข้อสอบ</label>
                </div>

                <div class="col-sm-3">
                    <input id="paperName" type="text" class="form-control input-sm" placeholder="ชื่อชุดข้อสอบ"
                           size="75"/>
                </div>

                <div id="btnSearch" class="col-sm-2">
                    <button id="searchPaper" class="btn btn-primary btn-sm" type="button">ค้นหา&nbsp;<span
                            class="glyphicon glyphicon-search"></span></button>
                    <button id="resetSearchPaper" class="btn btn-gray btn-sm" type="button">ล้างข้อมูล</button>
                </div>
            </div>
        </div>

        <div id="paper-advance-search-panel" class="collapse">
            <%@include file="selectCreateByInput.jsp" %>
            <div class="row">
                <div class="form-group">
                    <div class="col-sm-2 text-right">
                        <label for="searchCreateDateFromInput" class="control-label label-adv">วันที่สร้าง</label>
                    </div>

                    <div class="col-sm-3">
                        <div id="pStartTime" class="input-group date">
                            <input id="searchCreateDateFromInput" type="text" class="form-control input-sm datepicker"
                                   maxlength="10" data-date-format="dd/mm/yyyy"
                                   placeholder="  สร้างชุดข้อสอบตั้งแต่วันที่"/>
                        <span id="createDateFromBtn" class="input-group-addon"><span
                                class="glyphicon glyphicon-calendar" href="#"></span></span>
                        </div>
                    </div>

                    <div class="col-sm-offset-1 col-sm-1 text-right">
                        <label for="searchCreateDateToInput" class="control-label label-adv">ถึง</label>
                    </div>

                    <div class="col-sm-3">
                        <div id="pToTime" class="input-group date">
                            <input id="searchCreateDateToInput" type="text" class="form-control input-sm datepicker"
                                   maxlength="10" data-date-format="dd/mm/yyyy" placeholder="  ถึง"/>
                        <span id="createDateToBtn" class="input-group-addon"><span class="glyphicon glyphicon-calendar"
                                                                                   href="#"></span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="form-group">
                    <div class="col-sm-2 text-right">
                        <label class="control-label label-adv">คะแนน</label>
                    </div>

                    <div class="col-sm-3">
                        <input id="searchScoreFromInput" type="number" class="form-control input-sm"
                               oninput="validity.valid||(value='');" min="0" placeholder="คะแนนตั้งแต่"/>
                    </div>

                    <div class="col-sm-offset-1 col-sm-1 text-right">
                        <label for="searchScoreToInput" class="control-label label-adv">ถึง</label>
                    </div>

                    <div class="col-sm-3">
                        <input id="searchScoreToInput" type="number" class="form-control input-sm"
                               oninput="validity.valid||(value='');" min="0" placeholder="ถึง"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="form-group">
                    <div class="col-sm-2 text-right">
                        <label class="control-label label-adv">สถานะ</label>
                    </div>

                    <div class="col-sm-3">
                        <select id="searchPaperStatus" class="form-control input-sm">
                            <option value="0" selected>เลือกสถานะ</option>
                            <option value="1">เปิดใช้งาน</option>
                            <option value="2">ปิดใช้งาน</option>
                            <%--<option value="3" >ยังไม่เผยแพร่</option>--%>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="btnAdvanceSearch" class="panel-footer" hidden>
        <div class="row text-center">
            <button id="advPaperSearchBtn" class="btn btn-primary btn-sm" type="button">ค้นหา&nbsp;<span
                    class="glyphicon glyphicon-search"></span></button>
            <button id="advPaperResetBtn" class="btn btn-gray btn-sm" type="button">ล้างข้อมูล</button>
        </div>
    </div>
</div>

