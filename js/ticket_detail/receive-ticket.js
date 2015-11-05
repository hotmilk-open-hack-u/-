$(function(){

	var ticketdata;
	var ticketID = window.common.getQueryString('id'); //URLのgetパラメータ取得
		
	$.ajax({
		type: 'get',
		url: 'http://210.140.71.3/tickets/1.json',//' + ticketID + '.json',
		contentType: 'application/x-www-form-urlencoded;application/json;application/json',
		success: function(data){

		},
		error: function(xhr,textStatus,errorThrown){						
			console.log("error.");
			console.log(xhr,textStatus,errorThrown);
		},
		complete: function(data){
			console.log("complete.");
			ticketdata = data;
			console.log(ticketdata)
		}
	});
});
