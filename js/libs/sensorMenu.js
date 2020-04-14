// Creates sensor menu 
function createSensorMenu(viewer, Cesium, england, wales, countyAverage) {
    var cesiumSensors = viewer.entities._entities._array;

    // Removes all datasources
    viewer.dataSources.removeAll();
    // Sets default for checkboxes
    england.checked = false;
    wales.checked = true;
    countyAverage.checked = true;

    // Checks to see if there are points on the map
    if (cesiumSensors.length === 0 || cesiumSensors === undefined) {
        // Adds Cesium points to the map - found in createCesiumPoints.js
        addCesiumPoints(Cesium, viewer);
    }

    // For every sensor 
    for (var i = 0; i < cesiumSensors.length; i++) {
        // If there is no sensor box in the menu 
        if (!document.getElementById("coloumnDiv" + cesiumSensors[i]._id)) {
            // Creates new sensor menu box 
            createNewSensorMenuBox(cesiumSensors[i]);
        }

        // When the user clicks on the 'Find Sensor' in a sensor menu box, the map is zoomed into the selected sensor and the menu is closed
        let sensorLatitude = cesiumSensors[i].latitude;
        let sensorLongitude = cesiumSensors[i].longitude;
        document.getElementById("findButton" + cesiumSensors[i]._id).addEventListener("click", function() {
            $('#sensors').modal('hide');
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(sensorLongitude, sensorLatitude, 1000.0),
                duration: 3.0
            });
        });
    };
}

// Creates new sensor menu box
function createNewSensorMenuBox(sensor) {

    var coloumnDiv = document.createElement("div");
    coloumnDiv.setAttribute('class', 'col-sm-4 text-center sensorMenuPadding');
    coloumnDiv.setAttribute('id', 'coloumnDiv' + sensor._id);

    // Checks the type of sensor for where to add in the menu
    if (sensor._name === "Air Quality") {
        document.getElementById("AQSensorGrid").appendChild(coloumnDiv);
    } else {
        document.getElementById("otherSensorGrid").appendChild(coloumnDiv);
    }

    var boxDiv = document.createElement("div");
    boxDiv.setAttribute('class', 'sensorMenuBox');
    boxDiv.setAttribute('id', 'boxDiv' + sensor._id);
    document.getElementById('coloumnDiv' + sensor._id).appendChild(boxDiv);

    var informationDiv = document.createElement("div");
    informationDiv.setAttribute('class', 'sensorMenuInformationDiv');
    informationDiv.setAttribute('id', 'informationDiv' + sensor._id);
    document.getElementById('boxDiv' + sensor._id).appendChild(informationDiv);

    var sensorIdElement = document.createElement("p");
    sensorIdElement.textContent = "Sensor Id: " + sensor._id;
    document.getElementById('informationDiv' + sensor._id).appendChild(sensorIdElement);

    var sensorRegionElement = document.createElement("p");
    sensorRegionElement.textContent = "Region: " + sensor.regionName;
    document.getElementById("informationDiv" + sensor._id).appendChild(sensorRegionElement);

    var sensorlongitudeElement = document.createElement("p");
    sensorlongitudeElement.textContent = "Longitude: " + sensor.longitude;
    document.getElementById("informationDiv" + sensor._id).appendChild(sensorlongitudeElement);

    var sensorlatitudeElement = document.createElement("p");
    sensorlatitudeElement.textContent = "Latitude: " + sensor.latitude;
    document.getElementById("informationDiv" + sensor._id).appendChild(sensorlatitudeElement);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute('class', 'sensorMenuButtonDiv');
    buttonDiv.setAttribute('id', 'buttonDiv' + sensor._id);
    document.getElementById('boxDiv' + sensor._id).appendChild(buttonDiv);

    var findElement = document.createElement("button");
    findElement.textContent = "Find Sensor";
    findElement.setAttribute('class', 'btn btn-primary');
    findElement.setAttribute('id', 'findButton' + sensor._id);
    findElement.setAttribute('type', 'button');
    findElement.setAttribute('data-dismiss', 'modal');
    document.getElementById("buttonDiv" + sensor._id).appendChild(findElement);
}