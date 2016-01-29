<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    $( document ).ready(function(){
        window.location.href = context+"/TDCS/home.html";
    });
</script>