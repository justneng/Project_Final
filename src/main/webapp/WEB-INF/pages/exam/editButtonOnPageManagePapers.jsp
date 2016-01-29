<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 21/7/2558
  Time: 16:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container row">
  <h3 class="h3">แก้ไขชุดข้อสอบ</h3>
</div>
  <hr/>
<div class = "container">
  <div class = "row">
    <div class = "col-md-5 col-md-offset-1">
      <form class = "form-inline">
        <div class = "for-group">
          <label for = "paperName">ชื่อชุดข้อสอบ</label>
          <input id = "paperName" class = "form-control" type = "text" size="40%" placeholder = "แบบทดสอบวัดความรู้ก่อนการอบรม"/>
        </div>
      </form>
    </div>
    <div class = "col-md-6">
      <form class = "form-inline">
        <div class = "form-group">
          <label for = "position">ตำแหน่ง</label>
          <select id = "position" class = "form-control">
            <option>Developer</option>
            <option>ABA</option>
          </select>
        </div>
      </form>
    </div>
  </div>
  <br/>
  <div class = "row">
    <div class = "col-md-5 col-md-offset-1">
      <form class = "form-inline">
        <div class = "for-group">
          <label for = "maxScore">คะแนนเต็ม&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input id = "maxScore" class = "form-control" type = "text" size="10%" placeholder = "50"/>
        </div>
      </form>
    </div>
    <div class = "col-md-6">
      <form class = "form-inline">
        <div class = "form-group">
          <input id = "propotionalScore" class = "form-control" type = "checkbox"/>
          <label for = "propotionalScore">คะแนนตามสัดส่วน</label>
        </div>
      </form>
    </div>
  </div>
  <hr/>
  <div class = "row">
    <div class = "col-md-12">
      <h4 align = "center">เลือกข้อสอบ</h4>
    </div>
  </div>
  <div class = "row">
    <div class = "col-md-12">
      <table class = "table table-bordered">
        <thead style = "background-color: #003399; color: white">
          <tr>
            <th style = "text-align: center;">เลือก</th>
            <th style = "text-align: center;">หมวดหมู่หลัก</th>
            <th style = "text-align: center;">หมวดหมู่ย่อย</th>
            <th style = "text-align: center;">คำถาม</th>
            <th style = "text-align: center;">ระดับความยาก</th>
            <th style = "text-align: center;">คะแนน</th>
            <th style = "text-align: center;">ผู้สร้าง</th>
            <th style = "text-align: center;">ลบข้อสอบ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input class = "form-control" type = "checkbox"/></td>
            <td>JAVA</td>
            <td>OOP</td>
            <td>What color do you like?</td>
            <td>Hard</td>
            <td>2</td>
            <td>EmployeeA</td>
            <td style = "text-align: center;"><button class = "btn btn-danger"><span class = "glyphicon glyphicon-trash"></span></button></td>
          </tr>
          <tr>
            <td><input class = "form-control" type = "checkbox"/></td>
            <td>JAVA</td>
            <td>OOP</td>
            <td>What color do you like?</td>
            <td>Hard</td>
            <td>2</td>
            <td>EmployeeA</td>
            <td style = "text-align: center;"><button class = "btn btn-danger"><span class = "glyphicon glyphicon-trash"></span></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class = "row">
    <div class = "col-md-12" align = "right">
      <button class = "btn btn-info"><span class = "glyphicon glyphicon-plus"></span></button>
    </div>
  </div>
  <div class = "row">
    <div class = "col-md-12" align = "center">
      <button class = "btn btn-success" type = "button">ยืนยันการแก้ไข</button>
      <button class = "btn btn-gray" type = "button">คืนค่า</button>
    </div>
  </div>
</div>
