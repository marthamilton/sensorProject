function filterWarning() {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: '<b>Filter could not be applied, please make sure you select an area and filter type next time</b>',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: 'Dismiss',
            confirmButtonAriaLabel: 'Dismiss',
            imageUrl: 'images/happyearth.gif',
            imageHeight: 150,
        }).then(() => {
            console.log("needs to be finished");
            //addCesiumPoints();
        });
    });
}

function noDataWarning(lastUpdated) {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: '<b>This sensor is offline. </b>' + lastUpdated,
            timer: 10000,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, Thanks!',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
            imageUrl: 'images/happyearth.gif',
            imageHeight: 150,
        });
    });
}