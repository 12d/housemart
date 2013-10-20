define(function(require, exports, module){
    module.exports = '<% if (total>0) {%>\
    <li><a href="javascript:void(0);" class="<% if (current == start) { %>disable<% } %>" data-page="<%=(current-1)%>}">«</a></li>\
    <% if (current !== start) { %>\
        <li><a href="javascript:;" data-page="<%=start%>"><%=start%></a></li>\
        <% } %>\
        <% if (current > padding) { %>\
            <li><a class="ellipsis" href="javascript:;">...</a></li>\
            <% for (var i=current - padding + 1;i<current;i++) {  %>\
            <li><a href="javascript:;" data-page="<%=i%>"><%=i%></a></li>\
            <% } %>\
            <% } %>\
                <% if(current <= padding) {%>\
                    <% for (var i=2;i<current;i++) { %>\
                    <li><a href="javascript:;" data-page="<%=i%>"><%=i%></a></li>\
                    <% } %>\
                    <% } %>\
                        <li class="active"><a href="javascript:;"><%=current%></a></li>\
                            <% if (current + padding <= total) { %>\
                                <% for (var i=current+1; i< current+padding;i++) { %>\
                                <li><a href="javascript:;" data-page="<%=i%>"><%=i%></a></li>\
                                <% } %> \
                                <li><a class="ellipsis" href="javascript:;">...</a></li>\
                                <% } %>\
                                    <% if (current + padding > total) {%>\
                                        <% for(var i=current+1; i<total;i++) {  %>\
                                        <li><a href="javascript:;" data-page="<%=i%>"><%=i%></a></li>\
                                        <% } %>\
                                        <% } %>\
                                            <% if (current !== total) { %>\
                                                <li><a href="javascript:;" data-page="<%=total%>"><%=total%></a></li>\
                                                <% } %>\
                                         <li><a href="javascript:;" <% if (current !== total) { %>data-page="<%=current+1%>"<% } %> class="page-ctrl <% if (current == total) { %>disable<% } %>">»</a></li>\
                                                    <% } %>'
});
