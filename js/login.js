$(document).ready(function(){
  $("#login").submit(function(){
      var mail = $("#mail").val();
      var password = $("#password").val();
      console.log("mail:\t"+mail+"\npass:\t"+password);
    //   $.ajax({
    //       type: 'post',
    //       url: 'http://210.140.71.3/login',
    //       data: {"user":{"email":"hoge@gmail.com","password":"hogehoge"}},
    //       dataType: "json",
    //       crossDomain : true,
    //       success: function(data){
    //           console.log("success");
    //           console.log(data);
    //       },
    //       error : function(data) {
    //           console.log("error");
    //           console.log(data);
    //       },
    //       complete : function(data){
    //           console.log("complete");
    //           console.log(data);
    //       }
    //   });
      return false;
  });
});
