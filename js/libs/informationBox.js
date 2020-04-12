// Sets the sensor information in the information box
function setSensorInformation(entity) {
    document.getElementById("informationBoxSensorId").innerHTML = entity._id;
    document.getElementById("informationBoxSensorType").innerHTML = entity._name;
    document.getElementById("informationBoxSensorDeploymentDate").innerHTML = entity.deploymentDate;
    document.getElementById("informationBoxSensorRegionName").innerHTML = entity.regionName;
    document.getElementById("informationBoxLatitude").innerHTML = entity.latitude;
    document.getElementById("informationBoxLongitude").innerHTML = entity.longitude;
}

// Gets the minimum air quality data for a sensorID
function getMinAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMinAQ.php?id=" + sensorId,
        datatype: "json",
        success: function(data) {
            var sensorData = $.parseJSON(data);

            // Checks if there is sensor data and fills out information box accordingly
            if (sensorData === null) {
                document.getElementById("informationBoxMinimum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMinimum").innerHTML = sensorData.minAirQuality + "%";
            }
        }
    });
}

// Gets the maximum air quality data for a sensorID
function getMaxAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMaxAQ.php?id=" + sensorId,
        datatype: "json",
        success: function(data) {
            var sensorData = $.parseJSON(data);

            // Checks if there is sensor data and fills out information box accordingly
            if (sensorData === null) {
                document.getElementById("informationBoxMaximum").innerHTML = "No air quality readings";
            } else {
                document.getElementById("informationBoxMaximum").innerHTML = sensorData.maxAirQuality + "%";
            }
        }
    });
}

// Gets the most recent air quality data for a sensorID
function getMostRecentAQ(sensorId) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getMostRecentAQ.php?id=" + sensorId,
        datatype: "json",
        success: function(data) {
            var sensorData = $.parseJSON(data);

            // Checks if there is sensor data
            if (sensorData === null) {

                // If there are no air quality readings the information box is filled out accordingly
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = "No air quality readings";
                document.getElementById("informationBoxLastUpdated").innerHTML = "No air quality readings";
                document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                var sensorLastUpdated = "<b>No current readings for this sensor. </b>";

                // A warning is displayed - found in warnings.js
                noDataWarning(sensorLastUpdated);

            } else {
                // Sets the most recent air quality and dateTime in the information box
                document.getElementById("informationBoxCurrentAirQuality").innerHTML = sensorData.airQuality + "%";
                document.getElementById("informationBoxLastUpdated").innerHTML = sensorData.dateTime;

                // Creates values to check if the sensor is online
                var lastUpdated = sensorData.dateTime.split("-").join("/");
                var lastUpdatedDate = Date.parse(lastUpdated);
                var currentDate = Date.parse(new Date());
                var oneHour = 60 * 60 * 1000;

                // Checks if the sensor is online and fills out information box accordingly
                if ((currentDate - lastUpdatedDate) < oneHour) {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Online";
                } else {
                    document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                    var sensorLastUpdated = "<b>This sensor has been offline since: </b>" + sensorData.dateTime;
                    // A warning is displayed - found in warnings.js
                    noDataWarning(sensorLastUpdated);
                }
            }
        }
    });
}

// Creates the information box for either the region or the sensor
function createInformationBox(viewer, entity) {
    if (entity !== undefined) {
        //Checks if the entity type is of 'sensorPoint'
        if (entity.type === "sensorPoint") {

            // Hides the region information box modal
            $(document.getElementById("regionInformationBox")).modal('hide');

            // Gets & sets sensor informaiton/data in the information box
            setSensorInformation(entity);
            getMostRecentAQ(viewer.selectedEntity._id);
            getMaxAQ(viewer.selectedEntity._id);
            getMinAQ(viewer.selectedEntity._id);

            // Gets the last 100 readings of air quality and dateTime based on sensorID
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getLast100AQ.php?id=" + viewer.selectedEntity._id,
                datatype: "json",
                success: function(data) {
                    var sensorData = $.parseJSON(data);
                    var last100AQ;

                    // Uses chartjs for the chart in the information box
                    requirejs(['chartjs'], function() {
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
                        // Chart element
                        var chartElement = document.getElementById("sensorChart").getContext("2d");
                        // Creates the chart for the sensor - found in CreateChart.js
                        createChart(dateTimeReadings, airQualityReadings, chartElement);
                    });

                }

            });
            // Shows the sensor information box
            $(document.getElementById("informationBox")).modal('show');
        }
        // Checks if the entity is of type 'filterRegion'
        if (entity.type === "filterRegion") {

            // Hides the sensor information box
            $(document.getElementById("informationBox")).modal('hide');

            // Sets the region information
            document.getElementById("informationBoxRegionName").innerHTML = entity._description;
            document.getElementById("informationBoxRegionId").innerHTML = entity._name;
            document.getElementById("informationBoxRegionCountry").innerHTML = entity.country;

            // Checks if the region average air quality is defined and sets accordingly
            if (entity.airQuality === undefined) {
                document.getElementById("informationBoxRegionAQ").innerHTML = "No sensors in this region";
            } else {
                document.getElementById("informationBoxRegionAQ").innerHTML = entity.airQuality + "%";
            }
            // Shows the region information box
            $(document.getElementById("regionInformationBox")).modal('show');
        }
    }
}