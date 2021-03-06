newTabApp.controller('pageController',
    function($filter, $q, $rootScope, $scope, $interval, GeocodingService, GeolocationService, Location, LocationUtils, TimezoneService, WeatherService) {

    var location;

    function init() {
        updateTime();
        $interval(updateTime, 1000);

        checkLocationPermissions().then(function() {
            postInit();
        });
    };

    init();

    function checkLocationPermissions() {
        var deferred = $q.defer();

        if (window.chrome && chrome.extension) {
            console.log('Running as an extension; permissions check not needed');
            $scope.permissionsGranted = true;
            deferred.resolve();
        }

        navigator.permissions.query({name: 'geolocation'}).then(function(result) {
            if (result.state === 'granted') {
                console.info('Location permissions granted');
                $scope.permissionsGranted = true;
                deferred.resolve();
            }

            result.onchange = function() {
                if (result.state === 'granted') {
                    console.info('Location permissions granted');
                    $scope.permissionsGranted = true;
                    deferred.resolve();
                } else {
                    console.warn('Location permissions not granted; functionality will be limited');
                    $scope.permissionsGranted = false;
                }
            }
        });

        // Query location to force permissions prompt
        updateLocation();
        return deferred.promise;
    }

    /**
     * Run after location permissions granted.
     */
    function postInit() {
        updateLocation();

        $interval(updateLocation, 10000);
        $interval(updateWeather, 300000);

        $rootScope.$on('updateWeather', updateWeather);
    }

    function updateTime() {
        $scope.time = Date.now();
        $scope.timeString = $filter('date')($scope.time, 'HHmmss');
    };

    function updateLocation() {
        GeolocationService.getLocation().then(function(coords) {
            location = new Location(coords.latitude, coords.longitude);
            $scope.location = location;

            if (LocationUtils.shouldUpdateLocation(location)) {
                console.info('Detected new location: ' + location.latitude + ',' + location.longitude);
                updateLocationBasedData();
            }
        }).catch(function(exception) {
            console.error(exception);
        });
    };

    function updateLocationBasedData() {
        updateTimezone();
        updateLocationName();
        updateWeather();
    };

    function updateTimezone() {
        if (!location) {
            console.warn('Location not available; skipping timezone update');
        }

        TimezoneService.timezone(location).then(function(timezoneOffset) {
            var timezoneStr = $filter('timezoneFilter')(timezoneOffset);
            console.info('Determined timezone: ' + timezoneStr);
            $scope.timezone = timezoneStr;
        });
    };

    function updateLocationName() {
        if (!location) {
            console.warn('Location not available; skipping location name update');
        }

        GeocodingService.reverseGeocode(location).get(function(geocodeData) {
            if(geocodeData.results && geocodeData.results.length > 0) {
                $scope.locationName = geocodeData.results[0].formatted_address;
            } else {
                $scope.locationName = 'location unknown';
            }
        });
    };

    function updateWeather() {
        if (!location) {
            console.warn('Location not available; skipping weather update');
        }

        WeatherService.getWeather(location).get(function(weatherData) {
            console.info('Weather updated');
            $scope.weather = weatherData;
        });

        WeatherService.getAlerts(location).then(function(alertsData) {
            console.info('Weather alerts updated. Found ' + alertsData.length);
            $scope.weatherAlerts = alertsData;
        });
    };
})

.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);