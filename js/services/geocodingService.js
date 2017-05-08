newTabApp.service('GeocodingService', function($resource, api_keys){
    this.reverseGeocode = function(location){
        var apiKey = api_keys.googleApiKey;
        return $resource('https://maps.googleapis.com/maps/api/geocode/json?latlng='
            + location.latitude + ',' + location.longitude + '&key=' + apiKey
            + '&result_type=neighborhood|sublocality|locality|postal_code|administrative_area_level_1|country');
    };
});
