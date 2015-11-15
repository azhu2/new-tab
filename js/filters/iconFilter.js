// Convert forecast.io icons to weather-icons
newTabApp.filter('iconFilter', function(){
    return function(icon, sunrise, sunset){
        if(!sunrise || !sunset) {
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
                    return 'wi-sleet';
                case 'wind':
                    return 'wi-windy';
                case 'fog':
                    return 'wi-fog';
                case 'cloudy':
                    return 'wi-cloudy';
                case 'partly-cloudy-day':
                    return 'wi-day-cloudy';
                case 'partly-cloudy-night':
                    return 'wi-night-partly-cloudy';
            }
        }

        var time = new Date().getTime();
        if(time < sunrise || time > sunset) {   // night
            switch(icon){
                case 'clear-day':
                    return 'wi-day-sunny';
                case 'clear-night':
                    return 'wi-night-clear';
                case 'rain':
                    return 'wi-night-alt-rain';
                case 'snow':
                    return 'wi-night-alt-snow';
                case 'sleet':
                    return 'wi-night-alt-sleet';
                case 'wind':
                    return 'wi-night-alt-windy';
                case 'fog':
                    return 'wi-night-fog';
                case 'cloudy':
                    return 'wi-night-alt-cloudy';
                case 'partly-cloudy-day':
                    return 'wi-day-cloudy';
                case 'partly-cloudy-night':
                    return 'wi-night-alt-partly-cloudy';
            }
        }
        else { //day
            switch(icon){
                case 'clear-day':
                    return 'wi-day-sunny';
                case 'clear-night':
                    return 'wi-night-clear';
                case 'rain':
                    return 'wi-day-rain';
                case 'snow':
                    return 'wi-day-snow';
                case 'sleet':
                    return 'wi-day-sleet';
                case 'wind':
                    return 'wi-strong-wind';
                case 'fog':
                    return 'wi-day-fog';
                case 'cloudy':
                    return 'wi-day-cloudy';
                case 'partly-cloudy-day':
                    return 'wi-day-cloudy';
                case 'partly-cloudy-night':
                    return 'wi-night-partly-cloudy';
            }
        }
    };
});
