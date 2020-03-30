function createNewSensorMenuBox(sensor){
    var coloumnDiv = document.createElement("div");
    coloumnDiv.setAttribute('class', 'col-sm-4 text-center sensorMenuPadding');
    coloumnDiv.setAttribute('id', 'coloumnDiv' + sensor._id);

    document.getElementById("sensorGrid").appendChild(coloumnDiv);

    var boxDiv = document.createElement("div");
    boxDiv.setAttribute('class', 'sensorMenuBox');
    boxDiv.setAttribute('id', 'boxDiv' + sensor._id);
    document.getElementById('coloumnDiv' + sensor._id).appendChild(boxDiv);

    var sensorTitle = document.createElement("h5");
    sensorTitle.textContent = sensor._name + " Sensor";

    document.getElementById("boxDiv" + sensor._id).appendChild(sensorTitle);

    if (sensor._name === "Air Quality") {
        var sensorImg = document.createElement("img");
        sensorImg.src = "images/co2.png";
        sensorImg.style.width = "50px";
        sensorImg.style.height = "50px";
        sensorImg.alt = "Air Quality Image";

        document.getElementById("boxDiv" + sensor._id).appendChild(sensorImg);
        var lineBreak = document.createElement("br");
        document.getElementById("boxDiv" + sensor._id).appendChild(lineBreak);
        var lineBreak2 = document.createElement("br");
        document.getElementById("boxDiv" + sensor._id).appendChild(lineBreak2);
    }

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