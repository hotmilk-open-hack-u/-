$("#ticket_price,#ticket_time").change(function(){
var price=$("#ticket_price").val() * $("#ticket_time").val() * 2;
	$("#calculate_price").text(price);
});
