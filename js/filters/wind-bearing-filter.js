// Bearing is reported in direction wind is from, but icons have it backwards.
// Also round to nearest 15 degrees
newTabApp.filter('windBearingFilter', function(){
    return function(bearing){
        var newBearing = Math.round(bearing / 15) * 15;
        newBearing = (newBearing + 180) % 360;
        return newBearing;
    };
})
