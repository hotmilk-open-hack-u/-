var offset = 0;

$(document).ready(function(){
    // 注目の教えてを取得
    $.ajax({
                type: 'GET',
                url: 'http://210.140.71.3/tickets.json',
                data: {"sort":"noticed","limit":5,"offset":offset},
                dataType: "json",
                success: function(data){
                    console.log(data);
                    // vueによってデータバインディング
                    var vueTickets = new Vue({
                      el: '#content4-main',
                      data: {
                        items: data.tickets
                      }
                    });
                    // vue test
                    setTimeout(function(){
                        console.log("vue reset");
                        //vueTickets.items = {};
                    },3000);
                    // DOMにより表示
                    for(var i=0;i<data.tickets.length;i++){
                        addTicket(data.tickets[i]);
                    }
                },
                error : function(data) {
                    console.log("error");
                }
            });
    var addTicket = function(data){
        console.log(data);
    }
});
