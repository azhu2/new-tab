newTabApp.controller('weatherController', function($scope, $timeout, GeolocationService, WeatherService, ngDialog, config){
    function updateWeather(){
        GeolocationService.getLocation(function(coords){
            var latitude = coords.latitude;
            var longitude = coords.longitude;

            WeatherService.getWeather().then(function(data) {
                $scope.weather = data;
            });
            WeatherService.getAlerts().then(function(data) {
                $scope.alerts = data;
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

