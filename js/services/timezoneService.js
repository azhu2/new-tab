newTabApp.service('TimezoneService', function($resource, api_keys){
    this.timezone = function(latitude, longitude){
        var apiKey = api_keys.googleApiKey;
        var time = new Date();
        var utcSeconds = time.getTime() / 1000;
        return $resource('https://maps.googleapis.com/maps/api/timezone/json?location=' 
            + latitude + ',' + longitude + '&timestamp=' + utcSeconds + '&key=' + apiKey);
    };
});
