<%--
  Created by IntelliJ IDEA.
  User: Pongpipat
  Date: 12/3/2558
  Time: 16:30
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<html>
<head>
    <title></title>
</head>
<body>
    <%--<img src="<c:url value="/resources/pictureUpload/${picName}" />" width="100%" />--%>
    <div id="imgDiv"></div>
    <div class="col-md-12 text-center">
        <label for="fileUpload" style="cursor: pointer">แก้ไข</label>
    </div>
    <input type="file" id="fileUpload" style="display: none" />

    <script>
        var picture = "";
        $("#fileUpload").on('change',prepareLoad);
        function prepareLoad(event)
        {
            var fileName = $("#fileUpload").val().split('.');
//    alert(fileName[fileName.length-1]);
            if(fileName[fileName.length-1]=="jpg"||fileName[fileName.length-1]=="png") {
                var oMyForm = new FormData();
                oMyForm.append("file", fileUpload.files[0]);
//        oMyForm.append("name", $("#fileUpload").val());
                oMyForm.append("havefile", picture);
                var data = $.ajax({
                    url: context+'/TDCS/uploadFile',
                    data: oMyForm,
                    dataType: 'text',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    beforeSend: function() {
//                $('.dv-background').show();
                    },
                    success: function(data){
//                bootbox.alert("Save Successful", function() {
//                });
//                        picture = data;
//                        $("#profile").attr('src',picture);
//                        alert(data)
                        <%--alert('${picName}')--%>
                        alert(data);
                        $('#imgDiv').html('');
                        $('#imgDiv').prepend('<img name="img" class="img-responsive" width="300px" src="/resources/pictureUpload/'+data+'" />')

                    },
                    error: function () {
//                bootbox.alert("Save UnSuccessful", function() {
//                });
                    },
                    complete: function() {

//                        window.location.href = "/TDCS/picture";
//                        alert(111111)

//                $('.dv-background').hide();
                    }
                }).responseText;
            }
        }
    </script>
</body>
</html>
