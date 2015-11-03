var vueSelectedTags;
var vueCategories;
var vueTags;

var selected_tags = [];
var selected_tag_names =[];

var choose_category_id = 0;

var category_data;

$(document).ready(function(){
    // userの情報を取得
    // var user_id = localStorage.getItem("user_id");
    var user_id = 1;//test用
    //var user_token = localStorage.getItem("token");
    var user_token = "y8ZS4Vx8WXRHv2fe52KEMdYEybJwdFVK";//test用

    console.log("user_id:\t"+user_id+"\nuser_token:\t"+user_token);

    // ログイン状態の確認
    if(user_id == null || user_token == null || user_id == undefined || user_token == undefined){
        console.log("not login");
        // ログインしていなかったらトップ画面へ移動
        //window.location.href = 'toppage.html';
    }

    // カテゴリデータ
    setCategoryData();
    console.log(category_data);

    // 選択済のタグを表示
    vueSelectedTags = new Vue({
      el: '#selected',
      data: {
        selected_tags:selected_tag_names
      }
    });

    // 最初のタグを表示(id=0)
    vueTags = new Vue({
        el:"#tags",
        data:{
            c_id : choose_category_id,
            selected_tags: selected_tags
        },
        computed: {
            // 算出 getter 関数
            tag_data: function () {
              return category_data.categories[this.c_id].tags
            }
        },
        methods:{
            update:function(data){// タグクリック時の処理
                var t_id = data.td.tag_id; // 押されたタグid
                t_id = parseInt(t_id);// 文字列 -> Int
                var t_name = data.td.tag_name;// 押されたタグ名

                if(selected_tags.indexOf(t_id) == -1){// 未選択のタグ
                    console.log(t_id+" : "+t_name);
                    selected_tags.push((t_id));
                    selected_tag_names.push(t_name);
                }else{
                    console.log("already selected tag");
                }
            }
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
            vueCategories = new Vue({
                el: '#categories',
                data: {
                    categories: category_data.categories,
                    c_id:choose_category_id
                },
                methods:{
                    update:function(data){// カテゴリクリック時の処理
                        var ctg_id = data.category.category_id;// 押されたカテゴリid
                        ctg_id = parseInt(ctg_id);// 文字列 -> Int
                        var ctg_name = data.category.category_name;// 押されたカテゴリ名

                        this.c_id = ctg_id;
                        vueTags.c_id = ctg_id;

                        // 要素をslider内に移動
                        setTimeout(function(){
                            $(".s-item2").appendTo("#tag-selecter .slick-track");
                        },1);
                    }
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
        // タグIDに全て1を足す
        for(var i=0;i<selected_tags.length;i++){
            selected_tags[i] = selected_tags[i]+1;
        }
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
        selected_tags = [];
        selected_tag_names = [];
        vueSelectedTags.selected_tags = selected_tag_names;
        vueTags.selected_tags = selected_tags;
    });
});

// 以下はカテゴリデータ用のもの
function setCategoryData(){
    category_data  = {
        "categories":[
            {
                "category_id":0,
                "category_name":"生活",
                "tags":[
                    {
                        "tag_id":0,
                        "tag_name":"住宅"
                    },
                    {
                        "tag_id":1,
                        "tag_name":"掃除"
                    },
                    {
                        "tag_id":2,
                        "tag_name":"インテリア"
                    },
                    {
                        "tag_id":3,
                        "tag_name":"お金"
                    },
                    {
                        "tag_id":4,
                        "tag_name":"マナー"
                    }
                ]
            },
            {
                "category_id":1,
                "category_name":"ペット",
                "tags":[
                    {
                        "tag_id":5,
                        "tag_name":"犬"
                    },
                    {
                        "tag_id":6,
                        "tag_name":"猫"
                    },
                    {
                        "tag_id":7,
                        "tag_name":"魚"
                    },
                    {
                        "tag_id":8,
                        "tag_name":"小動物"
                    }
                ]
            },
            {
                "category_id":2,
                "category_name":"娯楽",
                "tags":[
                    {
                        "tag_id":9,
                        "tag_name":"本"
                    },
                    {
                        "tag_id":10,
                        "tag_name":"テレビ"
                    },
                    {
                        "tag_id":11,
                        "tag_name":"ゲーム"
                    },
                    {
                        "tag_id":12,
                        "tag_name":"一発芸"
                    },
                    {
                        "tag_id":13,
                        "tag_name":"手品"
                    },
                    {
                        "tag_id":14,
                        "tag_name":"車"
                    },
                    {
                        "tag_id":15,
                        "tag_name":"カメラ"
                    },
                    {
                        "tag_id":16,
                        "tag_name":"旅行"
                    }
                ]
            },
            {
                "category_id":3,
                "category_name":"ウォータースポーツ",
                "tags":[
                    {
                        "tag_id":17,
                        "tag_name":"水泳"
                    },
                    {
                        "tag_id":18,
                        "tag_name":"ボート"
                    },
                    {
                        "tag_id":19,
                        "tag_name":"サーフィン"
                    },
                    {
                        "tag_id":20,
                        "tag_name":"シンクロ"
                    },
                    {
                        "tag_id":21,
                        "tag_name":"ヨット"
                    },
                    {
                        "tag_id":22,
                        "tag_name":"ダイビング"
                    }
                ]
            },
            {
                "category_id":4,
                "category_name":"球技",
                "tags":[
                    {
                        "tag_id":23,
                        "tag_name":"バレーボール"
                    },
                    {
                        "tag_id":24,
                        "tag_name":"サッカー"
                    },
                    {
                        "tag_id":25,
                        "tag_name":"アメフト"
                    },
                    {
                        "tag_id":26,
                        "tag_name":"ラグビー"
                    },
                    {
                        "tag_id":27,
                        "tag_name":"バスケットボール"
                    },
                    {
                        "tag_id":28,
                        "tag_name":"テニス"
                    },
                    {
                        "tag_id":29,
                        "tag_name":"ゴルフ"
                    },
                    {
                        "tag_id":30,
                        "tag_name":"野球"
                    },
                    {
                        "tag_id":31,
                        "tag_name":"バドミントン"
                    },
                    {
                        "tag_id":32,
                        "tag_name":"卓球"
                    }
                ]
            },
            {
                "category_id":5,
                "category_name":"ウィンタースポーツ",
                "tags":[
                    {
                        "tag_id":33,
                        "tag_name":"スキー"
                    },
                    {
                        "tag_id":34,
                        "tag_name":"スノーボード"
                    },
                    {
                        "tag_id":35,
                        "tag_name":"スケート"
                    },
                    {
                        "tag_id":36,
                        "tag_name":"ホッケー"
                    },
                    {
                        "tag_id":37,
                        "tag_name":"ソリ"
                    },
                    {
                        "tag_id":38,
                        "tag_name":"カーリング"
                    }
                ]
            },
            {
                "category_id":6,
                "category_name":"インドアスポーツ",
                "tags":[
                    {
                        "tag_id":39,
                        "tag_name":"武道"
                    },
                    {
                        "tag_id":40,
                        "tag_name":"格闘技"
                    },
                    {
                        "tag_id":41,
                        "tag_name":"拳法"
                    },
                    {
                        "tag_id":42,
                        "tag_name":"ダンス"
                    },
                    {
                        "tag_id":43,
                        "tag_name":"フェンシング"
                    },
                    {
                        "tag_id":44,
                        "tag_name":"体操"
                    },
                    {
                        "tag_id":44,
                        "tag_name":"射的"
                    }
                ]
            },
            {
                "category_id":7,
                "category_name":"アウトドアスポーツ",
                "tags":[
                    {
                        "tag_id":45,
                        "tag_name":"陸上"
                    },
                    {
                        "tag_id":46,
                        "tag_name":"自転車"
                    },
                    {
                        "tag_id":47,
                        "tag_name":"クライミング"
                    },
                    {
                        "tag_id":48,
                        "tag_name":"登山"
                    }
                ]
            },
            {
                "category_id":8,
                "category_name":"オフィス",
                "tags":[
                    {
                        "tag_id":49,
                        "tag_name":"Excel"
                    },
                    {
                        "tag_id":50,
                        "tag_name":"Word"
                    },
                    {
                        "tag_id":51,
                        "tag_name":"PowerPoint"
                    }
                ]
            },
            {
                "category_id":9,
                "category_name":"デザイン",
                "tags":[
                    {
                        "tag_id":52,
                        "tag_name":"グラフィック"
                    },
                    {
                        "tag_id":53,
                        "tag_name":"映像"
                    },
                    {
                        "tag_id":54,
                        "tag_name":"モデリング"
                    },
                    {
                        "tag_id":55,
                        "tag_name":"WEB"
                    }
                ]
            },
            {
                "category_id":10,
                "category_name":"プログラミング",
                "tags":[
                    {
                        "tag_id":56,
                        "tag_name":"Java"
                    },
                    {
                        "tag_id":57,
                        "tag_name":"C"
                    },
                    {
                        "tag_id":58,
                        "tag_name":"C++"
                    },
                    {
                        "tag_id":59,
                        "tag_name":"PHP"
                    },
                    {
                        "tag_id":60,
                        "tag_name":"Swift"
                    },
                    {
                        "tag_id":61,
                        "tag_name":"Python"
                    },
                    {
                        "tag_id":62,
                        "tag_name":"C#"
                    },
                    {
                        "tag_id":63,
                        "tag_name":"Objective-C"
                    },
                    {
                        "tag_id":64,
                        "tag_name":"Go"
                    },
                    {
                        "tag_id":65,
                        "tag_name":"Perl"
                    },
                    {
                        "tag_id":66,
                        "tag_name":"Ruby"
                    },
                    {
                        "tag_id":67,
                        "tag_name":"JavaScript"
                    },
                    {
                        "tag_id":68,
                        "tag_name":"Scala"
                    },
                    {
                        "tag_id":69,
                        "tag_name":"Brainf*ck"
                    }
                ]
            }
        ]
    }
}
