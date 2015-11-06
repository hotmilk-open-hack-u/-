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
	var vueApplyList = new Vue({
		el:'#applylist',
		data:{
			applylist:[]
		}
	});
    var vueTickets = new Vue({
		el:'#ticketpage',
		data:{
			ticketinfo:[],
		}
	});

    // チケットの購入申請一覧を取得
	$.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/'+ticketID+'/apply.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
			console.log(data);
			vueApplyList.applylist = data.apply_list;
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
			vueTickets.ticketinfo = data;
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
