<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--Modal--%>

<div class="modal fade" id="createCat">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">เพิ่มหมวดหมู่</h4>
            </div>
            <div class="modal-body" style="height: 120px">
                <div class="row">
                    <form id="addCategoryForm" method="post" action="">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <div class="col-md-4" align="right">
                                    <label for="categoryIdText" class="label-control" > <small style="color: red">*</small> รหัสหมวดหมู่ :</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" class="form-control input-sm" name="catId" id="categoryIdText" required autofocus maxlength="5"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-4" align="right">
                                    <label for="categoryNameText" class="label-control"><small style="color: red">*</small> ชื่อหมวดหมู่ :</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" class="form-control input-sm" name="catName" id="categoryNameText" required/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-12 text-center">
                            <input id="submitCreateCategoryBtn" class="btn btn-primary btn-sm" type="submit" value="บันทึก"/>
                            <button id="hiddenBtn2" class="btn btn-danger btn-sm" >ยกเลิก</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</div>

<script>

//    data-dismiss="modal
    function closeModal(){
        var catId = $("#categoryIdText").val();
        var catName = $("#categoryNameText").val();
        if(catId == "" && catName ==""){

            $("#createCat").modal('hide');
        }
        else {
            if(!confirm(" ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่"))
                return false;
            $("#createCat").modal('hide');
        }
    };

    $("#hiddenBtn2").on('click',function(){
        closeModal();
    });
    $(".close").on('click',function(){
        closeModal();
    });
</script>

