var offset = 0;

var user_id;
var user_token;

var user_info;
var user_tickets;

// バインド制御用の変数
var vueObj;

$(document).ready(function(){
    // urlの取得
    var url   = location.href;
    // user_idの取得
    step1 = url.split("?")
    step2 = step1[1].split("=");
    user_id = step2[1];
    console.log("paramater : "+user_id);

    var test_review_value = 4.3;// テスト用の評価値

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動？
        // window.location.href = 'toppage.html';
    }

    // データバインディングの設定
    vueObj = new Vue({
        el: '#main',
        data:{
            userinfo:[],
            tickets:[]
        }
    });

    // ユーザー情報の取得
    $.ajax({
        type: 'GET',
        url: "http://210.140.71.3/users/"+user_id+".json",
        dataType: "json",
        success: function(data){
            console.log(data);
            vueObj.userinfo = data;
        },
        error : function(data) {
            console.log("this user is not found");
            // ユーザーデータが取れなかったらホームに飛ぶ？
            // window.location.href = 'home.html';
        }
    });
    // そのユーザーの発行中のチケット取得
    $.ajax({
        type: 'GET',
        url: 'http://210.140.71.3/tickets.json',
        data: {"sort":"time","user_id":user_id,"offset":offset,"filter":"no_bought"},
        dataType: "json",
        success: function(data){
            console.log(data);
            vueObj.tickets = data.tickets;
        },
        error : function(data) {
            console.log("error");
        }
    });
});
