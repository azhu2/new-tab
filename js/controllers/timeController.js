newTabApp.controller('timeController', function($scope, $filter, $timeout, TimezoneService){
    var time = new Date();
    $scope.$on('location-found', function(){
        hardUpdateTime();
    });

    var updateTime = function(){
        time.setTime(time.getTime() + 1000);
        $scope.time = $filter('date')(time, 'HH:mm:ss');
        $scope.date = $filter('date')(time, 'EEEE, MMMM d, yyyy');
        $scope.timeString = $filter('date')(time, 'HHmmss');
    }

    var hardUpdateTime = function() {
        console.log('Hard time refresh');
        var newTime = new Date();

        TimezoneService.timezone($scope.latitude, $scope.longitude).then(function(timezoneOffset){
            var utcTime = newTime.getTime() + newTime.getTimezoneOffset() * 60000;      // ms
            time.setTime(utcTime + timezoneOffset * 1000);
        });
    };

    var queueUpdate = function(){
        $timeout(function(){
            updateTime();
            queueUpdate();
        }, 1000);
    };

    var queueHardUpdate = function() {
        $timeout(function() {
            hardUpdateTime();
            queueHardUpdate();
        }, 5000);
    };

    queueUpdate();
    queueHardUpdate();
});
