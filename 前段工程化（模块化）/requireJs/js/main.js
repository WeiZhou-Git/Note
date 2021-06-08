require.config({
	// paths :{}  做全局配置 （路径全局）
	//baseUrl : ''  基础路径   tool/jquery....
 	baseUrl: 'tool',
	paths : {
		box : 'jquery',
		math : 'math'
	},
})

require(['box', 'math'], function(box, math){
	
	// 第一个参数 写js 文件地址，在这个函数中可以 使用引入的js 模块
	// 这个函数为 回调函数 ，夹杂js文件后可以使用
	console.log(math.add(1, 3))
	console.log(jQuery());
})