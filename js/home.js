var offset = 0;

var user_id;
var user_token;

$(document).ready(function(){
    // userの情報を取得
    // user_id = localStorage.getItem("user_id");
    user_id = 1;//test用
    //user_token = localStorage.getItem("token");
    user_token = "y8ZS4Vx8WXRHv2fe52KEMdYEybJwdFVK";//test用

    console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        //window.location.href = 'toppage.html';
    }
    // 発行中の教えてを取得
    $.ajax({
        type: 'GET',
        url: 'http://210.140.71.3/tickets.json',
        data: {"sort":"noticed","limit":5,"offset":offset},
        dataType: "json",
        success: function(data){
            console.log(data);
        },
        error : function(data) {
            console.log("error");
        }
    });
});
