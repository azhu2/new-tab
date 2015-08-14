newTabApp.service('WeatherResource', function($resource, api_keys){
    this.getWeather = function(latitude, longitude){
        var apiKey = api_keys.forecastioApiKey;
        return $resource('https://api.forecast.io/forecast/' 
            + apiKey + '/' + latitude + ',' + longitude);
    };

    this.getNoaaWeather = function(latitude, longitude){
        return $resource('http://forecast.weather.gov/MapClick.php'
            + '?lat=' + latitude + '&lon=' + longitude + '&FcstType=json');
    };
});

