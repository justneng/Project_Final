var records = null;
var first = 0;
var last = 0;

$(document).ready(function(){
    $('.pagination').on('click', 'li > a', function(){
        currentPage($(this));
        if(typeof toPage == 'function'){
            toPage(getCurrentPageNumber,10);
        }
    });
});

function currentPage(currentElem) {
    var elem = currentElem.parent();
    var where = $('#first-page').attr('where');

    if (where === "paper") {
        if (elem.attr('id') == 'first-page') {
            var first = elem.siblings().find('a:contains("1")');
            printRecords(getRecordsPerPage(Number(first.text()), records));
            setStyle(first);
        }
        else if (elem.attr('id') == 'last-page') {
            var last = elem.siblings().find('a:contains("' + Math.ceil(records.length / 10) + '")');
            printRecords(getRecordsPerPage(Number(last.text()), records));
            setStyle(last);
        }
        else if (elem.attr('id') == 'next-page') {
            var next = elem.siblings().find('a').filter('.currentPage').parent().next().find('a');

            if (next.parent().attr('id') == 'next-page') {
                return;
            }
            else {
                printRecords(getRecordsPerPage(Number(next.text()), records));
                setStyle(next);
            }
        }
        else if (elem.attr('id') == 'prev-page') {
            var prev = elem.siblings().find('a').filter('.currentPage').parent().prev().find('a');

            if (prev.parent().attr('id') == 'prev-page') {
                return;
            }
            else {
                printRecords(getRecordsPerPage(Number(prev.text()), records));
                setStyle(prev);
            }
        }
        else {
            printRecords(getRecordsPerPage(Number(currentElem.text()), records));
            setStyle(currentElem);
        }
    }

    else if (where === "question") {
        if (elem.attr('id') == 'first-page') {
            var first = elem.siblings().find('a:contains("1")');
            printRecordsSelectQuestion(getRecordsPerPage(Number(first.text()), records));
            setStyle(first);
        }
        else if (elem.attr('id') == 'last-page') {
            var last = elem.siblings().find('a:contains("' + Math.ceil(records.length / 10) + '")');
            printRecordsSelectQuestion(getRecordsPerPage(Number(last.text()), records));
            setStyle(last);
        }
        else if (elem.attr('id') == 'next-page') {
            var next = elem.siblings().find('a').filter('.currentPage').parent().next().find('a');

            if (next.parent().attr('id') == 'next-page') {
                return;
            }
            else {
                printRecordsSelectQuestion(getRecordsPerPage(Number(next.text()), records));
                setStyle(next);
            }
        }
        else if (elem.attr('id') == 'prev-page') {
            var prev = elem.siblings().find('a').filter('.currentPage').parent().prev().find('a');

            if (prev.parent().attr('id') == 'prev-page') {
                return;
            }
            else {
                printRecordsSelectQuestion(getRecordsPerPage(Number(prev.text()), records));
                setStyle(prev);
            }
        }
        else {
            printRecordsSelectQuestion(getRecordsPerPage(Number(currentElem.text()), records));
            setStyle(currentElem);
        }
    }
    else{
        if (elem.attr('id') == 'first-page') {
            var first = elem.siblings().find('a:contains("1")');
            setStyle(first);
        }
        else if (elem.attr('id') == 'last-page') {
            var last = elem.siblings().find('a:contains("' + Math.ceil(records.length / 10) + '")');
            setStyle(last);
        }
        else if (elem.attr('id') == 'next-page') {
            var next = elem.siblings().find('a').filter('.currentPage').parent().next().find('a');

            if (next.parent().attr('id') == 'next-page') {
                return;
            }
            else {
                setStyle(next);
            }
        }
        else if (elem.attr('id') == 'prev-page') {
            var prev = elem.siblings().find('a').filter('.currentPage').parent().prev().find('a');

            if (prev.parent().attr('id') == 'prev-page') {
                return;
            }
            else {
                setStyle(prev);
            }
        }
        else {
            setStyle(currentElem);
        }
    }

}

function setStyle(elem){

    $(elem).css({
        'background-color': '#2F4133',
        'color': 'white'
    }).addClass('currentPage');

    $(".pagination > li > a").not(elem).not('#next-page').css({
        'background-color': 'white',
        'color':     '#337ab7'
    }).removeClass('currentPage');
}

var getRecordsPerPage = function (page, data){
    var array = [];
    var firstRecord = (page - 1) * 10;
    var lastRecord = firstRecord + 10;
    first = firstRecord;
    last= lastRecord;

    if(lastRecord > data.length? lastRecord = data.length: lastRecord = lastRecord);

    for(var i = firstRecord; i < lastRecord; i ++){
        array.push(data[i]);
    }

    return array;
};

var printRecords = function (records){

    $("#tbodyManagePaper").empty();
    records.forEach(function (value) {
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
        var str3 = "";
        var check = false;

        if(value.check == 'true') {
            str1 = "disabled";
            str2 = "disabled";
        }

        if(value.examPaper.paperStatus.id == 1){
            str1 = "disabled";
            str2 = "";

        }

        if(str1 == "disabled"){
            str3 = '<span class="glyphicon glyphicon-calendar release-exam" data-toggle="modal" papercode="'+value.examPaper.code+'" positionid="'+posiId+'" style="color: #00b5e5;" papername="'+paperName+'"></span>';
        }
        else{
            str3 = "";
        }

        var displayPaperStatus = "";
        if(value.examPaper.paperType.id == 1){
            displayPaperStatus = '<span class="label label-default">กำหนดเอง</span>&nbsp;';
        }

        if(value.examPaper.paperType.id == 2){
            displayPaperStatus = '<span class="label label-primary">สุ่ม</span>&nbsp;';
        }

        $("#tbodyManagePaper").append(
            '<tr>'+
            '<td style="display: none;"><label id="'+value.examPaper.id+'">'+value.examPaper.id+'</label></td>'+
            '<td class="pCheck"><input class="checkPaper" '+str1+' type="checkbox" check="'+check+'"/></td>'+
            '<td><label id="lpaperCode'+value.examPaper.code+'" class="paper-code">'+value.examPaper.code+'</label>&nbsp;' + str3 +'</td>'+
            //'<td><label id="lpaperCode'+value.examPaper.code+'">'+value.examPaper.code+'&nbsp;<span class="glyphicon glyphicon-calendar release-exam" data-toggle="modal" papercode="'+value.examPaper.code+'" positionid="'+posiId+'" data-target="#release-exam-modal" style="color: #00b5e5;"></span></label></td>'+
            '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+displayPaperStatus+paperName+'</label></td>'+
            '<td><label id="lpaperCreateBy'+value.examPaper.createBy.empId+'">'+value.examPaper.createBy.thFname+' '+value.examPaper.createBy.thLname+'</label></td>'+
            '<td><label id="lpaperScore'+value.examPaper.maxScore+'" class="label-control">'+value.examPaper.maxScore+'</label></td>'+
            '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
            '<td class="pSelect">'+
            '<select id="dropdownId'+value.examPaper.id+'" name="paperStatus"'+str2+' class="dropdown" style="color: white; width: 80px; text-align: center;">'+
            '<option value="1"><strong>เปิดใช้งาน</strong></option>'+
            '<option value="2">ปิดใช้งาน</option>'+
            '</td>'+
            '<td class="pButton"><button id="'+value.examPaper.id+'" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
            '</tr>'
        );
        presentStatus(value.examPaper.id, value.examPaper.paperStatus.id);
    });
};

var printRecordsSelectQuestion = function (result){
    dataFound();
    
    $("#tbodySelectQuestion").empty();
    result.forEach(function(value){

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
            '<td style="text-align: center; display: none;"><label id="labelDiffLevel'+value.id+'">'+value.difficultyLevel.level+'</td>'+
            '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

            '<td style="text-align: center; display: none;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
            '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

            '</tr>'
        );
    });
};

var totalPage = function(lenght, where){

    var allPages = Math.ceil(lenght / 10);
    var str = '';

    if(where === "paper"){
        for(var i = 1; i <= allPages; i ++){
            str = str + '<li><a>'+i+'</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where="paper"><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where="paper"><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where="paper"><a>&#x276f;</a></li>' +
            '<li id="last-page" where="paper"><a>&#x276f;&#x276f;</a></li>'
        );
    }

    else if(where === "questions"){
        for(var i = 1; i <= allPages; i ++){
            str = str + '<li><a>'+i+'</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where="questions"><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where="questions"><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where="questions"><a>&#x276f;</a></li>' +
            '<li id="last-page" where="questions"><a>&#x276f;&#x276f;</a></li>'
        );
    }
    else{
        for(var i = 1; i <= allPages; i ++){
            str = str + '<li><a>'+i+'</a></li>';
        }

        $('.pagination').empty();
        $('.pagination').append(
            '<li id="first-page" where=""><a>&#x276e;&#x276e;</a></li>' +
            '<li id="prev-page" where=""><a>&#x276e;</a></li>' +
            str +
            '<li id="next-page" where=""><a>&#x276f;</a></li>' +
            '<li id="last-page" where=""><a>&#x276f;&#x276f;</a></li>'
        );
    }
};

var showPaging = function(records){
    $('.paging').show();
    totalPage(records.length, "paper");
    setStyle($('#prev-page').next().find('a'));
    printRecords(getRecordsPerPage(1, records));
};

var notShowPaging = function(){
    $('.paging').hide();
    printRecords(records);
};

var showPagingSelectQuestions = function(records){
    $('#page-component').show();
    totalPage(records.length, "questions");
    setStyle($('#prev-page').next().find('a'));
    printRecordsSelectQuestion(getRecordsPerPage(1, records));
};

var notShowPagingSelectQuestions = function(){
    $('#page-component').hide();
    printRecordsSelectQuestion(records);
};

var getCurrentPageNumber = function(){
    return parseInt($('.currentPage').text());
}




