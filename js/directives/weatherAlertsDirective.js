newTabApp.directive('weatherAlerts', ['$modal', '$rootScope', function($modal, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            alerts : '='
        },
        templateUrl: '../../templates/alerts.html',
        controller: function($scope) {
            $scope.showAlerts = function() {
                $modal.open({
                    templateUrl: '../../templates/alertsModal.html',
                    scope: $scope
                });
            };
        }
    };
}]);