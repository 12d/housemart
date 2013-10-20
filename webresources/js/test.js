define(function (require, exports, module){

/**
 * @module Mbox
 * @required jQuery
 */

    var $ = require('jquery'),
    	Mbox = require('widget/mbox');

    	Mbox.alert('asdfas');
    	window.Mbox = Mbox;

    module.exports = {
        init: function(){console.log(arguments)}
    }
    
});