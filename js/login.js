$(document).ready(function(){
  // ここに処理を記述します
  console.log("init");
});
$(document).click(function(){
    console.log("click");
    $.post('/path/to/file', param1: 'value1', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
    });
});
