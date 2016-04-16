<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 11/4/2559
  Time: 17:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--Modal Category --%>
<div id="select-questions-by-category" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <strong>เพิ่มข้อสอบจากหัวข้อเรื่อง</strong>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <div class="well">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="selectCategories" class="control-label"><strong>หมวดหมู่</strong>&nbsp;&nbsp;&nbsp;</label>
                            <select id="selectCategories" class="form-control input-sm">

                            </select>
                        </div>
                    </form>
                </div>

                <div class="well">
                    <strong>หัวข้อเรื่อง</strong><br/><br/>
                    <div id="selectSubcategories" class="form-horizontal">

                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <div class="text-center">
                    <button id="add-questions-to-paper" class="btn btn-primary btn-sm" data-dismiss="modal">
                        <span class="glyphicon glyphicon-transfer"></span>
                        &nbsp;เพิ่มข้อสอบ
                    </button>
                </div>

                <%--<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>--%>
            </div>
        </div>
    </div>
</div>
