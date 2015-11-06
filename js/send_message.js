$(function(){
    // ログイン情報の取得
    user_id = localStorage.getItem("user_id");
    // user_id = 2;//test用
    user_token = localStorage.getItem("token");
    // user_token = "aeCZtZw2bKXo8bUCcmr_gZxWQWX4wDpT";//test用
    // console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);
    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        window.location.href = 'toppage.html';
    }

    var ticketID = window.common.getQueryString('ticket_id'); //URLのgetパラメータ取得

    var vueObj = new Vue({
        el:'#main',
        data:{
            ticketinfo:[]
        }
    });

    // チケット情報の取得
    $.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/'+ticketID+'.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
			console.log(data);
			vueObj.ticketinfo = data;
		},
		error: function(xhr,textStatus,errorThrown){
			console.log("auth error");
			console.log(xhr,textStatus,errorThrown);
		}
	});

	$("#send_ms_button").click(function(){
		$.ajax({
			type: 'get',
			url: 'http://210.140.71.3/tickets/' + ticketID + '/apply.json',
			contentType: 'application/x-www-form-urlencoded;application/json;application/json',
			data: {"user":{ "token":localStorage.getItem("token")},"comment":$("#send_content").text()},
			success: function(data){
				location.href="./home.html";
			},
			error: function(xhr,textStatus,errorThrown){
				console.log("error.");
				console.log(xhr,textStatus,errorThrown);
			},
			complete: function(data){
				console.log("complete.");
				console.log(ticketdata);
			}
		});
	});
});
