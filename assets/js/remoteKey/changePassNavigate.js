
function changePassNavigate(keyCode, curItem) {
	var curent_name = current_Item.attr("name");
	var curent_tag = current_Item.prop("tagName");
	var curent_id = current_Item.attr("id");	
	switch (keyCode) {
	case 13: // Enter
		if(curent_tag === "INPUT"){
			if(!current_Item.is(":focus")){
				current_Item.focus();
			}
		}
		else if(curent_tag === "BUTTON"){
			current_Item.click();
		}
		
		break;
	case 37: // left
		console.log('left :::: loginNavigate' + keyCode);
		if(curent_name === "changepass_close"){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item = $("form#changepassForm button[name=changepass_submit]");
			current_Item.addClass('item-hover');
		} 
		break;
	case 38: // up
		console.log('up :::: loginNavigate' + keyCode);
		if(curent_name === "newpass"){
			current_Item.removeClass('item-hover');
			current_Item.blur();
			current_Item = $("form#changepassForm input[name=currentpass]");
			current_Item.addClass('item-hover');
		}
		if(curent_name === "reenternewpass"){
			current_Item.removeClass('item-hover');
			current_Item.blur();
			current_Item = $("form#changepassForm input[name=newpass]");
			current_Item.addClass('item-hover');
		}
		else if(curent_name === "changepass_submit" || curent_name === "changepass_close" ){ //move to submit
			current_Item_temp = current_Item;
			current_Item.removeClass('item-hover');
			current_Item = $("form#changepassForm input[name=reenternewpass]");
			current_Item.addClass('item-hover');
		}
		
		break;
	case 39: // right
		console.log('right ::: loginNavigate' + keyCode);
		if(curent_name === "changepass_submit"){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item = $("form#changepassForm button[name=changepass_close]");
			current_Item.addClass('item-hover');
		}
		break;
	case 40: // down
		console.log('down ::::loginNavigate ' + keyCode);
		if(curent_name === "currentpass"){ //move to password
			current_Item.removeClass('item-hover');
			current_Item.blur();
			current_Item = $("form#changepassForm input[name=newpass]");
			current_Item.addClass('item-hover');
		}
		else if(curent_name === "newpass"){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item.blur();
			current_Item = $("form#changepassForm input[name=reenternewpass]");
			current_Item.addClass('item-hover');
		}else if(curent_name === "reenternewpass"){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item.blur();
			if(typeof current_Item_temp !== "undefined" && (current_Item_temp.attr("name") === "changepass_submit" || current_Item_temp.attr("name") === "changepass_close" )){
				current_Item = current_Item_temp;
			}else{
				current_Item = $("form#changepassForm button[name=changepass_submit]");
			}
			
			
			current_Item.addClass('item-hover');
		}
		break;
	default:
		console.log("Unhandled key: " + keyCode);
		
		break;
	}

}

