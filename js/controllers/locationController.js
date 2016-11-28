newTabApp.controller('locationController', function($scope, GeolocationService, GeocodingService){
    GeolocationService.getLocation(function(coords){
        var latitude = coords.latitude;
        var longitude = coords.longitude;
        $scope.latitude = latitude;
        $scope.longitude = longitude;
        console.log('Location found: ' + $scope.latitude + ' | ' + $scope.longitude);
        $scope.$broadcast('location-found');

        GeocodingService.reverseGeocode(latitude, longitude).get(function(data){
            if(data.results) {
                $scope.location = data.results[0].formatted_address;
            } else {
                $scope.location = '(location unknown)';
            }
        });
    });
});
