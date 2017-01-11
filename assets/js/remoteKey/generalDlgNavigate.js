function generalDlgNavigate(keyCode, curItem) {

    switch (keyCode) {
        case 13: // Enter
            current_Item.click();
            console.log('genral last_current_Item : --- ' + last_current_Item);
            console.log('genral lastNavZone : --- ' + lastNavZone);
            current_Item = last_current_Item;
            navZone = lastNavZone;

            break;

        case 10009: // Return
            current_Item.click();
            current_Item = last_current_Item;
            navZone = lastNavZone;

            break;
        case 10182: //exits
            current_Item.click();
            current_Item = last_current_Item;
            navZone = lastNavZone;

            break;
        default:
            console.log("Unhandled key: " + keyCode);

            break;
    }


}