define(function (require, exports, module){
    module.exports = '<div class="modal fade out">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-mbox-close>&times;</button>\
          <h4 class="modal-title" data-mbox-title></h4>\
        </div>\
        <div class="modal-body" data-mbox-body>\
        <%=content%>\
        </div>\
        <div class="modal-footer">\
          <button data-mbox-yes type="button" class="btn btn-primary"><%=yesLabel%></button>\
          <% if (hasCancel) { %><button data-mbox-no type="button" class="btn btn-default"><%=noLabel%></button><% } %>\
        </div>\
      </div>\
    </div>\
  </div>'
});
