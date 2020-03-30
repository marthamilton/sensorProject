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
        success: function(data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxMinimum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMinimum").innerHTML = sensorData.airQuality + "%";
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
        success: function(data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxMaximum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMaximum").innerHTML = sensorData.airQuality + "%";
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
        success: function(data) {
            var sensorData = $.parseJSON(data);
            if (sensorData === null) {
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = "No air quality readings";
                document.getElementById("informationBoxLastUpdated").innerHTML = "No air quality readings";
                document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                var sensorLastUpdated = "No current readings for this sensor"
                noDataWarning(sensorLastUpdated);
            } else {
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = sensorData.airQuality + "%";
                document.getElementById("informationBoxLastUpdated").innerHTML = sensorData.dateTime;

                var lastUpdated = new Date(sensorData.dateTime);
                var oneHour = 60 * 60 * 1000;
                if ((new Date() - lastUpdated) < oneHour) {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Online";
                } else {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                    var sensorLastUpdated = "Last date-time sensor reading: " + sensorData.dateTime;
                    noDataWarning(sensorLastUpdated);
                }
            }
        }
    });
}