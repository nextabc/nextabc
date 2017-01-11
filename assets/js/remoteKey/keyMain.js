var isPageLoaded = false;
/**
 * process remote control key event
 */
var mainEventKey = function() {
    if ($('li[id^=menu-c1]').hasClass('item-hover')) {
        current_Item = $('li[id^=menu-c1]').find(".item-hover");
        console.log(current_Item);
    } else {
        current_Item = $('li#menu-c1-0');
        // current_Item.addClass('item-hover');
    }
    // add eventListener for keydown
    var start = new Date().getTime();
    var end = new Date().getTime();
    document.addEventListener('keydown', function(e) {
        // e.preventDefault();
        end = new Date().getTime();
        console.log('time start:' + start);
        console.log('time end:' + end);
        console.log('time gap:' + (end - start));
        if ((end - start) < 200) {
            console.log('time 2222 start:' + start);
            console.log('time 2222 end:' + end);
            console.log('time 2222 gap:' + (end - start));
            e.preventDefault();
            e.stopPropagation();
        }

        start = new Date().getTime();

        if (typeof current_Item !== "undefined" && !current_Item.length) {
            console.log('current_Item not found ----------------------------- ');
            current_Item.mouseleave();
            current_Item.removeClass('item-hover');
        }

        if (navZone !== 'openLoginDialog' && navZone !== 'generalDialog' && navZone !== 'confirmExits' && navZone !== 'episodeSelectDialog') {
            console.log('not login dialog -----------------------------  2222');
            lastNavZone = navZone;
            last_current_Item = current_Item;
        }


        switch (e.keyCode) {
            case 13: // Enter
                eventControler(e.keyCode, current_Item);
                break;
            case 37: // LEFT arrow
                eventControler(e.keyCode, current_Item);
                break;
            case 38: // UP arrow
                e.preventDefault();
                eventControler(e.keyCode, current_Item);
                break;
            case 39: // RIGHT arrow
                eventControler(e.keyCode, current_Item);
                break;
            case 40: // DOWN arrow
                e.preventDefault();
                eventControler(e.keyCode, current_Item);
                break;
            case 10252: // MediaPlayPause
            case 415:
                eventControler(e.keyCode, current_Item);
                break;
            case 19:
                eventControler(e.keyCode, current_Item);
                break;
            case 413:
                eventControler(e.keyCode, current_Item);
                break;
            case 417:
                eventControler(e.keyCode, current_Item);
                break;
            case 412:
                eventControler(e.keyCode, current_Item);
                break;
            case 65385: //key cancel
                document.body.focus();
                current_Item.blur();
                break;
            case 10009: // Return
                // if (Ulti.isLoaderVisible() && !isPageLoaded) {
                //     console.log('return course of visible ....11........ d.'); 
                //     appScope.$emit('onConfirmExits');
                //     return;
                // }
                if (Ulti.currentPage === 'home' && navZone !== 'confirmExits' && navZone !== 'generalDialog' && navZone !== 'openLoginDialog') {
                    // lastNavZone = navZone;
                    navZone = 'confirmExits';
                    // last_current_Item = current_Item;

                    appScope.$emit('onConfirmExits');

                } else if (isPageLoaded) {
                    eventControler(e.keyCode, current_Item);
                }
                break;
            case 8:
                eventControler(e.keyCode, current_Item);
                break;
            case 46:
                eventControler(e.keyCode, current_Item);
                break;
            case 10182:
                tizen.application.getCurrentApplication().exit();
                // if (Ulti.isLoaderVisible()) {
                //     console.log('return course of visible .............');
                //     appScope.$emit('onConfirmExits');
                //     return;
                // }
                // if (navZone !== 'confirmExits' && navZone !== 'generalDialog' && navZone !== 'openLoginDialog') {
                //     // lastNavZone = navZone;
                //     navZone = 'confirmExits';
                //     // last_current_Item = current_Item;
                //     appScope.$emit('onConfirmExits');
                //     // tizen.application.getCurrentApplication().exit();
                // } else {
                //     eventControler(e.keyCode, current_Item);
                //     // tizen.application.getCurrentApplication().exit();
                // }

                break;
            default:
                console.log("Unhandled key: " + e.keyCode);
                if (e.keyCode >= 48 && e.keyCode <= 57) {
                    if (current_Item.prop("tagName") === 'INPUT') {
                        console.log(current_Item.val() + keyCodeTable[e.keyCode]);
                        current_Item.val(current_Item.val() + keyCodeTable[e.keyCode]);
                    }
                }

                break;
        }
    });
};

function eventControler(keyCode, curItem) {
    console.log('---------------------current_Item--------:');
    console.log("Key " + keyCode);
    console.log("scope: " + navZone);
    console.log(current_Item);
    console.log('---------------------current_Item--------:');
    // if (typeof current_Item !== "undefined" && !current_Item.length) {
    //     navZone = "menu";
    // }

    if (navZone === "menu") menuNavigate(keyCode, curItem);
    else if (navZone === "openLoginDialog") loginNavigate(keyCode, curItem);
    else if (navZone === "search") searchNavigate(keyCode, curItem);
    else if (navZone === "account") accountNavigate(keyCode, curItem);
    else if (navZone === "channel") channelNavigate(keyCode, curItem);
    else if (navZone === "vod") detailVodNavigate(keyCode, curItem);
    else if (navZone === "avPlay") avPlayNavigate(keyCode, curItem);
    else if (navZone === "home") homeNavigate(keyCode, curItem);
    else if (navZone === "vodPackage") vodPackageNavigate(keyCode, curItem);
    else if (navZone === "vodList") vodListNavigate(keyCode, curItem);
    else if (navZone === "changePass") changePassNavigate(keyCode, curItem);
    else if (navZone === "searchResult") searchResultNavigate(keyCode, curItem);
    else if (navZone === "confirmExits") confirmExitsNavigate(keyCode, curItem);
    else if (navZone === "generalDialog") generalDlgNavigate(keyCode, curItem);
    else if (navZone === "episodeSelectDialog") episodeSelectDlgNavigate(keyCode, curItem);
    else {
        if (key === 10009) {
            console.log('return key ............');
        }
    }
}
if (!isreadyListener) {
    isreadyListener = true;
    mainEventKey();
}