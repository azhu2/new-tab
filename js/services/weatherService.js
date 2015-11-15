newTabApp.factory('WeatherService', function($q, $rootScope, $resource, $timeout, api_keys, config, GeolocationService){
    var apiKey = api_keys.forecastioApiKey;
    var latitude;
    var longitude;
    var weatherData = $q.defer();
    var noaaWeatherData = $q.defer();

    var init = function() {
        GeolocationService.getLocation(function(coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
            updateWeather();
        });
    };

    function updateWeather(){
        $resource('https://api.forecast.io/forecast/' + apiKey + '/' + latitude + ',' + longitude).get(function(data) {
            weatherData.resolve(data);
            $rootScope.$broadcast('weatherChanged');
        });
        $resource('http://forecast.weather.gov/MapClick.php'  + '?lat=' + latitude + '&lon=' + longitude + '&FcstType=json').get(function(data) {
            noaaWeatherData.resolve(data);
            $rootScope.$broadcast('noaaWeatherChanged');
        });
    };

    // Refresh weather
    function queueUpdate(){
        weatherTimeoutId = $timeout(function(){
            updateWeather();
            queueUpdate();
        }, config.weatherRefreshInterval);
    }

    var getWeather = function(){
        return weatherData.promise;
    };

    var getNoaaWeather = function(){
        return noaaWeatherData.promise;
    };

    var getAlerts = function() {
        return getNoaaWeather().then(function(noaaData) {
            var hazards = noaaData.data.hazard;
            var alerts = [];
            for(var i = 0; i < hazards.length; i++){
                alerts.push({
                    text: hazards[i],
                    link: noaaData.data.hazardUrl[i].replace('&amp;', '&')
                });
            }
            return alerts;
        });
    };

    init();
    queueUpdate();

    return {
        getWeather : getWeather,
        getNoaaWeather : getNoaaWeather,
        getAlerts : getAlerts
    };
});

