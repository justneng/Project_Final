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
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <select id="selectCategories" class="form-control input-sm">

                </select>
            </div>

            <div class="modal-footer">
                <div class="text-center">
                    <button id="update-subcategoory-btn" class="btn btn-primary btn-sm">
                        <span class="glyphicon glyphicon-save"></span>
                        &nbsp;บันทึก
                    </button>
                </div>

                <%--<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>--%>
            </div>
        </div>
    </div>
</div>