<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/24/2015
  Time: 1:40 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container row">
  <h3>ค้นหาชุดข้อสอบ</h3>
  <hr>
</div>
<div class="row">
  <div class="col-md-10 col-md-offset-1">
    <div class="panel panel-default">
      <div class="panel-heading"><h4>Search</h4></div>
      <div class="panel-body">
        <div class="row">
          <%@include file="selectCategoryInput.jsp" %>
        </div>
        <br>

        <div class="row">
          <%@include file="selectCeateByInput.jsp" %>

          <div class="col-md-4 col-md-offset-1" align="right">
            <button id="search" class="btn btn-gray">Search</button>
            <button id="clear" class="btn btn-gray">Clear</button>
          </div>

        </div>


      </div>

    </div>
  </div>
</div>
</div>

<div class="row">
  <div class="col-md-10 col-md-offset-1">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-3">
            <label><h4>More Search</h4></label>
          </div>
          <div class="col-md-1 col-md-offset-8">
            <button id="collapse" class="btn glyphicon glyphicon-arrow-down" data-toggle="collapse"
                    data-target="#moreSearch"></button>
          </div>
        </div>
      </div>

      <div class="panel-body collapse" id="moreSearch">
        <div class="row">
          <div class="col-md-2 col-md-offset-1" align="right">
            <h5>หมายเลขชุดข้อสอบ : </h5>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control"/>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-2 col-md-offset-1" align="right">
            <h5>ชื่อชุดข้อสอบ : </h5>
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control"/>
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-2 col-md-offset-1" align="right">
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

        <br>

        <div class="row">
          <div class="col-md-2 col-md-offset-1" align="right">
            <h5>คะแนนเต็ม : </h5>
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

        <br>

        <div class="row">
          <div class="col-md-2 col-md-offset-1" align="right">
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

        <div class="row">
          <div id="btn" class="col-md-4 col-md-offset-7" align="right">

          </div>
        </div>

      </div>
    </div>
  </div>
</div>


<script>
  $("#collapse").click(function () {
    var str = $("#search").prop('outerHTML') + "&nbsp" + $("#clear").prop('outerHTML');

    if ($("#collapse").hasClass("glyphicon-arrow-down")) {
      $("#collapse").removeClass("glyphicon-arrow-down").addClass("glyphicon-arrow-up");
      $("#btn").html(str);

      $("#search").hide();
      $("#clear").hide();
    } else {
      $("#collapse").removeClass("glyphicon-arrow-up").addClass("glyphicon-arrow-down");
      $("#search").show();
      $("#clear").show();
    }


  })

  $(".datepicker").datepicker();
</script>
<%@include file="../modal/addEmployeeToInputModal.jsp" %>

