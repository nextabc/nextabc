var Config = {};
var storeObj = $.localStorage.get($.localStorage.get('current_login_id'));

Config.clientId = 'viettelSdpClient2';
Config.guestToken = '00536aefb1f78bca51f8b3fde6f643c5';
Config.appVersion = 67;
Config.isNewMenuVersion = false;

if (Config.isNewMenuVersion &&  $.localStorage.get('menu') !== null && $.localStorage.get('menuMap') !== null) {
//    console.log('new2');
    $.localStorage.set('appVersion', Config.appVersion);
    $.localStorage.set('menu', null);
    $.localStorage.set('menuMap',null);


//    console.log('refresh');
   window.location.reload(true);
}

if (storeObj) {
    if (storeObj.accountInfo.accessToken) {
        Config.accessToken = storeObj.accountInfo.accessToken;
        Config.tokenSecret = storeObj.accountInfo.tokenSecret;

    } else {
        Config.accessToken = '00536aefb1f78bca51f8b3fde6f643c5';
        Config.tokenSecret = '';
    }

    if (storeObj.accountInfo.loginAccessToken) {
        Config.loginAccessToken = storeObj.accountInfo.loginAccessToken;
    }
    if (storeObj.accountInfo.refresh_token) {
        Config.refresh_token = storeObj.accountInfo.refresh_token;
    }
    if (storeObj.accountInfo.expiration_date) {
        Config.expiration_date = storeObj.accountInfo.expiration_date;
    }
    if (storeObj.accountInfo.refresh_token_expiration_date) {
        Config.refresh_token_expiration_date = storeObj.accountInfo.refresh_token_expiration_date;
    }

} else {
    Config.accessToken = '00536aefb1f78bca51f8b3fde6f643c5';
    Config.tokenSecret = '';
}

Config.menuArray = [];

