newTabApp.factory('WeatherService', function($q, $rootScope, $resource, $timeout, api_keys, config, GeolocationService){
    var getWeather = function(location) {
        var apiKey = api_keys.forecastioApiKey;
        return $resource('https://api.darksky.net/forecast/' + apiKey + '/' + location.latitude + ',' + location.longitude)
    };

    var getNoaaWeather = function(location) {
        return $resource('http://forecast.weather.gov/MapClick.php'  + '?lat=' + location.latitude + '&lon=' + location.longitude + '&FcstType=json');
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

