var questionIds = new Array();
var orderByColumn;
var orderType;

$('.glyphicon-triangle-top, .glyphicon-triangle-bottom').on('click', function(){
    getQuestionIds();
    orderByColumn = $(this).parent().siblings('label').attr('value');
    orderType = $(this).attr('value');
    if(questionIds.length > 0){
        var temp = new Array();

        for(var i = 0; i < questionIds.length; i ++){
            var item = {
                "questionIds" : questionIds[i]
            };
            temp.push(item);
        }
        orderQuestions(temp, orderByColumn, orderType);
    }
});

$("#orderPaperByColumn").on('change', function(){
    getQuestionIds();
    orderPaperByColumn = $("#orderPaperByColumn").val();
    orderPaperType = $("#orderPaperType").val();
    if(paperCodes.length > 0){
        var temp = new Array();

        for(var i = 0; i < paperCodes.length; i ++){
            var item = {
                "paperCodes" : paperCodes[i]
            };
            temp.push(item);
        }
        orderQuestions(temp, orderByColumn, orderType);
    }
});

$("#orderPaperType").on('change', function(){
    getQuestionIds();
    orderPaperByColumn = $("#orderPaperByColumn").val();
    orderPaperType = $("#orderPaperType").val();
    if(questionIds.length > 0){
        var temp = new Array();

        for(var i = 0; i < paperCodes.length; i ++){
            var item = {
                "paperCodes" : paperCodes[i]
            };
            temp.push(item);
        }
        orderQuestions(temp, orderByColumn, orderType);
    }
});

function getQuestionIds(){
    questionIds = [];
    $("#tbSelectQuestion tr td:nth-child(1)").each(function(){
        questionIds.push($(this).text());
    });
}

function orderQuestions(questionIds, orderByColumn, orderType){
    var jsonString = {};
    jsonString = JSON.stringify(questionIds);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/orderQuestions",
        data: {
            "questionIds": jsonString,
            "orderByColumn": orderByColumn,
            "orderType": orderType
        },
        async: false,
        success: function (data) {
            checkAll = 0;
            $("#tbodySelectQuestion").empty();
            data.forEach(function(value){
                var str = "";
                if(value.choices != null){
                    var j = 1;
                    (value.choices).forEach(function(value2){
                        if(Number(value.status.id) == 3){
                            str = str +'<td style="display: none;"><label id="labelChoice'+j+value.id+'">'+value2.description+'</td>'+
                                '<td style="display: none;"><label id="labelChoiceCorrection'+j+value.id+'">'+value2.correction+'</td>';
                        }
                        j = j+1;
                    });
                }
                $("#tbodySelectQuestion").append(
                    '<tr>'+
                    '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                    '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                    str+

                    '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" check="" type="checkbox"/></td>'+
                    '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                    '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                    '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+ checkString(value.description) +'</label></td>'+
                    '<td style="text-align: center;"><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                    '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                    '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                    '<td style="text-align: center; display: none;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                    '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                    '</tr>'
                );
            });
        }
    });
}