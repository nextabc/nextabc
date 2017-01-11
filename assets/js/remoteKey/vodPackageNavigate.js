function vodPackageNavigate(keyCode, curItem) {
	var current_tag = current_Item.prop("tagName");
	switch (keyCode) {
		case 13:

			if (current_Item.hasClass('slider_cate')) {
				$('.load-container').css('visibility', 'visible');
				setTimeout(function() {
					current_Item.click();
				}, 50);
			} else if (current_Item.hasClass('sli')) { // related content
				if (current_Item.hasClass('item-hover')) {
					current_Item.removeClass('item-hover');
					current_Item.mouseover();
				} else {
					$('.load-container').css('visibility', 'visible');
					setTimeout(function() {
						current_Item.children().click();
					}, 50);

				}

			}
			break;
		case 37: // left
			console.log('left :::: ' + keyCode);

			current_Item.mouseleave();
			if (current_tag === "DIV") {
				if (current_Item.prev().hasClass('slick-active')) {

					current_Item.removeClass('item-hover');
					current_Item = current_Item.prev();
					current_Item.addClass('item-hover');
					// current_Item.mouseover();
				} else {
					// current_Item.mouseleave();
					current_Item.closest(".row-fill").find(".slick-prev.slick-arrow").click();
					// current_Item = current_Item.prev();
					// current_Item.mouseover();
				}
			}
			break;
		case 38: // up
			current_Item.mouseleave();

			console.log('up :::: ' + keyCode);
			if (current_Item.hasClass('slider_cate')) {
				if (current_Item.is(".slider_cate:first")) {
					navZone = "menu";
					current_Item.removeClass('item-hover');
					current_Item = $(".menu-c1-li.item-active");
					current_Item.addClass('item-hover');

					$("nav.menu-top").css("opacity", 1);


					// current_Item.mouseover();
				} else {
					current_Item.removeClass('item-hover');
					current_Item = current_Item.closest(".row-fill").prev().find("div.sli.slick-active:first-child");
					current_Item.addClass('item-hover');

					$('html, body').animate({
						scrollTop: current_Item.closest(".row-fill").find(".slider_cate:first").offset().top - 120
					}, 500);
					// current_Item.mouseover();
				}

			} else if (current_Item.hasClass('sli')) {
				current_Item.removeClass('item-hover');
				current_Item = current_Item.closest(".row-fill").find("a.slider_cate");
				current_Item.addClass('item-hover');
				// current_Item.mouseover();
			}
			break;
		case 39: // right


			console.log('right ::: ' + keyCode);
			if (current_tag === "DIV") {
				if (current_Item.next().hasClass('slick-active')) {
					current_Item.mouseleave();
					current_Item.removeClass('item-hover');
					current_Item = current_Item.next();
					current_Item.addClass('item-hover');
					// current_Item.mouseover();
				} else {
					current_Item.closest(".row-fill").find(".slick-next.slick-arrow").click();
					// current_Item = current_Item.next();
					// current_Item.mouseover();
				}
			}
			break;
		case 40: // down
			current_Item.mouseleave();

			console.log('down :::: ' + keyCode);
			if (current_tag === "A") {
				current_Item.removeClass('item-hover');
				// current_Item = current_Item.closest(".slider_cover").find("div.slider_item:first-child");
				current_Item = current_Item.closest(".row-fill").find("div.sli.slick-active:first-child");
				current_Item.addClass('item-hover');
				// current_Item.mouseover();
			} else if (current_tag === "DIV") {
				if (current_Item.closest(".row-fill").next().length) {

					current_Item.removeClass('item-hover');
					current_Item = current_Item.closest(".row-fill").next().find("a.slider_cate");
					current_Item.addClass('item-hover');


					$('html, body').animate({
						scrollTop: current_Item.offset().top - 120
					}, 500);
				}

				// current_Item.mouseover();
			}
			break;
		case 10009: // Return
			$('.load-container').css('visibility', 'visible');
			setTimeout(function() {
				previousState.go();
			}, 50);
			break;
	}
}