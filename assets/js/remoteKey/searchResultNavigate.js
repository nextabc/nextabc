
function searchResultNavigate(keyCode, curItem) {
	var curent_name = current_Item.attr("name");
	var curent_tag = current_Item.prop("tagName");
	var curent_id = current_Item.attr("id");	
	switch (keyCode) {
	case 13: // Enter
		if(curent_tag === "LI"){
			current_Item_temp = "";
			current_Item.find("a").click();;
		}
		else if(curent_tag === "DIV" && current_Item.hasClass("grid-item")){
			current_Item.find("img").click();
		}
		
		break;
	case 39: // right
		console.log('left :::: search Result Navigate' + keyCode);
		
		if(!current_Item.is(":last-child")){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item = current_Item.next();
			current_Item.addClass('item-hover');
		}
		break;
	case 38: // up
		console.log('up :::: search Result Navigate' + keyCode);
		if(current_Item.hasClass("grid-item")){
			current_Item_temp = current_Item;
			current_Item.removeClass('item-hover');
			current_Item = $("ul#ul_cate>li.active");
			current_Item.addClass('item-hover');
		}else if(curent_tag === "LI"){
			scope ="menu";
			current_Item.removeClass('item-hover');
		}
		break;
	case 37: // left
		console.log('right ::: search Result Navigate' + keyCode);
		if(!current_Item.is(":first-child")){ //move to submit
			current_Item.removeClass('item-hover');
			current_Item = current_Item.prev();
			current_Item.addClass('item-hover');
		}
		break;
	case 40: // down
		console.log('down ::::search Result Navigate ' + keyCode);
		if(curent_tag === "LI" && current_Item.hasClass("active") ){
			if(current_Item_temp.length > 0){
				current_Item.removeClass('item-hover');
				current_Item = current_Item_temp;
				current_Item.addClass('item-hover');
			}else{
				current_Item.removeClass('item-hover');
				current_Item = $("div.grid-fix div.grid-item").first();
				current_Item.addClass('item-hover');
			}
			
		}
		break;
	default:
		console.log("Unhandled key: " + keyCode);
		
		break;
	}

}

