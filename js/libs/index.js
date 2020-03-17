//filter checkboxes
const england = document.getElementById("englandCheckbox");
const wales = document.getElementById("walesCheckbox");
const scotland = document.getElementById("scotlandCheckbox");
const northernIreland = document.getElementById("northernIrelandCheckbox");
const countyAverage = document.getElementById("averageCheckbox");

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
            }
        } else {
            console.log("not ticked");
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




