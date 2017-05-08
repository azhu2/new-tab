newTabApp.filter('leadingZeroFilter', function() {
    return function(number, digits) {
        var str = number < 0 ? '-' : '';
        var numberAbs = Math.abs(number);

        if (numberAbs < 1) {
            str += '0'.repeat(digits - 1);
        } else {
            var digitsLeft = digits - 1;
            while (numberAbs < Math.pow(10, digitsLeft)) {
                str += '0';
                digitsLeft--;
            }
        }

        str += numberAbs;

        return str;
    };
});