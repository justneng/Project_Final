$(document).ready(function(){
    $('.do-exam').on('click', function(){
        var $cid = $(this).attr('cid');
        generatePaper($cid);
    });
});

function generatePaper(cid){
    $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/generatePaper",
        data:{
            cid: cid
        },
        success: function(paperId){
            location.href= context+"/TDCS/exam/doExamGenerate?paperId="+paperId;
        },
        error: function(){
            alert('error');
        }
    })
}