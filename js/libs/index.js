//Cesium
requirejs(['cesium'], function(Cesium) {
    // Default CesiumJS access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNGE5YjRkNy0yYzE1LTRiMTEtYmIwNC03ZjI4OTYyMTRlZTkiLCJpZCI6MjMxMTcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODI3Mzk0MzV9.kEPRva0D_vJ-mxASc7jdGAGL67M5GiT6r5sQ4LcgHwY';

    // New CesiumJS Viewer
    const viewer = new Cesium.Viewer('cesiumContainer', {
        // Start in columbus viewer
        sceneMode: Cesium.SceneMode.SCENE3D,

        // Use Cesium World Terrain
        terrainProvider: Cesium.createWorldTerrain(),

        // Hide the base layer picker
        baseLayerPicker: false,

        // Use BingMaps - Attached to martha@themiltons.co.uk
        bing: new Cesium.BingMapsImageryProvider({
            url: 'https://dev.virtualearth.net',
            key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzZkYTg0OS0zZmFhLTQxMDAtOGEwOC1lMjY3MTRjY2QwMzEiLCJpZCI6MjMxMTcsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMxMzk1OTR9.yErw5tu4nqNGtDYJQgVcBg1_2up4QGUE4Z4htNAhCks',
            mapStyle: Cesium.BingMapsStyle.AERIAL
        }),
        geocoder: [
            new Cesium.CartographicGeocoderService(),
            new Cesium.BingMapsGeocoderService({
                key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzZkYTg0OS0zZmFhLTQxMDAtOGEwOC1lMjY3MTRjY2QwMzEiLCJpZCI6MjMxMTcsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMxMzk1OTR9.yErw5tu4nqNGtDYJQgVcBg1_2up4QGUE4Z4htNAhCks'
            })
        ],
        terrainProvider: Cesium.createWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true
        }),

        infoBox: false,
        // Hiding the home button
        homeButton: false,
        // Allowing animations
        animation: false,
        // Disabling VR Support
        vrButton: false,
        // Disabling the timeline
        timeline: false,
        // Disabling default search box
        geocoder: false,
        // Disabling the 2D Mode
        sceneModePicker: false,
        // Disables default navigation help
        navigationHelpButton: false,
        // Hiding fullscreen button
        fullscreenButton: false,
        // Show Columbus View map with Web Mercator projection
        mapProjection: new Cesium.WebMercatorProjection()
    });

    // Disables locking when double clicking a point on the map
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    // Element for the cesium container
    const cesiumContainer = document.getElementById("cesiumContainer");
    // When the cesium container (map) is clicked
    cesiumContainer.addEventListener("click", () => {
        viewer.selectedEntity = undefined;
    });

    // Zoom to UK immediately
    const center = Cesium.Cartesian3.fromDegrees(-1.43921, 52.99495, 2000000.0);
    viewer.camera.flyTo({
        destination: center,
        duration: 2
    });

    //When the HOME button is pressed
    document.getElementById("homeButton").addEventListener("click", (event) => {
        viewer.camera.flyTo({
            destination: center,
            duration: 2
        });
    });

    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getCesiumEntityInformation.php",
        datatype: "json",
        success: function(data) {
            requirejs(['bootstrapModelWrapper'], function(BootstrapModelWrapper) {
                var sensorData = $.parseJSON(data);
                for (var i = 0; i < sensorData.length; i++) {
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(parseFloat(sensorData[i].sensorLongitude), parseFloat(sensorData[i].sensorLatitude)),
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.DARKORCHID
                        },
                        name: sensorData[i].sensorType,
                        id: sensorData[i].sensorID,
                        longitude: sensorData[i].sensorLongitude,
                        latitude: sensorData[i].sensorLatitude,
                        deploymentDate: sensorData[i].sensorDeploymentDate,
                        regionName: sensorData[i].regionName,
                    });
                };
            });
        }
    });

    // Element for the sensor menu
    const sensorMenuElement = document.getElementById("sensorMenu");
    // When the sensor menu is clicked
    sensorMenuElement.addEventListener("click", () => {
        console.log("sensor menu");
        var cesiumSensors = viewer.entities._entities._array;
        console.log(cesiumSensors);

        for (var i = 0; i < cesiumSensors.length; i++) {
            if (!document.getElementById("coloumnDiv" + cesiumSensors[i]._id)) {
                var coloumnDiv = document.createElement("div");
                coloumnDiv.setAttribute('class', 'col-sm-4 text-center sensorMenuPadding');
                coloumnDiv.setAttribute('id', 'coloumnDiv' + cesiumSensors[i]._id);

                document.getElementById("sensorGrid").appendChild(coloumnDiv);

                var boxDiv = document.createElement("div");
                boxDiv.setAttribute('class', 'sensorMenuBox');
                boxDiv.setAttribute('id', 'boxDiv' + cesiumSensors[i]._id);
                document.getElementById('coloumnDiv' + cesiumSensors[i]._id).appendChild(boxDiv);

                var sensorTitle = document.createElement("h5");
                sensorTitle.textContent = cesiumSensors[i]._name + " Sensor";

                document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(sensorTitle);

                if (cesiumSensors[i]._name === "Air Quality") {
                    var sensorImg = document.createElement("img");
                    sensorImg.src = "images/co2.png";
                    sensorImg.style.width = "50px";
                    sensorImg.style.height = "50px";
                    sensorImg.alt = "Air Quality Image";

                    document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(sensorImg);
                    var lineBreak = document.createElement("br");
                    document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(lineBreak);
                    var lineBreak2 = document.createElement("br");
                    document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(lineBreak2);
                }

                var sensorIdElement = document.createElement("p");
                sensorIdElement.textContent = "Sensor Id: " + cesiumSensors[i]._id;
                document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(sensorIdElement);

                var sensorlongitudeElement = document.createElement("p");
                sensorlongitudeElement.textContent = "Longitude: " + cesiumSensors[i].longitude;
                document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(sensorlongitudeElement);

                var sensorlatitudeElement = document.createElement("p");
                sensorlatitudeElement.textContent = "Latitude: " + cesiumSensors[i].latitude;
                document.getElementById("boxDiv" + cesiumSensors[i]._id).appendChild(sensorlatitudeElement);
            }

            let sensorLatitude = cesiumSensors[i].latitude;
            let sensorLongitude = cesiumSensors[i].longitude;
            // let sensorBoxElement = document.getElementById("coloumnDiv" + cesiumSensors[i]._id);
            document.getElementById("coloumnDiv" + cesiumSensors[i]._id).addEventListener("click", function() {
                $('#sensors').modal('hide');
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(sensorLongitude, sensorLatitude, 1000.0),
                    duration: 3.0
                });
            });
        };
    });

    // User clicks on a point on the map (entity)
    viewer.selectedEntityChanged.addEventListener(function(entity) {
        if (viewer.selectedEntity !== undefined) {
            document.getElementById("informationBoxSensorId").innerHTML = entity._id;
            document.getElementById("informationBoxSensorType").innerHTML = entity._name;
            document.getElementById("informationBoxSensorDeploymentDate").innerHTML = entity.deploymentDate;
            document.getElementById("informationBoxRegionName").innerHTML = entity.regionName;
            document.getElementById("informationBoxLatitude").innerHTML = entity.latitude;
            document.getElementById("informationBoxLongitude").innerHTML = entity.longitude;

            //gets the most recend air quality record with dateTime based on sensor id
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getMostRecentAQ.php?id=" + viewer.selectedEntity._id,
                datatype: "json",
                success: function(data) {
                    var sensorData = $.parseJSON(data);
                    if (sensorData === null) {
                        document.getElementById("informationBoxCurrentAirQuality").innerHTML = "No air quality readings";
                        document.getElementById("informationBoxLastUpdated").innerHTML = "No air quality readings";
                        document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                    } else {
                        document.getElementById("informationBoxCurrentAirQuality").innerHTML = sensorData.airQuality + "%";
                        document.getElementById("informationBoxLastUpdated").innerHTML = sensorData.dateTime;

                        var lastUpdated = new Date(sensorData.dateTime);
                        var oneHour = 60 * 60 * 1000;
                        if ((new Date() - lastUpdated) < oneHour) {
                            document.getElementById("informationBoxSensorStatus").innerHTML = "Online";
                        } else {
                            document.getElementById("informationBoxSensorStatus").innerHTML = "Offline";
                        }
                    }
                }
            });

            //gets the the max reading of air quality record based on sensor id
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getMaxAQ.php?id=" + viewer.selectedEntity._id,
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

            //gets the the min reading of air quality record based on sensor id
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getMinAQ.php?id=" + viewer.selectedEntity._id,
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
            //Chart JS 
            requirejs(['chartjs'], function(Chart) {
                var chart = document.getElementById("sensorChart").getContext("2d");
                var chartLabels = ["hello", "hello", "hello"];
                var chartData = [67, 25, 45];
                var chart = new Chart(chart, {
                    type: "line",
                    data: {
                        labels: chartLabels,
                        datasets: [{
                            label: 'Air Quality',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: chartData
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
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                },
                                display: true
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Air Quality'
                                },
                                display: true
                            }]
                        }
                    }
                });

            });
            $(document.getElementById("informationBox")).modal('show');
        }
    });

    function filterWarning() {
        requirejs(['sweetalert'], function(sweetAlert) {
            sweetAlert.fire({
                title: 'Warning',
                html: '<b>Filter could not be applied, please make sure you select an area and filter type next time</b>',
                timer: 10000,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, Thanks!',
                cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down',
                imageUrl: 'images/happyearth.gif',
                imageHeight: 150,
            });
        });
    }

    //filter checkboxes
    const england = document.getElementById("englandCheckbox");
    const wales = document.getElementById("walesCheckbox");
    const scotland = document.getElementById("scotlandCheckbox");
    const northernIreland = document.getElementById("northernIrelandCheckbox");
    const countyAverage = document.getElementById("averageCheckbox");

    //When the apply button in filters is clicked
    document.getElementById("applyFilters").addEventListener("click", function() {
        viewer.dataSources.removeAll();
        if (countyAverage.checked) {
            if (england.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/englandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (wales.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/walesCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (scotland.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/scotlandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (northernIreland.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/northernIrelandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (england.checked == false && wales.checked == false && scotland.checked == false && northernIreland.checked == false) {
                viewer.dataSources.removeAll();
                console.log("areanotchecked");
                filterWarning();
            }
        } else {
            england.checked = false;
            wales.checked = false;
            scotland.checked = false;
            northernIreland.checked = false;
            countyAverage.checked = false;
            viewer.dataSources.removeAll();
            console.log("countyaveragenotchecked");
            filterWarning();
        }
    });

    //When the reset button in filters is clicked
    document.getElementById("resetFilters").addEventListener("click", function() {
        england.checked = false;
        wales.checked = false;
        scotland.checked = false;
        northernIreland.checked = false;
        countyAverage.checked = false;
        viewer.dataSources.removeAll();
    });
});