		// 封装兼容性方法 addEvent()    (来处理针对于不同浏览器的方法 || 解决This指向问题) 最终的事件处理函数
	function addEvent(elem, type, handle) {
		if (elem.addEventListener) {
			elem.addEventListener(type, handle, false);
		} else if (elem.attachEvent) {
			elem.attachEvent("on" + type, function() {
				handle.call(elem);
			})
		} else {
			elem["on" + type] = handle;
		}
	}
	// 封装兼容性方法 查询dom计算CSS样式
	function getStyle(elem, prop){
		if(window.getComputedStyle){
			return window.getComputedStyle(elem,null)[prop];
		}else{
			return elem.currentStyle[prop];
		}
	}
	// 封装兼容性函数 使用后 返回可视窗口尺寸
	function getViewportOffset(){
		if(window.innerHeight){
			return {
				W : window.innerWidth,
				H : window.innerHeight
			}
		}else{
			if(document.compatMode == "Backompat"){
				return {
					W : document.body.clientWidth,
					h : document.body.clientHeight
				}
			}else{
				return {
					W : document.documentElement.clientWidth,
					h : document.documentElement.clientHeight
				}
			}
		}
	}
	var div = document.getElementsByTagName("div")
	addEvent(div,"click",function(){
		alert(1);
	})
	// 封装 兼容性方法求滚动之后  返回X Y 轴 距离顶部 左边距离
	function getScrollOffset(){
		if(window.pageXOffset){
			return {
				X : window.pageXOffset,
				Y : window.pageYOffset
			}
		}else{
			return{
				X : document.documentElement.scrollLeft + document.body.scrollLeft,
				Y : document.documentElement.scrollTop + document.body.scrollTop
			}
		}
	}
	// 在原型链上 封装函数 将div里的子元素 逆序;
	Element.prototype.reverseNode = function(){
		var arr = this.children;
		var count = this.children.length;
		while(count--){
			this.appendChild(arr[count]);
		}
		return arr;
	}
	// 在Element.prototype(原型链) 上封装函数 insetAfter(a,b)
	var div = document.getElementsByTagName("div")[0];
	var i = document.getElementsByTagName("i")[0];
	var p = document.getElementsByTagName("p")[0];
	Element.prototype.insetAfrer = function(targetNode,afterNode){
		var beforeNode = afterNode.nextElementSibling;
		if(beforeNode == null){
			this.appendChild(targetNode);
		}else{
			this.insertBefore(targetNode,beforeNode)
		}
	}
	// 返回兄弟元素方法  (元素，数值(+1:下一个元素，-1:上一个元素)); 兼容IE 9 及 IE 9 以上
	function retSibling(e,n){
		while(e && n){
			if(n > 0){
				if(e.nextElementSibling){
					e = e.nextElementSibling;
				}else{
					for(e = e.nextSibling;e && e.nodeType != 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					e = e.previousElementSibling;
				}else{
					for(e = e.previousSibling;e && e.nodeType != 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	}
	//数组去重
	Array.prototype.unique = function(){
		var temp = {},
			arr = [],
			len = this.length;
			for(var i = 0; i < len; i++){
				if(!temp[this[i]]){
					temp[this[i]] = 'abc';
					arr.push(this[i]);
				}
			}
			return arr;
	}
	// haxi 式
	// 对象克隆   origin 初始   target 目标
	function deepClone(origin, target) {
		var target = target || {};
		toStr = Object.prototype.toString;
		arrStr = "[object Array]";
		for (prop in origin) {
			if (origin.hasOwnProperty(prop)) {
				if (typeof(origin[prop]) == "object") {
					// if (toStr.call(origin[prop])) = arrStr) {
					// 	target[prop] = [];
					// } else {
					// 	target[prop] = {};
					// 	deepClone(origin[prop], target[prop]);
					// }
					target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
						deepClone(origin[prop], target[prop]);
				} else {
					target[prop] = origin[prop];
				}
			}
		}
		return target;
	}
	//函数  判断输入实参为 什么类型
	function type(target){
		var template = {
			"[object Array]" : "array",
			"[object Object]" : "object",
			"[object String]" : "string - object",
			"[object Number]" : "number - object",
			"[object Boolean]" : "boolean - object",
		}
		if(target === null){
			return "null";
		}
		if(typeof(target) == "object"){
			// 判断是否为引用类型
			var str = Object.prototype.toString.call(target);
			return template[str];
		}else{
			return typeof(target);
		}
	}
	// 封装取消的冒泡函数 function stopBubble(event){}  ||| 使用方法 在事件函数中 stopBobble(事件对象"event");
	   function stopBobble(event){
		   if(event.stopPropagation){
			   event.stopPropagation();
		   }else{
			   event.cancelBubble = true;
		   }
	   }
	   // 封装阻止默认事件的函数 cancelHandler(event);
	     function cancelHandler(event){
	   	   if(event.prevetDefault){
	   		   event.preventDefault();
	   	   }else{
	   		   event.returnValue = false;
	   	   }
	     }
		// 封装byclassName()			// 在Document的原型链上封装自己的获取dom元素(兼容性高)
		 Document.prototype.getClassName = function (className){
		 	var allDomArr = Array.prototype.slice.call(document.getElementsByTagName("*"),0),
		 		filterArr = [];	
		 		//slice.call(document.getElementsByTagName("*"),0) 改变slice方法的this指向  指向类数组
		 	function dealClass(dom){
		 		var reg = /\s+/g;
		 		var arrClassName = dom.className.replace(reg," ").trim();
		 		return arrClassName;
		 	}
		 	// 封装 正则方法 过滤掉多余的空格
		 	// .trim()  去除首位边界空格
		 	allDomArr.forEach(function(ele, index){
		 		//.forEach() 数组方法 遍历数组
		 		var itemClassArr = dealClass(ele).split(" ");
		 		for(var i = 0; i < itemClassArr.length; i++){
		 			// 循环数组  并且判断如果class与参数相同 输出当前元素
		 			if(itemClassArr[i] == className){
		 				filterArr.push(ele);
		 				break;
		 				// 找到 元素跳出  避免浪费性能
		 			}
		 		}
		 	})
		 	return filterArr;
		 	// 函数结束 输出符合规则的元素数组;
		 }