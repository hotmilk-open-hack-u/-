$(function(){
    $('#ticket_tag').autocomplete({
        source: function(req,res){
			$.ajax({
				type: 'get',
				url: 'http://210.140.71.3/tags.json',
				dataType: "json",
				success: function(data) {
					var alltagsname = new Array();
                    var tagsname = {}; 
                    var restags = new Array();
                   
				    for(i=0; i < data.tags.length; i++){
                        tagsname[data.tags[i].name] = data.tags[i].id;
                    }  

					for(i=0;i < data.tags.length; i++){
						alltagsname[i] = data.tags[i].name;
					}

					for(i=0,j=0;i < data.tags.length; i++){
						if(alltagsname[i].indexOf(req.term)!=-1){
							restags[j] = alltagsname[i];
							j++;
						}
					}
					res(restags);
					//console.log(tagsname);
				}
			});
		},
		autoFocus: true,
		delay: 500,
		minLength: 2
	});
});
