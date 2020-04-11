function setSensorInformation(entity) {
    document.getElementById("informationBoxSensorId").innerHTML = entity._id;
    document.getElementById("informationBoxSensorType").innerHTML = entity._name;
    document.getElementById("informationBoxSensorDeploymentDate").innerHTML = entity.deploymentDate;
    document.getElementById("informationBoxSensorRegionName").innerHTML = entity.regionName;
    document.getElementById("informationBoxLatitude").innerHTML = entity.latitude;
    document.getElementById("informationBoxLongitude").innerHTML = entity.longitude;
}

function getMinAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMinAQ.php?id=" + sensorId,
        datatype: "json",
        success: function (data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxMinimum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMinimum").innerHTML = sensorData.minAirQuality + "%";
            }
        }
    });
}

function getMaxAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMaxAQ.php?id=" + sensorId,
        datatype: "json",
        success: function (data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxMaximum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMaximum").innerHTML = sensorData.maxAirQuality + "%";
            }
        }
    });
}

function getMostRecentAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMostRecentAQ.php?id=" + sensorId,
        datatype: "json",
        success: function (data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = "No air quality readings";
                document.getElementById("informationBoxLastUpdated").innerHTML = "No air quality readings";
                document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                var sensorLastUpdated = "<b>No current readings for this sensor. </b>"
                noDataWarning(sensorLastUpdated);
            } else {
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = sensorData.airQuality + "%";
                document.getElementById("informationBoxLastUpdated").innerHTML = sensorData.dateTime;

                var lastUpdated = sensorData.dateTime.split("-").join("/");
                var lastUpdatedDate = Date.parse(lastUpdated);
                var currentDate = Date.parse(new Date());
                var oneHour = 60 * 60 * 1000;

                if ((currentDate - lastUpdatedDate) < oneHour) {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Online";
                } else {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                    var sensorLastUpdated = "<b>This sensor has been offline since: </b>" + sensorData.dateTime;
                    noDataWarning(sensorLastUpdated);
                }
            }
        }
    });
}
function createInformationBox(viewer, entity) {
    if (entity !== undefined) {
        if (entity.type === "sensorPoint") {
            $(document.getElementById("regionInformationBox")).modal('hide');

            setSensorInformation(entity);
            //gets the most recend air quality record with dateTime based on sensor id
            getMostRecentAQ(viewer.selectedEntity._id);
            //gets the the max reading of air quality record based on sensor id
            getMaxAQ(viewer.selectedEntity._id);
            //gets the the min reading of air quality record based on sensor id
            getMinAQ(viewer.selectedEntity._id);

            //gets the last 100 readings of air quality and dateTime based on sensor id
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getLast100AQ.php?id=" + viewer.selectedEntity._id,
                datatype: "json",
                success: function (data) {
                    //chart js
                    var sensorData = $.parseJSON(data);
                    var last100AQ;
                    requirejs(['chartjs'], function () {
                        var airQualityReadings = [];
                        var dateTimeReadings = [];
                        if (sensorData === null) {
                            document.getElementById("noChartData").innerHTML = "No Air Quality data available";
                        } else {
                            last100AQ = sensorData.last100AQ;
                            for (var i = 0; i < last100AQ.length; i++) {
                                if (last100AQ[i] === null) {
                                    document.getElementById("noChartData").innerHTML = "No Air Quality data available";
                                } else {
                                    document.getElementById("noChartData").innerHTML = "";
                                    airQualityReadings.push(last100AQ[i].airQuality);
                                    dateTimeReadings.push(last100AQ[i].dateTime);
                                }
                            }
                        }
                        var chartElement = document.getElementById("sensorChart").getContext("2d");
                        createChart(dateTimeReadings, airQualityReadings, chartElement);
                    });

                }

            });
            $(document.getElementById("informationBox")).modal('show');
        }
        if (entity.type === "filterRegion") {
            $(document.getElementById("informationBox")).modal('hide');

            document.getElementById("informationBoxRegionName").innerHTML = entity._description;
            document.getElementById("informationBoxRegionId").innerHTML = entity._name;
            document.getElementById("informationBoxRegionCountry").innerHTML = entity.country;
            if (entity.airQuality === undefined) {
                document.getElementById("informationBoxRegionAQ").innerHTML = "No sensors in this region";
            } else {
                document.getElementById("informationBoxRegionAQ").innerHTML = entity.airQuality + "%";
            }
            $(document.getElementById("regionInformationBox")).modal('show');
        }
    }
}