function avPlayNavigate(keyCode, curItem) {
    console.log("---------- detailVod Navigate ----------");
    switch (keyCode) {
        case 415: // Play
            player.playPause();
            break;
        case 19: // pause
            player.playPause();
            break;
        case 37: // left
            break;
        case 38: // up
            break;
        case 39: // right
            break;
        case 40: // down
            break;
        case 413: // MediaStop
            $('#playerPanel').hide();
            navZone = lastContentNavZone;
            player.stop();
            break;
        case 417: // MediaFastForward
            player.ff();
            break;
        case 412: // MediaRewind
            player.rew();
            break;
        case 10009: // Return
            console.log("return ........... ");
            $('#playerPanel').hide();
            navZone = lastContentNavZone;
            if (webapis.avplay.getState() !== 'IDLE' &&
                webapis.avplay.getState() !== 'NONE') {
                player.stop();
            } else {
                tizen.application.getCurrentApplication().hide();
            }

            break;
        case 10182: //exit
            $('#playerPanel').hide();
            navZone = lastContentNavZone;
            if (webapis.avplay.getState() !== 'IDLE' &&
                webapis.avplay.getState() !== 'NONE') {
                player.stop();
            } else {
                tizen.application.getCurrentApplication().hide();
            }
            break;
    }
}