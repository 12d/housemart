/**
 * @author: xuweichen
 * @date: 13-7-25 上午10:49
 * @descriptions
 */
define(function (require, exports, module){
    'use strict';

    var $ = require('jquery'),
        mvc = require('lib/mvc'),
        mix = $.extend,
        NOOP = function(){};

    function PageBar(options){
        var defaultOptions = {
                total: 10,
                onPaging: NOOP
            },
            opts;

        opts = mix(defaultOptions, options);
        this.total = opts.total;
        this.wrap = opts.wrap;
        this.options = opts;
        this.current = options.current || 0;
        this.update(this.current, opts.total);
        this._bindEvent();
    };

    PageBar.prototype = {
        constructor: PageBar,
        pageTo: function(page){
            var self = this,
                total = self.total,
                opts = self.options;

            page = parseInt(page)||0;
            if(page<=0){ page=1; };
            if(page>total){ page=total; };

            self._render(opts.tpl, self._getPages(page, self.total));
            self.current = page;
            opts.onPaging.call(self, page);
            return self;

        },
        next: function(){
            this.pageTo(this.current+1);
        },
        previous: function(){
            this.pageTo(this.current-1);
        },
        update: function(current, total){
            var self = this;
            self.total = total;
            self._render(self.options.tpl, self._getPages(current, total));
        },
        _bindEvent: function(){
            var self = this;
            this.wrap.bind('click', function(e){
                e.preventDefault();
                var page = parseInt(e.target.getAttribute('data-page'));
                if(page>0){
                    self.pageTo(page);
                };
            });
        },
        _render: function(tpl, data){
            this.wrap.html(mvc.render(tpl, data));
        },
        _getPages: function(current, total){
            return {
                current: current,
                total: total,
                start: 1,
                padding: 5
            }
        }
    };
    module.exports = PageBar;

});