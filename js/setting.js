$(function(){

	userid = localStorage.getItem("user_id"); 
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

	console.log(formdata);

	$("#profile-button").click(function(){ //プロフィールの変更ボタン押されたとき
		$.ajax({
			type: 'post',
			url: 'http://210.140.71.3/users/' + userid + '.json',
			contentType: 'application/x-www-form-urlencoded;application/json;application/json',
			data: formdata,
			success: function(json_data){
				console.log(JSON.stringify(json_data)); 
				alert("変更しました。");
				//location.href="./home.html";
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
