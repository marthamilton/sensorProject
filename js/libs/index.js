//Cesium
define(['cesium', 'createCesiumPoints', 'sensorMenu', 'regionFilters'], function (Cesium) {
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

        // Use BingMaps - Attached to cesium token account
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
        $("#myNavbar").collapse('hide');
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
    const countyAverage = document.getElementById("averageCheckbox");

    addCesiumPoints(Cesium, viewer);

    // Element for the sensor menu
    const sensorMenuElement = document.getElementById("sensorMenu");
    // When the sensor menu is clicked
    sensorMenuElement.addEventListener("click", () => {
        createSensorMenu(viewer, Cesium, england, wales, countyAverage);
    });

    // User clicks on a point on the map (entity) or a region when a filter is applied
    viewer.selectedEntityChanged.addEventListener(function (entity) {
       createInformationBox(viewer, entity);
    });

    //When the apply button in filters is clicked
    document.getElementById("applyFilters").addEventListener("click", function () {
       applyFilter(Cesium, viewer, england, wales, countyAverage, center);
    });

    //When the reset button in filters is clicked
    document.getElementById("resetFilters").addEventListener("click", function () {
        resetFilter(Cesium, viewer, england, wales, countyAverage);
    });
});