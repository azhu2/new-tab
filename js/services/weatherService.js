newTabApp.factory('WeatherService', function($q, $rootScope, $resource, $timeout, api_keys, config, GeolocationService){
    var apiKey = api_keys.forecastioApiKey;
    var latitude;
    var longitude;
    var weatherDataResolved = $q.defer();
    var noaaWeatherDataResolved = $q.defer();
    var weatherData;
    var noaaWeatherData;

    var init = function() {
        GeolocationService.getLocation(function(coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
            updateWeather();
        });
        $rootScope.$on('weatherUpdateQueued', function() {
            updateWeather();
        });
    };

    function updateWeather(){
        $resource('https://api.forecast.io/forecast/' + apiKey + '/' + latitude + ',' + longitude).get(function(data) {
            weatherDataResolved.resolve();
            weatherData = data;
            $rootScope.$broadcast('weatherChanged');
        });
        $resource('http://forecast.weather.gov/MapClick.php'  + '?lat=' + latitude + '&lon=' + longitude + '&FcstType=json').get(function(data) {
            noaaWeatherDataResolved.resolve();
            noaaWeatherData = data;
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
        return weatherDataResolved.promise.then(function() {
            return weatherData;
        });
    };

    var getNoaaWeather = function(){
        return noaaWeatherDataResolved.promise.then(function() {
            return noaaWeatherData;
        });
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
        getAlerts : getAlerts,
        updateWeather : updateWeather
    };
});

