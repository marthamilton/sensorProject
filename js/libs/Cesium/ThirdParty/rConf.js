requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        jquery: 'jquery-3.4.1.min',
        bootstrap: 'bootstrap-3.4.1.min',
        cesium: 'Cesium/Cesium',
        main: 'index',
        createCesiumPoints: 'createCesiumPoints',
        chartjs: 'Chart.min',
        sweetalert: 'sweetalert2.all.min',
        warnings: 'warnings',
        informationBox: 'informationBox',
        sensorMenu: 'sensorMenu',
        regionFilters: 'regionFilters',
        createChart: 'createChart',
    }
});
requirejs(['jquery'], function () {
    $('.nav a').on('click', function () {
        $('.navbar-toggle').click();
    });
});
require(['bootstrap']);

requirejs(['main'], function ($) {
    require(['cesium']);
    require(['informationBox']);
    require(['createChart']);
    require(['warnings']);
});