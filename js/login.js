$(document).ready(function(){
    // validation機能の適応
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
        // メールアドレスとパスワードの取得
        var mail = $("#mail").val();
        var password = $("#password").val();
        console.log("mail:\t"+mail+"\npass:\t"+password);

        $.ajax({
            type: 'post',
            url: 'http://210.140.71.3/login',
            data: {"user":{"email":"hoge@gmail.com","password":"hogehoge"}},
            dataType: "json",
            success: function(data){
                console.log("success");
                console.log(data);

                if(data.id == null || data.authentication_token == null){
                    console.log("not login");
                }else{
                    console.log("login");
                    // データ保存
                    localStorage.setItem("user_id",data.id);
                    localStorage.setItem("token",data.authentication_token);
                    // ホームページに移動
                    // window.location.href = 'home.html';
                }
            },
            error : function(data) {
                console.log("error");
                console.log(data);
            }
        });
        return false;
    });
});
