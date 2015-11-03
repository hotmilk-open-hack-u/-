var vueSelectedTags;
var vueTags;

var selected_tags = [];
var selected_tag_names =[];

$(document).ready(function(){
    // userの情報を取得
    // var user_id = localStorage.getItem("user_id");
    var user_id = 1;
    //var user_token = localStorage.getItem("token");
    var user_token = "y8ZS4Vx8WXRHv2fe52KEMdYEybJwdFVK";//test用

    console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        //window.location.href = 'toppage.html';
    }

    // 選択済のタグを表示
    vueSelectedTags = new Vue({
      el: '#selected',
      data: {
        tags:selected_tag_names
      }
    });

    // タグ一覧を取得
    $.ajax({
        type: 'GET',
        url: 'http://210.140.71.3/categories.json',
        dataType: "json",
        success: function(data){
            console.log(data);
            // タグ一覧を表示 id と name
            vueTags = new Vue({
              el: '#tags',
              data: {
                tags: data.categories
              }
            });
            // スライダーの設定
            $('.slider').slick({
                arrows:false,
                centerMode: false,
                slidesToScroll:5,
                infinite:false,
                cssEase:"ease",
                slidesToShow:5,
                swipeToSlide:true,
                speed:50
            });

            // タグボタンクリック時の処理
            $(".tag-button").click(function(btn){
                var t_id = $(this).attr("value");// 押されたtag_id
                t_id = parseInt(t_id);// 文字列 -> Int
                var t_name = $(this).attr("name");// 押されたtag名
                // console.log(t_id);
                // console.log(t_name);
                if(selected_tags.indexOf(t_id) == -1){// 未選択のタグ
                    selected_tags.push(t_id);
                    selected_tag_names.push(t_name);
                }else{
                    console.log("already selected tag");
                }
            });
        },
        error : function(data) {
            console.log("error");
        }
    });

    // 登録ボタンの処理
    $("#register-button").click(function(){
        console.log("post this data");
        console.log(selected_tags);
        console.log(selected_tag_names);
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://210.140.71.3/users/1/select_tags.json',
        //     data: {"user":{"token":user_token,"tags":selected_tags}},
        //     dataType: "json",
        //     success: function(data){
        //         console.log(data);
        //     },
        //     error : function(data) {
        //         console.log("error");
        //     }
        // });
    });
    // リセットボタンの処理
    $("#reset-button").click(function(){
        console.log("reset");
        selected_tags = [];
        selected_tag_names = [];
        vueSelectedTags.tags = selected_tag_names;
    });
});
