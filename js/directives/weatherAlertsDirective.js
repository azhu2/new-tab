newTabApp.directive('weatherAlerts', ['$uibModal', '$rootScope', function($uibModal, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            alerts : '='
        },
        templateUrl: 'templates/alerts.html',
        controller: function($scope) {
            $scope.showAlerts = function() {
                $uibModal.open({
                    templateUrl: 'templates/alertsModal.html',
                    scope: $scope
                });
            };
        }
    };
}]);