newTabApp.filter('longitudeFilter', function() {
    return function(longitude) {
        if(!longitude)
            return;
        var direction = longitude < 0 ? ' W' : ' E';
        return convertLatLongToString(longitude) + direction;
    }
});

newTabApp.filter('latitudeFilter', function() {
    return function(latitude) {
        if(!latitude)
            return;
        var direction = latitude < 0 ? ' S' : ' N';
        return convertLatLongToString(latitude) + direction;
    }
});

// Criminally hacky...
var convertLatLongToString = function(value) {
    var value = Math.abs(value);

    var degrees = Math.floor(value);
    var minutes = Math.floor((value -= degrees) * 60);
    var seconds = Math.floor((value * 60 - minutes) * 60);

    return degrees + '\u00b0 ' + minutes + '\' ' + seconds + '"';
}