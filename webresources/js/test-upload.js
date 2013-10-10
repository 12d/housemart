define(function (require, exports, module){
	require('widget/upload/uploadify');
	$('#J_upload').uploadify({
		swf           : require.resolve('widget/upload/uploadify.swf?1'),
        uploader      : require.resolve('widget/upload/uploadify.php?1'),
        height        : 51,
        width         : 150,
        itemTemplate  : $('#J_imgItemTpl').html(),
        queueID       : 'J_container',
        buttonImage   : 'swf-upload-btn.png',
        onUploadStart : function(file){

        },
        onUploadProgress: function(file, fileBytesLoaded, fileTotalBytes){
            var imageWrap = $('#'+file.id);

            imageWrap.find('.progress-bar').css('width', 100 * fileBytesLoaded/fileTotalBytes + '%');
        },
        onUploadSuccess: function(file, data){
            data = $.parseJSON(data);

            var imageWrap = $('#'+file.id);
            //remove progress bar
            imageWrap.find('.progress').remove();

            imageWrap.find('img').attr('src', data.url);
            imageWrap.children().show();
        }
	});
	
});