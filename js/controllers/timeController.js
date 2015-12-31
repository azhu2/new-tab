newTabApp.controller('timeController', function($scope, $filter, $timeout, TimezoneService){
    var time = new Date();
    $scope.$on('location-found', function(){
        TimezoneService.timezone($scope.latitude, $scope.longitude).get(function(timezoneData){
            var timezone = timezoneData.rawOffset + timezoneData.dstOffset;
            var utcTime = time.getTime() + time.getTimezoneOffset() * 60000;
            time.setTime(utcTime + timezone * 1000);
        });
    });

    var updateTime = function(){
        time.setTime(time.getTime() + 1000);
        $scope.time = $filter('date')(time, 'HH:mm:ss');
        $scope.date = $filter('date')(time, 'EEEE, MMMM d, yyyy');
        $scope.timeString = $filter('date')(time, 'HHmmss');
    }

    var queueUpdate = function(){
        $timeout(function(){
            updateTime();
            queueUpdate();
        }, 1000);
    }

    var queueHardUpdate = function() {
        $timeout(function() {
            time = new Date();
            queueHardUpdate();
        }, 60000);
    }

    queueUpdate();
    queueHardUpdate();
});
