newTabApp.controller('weatherController', function($scope, $timeout, GeolocationResource, WeatherResource){
    function updateWeather(){
        GeolocationResource.getLocation(function(coords){
            var latitude = coords.latitude;
            var longitude = coords.longitude;

            WeatherResource.getWeather(latitude, longitude).get(function(data){
                $scope.weather = data;
            });
        });
    };

    // Refresh weather once an hour
    function queueUpdate(){
        weatherTimeoutId = $timeout(function(){
            updateWeather();
            queueUpdate();
        }, 3600000);
    }

    updateWeather();
    queueUpdate();
});

