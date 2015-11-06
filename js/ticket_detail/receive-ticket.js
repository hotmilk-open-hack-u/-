$(function(){
	var ticketdata;
	var ticketID = window.common.getQueryString('ticket_id'); //URLのgetパラメータ取得
	var offset;

	// userの情報を取得
    user_id = localStorage.getItem("user_id");
    // user_id = 1;//test用
    user_token = localStorage.getItem("token");
    // user_token = "y8ZS4Vx8WXRHv2fe52KEMdYEybJwdFVK";//test用
    //console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);
    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        window.location.href = 'toppage.html';
    }

	$(".teach_button").click(function(){
    	location.href='./request.html?ticket_id=' + ticketID;
    });

	console.log("ticketID : "+ticketID);
	// データバインディングの設定
	vueObj = new Vue({
		el:'#ticketpage',
		data:{
			ticketdata:[],
			userinfo:[],
			usertickets:[]
		}
	});
	// そのチケットのデータの取得
	$.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/'+ticketID+'.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){
			console.log(data);
			vueObj.ticketdata = data;
			// ユーザー情報の取得
		    $.ajax({
		        type: 'GET',
		        url: "http://210.140.71.3/users/"+data.user.id+".json",
		        dataType: "json",
		        success: function(ui){
		            vueObj.userinfo = ui;
		        },
		        error : function(data) {
		            console.log("this user is not found");
		        }
		    });
			// そのユーザーの発行中のチケット取得
		    $.ajax({
		        type: 'GET',
		        url: 'http://210.140.71.3/tickets.json',
		        data: {"sort":"create","user_id":data.user.id,"offset":offset,"filter":"no_bought"},
		        dataType: "json",
		        success: function(ut){
		            vueObj.usertickets = ut.tickets;
		        },
		        error : function(data) {
		            console.log("error");
		        }
		    });
		},
		error: function(xhr,textStatus,errorThrown){
			console.log("error.");
			console.log(xhr,textStatus,errorThrown);
		}
	});
});
