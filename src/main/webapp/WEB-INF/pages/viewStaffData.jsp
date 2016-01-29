<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 2/7/2558
  Time: 12:54
  To change this template use File | Settings | File Templates.
--%>
<%@ c:taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script src="<c:url value="/resources/js/callculatetime.js" />"></script>
<script src="<c:url value="/resources/js/callutaeAge.js" />"></script>
<script src="<c:url value="/resources/js/checkKeybord.js" />"></script>
<script src="<c:url value="/resources/js/setInputUserdata.js" />"></script>

<div class="container row">
    <%--<c:choose>--%>
    <%--<c:when test='${status == "admin"}'><h3 class="h3">เพิ่มข้อมูลพนักงาน</h3></c:when>--%>
    <%--</c:choose>--%>
    <h3>ข้อมูลพนักงาน</h3>

    <div class="row">
        <div class="col-md-offset-1 col-md-2">
            <div class="form-group">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <c:choose>
                            <c:when test="${users[0].imange == null}">
                                <img id="myImg" src="<c:url value="/resources/images/blank.jpg" />" alt="your image"
                                     width="100%" height="190px"/>
                            </c:when>
                            <c:otherwise>
                                <img id="myImg" src="<c:url value="/resources/pictureUpload/${users[0].imange}" />"
                                     alt="your image" width="100%" height="190px"/>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="form-horizontal">

                <div class="form-group">
                    <div class="row col-md-12">
                        <label for="userId" class="col-md-3 control-label" style="padding-right: 0px">
                            <small>รหัสพนักงาน</small>
                        </label>

                        <div class="col-md-2">
                            <input id="userId" class="form-control" value="${user.empId}" readonly="true"/>
                        </div>

                        <label for="username" class="col-md-3 control-label" style="padding-right: 0px">
                            <small>ชื่อผู้ใช้</small>
                        </label>

                        <div class="col-md-4">
                            <input id="username" class="form-control" value="${user.userName}" readonly="true"/>
                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <div class="row col-md-12">
                        <label for="thFname" class="col-md-3 control-label"
                               style="padding-left: 0px;padding-right: 0px">
                            <small>ชื่อ(ไทย)</small>
                        </label>

                        <div class="col-md-4">
                            <input id="thFname" class="form-control" value="${user.thFname}" readonly="true"/>
                        </div>

                        <label for="thLname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>นามสกุล</small>
                        </label>

                        <div class="col-md-4">
                            <input id="thLname" class="form-control" value="${user.thLname}" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label for="enFname" class="col-md-3 control-label"
                               style="padding-left: 0px;padding-right: 0px">
                            <small>ชื่อ(อังกฤษ)</small>
                        </label>

                        <div class="col-md-4">
                            <input id="enFname" class="form-control" value="${user.enFname}" readonly="true"/>
                        </div>

                        <label for="enLname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>นามสกุล</small>
                        </label>

                        <div class="col-md-4">
                            <input id="enLname" class="form-control" value="${user.enLname}" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>ชื่อเล่น</small>
                        </label>

                        <div class="col-md-2">
                            <input id="nickname" name="username" class="form-control" value="${user.nickName}"
                                   onkeypress="return isThai(event)" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label for="birthDay" class="col-md-3 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>วันเกิด</small>
                        </label>

                        <div class="col-md-4">
                            <input id="birthDay" class="form-control" value="${user.birthDate}" readonly="true"/>
                        </div>

                        <label for="age" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>อายุ</small>
                        </label>

                        <div class="col-md-2">
                            <input id="age" class="form-control" value="" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>สังกัด</small>
                        </label>

                        <div class="col-md-4">
                            <input name="username" class="form-control" value="${user.company.compName}"
                                   readonly="true"/>
                        </div>
                        <label for="enLname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>แผนก</small>
                        </label>

                        <div class="col-md-4">
                            <input type="hidden" id="sectionIdHiden" value="${user.sectionPosition.sectionId}"/>
                            <input class="form-control" value="${user.sectionPosition.section.sectionName}"
                                   readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>ตำแหน่ง</small>
                        </label>

                        <div class="col-md-4">
                            <input name="username" class="form-control"
                                   value="${user.sectionPosition.position.posiName}" readonly="true"/>
                            <input type="hidden" id="jobIdHiden" value="${user.spId}"/>
                        </div>
                        <label for="enLname" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>ทีม</small>
                        </label>

                        <div class="col-md-4">
                            <input class="form-control" value="${user.team.teamName}" readonly="true"/>
                            <input class="form-control" id="txbTeam" name="txbTeam" required="true" autocomplete="off"
                                   style="display:none"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>เริ่มทำงาน</small>
                        </label>

                        <div class="col-md-4">
                            <div class='input-group date' id='dpStartWork'>
                                <input id="startWork" type='text' class="form-control" readonly="true"
                                       value="${user.startWork}"/>
                            </div>
                        </div>
                        <label class="col-md-1 control-label" style="padding-right: 0px;">
                            <small>รวม</small>
                        </label>

                        <div class="col-md-2" style="padding-right: 0px;">
                            <input id="sum" type="text" class="form-control text-center" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>ที่อยู่</small>
                        </label>

                        <div class="col-md-9">
                            <textarea id="address" class="form-control" readonly="true">${user.address}</textarea>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label for="tel1" class="col-md-3 control-label" style="padding-left: 0px;padding-right: 0px">
                            <small>โทร</small>
                        </label>

                        <div class="col-md-4">
                            <input id="tel1" class="form-control" value="${user.tell1}" readonly="true"/>
                        </div>

                        <label for="tel2" class="col-md-1 control-label" style="padding: 7px 0px 7px 0px;">
                            <small>มือถือ</small>
                        </label>

                        <div class="col-md-4">
                            <input id="tel2" class="form-control" value="${user.tell2}" readonly="true"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-right: 0px">
                            <small>อีเมล</small>
                        </label>

                        <div class="col-md-9">
                            <div class="col-md-5" style="padding-left: 0px;padding-right: 0px;">
                                <input id="ssgMail" class="form-control" readonly="readonly" value="${user.eMail1}"/>
                            </div>
                            <label class="col-md-3 control-label" style="text-align: left;">
                                <small>@internal.ssg</small>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-right: 0px">
                            <small>อีเมลสำรอง</small>
                        </label>

                        <div class="col-md-9">
                            <div class="col-md-8" style="padding-left: 0px;">
                                <input id="mail" class="form-control" readonly="readonly" value="${user.eMail2}"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-12">
                        <label class="col-md-3 control-label" style="padding-right: 0px">
                            <small>Skype Account</small>
                        </label>

                        <div class="col-md-9">
                            <div class="col-md-8" style="padding-left: 0px;">
                                <input id="skype" class="form-control" readonly="readonly" value="${user.skype}"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row col-md-offset-3 col-md-6">
                        <a href="${context}/TDCS/searchStaff.html" class="btn btn-warning">ย้อนกลับ</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script>
    var elementStart;
    $(document).ready(function () {
        var birthday = '${user.birthDate}'.split("/");
        $("#age").val(_calculateAge(birthday[2] + "," + birthday[1] + "," + birthday[0]));

        var stDate = $("#startWork").val().split('/');
        var dString = stDate[2] + "," + stDate[1] + "," + stDate[0];
        var d1 = new Date(dString);
        var d2 = new Date();
        var y = DateDiff.inYears(d1, d2), m = DateDiff.inMonths(d1, d2), d = DateDiff.inDays(d1, d2);
        var rerultShow = "";

        if (m >= 12) {
            y = m / 12;
            rerultShow += parseInt(y + "") + " ปี";
            if (m % 12 > 0) {
                m %= 12;
                m + " เดือน"
            }
        } else {
            rerultShow += m + " เดือน";
        }
        $("#sum").val(rerultShow);

    });
</script>
