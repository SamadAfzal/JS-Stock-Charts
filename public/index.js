async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    fetch ('https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=4ace3cf119c944f8bf07f73762c4824a')
     .then((response) => response.json())
     .then((data) => console.log(data))

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(Chart)

    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.reverse().map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

     // Highest Stock Price
     new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(value => getHighestValue(value.values)),
                backgroundColor:  stocks.map(value => getColor(value.meta.symbol)),
                borderColor: stocks.map(value => getColor(value.meta.symbol)),
            }]
        }
    });

    // Average Stock Price
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(value => getAverageValue(value.values)),
                backgroundColor:  stocks.map(value => getColor(value.meta.symbol)),
                borderColor: stocks.map(value => getColor(value.meta.symbol)),
            }]
        }
    });

    console.log(stocks[0].values)                                           
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

function getHighestValue(values) {
    return values.map(value => value.high).sort((a,b) => parseFloat(b) - parseFloat(a))[0]
}

function getAverageValue(values) {
    return values.map(value => value.high).reduce((a,b) => parseFloat(a) + parseFloat(b)) / values.length
}

main()   