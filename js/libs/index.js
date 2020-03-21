//filter checkboxes
const england = document.getElementById("englandCheckbox");
const wales = document.getElementById("walesCheckbox");
const scotland = document.getElementById("scotlandCheckbox");
const northernIreland = document.getElementById("northernIrelandCheckbox");
const countyAverage = document.getElementById("averageCheckbox");

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
        console.log("clicking cesium container");
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
                    var title = "hello";
                    var body = "testing";
                    new BstrapModal(sensorData[i].sensorID, title, body);
                };
            });
        }
    });

    // 
    // var scene = viewer.scene;
    // var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    // handler.setInputAction(function(movement) {
    //     var pickedObject = scene.pick(movement.endPosition);
    //     var allCesiumEntities = viewer.entities;
    //     if (Cesium.defined(pickedObject)) {
    //         for (index = 0; index < allCesiumEntities._entities.length; index++) {
    //             if(pickedObject.id._id === allCesiumEntities._entities._array[index].id){
    //                 console.log("success");
    //                 requirejs(['sweetalert'], function (sweetAlert) {
    //                     console.log("testing");
    //                     sweetAlert.fire({
    //                             position: 'top-end',
    //                             title: 'Sensor Information',
    //                             html: '<b>Sensor Type: </br> Sensor ID: </br>Status: </br>Region: </br>Latitude: </br>Longitude: </br>Deployment Date: </br>Latest Data: </br>Maximum Data Value: </br>Minimum Data Value: </br>',
    //                             timer: 30000,
    //                             showCloseButton: true,
    //                             showCancelButton: true,
    //                             focusConfirm: false,
    //                             confirmButtonText:
    //                               '<i class="fa fa-thumbs-up"></i> Great!',
    //                             confirmButtonAriaLabel: 'Thumbs up, Thanks!',
    //                             cancelButtonText:
    //                               '<i class="fa fa-thumbs-down"></i>',
    //                             cancelButtonAriaLabel: 'Thumbs down',
    //                             imageUrl: 'images/co2.png',
    //                             imageHeight: 75,
    //                     });
    //                 });
    //             } 
    //         } 
    //     } 
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


    viewer.selectedEntityChanged.addEventListener(function(entity) {
        if (viewer.selectedEntity !== undefined) {
            console.log("entity clicked:" + viewer.selectedEntity._id);
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
            console.log("testing");
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
                imageUrl: 'happyearth.gif',
                imageHeight: 150,
            });
        });
    }

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
            } else {
                filterWarning();
            }
        } else {
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

function addSensorInformationBox(sensorID) {
    // // create a new div element 
    // var model = document.createElement("div"); 
    // model.id = sensorID;
    // model.class = "modal fade";
    // // and give it some content 
    // var newContent = document.createTextNode("Hi there and greetings!"); 
    // // add the text node to the newly created div
    // newDiv.appendChild(newContent);  

    // // add the newly created element and its content into the DOM 
    // var currentDiv = document.getElementById("div1"); 
    // document.body.insertBefore(newDiv, currentDiv); 
}



function BstrapModal(sensorID, title, body, buttons) {
    var title = title || "Lorem Ipsum History",
        body = body || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        buttons = buttons || [{
            Value: "CLOSE",
            Css: "btn-primary",
            Callback: function(event) {
                BstrapModal.Close();
            }
        }];
    var GetModalStructure = function() {
        var that = this;
        that.Id = BstrapModal.Id;
        var buttonshtml = "";
        for (var i = 0; i < buttons.length; i++) {
            buttonshtml += "<button type='button' class='btn " + (buttons[i].Css || "") + "' name='btn" + that.Id + "'>" + (buttons[i].Value || "CLOSE") + "</button>";
        }
        return "<div class='modal fade' name='dynamiccustommodal' id='" + that.Id + "' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' aria-labelledby='" + that.Id + "Label'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close modal-white-close' onclick='BstrapModal.Close()'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title'>" + title + "</h4></div><div class='modal-body'><div class='row'><div class='col-xs-12 col-md-12 col-sm-12 col-lg-12'>" + body + "</div></div></div><div class='modal-footer bg-default'><div class='col-xs-12 col-sm-12 col-lg-12'>" + buttonshtml + "</div></div></div></div></div>";
    }();
    BstrapModal.Delete = function() {
        var modals = document.getElementsByName("dynamiccustommodal");
        if (modals.length > 0) document.body.removeChild(modals[0]);
    };
    BstrapModal.Close = function() {
        $(document.getElementById(BstrapModal.Id)).modal('hide');
        BstrapModal.Delete();
    };

    function Show(sensorID) {
        BstrapModal.Delete();
        document.body.appendChild($(GetModalStructure)[0]);
        var btns = document.querySelectorAll("button[name='btn" + sensorID + "']");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", buttons[i].Callback || BstrapModal.Close);
        }
        $(document.getElementById(sensorID)).modal('show');
    };
};