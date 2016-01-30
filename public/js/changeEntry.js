$(document).ready(init);

function init() {
    $('.saveIt').on('click', changeEntry);
}

function changeEntry() {
    var entry = {};

    entry.symbol = $('#symbol').val();
    entry.shares = parseFloat($('#shares').val()).toFixed(0);
    entry.description = $('#description').val();



    var itemId = $('#id').val();
    $.ajax({
            method: 'PUT',
            url: '/operations/' + itemId,
            data: entry
        })
        .done(function (data, status) {
            location.href('/');
        });

}

