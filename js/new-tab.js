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

newTabApp.controller('locationController', function($scope, GeolocationResource, GeocodingResource){
    GeolocationResource.getLocation(function(coords){
        var latitude = coords.latitude;
        var longitude = coords.longitude;
        $scope.latitude = latitude;
        $scope.longitude = longitude;

        GeocodingResource.reverseGeocode(latitude, longitude).get(function(data){
            $scope.location = data.results[0].formatted_address;
        });
    });
});

newTabApp.controller('weatherController', function($scope, $timeout, GeolocationResource, WeatherResource){
    function updateWeather(){
        GeolocationResource.getLocation(function(coords){
            var latitude = coords.latitude;
            var longitude = coords.longitude;

            WeatherResource.getWeather(latitude, longitude).get(function(data){
                $scope.weather = data;
            });
        });
    };

    // Refresh weather once an hour
    function queueUpdate(){
        weatherTimeoutId = $timeout(function(){
            updateWeather();
            queueUpdate();
        }, 3600000);
    }

    updateWeather();
    queueUpdate();
});

newTabApp.service('GeolocationResource', function($resource){
    this.getLocation = function(callback){
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(success, error);
        else
            console.warn('Geolocation is not enabled in this browser.');

        function success(position){
            callback(position.coords);
        }

        function error(error){
            console.warn('ERROR in retrieving geolocation (' + error.code + '): ' + error.message);
        }
    };
});

newTabApp.service('GeocodingResource', function($resource, config){
    this.reverseGeocode = function(latitude, longitude){
        var apiKey = config.googleApiKey;
        return $resource('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + latitude + ',' + longitude + '&key=' + apiKey 
            + '&result_type=locality');
    };
});

newTabApp.service('WeatherResource', function($resource, config){
    this.getWeather = function(latitude, longitude){
        var apiKey = config.forecastioApiKey;
        return $resource('https://api.forecast.io/forecast/' 
            + apiKey + '/' + latitude + ',' + longitude);
    };
});

// Convert forecast.io icons to weather-icons
newTabApp.filter('iconFilter', function(){
    return function(icon){
        switch(icon){
            case 'clear-day':
                return 'wi-day-sunny';
            case 'clear-night':
                return 'wi-night-clear';
            case 'rain':
                return 'wi-rain';
            case 'snow':
                return 'wi-snow';
            case 'sleet':
                return 'wi-day-sleet';
            case 'wind':
                return 'wi-strong-wind';
            case 'fog':
                return 'wi-fog';
            case 'cloudy':
                return 'wi-cloudy';
            case 'partly-cloudy-day':
                return 'wi-day-cloudy';
            case 'partly-cloudy-night':
                return 'wi-night-partly-cloudy';
        }
    };
});

// Bearing is reported in direction wind is from, but icons have it backwards.
// Also round to nearest 15 degrees
newTabApp.filter('windBearingFilter', function(){
    return function(bearing){
        var newBearing = Math.round(bearing / 15) * 15;
        newBearing = (newBearing + 180) % 360;
        return newBearing;
    };
})