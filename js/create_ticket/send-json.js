$(function(){
	var reqtag = new Array(); //jsonで送信するtagの配列用
	tagsname = new Array();

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

    $('#ticket_tag').autocomplete({
        source: function(req,res){
			$.ajax({
				type: 'get',
				url: 'http://210.140.71.3/tags.json',
				dataType: "json",
				success: function(data) {
					var alltagsname = new Array();
                    var restags = new Array();

					//入力した語を含むワードを取得
					for(i=0,j=0;i < data.tags.length; i++){
						if(data.tags[i].name.indexOf(req.term)!=-1){
							restags[j] = data.tags[i].name;
							j++;
						}
					}

					res(restags);

					//id抽出用
					for(i=0; i < data.tags.length; i++){
						tagsname[data.tags[i].id] = data.tags[i].name;
					}
				}
			});
		},
		autoFocus: true,
		delay: 300,
		minLength: 1
	});

	$("#button").click(function(){
		if(!document.getElementById("form").checkValidity()){ //必須formが空でないか
			if($("div.tag").length != 0) {
			} else { //tagが何も追加されていなかったら
				alert("全ての項目を入力してください");
				return;
			}
		}

		if (!$(":checkbox[name='skype']").prop('checked') && !$(":checkbox[name='hangouts']").prop('checked') && !$(":input[name='offline_location']").val()) {
			alert("希望場所を指定してください。");
			return;
		}

		var arr = $("div.tag").map(function(){
			return $(this).text();
		}).get(); //生成したタグのtextだけとる

		console.log(tagsname.length); //全てのタグが入った配列の長さ確認
		for(j=0; j < arr.length; j++) {
			for(i=0; i < tagsname.length; i++) {
				if(arr[j] == tagsname[i]){
					reqtag[j] = i;
					break;
				}
			}
			console.log(reqtag); //タグのid確認
		}

		var formdata = {
			"user":{
				"token":localStorage.getItem("token")
			},
			"ticket":{
				title:$("#ticket_title").val(),
				body:$("#ticket_content").val(),
				price:parseInt($("#ticket_price").val()),
				time:parseFloat($("#ticket_time").val()),
				skype:$(":checkbox[name='skype']").prop('checked'),
				hangouts:$(":checkbox[name='hangouts']").prop('checked'),
				offline_place:$("#offline_location").val(),
				beginner:$(":checkbox[name='beginner']").prop('checked'),
				tags:reqtag
			}
		};

		// 確認用
		var send_data = JSON.stringify(formdata);
		//console.log(formdata);
		console.log(send_data);

		$.ajax({
			type: 'post',
			url: 'http://210.140.71.3/tickets.json',
			contentType: 'application/x-www-form-urlencoded;application/json;application/json',
			data: formdata,
			success: function(json_data){

				console.log(JSON.stringify(json_data));
				alert("チケットを作成しました。");
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
});
