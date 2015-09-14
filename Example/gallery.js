$(document).ready(function(){
	pMinWidth = 400;
	pMinHeight = 200;
	
	fadeTime = 0;
	opacity = 0.8;
	
	images = [];
	texts = [];
	currentIndex = 0;

	$.ajaxSetup({
		cache: false,
		async: false
	});
	
	jQuery.fn.centerToWindow = function () {
		this.css("position","absolute");
		
		this.css("top", Math.max((($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop(),0) + "px");
		this.css("left", Math.max((($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft(), 0) + "px");
		
		return this;
	}
	
	$("body").css("min-width", pMinWidth)
		.css("min-height", pMinHeight);
	
	$("#popupImg").load(function() {
		$("#popupImg").show();
	});
	
	function showPopup(index){
		if(images.length >= index && texts.length >= index){
			currentIndex = index;
			
			var pOverlay = $("#popupOverlay");
			
			pOverlay.css("height", Math.max($(window).height(), $("body").outerHeight(true)))
				.css("width", Math.max($(window).width(), $("body").outerWidth(true)));
				
			pOverlay.fadeTo(fadeTime,opacity);
			
			var pWidth = Math.max(Math.round(0.8 * $(window).width()), pMinWidth);
			var pHeight = Math.max(Math.round(0.8 * $(window).height()), pMinWidth);
			
			var pContainer = $("#popupContainer");
			
			pContainer.hide();	
			pContainer.css("width", pWidth)
						.css("height", pHeight)
						.centerToWindow();
			
			if($(window).width() < pContainer.outerWidth()){
				pContainer.css("left", 0);
			}
			
			if($(window).height() < pContainer.outerHeight()){
				pContainer.css("top", 0);
			}
			
			var cWidth = pWidth - 20;
			var cHeight = pHeight - 20;
			
			$("#contentContainer").css("width", cWidth)
				.css("height", cHeight);
				
			$("#popupImg").hide()
				.attr("src", images[index])
				.css("max-width", cWidth)
				.css("max-height", cHeight);;
			
			var pLabel = $("#popupLabel");
			if(texts[index]){
				pLabel.text(texts[index]);
				pLabel.show();					
			}
			else{
				pLabel.hide();
			}
			
			pContainer.show();
			
			pLabel.css("left", 0);
			pLabel.css("margin-left", 0);
			
			var lWidth = pLabel.outerWidth();
			
			pLabel.css("left", "50%");
			pLabel.css("margin-left", (lWidth / 2) * -1);
		}
	}
	
	function reshowPopup(){
		showPopup(currentIndex);
		$("#popupImg").show();
	}
	
	function hidePopup(){
		$("#popupOverlay").fadeOut(fadeTime);
		$("#popupContainer").fadeOut(fadeTime);
	}
	
	function padGallery(){
		$("#galleryContainer").css("min-height",$("#menuContainer").outerHeight());
	}
	
	function mod(x, n){
		return ((x % n) + n) % n;
	}

	$("#gallery").empty();
	images = [];
	texts = [];
	
	$.getJSON("gallery.txt", function(json){
		document.title = json.title;
		
		if(json.heading){
			$("#heading").text(json.heading);
		}
	
		$.each(json.items, function(i, item){
			var src = item.image;
			if(item.thumbnail){
				src = item.thumbnail;
			}
		
			$(document.createElement("img"))
			.attr("src", src)
			.appendTo($("#gallery"))
			.click(function(event){showPopup(i);})
			.addClass("thumbnail");
			
			images.push(item.image);
			texts.push(item.text);
		});
	});
	
	padGallery();
	
	$("#showPopup").click(function(event){
		showPopup(1);
	});
	
	$("#hidePopup").click(function(event){
		hidePopup();
	});
	
	$("#leftArrow").click(function(){
		showPopup(mod(currentIndex - 1, images.length));
	});
	
	$("#rightArrow").click(function(){
		showPopup(mod(currentIndex + 1, images.length));
	});
	
	$(window).resize(function(){
		if($("#popupOverlay").is(":visible")){
			reshowPopup();
		}
		
		padGallery();
	});
});