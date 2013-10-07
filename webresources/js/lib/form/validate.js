;define(function(require, exports, module){
    'use strict';
    var $ = require('jquery'),
        mix = $.extend,
        isArray = $.isArray;

    function Validator(wrap, options) {
        var self = this,
            DEFAULT_OPTIONS = {
                forceCheckAll: false
            };

        self.options = mix(DEFAULT_OPTIONS, options || {});
        self._fields = [];
        // self.initialize();
    }

    Validator.prototype = {
        constructor: Validator,
        addField: function (field) {
            var self = this;
            self._fields.push(field);
            //return self._fields.length-1;
            return self;
        },
        addFields: function(fieldsList){
            this._fields = this._fields.concat(fieldsList);
            return this;
        },
        removeField: function (index) {
            var fields = this._fields;
            index = C.type(index) == 'number' ? index : fields.indexOf(index);

            return (index > -1 && index < fields.length) && (fields.splice(index, 1))[0].destroy();
        },
        check: function () {
            var fields = this._fields,
                l = fields.length,
                result = 1,
                force = this.options.forceCheckAll,
                i = 0;

            if (l) {
                for (; i < l; i++) {
                    result &= fields[i].check();
                    if (!result && !force) break;
                }
            }

            return !!result;
        }
    }

    module.exports = Validator;
});