(function() {
	var $search = $(".search"),
		$ListAll = $(".searchList")
	$search.on("input", function() {
		var value = $(this).val();
		if(value == ""){
			$ListAll.css({"display": "none"})
		}else{
			$ListAll.css({"display": "block"})
			getData(value, 7)
		}
	})
	function getData(value, num) {
		$.ajax({
			type: "GET",
			url: "https://api.douban.com/v2/music/search",
			data: "q=" + value + "&count=" + num,
			dataType: "jsonp",
			success: renderPage
		})
	}
	
	function renderPage(data) {
		var leng = data.count,
			dataArr = data.musics,
			str = ''
			console.log(data)
		dataArr.forEach(function(ele, index) {
			str += `<li>
							<div class="searchImg"><a herf="#"><img src="`+ ele.image +`"></a></div>
							<div class="searchTheme"><span>`+ ele.title +`</span></div>
							<div class="subTheme">表演者：`+ ele.author[0].name +`</div>
					</li>`
		})
		$ListAll.html(str)
	}
	
	
})()