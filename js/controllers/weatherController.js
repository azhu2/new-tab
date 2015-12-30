newTabApp.controller('weatherController', function($scope, $rootScope, WeatherService){
    $rootScope.$on('weatherChanged', function() {
        WeatherService.getWeather().then(function(data) {
            $scope.weather = data;
        });
    });

    $rootScope.$on('noaaWeatherChanged', function() {
        WeatherService.getAlerts().then(function(data) {
            $scope.alerts = data;
        });
    });

    $rootScope.$on('weatherUpdateQueued', function() {
        delete $scope.weather;
        delete $scope.alerts;
    });
});

