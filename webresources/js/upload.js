define(function(require, exports, module){
    'use strict';

    require('lib/bootstrap');
    require('widget/upload/uploadify');

    function ImgItem(dom){
        this.dom = dom;
        dom.data('img-item', this);
    };

    ImgItem.prototype = {
        constructor: ImgItem
    };

    function ImgsManager(options){
        var self = this;

        self.options = options;
        self.__cached = [];
    };

    ImgsManager.prototype = {
        constructor: ImgsManager,
        add: function(item){
            var cached = this.__cached;

            cached.push(item);
            this.options.onChange.call(this, cached.length);
        },
        remove: function(item, fn){
            var cached = this.__cached,
                removed = cached.splice(cached.indexOf(item), 1)[0];
            
            removed.dom.remove();
            this.options.onChange.call(this, cached.length);
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
    var App,
        imgsTabsWrap = $('#J_imgCategory'),
        imgsWrapCount1 = imgsTabsWrap.find('li>a[data-category=J_imgsWrap-1]>i'),
        imgsWrapCount2 = imgsTabsWrap.find('li>a[data-category=J_imgsWrap-2]>i'),
        imgsWrapCount3 = imgsTabsWrap.find('li>a[data-category=J_imgsWrap-3]>i'),

        imgsManagers = {
           'J_imgsWrap-1': new ImgsManager({
                onChange: function(count){
                    imgsWrapCount1.html(count);
                }
           }),
           'J_imgsWrap-2': new ImgsManager({
                onChange: function(count){
                    imgsWrapCount2.html(count);
                }
           }),
           'J_imgsWrap-3': new ImgsManager({
                onChange: function(count){
                    imgsWrapCount3.html(count);
                }
           })
        },
        imgsManager = imgsManagers['J_imgsWrap-1'], //默认第一个tab
        imgsWrap = $('#J_imgsWrap'),
        imgs = imgsWrap.find('li');


    //if any images displayed
    $.each(imgs, function(index, dom){
        imgsManager.add(new ImgItem(imgs.eq(index)));
    });


    App = {
        init: function(){
            this.initUploader();
            this.bindDelegateEvents();
            this.initTabs();
        },
        bindDelegateEvents: function(){
            imgsWrap.delegate('.hm-img-controls>.btn', 'click', function(e){
                e.preventDefault();

                var target = $(e.target),
                    action = target.attr('data-action');

                action && imgsManager[action](target.parents('li').data('img-item'));
            });
        },
        bindEvents: function(){
            var self = this;

            //提交事件
            $('#J_complete').bind('click', function(e){
                e.preventDefault();
                self.submit();
            });
        },
        uploader: null,
        /**
         * upload component initializing
         */
        initUploader: function(){
            this.uploader = $('#J_upload').uploadify({
                swf           : require.resolve('widget/upload/uploadify.swf?1'),
                uploader      : require.resolve('widget/upload/uploadify.php?1'),
                height        : 51,
                width         : 150,
                itemTemplate  : $('#J_imgItemTpl').html(),
                queueID       : 'J_imgsWrap-1',
                buttonImage   : 'webresources/img/swf-upload-btn.png',
                fileSizeLimit: '10 MB',
                onUploadStart : function(file){

                },
                onUploadProgress: function(file, fileBytesLoaded, fileTotalBytes){
                    var imageWrap = $('#'+file.id);

                    imageWrap.find('.progress-bar').css('width', 100 * fileBytesLoaded/fileTotalBytes + '%');
                },
                onUploadSuccess: function(file, data){
                    data = $.parseJSON(data);

                    var imageWrap = $('#'+file.id),
                        img;
                    //remove progress bar
                    imageWrap.find('.progress').remove();

                    img = imageWrap.find('img');
                    img.attr('src', data.url).attr('data-img-id', data.id);
                    imageWrap.children().show();
                    //add to imgsManager

                    imgsManager.add(new ImgItem(imageWrap));
                }
            });
        },
        initTabs: function(){
            var self = this,
                uploadify = self.uploader;

            $('#J_imgCategory a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var category = e.target.getAttribute('data-category');

                imgsManager = imgsManagers[category];
                uploadify.uploadify('settings', 'queueID', category);
            });

        },
        getPicIds: function(){
            $.each(imgsManagers, function(item, index){
                
            });       
        },
        submit: function(){
            var self = this,
                picIds = self.getPicIds();

            //提交动作    
            form.submit();
        }
    };

    App.init();
});
