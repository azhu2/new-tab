newTabApp.service('GeolocationService', function($resource){
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

