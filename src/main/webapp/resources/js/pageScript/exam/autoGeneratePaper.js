$(document).ready(function(){
    $(document).ajaxStart(function(){
        $("#waiting-icon").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $("#waiting-icon").css("display", "none");

    });

    $('#generate-paper-tab').on('click', function(){
        onLoadPage();
    });

    $('#tbody-generate-papers').on('click', '.do-exam', function(){
        var $cid = $(this).attr('cid');
        generatePaper($cid);
    });

    $('#tbody-generate-papers').on('click', '.do-exam-exist', function(){
        var $paperId = $(this).attr('cid');
        location.href= context+"/TDCS/exam/doExamGenerate?paperId="+$paperId;
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

function onLoadPage(){
    $.ajax({
        type: "POST",
        url: context + "/TDCS/exam/getAvailablePaper",
        async: false,
        success: function(data){
            data.forEach(function(value){
                var papers = value[0];
                var category = value[1];
                var str = '';

                if(Number(category.numberOfQuestions) >= 10){
                    str = '<td>'+category.category.name+'&nbsp;<span class="badge" style="background-color: #00b5e5;">'+category.numberOfQuestions+'</span></td>'+
                          '<td><button cid="'+category.category.id+'" class="btn btn-link btn-sm" type="button" data-toggle="collapse" data-target=".select-paper'+category.category.id+'">'+
                            'เลือกชุดข้อสอบ&nbsp;<span class="caret"></span></button></td>';
                }
                else{
                    str = '<td>'+category.category.name+'&nbsp;<span class="badge" style="background-color: darkgray;">'+category.numberOfQuestions+'</span></td>'+
                          '<td><button class="btn btn-primary btn-sm disabled" type="button">ข้อสอบไม่เพียงพอ</button></td>';
                }

                $('#tbody-generate-papers').append(
                    '<tr>'+
                    str+
                    '</tr>'
                );

                if(papers != null){
                    var no = papers.length + 1;
                    var str2 = '';
                    papers.forEach(function(val){
                        if(val == null){
                            return;
                        }
                        else{
                            if(val.alreadyMarking == true){
                                str2 = str2 + '<tr class="collapse select-paper'+category.category.id+'">'+
                                    '<td><span class="glyphicon glyphicon-open-file"></span> '+val.paper.name+'&nbsp;</td>'+
                                    '<td><button class="btn btn-block btn-sm disabled" type="button">ทำชุดข้อสอบนี้แล้ว</button></td>'+
                                    '</tr>'
                            }
                            else{
                                str2 = str2 + '<tr class="collapse select-paper'+category.category.id+'">'+
                                    '<td><span class="glyphicon glyphicon-open-file"></span> '+val.paper.name+'&nbsp;<span class="badge available">Available</span></td>'+
                                    '<td><button cid="'+val.paper.id+'" class="btn btn-primary btn-sm active do-exam-exist" type="button">เริ่มทำข้อสอบ</button></td>'+
                                    '</tr>'
                            }
                        }
                    });

                    $('#tbody-generate-papers').append(
                            str2+
                            '<tr class="collapse select-paper'+category.category.id+'">'+
                                '<td>'+
                                    '<span class="glyphicon glyphicon-open-file"></span>'+
                                    '<span class="newTemplate glyphicon glyphicon-plus"> '+category.category.name+' ครั้งที่ '+no+'</span>'+
                                '</td>'+
                                '<td>'+
                                    '<button cid="'+category.category.id+'" class="btn btn-primary btn-sm active do-exam" type="button">'+
                                    'เริ่มทำข้อสอบ'+
                                    '</button>'+
                                '</td>'+
                            '</tr>'
                    );
                }
                else{
                    var no = 0;
                    if(papers == null){
                        no = 1;
                    }
                    else{
                        papers.length + 1
                    }
                    $('#tbody-generate-papers').append(
                        str2+
                        '<tr class="collapse select-paper'+category.category.id+'">'+
                        '<td>'+
                        '<span class="glyphicon glyphicon-open-file"></span>&nbsp;'+
                        '<span class="newTemplate glyphicon glyphicon-plus">&nbsp;'+category.category.name+' ครั้งที่ '+no+'</span>'+
                        '</td>'+
                        '<td>'+
                        '<button cid="'+category.category.id+'" class="btn btn-primary btn-sm active do-exam" type="button">'+
                        'เริ่มทำข้อสอบ'+
                        '</button>'+
                        '</td>'+
                        '</tr>'
                    );
                }
            });
        },
        error: function(){
            alert('error');
        }
    })
}