var newTabApp = angular.module('newTabApp', [ 'ngResource' ]);

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