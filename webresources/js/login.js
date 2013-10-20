/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 10/6/13
 * Time: 11:18 AM
 * To change this template use File | Settings | File Templates.
 */
define(['lib/bootstrap', 'jquery'], function(require, exports, module){
    'use strict';

    var EMPTY = '',
        MSG = {
            username: '请输入正确的账号！',
            password: '请输入正确的密码！'
        },
        $ = require('jquery'),
        Login,
        username = $('#J_username'),
        password = $('#J_password'),
        submit = $('#J_submit'),
        msg = $('#J_errorMsg');

    require('lib/bootstrap');




    Login = {
        initTooltip: function(){
            var defaultOptions = {
                trigger: 'focus',
                placement: 'right'
            };
            username.tooltip(defaultOptions);
            password.tooltip(defaultOptions);
        },
        validate: function(){
            if(username.val().trim()!==EMPTY){
                if(password.val().trim()!==EMPTY){
                    msg.hide();
                    return true;
                }else{
                    msg.html(MSG.password).show();
                }

            }else{
                msg.html(MSG.username).show();
            };
            return false;
        },
        initSubmit: function(){
            var self = this,
                form = $('#J_loginForm');

            form.bind('submit', function(e){
                submit.attr('disabled', 'disabled').html('登录中…');
                //if not passed, stop submiting
                if(!self.validate()){
                    e.preventDefault();
                    submit.removeAttr('disabled').html('登&nbsp;&nbsp;录')
                };
            });

        },
        init: function(){
            var self = this;
            self.initTooltip();
            self.initSubmit();
        }
    };

    Login.init();
});
