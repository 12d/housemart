define(function (require, exports, module){
module.exports ='\
{{if total>0}}\
    {{if current>0}}\
    <li><a href="javascript:void(0);" data-page="${current-1}">«</a></li>\
    {{/if}}\
    {{if current<2}} \
    {{loop(var index=0; Math.min(5,total+1); index++)}}\
    <li {{if current==index}} class="active"{{/if}}><a href="javascript:void(0);" data-page="${index}">${index+1}</a></li>\
    {{/loop}} \
    {{else current>total-2}}\
    {{loop(var index= Math.max(0,total-4);total+1;index++)}}\
    <li {{if current==index}} class="active"{{/if}}><a href="javascript:void(0);" data-page="${index}">${index+1}</a></li>\
    {{/loop}}\
    {{else}}\
    {{loop(index= Math.max(0,current-2);Math.min(current+3,total+1);index++)}}\
    <li {{if current==index}} class="active"{{/if}}><a href="javascript:void(0);" data-page="${index}">${index+1}</a></li>\
    {{/loop}}\
    {{/if}}\
    {{if current<total}}\
    <li><a href="javascript:void(0);" data-page="${current+1}">»</a></li>\
    {{/if}}\
{{/if}}';
});