$(document).ready(function () {
    $("#advanceBtn").click(function () {
        if ($('#advanceBtn span').hasClass('glyphicon-triangle-bottom')) {
            $('#advanceBtn span').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
            $('#btnSearch').hide();
            $('#btnAdvanceSearch').show();
        }
        else {
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