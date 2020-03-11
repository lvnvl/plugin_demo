﻿$(function(){
	init();
	
	/*发送数据至background连接服务器后台
	function sendMessageToBackground(item) {
	chrome.runtime.sendMessage({item:item}, function() {
		console.log('发送请求成功');
	});
	*/
	
	//唯品会下载图片
	function init(){
		console.log('这是content script! -- download',location.href,location.href.indexOf('https://a.vpimg2.com/*'));
		if (location.href.indexOf('https://a.vpimg2.com/') !== -1){
			console.log("start download");
			function downloadImage(imgsrc, name) {//下载图片地址和图片名
				let image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					let canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					let context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					let url = canvas.toDataURL("image/jpg"); //得到图片的base64编码数据
					let a = document.createElement("a"); // 生成一个a元素
					let event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
			};
			downloadImage(location.href,location.href);
		};
	}
	
	setTimeout(function() {
		console.log("download");
		window.close();
	}, 2000);
	
});