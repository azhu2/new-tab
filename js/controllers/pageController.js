newTabApp.controller('pageController', function($filter, $q, $scope, $interval, GeocodingService, GeolocationService, Location, LocationUtils, TimezoneService, WeatherService) {

    function init() {
        updateTime();
        updateLocation();

        $interval(updateTime, 1000);
        $interval(updateLocation, 10000);
    };

    init();

    function updateTime(){
        $scope.time = Date.now();
        $scope.timeString = $filter('date')($scope.time, 'HHmmss');
    }

    function updateLocation() {
        GeolocationService.getLocation().then(function(coords) {
            var location = new Location(coords.latitude, coords.longitude);
            $scope.location = location;

            if (LocationUtils.shouldUpdateLocation(location)) {
                console.info('Detected new location: ' + location.latitude + ',' + location.longitude);
                updateLocationBasedData(location);
            }
        });
    };

    function updateLocationBasedData(location) {
        updateTimezone(location);
        updateLocationName(location);
    };

    function updateTimezone(location) {
        TimezoneService.timezone(location).then(function(timezoneOffset){
            var timezoneStr = $filter('timezoneFilter')(timezoneOffset);
            console.info('Determined timezone: ' + timezoneStr);
            $scope.timezone = timezoneStr;
        });
    };

    function updateLocationName(location) {
        GeocodingService.reverseGeocode(location).get(function(data){
            if(data.results && data.results.length > 0) {
                $scope.locationName = data.results[0].formatted_address;
            } else {
                $scope.locationName = 'location unknown';
            }
        });
    }
})

.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);