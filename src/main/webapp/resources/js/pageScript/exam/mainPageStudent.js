/**
 * Created by Phuthikorn_T on 21/10/2558.
 */

$(".doExamBtn").on('click',function(){
    console.log('hello')
    $("#confirmationModal").modal("show")
    $("#doExamConfirmedBtn").attr("paperId",$(this).attr("paperId"))
})

$("#doExamConfirmedBtn").on('click',function(){
    location.href= context+"/TDCS/exam/doExam?paperId="+$(this).attr("paperId")
})
