$(document).ready(function(){
	$.ajaxSetup({
		cache: false,
		async: false
	});

	var menuC = $("#menuContainer");
		
	$.getJSON("../menu.txt", function(json){
		$.each(json.menu, function(i, item){
			var itemDiv = $(document.createElement("div"));
			var itemLink = $(document.createElement("a"));
			
			itemLink.text(item.name)
			.attr("href", "../" + item.folder + "/Gallery.html")
			.appendTo(itemDiv);
			
			itemDiv.addClass("menu-item")
			.appendTo(menuC);
		});
	});
});