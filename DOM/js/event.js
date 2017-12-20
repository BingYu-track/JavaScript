/**
 * 跨浏览器事件对象,需要传入三个参数    参数1：要绑定事件的元素     参数2：要绑定的事件类型     参数3：事件处理程序
 */
var EventUtil = {
	addHandler: function(element, type, handler){ //添加指定元素的特定事件类型的处理程序    参数1：要绑定事件的元素     参数2：要绑定的事件类型     参数3：事件处理程序      
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	
	removeHandler: function(element, type, handler){ //移除指定元素的特定事件类型的处理程序
		if (element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	
	getEvent: function(event){ //获取事件对象
		return event ? event : window.event;
	},
	
	getTarget: function(event){ //获取target
		return event.target || event.srcElement;
	},
	
	preventDefault: function(event){ //取消事件默认行为(比如：点击a标签的跳转行为)
		if (event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	
	stopPropagation: function(event){ //终止事件传播
		if (event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	
	getCharCode: function(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
	
};
