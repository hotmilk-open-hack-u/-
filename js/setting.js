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

	var sex = null;

	if($("input#male").prop('checked')) {
		sex = 0; //男
	}
	if($("input#female").prop('checked')) {
		sex = 1; //女
	}
	 var formdata = {
		"user":{
			token:localStorage.getItem("token"),
			email:$("#mail_address").val(),
			username:$("#user-name").val(),
			last_name:$("#last-name").val(),
			first_name:$("#first-name").val(),
			sex:sex,
			introduction:$("#profile_text").val()
		}
	};
	// データバインド設定
	var vueObj = new Vue({
		el:'#main',
		data:{
			userinfo:[]
		}
	});
	// ユーザー情報の取得
	$.ajax({
		type: 'GET',
		url: "http://210.140.71.3/users/"+user_id+".json",
		dataType: "json",
		success: function(data){
			console.log("success");
			vueObj.userinfo = data;
		},
		error : function(data) {
			console.log("this user is not found");
		}
	});

	console.log(formdata);

	$("#profile-button").click(function(){ //プロフィールの変更ボタン押されたとき
		$.ajax({
			type: 'post',
			url: 'http://210.140.71.3/users/' + user_id + '.json',
			contentType: 'application/x-www-form-urlencoded;application/json;application/json',
			data: formdata,
			success: function(json_data){
				console.log(JSON.stringify(json_data));
				location.href="./home.html";
			},
			error: function(xhr,textStatus,errorThrown){
				console.log("error.");
				console.log(xhr,textStatus,errorThrown);
			},
			complete: function(json_data){
				console.log("complete.");
			}
		});
	});

	$("#tag-button").click(function(){ //タグ変更ボタン押されたとき
		location.href="./tagselect.html";
    });
});
