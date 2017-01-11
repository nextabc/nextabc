var eps_contener_position;

function episodeSelectDlgNavigate(keyCode, curItem) {
    var curent_name = current_Item.attr("name");
    var curent_tag = current_Item.prop("tagName");
    var curent_id = current_Item.attr("id");
    switch (keyCode) {
        case 13: // Enter
            $('.load-container').css('visibility', 'visible');
            setTimeout(function() {
                current_Item.find('a').click();
            }, 50);


            break;
        case 37: // left

            break;
        case 38: // up
            console.log('up :::: loginNavigate' + keyCode);
            if (current_Item.prev().length > 0) {
                var container = $('.eps-content');

                if (current_Item.offset().top < container.offset().top + 60) {
                    console.debug('vao 1111... : ' + current_Item);

                    container.animate({
                        scrollTop: container.scrollTop() - container.height() / 2 - current_Item.height()
                    }, function() {
                        current_Item.removeClass('item-hover');
                        current_Item = current_Item.prev();
                        current_Item.addClass('item-hover');
                        return;
                    });
                } else {
                    console.debug('Khong vao 1 ... : ' + current_Item);
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.prev();
                    current_Item.addClass('item-hover');

                }


            }



            break;
        case 39: // right

            break;
        case 40: // down

            var container = $('.eps-content');
            if (current_Item.offset().top > container.offset().top + container.height() - current_Item.height() * 3) {
                console.debug('vao ... : ' + current_Item);

                container.animate({
                    scrollTop: container.scrollTop() + container.height() / 2 + current_Item.height() - 2
                }, function() {
                    current_Item.removeClass('item-hover');
                    current_Item = current_Item.next();
                    current_Item.addClass('item-hover');
                    return;
                    // eps_contener_position = container.scrollTop();
                });
            } else {
                console.debug('Khong vao ... : ' + current_Item);

            }

            current_Item.removeClass('item-hover');
            current_Item = current_Item.next();
            current_Item.addClass('item-hover');
            break;
        case 10009: // Return
            current_Item = last_current_Item;
            navZone = lastNavZone;
            $("#closeEpsSelectDlg").click();
            break;
        case 10182: //exits
            current_Item = last_current_Item;
            navZone = lastNavZone;
            $("#closeEpsSelectDlg").click();

            break;
        default:
            console.log("Unhandled key: " + keyCode);

            break;
    }


}
