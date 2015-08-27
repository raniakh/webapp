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

        get_hash: function(){
        if (window.location.hash) {
            //  Get the hash from URL
            var url = window.location.hash;
            //  Remove the #
            var current_hash = url.substring(1);
            //  activate tab
            UTILS.set_tab('tabs-list', current_hash);

        }
    },


addSelectToDropDownList : function($selectElement ,name,url){
        var $option = $( '<option></option>' );
        $option.attr( 'value',url );
        $option.text(name);
        $selectElement.append($option);
    },

    submitForm: function(e){
        e.preventDefault();
        var $form = $(e.target),
            $adresses = $( '#adresses-' + $form.attr('id') ).eq(0),
            $inputsName = $form.find('input[type="text"]'),
            $inputsUrl = $form.find('input[type="url"]');

            var nameVal , urlVal, emptyCounter = 0;
            
            //reset bookmark
            $adresses.find('option').remove();

            for (var i = 0; i < $inputsName.length; i++) {
            url = $inputsUrl.eq(i).val();
            name = $inputsName.eq(i).val();
            

            // check if not empty and add to bookmark
            if(name !== '' && url !== '' ){
                UTILS.addSelectToDropDownList($adresses,name,url);
            }
            else{
                emptyCounter++;
            }

            }// end for

            // show bookmark - iframe - expand in case emptyCounter is not zero
                if(emptyCounter != 3){

                    $adresses.focus();
                    UTILS.setIframe($adresses.children(0).attr('value'), $form.attr('id'));
                    $('#btnSettings-'+ $form.attr('id')).click();
                    UTILS.showSelectButtonAndIframe($form.attr('id'));
                }
                else{
                    $adresses.find('option').remove();
                    UTILS.hideSelectButtonAndIframe($form.attr('id'));
                }

            UTILS.saveToLocalStorage();

            return true;


    },

    setIframe: function(val,id){
        $('.iframe-'+id).attr( 'src' , val );
        $('#expand-'+id).attr( 'href', val );
    },

    showSelectButtonAndIframe: function(id){
        $('#adresses-' + id + ', .content-' + id + ', #expand-' + id).removeClass('hidden');
    },


    set_tab: function(tab_container_id, tab_id){
        //  Remove class "active" from currently active tab
        $('.' + tab_container_id + ' li a').removeClass('tab-active');
        $('.' + tab_container_id + ' li').removeClass('active');
 
        //  Now add class "active" to the selected/clicked tab
        $('#' + tab_container_id + ' a[rel="'+tab_id+'"]').addClass("tab-active");
        $('#'+tab_id).addClass("active");
 
        // hide all tabs
        $('#' + tab_container_id + '_content .tab').addClass('hidden');
 
        //  Show the selected tab content
        $('#' + tab_container_id + '_content #' + tab_id).removeClass('hidden');
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
$(document).ready(function(){


    $('.formSettings').submit(UTILS.submitForm);

    UTILS.get_hash();
    $(window).bind('hashchange', function(e){
       UTILS.get_hash(); 
    });
    $(".tabs-list li").click(function(e){
        var tab_id = $(this).children('a').attr('rel');
        window.location.hash = tab_id ;
        return false;
    });


// GET AJAX NOTIFICATION
    
        $.ajax({

            url: 'data/notification.json',
            dataType: "json"

        })
        .done(function (response) {
            if (response && response !== '') {
                $('.notifications').removeClass('hidden');
                $('.notifications').text(response.notification);
            }
        });


});