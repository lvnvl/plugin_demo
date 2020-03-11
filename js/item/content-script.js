﻿$(function(){
	init();
	
	function sendMessageToBackground(item) {
	chrome.runtime.sendMessage({item:item}, function() {
		console.log('发送请求成功');
	});
}

	function init(){
		console.log('这是content script! -- item search');

		setTimeout(function() {
			console.log("DOMContentLoaded -----------");
			if (location.href.indexOf('https://s.taobao.com/search?q') !== -1){
				console.log("sdfsadfa");

				var itemsDiv = document.querySelector('#mainsrp-itemlist div div div');

				var itemCells = itemsDiv.children;
				$.each(itemCells, (i, itemCell) => {
					//var imgUrl = itemCell.getElementsByTagName('img')[0].getAttribute('data-src');
					var price = itemCell.querySelector('.ctx-box div:nth-child(1) strong').innerText;
					//var deal = itemCell.querySelector('.ctx-box div:nth-child(1) .deal-cnt').innerText.split('人')[0];
					var itemUrl = itemCell.querySelector('.ctx-box .title a').getAttribute('href');
					var title = itemCell.querySelector('.ctx-box .title a').innerText;
					//var shopName = itemCell.querySelector('.row-3 .shopname').innerText;
					//var location = itemCell.querySelector('.row-3 .location').innerText;
					var createDate = new Date();
					var item = {
						itemurl:itemUrl,
						itemprice:price,
						itemtitle:title,
						createDate:createDate
					};
					console.log(item);
					sendMessageToBackground(item);
					/*console.log('第', i + 1,'个商品数据为：');
					console.log('title: ', title);
					console.log('itemUrl: ', itemUrl);
					console.log('price', price);
					console.log('deal', deal);
					console.log('imgUrl', imgUrl);
					console.log('shopName', shopName);
					console.log('location', location);*/
				});
				var lastpage = document.querySelector('#mainsrp-pager .next a ');
				//lastpage.click();
			}
		}, 5000);
		
	};
});