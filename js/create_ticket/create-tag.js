$(function(){
	
	$("#add").click(function(){
		var tag = $("#ticket_tag").val();
		$("#add_tag").append('<div class="tag tag-margin color-blue">'+ tag +'</div>');
		$("#ticket_tag").val("");
	});
});
