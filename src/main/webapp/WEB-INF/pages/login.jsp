<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<div class="container" style="background-color: white; padding-bottom: 80px; border-radius: 20px; width: 72%; box-shadow: 10px 10px 5px #888888;">
    <form method="post" action="${context}/TDCS/login.html">
        <div class="form-horizontal">
            <div class="row">
                <div class="help-block" style="margin-left: 20px; padding-bottom: 10px; margin-right: 20px;">
                    <div class="h3" >โปรดลงชื่อเข้าใช้</div>
                    <hr/>
                </div>
                <div class="row text-center">
                    <c:if test="${ch == 'fail'}">
                        <div class="col-md-offset-4 col-md-4" style="color: red;">คุณป้อนชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</div>
                    </c:if>
                </div>
                <br/>
                <div class="form-group">
                    <div class="col-md-offset-4 col-md-4">
                        <%--<span class="input-group-addon">ชื่อผู้ใช้</span>--%>
                        <input id="id" name="id" class="form-control" placeholder="ชื่อผู้ใช้" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-4 col-md-4" >
                        <%--<span class="input-group-addon">รหัสผ่าน</span>--%>
                        <input id="pass" type="password" name="pass" class="form-control" placeholder="รหัสผ่าน" />
                    </div>
                </div>
                <div class="col-md-offset-4 col-md-4">
                    <div class="col-md-6 text-left" style="padding: 0px">
                        <button id="forgetPasswordBtn" type="button" class="btn btn-link"
                                data-toggle="modal" data-target="#forgetPassModal">
                            ลืมรหัสผ่าน
                        </button>
                    </div>
                    <div class="col-md-6 text-right" style="padding: 0px">
                        <button id="submit" type="submit" class="btn btn-primary">
                            &nbsp;ลงชื่อเข้าใช้
                        </button>
                        <a class="btn btn-primary" href="${context}/TDCS/signup.html"  style="margin-top: 5px">
                            &nbsp;ลงทะเบียน&nbsp;
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <br/>
</div>
<script>
    if('${RegisSuc}' == 1){
        alert( "โปรดรอการอนุมัติจากผู้อนุมัติ");
    }
</script>
<!-- Modal -->
<div class="modal fade" id="forgetPassModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3 class="modal-title" id="myModalLabel">ลืมรหัสผ่าน</h3>
            </div>
            <div class="modal-body">
                <input id="mail" class="form-control" placeholder="ป้อน E-mail ของคุณ" />
            </div>
            <div class="modal-footer">
                <button id="sendForgetPassword" type="button" class="btn btn-primary">ยืนยัน</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">ยกเลิก</button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function(){
       $("#sendForgetPassword").click(function(){
           var chk = 0;
           var data = $.ajax({
               type: "POST",
               url:context+ '/TDCS/forgetPassword',
               data: {
                   email : $("#mail").val()
               },
               beforeSend: function () {
                   $('.dv-background').show();
               },
               complete: function () {
                   $('.dv-background').hide();
               }, success: function () {
//                   alert('ส่งรหัสผ่านเข้า E-mail เรียบร้อยแล้ว');
//                   window.location.href = "/TDCS/login.html";
                   chk = 1;
               }, error: function () {
//                   alert('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
               },
               async: false
           }).responseText;
           var data2 = data.split("~");
           alert(data2[0]);
           if(data2[1] == 1) {
               $("#forgetPassModal").modal("hide");
           }
       });
    });
</script>