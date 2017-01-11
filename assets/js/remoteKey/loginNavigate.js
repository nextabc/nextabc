function loginNavigate(keyCode, curItem) {
    var curent_name = current_Item.attr("name");
    var curent_tag = current_Item.prop("tagName");
    var curent_id = current_Item.attr("id");
    switch (keyCode) {
        case 13: // Enter
            if (curent_tag === "INPUT") {
                if (!current_Item.is(":focus")) {
                    current_Item.focus();
                }
            } else if (curent_tag === "BUTTON" || curent_tag === "A") {
                if (current_Item.is('[name=login_close]')) {
                    var temp_current_Item = current_Item;
                    current_Item = last_current_Item;
                    navZone = lastNavZone;
                    temp_current_Item.click();
                } else {
                    current_Item.click();
                }

            }

            break;
        case 37: // left
            console.log('left :::: loginNavigate' + keyCode);
            if (curent_name === "login_close") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("form#loginForm button[name=login_sumit]");
                current_Item.addClass('item-hover');
                enterElement();
            } else if (curent_id === "register") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("a#reset_pass");
                current_Item.addClass('item-hover');
                enterElement();
            }
            break;
        case 38: // up
            console.log('up :::: loginNavigate' + keyCode);
            if (curent_name === "password") {
                current_Item.removeClass('item-hover');
                current_Item.blur();
                current_Item = $("form#loginForm input[name=phone]");
                current_Item.focus();
                current_Item.addClass('item-hover');
                enterElement();
            } else if (curent_name === "login_sumit" || curent_name === "login_close") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("form#loginForm input[name=password]");
                current_Item.focus();
                current_Item.addClass('item-hover');
                enterElement();
            } else if (curent_id === "register" || curent_id === "reset_pass") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("form#loginForm button[name=login_sumit]");
                current_Item.addClass('item-hover');
                enterElement();
            }

            break;
        case 39: // right
            console.log('right ::: loginNavigate' + keyCode);
            if (curent_name === "login_sumit") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("form#loginForm button[name=login_close]");
                current_Item.addClass('item-hover');
                enterElement();
            } else if (curent_id === "reset_pass") { //move to submit
                current_Item.removeClass('item-hover');
                current_Item = $("a#register");
                current_Item.addClass('item-hover');
                enterElement();
            }
            break;
        case 40: // down
            downkey();
            break;
        case 10009: // Return
            current_Item = last_current_Item;
            navZone = lastNavZone;
            $("form#loginForm button[name=login_close]").click();
            break;
        case 10182: //exits
            current_Item = last_current_Item;
            navZone = lastNavZone;
            $("form#loginForm button[name=login_close]").click();

            break;
        case 8:
            var passInput = $("form#loginForm input[name=password]");
            var phoneInput = $("form#loginForm input[name=phone]");
            if (current_Item.is("form#loginForm input[name=password]")) {
                passInput.val(passInput.val().substring(0, passInput.val().length - 1));
            }
            if (current_Item.is("form#loginForm input[name=phone]")) {
                phoneInput.val(phoneInput.val().substring(0, phoneInput.val().length - 1));
            }

            break;
        case 46:
            if (current_Item.is("form#loginForm input[name=password]")) {
                passInput.val('');
            }
            if (current_Item.is("form#loginForm input[name=phone]")) {
                phoneInput.val('');
            }
            break;
        default:
            console.log("Unhandled key: " + keyCode);

            break;
    }

    function downkey() {
        console.log('down ::::loginNavigate ' + keyCode);
        if (curent_name === "phone") { //move to password
            current_Item.removeClass('item-hover');
            current_Item.blur();
            current_Item = $("form#loginForm input[name=password]");
            current_Item.focus();
            current_Item.addClass('item-hover');
            enterElement();
        } else if (curent_name === "password") { //move to submit
            current_Item.removeClass('item-hover');
            current_Item.blur();
            current_Item = $("form#loginForm button[name=login_sumit]");
            current_Item.addClass('item-hover');
            enterElement();
        }

    }

    function enterElement() {
        //		if(curent_tag === "INPUT"){
        //			current_Item.focus();
        //		}
        //		else if(curent_tag === "BUTTON"){
        //			current_Item.click();
        //		}
    }
}