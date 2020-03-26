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
        }
    });

    // Element for the sensor menu
    const sensorMenuElement = document.getElementById("sensorMenu");
    // When the sensor menu is clicked
    sensorMenuElement.addEventListener("click", () => {
        var cesiumSensors = viewer.entities._entities._array;

        for (var i = 0; i < cesiumSensors.length; i++) {
            if (!document.getElementById("coloumnDiv" + cesiumSensors[i]._id)) {
                createNewSensorMenuBox(cesiumSensors[i]);
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
                success: function(data) {
                    //chart js
                    var sensorData = $.parseJSON(data);
                    if (sensorData === null) {
                        document.getElementById("chartHidden").innerHTML = "No Readings Available";
                    } else {
                        requirejs(['chartjs'], function(Chart) {
                            var airQualityReadings = [];
                            var DateTimeReadings = [];
                            for (var i = 0; i < sensorData.length; i++) {
                                airQualityReadings.push(sensorData[i].airQuality);
                                DateTimeReadings.push(sensorData[i].dateTime);
                            }
                            var chart = document.getElementById("sensorChart").getContext("2d");
                            var chartLabels = ["hello", "hello", "hello"];
                            var chartData = [67, 25, 45];
                            var chart = new Chart(chart, {
                                type: "line",
                                data: {
                                    labels: DateTimeReadings,
                                    datasets: [{
                                        label: 'Air Quality',
                                        fill: false,
                                        backgroundColor: 'rgb(255, 99, 132)',
                                        borderColor: 'rgb(255, 99, 132)',
                                        data: airQualityReadings
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
                                                labelString: 'Air Quality %'
                                            },
                                            display: true,
                                            ticks: {
                                                max: 100,
                                                min: 0,
                                                stepSize: 10
                                            }
                                        }]
                                    }
                                }
                            });
                        });
                    }
                }

            });
            $(document.getElementById("informationBox")).modal('show');
        }
    });

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
                englandJson(Cesium);
                // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json', {
                //     stroke: Cesium.Color.HOTPINK,
                //     fill: Cesium.Color.PINK,
                //     strokeWidth: 3,
                //     markerSymbol: '?'
                // }));
            }
            if (wales.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/walesRegions.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (scotland.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/scotlandRegions.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (northernIreland.checked) {
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/northernIrelandRegions.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if (england.checked == false && wales.checked == false && scotland.checked == false && northernIreland.checked == false) {
                viewer.dataSources.removeAll();
                filterWarning();
            }
        } else {
            england.checked = false;
            wales.checked = false;
            scotland.checked = false;
            northernIreland.checked = false;
            countyAverage.checked = false;
            viewer.dataSources.removeAll();
            filterWarning();
        }
    });

    //When the reset button in filters is clicked
    document.getElementById("resetFilters").addEventListener("click", function() {
        resetFilters(viewer, england, wales, scotland, northernIreland, countyAverage);
    });
});