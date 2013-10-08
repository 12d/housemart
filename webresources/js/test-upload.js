define(function (require, exports, module){
	var imgsListWrap = $('#J_container');

	require('widget/upload/uploadify');
	$('#J_input').uploadify({
		'swf'      : require.resolve('widget/upload/uploadify.swf?1'),
        'uploader' : require.resolve('widget/upload/uploadify.php?1'),
        'height'        : 30,
        'width'         : 120,
        'sizeLimit'		: '10M',
        itemTemplate: $('#J_imgItemTpl').html(),
        queueID: 'J_container',
        onSelect: function(file){
        	//$('#J_imgItemTpl').tmpl(file).appendTo(imgsListWrap);			
        },
        onUploadStart: function(file){
        	
        },
        onUploadProgress: function(){
        	console.log(arguments)
        },
        onUploadComplete: function(){

        }
	});
	
});