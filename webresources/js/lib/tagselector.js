/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 10/7/13
 * Time: 11:34 AM
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    var $ = require('jquery'),
        NULL = null,
        NOOP = function(){};

    function removeFormArray(arr, item){
        var index = arr.indexOf(item);

        index >-1 && arr.splice(index, 1);
    };    
    function TagSelector(options){
        var options,
            self = this;

        self.options = {
            onSelect: NOOP,
            onCancel: NOOP,
            onInit: NOOP,
            selector: 'a',
            selected: NULL,
            wrap: NULL,
            mapFn: function(item){
                return $(item).html();
            },
            itemFilter: function(tag, labels){
                return labels.indexOf($(tag).html())>-1;
            },
            selectedCls: 'selected'
        };
        $.extend(self.options, options);
        options = self.options;
        self.wrap = options.wrap;
        self.wrap.delegate(options.selector, 'click', function (e){
            var dom = e.target;

            e && e.preventDefault();
            self[self._isSelected(dom) ? 'cancel' : 'select'](dom, e);    
        });

        self.__selected = [];
        self._init(options);
        
    };
    TagSelector.prototype = {
        constructor: TagSelector,
        select: function(dom){
            var self = this,
                jdom = $(dom),
                options = self.options;
            
            self.__selected.push(dom);
            jdom.addClass(options.selectedCls);
            options.onSelect.call(self, jdom);
            return self;
        },
        selectByLabel: function(label, filter){
            var self = this,
                options = this.options,
                labels = $.isArray(label) ? label : [label],
                tags = this.wrap.find(options.selector);

            filter = filter || options.itemFilter;
            $.each(tags, function(index, item){
                if(filter(item, labels)){
                    self.select(item);
                };
            });
        },
        _init: function(options){
            var self = this,
                selected = options.selected;

            //init selected
            selected && selected.length && self.selectByLabel(selected);
            //call onInit event
            self.options.onInit.call(self);
        },
        _isSelected: function(dom){
            return $(dom).hasClass(this.options.selectedCls);
        },
        cancel: function(dom){
            var self = this,
                jdom = $(dom),
                options = self.options;

            removeFormArray(self.__selected, dom);
            jdom.removeClass(options.selectedCls);
            options.onCancel.call(self, jdom);
            return self;
        },
        clear: function(){
            var self = this,
                selected = this.__selected,
                len = selected.length;

            while(len--){
                self.cancel(selected.splice(len, 1)[0]);    
            };
        },
        getSelected: function(){
            return this.__selected;
        },
        getMappedSelected: function(mapFn){
            mapFn = mapFn || this.options.mapFn;
            return $.isFunction(mapFn) ? $.map(this.__selected, mapFn) : this.__selected;    
        }


    };

    module.exports = TagSelector;
});
