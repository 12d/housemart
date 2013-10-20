define(function (require, exports, module){

/**
 * @module Mbox
 * @required jQuery
 */

    var mvc = require('lib/mvc'),
        $ = require('jquery'),
        houseTypeMap = {
            '2': "联排",
            '3': "新里",
            '4': "公寓",
            '5': "老公房",
            '7': "独栋",
            '8': "双拼",
            '9': "叠加",
            '10': "洋房"
        },
        roomTypeMap = ['室', '厅', '卫', '阳台'],
        floorMap = {
            '1': "低层",
            '2': "中低层",
            '3' : "中层",
            '4': "中高层",
            '5': "高层"
        },
        picTpl = $('#J_picItemTpl').html(),
        noPicTpl = $('#J_noPicTpl').html(),
        globalConfig = __appConfig,
        App;


    App = {
        init: function(options){
            var self = this,
                picsMap = {
                    'J_picsHouse': 3,
                    'J_picsRoom': 2,
                    'J_picsCommunity': 0
                };

            self.options = options;

            self.repaintPage();

            $.each(picsMap, function(key, item){
                self.getPics(item, $('#'+key));
            });

        },
        repaintPage: function(){
            var ATTR_STR = 'data-origin',
                houseType = $('#J_houseType'),
                roomType = $('#J_roomType'),
                floor = $('#J_floor');

            //repaint house type
            houseType.html(houseTypeMap[houseType.attr(ATTR_STR)]);
            //repaint room type
            roomType.html($.map(roomType.attr(ATTR_STR).split(''), function(item, index){
                return item+roomTypeMap[index];
            }).join(''));
            floor.html(floorMap[floor.attr(ATTR_STR)]);
            return this;
        },
        getPics: function(type, wrap){
            var self = this,
                config = globalConfig;

            $.ajax({
                method: 'post',
                dataType: 'json',
                data: {
                    houseId: config.houseId,
                    sort: config.sort,
                    type: type
                },
                url: self.options.picsURL,
                success: function(data){
                    var bizData = data.bizData;

                    if(bizData && bizData.length){
                        wrap.html(mvc.render(picTpl, {list: bizData}));
                    }else{
                        wrap.html(mvc.render(noPicTpl, {houseId: config.houseId, picType: type}));
                    };
                },
                error: function(){
                    wrap.html(mvc.render(noPicTpl, {houseId: config.houseId, picType: type}));
                }
            });
        }
    };

    App.init({
        picsURL: '/ajax/getPicListByHouseId.controller'
    });

    
});