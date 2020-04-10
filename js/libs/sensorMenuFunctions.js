function createNewSensorMenuBox(sensor){
    if (sensor._name === "Air Quality") {
        var coloumnDiv = document.createElement("div");
        coloumnDiv.setAttribute('class', 'col-sm-4 text-center sensorMenuPadding');
        coloumnDiv.setAttribute('id', 'coloumnDiv' + sensor._id);

        document.getElementById("AQSensorGrid").appendChild(coloumnDiv);

        var boxDiv = document.createElement("div");
        boxDiv.setAttribute('class', 'sensorMenuBox');
        boxDiv.setAttribute('id', 'boxDiv' + sensor._id);
        document.getElementById('coloumnDiv' + sensor._id).appendChild(boxDiv);

        var sensorIdElement = document.createElement("p");
        sensorIdElement.textContent = "Sensor Id: " + sensor._id;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorIdElement);

        var sensorRegionElement = document.createElement("p");
        sensorRegionElement.textContent = "Region: " + sensor.regionName;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorRegionElement);

        var sensorlongitudeElement = document.createElement("p");
        sensorlongitudeElement.textContent = "Longitude: " + sensor.longitude;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorlongitudeElement);

        var sensorlatitudeElement = document.createElement("p");
        sensorlatitudeElement.textContent = "Latitude: " + sensor.latitude;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorlatitudeElement);

        var findElement = document.createElement("button");
        findElement.textContent = "Find Sensor";
        findElement.setAttribute('class', 'btn btn-primary');
        findElement.setAttribute('id', 'findButton' + sensor._id);
        findElement.setAttribute('type', 'button');
        findElement.setAttribute('data-dismiss', 'modal');
        document.getElementById("boxDiv" + sensor._id).appendChild(findElement);


    } else {
        var coloumnDiv = document.createElement("div");
        coloumnDiv.setAttribute('class', 'col-sm-4 text-center sensorMenuPadding');
        coloumnDiv.setAttribute('id', 'coloumnDiv' + sensor._id);

        document.getElementById("otherSensorGrid").appendChild(coloumnDiv);

        var boxDiv = document.createElement("div");
        boxDiv.setAttribute('class', 'sensorMenuBox');
        boxDiv.setAttribute('id', 'boxDiv' + sensor._id);
        document.getElementById('coloumnDiv' + sensor._id).appendChild(boxDiv);

        var sensorIdElement = document.createElement("p");
        sensorIdElement.textContent = "Sensor Id: " + sensor._id;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorIdElement);

        var sensorRegionElement = document.createElement("p");
        sensorRegionElement.textContent = "Region: " + sensor.regionName;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorRegionElement);

        var sensorlongitudeElement = document.createElement("p");
        sensorlongitudeElement.textContent = "Longitude: " + sensor.longitude;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorlongitudeElement);

        var sensorlatitudeElement = document.createElement("p");
        sensorlatitudeElement.textContent = "Latitude: " + sensor.latitude;
        document.getElementById("boxDiv" + sensor._id).appendChild(sensorlatitudeElement);
    }
}