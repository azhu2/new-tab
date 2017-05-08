newTabApp.service('TimezoneService', function($q, $resource, api_keys){
    this.timezone = function(location){
        var apiKey = api_keys.googleApiKey;
        var time = new Date();
        var utcSeconds = time.getTime() / 1000;

        return $resource('https://maps.googleapis.com/maps/api/timezone/json?location='
            + location.latitude + ',' + location.longitude + '&timestamp=' + utcSeconds + '&key=' + apiKey).get().$promise.then(function(timezoneData) {
                var timezoneOffset = timezoneData.rawOffset + timezoneData.dstOffset;     // s
                return timezoneOffset;
            });
    };
});
