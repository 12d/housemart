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
        self.type = options.type;
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
        getPicInfo: function(){
            var self = this;
            return {
                type: self.type,
                items: $.map(this.__cached, function(item, index){
                    return {
                        id: item.dom.attr('data-img-id'),
                        order: index
                    };
                })
            };
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
        typeKeyMap = {
            '3': 'J_imgsWrap-1',
            '2': 'J_imgsWrap-2',
            '0': 'J_imgsWrap-3'
        },
        currentCategory = typeKeyMap[__appConfig.picType||'3'],
        imgsManagers = {
           'J_imgsWrap-1': new ImgsManager({
                type: 3,
                onChange: function(count){
                    imgsWrapCount1.html(count);
                }
           }),
           'J_imgsWrap-2': new ImgsManager({
                type: 2,
                onChange: function(count){
                    imgsWrapCount2.html(count);
                }
           }),
           'J_imgsWrap-3': new ImgsManager({
                type: 0,
                onChange: function(count){
                    imgsWrapCount3.html(count);
                }
           })
        },
        imgsManager = imgsManagers[currentCategory], //默认第一个tab
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
            this.bindEvents();
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
        setPicType: function (type){
            this.postData.picType = type;
        },
        /**
         * upload component initializing
         */
        initUploader: function(){
            this.postData = __appConfig.postData;

            this.uploader = $('#J_upload').uploadify({
                formData      : this.postData,
                checkExisting : false,
                fileObjName   : 'imageFile',
                swf           : require.resolve('widget/upload/uploadify.swf?1'),
                uploader      : '/multiPicUpload.controller',
                height        : 51,
                width         : 150,
                itemTemplate  : $('#J_imgItemTpl').html(),
                queueID       : currentCategory,
                buttonImage   : require.resolve('../img/swf-upload-btn.png?1'),
                fileSizeLimit: '10 MB',
                onUploadStart : function(file){

                },
                onUploadProgress: function(file, fileBytesLoaded, fileTotalBytes){
                    var imageWrap = $('#'+file.id);

                    imageWrap.find('.progress-bar').css('width', 100 * fileBytesLoaded/fileTotalBytes + '%');
                },
                onUploadSuccess: function(file, data){
                    data = $.parseJSON(data);
                    data = data && data.bizData;

                    if(data && (data=data[0])){

                        var imageWrap = $('#'+file.id),
                            img;
                        //remove progress bar
                        imageWrap.find('.progress').remove();

                        img = imageWrap.find('img');
                        //data={url: 'http://i1.sinaimg.cn/ty/2013/1019/U9336P6DT20131019091816.jpg', id: '123456'}  ;//test code
                        img.attr('src', data.url);
                        imageWrap.attr('data-img-id', data.id);
                        imageWrap.children().show();
                        //add to imgsManager

                        imgsManager.add(new ImgItem(imageWrap));
                    };
                }
            });
        },
        initTabs: function(){
            var self = this,
                uploadify = self.uploader;

            $('#J_imgCategory a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = $(e.target),
                    category = target.attr('data-category');

                self.setPicType(target.attr('data-pic-type'));
                imgsManager = imgsManagers[category];
                uploadify.uploadify('settings', 'queueID', category);
            });

        },
        getAllPicInfo: function(){
            var managers = imgsManagers,
                info,
                rs = [];

            $.each(typeKeyMap, function(key, value){
                info = managers[value].getPicInfo();
                info.items && info.items.length && rs.push(info);
            });
            return rs;
        },
        submit: function(){
            var self = this,
                picInfo = self.getAllPicInfo();

            $.ajax({
                url: '/ajax/addOrUpdateSort.controller',
                method: 'post',
                data: {
                    houseId: self.postData.houseId,
                    data: $.toJSON({pics: picInfo})
                },
                success: function(rs){
                    if(rs.code==1){
                        location.href='/external/myHouseList.controller';
                    };
                }
            });
            //提交动作    
            //form.submit();
        }
    };

    App.init();
});
