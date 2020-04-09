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
                            var chartElement = document.getElementById("sensorChart").getContext("2d");
                            var chart = new Chart(chartElement, {
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
                                            ticks: {
                                                fontSize: 10,
                                                userCallback: function(item, index) {
                                                    var date = item.substring(0, 10);
                                                    if (!(index % 20)) return date;
                                                },
                                                autoSkip: false
                                            },
                                        }],
                                        yAxes: [{
                                            display: true,
                                            ticks: {
                                                max: 100,
                                                min: 0,
                                                stepSize: 20
                                            }
                                        }]
                                    }
                                }
                            });

                        $('#informationBox').on('hidden.bs.modal', function () {
                            chart.destroy();
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
                document.getElementById("informationBoxRegionCountry").innerHTML = entity.country;
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

        var allRegionsID = [];
        var averageRegionsAQ = [];

        //gets all regions in the country Wales
        function addAllRegions(response) {
            var jsonResponse = $.parseJSON(response);
            var allRegions = jsonResponse.regions;
            if (allRegions === null) {} else {
                for (var i = 0; i < allRegions.length; i++) {
                    allRegionsID.push(allRegions[i]);
                }
            }
        }

        $.ajax({
            async: false,
            type: "GET",
            url: "Php/getAllRegions.php?rc=2",
            datatype: "json",
            success: addAllRegions,
        });

        //gets average air quality for all regions in Wales
        function addRegionsAverageAQ(response) {
            var jsonResponse = $.parseJSON(response);
            if (jsonResponse === null) {} else {
                averageRegionsAQ.push(jsonResponse);
            }
        }

        for (var i = 0; i < allRegionsID.length; i++) {
            $.ajax({
                async: false,
                type: "GET",
                url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
                datatype: "json",
                success: addRegionsAverageAQ,
            });
        }

        var englandPromise = Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json');
        englandPromise.then(function(englandDataSource) {
            viewer.dataSources.add(englandDataSource);

            //Get the array of entities
            var englandEntities = englandDataSource.entities.values;

            for (var i = 0; i < englandEntities.length; i++) {
                //For each entity, create a random color based on the state name.
                var englandStr = englandEntities[i]._id;
                var englandRegionJsonId = englandStr.substring(8, 9);

                switch (englandRegionJsonId) {
                    case "1":
                        englandEntities[i]._name = "2857";
                        englandEntities[i]._description = "North East";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";

                        break;
                    case "2":
                        englandEntities[i]._name = "8675";
                        englandEntities[i]._description = "North West";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "3":
                        englandEntities[i]._name = "1264";
                        englandEntities[i]._description = "Yorkshire and The Humber";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "4":
                        englandEntities[i]._name = "7657";
                        englandEntities[i]._description = "East Midlands";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "5":
                        englandEntities[i]._name = "5431";
                        englandEntities[i]._description = "West Midlands";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "6":
                        englandEntities[i]._name = "1865";
                        englandEntities[i]._description = "Eastern";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "7":
                        englandEntities[i]._name = "9783";
                        englandEntities[i]._description = "London";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "8":
                        englandEntities[i]._name = "6758";
                        englandEntities[i]._description = "South East";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    case "9":
                        englandEntities[i]._name = "1587";
                        englandEntities[i]._description = "South West";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                    default:
                        englandEntities[i]._name = "undefined";
                        englandEntities[i]._description = "undefined";
                        englandEntities[i].country = "England";
                        englandEntities[i].type = "filterRegion";
                        break;
                }

                var colorHash = {};

                const englandEntity = englandEntities[i];
                var name = englandEntity._id;
                var color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0
                    });
                    colorHash[name] = color;
                }


                //Set the polygon material to our random color.
                englandEntity.polygon.material = color;
                //Remove the outlines.
                englandEntity.polygon.outline = false;

                if (englandEntity.polygon.extrudedHeight === undefined) {
                    averageRegionsAQ.forEach(function(region) {
                        if (region.regionName === englandEntity._description) {
                            if (region.averageAirQuality !== null) {
                                englandEntity.airQuality = region.averageAirQuality;
                                englandEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                            }
                        }
                    });
                }
            }
        });
    }

    function walesJson() {
        $(document.getElementById("informationBox")).modal('hide');
        //Seed the random number generator for repeatable results.
        Cesium.Math.setRandomNumberSeed(0);

        var allRegionsID = [];
        var averageRegionsAQ = [];

        //gets all regions in the country Wales
        function addAllRegions(response) {
            var jsonResponse = $.parseJSON(response);
            var allRegions = jsonResponse.regions;
            if (allRegions === null) {} else {
                for (var i = 0; i < allRegions.length; i++) {
                    allRegionsID.push(allRegions[i]);
                }
            }
        }

        $.ajax({
            async: false,
            type: "GET",
            url: "Php/getAllRegions.php?rc=1",
            datatype: "json",
            success: addAllRegions,
        });

        //gets average air quality for all regions in Wales
        function addRegionsAverageAQ(response) {
            var jsonResponse = $.parseJSON(response);
            if (jsonResponse === null) {} else {
                averageRegionsAQ.push(jsonResponse);
            }
        }

        for (var i = 0; i < allRegionsID.length; i++) {
            $.ajax({
                async: false,
                type: "GET",
                url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
                datatype: "json",
                success: addRegionsAverageAQ,
            });
        }

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
                        walesEntities[i].country = "Wales";
                        break;
                    case "6":
                        walesEntities[i]._name = "3857";
                        walesEntities[i]._description = "Mid and West Wales";
                        walesEntities[i].type = "filterRegion";
                        walesEntities[i].country = "Wales";

                        break;
                    case "7":
                        walesEntities[i]._name = "4859";
                        walesEntities[i]._description = "South Wales Central";
                        walesEntities[i].type = "filterRegion";
                        walesEntities[i].country = "Wales";

                        break;
                    case "8":
                        walesEntities[i]._name = "9275";
                        walesEntities[i]._description = "South Wales East";
                        walesEntities[i].type = "filterRegion";
                        walesEntities[i].country = "Wales";

                        break;
                    case "9":
                        walesEntities[i]._name = "9185";
                        walesEntities[i]._description = "South Wales West";
                        walesEntities[i].type = "filterRegion";
                        walesEntities[i].country = "Wales";

                        break;
                    default:
                        walesEntities[i]._name = "undefined";
                        walesEntities[i]._description = "undefined";
                        walesEntities[i].type = "filterRegion";
                        walesEntities[i].country = "Wales";
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

                if (walesEntity.polygon.extrudedHeight === undefined) {
                    averageRegionsAQ.forEach(function(region) {
                        if (region.regionName === walesEntity._description) {
                            if (region.averageAirQuality !== null) {
                                walesEntity.airQuality = region.averageAirQuality;
                                walesEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                            }
                        }
                    });
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
                viewer.camera.flyTo({
                    destination: center,
                    duration: 2
                });
                englandJson();
            }
            if (wales.checked) {
                viewer.camera.flyTo({
                    destination: center,
                    duration: 2
                });
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