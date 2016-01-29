<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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

    <link class="cssdeck" href="<c:url value="/resources/css/bootstrap.css" />" rel="stylesheet" >
    <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-table.css" />" rel="stylesheet" >

    <script type="text/javascript" src="<c:url value="/resources/jquery/jquery-1.11.0.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/bootstrap.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/bootstrap-table.js" />"></script>

    <%--<c:set var="contextPath" value="${pageContext.request.contextPath}"/>--%>
</head>
    <body style="background-color: #f2f2f2; margin-top: 110px;">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <tiles:insertAttribute name="header" />
            </div>
        </nav>

        <div class="container">
            <div class="col-md-12">
                    <%--body--%>
                    <tiles:insertAttribute name="body" />
            </div>
        </div>
    </body>

</html>