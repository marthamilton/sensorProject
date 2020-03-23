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
                    });
                };
            });
        }
    });

    viewer.selectedEntityChanged.addEventListener(function(entity) {
        if (viewer.selectedEntity !== undefined) {
            console.log(entity);
            console.log("entity clicked:" + viewer.selectedEntity);
            document.getElementById("informationBoxSensorId").innerHTML = entity._id;
            document.getElementById("informationBoxSensorType").innerHTML = entity._name;
            $.ajax({
                async: true,
                type: "GET",
                url: "Php/getSensorInformationBox.php?id=" + viewer.selectedEntity._id,
                datatype: "json",
                success: function(data) {
                    var sensorData = $.parseJSON(data);
                    console.log(sensorData);
                    document.getElementById("informationBoxSensorDeploymentDate").innerHTML = sensorData.sensorDeploymentDate;
                    document.getElementById("informationBoxRegionName").innerHTML = sensorData.regionName;
                    document.getElementById("informationBoxLatitude").innerHTML = sensorData.sensorLatitude;
                    document.getElementById("informationBoxLongitude").innerHTML = sensorData.sensorLongitude;
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
        // if(viewer.selectedEntity == defined){
        //     $('#chart').modal('show');
        // }
        //location.href = "#chart";
        //     // Check if an entity with a point color was selected.
        //     if (Cesium.defined(entity) &&
        //         Cesium.defined(entity.point) &&
        //         Cesium.defined(entity.point.color)) {

        //         // Get the current color
        //         var color = entity.point.color.getValue(viewer.clock.currentTime);

        //         // Test for blue
        //         if (Cesium.Color.equals(color, Cesium.Color.STEELBLUE)) {
        //             // Set to red
        //             entity.point.color = Cesium.Color.RED;
        //         }

        //         // Test for red
        //         else if (Cesium.Color.equals(color, Cesium.Color.RED)) {
        //             // Set to red
        //             entity.point.color = Cesium.Color.STEELBLUE;
        //         }
        //     }
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