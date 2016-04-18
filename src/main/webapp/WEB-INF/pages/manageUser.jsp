<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
  var context = '${context}';
</script>

<script>
  if('${status}' == 'user' || '${status}' == 'staff' || '${status}' == ''){
    window.location.href = context+"/TDCS/index.html";
  }
</script>