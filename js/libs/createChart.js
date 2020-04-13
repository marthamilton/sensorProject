// Creates a chart for the sensor selected (last 100 pieces of data - just over 24 hours if the sensor is online)
function createChart(dateTimeReadings, airQualityReadings, chartElement) {
    var chart = new Chart(chartElement, {
        type: "line",
        data: {
            labels: dateTimeReadings.reverse(),
            datasets: [{
                label: "Air Quality",
                fill: false,
                backgroundColor: 'rgb(15,161,230)',
                borderColor: 'rgb(15,161,230)',
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
                            var time = item.substring(11, 19);
                            if (!(index % 20)) return time;
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
    var today = new Date();
    var month = '' + (today.getMonth() + 1);
    var day = '' + today.getDate();
    var year = today.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    var todayDate = [year, month, day].join('/'); 
            
    for (i = 0; i < chart.data.labels.length; i++) {
        var dateTime = chart.data.labels[i].split("-").join("/");
        var dateReading = dateTime.substring(0, 10);

        if (todayDate !== dateReading) {
            chart.getDatasetMeta(0).data[i].custom = {
                backgroundColor: 'rgb(178, 34, 34)',
                borderColor: 'rgb(178, 34, 34)',

            };
        } 
    }
    chart.update();

    // Destorys the chart when the sensor information box is closed
    $('#informationBox').on('hidden.bs.modal', function() {
        chart.destroy();
    });
}