var newTabApp = angular.module('newTabApp', [ 'ngResource', 'config' ]);

newTabApp.controller('timeController', function($scope, $filter, $timeout){
    function updateTime(){
        var timeObj = new Date();
        $scope.time = $filter('date')(timeObj, 'HH:mm:ss');
        $scope.date = $filter('date')(timeObj, 'EEEE, MMMM d, yyyy');
        $scope.timeString = $filter('date')(timeObj, 'HHmmss');
    }

    function queueUpdate(){
    	timeoutId = $timeout(function(){
            updateTime();
            queueUpdate();
        }, 1000);
    }

    queueUpdate();
});

newTabApp.controller('weatherController', function($scope, WeatherResource){
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error);
    else
        console.warn('Geolocation is not enabled in this browser.');

    function success(position){
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
    }

    function error(error){
        console.warn('ERROR in retrieving geolocation (' + error.code + '): ' + error.message);
    }
});

newTabApp.service('WeatherResource', function($resource, config){

});