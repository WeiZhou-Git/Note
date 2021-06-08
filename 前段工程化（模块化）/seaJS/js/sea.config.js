seajs.config({
	alias: {
		'main': 'main.js',
		'jquery' : 'jquery.js'
	}
})
seajs.use(['main', 'jquery'], function(main, jquery){
	console.log(main)
	console.log($('.box').click(function(){alert(1)}))
})