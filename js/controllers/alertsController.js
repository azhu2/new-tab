newTabApp.controller('alertsController', function($scope, $rootScope, $modal, WeatherService){
    $rootScope.$on('noaaWeatherChanged', function() {
        WeatherService.getAlerts().then(function(alerts) {
            $scope.alerts = alerts;
        });
    });

    $scope.showAlerts = function() {
        $modal.open({
            templateUrl: '../../templates/alerts.html',
            scope: $scope
        });
    };
});

