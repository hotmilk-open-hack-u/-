$(function(){

//Skype icon	
	$('#skype').click(function(){
		if($(":checkbox[name='skype']").prop('checked')){
			$("#skype_icon").attr("src","./img/icon/skype-i.png");
		} else{
			$("#skype_icon").attr("src","./img/icon/skype.png");
		}
	});

//Hangouts icon
	$('#hangouts').click(function(){
        if($(":checkbox[name='hangouts']").prop('checked')){
			$("#hangouts_icon").attr("src","./img/icon/hangouts-i.png");
		} else{
			$("#hangouts_icon").attr("src","./img/icon/hangouts.png");
		}   
	}); 
		
});
