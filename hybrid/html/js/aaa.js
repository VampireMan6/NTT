function setGesture(el) {
	var obj = {}; //定义一个对象
	var istouch = false;
	var beginStart = false;
	var oldY = 0;
	var oldX = 0;
	var IsH=false;
	var start = [];
	$("#chart_overlayCanvas").bind("click", function(t) { 
		if(!istouch) {
			if(obj.tap)
				obj.tap(t);
		}
	});
	el.bind("touchstart", function(e) {
		beginStart = true;
		if(e.originalEvent.touches.length >= 2) { //判断是否有两个点在屏幕上
			istouch = true;
			start = e.originalEvent.touches; //得到第一组两个点
			obj.gesturestart && obj.gesturestart.call(el); //执行gesturestart方法
		} else {
			oldY = (e.originalEvent.changedTouches[0].pageY)
			oldX = (e.originalEvent.changedTouches[0].pageX)
			if(obj.start) {
				obj.start(e);
			}
		}
	});
	el.bind("touchmove", function(e) {

		if(e.originalEvent.touches.length >= 2 && istouch) {
			e.preventDefault();
			if(obj.scale) {
				var now = e.originalEvent.touches; //得到第二组两个点
				var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例，getDistance是勾股定理的一个方法
				var rotation = getAngle(now[0], now[1]) - getAngle(start[0], start[1]); //得到旋转角度，getAngle是得到夹角的一个方法
				e.scale = scale.toFixed(2);
				e.rotation = rotation.toFixed(2);
				obj.scale(e); //执行gesturemove方法
			}
		} else {
			var newY = (e.originalEvent.changedTouches[0].pageY);
			var newX = (e.originalEvent.changedTouches[0].pageX)

			if(Math.abs(newY - oldY) < Math.abs(newX - oldX)) {
				e.preventDefault();
				if(obj.move && !istouch && beginStart)
					obj.move(e);
			}
			else{
				IsH=true;
			}
		}
	});
	el.bind("touchend", function(e) {
		if(e.originalEvent.touches.length == 0) { //防止手指未全部离开		
			IsH=false;
			beginStart = false;
			if(istouch) {
				istouch = false;
				obj.gestureend && obj.gestureend.call(el); //执行gestureend方法
			} else {}

			if(obj.end) {
				obj.end(e);
			}
		}
	});
	return obj;
};

function getDistance(p1, p2) {
	var x = p2.pageX - p1.pageX,
		y = p2.pageY - p1.pageY;
	return Math.sqrt((x * x) + (y * y));
};

function getAngle(p1, p2) {
	var x = p1.pageX - p2.pageX,
		y = p1.pageY - p2.pageY;
	return Math.atan2(y, x) * 180 / Math.PI;
};