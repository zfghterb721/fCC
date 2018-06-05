console.log("Hey");
var socket = io.connect('http://localhost:80');
$("#checkout_button").click(function(){
	var productData = {items:[],orders:[],buyitems:[],buyorders:[]};
	$(".editable_line_item_form").children().children().each(function() {
		var name = $(this).find('.li_name').children('span').html();
		if(name == null) name = $(this).find('.li_name').children('input').val();
		var qty = $(this).find('.li_qty').children('input').val();
		var price = $(this).find('.li_price').find('input').val();
		var discount = $(this).find('.li_discount').find('input').val();
		var sub = $(this).find('.li_subtotal').children('span').html();
		var productID = $(this).find('.li_name').children('span.product_log').find('a').attr('href');
		if(productID) productID = productID.substring(productID.search('products/')+9,productID.search('/activity'));
		var condition = $(this).find('.li_name').find(".variant_selector").children("option").text();
		var orderID = $(location).attr('href').substring($(location).attr('href').search("orders/")+7, $(location).attr('href').search("/edit"));
		if($('#pos').attr("class") == "pos"){
		productData.items.push({name:name,condition:condition,qty:qty,price:price,discount:discount,sub:sub,productID:productID,orderID:orderID});}
		if($('#pos').attr("class") == "buy_order_pos"){
		productData.buyitems.push({name:name,condition:condition,qty:qty,price:price,discount:discount,sub:sub,productID:productID,orderID:orderID});
		}
			});	
			
		var orderID = $(location).attr('href').substring($(location).attr('href').search("orders/")+7, $(location).attr('href').search("/edit"));
		var cash = $("#pay_by_cash_amount").val();
		var card = $("#pay_by_card_amount").val();
		var account = $("#pay_by_account_amount").val();
		var name = $($(".customer_name")[1]).text();
		var check = $("#pay_by_check_amount").val();
		var email = $($("#customer_info").children("#customer_summary").find("td")[0]).text();
		var phone = $($("#customer_info").children("#customer_summary").find("td")[1]).text();
		var credit = $("#adjust_credit").text();
		var customerID = "";
		if($("a.edit_customer").siblings("a").attr('href')){
			customerID = $("a.edit_customer").siblings("a").attr('href').replace("https://alvarandhurriks-admin.crystalcommerce.com/customers/","").replace("/edit","");
		}
		if($('#pos').attr("class") == "pos"){
		productData.orders.push({orderID:orderID,cash:cash,card:card,account:account,check:check,name:name,email:email,phone:phone,balance:credit,customerID:customerID});
		}
		if($('#pos').attr("class") == "pos"){
		productData.buyorders.push({orderID:orderID,cash:cash,card:card,account:account,check:check,name:name,email:email,phone:phone,balance:credit,customerID:customerID});
		}
		socket.emit('message',JSON.stringify(productData));

});