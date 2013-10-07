/**
 * @module FormField
 * @param wrap {DOM} wrap for all form elements
 */
;define(function(require, exports, module){
    'use strict';
    var $ = require('jquery');

    function Field(options) {
        var self = this,
            mix = $.extend,
            NULL = null,
            NOOP = function () {

            },
            DEFAULT_OPTIONS = {
                dom: NULL,
                rules: NULL,
                onCheck: NOOP,
                required: true,
                triggerEvent: 'blur'
            };

        self.options = mix(DEFAULT_OPTIONS, options || {});
        self.dom = self.options.dom;
        self.initialize();
    }

    Field.prototype = {
        initialize: function () {
            var self = this,
                dom = self.dom;

            self.required = self.options.required;
            if (!(dom && dom[0])) return;
            self.__blurHandler = function () {
                self.check();
            };
            dom.bind(self.options.triggerEvent, self.__blurHandler);
        },
        constructor: Field,
        check: function () {
            var dom = this.dom,
                val = dom && dom.val() || '',
                options = this.options,
                rules = options.rules,
                result = 1,
                i = 0,
                rule,
                required = this.required,
                l,
                isFunction = $.isFunction;

            !$.isArray(rules) && (rules = [rules]);
            l = rules.length;
            for (; i < l; i++) {
                rule = rules[i];
                if (!required && !val) continue;
                if (result &= (isFunction(rule) ? rule(val) : rule.test(val))) break;
            }
            ;
            options.onCheck.call(this, !!result, { val: val, dom: dom, rule: --i });
            return result || !required;
        },
        destroy: function () {
            var self = this,
                dom = self.dom;

            dom && dom.unbind(self.options.triggerEvent, self.__blurHandler);
            return true;
        }
    }
    module.exports = Field;
});