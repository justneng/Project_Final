<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/29/2015
  Time: 9:12 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <h3>ผลการทำข้อสอบ ชุด aaaaaaaa</h3>
</div>
<hr>
<div class="row">
    <div class="col-md-2" align="right"><h5>ชื่อผู้ทำ : </h5></div>
    <div class="col-md-3">
        <input class="form-control" type="text">
    </div>
</div>
<br>

<div class="row">

    <div class="col-md-2 col-md-offset-5" align="right"><h5>จัดเรียงตาม</h5></div>
    <div class="col-md-2">
        <select class="form-control " >
            <option>รหัสพนักงาน</option>
            <option>ชื่อ</option>
            <option>ทีม</option>
            <option>ตำแหน่ง</option>
            <option selected>วันที่ส่งข้อสอบ</option>
            <option>ผู้ตรวจ</option>
        </select>
    </div>


    <div class="col-md-3 checkbox" align="right">
        <label>
            <input type="checkbox"> แสดงผลสอบที่ตรวจแล้ว
        </label>
    </div>
</div>
<hr>

<h3 align="center">ผลสอบ</h3>

<table class="table table-striped">
    <thead>
    <tr>
        <th>รหัสพนักงาน</th>
        <th>ชื่อ</th>
        <th>ทีม</th>
        <th>ตำแหน่ง</th>
        <th>วันที่ส่งข้อสอบ</th>
        <th>คะแนนปรนัย</th>
        <th>คะแนนอัตนัย</th>
        <th>ตรวจโดย</th>
        <th>จัดการ</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>รหัสพนักงาน</td>
        <td>ชื่อ</td>
        <td>ทีม</td>
        <td>ตำแหน่ง</td>
        <td>วันที่ส่งข้อสอบ</td>
        <td>คะแนนปรนัย</td>
        <td>คะแนนอัตนัย</td>
        <td>ตรวจโดย</td>
        <td>
            <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a href="#">ตรวจ</a></li>
                    <%--<li><a href="#"></a></li>--%>
                </ul>
            </div>
        </td>
    </tr> <tr>
        <td>รหัสพนักงาน</td>
        <td>ชื่อ</td>
        <td>ทีม</td>
        <td>ตำแหน่ง</td>
        <td>วันที่ส่งข้อสอบ</td>
        <td>คะแนนปรนัย</td>
        <td>คะแนนอัตนัย</td>
        <td>ตรวจโดย</td>
        <td>
            <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a href="#">ตรวจ</a></li>
                    <%--<li><a href="#"></a></li>--%>
                </ul>
            </div>
        </td>
    </tr> <tr>
        <td>รหัสพนักงาน</td>
        <td>ชื่อ</td>
        <td>ทีม</td>
        <td>ตำแหน่ง</td>
        <td>วันที่ส่งข้อสอบ</td>
        <td>คะแนนปรนัย</td>
        <td>คะแนนอัตนัย</td>
        <td>ตรวจโดย</td>
        <td>
            <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a href="#">ตรวจ</a></li>
                    <%--<li><a href="#"></a></li>--%>
                </ul>
            </div>
        </td>
    </tr> <tr>
        <td>รหัสพนักงาน</td>
        <td>ชื่อ</td>
        <td>ทีม</td>
        <td>ตำแหน่ง</td>
        <td>วันที่ส่งข้อสอบ</td>
        <td>คะแนนปรนัย</td>
        <td>คะแนนอัตนัย</td>
        <td>ตรวจโดย</td>
        <td>
            <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a href="#">ตรวจ</a></li>
                    <%--<li><a href="#"></a></li>--%>
                </ul>
            </div>
        </td>
    </tr>
    </tbody>

</table>
