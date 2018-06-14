newTabApp.service('GeocodingService', function($resource, config){
    this.reverseGeocode = function(location){
        return $resource(config.serviceEndpoint + 'geocoding-service?latitude=' + location.latitude + '&longitude=' + location.longitude);
    };
});
