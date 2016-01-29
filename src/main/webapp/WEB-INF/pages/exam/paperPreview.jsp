<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/16/2015
  Time: 10:18 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>

<h2 align="center">รายละเอียดชุดข้อสอบ</h2>
<br>

<div class="row">
    <div class="col-md-12">
        <div class="col-md-3" align="right"><h3>ชื่อชุดข้อสอบ : </h3></div>
        <div id="paperName" class="col-md-9">

        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="col-md-3" align="right"><h3>คะแนนเต็ม : </h3></div>
        <div class="paperMaxScore" class="col-md-2">

        </div>

        <div class="col-md-3 col-md-offset-2" align="right"><h3>ตำแหน่ง : </h3></div>
        <div id="forPosition" class="col-md-2">

        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="col-md-3" align="right"><h3>สร้างโดย : </h3></div>
        <div class="createBy" class="col-md-2">

        </div>

        <div class="col-md-3 col-md-offset-2" align="right"><h3>สร้างเมื่อ : </h3></div>
        <div id="createDate" class="col-md-2">

        </div>
    </div>
</div>

<hr>

<h2 align="center">โจทย์</h2><br>

<table class="table table-bordered">
    <thead>
    <tr>
        <th>คำถาม</th>
        <th>ประเภทคำถาม</th>
        <th>หมวดหมู่</th>
        <th>เรื่อง</th>
        <th>ระดับความยาก</th>
        <th>คะแนน</th>
        <th>สร้างโดย</th>
    </tr>
    </thead>

    <!-------------------------------------------------------------------------------------------------------------------------------->



</table>
<br>

<div class="row">
    <div class="col-md-2 col-md-offset-3">
        <button class="btn btn-warning" style="width: 100px;">แก้ไข</button>
    </div>
    <div class="col-md-2">
        <button class="btn btn-info" style="width: 125px">เผยแพร่ข้อสอบ</button>
    </div>
    <div class="col-md-2">
        <button class="btn btn-gray" style="width: 100px;">ย้อนกลับ</button>
    </div>
</div>