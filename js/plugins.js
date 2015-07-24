/**
 * JS Library v0
 */

var UTILS = (function () {

    return {
        /**
         * Check if a given value is a plain Object
         *
         * @param  {*}       o Any value to be checked
         * @return {Boolean}   true if it's an Object
         */
        isObject: function (o) {
            var toString = Object.prototype.toString;
            return (toString.call(o) === toString.call({}));
        },

        addEvent: function ( obj, type, handler ) {
            if ( obj.attachEvent ) {
            obj['e'+type+handler] = handler;
            obj[type+handler] = function(){
                obj['e'+type+handler]( window.event );
                };
            obj.attachEvent( 'on'+type, obj[type+handler] );
            } else
            obj.addEventListener( type, handler, false );
        },

        removeEvent: function( obj, type, handler ) {
            if ( obj.detachEvent ) {
                obj.detachEvent( 'on'+type, obj[type+handler] );
                obj[type+handler] = null;
            } else
            obj.removeEventListener( type, handler, false );
        },
    
    };
}());





// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
