define(function(require, exports, module){
    'use strict';

    function ImgItem(dom){
        console.log(dom);
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
        _swap: function(a, b, max){
            var cached = this.__cached,
                aIndex = cached.indexOf(a),
                bIndex = cached.indexOf(b);

            console.log(aIndex, bIndex);
            //swap cache
            cached[aIndex] = b;
            cached[bIndex] = a;
            //swap dom 
            a.dom[bIndex >= max ? 'insertBefore' : 'insertAfter'](b.dom);   
            return this;
        },
        add: function(item){
            this.__cached.push(item);
        },
        remove: function(item, fn){
            var cached = this.__cached,
                removed = cached.splice(cached.indexOf(item), 1);

            fn && fn(removed[0]);
            return this;
        },
        _move: function(item, step){
            var self = this,
                cached = self.__cached,
                max = cached.length,
                index = cached.indexOf(item) + step,
                target = cached[index>=max ? 0 : index<0 ? max : index];

            this._swap(item, target, max);
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
