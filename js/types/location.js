newTabApp.factory('Location', function() {
    return function(latitude, longitude) {
        return {
            latitude : latitude,
            longitude : longitude
        };
    };
});