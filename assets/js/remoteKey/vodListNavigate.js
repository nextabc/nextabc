function vodListNavigate(keyCode, curItem) {
    var current_tag = current_Item.prop("tagName");
    switch (keyCode) {
        case 13:

            if (current_Item.hasClass('slider_cate')) {
                current_Item.click();

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

            if (current_Item.closest(".row-fill").is(".row-fill:first")) {
                navZone = "menu";
                current_Item.removeClass('item-hover');
                current_Item = $(".menu-c1-li.item-active");
                current_Item.addClass('item-hover');
                $("nav.menu-top").css("opacity", 1);

            } else {
                current_Item.removeClass('item-hover');
                current_Item = current_Item.closest(".row-fill").prev().find("div.sli.slick-active:first-child");
                current_Item.addClass('item-hover');

                $('html, body').animate({
                    scrollTop: current_Item.closest(".row-fill").find(".sli:first").offset().top - 170
                }, 500);
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
            if (!$('.vod-spinner').is(":visible")) {
                var current_row = current_Item.closest(".row-fill");
                if (current_row.next('.row-fill').length) {
                    current_Item.mouseleave();
                    console.log('down :::: ' + keyCode);
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.closest(".row-fill").next().find(".sli.slick-active").first();
                    current_Item.addClass('item-hover');

                    $('html, body').animate({
                        scrollTop: current_Item.offset().top - 170
                    }, 500, function() {
                        if (!current_row.next('.row-fill').next('.row-fill').length) {
                            console.log('load more vods .................... ');
                            $('.vod-spinner').show();
                            console.log($('.vod-spinner'));
                            setTimeout(function() {
                                // var controllerElement = document.querySelector('.main-wrap');
                                // var angular_scope = angular.element(controllerElement).scope();
                                // angular_scope.vm.loadMoreVodList();
                                $('.load-more-bt').click();
                            }, 200);
                            // $('.load-more-bt').click();
                        }
                    });


                } else {
                    // $('.load-more-bt').click();
                    // $('.fix-thumb').css('opacity', 1);
                }
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