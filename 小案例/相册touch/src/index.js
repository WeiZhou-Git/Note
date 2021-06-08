	var total = 11,
		liWidth = ($(".wrapper").width() - 40)/4,
		activeIndex,
		ratio = $(window).height()/$(window).width();
	
	function redent() {
		var strLi = '';
		for(var i = 1; i < total; i++) {
			strLi += '<li style="height:'+ liWidth +'px;"><img src="src/img/'+ i +'.jpg" alt=""></li>';
		}
		$(strLi).appendTo($(".wrapper")).animate({opacity: 1}, 500);
	}
	redent()
	$("ul").on("tap", "li", function(){
		activeIndex = $(this).index();
		show(activeIndex);
	})
	function show(i) {
		$('.show').html("")
		$('.show').show();
		var oImg = new Image();
		oImg.src = "src/img/"+ i +".jpg"
		oImg.onload = function (){
			var w = this.width,
				h = this.height
			if(h/w > ratio){
				$(this).appendTo($(".show")).css("height", "100%").animate({opacity: 1}, 500);
			}else{
				$(this).appendTo($(".show")).css("width", "100%").animate({opacity: 1}, 500)
			}
		}
	}
	$(".show")
	.on("tap", function() {
		$(this).hide();
	})
	.on("swipeLeft", function() {
		// activeIndex >= total - 1 ? total - 1 : activeIndex ++;
		// activeIndex = activeIndex >= total - 1 ? total - 1 : activeIndex + 1;
		if(activeIndex < total - 1){
			activeIndex++;
			console.log(activeIndex)
			show(activeIndex)
		}
		show(activeIndex)
	})
	.on("swipeRight", function() {
		// activeIndex <= 1 ? 1 : activeIndex --;
		// activeIndex = activeIndex <= 1 ? 1 : activeIndex - 1;
		if(activeIndex > 0){
			activeIndex--;
			show(activeIndex)
		}
	})