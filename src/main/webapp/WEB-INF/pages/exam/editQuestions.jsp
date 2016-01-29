<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 15/7/2558
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
  var context = '${context}';
</script>
<%@include file="modal/addEmployeeToInputModal.jsp"%>
<%@include file="modal/createQuestionModal.jsp"%>
<div class="container row">
  <h3 class="h3">แก้ไขข้อสอบ</h3>
</div>
<hr/>
<div class = "container">
  <%@include file="template/searchQuesionTemplate.jsp"%>
  <br/>
  <br/>

<!-- Example table information, it will remove soon ^^ -->
    <div class = "row">
      <div class = "col-md-12" align = "center">
        <table class = "table table-striped">
          <thead>
            <tr>
              <th style = "text-align: center">หมายเลขข้อสอบ</th>
              <th style = "text-align: center">ข้อสอบ</th>
              <th style = "text-align: center">ชนิดข้อสอบ</th>
              <th style = "text-align: center">ระดับความยาก</th>
              <th style = "text-align: center">คะแนน</th>
              <th style = "text-align: center">หมวดหมู่หลัก</th>
              <th style = "text-align: center">หมวดหมู่ย่อย</th>
              <th style = "text-align: center">ผู้สร้าง</th>
              <th style = "text-align: center">วันที่สร้าง</th>
              <th style = "text-align: center">Action</th>
            </tr>
          </thead>
          <tbody align="center">
            <tr>
              <td>1111</td>
              <td>อะไรเอ่ยน่ากลัวที่สุด (แฮ่)</td>
              <td>อัตนัย</td>
              <td>ยากมาก</td>
              <td>100</td>
              <td>หมวดหมู่หลัก</td>
              <td>หมวดหมู่ย่อย</td>
              <td>เคโรโระ</td>
              <td>19/01/2015</td>
              <%--<td><button class = "btn btn-warning" type = "button" data-toggle = "modal" data-target = "#createQuest"><span class = "glyphicon glyphicon-pencil"></span></button></td>--%>
              <%--<td><button class = "btn btn-info" type = "button"><span class = "glyphicon glyphicon-book"></span></button></td>--%>
              <td>
                <div class="btn-group">
                  <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a data-toggle = "modal" data-target = "#createQuest">แก้ไข</a></li>
                    <li><a href="#">ลบ</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>1111</td>
              <td>อะไรเอ่ยน่ากลัวที่สุด (แฮ่)</td>
              <td>อัตนัย</td>
              <td>ยากมาก</td>
              <td>100</td>
              <td>หมวดหมู่หลัก</td>
              <td>หมวดหมู่ย่อย</td>
              <td>เคโรโระ</td>
              <td>19/01/2015</td>
              <td>
                <div class="btn-group">
                  <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a data-toggle = "modal" data-target = "#createQuest">แก้ไข</a></li>
                    <li><a href="#">ลบ</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>1111</td>
              <td>อะไรเอ่ยน่ากลัวที่สุด (แฮ่)</td>
              <td>อัตนัย</td>
              <td>ยากมาก</td>
              <td>100</td>
              <td>หมวดหมู่หลัก</td>
              <td>หมวดหมู่ย่อย</td>
              <td>เคโรโระ</td>
              <td>19/01/2015</td>
              <td>
                <div class="btn-group">
                  <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a data-toggle = "modal" data-target = "#createQuest">แก้ไข</a></li>
                    <li><a href="#">ลบ</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>1111</td>
              <td>อะไรเอ่ยน่ากลัวที่สุด (แฮ่)</td>
              <td>อัตนัย</td>
              <td>ยากมาก</td>
              <td>100</td>
              <td>หมวดหมู่หลัก</td>
              <td>หมวดหมู่ย่อย</td>
              <td>เคโรโระ</td>
              <td>19/01/2015</td>
              <td>
                <div class="btn-group">
                  <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a href="#">ดู</a></li>
                    <li><a data-toggle = "modal" data-target = "#createQuest">แก้ไข</a></li>
                    <li><a href="#">ลบ</a></li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>1111</td>
              <td>อะไรเอ่ยน่ากลัวที่สุด (แฮ่)</td>
              <td>อัตนัย</td>
              <td>ยากมาก</td>
              <td>100</td>
              <td>หมวดหมู่หลัก</td>
              <td>หมวดหมู่ย่อย</td>
              <td>เคโรโระ</td>
              <td>19/01/2015</td>
              <td>
                <div class="btn-group">
                  <button class="btn dropdown-toggle" data-toggle="dropdown">
                    เลือก<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a data-toggle = "modal" data-target = "#createQuest">ดู</a></li>
                    <li><a data-toggle = "modal" data-target = "#createQuest">แก้ไข</a></li>
                    <li><a href="#">ลบ</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br/><br/>
    <div class = "row">
      <div class = "col-md-12" align = "center">
        <ul class = "pagination">
          <li class = "disabled"><a href = "#">&laquo;</a></li>
          <li class = "active"><a href = "#">1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a>5</a></li>
          <li class = "disabled"><a href = "#">&raquo;</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  th{
    border:1px solid white;
    background-color:pink;
  }
</style>

<script>
  $('#submitCreateBtn').text('ยืนยัน');
  $('#createQuestModalTitle').text('แก้ไขข้อสอบ');

  function editQuestions(){ // THIS FUNCTION IS CALLED FROM webapp/WEB-INF/pages/exam/modal/createQuestionModal.jsp
    // IF THIS ISN'T WORKING TRY PUT THE CODE IN editQuestion() in createQuestionModal.jsp instead
    //
    // DO EDIT QUESTION HERE
    //
    alert('Working');
  }

  //function editQuestion()  IS IN THE webapp/WEB-INF/pages/exam/modal/createQuestionModal.jsp DEFINE IT THERE (DEFINE HERE WON'T WORK)

</script>


