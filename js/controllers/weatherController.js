newTabApp.controller('weatherController', function($scope, $timeout, GeolocationService, WeatherService, ngDialog, config){
    function updateWeather(){
        GeolocationService.getLocation(function(coords){
            var latitude = coords.latitude;
            var longitude = coords.longitude;

            WeatherService.getWeather(latitude, longitude).get(function(data){
                $scope.weather = data;
            });

            WeatherService.getNoaaWeather(latitude, longitude).get(function(data){
                var hazards = data.data.hazard;
                var alerts = [];
                for(var i = 0; i < hazards.length; i++){
                    alerts.push({
                        text: hazards[i],
                        link: data.data.hazardUrl[i].replace('&amp;', '&')
                    });
                }
                $scope.alerts = alerts;
            });
        });
    };

    // Refresh weather once an hour
    function queueUpdate(){
        weatherTimeoutId = $timeout(function(){
            updateWeather();
            queueUpdate();
        }, config.weatherRefreshInterval);
    }

    updateWeather();
    queueUpdate();

    $scope.open = function() {
        ngDialog.open({
            template: 'templates/alerts.html',
            className: 'ngdialog-theme-custom',
            controller: 'alertsController',
            scope: $scope
        });
    };
});

