requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        jquery: 'jquery-3.4.1.min',
        cesium: 'Cesium/Cesium',
        main: 'index',
        chartjs: 'Chart',
        sweetalert: 'sweetalert2.all.min',
        bootstrapModelWrapper: 'bootstrap.model.wrapper',
    }
});
requirejs(['jquery'], function($) {
    console.log($) // OK
});
requirejs(['cesium'], function($) {
    console.log($) // OK
});
requirejs(['main'], function($) {
    console.log($) // OK
});
requirejs(['chartjs'], function($) {
    console.log($) // OK
});
requirejs(['sweetalert'], function($) {
    console.log($) // OK
});
requirejs(['bootstrapModelWrapper'], function($) {
    console.log($) // OK
});