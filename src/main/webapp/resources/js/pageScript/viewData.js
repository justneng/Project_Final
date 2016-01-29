var checkId;

$(document).ready(function () {
    $("button").on('click',function(){
        checkId = $(this).attr("id");
        console.log(checkId);
    })
});
