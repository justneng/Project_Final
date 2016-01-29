<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 27/7/2558
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="../modal/addEmployeeToInputModal.jsp" %>

<div class = "container">
  <div class = "row">
    <div class = "panel-collapse" id = "searchCollapse">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4>สุ่มข้อสอบ...</h4>
        </div>
        <div class="panel-body">
          <div class = "row">
            <div class = "col-md-2 text-right">
              <label>ชื่อชุดข้อสอบ</label>
            </div>
            <div class = "col-md-6">
              <input class = "form-control" type = "text"/>
            </div>
            <%--<div class = "col-md-2 text-right">--%>
              <%--<label>หมวดหมู่หลัก</label>--%>
            <%--</div>--%>
            <%--<div class = "col-md-3">--%>
              <%--<input class = "form-control" type = "text"/>--%>
            <%--</div>--%>
          </div>
          <br/>
          <div class = "row">
            <div class = "col-md-2 text-right">
              <label>ผู้สร้าง</label>
            </div>
            <div class = "col-md-6">
              <div class = "input-group">
                <input class = "form-control" type = "text"/>
                <div class = "input-group-btn">
                  <button class = "btn btn-primary" type = "button" data-toggle = "modal" data-target = "#modalSearchByEmployeeName">+</button>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <%--<div class="row">--%>
            <%--<div id="btnSearch" class="col-md-4 col-md-offset-7" align="center">--%>
            <%--</div>--%>
          <%--</div>--%>
          <div class = "row" id = "btnSearch">
            <div class = "col-md-12 text-center">
              <button class = "btn btn-default" type = "button">ค้นหา</button>
              <button class = "btn btn-default" type = "button">ล้างข้อมูล</button>
            </div>
          </div>
        </div>
        <div class = "panel-footer">
          <div class = "row">
            <div class = "col-md-3">
              <button class = "btn btn-primary" id = "advanceBtn"><span class = "glyphicon glyphicon-chevron-down">ค้นหาขั้นสูง</span></button>
          </div>
          </div>
          <div id = "advanceBody"  class = "collapse">
            <div class  = "row">
              <br/><br/>
              <div class = "col-md-2 text-right">
                <label>หมายเลขชุดข้อสอบ</label>
              </div>
              <div class = "col-md-3">
                <input class = "form-control" type = "text"/>
              </div>
            </div>
            <br/>
            <%--<div class="row">--%>
              <%--<div class="col-md-2 text-right">--%>
                <%--<label>คำถาม</label>--%>
              <%--</div>--%>
              <%--<div class="col-md-8">--%>
                <%--<input type="text" class="form-control"/>--%>
              <%--</div>--%>
            <%--</div>--%>
            <%--<br/>--%>
            <div class="row">
              <div class="col-md-2 text-right">
                <h5>วันที่สร้าง : </h5>
              </div>
              <div class="col-md-3">
                <div class="input-group">
                  <input type="text" class="form-control datepicker"/>
                  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                </div>
              </div>
              <div class="col-md-2" align="right">
                <h5>ถึง : </h5>
              </div>
              <div class="col-md-3">
                <div class="input-group">
                  <input type="text" class="form-control datepicker"/>
                  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-md-2 text-right">
                <h5>คะแนน : </h5>
              </div>
              <div class="col-md-3">
                <input type="text" class="form-control"/>
              </div>
              <div class="col-md-2" align="right">
                <h5>ถึง : </h5>
              </div>
              <div class="col-md-3">
                <input type="text" class="form-control"/>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-md-2 text-right">
                <h5>สถานะ : </h5>
              </div>
              <div class="col-md-3">
                <select class="form-control">
                  <option selected value="none"></option>
                  <option>ตรวจแล้ว</option>
                  <option>ยังไม่ตรวจ</option>
                </select>
              </div>
            </div>
            <br/>
            <hr/>
            <div class = "row" id = "btnAdvanceSearch">
              <div class = "col-md-12 text-center">
                <button class = "btn btn-default" type = "button">ค้นหา</button>
                <button class = "btn btn-default" type = "button">ล้างข้อมูล</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  $(document).ready(function(){
    $("#advanceBtn").click(function(){
      var str = $("#search").prop('outerHTML') + "&nbsp" + $("#clear").prop('outerHTML');
      $("#advanceBody").collapse('toggle');

//      if ($("#advanceBtn").hasClass("btn btn-primary")) {
//        $("#advanceBtn").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
//        $("#btnAdvanceSearch").html(str);
//
//        $("#btnSearch").hide();
//        $("#btnAdvanceSearch").show();
////        $("#clear").hide();
//      } else {
//        $("#advanceBtn").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
////        $("#search").show();
////        $("#clear").show();
//        $("#btnSearch").show();
//        $("#btnAdvanceSearch").hide();
//      }
      if($("#advanceBtn").children("span").hasClass("glyphicon glyphicon-chevron-down")){
        $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
//        $("btnAdvanceSearch").html(str);
        $("#btnSearch").hide();
        $("#btnAdvanceSearch").show();
//        $("#search").hide();
//        $("#clear").hide();
      }
      else{
        $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-up").addClass("glyphicon glyphicon-chevron-down");

        $("#btnSearch").show();
        $("#btnAdvanceSearch").hide();
//        $("#search").show();
//        $("#clear").show();
      }
    });
    $(".datepicker").datepicker();
  });
</script>
