// Creates a warning when users load the application - to explain the project
function onLoadWarning() {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.mixin({
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: 'Next &rarr;',
            progressSteps: ['1', '2', '3', '4', '5', '6'],
            confirmButtonText: 'Next',
            confirmButtonAriaLabel: 'Next',
        }).queue([{
                title: 'Welcome to my final year project!',
                html: "<b>Please allow me to walk you through my project and it's features.</b>",
                showCancelButton: true,
                confirmButtonText: "I'm new to this project",
                cancelButtonText: "I've been here before",
                imageUrl: 'images/happyearth.gif',
                imageHeight: 150,
            }, {
                title: 'The points on the map represent air quality sensors',
                html: '<b>Click on a sensor and the information box will appear, containing a line chart which shows the air quality % over time.</b>',
                imageUrl: 'images/pointsOnMap.png',
                imageHeight: 150
            }, {
                title: 'To view all, click&nbsp;<i>Sensors</i>',
                html: '<b>Make sure to choose the sensor type you want to view. E.g. Air Quality.</br></br> If you would like to find a sensor on the map, click on the button <i>Find Sensor</i>.</b>',
                imageUrl: 'images/sensorMenuScreenshot.png',
                imageHeight: 150,
            }, {
                title: 'To add a filter, click&nbsp;<i>Filters</i>',
                html: '<b>Adding a filter will turn the map into a bar chart and you can click on a region to show more information.</br></br> When you are done, make sure to revisit <i>Filters</i> to reset.</b>',
                imageUrl: 'images/filtersScreenshot.png',
                imageHeight: 150,
            },
            {
                title: 'Please note, due to current circumstances:',
                html: '<b>The only sensor with live data has the id: 1234, and can easily be found in <i>Sensors</i>.</br></br>The remaining sensors have no data or dummy data.</br></br>The data and locations represented in this project are not indicative of real world results.</b>',
                imageUrl: 'images/happyearth.gif',
                imageHeight: 150,
            },
            {
                title: 'Before you start exploring:',
                html: '<b>Please visit <i>About</i> to find out more.</br></br>Do not hesitate to click <i>Help</i> if you get stuck.</br></br>Thank you!</b>',
                imageUrl: 'images/happyearth.gif',
                imageHeight: 150,
                confirmButtonText: 'Dismiss',
                confirmButtonAriaLabel: 'Dismiss'
            }
        ])
    });
}

// Creates a sensor menu warning using SweetAlerts - when the user has not reset the filter before clicking on the sensor menu
function sensorMenuWarning(Cesium, viewer, england, wales, countyAverage) {
    requirejs(['sweetalert', 'jquery'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: '<b>Please make sure to reset the filter in <i>Filters</i> before trying to view <i>Sensors</i>!</b>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            allowOutsideClick: false,
            cancelButtonText: 'Dismiss',
            cancelButtonAriaLabel: 'Dismiss',
            confirmButtonText: 'Reset Filter',
            confirmButtonAriaLabel: 'Reset Filter',
            imageUrl: 'images/happyearth.gif',
            imageHeight: 150
        }).then(function(result) {
            if(result.value){
                resetFilter(Cesium, viewer, england, wales, countyAverage);
                $('#sensors').modal('hide');
            } else {
                $('#sensors').modal('hide');
            }
        });
    })
}

// Creates a filter warning using SweetAlerts - when the user does not select a filter correctly
function filterWarning() {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: '<b>Filter could not be applied, please make sure you select an area and filter type next time.</b>',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'Dismiss',
            confirmButtonAriaLabel: 'Dismiss',
            imageUrl: 'images/happyearth.gif',
            imageHeight: 150
        })
    });
}

// Creates a warning when there is no data for a sensor using SweetAlerts
function noDataWarning(lastUpdated) {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: lastUpdated,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'Dismiss',
            confirmButtonAriaLabel: 'Dismiss',
            imageUrl: 'images/happyearth.gif',
            imageHeight: 150
        });
    });
}