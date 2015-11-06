$(function(){

//male icon    
    $('#male').click(function(){
        if($(":input#male").prop('checked')){
            $("#male_icon").attr("src","./img/icon/male-i.png");
			$("#female_icon").attr("src","./img/icon/female.png");
        }
    }); 

//female icon
    $('#female').click(function(){
        if($(":input#female").prop('checked')){
            $("#female_icon").attr("src","./img/icon/female-i.png");
			$("#male_icon").attr("src","./img/icon/male.png");
		} 
    }); 
    
});
