newTabApp.controller('locationController', function($scope, GeolocationResource, GeocodingResource){
    GeolocationResource.getLocation(function(coords){
        var latitude = coords.latitude;
        var longitude = coords.longitude;
        $scope.latitude = latitude;
        $scope.longitude = longitude;
        console.log(latitude);
        $scope.$broadcast('location-found');

        GeocodingResource.reverseGeocode(latitude, longitude).get(function(data){
            $scope.location = data.results[0].formatted_address;
        });
    });
});
