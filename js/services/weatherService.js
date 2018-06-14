newTabApp.factory('WeatherService', function($q, $rootScope, $resource, $timeout, config, GeolocationService){
    var getWeather = function(location) {
        return $resource(config.serviceEndpoint + 'weather-service?latitude=' + location.latitude + '&longitude=' + location.longitude);
    };

    var getNoaaWeather = function(location) {
        return $resource(config.serviceEndpoint + 'weather-alert-service?latitude=' + location.latitude + '&longitude=' + location.longitude);
    };

    var getAlerts = function(location) {
        var deferred = $q.defer();

        getNoaaWeather(location).get(function(noaaData) {
            var hazards = noaaData.data.hazard;
            var alerts = [];
            for(var i = 0; i < hazards.length; i++){
                alerts.push({
                    text: hazards[i],
                    link: noaaData.data.hazardUrl[i].replace('&amp;', '&')
                });
            }
            deferred.resolve(alerts);
        });

        return deferred.promise;
    };

    return {
        getWeather : getWeather,
        getAlerts : getAlerts
    };
});

