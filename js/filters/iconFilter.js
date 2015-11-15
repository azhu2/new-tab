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
