(function() {
    function timecode() {
        return function(seconds) {
            
            if (typeof seconds !== 'number') {
                return '-:--';
            }
            
            /*var seconds = Number.parseFloat(seconds);
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;

            var output = minutes + ':';

            if (remainingSeconds < 10) {
             output += '0';   
            }

            output += remainingSeconds;*/
            
            return buzz.toTimer(seconds);
        };
    }
    
    angular
        .module("blocJams")
        .filter("timecode", timecode);
    
    
})()