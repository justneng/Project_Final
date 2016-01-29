var records = null;

$(document).ready(function(){
    $('.pagination').on('click', 'li > a', function(){
        currentPage($(this));
    });
});

function currentPage(currentElem){
    var elem = currentElem.parent();

    if(elem.attr('id') == 'first-page'){
        var first = elem.siblings().find('a:contains("1")');
        printRecords(getRecordsPerPage(Number(first.text()), records));
        setStyle(first);
    }
    else if(elem.attr('id') == 'last-page'){
        var last = elem.siblings().find('a:contains("'+ Math.ceil(records.length / 5) +'")');
        printRecords(getRecordsPerPage(Number(last.text()), records));
        setStyle(last);
    }
    else if(elem.attr('id') == 'next-page'){
        var next = elem.siblings().find('a').filter('.currentPage').parent().next().find('a');

        if(next.parent().attr('id') == 'next-page'){
            return;
        }
        else{
            printRecords(getRecordsPerPage(Number(next.text()), records));
            setStyle(next);
        }
    }
    else if(elem.attr('id') == 'prev-page'){
        var prev = elem.siblings().find('a').filter('.currentPage').parent().prev().find('a');

        if(prev.parent().attr('id') == 'prev-page'){
            return;
        }
        else{
            printRecords(getRecordsPerPage(Number(prev.text()), records));
            setStyle(prev);
        }
    }
    else{
        printRecords(getRecordsPerPage(Number(currentElem.text()), records));
        setStyle(currentElem);
    }
}

function setStyle(elem){

    $(elem).css({
        'background-color': '#2F4133',
        'color': 'white'
    }).addClass('currentPage');

    $(".pagination > li > a").not(elem).not('#next-page').css({
        'background-color': 'white',
        'color': '#337ab7'
    }).removeClass('currentPage');
}

var getRecordsPerPage = function (page, data){
    var array = [];
    var firstRecord = (page - 1) * 5;
    var lastRecord = firstRecord + 5;
    if(lastRecord > data.length? lastRecord = data.length: lastRecord = lastRecord);

    for(var i = firstRecord; i < lastRecord; i ++){
        array.push(data[i]);
    }

    return array;
};

var printRecords = function (records){

    paperFound();
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
        var check = false;

        if(value.check == 'true') {
            str1 = "disabled";
            str2 = "disabled";
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
            '<select id="dropdownId'+value.examPaper.id+'" name="paperStatus"'+str2+' class="dropdown" style="color: white; width: 80px; text-align: center;">'+
                //'<option value="3">ยังไม่เผยแพร่</option>'+
            '<option value="1"><strong>เปิดใช้งาน</strong></option>'+
            '<option value="2">ปิดใช้งาน</option>'+
            '</select>'+
            '</td>'+
            '<td class="pButton"><button id="'+value.examPaper.id+'" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
            '</tr>'
        );
        presentStatus(value.examPaper.id, value.examPaper.paperStatus.id);
    });
};

var totalPage = function(lenght){

    var allPages = Math.ceil(lenght / 5);
    var str = '';

    for(var i = 1; i <= allPages; i ++){
        str = str + '<li><a>'+i+'</a></li>';
    }

    $('.pagination').empty();
    $('.pagination').append(
        '<li id="first-page"><a>&#x276e;&#x276e;</a></li>' +
        '<li id="prev-page"><a>&#x276e;</a></li>' +
        str +
        '<li id="next-page"><a>&#x276f;</a></li>' +
        '<li id="last-page"><a>&#x276f;&#x276f;</a></li>'
    );
};

var showPaging = function(records){
    $('.paging').show();
    totalPage(records.length);
    setStyle($('#prev-page').next().find('a'));
    printRecords(getRecordsPerPage(1, records));
};

var notShowPaging = function(){
    $('.paging').hide();
    printRecords(records);
};
