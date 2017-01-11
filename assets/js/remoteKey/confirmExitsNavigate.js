
/**
 * { function_description }
 *
 * @param      {string}  keyCode  The key code
 * @param      {<type>}  curItem  The current item
 */
function confirmExitsNavigate(keyCode, curItem) {
	if (!current_Item.is('.modal-footer .btn')) {
		current_Item = $('.modal-footer .btn:first');
	}

	switch (keyCode) {
		case 13: // Enter
			if (current_Item.is('.modal-footer .btn:last')) {
				var temp_current_Item = current_Item;
				current_Item = last_current_Item;
				navZone = lastNavZone;
				temp_current_Item.click();
			} else {
				current_Item.click();
			}

			break;
		case 37: // left
			console.log('left :::: loginNavigate' + keyCode);
			if (current_Item.is('.modal-footer .btn:last')) { //move to submit
				current_Item.removeClass('item-hover');
				current_Item = current_Item.prev();
				current_Item.addClass('item-hover');

			}

			break;
		case 38: // up


			break;
		case 39: // right
			if (current_Item.is('.modal-footer .btn:first')) { //move to submit
				current_Item.removeClass('item-hover');
				current_Item.removeClass('btn-primary');
				current_Item = current_Item.next();
				current_Item.addClass('item-hover');
			}
			break;
		case 40: // down

			break;
		case 10009: // Return
			current_Item = last_current_Item;
			navZone = lastNavZone;
			$('.modal-footer .btn:last').click();
			break;
		case 10182://exits
			current_Item = last_current_Item;
			navZone = lastNavZone;
			$('.modal-footer .btn:last').click();

			break;
		default:
			console.log("Unhandled key: " + keyCode);

			break;

	}
}