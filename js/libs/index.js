requirejs(['cesium'], function (Cesium) {
    
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMDgxODJmNS1lNDg5LTRkOTktOWQyZi1lYWQyNDNhZWUwMzQiLCJpZCI6MjMxMjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODI3NTk4ODN9.Gq-ahGBhm4OfLhnaEOezN1E38KhlqhBLQVfsa3aKBTA';
    var viewer = new Cesium.Viewer('cesiumContainer');
    viewer.infoBox.frame.sandbox = "allow-scripts";
});