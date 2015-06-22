newTabApp.service('GeocodingResource', function($resource, config){
    this.reverseGeocode = function(latitude, longitude){
        var apiKey = config.googleApiKey;
        return $resource('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + latitude + ',' + longitude + '&key=' + apiKey 
            + '&result_type=locality');
    };
});

