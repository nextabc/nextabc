function searchNavigate(keyCode, curItem) {
		var current_tag = current_Item.prop("tagName");
		switch (keyCode) {
		case 13: // Enter
			if(current_tag === "LI"){
				current_Item.click();	
			}else if( current_tag === "INPUT" ){
				current_Item.removeClass("newsearch", 500);
				$('ul.list-seartch').show();
                $('.filter-as').show();
				window.location.href = '#/search?search_str=' + current_Item.val();
			}
			break;
		case 37: // left
			current_Item.removeClass('item-hover');
			current_menu_Item.addClass('item-hover');
			
			$("input#filter").removeClass("newsearch", 500);
			$("input#filter").blur();
			$("div.filter-as").hide();
			$('ul.list-seartch').hide();
			
			navZone = "menu";
			break;
		case 38: // up
			if(current_tag === "LI"){
				if (!current_Item.is(':first-child')) {
					current_Item.removeClass('item-hover');
					current_Item = current_Item.prev();
					current_Item.addClass('item-hover');
				}else{
					current_Item.removeClass('item-hover');
					current_Item = $("input#filter");
					current_Item.addClass('item-hover');
				}
			}
			else if(current_tag === "A"){
				current_Item.removeClass('item-hover');
				current_Item = $("div.filter-as").find('li:nth-last-child(1)');
				current_Item.addClass('item-hover');
			}
			break;
		case 39: // right
			current_Item.removeClass('item-hover');
			
			$("input#filter").removeClass("newsearch", 500);
			$("input#filter").blur();
			$("div.filter-as").hide();
			//$('ul.list-seartch').hide();
			
			
			navZone = "account";
			if($("a.login-vr2").length > 0){
				current_Item = $("a.login-vr2");
				current_Item.addClass('item-hover');
			}
			else if($("div#loggedId").length){
				current_Item = $("div#loggedId");
				current_Item.addClass('item-hover open');
			}
			
			break;
		case 40: // down
			//check on input
			
			if(current_tag === "BUTTON" || current_tag === "INPUT" ){
				if ($("div.filter-as").is(':visible') && $("div.filter-as").find('li').length > 0) {
					current_Item.removeClass('item-hover');
					console.log(current_Item);
					current_Item = $("div.filter-as").find('li:nth-child(1)');
					current_Item.addClass('item-hover');
				}
				
			}else if(current_tag === "LI"){
				if (!current_Item.is(':last-child')) {
					current_Item.removeClass('item-hover');
					current_Item = current_Item.next();
					current_Item.addClass('item-hover');
				}
				else{
					current_Item.removeClass('item-hover');
					current_Item = $("a#result_link");
					current_Item.addClass('item-hover');
				}
			}

			break;
		}
	}
