define(function(require, exports, module){
    'use strict';
    require('lib/bootstrap');

    var Validate = require('lib/form/validate'),
        Field = require('lib/form/field'),
        TagSelector = require('lib/tagselector'),
        NewSell,
        $ = require('jquery'),
        validator = new Validate(),
        releaseForm = $('#J_releaseForm'),
        errorClass = 'has-error',
        selectedTagsInput = $('#J_selectedTags'),
        tagsIds = $('#J_tagsIds'),
        isNotEmpty = function(v){
            return !!v.trim() || v ===0;
        },
        rNumber = /\d+/;

    function checkHandler(rs, data){
        var dom = data.dom.parents('.form-group');

        dom[rs ? 'removeClass' : 'addClass'](errorClass);
    };

    function fillSelectedTags(){
        selectedTagsInput.val(this.getMappedSelected().join(','));
        tagsIds.val(this.getMappedSelected(function(item){
            return item.getAttribute('data-id');
        }).join(','));
    };

    NewSell = {
        addFields: function(){
            //add fields for form
            validator.addFields([
                new Field({
                    dom: $('#J_residence'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_residenceName'),
                    rules: [isNotEmpty],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_houseType'),
                    rules: [isNotEmpty],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_blockNo'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_cellNo'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_area'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_cover'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: false
                }),
                new Field({
                    dom: $('#J_rooms'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_parlor'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_washroom'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_veranda'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_floor'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_direction'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_history'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: true
                }),
                new Field({
                    dom: $('#J_special'),
                    rules: [rNumber],
                    onCheck: checkHandler,
                    required: false
                })
            ]);
            return this;
        },
        bindSubmit: function(){
            //submit form
            releaseForm.bind('submit', function(e){
                //check form before submit
                if(!validator.check()){
                    e.preventDefault();
                }
            }); 
            return this;   
        },
        initTagSelector: function(selectedLabels){
            var tags;

            tags = new TagSelector({
                selectedCls: 'btn-info',
                wrap: $('#J_tagsWrap'),
                itemFilter: function(tag, labels){
                    return labels.indexOf($(tag).attr('data-id'))>-1;
                },
                onSelect: $.proxy(fillSelectedTags, tags),
                onCancel: $.proxy(fillSelectedTags, tags)
            });
            selectedLabels && selectedLabels.length && tags.selectByLabel(selectedLabels);
            return this;        
        },
        initCtrlTags: function(){
            var btn = $('#J_ctrlTags'),
                view = $('#J_tagsCtrlWrap');

            btn.bind('click', function(e){
                var isToggled = btn.attr('data-toggled') == 1;

                e.preventDefault();
                view[isToggled ? 'hide' : 'show']();
                btn.attr('data-toggled', isToggled ? 0 : 1);
            });
            return this;
        },

        init: function(options){
            this.bindSubmit().addFields().initTagSelector(options.selectedLabels).initCtrlTags();
        }
    }
    
    NewSell.init({
        selectedLabels: tagsIds.val() && tagsIds.val().split(',')
    });
});
