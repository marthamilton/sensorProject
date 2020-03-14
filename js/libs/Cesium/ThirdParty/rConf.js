requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        jquery: 'jquery-3.4.1.min',
        cesium: 'Cesium/Cesium',
        main: 'index',
        displayManager: 'displayManager',
        aboutBoxContent: 'aboutBoxContent',
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
requirejs(['displayManager'], function ($) {
    console.log($) // OK
});
requirejs(['aboutBoxContent'], function ($) {
    console.log($) // OK
});
