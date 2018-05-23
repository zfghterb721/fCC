console.log("Hey");
var socket = io.connect('http://localhost:80');
$("#checkout_button").click(function(){
	$(".editable_line_item_form").children().children().each(function() {
		var name = $(this).find('.li_name').children('span').html();
		var qty = $(this).find('.li_qty').children('input').val();
		var price = $(this).find('.li_price').find('input').val();
		var discount = $(this).find('.li_discount').find('input').val();
		var sub = $(this).find('.li_subtotal').children('span').html();
		console.log(name+' '+qty+' '+price+' '+discount+' '+sub);
		socket.emit('message', name+' '+qty+' '+price+' '+discount+' '+sub);
	});
});