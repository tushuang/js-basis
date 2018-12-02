onload = function(){
	var all = document.getElementsByClassName("wrapper")[0];
	var all_goods_bottom = document.getElementById("all-goods2"); // 获得下面的全选按钮
	var all_goods_top = document.getElementById('all-goods1');  //获得下面的全选按钮
	var select = document.getElementsByClassName("select"); //获得商品复选框
	var inp = document.getElementsByTagName("input");
	var price = document.getElementsByClassName("price-all");
	var per_price = document.getElementsByClassName("price");
	var all_price = document.getElementsByClassName("all-price")[0];
	var number = document.getElementsByClassName("number");
	var minu = document.getElementsByClassName("amount-left")[0];
	var plu = document.getElementsByClassName("amount-right")[0];
	var goods = document.getElementsByClassName("line");
	var qua = document.getElementById("quality");
	var flag= 0;
	var flag2 =0;
	function allPrice(){
		var x=0;
		for(var i=0;i<select.length;i++){  //遍历每一个商品的复选框 如果是选中的 便计算总结果
		    //复选框必须被选中 且未被删除
			if( select[i].checked == true && getComputedStyle( select[i].parentNode.parentNode).display == "block"){
				x += parseFloat(select[i].parentNode.parentNode.children[1].children[2].innerText.slice(1,8));
			}
			all_price.innerText = "￥"+ x.toFixed(2);
		}
	}
	function backgroundColor(){
		for(var i=0;i<select.length;i++){
			if(select[i].checked == true){
				select[i].parentNode.parentNode.style.background = "#fff4e8";
			}else if(select[i].checked == false ){
				select[i].parentNode.parentNode.style.background = "white";
			}
		}
	}
	function quality(){
		var num=0;
		for(var i=0;i<select.length;i++){
			if(select[i].checked == true){
				num += parseInt(number[i].innerText);
			}
		}
		qua.innerText = num;
	}
	all.addEventListener("click",function(e){  //用事件代理
		var e = e||event;
		
		if(e.target.id == "all-goods1"){
			flag++;
			if(flag ==1){
				for(var i=0;i<inp.length-1;i++){
					inp[i].checked = "checked";
				}
			}
			if(flag==2){
				for(var i=0;i<inp.length-1;i++){
					inp[i].checked = null;
				}
				flag = 0;
			}
			backgroundColor();
			allPrice();
			quality();
		}
		if(e.target.id == "all-goods2"){  //全选删除
			flag2++;
			if(flag2 ==1){
				for(var i=0;i<inp.length;i++){
					inp[i].checked = "checked";
				}
			}
			if(flag2==2){
				for(var i=0;i<inp.length;i++){
					inp[i].checked = null;
				}
				flag2 = 0;
			}
			backgroundColor();
		}
		if(e.target.id == "delate"){
			for(var i=0;i<goods.length;i++){
				if(goods[i].children[0].children[0].checked == true) goods[i].style.display = "none";
			}
			allPrice();
			for(var i=0;i<inp.length;i++){
				inp[i].checked = null;
			}
		}
		if(e.target.className == "select fl"){
			backgroundColor();
			if(inp[1].checked == true && inp[2].checked ==true){  //只要checked属性是true 便表示选中
				all_goods_top.checked = "checked";
			}else{
				all_goods_top.checked =null;
			}
			allPrice();
			quality();
		}
		if(e.target.className == "amount-left"){
			if(parseInt(e.target.nextElementSibling.innerText) > 1){
				var num = parseInt(e.target.nextElementSibling.innerText);
				num--;
				e.target.nextElementSibling.innerText = num;
				price[0].innerText = "￥"+ parseFloat(number[0].innerText)*parseFloat( per_price[0].innerText.slice(1,8));
				price[1].innerText = "￥"+ parseFloat(number[1].innerText)*parseFloat( per_price[1].innerText.slice(1,8));
				quality();
			}
			allPrice();
		}
		if(e.target.className == "amount-right"){
				var num2 = parseInt(e.target.previousElementSibling.innerText);
				num2++;
				e.target.previousElementSibling.innerText = num2;
				price[0].innerText = "￥"+ parseFloat(number[0].innerText)*parseFloat( per_price[0].innerText.slice(1,8));
				price[1].innerText = "￥"+ parseFloat(number[1].innerText)*parseFloat( per_price[1].innerText.slice(1,8));
				quality();
				allPrice();
		}
		if(e.target.className == "delete fl"){
			e.target.parentNode.parentNode.style.display ="none";
			allPrice();
		}
	});
}