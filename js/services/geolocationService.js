newTabApp.service('GeolocationService', function($q, $resource){
    // TODO Can I get rid of ugly callbacks?
    this.getLocation = function(callback){
        var deferred = $q.defer();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            deferred.reject('Geolocation is not enabled in this browser.');
        }

        return deferred.promise;

        function success(position){
            deferred.resolve(position.coords);
        }

        function error(error){
            deferred.reject('ERROR in retrieving geolocation - (' + error.code + '): ' + error.message +
                ' - Google Maps API may be down. Check https://developers.google.com/maps/documentation/javascript/examples/map-geolocation');
        }
    };
});

