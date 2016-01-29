var paperCodes = new Array();
var orderPaperByColumn;
var orderPaperType;

$("#orderPaperByColumn").on('change', function(){
    getPaperIds();
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
        orderPaper(temp, orderPaperByColumn, orderPaperType);
    }
});

$("#orderPaperType").on('change', function(){
    getPaperIds();
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
        orderPaper(temp, orderPaperByColumn, orderPaperType);
    }
});

function getPaperIds(){
    paperCodes = [];
    $("#tbodyManagePaper tr td:nth-child(3)").each(function(){
        paperCodes.push($(this).text());
    });
}

function orderPaper(paperCodes, orderPaperByColumn, orderPaperType){
    var jsonString = {};
    jsonString = JSON.stringify(paperCodes);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/orderPaper",
        data: {
            "paperCodes": jsonString,
            "orderPaperByColumn": orderPaperByColumn,
            "orderPaperType": orderPaperType
        },
        async: false,
        success: function (data) {
            checkAll = 0;
            $("#checkPaperAll").prop('checked', false);

            if(data.length == 0){
                paperNotFound();
            }
            else{
                paperFound();
                $("#tbodyManagePaper").empty();
                data.forEach(function (value) {
                    var paperName = value.examPaper.name;
                    if(paperName == undefined? paperName = "-": paperName = value.examPaper.name);

                    var posiId;
                    var posiName;

                    if(value.examPaper.position != null){
                        posiId = value.examPaper.position.posiId;
                        posiName = value.examPaper.position.posiName;
                    }
                    else{
                        posiId = 0;
                        posiName = "ทั้งหมด";
                    }

                    var str1 = "";
                    var str2 = "";
                    var check = false;

                    if(value.check == 'true') {
                        str1 = "disabled";
                        str2 = "disabled";
                    }

                    if((value.check == 'false') && (value.examPaper.paperStatus.id != 1)){
                        checkAll = checkAll + 1;
                    }

                    if(value.examPaper.paperStatus.id == 1){
                        str1 = "disabled";
                        str2 = "";
                    }

                    $("#tbodyManagePaper").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="'+value.examPaper.id+'">'+value.examPaper.id+'</label></td>'+
                        '<td class="pCheck"><input class="checkPaper" '+str1+' type="checkbox" check="'+check+'"/></td>'+
                        '<td><label id="lpaperCode'+value.examPaper.code+'">'+value.examPaper.code+'</label></td>'+
                        '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+paperName+'</label></td>'+
                        '<td><label id="lpaperCreateBy'+value.examPaper.createBy.empId+'">'+value.examPaper.createBy.thFname+' '+value.examPaper.createBy.thLname+'</label></td>'+
                        '<td><label id="lpaperScore'+value.examPaper.maxScore+'" class="label-control">'+value.examPaper.maxScore+'</label></td>'+
                        '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
                        '<td class="pSelect">'+
                        '<select id="dropdownId'+value.examPaper.id+'" name="paperStatus" '+str2+' class="btn btn-success btn-sm" style="text-align: left;">'+
                            //'<option value="3">ยังไม่เผยแพร่</option>'+
                        '<option value="1">เปิดใช้งาน</option>'+
                        '<option value="2">ปิดใช้งาน</option>'+
                        '</select>'+
                        '</td>'+
                        '<td class="pButton"><button id="'+value.examPaper.id+'" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                        '</tr>'
                    );
                    presentStatus(value.examPaper.id, value.examPaper.paperStatus.id);
                });
            }
        }
    });
}