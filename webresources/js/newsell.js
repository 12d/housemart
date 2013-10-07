define(function(require, exports, module){
    'use strict';

    var Validate = require('lib/form/validate'),
        Field = require('lib/form/field'),
        $ = require('jquery'),
        validator = new Validate(),
        releaseForm = $('#J_releaseForm'),
        errorClass = 'has-error',
        isNotEmpty = function(v){
            return v.trim() || v ===0;
        },
        rNumber = /\d+/;

    function checkHandler(rs, data){
        var dom = data.dom.parents('.form-group');

        dom[rs ? 'removeClass' : 'addClass'](errorClass);
    };

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

    releaseForm.bind('submit', function(e){
        if(!validator.check()){
            e.preventDefault();
        }
    });
});
