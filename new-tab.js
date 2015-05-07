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

newTabApp.controller('locationController', function($scope, GeocodingResource){
    var latitude;
    var longitude;

    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    else
        console.warn('Geolocation is not enabled in this browser.');

    function geolocationSuccess(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        $scope.latitude = latitude;
        $scope.longitude = longitude;

        GeocodingResource.reverseGeocode(latitude, longitude).get(
        function(data){
            $scope.location = data.results[0].formatted_address;
        });

    }

    function geolocationError(error){
        console.warn('ERROR in retrieving geolocation (' + error.code + '): ' + error.message);
    }
});

newTabApp.service('WeatherResource', function($resource, config){

});

newTabApp.service('GeocodingResource', function($resource, config){
    this.reverseGeocode = function(latitude, longitude){
        var apiKey = config.googleApiKey;
        return $resource('https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + latitude + ',' + longitude + '&key=' + apiKey 
            + '&result_type=locality');
    };
});