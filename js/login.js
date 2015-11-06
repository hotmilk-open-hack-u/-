$(document).ready(function(){
    // validation機能の設定
    $("#login").validate({
        rules : {
            mailaddress: {
                required: true
            },
            password: {
                required:true
            }
        },
        messages: {
            mailaddress: {
                required: "メールアドレスが入力されていません"
            },
            password:{
                required: "パスワードが入力されていません"
            }
        },
        errorClass:"error-text"
    });

    // ログインボタンのクリック時
    $("#login").submit(function(){
        if($("#login").valid()){// validateの判定
            console.log("valid");
            // メールアドレスとパスワードの取得
            var mail = $("#mail").val();
            var password = $("#pass").val();
            console.log("mail:\t"+mail+"\npass:\t"+password);

            $.ajax({
                type: 'post',
                url: 'http://210.140.71.3/login.json',
                data: {"user":{"email":mail,"password":password}},
                dataType: "json",
                success: function(data){
                    console.log(data);

                    if(data.id != null || data.authentication_token != null){
                        console.log("login");
                        // データ保存
                        localStorage.setItem("user_id",data.id);
                        localStorage.setItem("token",data.authentication_token);
                        // ホームページに移動
                        window.location.href = 'home.html';
                    }else{
                        console.log("not login");
                    }
                },
                error : function(data) {
                    console.log("error");
                }
            });
        }else{
            var id = localStorage.getItem("user_id");
            var token = localStorage.getItem("token");
            console.log("user_id:\t"+id+"\ntoken:\t"+token);
            localStorage.clear();// debug用
            console.log("invalid! strage cleared");
        }
        return false;
    });
});
