define(function(require, exports, module){
    'use strict';

    function ImgItem(dom){
        this.dom = dom;
        dom.data('img-item', this);
    };

    ImgItem.prototype = {
        constructor: ImgItem
    };

    function ImgsManager(){
        var self = this;

        self.__cached = [];
    };

    ImgsManager.prototype = {
        constructor: ImgsManager,
        _swap: function(item, target){
            var cached = this.__cached,
                originIndex = cached.indexOf(item),
                index = cached.indexOf(target),
                tempItem = cached.splice(originIndex, 1)[0];

            //swap cache
            cached.splice(index, 0, tempItem);
            //swap dom 
            item.dom[index < originIndex ? 'insertBefore' : 'insertAfter'](target.dom);   
            return this;
        },
        add: function(item){
            this.__cached.push(item);
        },
        remove: function(item, fn){
            var cached = this.__cached,
                removed = cached.splice(cached.indexOf(item), 1)[0];
            
            removed.dom.remove();
            fn && fn(removed);
            return this;
        },
        _move: function(item, step){
            var self = this,
                cached = self.__cached,
                max = cached.length,
                originIndex = cached.indexOf(item),
                index = originIndex + step,
                target = cached[index = (index>=max ? 0 : index<0 ? (max-1) : index)],
                tempItem = cached.splice(originIndex, 1)[0];
            //swap cache
            cached.splice(index, 0, tempItem);
            //swap dom 
            item.dom[index < originIndex ? 'insertBefore' : 'insertAfter'](target.dom);  
        },
        up: function(item){
            this._move(item, -1);
        },
        down: function(item){
            this._move(item, 1);
        }
    };
    // init
    var imgsManager = new ImgsManager(),
        imgsWrap = $('#J_imgsWrap'),
        imgs = imgsWrap.find('li');

    imgsWrap.delegate('.hm-img-controls>.btn', 'click', function(e){
        e.preventDefault();

        var target = $(e.target),
            action = target.attr('data-action');

        action && imgsManager[action](target.parents('li').data('img-item'));
    });

    $.each(imgs, function(index, dom){
        imgsManager.add(new ImgItem(imgs.eq(index)));
    });
});
