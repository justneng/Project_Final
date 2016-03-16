$(document).ready(function () {

    $("#advanceBtn").click(function () {
        if ($('#advanceBtn').attr('status') == 'down'){
            $('#advanceBtn').attr('status', 'top');
            $('#advanceBtn').removeClass('in');
            $('#advanceBtn span').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
            $('#btnSearch').hide();
            $('#btnAdvanceSearch').show();
        }
        else{
            $('#advanceBtn').attr('status', 'down');
            $('#advanceBtn').addClass('in');
            $('#advanceBtn span').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
            $('#btnAdvanceSearch').hide();
            $('#btnSearch').show();
        }
    });

    $("#searchCreateDateFromInput").datepicker().on('changeDate', function () {
        $("#searchCreateDateFromInput").datepicker('hide');
    });
    $("#searchCreateDateToInput").datepicker().on('changeDate', function () {
        $("#searchCreateDateToInput").datepicker('hide');
    });

    $("#createDateFromBtn").on('click', function () {
        var input = $("#searchCreateDateFromInput");
        input.datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true,
            endDate: 'd'
        });
        input.focus();
    });

    $("#createDateToBtn").on('click', function () {
        var input = $("#searchCreateDateToInput");
        input.datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true,
            endDate: 'd'
        });
        input.focus();
    });
});