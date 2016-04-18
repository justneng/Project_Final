<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>


<script>
    if ('${status}' == 'user' || '${status}' == 'staff' || '${status}' == '') {
        window.location.href = context + "/TDCS/index.html";
    }
</script>

<div class="container row noselect">
    <h3 class="h3">เพิ่มบัญชีผู้ใช้</h3>
    <hr/>
    <br/>

    <div class="col-md-10 col-md-offset-1">
        <div class="form-horizontal">
            <div class="form-group">

                <form class="form-group">
                    <div class="row col-md-12">
                        <label for="thFname" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>ชื่อ(ไทย)</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="thFname" name="thFname" class="form-control"
                                   onkeypress="return isThai(event)" required="true"/>
                        </div>

                        <label for="thLname" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>นามสกุล</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="thLname" name="thLname" class="form-control"
                                   onkeypress="return isThai(event)" required="true"/>
                        </div>

                    </div>
                </form>
                <form class="form-group">
                    <div class="row col-md-12">
                        <label for="enFname" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>ชื่อ(อังกฤษ)</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="enFname" name="enFname" class="form-control"
                                   onkeypress="return isEnglish(event)" required="true"/>
                        </div>

                        <label for="enLname" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>นามสกุล</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="enLname" name="enLname" class="form-control"
                                   onkeypress="return isEnglish(event)" required="true"/>
                        </div>

                    </div>
                </form>

                <form class="form-group">
                    <div class="row col-md-12">

                        <label for="empId" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>รหัสพนักงาน</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="empId" name="empId" class="form-control"
                                   maxlength="20" onkeypress="return numberAndEnglist(event)" required="true"/>
                        </div>

                        <label for="email" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>อีเมล</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="email" name="email" class="form-control"
                                   onkeyup="checkEmailString()" required="true"/>
                        </div>

                    </div>
                </form>

                <form class="form-group">
                    <div class="row col-md-12">
                        <label for="userType" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>ประเภทผู้ใช้</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <select id="userType" name="userType" class="form-control"
                                    required="true">
                                <option value="0">เลือกประเภทผู้ใช้</option>
                                <option value="1">พนักงาน</option>
                                <option value="2">นักศึกษา</option>
                                <option value="3">ผู้ดูแลระบบ</option>
                            </select>
                        </div>
                        <label for="position" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>ตำแหน่งงาน</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <select id="position" name="position" class="form-control"
                                    required="true">
                                <option value="0">เลือกตำแหน่งงาน</option>
                                <option value="1">Software Developer</option>
                                <option value="2">Business Analyser</option>
                            </select>
                        </div>
                    </div>
                </form>

                <form class="form-group">
                    <div class="row col-md-12">
                        <label for="username" class="col-md-2 control-label" style="padding-right: 0px">
                            <small>ชื่อผู้ใช้</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <input id="username" name="username" class="form-control"
                                   maxlength="25" onkeypress="return isNotThai(event)" required="true" disabled/>
                        </div>

                    </div>
                </form>
                <form class="form-group">
                    <div class="row col-md-12">
                        <label for="password" class="col-md-2 control-label"
                               style="padding-left: 0px;padding-right: 0px">
                            <small>รหัสผ่าน</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <div id="passdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                                <input type="password" id="password" class="form-control"
                                       onkeypress="return numberAndEnglist(event)"
                                       title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                                       maxlength="8" autocomplete="off" cssClass="form-control error"
                                       required="true" value="000000" disabled/>
                                <span id="passspan" aria-hidden="true"></span>
                            </div>
                        </div>

                        <label for="cpassword" class="col-md-2 control-label"
                               style="padding-left: 0px;padding-right: 0px;padding-top: 0px">
                            <small>ยืนยันรหัสผ่าน</small>
                            <small style="color: red">*</small>
                        </label>

                        <div class="col-md-4">
                            <div id="cpassdiv" class="col-md-12" style="padding-right: 0px;padding-left: 0px">
                                <input type="password" class="form-control" id="cpassword"
                                       aria-describedby="inputSuccess2Status"
                                       title="รหัสผ่านกรอกได้เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข"
                                       maxlength="8" onkeypress="return numberAndEnglist(event)"
                                       value="000000" required="true" disabled/>
                                <span id="cpassspan" aria-hidden="true" ></span>
                            </div>
                        </div>

                    </div>

                </form>

                <form class="form-group">
                    <div class="row col-md-12">
                        <div class="col-md-4 col-md-offset-2">
                            <div class="checkbox noselect">
                                <label><input id="useDefaultUsername" name="defaultUsername" class=""
                                              type="checkbox" style="bottom: 4px;" checked="true"/>
                                    <small><b>ใช้ชื่อผู้ใช้พื้นฐาน</b></small>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-4 col-md-offset-2">
                            <div class="checkbox noselect ">
                                <label><input id="useDefaultPassword" name="defaultUsername" class=""
                                              type="checkbox" style="bottom: 4px;" checked="true"/>
                                    <small><b>ใช้รหัสผ่านพื้นฐาน 000000</b></small>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <br>

                <form class="form-group">
                    <div class="row col-md-12">
                        <div class="col-md-2 col-md-offset-4">
                            <button id="submitAddUserBtn" type="button" class="btn btn-primary" style="width: 100%">ยืนยัน</button>
                        </div>
                        <div class="col-md-2">
                            <button id="clearInputBtn" type="button" class="btn btn-gray" style="width: 100%">ล้างข้อมูล</button>
                        </div>
                        <div class="col-md-2">
                            <button id="cancleAddUserBtn" type="button" class="btn btn-gray" style="width: 100%">ยกเลิก</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>


    <script src="<c:url value="/resources/js/pageScript/addUser.js"/> "></script>
    <style>
        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Chrome/Safari/Opera */
            -khtml-user-select: none; /* Konqueror */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
            /* Non-prefixed version, currently
                                   not supported by any browser */
        }

        .validate-fail {
            border: solid 1px red;
        }
    </style>