newTabApp.directive('weatherSnippet', ['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        scope: {
            data : '=',             // Weather data
            summary : '=',          // Summary sentence
            day : '=',              // Day data - use for day/night specific icons
            label : '@',            // Title to display
            showPrecipDetail : '='  // Show precipitation intensity?
        },
        templateUrl: '../../templates/weather.html',
        link: function(scope, element, attrs) {
            scope.updateWeather = function() {
                $rootScope.$broadcast('weatherUpdateQueued');
            };
        }
    };
}]);