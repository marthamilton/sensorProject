//filter checkboxes
const england = document.getElementById("englandCheckbox");
const wales = document.getElementById("walesCheckbox");
const scotland = document.getElementById("scotlandCheckbox");
const northernIreland = document.getElementById("northernIrelandCheckbox");
const countyAverage = document.getElementById("averageCheckbox");

//Cesium
requirejs(['cesium'], function (Cesium) {


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
            url : 'https://dev.virtualearth.net',
            key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzZkYTg0OS0zZmFhLTQxMDAtOGEwOC1lMjY3MTRjY2QwMzEiLCJpZCI6MjMxMTcsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMxMzk1OTR9.yErw5tu4nqNGtDYJQgVcBg1_2up4QGUE4Z4htNAhCks',
            mapStyle : Cesium.BingMapsStyle.AERIAL
        }),
        geocoder : [
            new Cesium.CartographicGeocoderService(),
            new Cesium.BingMapsGeocoderService({key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NzZkYTg0OS0zZmFhLTQxMDAtOGEwOC1lMjY3MTRjY2QwMzEiLCJpZCI6MjMxMTcsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMxMzk1OTR9.yErw5tu4nqNGtDYJQgVcBg1_2up4QGUE4Z4htNAhCks'})
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
        url: "Php/getSensorInformation.php",
        datatype: "json",
        success: function(data) {
            var sensorData = $.parseJSON(data);
            for(var i = 0; i < sensorData.length; i++){
                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(parseFloat(sensorData[i].sensorLongitude), parseFloat(sensorData[i].sensorLatitude)),
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.STEELBLUE
                    },
                    name: sensorData[i].sensorType,
                    id: sensorData[i].sensorID,
                });
            };
          }
      });

    var scene = viewer.scene;
    //   var handler;
    //   var color = Cesium.Color.WHITE;
          
    //   handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    //   handler.setInputAction(function(movement) {
    //       var pickedObject = scene.pick(movement.endPosition);
    //       console.log(pickedObject);
    //         //var color = entity.point.color.getValue(viewer.clock.currentTime);
    //       //console.log(color)
    //       if (Cesium.defined(pickedObject)) {
    //           console.log("testing");
    //           viewer.selectedEntityChanged.Cesium.Color.AQUAMARINE;
    //       }
    //   }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        var entities2 = viewer.entities;
        if (Cesium.defined(pickedObject)) {
            for (index = 0; index < entities2._entities.length; index++) {
                if(pickedObject.id._id === entities2._entities._array[index].id){
                    console.log("success");
                    requirejs(['sweetalert'], function (sweetAlert) {
                        console.log("testing");
                        sweetAlert.fire({
                                position: 'top-end',
                                title: 'Sensor Information',
                                html: '<b>Sensor Type: </br> Sensor Latitude: </br></b>',
                                timer: 10000,
                                showCloseButton: true,
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText:
                                  '<i class="fa fa-thumbs-up"></i> Great!',
                                confirmButtonAriaLabel: 'Thumbs up, Thanks!',
                                cancelButtonText:
                                  '<i class="fa fa-thumbs-down"></i>',
                                cancelButtonAriaLabel: 'Thumbs down',
                                imageUrl: 'happyearth.gif',
                                imageHeight: 150,
                        });
                    });
                } 
            } 
        } 
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


    //   viewer.selectedEntityChanged.addEventListener(function(entity) {
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
    // });

    function filterWarning(){
        requirejs(['sweetalert'], function (sweetAlert) {
            console.log("testing");
            sweetAlert.fire({
                    title: 'Warning',
                    html: '<b>Filter could not be applied, please make sure you select an area and filter type next time</b>',
                    timer: 10000,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, Thanks!',
                    cancelButtonText:
                      '<i class="fa fa-thumbs-down"></i>',
                    cancelButtonAriaLabel: 'Thumbs down',
                    imageUrl: 'happyearth.gif',
                    imageHeight: 150,
            });
        });
    }
    
    //When the apply button in filters is clicked
    document.getElementById("applyFilters").addEventListener("click", function(){
        viewer.dataSources.removeAll();
        if(countyAverage.checked){
            if(england.checked){
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/englandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if(wales.checked){
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/walesCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if(scotland.checked){
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/scotlandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }
            if(northernIreland.checked){
                viewer.dataSources.add(Cesium.GeoJsonDataSource.load('data/geo/northernIrelandCounties.json', {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK,
                    strokeWidth: 3,
                    markerSymbol: '?'
                }));
            }else{
                filterWarning();
            }
        } else {
            filterWarning();
        }
    });

     //When the reset button in filters is clicked
    document.getElementById("resetFilters").addEventListener("click", function(){
        england.checked = false;
        wales.checked = false;
        scotland.checked = false;
        northernIreland.checked = false;
        countyAverage.checked = false;
        viewer.dataSources.removeAll();
    });
});

// //Chart JS 
// requirejs(['chartjs'], function (Chart) {
//     var chart = document.getElementById("sensorChart").getContext("2d");
//     var chart = new Chart(chart, {
//         type: 'bar',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });

// });