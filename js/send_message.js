$(function(){

    var ticketID = window.common.getQueryString('ticket_id'); //URLのgetパラメータ取得

	$("#send_ms_button").click(function(){  
		$.ajax({
			type: 'get',
			url: 'http://210.140.71.3/tickets/' + ticketID + '/apply.json',
			contentType: 'application/x-www-form-urlencoded;application/json;application/json',
			data: {"user":{ "token":localStorage.getItem("token")},"comment":$("#send_content").text()},
			success: function(data){
				alert(data);
				location.href="./home.html";
			},  
			error: function(xhr,textStatus,errorThrown){    
				console.log("error.");
				console.log(xhr,textStatus,errorThrown);
			},  
			complete: function(data){
				console.log("complete.");
				console.log(ticketdata);
			}   
		}); 
	});
});
