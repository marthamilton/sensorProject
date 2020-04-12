// Creates a chart for the sensor selected (last 100 pieces of data - just over 24 hours if the sensor is online)
function createChart(dateTimeReadings, airQualityReadings, chartElement) {
    var chart = new Chart(chartElement, {
        type: "line",
        data: {
            labels: dateTimeReadings.reverse(),
            datasets: [{
                label: 'Air Quality',
                fill: false,
                backgroundColor: 'rgb(178, 34, 34)',
                borderColor: 'rgb(178, 34, 34)',
                data: airQualityReadings.reverse()
            }]
        },
        options: {
            tooltips: {
                displayColors: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 10,
                        userCallback: function(item, index) {
                            var date = item.substring(0, 10);
                            if (!(index % 20)) return date;
                        },
                        autoSkip: false
                    },
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 20
                    }
                }]
            }
        }
    });
    // Destorys the chart when the sensor information box is closed
    $('#informationBox').on('hidden.bs.modal', function() {
        chart.destroy();
    });
}