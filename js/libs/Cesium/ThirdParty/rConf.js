requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        jquery: 'jquery-3.4.1.min',
        cesium: 'Cesium/Cesium',
        main: 'index',
        sensor: 'sensor'
    }
});
requirejs(['jquery'], function ($) {
    console.log($) // OK
});
requirejs(['cesium'], function ($) {
    console.log($) // OK
});
requirejs(['main'], function ($) {
    console.log($) // OK
});
requirejs(['sensor'], function ($) {
    console.log($) // OK
});
