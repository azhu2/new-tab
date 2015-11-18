newTabApp.directive('weatherSnippet', function() {
    return {
        restrict: 'E',
        scope: {
            data : '=',
            summary : '=',
            day : '=',
            label : '@',
            showPrecipDetail : '='
        },
        templateUrl: '../../templates/weather.html'
    };
});