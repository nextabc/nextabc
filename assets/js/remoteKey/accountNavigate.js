function accountNavigate(keyCode, curItem) {
//	current_menu_Item = curItem;
	var isLogedIn = false;
	if($("div#loggedId").length){
		isLogedIn = true;
	}
	var current_tag = current_Item.prop("tagName");
	console.log(current_tag);
	console.log(current_Item);
		switch (keyCode) {
		case 13: // Enter
			if(current_tag === "A"){
				current_Item.click();
			}
			else if(current_tag === "DIV"){
				if(current_Item.hasClass("open")){
					current_Item.removeClass('open');
				}
				else{
					current_Item.addClass('open');
				}
			}
			else if(current_tag === "LI"){
				current_Item.children("a").click();	
				current_Item.removeClass('item-hover');
				current_Item = $("div#loggedId");
				current_Item.addClass('item-hover');
			}
			break;
		case 37: // left
			if(current_tag === "DIV" || current_tag === "A"){
				current_Item.removeClass('item-hover open');
				navZone = "search";
				current_Item.removeClass('item-hover open');
				current_Item = $("input#filter");
				current_Item.addClass('item-hover');
				
				current_Item.addClass("newsearch", 500);
				current_Item.focus();
                
			}		
			break;
		case 38: // up
			if(current_tag === "LI"){
				if(!current_Item.is(':first-child')){
					current_Item.removeClass('item-hover');
					current_Item = current_Item.prev();
					current_Item.addClass('item-hover');
				}
				else{
					current_Item.removeClass('item-hover');
					current_Item = $("div#loggedId");
					current_Item.addClass('item-hover');
				}
			}
			break;
		case 39: // right
			
			break;
		case 40: // down
			if(current_tag === "DIV"){
				current_Item.removeClass('item-hover');
				current_Item = current_Item.find('li:nth-child(1)')
				current_Item.addClass('item-hover');
			}
			else if(current_tag === "LI"){
				if(!current_Item.is(':last-child')){
					current_Item.removeClass('item-hover');
					current_Item = current_Item.next();
					current_Item.addClass('item-hover');
				}
			}

			break;
		}
	}