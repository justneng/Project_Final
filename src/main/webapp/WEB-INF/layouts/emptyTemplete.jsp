<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <script type="text/javascript" src="<c:url value="/resources/js/bootstrap-combobox.js" />"></script>
        <link class="cssdeck" href="<c:url value="/resources/css/bootstrap-combobox.css" />" rel="stylesheet" >
    </head>
    <body>
        <%--body--%>
        <tiles:insertAttribute name="body" />
    </body>
</html>

