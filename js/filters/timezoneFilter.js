newTabApp.filter('timezoneFilter', function($filter) {
    return function(timezoneOffset) {
        var timezoneOffsetHours = timezoneOffset / 3600;
        var timezoneOffsetMin = timezoneOffset / 60 - timezoneOffsetHours * 60;

        var timezoneStr = timezoneOffset >= 0 ? '+' : '';
        timezoneStr += $filter('leadingZeroFilter')(timezoneOffsetHours, 2);
        timezoneStr += $filter('leadingZeroFilter')(timezoneOffsetMin, 2);

        return timezoneStr;
    };
});