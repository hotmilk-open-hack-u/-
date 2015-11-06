var offset = 0;

$(document).ready(function(){
    // vueによってデータバインディング
    var vueTickets = new Vue({
      el: '#content4-main',
      data: {
        items: []
      }
    });
    // 注目の教えてを取得
    $.ajax({
                type: 'GET',
                url: 'http://210.140.71.3/tickets.json',
                data: {"sort":"noticed","limit":5,"offset":offset},
                dataType: "json",
                success: function(data){
                    vueTickets.items = data.tickets;
                },
                error : function(data) {
                    console.log("error");
                }
            });
});
