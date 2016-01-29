<%--
  Created by IntelliJ IDEA.
  User: JOKIZZ
  Date: 29/7/2558
  Time: 15:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--Modal Check Score--%>
<!-- alertModal-->
<%--<div id="alertModalResult" class="modal fade">--%>
<%--<div class="modal-dialog">--%>
<%--<div class="modal-content">--%>
<%--<div class="modal-header">--%>
<%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--%>
<%--<h4 class="modal-title">Modal title</h4>--%>
<%--</div>--%>
<%--<div class="modal-body">--%>
<%--<p>One fine body&hellip;</p>--%>
<%----%>
<%--</div>--%>
<%--<div class="modal-footer">--%>
<%--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--%>
<%--<button type="button" class="btn btn-primary">Save changes</button>--%>
<%--</div>--%>
<%--</div><!-- /.modal-content -->--%>
<%--</div><!-- /.modal-dialog -->--%>
<%--</div><!-- /.modal -->--%>
<div id="alertModalResult" class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-label="Close" data-dismiss="modal" type="button">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 id="myLargeModalLabel" class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <h5>รายละเอียด </h5>
                        <table class="table table-bordered table-responsive table-hover">
                            <thead class="bg-info small">
                            <tr>
                                <th class="text-center">หมวดหมู่</th>
                                <th class="text-center">หัวข้อเรื่อง</th>
                                <th class="text-center">คะเเนนเต็ม</th>
                                <th class="text-center">คะแนนที่ได้</th>
                            </tr>
                            </thead>

                            <!---------------------------------------------------- Generate Table --------------------------------------------------------------------------------->
                            <tbody id="tbodyCheckScore">
                            </tbody>
                            <%--<div id="paperNotFound" width="100%">--%>
                            <%--<h3 id="paperNotFoundDesc">ไม่พบชุดข้อสอบ</h3>--%>
                            <%--</div>--%>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-1 col-sm-2 text-right">
                            <h5>คะแนนปรนัย :</h5>
                        </div>
                        <div class="col-sm-1" style="padding-right: 0%">
                            <h5 id="forObjScore"></h5>
                        </div>
                        <div class="col-sm-1">
                            <h5 class="txtScore"></h5>
                        </div>
                    <%--</div>--%>
                    <%--<div class="row">--%>
                        <div class="col-sm-offset-1  col-sm-2 text-right">
                            <h5>คะแนนอัตนัย :</h5>
                        </div>
                        <div class="col-sm-1" style="padding-right: 0%">
                            <h5 id="forsjScore"></h5>
                        </div>
                        <div class="col-sm-1">
                            <h5 class="txtScore"></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-offset-1 col-sm-2 text-right">
                            <h5>คะแนนรวม :</h5>
                        </div>
                        <div class="col-sm-1" style="padding-right: 0%">
                            <h5 id="forSumScore"></h5>
                        </div>
                        <div class="col-sm-1">
                            <h5 class ="txtScore"></h5>
                        </div>
                    <%--</div>--%>
                    <%--<div class="row">--%>
                        <div class="col-sm-offset-1 col-sm-2 text-right">
                            <h5>คะแนนเต็ม :</h5>
                        </div>
                        <div class="col-sm-1" style="padding-right: 0%">
                            <h5 id="forMaxScore"></h5>
                        </div>
                        <div class="col-sm-1">
                            <h5 class ="txtScore"></h5>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-3 text-right">
                            <h5>ความคิดเห็น :</h5>
                        </div>
                        <div class=" col-md-7">
              <textarea id="commentTextArea" class="form-control" rows="5" disabled
                        style="resize: none; background-color: #FFFFFF;"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 col-md-offset-6 text-right">
                            <h5>ตรวจโดย :</h5>
                        </div>
                        <div class="col-md-4">
                            <h5 id="markedByShow"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>

    $('.showScoreCloseBtn').on('click', function () {
        $("#showScore").modal("hide");
    })

    $('#objectiveShowScore').text

</script>