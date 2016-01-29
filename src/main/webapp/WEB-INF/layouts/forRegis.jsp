<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title><tiles:insertAttribute name="title" ignore="true" /></title>

        <%--<link class="cssdeck" href="<c:url value="/resources/css/bootstrap.css" />" rel="stylesheet" >--%>
        <%--<script type="text/javascript" src="<c:url value="/resources/jquery/jquery-1.11.0.js" />"></script>--%>
        <%--<script type="text/javascript" src="<c:url value="/resources/js/bootstrap.js" />"></script>--%>
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap.css" />" rel="stylesheet" >
        <%--<link class="cssdeck" href="<c:url value="/resources/css/bootstrap.min.css" />" rel="stylesheet" >--%>
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-select.css" />" rel="stylesheet" >
        <%--<link class="cssdeck" href="<c:url value="/resources/css/bootstrap-select.min.css" />" rel="stylesheet" >--%>
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-select.css.map" />" rel="stylesheet" >
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-datetimepicker.css" />" rel="stylesheet" >
        <%--<link class="cssdeck" href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css" />" rel="stylesheet" >--%>
        <link class="cssdeck" href="<c:url value="/resources/css/datepicker3.css" />" rel="stylesheet" >
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-combobox.css" />" rel="stylesheet" >
        <%--<link class="cssdeck" href="<c:url value="/resources/datepicker/jquery-ui.min.css" />" rel="stylesheet" >--%>
        <script type="text/javascript" src="<c:url value="/resources/jquery/jquery-1.11.0.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/bootstrap.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/bootstrap-select.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/bootstrap-datepicker.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/bootstrap-combobox.js" />"></script>
        <%--<script type="text/javascript" src="<c:url value="/resources/datepicker/jquery-ui.js" />"></script>--%>
        <%--<c:set var="contextPath" value="${pageContext.request.contextPath}"/>--%>
    </head>
    <body  style="background-color: #f2f2f2;margin-top: 100px;">
    <tiles:insertAttribute name="header" />

    <div class="col-md-12">
        <div class="container">
            <div class="form-group">
                <div class="row"> </div>
            </div>
            <div class="jumbotron" style="background-color: #ffffff;border: solid #c3c3c3 1px;">
                <%--body--%>
                <tiles:insertAttribute name="body" />
            </div>
        </div>
    </div>

    <div class="dv-background" style="display: none">
        <div class="dv-loading">
            <spring:url value="/resources/images/loading.gif" var="image_loader_url" />
            <div class="image-contain" style="background-image: url(<c:url value="/resources/images/loading.gif" />); width:30px;height:30px;">
                <jsp:text/>
            </div>
        </div>
    </div>
    <script>
        var ajaxPattern = {
            type: 'POST',
            url: '',
            async: false,
            data: ''
//            ,beforeSend: function() {
//                $('.dv-background').show();
//            },
//            complete: function() {
//                $('.dv-background').hide();
//            }
        };
    </script>
    </body>

</html>