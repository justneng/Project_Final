$(document).ready(function(){
    var searchSubCategory;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllCategory",
        async: false,
        success: function(data){
            data.forEach(function(value){
                $("#selectCategoryToSelection").append(
                    '<option value="'+value.id+'">'+value.id+ " : "+value.name+'</option>'
                )
            });
        }
    });
    $("#selectCategoryToSelection").on('change', function(){
        $("#selectSubCategoryToSelection").empty();
        searchSubCategory = this.value;
        var subCategory = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getSubCategoryByCategoryId",
            data: searchSubCategory,
            async: false,
            success: function(data){
                data.forEach(function(val){
                    $("#selectSubCategoryToSelection").append(
                        '<option value="'+val.id+'">'+val.id + " : " +val.name+'</option>'
                    )
                });
            }
        });
    });
});
