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

    //Start new file - createCesiumPoints.js
    function addCesiumPoints() {
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
                        type: "sensorPoint"
                    });
                };
            }
        });
    }
    //End new file - createCesiumPoints.js
    addCesiumPoints();

    //Start new file - createSensorMenu.js
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
    //End new file - createSensorMenu.js

    // User clicks on a point on the map (entity) or a region when a filter is applied
    viewer.selectedEntityChanged.addEventListener(function(entity) {
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
            if (entity.type === "filterRegion") {
                $(document.getElementById("informationBox")).modal('hide');

                document.getElementById("informationBoxRegionName").innerHTML = entity._description;
                document.getElementById("informationBoxRegionId").innerHTML = entity._name;
                document.getElementById("informationBoxRegionCountry").innerHTML = entity.regionCountry;
                if (entity.airQuality === undefined) {
                    document.getElementById("informationBoxRegionAQ").innerHTML = "No sensors in this region";
                } else {
                    document.getElementById("informationBoxRegionAQ").innerHTML = entity.airQuality + "%";
                }
                $(document.getElementById("regionInformationBox")).modal('show');
            }
        }
    });

    //Start new file - regionFilters.js
    function englandJson() {
        $(document.getElementById("informationBox")).modal('hide');
        //Seed the random number generator for repeatable results.
        Cesium.Math.setRandomNumberSeed(0);

        var promise = Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json');
        promise.then(function(dataSource) {
            viewer.dataSources.add(dataSource);

            //Get the array of entities
            var entities = dataSource.entities.values;

            var colorHash = {};

            for (var i = 0; i < entities.length; i++) {
                //For each entity, create a random color based on the state name.
                //Some states have multiple entities, so we store the color in a
                //hash so that we use the same color for the entire state.
                var str = entities[i]._id;
                var regionJsonId = str.substring(8, 9);

                switch (regionJsonId) {
                    case "1":
                        entities[i]._name = "2857";
                        entities[i]._description = "North East";
                        entities[i].type = "filterRegion";

                        break;
                    case "2":
                        entities[i]._name = "8675";
                        entities[i]._description = "North West";
                        entities[i].type = "filterRegion";
                        break;
                    case "3":
                        entities[i]._name = "1264";
                        entities[i]._description = "Yorkshire and The Humber";
                        entities[i].type = "filterRegion";
                        break;
                    case "4":
                        entities[i]._name = "7657";
                        entities[i]._description = "East Midlands";
                        entities[i].type = "filterRegion";
                        break;
                    case "5":
                        entities[i]._name = "5431";
                        entities[i]._description = "West Midlands";
                        entities[i].type = "filterRegion";
                        break;
                    case "6":
                        entities[i]._name = "1865";
                        entities[i]._description = "Eastern";
                        entities[i].type = "filterRegion";
                        break;
                    case "7":
                        entities[i]._name = "9783";
                        entities[i]._description = "London";
                        entities[i].type = "filterRegion";
                        break;
                    case "8":
                        entities[i]._name = "6758";
                        entities[i]._description = "South East";
                        entities[i].type = "filterRegion";
                        break;
                    case "9":
                        entities[i]._name = "1587";
                        entities[i]._description = "South West";
                        entities[i].type = "filterRegion";
                        break;
                    default:
                        entities[i]._name = "undefined";
                        entities[i]._description = "undefined";
                        entities[i].type = "filterRegion";
                        break;
                }

                const entity = entities[i];
                var name = entity._id;
                var color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0
                    });
                    colorHash[name] = color;
                }

                //Set the polygon material to our random color.
                entity.polygon.material = color;
                //Remove the outlines.
                entity.polygon.outline = false;

                function addAverageToMap(response) {
                    var sensorData = $.parseJSON(response);
                    if (sensorData.regionName === null || sensorData.averageAirQuality === null) {} else {
                        if (entity._description === sensorData.regionName) {
                            entity.polygon.extrudedHeight = sensorData.averageAirQuality * 1500;
                            entity.airQuality = sensorData.averageAirQuality;
                            entity.regionCountry = sensorData.regionCountry;
                        } else {}
                    }
                }

                if (entity._name === "undefined" || entity._description === "undefined") {} else {
                    if (entity.polygon.extrudedHeight === undefined) {
                        $.ajax({
                            async: true,
                            type: "GET",
                            url: "Php/getRegionAverage.php?rid=" + entity._name,
                            datatype: "json",
                            success: addAverageToMap,
                        });
                    }

                }
            }
            entities.selectedEntityChanged.addEventListener(function(entity) {
                $(document.getElementById("informationBox")).modal('hide');
                console.log(entity);
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
        $(document.getElementById("informationBox")).modal('hide');
        viewer.dataSources.removeAll();
        viewer.entities.removeAll();
        if (countyAverage.checked) {
            if (england.checked) {
                englandJson();
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
        addCesiumPoints();
    });
    //End new file - regionFilters.js

});