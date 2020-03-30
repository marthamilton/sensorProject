function filterWarning() {
    requirejs(['sweetalert'], function(sweetAlert) {
        sweetAlert.fire({
            title: 'Warning',
            html: '<b>Filter could not be applied, please make sure you select an area and filter type next time</b>',
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