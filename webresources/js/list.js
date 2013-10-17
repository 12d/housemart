define(function(require, exports, module){
    'use strict';

    var $ = require('jquery'),
        pagebarTpl = require('ftl/pagebar'),
        PageBar = require('widget/pagebar'),
        List;


    List = {
        init: function(options){
            var self = this,
                pageHidden = options.pageHidden;

            self.pagebar = new PageBar({
                tpl: options.pagebarTpl,
                onPaging: function(page){
                    self.query(page);
                }
            });
            self.options = options;
            self.wrap = options.wrap;
            self.form = options.form;

            self._bindEvents();
        },
        query: function(page){
            pageHidden.val(page);
            this.form.submit();
        },
        remove: function(id){
            $.ajax(this.options['remove'], {
                dataType: 'json',
                success: function(rs){

                }
            });
        },
        deactive: function(id){
            $.ajax(this.options['deactive'], {
                dataType: 'json',
                success: function(rs){

                }
            });
        },
        active: function(id){
             $.ajax(this.options['active'], {
                dataType: 'json',
                success: function(rs){

                }
            });
        },
        modify: function(id){

        },
        save: function(){
            var self = this;

            $.ajax(this.options['save'], {
                dataType: 'json',
                success: function(){

                }
            });           
        },
        _bindEvents: function(){
            this.wrap.delegate('a[data-action]', 'click', function(e){
                var target = $(e.target),
                    actionStr = target.attr('data-action');

                this[actionStr](target.attr('data-id'));
            });
        }
    };

    List.init({
        pageHidden: $('#J_currentPage'),
        pagebarTpl: $('#J_pagebarTpl'),
        ajaxURLs : {
            remove: 'delete.ajax',
            deactive: 'deactive.ajax'
        }
    });
});