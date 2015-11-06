var user_id;
var user_token;
var ticketID;
$(function(){
    var applydata;
    var ticketdata;

    // ログイン情報の取得
    // user_id = localStorage.getItem("user_id");
    user_id = 2;//test用
    //user_token = localStorage.getItem("token");
    user_token = "aeCZtZw2bKXo8bUCcmr_gZxWQWX4wDpT";//test用
    console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        //window.location.href = 'toppage.html';
    }

    // urlからパラメータの取得
    ticketID = window.common.getQueryString('ticket_id'); //URLのgetパラメータ取得

	// データバインディングの設定
	var vueObj = new Vue({
		el:'#main',
		data:{
			applylist:[],
            ticketinfo:[],
            bought_user_info:[]
		}
	});

    // チケットの購入申請一覧を取得
	$.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/'+ticketID+'/apply.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
			console.log(data);
			vueObj.applylist = data.apply_list;
		},
		error: function(xhr,textStatus,errorThrown){
			console.log("error.");
			console.log(xhr,textStatus,errorThrown);
		}
	});
    // チケット情報の取得
    $.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/'+ticketID+'.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
			console.log(data);
            if(data.bought_user_id != null){
                // ユーザー情報の取得
                console.log("this ticket is bought");
                $.ajax({
                    type: 'GET',
                    url: "http://210.140.71.3/users/"+data.bought_user_id+".json",
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        vueObj.bought_user_info = data;
                    },
                    error : function(data) {
                        console.log("this user is not found");
                        // ユーザーデータが取れなかったらホームに飛ぶ？
                        // window.location.href = 'home.html';
                    }
                });
            }
			vueObj.ticketinfo = data;
		},
		error: function(xhr,textStatus,errorThrown){
			console.log("auth error");
			console.log(xhr,textStatus,errorThrown);
		}
	});
});
// 教わるボタンが押された時の処理
function teachRequest(id){
    $.ajax({
        method : 'POST',
        url: "http://210.140.71.3/tickets/"+ticketID+"/select_teacher.json",
        data:{"user":{"token":user_token},"teacher_id":id},
        contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
		    console.log(data);
            window.location.href = 'home.html';
		},
		error: function(xhr,textStatus,errorThrown){
			console.log("error.");
			console.log(xhr,textStatus,errorThrown);
		}
	});
}
