	var ppt = {
		$wrapper: $(".wrapper"),
		$slider: $(".slider"),
		len: $(".slider").length,
		nowIndex: 0,
		lastIndex: undefined,
		slider_timer: undefined,
		key: true,
		createDom: function(len){
			var strLi = '';
			var strBtn = '';
			for(var i = 0; i < len; i++) {
				if(i == 0){
					strLi += '<li class="active"></li>'
				}else{
					strLi += '<li></li>'
				}
			}
			strLi = '<div class="slider-order"><ul>' + strLi + '</ul></div>'
			strBtn = '<div class="slider-btn">\
						<span class="left-btn"><</span>\
						<span class="right-btn">></span>\
					  </div>'
			this.$wrapper.append(strBtn).append(strLi)
		},
		bindEvent: function(){
			var _this = this;
			$(".left-btn").add($(".right-btn").add(".slider-order li")).on('click', function () {
				if($(this).attr('class') == "left-btn"){
					_this.toTalFun("left");
				}else if($(this).attr('class') == "right-btn"){
					_this.toTalFun("right");
				}else{
					// this is Li
					var value = $(this).index();
					_this.toTalFun(value);
				}
			})
			this.$slider.on('go', function (){
				$(this).fadeOut(300)
					   .find(".iamge img").animate({width: "0%"}).end()
					   .find($("p")).animate({fontSize: "16px"})
			})
			this.$slider.on("come", function () {
				$(this).delay(300).fadeIn(300)
					   .find($(".iamge img")).delay(300).animate({width: "100%"}).end()
					   .find($("p")).delay(300).animate({fontSize: "20px"}, function (){
						   _this.key = true;
					   })
			})
			console.log(ppt.lastIndex)
		},
		getIndex: function (direction){
			this.lastIndex = this.nowIndex;
			if(direction == "left" || direction == "right"){
				if(direction == "left"){
					this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
				}else{
					this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
				}
			}else{
				// this is Li
				this.nowIndex = direction;
			}
		},
		changeIndex: function (index) {
			$('.active').removeClass();
			$(".slider-order ul li").eq(index).addClass("active");
		},
		toTalFun: function (direction) {
			if(this.key) {
				this.getIndex(direction)
				if(this.nowIndex != this.lastIndex){
					this.key = false;
					this.$slider.eq(this.lastIndex).trigger("go");
					this.$slider.eq(this.nowIndex).trigger("come");
					this.changeIndex(this.nowIndex);
					this.slider_auto()
				}
			}
		},
		slider_auto: function () {
			var _this = this
			clearInterval(this.slider_timer)
			 this.slider_timer = setTimeout(function () {
				 _this.toTalFun("right");
			 }, 3000)
		},
		init: function(){
			if(this.len > 1){
				this.createDom(this.len);
				this.bindEvent();
				this.slider_auto()
			}
		}
	}
	ppt.init() 