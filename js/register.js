$(document).ready(function(){
    // validation機能の設定
    $("#register").validate({
        rules : {
            mailaddress: {
                required: true,
                email: true
            },
            password: {
                required:true
            }
        },
        messages: {
            mailaddress: {
                required: "メールアドレスが入力されていません",
                email: "無効なアドレスです"
            },
            password:{
                required: "パスワードが入力されていません"
            }
        },
        errorClass:"error-text"
    });

    // ログインボタンのクリック時
    $("#register").submit(function(){
        if($("#register").valid()){// validateの判定
            console.log("valid");
            // メールアドレスとパスワードの取得
            var mail = $("#mail").val();
            var password = $("#pass").val();
            console.log("mail:\t"+mail+"\npass:\t"+password);

            // test用

            $.ajax({
                type: 'post',
                url: 'http://210.140.71.3/users.json',
                data: {"user":{"email":mail,"password":password,"password_confirmation":password}},
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
                    $("#login-error-wrapper3 p").show();
                }
            });
        }else{// invalid
            var id = localStorage.getItem("user_id");
            var token = localStorage.getItem("token");
            console.log("user_id:\t"+id+"\ntoken:\t"+token);
            //localStorage.clear();// debug用
            console.log("invalid! strage cleared");
        }
        return false;
    });
});
