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

newTabApp.controller('weatherController', function($scope, GeolocationResource, WeatherResource){
    GeolocationResource.getLocation(function(coords){
        var latitude = coords.latitude;
        var longitude = coords.longitude;

        WeatherResource.getWeather(latitude, longitude).get(function(data){
            $scope.weather = data;
        });
    });
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
