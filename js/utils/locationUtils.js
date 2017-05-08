newTabApp.service('LocationUtils', function() {
    var lastLocation;

    function shouldUpdateLocation(location) {
        if (!lastLocation) {
            lastLocation = location;
            return true;
        }

        // 1 minute ~= 1 mile depending on latitude
        var shouldUpdate = Math.max(Math.abs(location.latitude - lastLocation.Latitude), Math.abs(location.longitude - lastLocation.Longitude)) > 1/60;

        if (shouldUpdate) {
            lastLocation = location;
        }

        return shouldUpdate;
    }

    return {
        shouldUpdateLocation : shouldUpdateLocation
    };
});