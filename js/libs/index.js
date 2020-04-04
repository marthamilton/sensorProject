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

    //filter checkboxes
    const england = document.getElementById("englandCheckbox");
    const wales = document.getElementById("walesCheckbox");
    const scotland = document.getElementById("scotlandCheckbox");
    const northernIreland = document.getElementById("northernIrelandCheckbox");
    const countyAverage = document.getElementById("averageCheckbox");

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

        viewer.dataSources.removeAll();
        england.checked = false;
        wales.checked = false;
        countyAverage.checked = false;
        //checks to see if there are points on the map & if a filter has been applied
        if (cesiumSensors.length === 0) {
            addCesiumPoints();
        }

        for (var i = 0; i < cesiumSensors.length; i++) {
            if (!document.getElementById("coloumnDiv" + cesiumSensors[i]._id)) {
                createNewSensorMenuBox(cesiumSensors[i]);
            }

            let sensorLatitude = cesiumSensors[i].latitude;
            let sensorLongitude = cesiumSensors[i].longitude;
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
                        var last100AQ;
                        requirejs(['chartjs'], function(Chart) {
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
                            var chart = document.getElementById("sensorChart").getContext("2d");
                            var chart = new Chart(chart, {
                                type: "line",
                                data: {
                                    labels: dateTimeReadings,
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

                function addEnglandAverageToMap(response) {
                    var sensorData = $.parseJSON(response);
                    entity.regionCountry = sensorData.regionCountry;
                    if (sensorData.regionName === null || sensorData.averageAirQuality === null) {} else {
                        if (entity._description === sensorData.regionName) {
                            entity.polygon.extrudedHeight = sensorData.averageAirQuality * 1500;
                            entity.airQuality = sensorData.averageAirQuality;
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
                            success: addEnglandAverageToMap,
                        });
                    }

                }
            }
        });

    }

    function walesJson() {
        $(document.getElementById("informationBox")).modal('hide');
        //Seed the random number generator for repeatable results.
        Cesium.Math.setRandomNumberSeed(0);

        var walesPromise = Cesium.GeoJsonDataSource.load('data/geo/walesRegions.json');
        walesPromise.then(function(walesDataSource) {
            viewer.dataSources.add(walesDataSource);

            //Get the array of entities
            var walesEntities = walesDataSource.entities.values;

            for (var i = 0; i < walesEntities.length; i++) {
                //For each entity, create a random color based on the state name.
                var walesStr = walesEntities[i]._id;
                var walesRegionJsonId = walesStr.substring(8, 9);

                switch (walesRegionJsonId) {
                    case "1":
                        walesEntities[i]._name = "2958";
                        walesEntities[i]._description = "North Wales";
                        walesEntities[i].type = "filterRegion";

                        break;
                    case "6":
                        walesEntities[i]._name = "3857";
                        walesEntities[i]._description = "Mid and West Wales";
                        walesEntities[i].type = "filterRegion";
                        break;
                    case "7":
                        walesEntities[i]._name = "4859";
                        walesEntities[i]._description = "South Wales Central";
                        walesEntities[i].type = "filterRegion";
                        break;
                    case "8":
                        walesEntities[i]._name = "9275";
                        walesEntities[i]._description = "South Wales East";
                        walesEntities[i].type = "filterRegion";
                        break;
                    case "9":
                        walesEntities[i]._name = "9185";
                        walesEntities[i]._description = "South Wales West";
                        walesEntities[i].type = "filterRegion";
                        break;
                    default:
                        walesEntities[i]._name = "undefined";
                        walesEntities[i]._description = "undefined";
                        walesEntities[i].type = "filterRegion";
                        break;
                }

                var colorHash = {};

                const walesEntity = walesEntities[i];
                var name = walesEntity._id;
                var color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0
                    });
                    colorHash[name] = color;
                }

                //Set the polygon material to our random color.
                walesEntity.polygon.material = color;
                //Remove the outlines.
                walesEntity.polygon.outline = false;

                function addWalesAverageToMap(response) {
                    console.log(response);
                    var walesSensorData = $.parseJSON(response);
                    console.log("country: " + walesSensorData.regionCountry);
                    walesEntity.regionCountry = walesSensorData.regionCountry;
                    if (walesSensorData.regionName === null || walesSensorData.averageAirQuality === null) {} else {
                        if (walesEntity._description === walesSensorData.regionName) {
                            walesEntity.polygon.extrudedHeight = walesSensorData.averageAirQuality * 1500;
                            walesEntity.airQuality = walesSensorData.averageAirQuality;
                        } else {}
                    }
                }

                if (walesEntity._name === "undefined" || walesEntity._description === "undefined") {} else {
                    if (walesEntity.polygon.extrudedHeight === undefined) {
                        console.log("passing into DB: " + walesEntity._name)
                        $.ajax({
                            async: true,
                            type: "GET",
                            url: "Php/getRegionAverage.php?rid=" + walesEntity._name,
                            datatype: "json",
                            success: addWalesAverageToMap,
                        });
                    }

                }
            }
        });

    }

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
                walesJson();
            }
            if (england.checked == false && wales.checked == false) {
                viewer.dataSources.removeAll();
                filterWarning();
            }
        } else {
            england.checked = false;
            wales.checked = false;
            countyAverage.checked = false;
            viewer.dataSources.removeAll();
            filterWarning();
        }
    });

    //When the reset button in filters is clicked
    document.getElementById("resetFilters").addEventListener("click", function() {
        england.checked = false;
        wales.checked = false;
        countyAverage.checked = false;
        viewer.dataSources.removeAll();
        addCesiumPoints();
    });
    //End new file - regionFilters.js

});