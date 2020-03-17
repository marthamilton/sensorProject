requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        jquery: 'jquery-3.4.1.min',
        cesium: 'Cesium/Cesium',
        main: 'index',
<<<<<<< HEAD
        chartjs: 'Chart'
=======
        sensor: 'sensor'
>>>>>>> addingSensorPoints
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
<<<<<<< HEAD

requirejs(['chartjs'], function ($) {
=======
requirejs(['sensor'], function ($) {
>>>>>>> addingSensorPoints
    console.log($) // OK
});
