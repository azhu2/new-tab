newTabApp.service('GeocodingResource', function($resource, api_keys){
    this.reverseGeocode = function(latitude, longitude){
        var apiKey = api_keys.googleApiKey;
        return $resource('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + latitude + ',' + longitude + '&key=' + apiKey 
            + '&result_type=locality');
    };
});
