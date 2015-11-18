newTabApp.directive('weatherSnippet', function() {
    return {
        restrict: 'E',
        scope: {
            data : '=',
            summary : '=',
            day : '=',
            label : '@'
        },
        templateUrl: '../../templates/weather.html'
    };
});