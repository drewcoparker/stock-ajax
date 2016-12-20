// Drew Parker
// 19 Dec 2016

$(function() {

// as soon as page loads, grab out of localStorage what ever the user has searched for


    $('#arrow1').click(function() {
        $('#page-1, #page-2').css({
            'right':'100vw'
        });
    });

    $('#arrow2').click(function() {
        $('#page-1, #page-2').css({
            'right':'0vw'
        });
    });




    $('.yahoo-form').submit(function() {
        // Stop the form from submitting (the default action)
        event.preventDefault();
        symbol = $('#symbol').val();
        // Take this out of the submit event and put it in a button witin the rows
        localStorage.setItem("userStocks", symbol);
        var userStocksSaved = localStorage.getItem('userStocks').split(',');
        // console.log(typeof(userStocksSaved));
        // submitted = true;
        getStockRequest(symbol);
        // setInterval(getStockRequest(symbol), 1000);
    });




    $('.my-stock').click(function() {
        console.log("it works");
    }); 



    // Builds rows for all stock requests
    function buildStockRow(stock) {
        var newHTML = '';
        for (let i = 0; i < stock.length; i++){
            if (stock[i].Change.indexOf('+') > -1) {
                var classChange = "success";
            } else {
                var classChange = "danger";
            }
            newHTML += '<tr>';
                newHTML += '<td><button type="button" class="btn btn-success my-stock">Save stock</button></td>';
                newHTML += '<td>'+stock[i].Symbol+'</td>';
                newHTML += '<td>'+stock[i].Name+'</td>';
                newHTML += '<td>'+stock[i].Ask+'</td>';
                newHTML += '<td>'+stock[i].Bid+'</td>';
                newHTML += '<td class="'+classChange+'">'+stock[i].Change+'</td>';
            newHTML += '</tr>';

        }
        $('#stock-body').html(newHTML);
        return;
    }


    // make get JSON into a function
    // instead of auto-saving symbols, you give them a save button: have a button
    // that shows up send those symbols to an arry that you can later retreieve
    function getStockRequest(symbolRequest) {
        var stockArray = [];
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+ symbolRequest +'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'

        $.getJSON(url, function(JSONfound) {
            var quote = JSONfound.query.results.quote;
            if (JSONfound.query.count === 1) {
                stockArray.push(quote);
            } else {
                for (let i = 0; i < quote.length; i++) {
                    stockArray.push(quote[i]);
                }
            }
            return buildStockRow(stockArray);
        });
    }




// Closes doc ready
});
