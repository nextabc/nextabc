function menuNavigate(keyCode, curItem) {
    //  if ($('li[id^=menu-c1]').hasClass('item-hover')) {
    if (true) {
        // console.log("+++++++++++++++++++++++++++++++++");
        switch (keyCode) {
            case 13: // Enter
                if (current_Item.hasClass('item-hover')) {
                    $('.load-container').css('visibility', 'visible');
                    setTimeout(function() {
                        current_Item.removeClass('item-hover');
                        current_Item.closest('.nav').find(".menu-c1-li.item-active").removeClass('item-active');
                        current_Item.children(".menu-c1").click();
                    }, 50);
                }
                break;
            case 37: // left
                console.log('menuNavigate :::: ' + keyCode);
                if (current_Item.hasClass("menu-c1-li")) { // parent
                    if (!current_Item.is(':first-child')) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.prev();
                        current_Item.addClass('item-hover');
                        current_Item.mouseover();
                    }
                } else { // children
                    if (current_Item.is(':first-child') && current_Item.parent().hasClass("sub-menu")) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.parent().parent().parent().parent();
                        current_Item.addClass('item-hover');
                    }
                }
                break;
            case 38: // up
                console.log('menuNavigate :::: ' + keyCode);
                if (current_Item.hasClass("menu-c1-li")) { // parent
                } else { // children
                    if (current_Item.is(':first-child')) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.parent().parent().parent().parent();
                        current_Item.addClass('item-hover');
                    } else {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.prev();
                        current_Item.addClass('item-hover');
                    }
                }
                break;
            case 39: // right
                if (current_Item.hasClass("menu-c1-li")) { // parent
                    if (!current_Item.is('.menu-c1-li:last')) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.next();
                        current_Item.addClass('item-hover');
                        current_Item.mouseover();
                    }
                }
                break;
            case 40: // down
                // $("nav.menu-top").css('opacity',0);
                console.log('down  :::::::::::menuNavigate::::::::::::: ' + keyCode);
                if (current_Item.hasClass("menu-c1-li")) { // parent
                    if (current_Item.find('ul').hasClass("sub-menu")) { // go to first child
                        current_Item = current_Item.find('.sub-menu .dropdown:nth-child(1)');
                        current_Item.addClass('item-hover');
                    } else {
                        // if(current_Item.hasClass("item-active")){
                        active_menu_item = current_Item.closest('.nav').find(".menu-c1-li.item-active");
                        if (active_menu_item.find('a').text().trim().toUpperCase() === "TRANG CHỦ" && Ulti.currentPage === "home") {
                            navZone = "home";
                            current_Item.removeClass('item-hover');
                            current_Item = $("div>div>div>h4>a.slider_cate").first();
                            current_Item.addClass('item-hover');
                            $("nav.menu-top").css("opacity", 0);
                        } else if (active_menu_item.find('a').text().trim().toUpperCase() === "KÊNH TV" && Ulti.currentPage === "channel") {
                            navZone = "channel";
                            current_Item.removeClass('item-hover');
                            current_Item = $(".slick-active .channel-slide-item:first");
                            current_Item.addClass('item-hover');
                            $("nav.menu-top").css("opacity", 0);
                        } else if (Ulti.currentPage === "vodPackage") {
                            navZone = "vodPackage";
                            current_Item.removeClass('item-hover');
                            current_Item = $("div>div>div>h4>a.slider_cate").first();
                            current_Item.addClass('item-hover');
                            $("nav.menu-top").css("opacity", 0);
                        } else if (Ulti.currentPage === "vodList") {
                            navZone = "vodList";
                            current_Item.removeClass('item-hover');
                            current_Item = $('.sli:first');
                            current_Item.addClass('item-hover');
                            $("nav.menu-top").css("opacity", 0);
                            // $(".row-fill.fill01").animate({
                            //  'margin-top': '140px'
                            // }, "slow", function() {
                            //  $(".vodlist .detail_list.search-list-p .tilt-pk").animate({
                            //      top: '120px'
                            //  }, "slow");
                            // });
                            // $(".main-top").fadeToggle("slow", "linear");
                            // 
                            //              $("nav.menu-top").fadeToggle("slow", "linear");
                            // $('html, body').animate({
                            //  scrollTop: $("nav.menu-top").offset().top
                            // }, 0);
                        } else if (Ulti.currentPage === "vod") {
                            navZone = "vod";
                            $("nav.menu-top").css("opacity", 0);
                            current_Item.removeClass('item-hover');
                            current_Item = $("div#vodImageId");
                            current_Item.addClass('item-hover');
                        } else if (Ulti.currentPage === "searchResult") {
                            navZone = "searchResult";
                            current_Item = $("ul#ul_cate>li.active");
                            current_Item.addClass('item-hover');
                        }
                        // }
                    }
                } else { // children
                    if (!current_Item.is(':last-child')) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.next();
                        current_Item.addClass('item-hover');
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
}