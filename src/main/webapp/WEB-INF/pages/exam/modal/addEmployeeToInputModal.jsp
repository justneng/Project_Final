<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 16/7/2558
  Time: 15:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Modal Search Advance -->
<style>
    #dataNotFound {
        background-color: #b2e0ff;
        display: none;
        border-radius: 5px;
        padding-top: 0;
        margin: 0;
    }

    #dataNotFoundDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

    td label{
        font: 13px normal;
    }

    #showEmployeeSelected button:hover{
        background-color: #d43f3a;
    }

    .alert{
        margin-top: 3px;
    }
</style>

<div id="modalSearchByEmployeeName" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close modalSearchByEmployeeNameCloseBtn" type="close">&times;</button>
                <h4 class="modal-title">ค้นหาพนักงาน</h4>
            </div>
            <div class="modal-body" align="center">
                <div class="row">
                    <div class="form-inline">
                        <div class="form-group">
                            ชื่อ&nbsp;
                            <input id="searchEmployeeNameText" class="form-control input-sm" type="text" size="35" placeholder="ค้นหาพนักงาน ชื่อ-นามสกุล"/>
                            <button id="searchBtnFromModalSearchEmployee" class="btn btn-primary btn-sm" type="submit">
<<<<<<< 94164463eb48811be54f2ae8ff886469cc3b93d5
                                ค้นหา&nbsp;
                                <span class="glyphicon glyphicon-search"></span>
=======
                                <span class="glyphicon glyphicon-search"></span>&nbsp;
                                ค้นหา
>>>>>>> update project
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <br/>
                    <div class="col-md-12" align="center">
                        <table id="tbEmployee" class="table table-bordered">
                            <thead>
                            <tr>
                                <th style="text-align: center;"><input id="selectAllEmployeeName" type="checkbox"
                                                                       style="display: none;"/></th>
                                <th style="text-align: center;">รหัสพนักงาน</th>
                                <th style="text-align: center;">ชื่อพนักงาน</th>
                                <th style="text-align: center;">ตำแหน่ง</th>
                                <th style="text-align: center;">ทีม</th>
                            </tr>
                            </thead>
                            <tbody id="tbodySelectEmployeeName">

                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="init-message" class="row alert alert-info text-center">
                    <strong>กรุณาค้นหาพนักงานที่ต้องการ</strong>
                </div>

                <div id="emp-not-found-message" class="row alert alert-danger text-center">
                    <strong>ไม่พบข้อมูล</strong>
                </div>
                
                <div id="addEmpBtn" class="row">
                    <div class="col-md-12" align="right">
                        <div class="form-group">
                            <button id="addEmployeeBtn"
                                    class="btn btn-primary modalSearchByEmployeeNameSubmitBtn btn-sm">เพิ่ม
                            </button>
                            <button class="btn btn-gray modalSearchByEmployeeNameCloseBtn btn-sm">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>