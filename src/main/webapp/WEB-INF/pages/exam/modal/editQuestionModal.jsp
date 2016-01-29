<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 17/7/2558
  Time: 16:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Modal CreateQuestion-->
<div class="modal fade" id="editQuestionModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title" align="center">แก้ไขคำถาม</h3>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col-md-4" align="right">
            <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">หมวดหมู่ :</label></h4>
          </div>
          <div class="input-group col-md-5">
            <input type="text" class="form-control" name="cat"/>
            <span class="input-group-addon" id="selectCat"><i class="glyphicon glyphicon-search"></i></span>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-4" align="right">
            <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">คำถาม :</label></h4>
          </div>
          <div class="input-group col-md-5">
            <input type="text" class="form-control" name="subcat" />
            <span class="input-group-addon" id="selectSubCat"><i class="glyphicon glyphicon-search"></i></span>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-4" align="right">
            <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ประเภทข้อสอบ :</label></h4>
          </div>
          <div class="input-group col-md-5">
            <select class="form-control" onclick="select()">
              <option id="obj" value="Objective">ปรนัย</option>
              <option id="sub" value="Subjective">อัตนัย</option>
            </select>
          </div>
          <br>
          <div class="modal-footer" id="question">
            <%-- Start Objective--%>
            <div class="row form-group" id="objective" style="display: none">
              <div class="col-md-4">
                <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ข้อสอบ :</label></h4>
              </div>
              <div class="col-md-5" style="padding: 0px">
                <textarea class="form-control" style="resize: none"></textarea>
              </div>
              <div class="col-md-3" align="left">
                <div class="radio">
                  <label><input type="radio" name="level" value="hard">ยาก</label>
                </div>
                <div class="radio">
                  <label><input type="radio" name="level" value="normal">ปานกลาง</label>
                </div>
                <div class="radio">
                  <label><input type="radio" name="level" value="easy">ง่าย</label>
                </div>
              </div>
            </div>
            <div class="row form-group" id="objective2" style="display: none">
              <div class="col-md-5 col-md-offset-4" style="padding: 0px" align="left">
                <div class="radio">
                  <input type="radio" name="level"/>
                  <input class="form-control" type="text" id="choiceA"/>
                </div>
                <div class="radio">
                  <input type="radio" name="level"/>
                  <input class="form-control" type="text" id="choiceB"/>
                </div>
                <div class="radio">
                  <input type="radio" name="level"/>
                  <input class="form-control" type="text" id="choiceC"/>
                </div>
                <div class="radio">
                  <input type="radio" name="level"/>
                  <input class="form-control" type="text" id="choiceD"/>
                </div>
                <div class="btn col-md-offset-1">
                  <button class="btn btn-primary">ตกลง</button>
                  <button class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                </div>
              </div>

              <div class="col-md-1 col-md-offset-1">
                <div class="row form-group">
                  <div>
                    <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">คะแนน</label></h4>
                    <input type="text" class="form-control" name="score"/>
                  </div>
                </div>
              </div>
            </div>
            <%--End Objective--%>

            <%--Start Subjective--%>
            <div class="row form-group" id="subjective" style="display: none">
              <div class="col-md-4">
                <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">ข้อสอบ :</label></h4>
              </div>
              <div class="col-md-5" style="padding: 0px">
                <textarea class="form-control" style="resize: none"></textarea>
              </div>
              <div class="col-md-3" align="left">
                <div class="radio">
                  <label><input type="radio" name="level" value="hard">ยาก</label>
                </div>
                <div class="radio">
                  <label><input type="radio" name="level" value="normal">ปานกลาง</label>
                </div>
                <div class="radio">
                  <label><input type="radio" name="level" value="easy">ง่าย</label>
                </div>
              </div>
            </div>
            <div class="row form-group" id="subjective2" style="display: none">
              <div class="col-md-5 col-md-offset-4" align="left">
                <div class="row">
                  <textarea class="form-control" style="resize: none"></textarea>
                </div>
                <br>
                <div class="btn col-md-offset-1">
                  <button class="btn btn-primary">แก้ไข</button>
                  <button class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                </div>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <div class="row form-group">
                  <div>
                    <h4><label class="label label-success" style="background-color: lightgreen ; color: black ; font-weight: 100">คะแนน</label></h4>
                    <input type="text" class="form-control" name="score"/>
                  </div>
                </div>
              </div>
            </div>
            <%--End Subjective--%>

          </div><!--Modal footer-->
        </div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- End Modal Create Question -->

<script>
  function select() {
    $('#obj').click(function () {
      $('#objective').show();
      $('#objective2').show();
      $('#subjective').hide();
      $('#subjective2').hide();
    });

    $('#sub').click(function () {
      $('#subjective').show();
      $('#subjective2').show();
      $('#objective').hide();
      $('#objective2').hide();
    })

  }

</script>