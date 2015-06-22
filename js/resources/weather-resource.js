newTabApp.service('WeatherResource', function($resource, config){
    this.getWeather = function(latitude, longitude){
        var apiKey = config.forecastioApiKey;
        return $resource('https://api.forecast.io/forecast/' 
            + apiKey + '/' + latitude + ',' + longitude);
    };
});

