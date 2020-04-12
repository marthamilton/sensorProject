// Adds Cesium points to the map - gets all sensors and information from the database
function addCesiumPoints(Cesium, viewer) {
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getCesiumEntityInformation.php",
        datatype: "json",
        success: function(data) {
            var sensorData = $.parseJSON(data);
            for (var i = 0; i < sensorData.length; i++) {
                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(parseFloat(sensorData[i].sensorLongitude), parseFloat(sensorData[i].sensorLatitude)),
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.FIREBRICK
                    },
                    name: sensorData[i].sensorType,
                    id: sensorData[i].sensorID,
                    longitude: sensorData[i].sensorLongitude,
                    latitude: sensorData[i].sensorLatitude,
                    deploymentDate: sensorData[i].sensorDeploymentDate,
                    regionName: sensorData[i].regionName,
                    type: "sensorPoint"
                });
            };
        }
    });
}