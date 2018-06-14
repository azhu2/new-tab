newTabApp.service('TimezoneService', function($q, $resource, config){
    this.timezone = function(location){
        var time = new Date();
        var utcSeconds = time.getTime() / 1000;

        return $resource(config.serviceEndpoint + 'timezone-service' +
            '?latitude=' + location.latitude + '&longitude=' + location.longitude + '&timestamp=' + utcSeconds).get().$promise.then(function(timezoneData) {
                var timezoneOffset = timezoneData.rawOffset + timezoneData.dstOffset;     // s
                return timezoneOffset;
            });
    };
});
