$(document).ready(init);

function init() {
    console.log('inside init of makeEntry.js');

    $('.btn-success').on('click', makeEntry);
}

function makeEntry() {
    var symbol = $('#symbol').val();
    /*
    var price = $('#price').val();
    */
    var shares = $('#shares').val();
    var description = $('#description').val();
    var pos = {
        item: symbol,
        //price: parseFloat(price).toFixed(2),
        shares: parseFloat(shares).toFixed(0),
        description: description
    };


    $.post('/operations', pos)
        .success(function (data) {
            alert('Position is saved.');


        });
}