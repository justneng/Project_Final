var getSearchCreateByInput = function(){
    return $('#selectCreateBySearchInput').val();
}

var clearCreateByInput = function(){
    $('#selectCreateBySearchInput').val("");
}

// Add by Mr.Wanchana
$("#addEmpCreateByBtn").on('click', function(){
    searchEmpName();
});


// Add by Mr.Wanchana
var getUserIds = function (){
    var itemLenght = ($("#showEmployeeSelected").children("button")).length;
    var arrayEmpIdToQuery = new Array();
    for (var i = 0; i < itemLenght; i++) {
        var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
        temp = temp.substring(temp.indexOf('_')+1, temp.indexOf('z'));
        arrayEmpIdToQuery.push(temp);
    }

    return arrayEmpIdToQuery;
}