var offset = 0;

var user_id;
var user_token;

var learn_tickets;
var teach_tickets;

// バインド制御用の変数
var isTeaching = true;
var vueTickets;
var vueUser;
var vueMenu;

$(document).ready(function(){
    // userの情報を取得
    // user_id = localStorage.getItem("user_id");
    user_id = 1;//test用
    //user_token = localStorage.getItem("token");
    user_token = "y8ZS4Vx8WXRHv2fe52KEMdYEybJwdFVK";//test用
    console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);

    // データバインディングの設定
    vueUser = new Vue({
        el:'#userinfo',
        data:{
            userinfo:[]
        }
    });
    vueTickets = new Vue({
        el: '#main',
        data:{
            isT:isTeaching,
            teach_tickets:[],
            learn_tickets:[]
        },
        computed: {
            tickets: function () {
                return this.isT ? this.teach_tickets:this.learn_tickets;
            }
        }
    });

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        //window.location.href = 'toppage.html';
    }
    // ユーザー情報の取得
    $.ajax({
        type: 'GET',
        url: "http://210.140.71.3/users/"+user_id+".json",
        dataType: "json",
        success: function(data){
            vueUser.userinfo = data;
        },
        error : function(data) {
            console.log("this user is not found");
            // ユーザーデータが取れなかったらホームに飛ぶ？
            // window.location.href = 'home.html';
        }
    });
    // あなたにオススメの教えて！を取得(教えよう)
    $.ajax({
        type: 'GET',
        url: 'http://210.140.71.3/tickets.json',
        data: {"sort":"create","user_id":user_id,"offset":offset,"filter":"matching"},
        dataType: "json",
        success: function(data){
            vueTickets.teach_tickets = data.tickets;
        },
        error : function(data) {
            console.log("error");
        }
    });
    // 自分が発行中の教えてを取得(学ぼう)
    $.ajax({
        type: 'GET',
        url: 'http://210.140.71.3/tickets.json',
        data: {"sort":"create","user_id":user_id,"offset":offset,"filter":"no_bought"},
        dataType: "json",
        success: function(data){
            vueTickets.learn_tickets = data.tickets;
        },
        error : function(data) {
            console.log("error");
        }
    });
});
