/**
 * Created by Pongpipat on 17/4/2558.
 */
var SumScoreTopic = 0;

function deleteSubTopicAndDescription(subTopicId){
    if(!confirm("คุณต้องการลบ Sub Topic นี้ใช่หรือไม่")){
        return false;
    }
    $.ajax({
        type: "POST",
        url:context+"/TDCS/deleteDiscription",
        data: {"subTopicId":subTopicId},
        complete:function(xhr){
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
//                    addDrecri(0,subTopicId);
                    clearAddSubtopic();
                }
                else{
                    alert("fail");
                }
            } else {
                alert("fail");
            }
        }
    });
}

function addDrecri(index,xhr){
    if(index<$("#tbodySubTopicAdd").children().length) {
        var td,td0,td1,td2;
        if(index>0){
            td = 'td:eq(0)';
            td0 = 'td:eq(1)';
            td1 = 'td:eq(2)';
            td2 = 'td:eq(3)';
        }else{
            td = 'td:eq(1)';
            td0 = 'td:eq(2)';
            td1 = 'td:eq(3)';
            td2 = 'td:eq(4)';
        }
        var textAreaArray = [$("#textareaA"),$("#textareaB"),$("#textareaC"),$("#textareaD"),$("#textareaF")];

        var dataDescripsend = "subtopicId="+ xhr +
            "&descriptionData="+ textAreaArray[index].val() /*$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td2).children('textarea').val()*/ +
            "&grade=" +$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td).html()+
            "&min="+ $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td0).children('input:eq(0)').val() +
            "&max="+ $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td1).children('input:eq(0)').val();

//        if( $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td2).children('textarea').val().length<=0||
//            $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td).html().length<=0||
//            $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td1).children('input:eq(0)').val().length<=0||
//            $('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td0).children('input:eq(0)').val().length<=0){
//            addDrecri(++index,xhr);
//        }else {
            $.ajax({

                type: "POST",
                url: context+"/TDCS/saveDescription",
                data: {
                    subtopicId:xhr,
                    descriptionData:textAreaArray[index].val() /*$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td2).children('textarea').val()*/,
                    grade:$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td).html(),
                    min:$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td0).children('input:eq(0)').val(),
                    max:$('#tbodySubTopicAdd').children('tr:eq('+index+')').children(td1).children('input:eq(0)').val()
                },
                success: function (xhr1) {
                    addDrecri(++index, xhr);

                }
            });
//        }
    }else{
        clearAddSubtopic();
        return false;
    }
}
function clearAddSubtopic(){
    for(var index = 0;index<$("#tbodySubTopicAdd").children().length;index++) {
        var td, td0, td1, td2;
        if (index > 0) {
//            td = 'td:eq(0)';
            td0 = 'td:eq(1)';
            td1 = 'td:eq(2)';
            td2 = 'td:eq(3)';
        } else {
//            td = 'td:eq(1)';
            td0 = 'td:eq(2)';
            td1 = 'td:eq(3)';
            td2 = 'td:eq(4)';
        }
            $('#tbodySubTopicAdd').children('tr:eq(' + index + ')').children(td2).children('textarea').val("");
//            $('#tbodySubTopicAdd').children('tr:eq(' + index + ')').children(td).html("");
            $('#tbodySubTopicAdd').children('tr:eq(' + index + ')').children(td1).children('input:eq(0)').val("");
            $('#tbodySubTopicAdd').children('tr:eq(' + index + ')').children(td0).children('input:eq(0)').val("");
    }
    $("#subTopicData").val("");
    updateSubToppicData();
}
$(document).ready(function () {
    $("#evaluation").attr('class','dropdown active');
    $("#btnAdd").click(function(){
        var scoreArray = [$("#aMax"),$("#aMin"),$("#bMax"),$("#bMin"),$("#cMax"),$("#cMin"),$("#dMax"),$("#dMin"),$("#fMax"),$("#fMin")];
        var count = 0,countError = 0;
        if($("#subTopicData").val().length<=0){
            $("#subTopicData").attr('style','border:solid 1px red');
            alert("กรุณาใส่ข้อมูลที่จำเป็น");
            return false;
        }else{
            $("#subTopicData").attr('style','');
        }
        //Check all empty
        var countEmpty = 0;
        for(var i=0;i<5;i++){
            var td0,td1,td2;
            if(i>0){
                td0 = 'td:eq(1)';
                td1 = 'td:eq(2)';
                td2 = 'td:eq(3)';
            }else{
                td0 = 'td:eq(2)';
                td1 = 'td:eq(3)';
                td2 = 'td:eq(4)';
            }
            if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').val().length<=0&&
                $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').val().length<=0&&
                $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').val().length<=0){
                countEmpty++;
            }
        }
        if(countEmpty>4){
            alert("กรุณาใส่ข้อมูลที่จำเป็น");
            return false;
        }
        //check some input error
        countError=0;
        for(var i=0;i<5;i++){
            var td0,td1,td2;
            if(i>0){
                td0 = 'td:eq(1)';
                td1 = 'td:eq(2)';
                td2 = 'td:eq(3)';
            }else{
                td0 = 'td:eq(2)';
                td1 = 'td:eq(3)';
                td2 = 'td:eq(4)';
            }
            if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').val().length>0){
                $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').attr('style','');
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').val().length<=0){
                    countError++;
                    $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').attr('style','border:solid 1px red');
                }
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').val().length<=0){
                   countError++;
                   $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').attr('style','border:solid 1px red');
                }
            }
            if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').val().length>0){
                $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').attr('style','');
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').val().length<=0){
                    countError++;
                    $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').attr('style','border:solid 1px red');
                }
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').val().length<=0){
                    countError++;
                    $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').attr('style','border:solid 1px red');
                }
            }
            if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').val().length>0){
                $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td0).children('input').attr('style','');
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').val().length<=0){
                    countError++;
                    $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td1).children('input').attr('style','border:solid 1px red');
                }
                if($('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').val().length<=0){
                    countError++;
                    $('#tbodySubTopicAdd').children('tr:eq('+i+')').children(td2).children('textarea').attr('style','border:solid 1px red');
                }
            }
        }
        if(countError>0){
            alert("กรุณาใส่ข้อมูลที่จำเป็น");
            return false;
        }

        //เช็คช่วงคะแนน
        countError = 0;
        if(parseInt(scoreArray[0].val())>parseInt($("#remainingScore").html())){
            alert("คะแนนรวมต้องไม่เกิน "+$("#remainingScore").html());
            return false;
        }
        for(var i=1;i<scoreArray.length;i++){
            if(scoreArray[i].val().length > 0) {
                if (parseInt(scoreArray[i].val()) > parseInt(scoreArray[i - (1+count)].val())) {
                    scoreArray[i].attr('style','border:solid 1px red');
                    countError++;
                }else{
                    scoreArray[i].attr('style','');
                }
                count = 0;
            }else{
                count++;
            }
        }
        for(var i=0;i<scoreArray.length;i+=2){
            if(scoreArray[i].val().length>0){
                if(scoreArray[i+1].val().length <=0 ){
                    scoreArray[i+1].attr('style','border:solid 1px red');
                    countError++;
                }
            }else{
                if(scoreArray[i+1].val().length > 0){
                    scoreArray[i].attr('style','border:solid 1px red');
                    countError++;
                }
            }
        }

        if(countError>0){
            alert("คุณระบุช่วงคะแนนไม่ถูกต้อง");
            return false;
        }

        countError = 0;
        var scoreArrayForCheckGab = [];
        for(var i=0;i<scoreArray.length;i++){
            if(scoreArray[i].val().length>0) {
                scoreArrayForCheckGab[scoreArrayForCheckGab.length] = scoreArray[i];
            }
        }

        for(var i=1;i<scoreArrayForCheckGab.length-1;i+=2){
//            if(scoreArray[i].val().length > 0) {
            if (parseInt(scoreArrayForCheckGab[i].val()) - parseInt(scoreArrayForCheckGab[i+1].val()) == 1||
                parseInt(scoreArrayForCheckGab[i].val()) - parseInt(scoreArrayForCheckGab[i+1].val()) == 0) {
                scoreArrayForCheckGab[i+1].attr('style','');
            }else{
                scoreArrayForCheckGab[i+1].attr('style','border:solid 1px red');
                countError++;
            }
        }

        if(countError>0){
            alert("คุณระบุช่วงคะแนนไม่ถูกต้อง");
            return false;
        }

        $.ajax({
            type: "POST",
            url:context+"/TDCS/checkSubTopicInuse",
            data: {subTopicName:$("#subTopicData").val(),
                topicId:$("#selectTopic").val()},
            success:function(data){
                if(data > 0){
                    alert("SubTopic นี้มีอยู่ในระบบแล้ว");
                    return false;
                }else{
                    var datasend = "topicId="+ $("#selectTopic").val() +
                        "&subtopicData=" + $("#subTopicData").val();

                    $.ajax({
                        type: "POST",
                        url:context+"/TDCS/saveSubtopic",
                        data: datasend,
                        success:function(xhr){
                            addDrecri(0,xhr);
                        }
                    });
                }
            }
        });
    });


//    $("#scoreSubtopic").html();
//    $("#remainingScore").html();

//    $("#aMax").change(function(){
//        if(parseInt($("#aMax").val())>parseInt($("#remainingScore").html())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#remainingScore").html());
//            $("#aMax").attr('style','border:solid 1px red');
//            $('#aMin').attr('disabled', 'true');
//        }else{
//            $("#aMax").attr('style','');
//            $('#aMin').removeAttr('disabled')
//        }
//    });
//    $("#aMin").change(function(){
//        if(parseInt($("#aMin").val())>parseInt($("#aMax").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#aMax").val());
//            $("#aMin").attr('style','border:solid 1px red');
//            $('#bMax').attr('disabled', 'true');
//        }else{
//            $("#aMin").attr('style','');
//            $('#bMax').removeAttr('disabled')
//        }
//    });
//
//    $("#bMax").change(function(){
//        if(parseInt($("#bMax").val())>parseInt($("#aMin").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#aMin").val());
//            $("#bMax").attr('style','border:solid 1px red');
//            $('#bMin').attr('disabled', 'true');
//        }else{
//            $("#bMax").attr('style','');
//            $('#bMin').removeAttr('disabled');
//        }
//    });
//    $("#bMin").change(function(){
//        if(parseInt($("#bMin").val())>parseInt($("#bMax").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#bMax").val());
//            $("#bMin").attr('style','border:solid 1px red');
//            $('#cMax').attr('disabled', 'true');
//        }else{
//            $("#bMin").attr('style','');
//            $('#cMax').removeAttr('disabled');
//        }
//    });
//
//    $("#cMax").change(function(){
//        if(parseInt($("#cMax").val())>parseInt($("#bMin").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#bMin").val());
//            $("#cMax").attr('style','border:solid 1px red');
//            $('#cMin').attr('disabled', 'true');
//        }else{
//            $("#cMax").attr('style','');
//            $('#cMin').removeAttr('disabled');
//        }
//    });
//    $("#cMin").change(function(){
//        if(parseInt($("#cMin").val())>parseInt($("#cMax").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#cMax").val());
//            $("#cMin").attr('style','border:solid 1px red');
//            $('#dMax').attr('disabled', 'true');
//        }else{
//            $("#cMin").attr('style','');
//            $('#dMax').removeAttr('disabled');
//        }
//    });
//
//    $("#dMax").change(function(){
//        if(parseInt($("#dMax").val())>parseInt($("#cMin").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#cMin").val());
//            $("#dMax").attr('style','border:solid 1px red');
//            $('#dMin').attr('disabled', 'true');
//        }else{
//            $("#dMax").attr('style','');
//            $('#dMin').removeAttr('disabled');
//        }
//    });
//    $("#dMin").change(function(){
//        if(parseInt($("#dMin").val())>parseInt($("#dMax").val())){
//            alert("คะแนนสูงสุดต้องไม่เกิน "+$("#dMax").val());
//            $("#dMin").attr('style','border:solid 1px red');
//            $('#fMax').attr('disabled', 'true');
//        }else{
//            $("#dMin").attr('style','');
//            $('#fMax').removeAttr('disabled');
//        }
//    });

   updateTableTopic();
    $("#topicTab").click(function(){
        updateTableTopic();
        $("#tableAddSubTopic").hide();
        $("#tableButtonSubTopic").hide();
        $("#tableShowSubTopic").hide();
    });

    $("#btnAddTopic").click(function(){
        if($("#topicName").val().length<=0||$("#topicScore").val().length<=0){
            alert("กรุณาใส่ข้อมูลที่จำเป็น");
            return false;
        }

        if(parseInt($("#topicScore").val()) + parseInt($("#maxScoreTh").html())>100){
            alert("คะแนนรวมต้องไม่เกิน 100");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: context+'/TDCS/checkTopicInuse',
            data:{topicName:$("#topicName").val()},
            async: false,
            success:function(data){
                if(data > 0){
                    alert("Topic นี้มีอยู่ในระบบแล้ว");
                    return false;
                }else{
                    var datasend =
                        'topicData='+$("#topicName").val() +
                        '&score='+ $("#topicScore").val();

                    var TopicName = $("#topicName").val();
                    var TopicScore = $("#topicScore").val();
                    $.ajax({
                        type: 'POST',
                        url: context+'/TDCS/saveTopic',
                        data:datasend,
                        async: false,
                        success:function(data){
                            $("#topicName").val("");
                            $("#topicScore").val("");
                            updateTableTopic();
                        }
                    });
                }

            }
        });

    });

    $("#selectTopic").change(function(){
        updateSubToppicData();
    });

});

function updateSubToppicData(){
    var TopicId = $("#selectTopic").val();
    var firstTd = 0;
    var scoreArray = [$("#aMax"),$("#aMin"),$("#bMax"),$("#bMin"),$("#cMax"),$("#cMin"),$("#dMax"),$("#dMin"),$("#fMax"),$("#fMin")];
    var textAreaArray = [$("#textareaA"),$("#textareaB"),$("#textareaC"),$("#textareaD"),$("#textareaF")];

    for(var i=0;i<scoreArray.length;i++){
        scoreArray[i].val("");
    }
    for(var i=0;i<textAreaArray.length;i++){
        textAreaArray[i].val("");
    }

    if(TopicId.length>0) {
        $("#tableAddSubTopic").show();
        $("#tableButtonSubTopic").show();
        $("#tableShowSubTopic").show();
        var sumScore = 0;
        $.ajax({
            type: 'POST',
            url: context+'/TDCS/getScoreTopic',
            data: {id: TopicId},
            async: false,
            success: function (data) {
                $("#remainingScore").html(data);
            }
        });
        $.ajax({
            type: 'POST',
            url: context+'/TDCS/getSubtopicByTopic',
            data:{id:TopicId},
            async: false,
            success: function (data) {
                $("#tbodySubTopic").empty();
                data.forEach(function (value) {
                    firstTd = 0;
                    var countDis = 0;
                    var gradArray = ['A','B','C','D','F'];
                    var max,min,dic;
                    var strTable = '<tr id="'+value.SubTopic.subtopicId+'">' +
//                                        '<td rowspan="'+(parseInt(value.lenght))+'">' + value.SubTopic.subtopicData + '</td>';
                                        '<td rowspan="5">' +
                                            '<label id="lsubData'+value.SubTopic.subtopicId+'">' + value.SubTopic.subtopicData + '</label>' +
                                            '<input id="subData'+value.SubTopic.subtopicId+'" class="form-control" style="display: none" value="' + value.SubTopic.subtopicData + '"/>' +
                                        '</td>';
                    if(firstTd > 0){
                        strTable += '<tr>';
                    }
                    $.each(  value.Description, function( key, datafvalue ) {

                        if(gradArray[firstTd] != datafvalue.grade){
                            for(var i = firstTd;i<gradArray.length;i++){

                                if(gradArray[firstTd] != datafvalue.grade){
                                    if(firstTd > 0){
                                        strTable += '<tr>';
                                    }
                                    strTable += '<td style="text-align: center"> </td>' +
                                        '<td style="text-align: center"> </td>' +
                                        '<td style="text-align: center">'+gradArray[i]+'</td>' +
                                        '<td></td>';
                                    if(firstTd > 0){
                                        strTable += '</tr>';
                                    }else{
//                                        strTable += '<td class="text-center" rowspan="'+(parseInt(value.lenght))+'">' +
                                        strTable += '<td class="text-center" rowspan="5">' +
                                            '<button class="btn btn-gray">แก้ไข</button> <button class="btn btn-danger" onclick="deleteSubTopicAndDescription('+"'"+value.SubTopic.subtopicId+"'"+')">ลบจร้า</button>' +
                                            '</td></tr>';
                                    }
                                }else{
                                    break;
                                }
                                countDis++;
                                firstTd++;
                            }
                        }

                        if(key == 0){
                            sumScore+=datafvalue.max;
                        }
                        if(firstTd > 0){
                            strTable += '<tr>';
                        }

                        if(datafvalue.max==undefined){
                            max = "";
                        }else{
                            max = datafvalue.max;
                        }

                        if(datafvalue.min==undefined){
                            min = "";
                        }else{
                            min = datafvalue.min;
                        }

                        if(datafvalue.descriData==undefined){
                            dic = "";
                        }else{
                            dic = datafvalue.descriData;
                        }
                        strTable += '' +
                            '<td style="text-align: center">' +
                            '<label id="lmin'+value.SubTopic.subtopicId+''+countDis+'">'+min +'</label>' +
                            '<input id="min'+value.SubTopic.subtopicId+''+countDis+'" type="text" class="form-control text-center" value="'+min+'" onkeypress="return isNumber(event)" style="display:none" />' +
                            '</td>' +
                            '<td style="text-align: center">' +
                                '<label id="lmax'+value.SubTopic.subtopicId+''+countDis+'">'+max+'</label>' +
                                '<input id="desid'+value.SubTopic.subtopicId+''+countDis+'" type="hidden" value="'+datafvalue.descriId+'" />' +
                                '<input id="max'+value.SubTopic.subtopicId+''+countDis+'" type="text" class="form-control text-center" value="'+max+'" onkeypress="return isNumber(event)" style="display:none" />' +
                            '</td>' +
                            '<td style="text-align: center">'+datafvalue.grade +'</td>' +
                            '<td>' +
                                '<label id="ldis'+value.SubTopic.subtopicId+''+countDis+'">'+dic +'</label>' +
                                '<textarea id="dis'+value.SubTopic.subtopicId+''+countDis+'" class="form-control" style="display:none">'+dic+'</textarea>' +
                            '</td>';

                        if(firstTd > 0){
                            strTable += '</tr>';
                        }else{
//                            strTable += '<td class="text-center" rowspan="'+(parseInt(value.lenght))+'">' +
                            strTable += '<td class="text-center" rowspan="5">' +
                            '<button id="lbtn'+value.SubTopic.subtopicId+''+countDis+'" class="btn btn-gray" onclick="showEditSubTopic('+"'"+value.SubTopic.subtopicId+"'"+')">แก้ไข</button>' +
                            ' <button id="btn'+value.SubTopic.subtopicId+''+countDis+'" class="btn btn-primary" style="display: none" onclick="saveEditSubtopic('+"'"+value.SubTopic.topicId+"'"+','+"'"+value.SubTopic.subtopicId+"'"+')">บันทึก</button>' +
                            ' <button class="btn btn-danger" onclick="deleteSubTopicAndDescription('+"'"+value.SubTopic.subtopicId+"'"+')" >ลบ</button>' +
                            '</td></tr>';
                        }
                        countDis++;
                        firstTd++;
                    });
                    $("#tbodySubTopic").append(strTable);
                });
                $("#remainingScore").html(parseInt($("#remainingScore").html())-sumScore);
            }
        });
    }else{
        $("#tableAddSubTopic").hide();
        $("#tableButtonSubTopic").hide();
        $("#tableShowSubTopic").hide();
    }
}

function saveEditSubtopic(topicId,subTopucId){
    var countEditScoreError = 0;
    var alldata = [
        [$("#max" + subTopucId+'0'),$("#min" + subTopucId+'0'),$("#dis" + subTopucId+'0'),$("#desid"+ subTopucId+'0')],
        [$("#max" + subTopucId+'1'),$("#min" + subTopucId+'1'),$("#dis" + subTopucId+'1'),$("#desid"+ subTopucId+'1')],
        [$("#max" + subTopucId+'2'),$("#min" + subTopucId+'2'),$("#dis" + subTopucId+'2'),$("#desid"+ subTopucId+'2')],
        [$("#max" + subTopucId+'3'),$("#min" + subTopucId+'3'),$("#dis" + subTopucId+'3'),$("#desid"+ subTopucId+'3')],
        [$("#max" + subTopucId+'4'),$("#min" + subTopucId+'4'),$("#dis" + subTopucId+'4'),$("#desid"+ subTopucId+'4')]
        ];
    var scoreData = [$("#max" + subTopucId+'0'),$("#min" + subTopucId+'0'),
                     $("#max" + subTopucId+'1'),$("#min" + subTopucId+'1'),
                     $("#max" + subTopucId+'2'),$("#min" + subTopucId+'2'),
                     $("#max" + subTopucId+'3'),$("#min" + subTopucId+'3'),
                     $("#max" + subTopucId+'4'),$("#min" + subTopucId+'4')
                    ];

    if($("#subData"+subTopucId).val().length<=0){
        alert("กรุณากรอกข้อมูลที่จำเป็น");
        $("#subData"+subTopucId).attr('style','border:solid 1px red');
        return false;
    }else{
        $("#subData"+subTopucId).attr('style','');
    }

    for(var i=0;i<alldata.length;i++){
        if(alldata[i][0].val().length > 0){
            alldata[i][0].attr('style','');
            if(alldata[i][1].val().length<=0){
                countEditScoreError++;
                alldata[i][1].attr('style','border:solid 1px red');
            }
            if(alldata[i][2].val().length<=0){
                countEditScoreError++;
                alldata[i][2].attr('style','border:solid 1px red');
            }
        }
        if(alldata[i][1].val().length > 0) {
            alldata[i][1].attr('style', '');
            if(alldata[i][0].val().length<=0){
                countEditScoreError++;
                alldata[i][0].attr('style','border:solid 1px red');
            }
            if(alldata[i][2].val().length<=0){
                countEditScoreError++;
                alldata[i][2].attr('style','border:solid 1px red');
            }
        }
        if(alldata[i][2].val().length > 0) {
            alldata[i][2].attr('style', '');
            if(alldata[i][0].val().length<=0){
                countEditScoreError++;
                alldata[i][0].attr('style','border:solid 1px red');
            }
            if(alldata[i][1].val().length<=0){
                countEditScoreError++;
                alldata[i][1].attr('style','border:solid 1px red');
            }
        }
    }

    if(countEditScoreError>0){
        alert("กรุณากรอกข้อมูลที่จำเป็น");
        return false;
    }

    countEditScoreError = 0;
    for(var i=1;i<scoreData.length;i++){
        if(parseInt(scoreData[i].val()) > parseInt(scoreData[i-1].val())){
            countEditScoreError++;
            scoreData[i].attr('style','border:solid 1px red');
        }else{
            scoreData[i].attr('style','');
        }
    }

    if(countEditScoreError>0){
        alert("คุณระบุช่วงคะแนนไม่ถูกต้อง");
        return false;
    }

    countEditScoreError = 0;
    var scoreArrayForCheckGab = [];
    for(var i=0;i<scoreData.length;i++){
        if(scoreData[i].val().length>0) {
            scoreArrayForCheckGab[scoreArrayForCheckGab.length] = scoreData[i];
        }
    }

    for(var i=1;i<scoreArrayForCheckGab.length-1;i+=2){
        if (parseInt(scoreArrayForCheckGab[i].val()) - parseInt(scoreArrayForCheckGab[i+1].val()) == 1 ||
            parseInt(scoreArrayForCheckGab[i].val()) - parseInt(scoreArrayForCheckGab[i+1].val()) == 0) {
            scoreArrayForCheckGab[i+1].attr('style','');
        }else{
            scoreArrayForCheckGab[i+1].attr('style','border:solid 1px red');
            countEditScoreError++;
        }
    }

    if(countEditScoreError>0){
        alert("คุณระบุช่วงคะแนนไม่ถูกต้อง");
        return false;
    }



    var subTopicSend = "subtopicId="+subTopucId+"" +
        "&topicId="+ topicId +
        "&subtopicData="+$("#subData"+subTopucId).val();

    var dataCheck =  "&topicId="+ topicId +
        "&subTopicName="+$("#subData"+subTopucId).val();

    if(parseInt(scoreData[0].val()) - parseInt($("#lmax" + subTopucId+'0').html()) > parseInt($("#remainingScore").html())){
        alert("คุณระบุช่วงคะแนนไม่ถูกต้อง");
        return false;
    }


    var dataSub = $.ajax({
        type: 'POST',
        url: context+'/TDCS/checkSubTopicInuseEdit',
        data:subTopicSend,
        success: function(xhr) {
            if (xhr>0) {
                alert("SubTopic นี้มีอยู่ในระบบแล้ว");
                return false;
            }
            else{
                var dataSubTopic = $.ajax({
                    type: 'POST',
                    url:context+ '/TDCS/editSubTopic',
                    data:subTopicSend,
                    complete: function(xhr) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                saveEditDescription(0,subTopucId);
                            }
                            else{
                                alert("fail");
                            }
                        } else {
                            alert("fail");
                        }
                    }
                });
            }

        }
    });


}

function saveEditDescription(i,subTopucId){
    var alldata = [
        [$("#max" + subTopucId+'0'),$("#min" + subTopucId+'0'),$("#dis" + subTopucId+'0'),$("#desid"+ subTopucId+'0')],
        [$("#max" + subTopucId+'1'),$("#min" + subTopucId+'1'),$("#dis" + subTopucId+'1'),$("#desid"+ subTopucId+'1')],
        [$("#max" + subTopucId+'2'),$("#min" + subTopucId+'2'),$("#dis" + subTopucId+'2'),$("#desid"+ subTopucId+'2')],
        [$("#max" + subTopucId+'3'),$("#min" + subTopucId+'3'),$("#dis" + subTopucId+'3'),$("#desid"+ subTopucId+'3')],
        [$("#max" + subTopucId+'4'),$("#min" + subTopucId+'4'),$("#dis" + subTopucId+'4'),$("#desid"+ subTopucId+'4')]
    ];
    if(i<alldata.length) {
        var gardeSend;
        if(i == alldata.length-1){
            gardeSend = String.fromCharCode(65 + i + 1);
        }else{
            gardeSend = String.fromCharCode(65 + i);
        }
        var subTopicSend = "descriptionId=" + alldata[i][3].val() + "" +
            "&subtopicId=" + subTopucId +
            "&descriptionData=" + alldata[i][2].val() +
            "&grade=" + gardeSend +
            "&min=" + alldata[i][1].val() +
            "&max=" + alldata[i][0].val();

        var dataDescripton = $.ajax({
            type: 'POST',
            url:context+ '/TDCS/editDescription',
            data: subTopicSend,
            complete: function (xhr) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        saveEditDescription(++i,subTopucId);
                    }
                    else {
                        alert("fail");
                    }
                } else {
                    alert("fail");
                }
            }
        });
    }else{
        updateSubToppicData();
        return true;
    }
}

function showEditSubTopic(subTopucId){
    $("#subData"+subTopucId).show();
    $("#lsubData"+subTopucId).hide();
    for(var i=0;i<5;i++) {
        $("#max" + subTopucId+''+i).show();
        $("#min" + subTopucId+''+i).show();
        $("#dis" + subTopucId+''+i).show();
        $("#btn" + subTopucId+''+i).show();


        $("#lmax" + subTopucId+''+i).hide();
        $("#lmin" + subTopucId+''+i).hide();
        $("#ldis" + subTopucId+''+i).hide();
        $("#lbtn" + subTopucId+''+i).hide();
    }
}

function updateTableTopic(){
    SumScoreTopic = 0;
    $("#tbodyTopic").empty();
    $("#selectTopic").empty();
    $("#selectTopic").append('<option value="">เลือก TOPIC</option>');
    $.ajax({
        type: 'POST',
        url: context+'/TDCS/getAllTopic',
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                SumScoreTopic += value.score;
                $("#selectTopic").append(
                    '<option value="'+value.topicId+'">'+value.topicData+'</option>'
                );
                $("#tbodyTopic").append(
                        '<tr>' +
                        '<td> <label id="ldata'+value.topicId+'">' + value.topicData +'</label>'+
                            '<input class="form-control" type="text" id="data'+value.topicId+'" value="'+value.topicData+'" style="display: none">' +
                        '</td>' +
                        '<td style="text-align: center"> <label id="lscore'+value.topicId+'"> ' + value.score +'</label>'+
                            '<input class="form-control text-center" type="text" id="score'+value.topicId+'" value="'+value.score+'" onkeypress="return isNumber(event)" style="display: none">' +
                        '</td>' +
                        '<td class="text-center">' +
                        '<button id="btnedit'+value.topicId+'" class="btn btn-gray" onclick="showEditTopic(' + "'" + value.topicId + "'" + ')">แก้ไข</button>' +
                        '<button id="btnsave'+value.topicId+'" style="display: none" class="btn btn-primary" onclick="saveEditToppicdata(' + "'" + value.topicId + "'" + ')">บันทึก</button>' +

                        '<button style="margin-left: 5px" class="btn btn-danger" onclick="deleteData(' + "'" + value.topicId + "'" + ')">ลบ</button>' +
                        '</td>' +
                        '</tr>'
                )
            });
            $("#maxScoreTh").html(SumScoreTopic);
        }
    });
}

function deleteData(idTopic){
    if(!confirm("คุณต้องการลบข้อมูลนี้หรือไม่")){
        return false;
    }

    $.ajax({
        type: 'POST',
        url: context+'/TDCS/deleteTopic',
        data:{
            id : idTopic
        },
        async: false,
        success:function(data){
            updateTableTopic();
        }
    });
}

function showEditTopic(valueId){

    $("#ldata"+valueId).hide();
    $("#lscore"+valueId).hide();
    $("#btnedit"+valueId).hide();

    $("#data"+valueId).show();
    $("#score"+valueId).show();
    $("#btnsave"+valueId).show();
}

function saveEditToppicdata(valueId){
    var scoreCheck = $("#score"+valueId).val();
    if(parseInt($("#score"+valueId).val()) + parseInt($("#maxScoreTh").html()) - parseInt($("#lscore"+valueId).html())>100){
        alert("คะแนนรวมต้องไม่เกิน 100");
        return false;
    }

    if($("#score"+valueId).val().length<=0||$("#data"+valueId).val().length<=0){
        alert("กรุณาใส่ข้อมูลที่จำเป็น");
        return false;
    }

    var data = $.ajax({
        type: 'POST',
        url: context+'/TDCS/getScoreInUserOfTopic',
        data:{"topicId":valueId},
        complete: function(xhr) {
            if(parseInt(xhr.responseText) > parseInt(scoreCheck)){
                alert("คะแนน Topic ไม่ควรน้อยกว่า SubTopic");
                return false;
            }else{

                var topicSend = "topicId="+valueId+
                    "&topicData="+ $("#data"+valueId).val() +
                    "&score="+$("#score"+valueId).val();

                var data = $.ajax({
                    type: 'POST',
                    url: context+'/TDCS/editTopic',
                    data:topicSend,
                    complete: function(xhr) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                updateTableTopic();
                            }
                            else{
                                alert("fail");
                            }
                        } else {
                            alert("fail");
                        }
                    }
                });

            }
        }
    });



}