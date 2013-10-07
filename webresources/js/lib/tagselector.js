/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 10/7/13
 * Time: 11:34 AM
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    var $ = require('jquery'),
        NOOP = function(){};

    function TagSelector(options){
        this.options = {
            onSelect: NOOP
        };

        $.extend(this.options, options);
    };
    TagSelector.prototype = {
        constructor: TagSelector,
        select: function(dom){

        }
    }
});
