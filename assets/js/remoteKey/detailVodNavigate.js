function detailVodNavigate(keyCode, curItem) {
    console.log("---------- detailVod Navigate ----------");

    switch (keyCode) {
        case 13:

            if (current_Item.hasClass("video-pl")) { //img detail
                current_Item.children().click();
            } else if (current_Item.hasClass("btn")) {
                current_Item.click();
            } else { //related vod
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
            console.log('vod left :::: ' + keyCode);

            current_Item.mouseleave();
            if (current_Item.hasClass('sli')) {
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
            console.log('vod up :::: ' + keyCode);
            current_Item.mouseleave();

            if ($('.dropdownfix-op .btn').length !== 0) {
                if (current_Item.hasClass("video-pl")) {
                    current_Item.removeClass('item-hover');
                    current_Item = $('.dropdownfix-op .btn');
                    current_Item.addClass('item-hover');


                    // $('html, body').animate({
                    //  scrollTop: $("#menu-c1-0").offset().top
                    // }, 400, function() {
                    //  // $("nav.menu-top").css('opacity', 1);
                    // });

                } else if (current_Item.hasClass("btn")) {
                    navZone = "menu";
                    current_Item.removeClass('item-hover');
                    current_Item = $(".menu-c1-li.item-active");
                    current_Item.addClass('item-hover');

                    $("nav.menu-top").css("opacity", 1);
                } else {
                    current_Item.removeClass('item-hover');
                    current_Item = $(".video-pl");
                    current_Item.addClass('item-hover');
                    // current_Item.mouseover();
                }
            } else {
                if (current_Item.hasClass("video-pl")) {
                    navZone = "menu";
                    current_Item.removeClass('item-hover');
                    current_Item = $(".menu-c1-li.item-active");
                    current_Item.addClass('item-hover');

                    $("nav.menu-top").css("opacity", 1);
                } else {
                    current_Item.removeClass('item-hover');
                    current_Item = $(".video-pl");
                    current_Item.addClass('item-hover');
                    // current_Item.mouseover();
                }
            }

            break;
        case 39: // right


            console.log('VOD right ::: ' + keyCode);
            if (current_Item.hasClass('sli')) {
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
            console.log('VOD down :::: ' + keyCode);

            if (current_Item.hasClass("video-pl")) {
                current_Item.removeClass('item-hover');
                current_Item = $(".row-fill:first").find("div.sli.slick-active:first-child");
                current_Item.addClass('item-hover');
            } else if (current_Item.hasClass("btn")) {
                current_Item.removeClass('item-hover');
                current_Item = $(".video-pl");
                current_Item.addClass('item-hover');
            }

            break;
        case 10009: // Return
            console.log('vod return ppppppppp');
            $('.load-container').css('visibility', 'visible');
            setTimeout(function() {
                console.log('previous go ......');
                // parentPreviousState.go();
                window.location.href = document.location.pathname;
            }, 50);
            break;
    }
}
