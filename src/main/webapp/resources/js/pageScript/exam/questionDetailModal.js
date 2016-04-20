/**
 * Created by Phuthikorn_T on 18/8/2558.
 */

$(document).ready(function () {
    $("#correctDetail1").hide();
    $("#correctDetail2").hide();
    $("#correctDetail3").hide();
    $("#correctDetail4").hide();
})
String.prototype.lines = function() { return this.split(/\r*\n/); }
String.prototype.lineCount = function() { return this.lines().length; }

$('#questionDescDetail').on("change",function(){
    //setTimeout(function(){
    var sch = $(this)[0].scrollHeight+"px"
    //alert(sch)
    $(this).css("height",sch);
    //alert(sch)
    //$(this).css("height",$(this)[0].scrollHeight+"px")
    //},500)
    //alert("hello")
})

var updateDetailModal = function (tr) {

    for (var i = 1; i <= 4; i++) {
        $('#correctDetail' + i).hide();
    }

    var id = tr.attr('questionId');
    //$('#idDetail').text(id);

    $.ajax({
        type: 'POST',
        url: context+'/TDCS/exam/getQuestionDetail',
        data: {
            questionId: id
        }, success: function (question) {

            var createDate = new Date(question.createDate);
            var formattedCreateDate = createDate.getDate() + '/' + (parseInt(createDate.getMonth())+1) + '/' + createDate.getFullYear();
            var updateDate;
            var formattedUpdateDate;
            $('#updateDetail').text("")
            if (question.updateDate != null) {
                updateDate = new Date(question.updateDate);
                formattedUpdateDate = updateDate.getDate() + '/' + (parseInt(updateDate.getMonth())+1) + '/' + createDate.getFullYear();
                var updateDetail = $('#updateDetail')
                updateDetail.empty()
                updateDetail.append(formattedUpdateDate + '&nbsp;' +
                '<span id="updateInfoToolTip" class="glyphicon glyphicon-info-sign btn-link" data-toggle="tooltip"' +
                ' data-html="true" data-placement="top"  title="อัพเดทโดย<br> ' + question.updateBy.thFname + ' ' + question.updateBy.thLname+'"' +
                'style="text-decoration: none"></span>')

                $('[data-toggle="tooltip"]').tooltip();

            }

            $('#detailEditBtn').val(question.id);
            //$('#scoreDetail').text(question.score);
            $('#categoryDetail').text(question.subCategory.category.name + " : " + question.subCategory.category.id);
            $('#subCategoryDetail').text(question.subCategory.name);
            $('#difficultyDetail').text(question.difficultyLevel.description);
            $('#createByDetail').text(question.createBy.thFname + " " + question.createBy.thLname);
            $('#createDateDetail').text(formattedCreateDate);
            //$('#questionTypeDetail').text(question.questionType.description);

            //$('#questionDescDetail').empty();
            //$('#questionDescDetail').append("<p>"+question.description+"</p>");
            $('#questionDescDetail').val(question.description);
            var linesCount = $('#questionDescDetail').val().lineCount();
            $('#questionDescDetail').prop("rows",linesCount)


            //$('#questionDescDetail')
            //$('#questionDescDetail').css("height",$('#questionDescDetail')[0].scrollHeight+"px")
            //$('#questionDescDetail').css("height",$('#questionDescDetail')[0].scrollHeight+"px")
            //$('#questionDescDetail').css("height",$('#questionDescDetail')[0].scrollHeight+"px")

            $("p").css("font-size","14px")
            //$('#updateDetail').text(formattedUpdateDate);

            var i = 1;
            question.choices.forEach(function (choice) {
                var currentChoice = $('#choiceDetail' + i)
                currentChoice.empty();
                currentChoice.append(unboxingComma(choice.description));
                if (choice.correction) {
                    //$('#correctDetail' + i).show();
                    //currentChoice.parent().addClass("bg-success")
                    currentChoice.parent().find(".correction").removeClass("hidden");
                    //currentChoice.parent().addClass("label-success")
                }else{
                    //currentChoice.parent().removeClass("bg-success")
                    currentChoice.parent().find(".correction").addClass("hidden");
                }
                i++;
            })

            if(question.questionType.id == 1){
                $('#choiceDetailContainer').show()
            }else{
                $('#choiceDetailContainer').hide()
            }

        }, error: function () {
            alert("error occur");
            $('#questionDetailModal').modal('hide');
        }
    })

}
