/**
 * Created by wanchana on 11/4/2559.
 */

$(document).ready(function(){
    $('#select-paper-type').on('change', function(){
        if($('#select-paper-type').val() == 'random'){
            $('#div-random-questions').show();
            $('#div-save-create-paper').hide();
            $('#span-random-questions').show();
        }
        if($('#select-paper-type').val() == 'static'){
            $('#div-random-questions').hide();
            $('#div-save-create-paper').show();
            $('#span-random-questions').hide();
        }
    });
});