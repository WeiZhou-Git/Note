var person = [
	{name : "王秀摇", src : "img/head_1.jpg", des : "最爱玩压缩",sex : "f"},
	{name : "Person", src : "img/head_2.jpg", des : "求求你不要玩压缩了",sex : "m"},
	{name : "王芳", src : "img/head_3.jpg", des : "心累",sex : "f"},
	{name : "Saker", src : "img/head_4.jpg", des : "妖姬握在手，天下我都有",sex : "m"},
	{name : "翠花", src : "img/head_5.jpg", des : "我最美丽",sex : "f"},
]
// 动态生成
	var oUl = document.getElementsByTagName("ul")[0];
	var oSearch = document.getElementsByTagName("input")[0];
	var state = {
		text : "",
		thisSex : "a"
	}
	// oninput   内容发生变化触发事件
	
	oSearch.oninput = function(){
		state.text = this.value;
		var lastArr = filterText(state.text, person);
		lastArr = filterSex(state.thisSex, lastArr);
		renderList(lastArr);
	}
	var oP = document.getElementsByTagName("p")[0];
	oP.addEventListener("click", function(e){
		if(e.target.nodeName == "SPAN"){
			document.getElementsByClassName("active")[0].className = "";
			e.target.className = "active"
			state.thisSex = e.target.getAttribute("set");
			renderList(lastFilterFunc(person))
		}
	})
	// 筛选性别
	function filterSex(sex, arr){
		if(sex == "a"){
			return arr;
		}else{
			return arr.filter(function(ele, index){
				return ele.sex == sex;
			})
		}
	}
	// 筛选联系人
	function filterText(text, arr){
		return arr.filter(function(ele, index){
			if(ele.name.indexOf(text) != -1){
				return true;
			}else{
				return false;
			}
		})
	}
	
	//  数组渲染联系人
	function renderList(arr){
		var str = ''
		arr.forEach(function(ele, index){
			str += '<li>\
						<img src='+ ele.src +'>\
						<p class="userName">'+ ele.name +'</p>\
						<p class="des">'+ ele.des +'</p>\
					</li>'
		})
		oUl.innerHTML = str
	}
	renderList(person)
	// 合并晒筛选 
	function unionFilterFunc(obj){
		return function (arr){
			var lastArr = arr;
			for(var prop in obj){
			lastArr = obj[prop](state[prop], lastArr)
			}
			return lastArr;
		}
	}
	var lastFilterFunc = unionFilterFunc({text : filterText, thisSex : filterSex})
	
	
	
	
	// 深入 Arr 构架师思路 合并
	 function createStore(initState) {
		 var state = initState || {};
		 var list = [];
		 function getState () {
			 return state;
		 }
		 function dispatch (action) {
			 state[action.type] = action.value;
			 list.forEach(function (ele, index) {
				 ele();
			 })
		 }
		 function subsrcibe (func) {
			 list.push(func);
		 }
		 return {
			 getState: getState,
			 dispatch: dispatch,
			 subsrcibe: subsrcibe
		 }
	 }
	 var Store = createStore({
		 text : "",
		 sex : "a"
	 })
	 Store.subsrcibe(function(){
		 console.log("sub");
	 })
	 Store.dispatch({type: "text", value: "Weng"});
	 console.log(Store.getState())
	 Store.dispatch({type: "text", value: "Wang"});
	 console.log(Store.getState())
	 Store.dispatch({type: "sex", value: "F"});
	 console.log(Store.getState())