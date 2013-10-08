define(function (require, exports, module){
	var TagSelector = require('lib/tagselector');

	var input = $('#J_input');

	function mapFn(item){
		return $(item).html();
	}
	function fillInput(tagSelector){
		input.val(tagSelector.getMappedSelected().join(','))
	}

	var tagSelector = new TagSelector({
		wrap: $('#J_tagsWrap'),
		onInit: function(){
			var self = this,
				source = ['式豪', '式豪式豪'];

			self.selectByLabel(source);
		},
		onSelect: function(target){
			fillInput(this);	
		},
		onCancel: function(target){
			fillInput(this);
		}
	});
	window.tagSelector = tagSelector;
});