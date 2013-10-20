define(function (require, exports, module){

/**
 * @module Mbox
 * @required jQuery
 */

    var $ = require('jquery'),
    	NOOP = function(){},
        displayCls = 'in',
        hideCls = 'out',
        mix = $.extend,
        mvc = require('lib/mvc'),
        tpl = require('ftl/mbox');

    function Mbox(options){
        this.options = {
            onInit: NOOP,
            onYes: NOOP,
            onCancel: NOOP,
            onClose: NOOP,
            onYes: function(){
                this.close();
            },
            onNo: function(){
                this.close();
            },
            ui: {
                yesLabel: '确定',
                noLabel: '取消',
                hasCancel: true
            },
            wrap: $('body')
        };

        mix(this.options, options);
        if(this.options.mode === Mbox.ALERT){
            this.options.ui.hasCancel = false;
        };
        this.wrap = this.options.wrap;
        this._init();
    };
    Mbox.prototype = {
        constructor: Mbox,
        _init: function(){
            var self = this,
                options = self.options;

            tpl && self._renderHTML(tpl, options.ui);

            self._bindEvents();
            self.options.onInit.call(self);
        },
        _bindEvents: function(){
            var self = this,
                dom = self._dom;

            self.__closeHandler = function(){
                self.close(); 
                self.options.onClose.call(self);             
            };
            self._closeBtn = dom.find('[data-mbox-close]');
            self._closeBtn.bind('click', self.__closeHandler);

            self.__yesHandler = function(){
                self.options.onYes.call(self); 
            };

            self._yesBtn = dom.find('[data-mbox-yes]');
            self._yesBtn.bind('click', self.__yesHandler);

             self.__noHandler = function(){
                self.options.onNo.call(self); 
            };

            self._noBtn = dom.find('[data-mbox-no]');
            self._noBtn.bind('click', self.__noHandler);
        },
        destroy: function(){
            var self = this;

            if(self.__closeHandler){
                self._closeBtn.unbind('click', self.__closeHandler);    
                delete self.__closeHandler;
            };

            if(self.__yesHandler){
                self._yesBtn.unbind('click', self.__yesHandler);    
                delete self.__yesHandler;
            };
        },
        _renderHTML: function(tpl, data){
            var dom = $(mvc.render(tpl, data));

            this._dom = dom;
            this.wrap.append(dom);
        },
        close: function(){
            var dom = this._dom;

            dom.modal('hide');
        },
        _setContent: function(msg){
            this._dom.find('[data-mbox-body]').html(msg);
        },
        _setTitle: function(title){
            this._dom.find('[data-mbox-title]').html(title);
        },
        open: function(msg, title){
            var wrap = this.wrap,
                dom = this._dom;

            msg && this._setContent(msg);
            title && this._setTitle(title);
            dom.modal('show');
        }
    };
    
    Mbox.ALERT = 'alert';
    Mbox.alert = function(msg, title){
        var box = Mbox.__alertMbox || (Mbox.__alertMbox = new Mbox({mode: Mbox.ALERT}));
        
        box.open(msg, title);
    };

    Mbox.CONFIRM = 'confirm';
    Mbox.confirm = function(msg, title, callback){
        var box = Mbox.__confirmMbox || (Mbox.__confirmMbox = new Mbox({mode: Mbox.CONFIRM, onYes: function(){
            callback.call(box);
            this.close();
        }}));
        
        box.open(msg, title);
    };

    module.exports = Mbox;
});