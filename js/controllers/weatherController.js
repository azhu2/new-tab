newTabApp.controller('weatherController', function($scope, $rootScope, WeatherService, ngDialog, config){
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

    $scope.open = function() {
        ngDialog.open({
            template: 'templates/alerts.html',
            className: 'ngdialog-theme-custom',
            controller: 'alertsController',
            scope: $scope
        });
    };
});

