function channelNavigate(keyCode, curItem) {
    var curent_tag = current_Item.prop("tagName");
    var type_li = current_Item.parent().attr("class");
    var item_size = current_Item.parent().children("div").length;
    var item_index = current_Item.parent().children("div").index(current_Item);
    var curent_paylyer = (current_Item.prop("id") === "channelPlayerPanel") ? true : false;
    console.log("curent_ID: " + current_Item.prop("id") + " - curent_tag: " + curent_tag + " - type_li: " + type_li + " - item_index: " + item_index + " - item_size: " + item_size);
    switch (keyCode) {
        case 13: // okey
            console.log('left :::: ' + keyCode);
            if (type_li === "cate") {
                // current_Item.addClass('active');
                current_Item.children("a").click();
            } else if (type_li === "item") {
                current_Item.click();
            } else if (curent_tag === "DIV" && !curent_paylyer) {
                current_Item.click();
            } else if (curent_tag === "VIDEO") {
                if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                    current_Item.exitFullscreen();
                } else {
                    current_Item.requestFullscreen();
                }
            } else if (curent_tag === "DIV" && curent_paylyer) {
                var video = current_Item.find("video");
                //          video.webkitRequestFullScreen(); 
                console.log(video);
                //          video.width = $(window).width();
                //          video.height = $(window).height();  
                ////            video.hide();
                //          var height,width;
                //          width =$(window).width();
                //          height =$(window).height();
                //          console.log(height);
                //          console.log(width);
            }
            break;
        case 37: // left
            console.log('left :::: ' + keyCode);
            if (current_Item.is('li')) { //category
                if (current_Item.prev().length === 1) {
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.prev();
                    current_Item.addClass('item-hover');
                }
            } else {
                if ((item_index + 1) % 8 === 1) {
                    if ($('.slick-prev').length !== 0 && !$('.slick-prev').hasClass('slick-disabled')) {
                        $('.slick-prev').click();
                        setTimeout(function() {
                            current_Item.removeClass('item-hover');
                            current_Item = current_Item.closest('.channel-slide-page').prev().find('.channel-slide-item:first');
                            current_Item.addClass('item-hover');
                            console.log("current_Item ...... vao");
                            console.log(current_Item);
                        }, 100);
                    }
                } else {
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.prev();
                    current_Item.addClass('item-hover');
                }
            }
            break;
        case 38: // up
            console.log('up :::: ' + keyCode);
            if (current_Item.hasClass('channel-slide-item')) {
                if (item_index < 48 && item_index >= 8) {
                    current_Item.removeClass('item-hover');
                    current_Item = $(".slick-active div[id=channel_item_" + (item_index - 8) + "]");
                    current_Item.addClass('item-hover');
                } else {
                    current_Item.removeClass('item-hover');
                    current_Item = $(".cate").find("li:first");
                    current_Item.addClass('item-hover');
                }
            } else {
                $("nav.menu-top").css("opacity", 1);
                navZone = "menu";
                current_Item.removeClass('item-hover');
                current_Item = $(".menu-c1-li.item-active");
                current_Item.addClass('item-hover');
            }
            break;
        case 39: // right
            console.log('right ::: ' + keyCode);
            if (current_Item.is('li')) { //category
                if (current_Item.next().length === 1) {
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.next();
                    current_Item.addClass('item-hover');
                }
            } else {
                if ($('.slick-next').length === 0 || $('.slick-next').hasClass('slick-disabled')) {
                    if (!current_Item.is('.channel-slide-page.slick-active .channel-slide-item:last')) {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.next();
                        current_Item.addClass('item-hover');
                    }
                } else {
                    if ((item_index + 1) % 8 === 0) {
                        if (!$('.slick-next').hasClass('slick-disabled')) {
                            $('.slick-next').click();
                            setTimeout(function() {
                                current_Item.removeClass('item-hover');
                                current_Item = current_Item.closest('.channel-slide-page').next().find('.channel-slide-item:first');
                                current_Item.addClass('item-hover');
                            }, 100);
                        }
                    } else {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.next();
                        current_Item.addClass('item-hover');
                    }
                }
            }
            break;
        case 40: // down
            console.log('down :::: ' + keyCode);
            if (current_Item.hasClass('channel-slide-item')) { //channel slide
                if (item_index < 40 && item_index >= 0) {
                    if ($(".slick-active div[id=channel_item_" + (item_index + 8 - item_index % 8) + "]").length === 1) {
                        if ($(".slick-active  div[id=channel_item_" + (item_index + 8) + "]").length === 1) {
                            current_Item.removeClass('item-hover');
                            current_Item = $(".slick-active div[id=channel_item_" + (item_index + 8) + "]");
                            current_Item.addClass('item-hover');
                        } else {
                            current_Item.removeClass('item-hover');
                            current_Item = $(".slick-active div[id=channel_item_" + (item_index + 8 - item_index % 8) + "]");
                            current_Item.addClass('item-hover');
                        }
                        // statement
                    }
                }
            } else {
                current_Item.removeClass('item-hover');
                current_Item = $('.channel-slide-page.slick-active .channel-slide-item:first');
                current_Item.addClass('item-hover');
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