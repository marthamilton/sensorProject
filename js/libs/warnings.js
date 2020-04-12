// Creates a filter warning using SweetAlerts - when the user does not select a filter correctly
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
            imageHeight: 150,
        });
    });
}