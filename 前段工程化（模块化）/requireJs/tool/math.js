// define(function() {
// 	function add(a, b){
// 		return a + b
// 	};
// 	return {
// 		add: add
// 	}
// })

// 模块中引入模块

define(['myLib'] ,function(myLib) {
	console.log(myLib)
	function add(a, b){
		return a + b
	};
	return {
		add: add
	}
})