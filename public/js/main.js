var sumCost = 0;
var rowArray = [];
var itemArray = [];


$(document).ready(init);



function init() {

    //alert('inside init of main.js');
    $('.items-list').on('click', '.detail-col', showDetail);
    $('.items-list').on('click', '.change-col', changeEntry);
    $('.items-list').on('click', '.delete-col', deleteEntry);
    showList();
}



function changeEntry() {
    var indexOfItem = $(this).closest('.row-container').index()-1;
    var itemObject = itemArray[indexOfItem];
    var itemId = itemObject._id;
    location.href = '/changeEntry' + itemId;
}

function deleteEntry() {

    var index = $(this).closest('.row-container').index()-1;

    var id = itemArray[index].symbol;



    $.ajax({
            method: "DELETE",
            url: "/operations/" + id
        })
        .done(function (status) {
            sumCost = 0;
            showList();
        });


}

function findSum() {
    itemArray.map(function (item, index) {
        return sumCost += item.price * item.shares;
    });
}


function showDetail() {
    var index = $(this).closest('.row-container').index()-1;
    var id = itemArray[index]._id;
    location.href = '/itemDetails' + id;
}



function makeTable() {
    $('.items-list').empty();  // empty the html table
    rowArray.splice(0, rowArray.length); //empty the global array

    var $headers = $('<tr>').addClass('row row-container row-title');

    var $itemHeader = $('<th>').addClass('symbol-col col-md-2 col-xs-2').text('symbol');
    var $costHeader = $('<th>').addClass('symbol-col col-md-1 col-xs-1').text('price');
    var $numberHeader = $('<th>').addClass('symbol-col col-md-1 col-xs-1').text('shares');
    $headers.append($itemHeader);
    $headers.append($costHeader);
    $headers.append($numberHeader);

    rowArray.push($headers);

    itemArray.map(function (entry) {
        var $row = $('<tr>').addClass('row row-container');
        var $item = $('<td>').addClass('symbol-col col-md-2 col-xs-2 text-left').text(entry.symbol);
        var $cost = $('<td>').addClass('price-col col-md-1 col-xs-1').text('$' + entry.price.toFixed(2));
        var $number = $('<td>').addClass('shares-col col-md-1 col-xs-1').text('' + entry.shares);
        var $details = $('<td>').addClass("detail-col col-md-2 col-xs-2 btn-info btn-rounded  details").text('Details');
        var $spaceColumn = $('<td>').addClass("space-col col-md-1 col-xs-1").text(' ');
        var $change = $('<td>').addClass("change-col col-md-2 col-xs-2 btn-primary btn-rounded changeEntry").text('Change');
        var $spaceColumn2 = $('<td>').addClass("space-col col-md-1 col-xs-1").text(' ');
        var $delete = $('<td>').addClass("delete-col col-md-2 col-xs-2 btn-danger btn-rounded deleteEntry").text('Delete');
        $row.append($item);
        $row.append($cost);
        $row.append($number);
        $row.append($details);
        $row.append($spaceColumn);
        $row.append($change);
        $row.append($spaceColumn2);
        $row.append($delete);
        rowArray.push($row);
    });

}

function showList() {
    $.get('/operations', function (data) {
        itemArray = data.positions;
        if ((itemArray.length===0) || (typeof itemArray[0] != 'undefined'))
            return;
        var i;
        for (i=0; i < itemArray.length; ++i)
        {
            $.post('/operations/price', {sym: entry.symbol}).success(function(data) {
                itemArray[i].price = data.LastPrice;
            });
        }

        findSum();
        makeTable();
        showTable();
    });
}


function showTable() {
    $('.items-list').append(rowArray);
    $('.bottomLine').text(''+sumCost.toFixed(2));
}