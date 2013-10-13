define(function(require, exports, module){
    'use strict';

    var $ = require('jquery'),
        pagebarTpl = require('../ftl/pagebar'),
        PageBar = require('widget/pagebar'),
        List;


    List = {
        init: function(options){
            var self = this,
                pageHidden = options.pageHidden;

            this.pagebar = new PageBar({
                tpl: options.pagebarTpl,
                onPaging: function(page){
                    self.query(page);
                }
            });

            this.form = options.form;
        },
        query: function(page){
            pageHidden.val(page);
            this.form.submit();
        },
        bindEvents: function(){

        }
    };

    List.init({
        pageHidden: $('#J_currentPage'),
        pagebarTpl: $('#J_pagebarTpl')
    });
});