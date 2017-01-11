angular.module('vietteltvServices')
    .service('AccountService', AccountService);

AccountService.$inject = ['$http', '$stateParams', '$q', '$resource', '$httpParamSerializer', 'Constant'];

function AccountService($http, $stateParams, $q, $resource, $httpParamSerializer, Constant) {

    var someValue = '';
    var service = {
        someValue: someValue,
        login: login,
        //        register: register,
        requestAuthenticationCode: requestAuthenticationCode,
        getPairingMessage: getPairingMessage,
        requestPairing: requestPairing,
        getPairingAccessToken: getPairingAccessToken,
        getServerTime: getServerTime,
        getAccountInfo: getAccountInfo,
        getAutoLoginAccountInfo: getAutoLoginAccountInfo,
        checkPaidAmount: checkPaidAmount,
        checkUserFlexi: checkUserFlexi,
        getPurchaseNow: getPurchaseNow,
        getPurchaseObject: getPurchaseObject,
        executePaymentProcess: executePaymentProcess,
        getChannelFavorite: getChannelFavorite,
        addChannelFavorite: addChannelFavorite,
        removeChannelFavorite: removeChannelFavorite,
        checkPairing: checkPairing,
        automatic_detection: automatic_detection,
        getClientIP: getClientIP,
        getRemoteIP: getRemoteIP,
        getRenewToken: getRenewToken
    };

    return service;

    //    function register(userAccount) {
    //        var requestObj = {};
    //
    //        requestObj.client_id = userAccount.clientId;
    //        requestObj.id = userAccount.id;
    //        requestObj.password = userAccount.password;
    //        requestObj.code = userAccount.code;
    //
    //        var passBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + requestObj.password, requestObj.password));
    //        requestObj.password = passBase64;
    //        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + requestObj.password + requestObj.code + requestObj.client_id, Constant.appSecret));
    //        
    //  
    //        //console.log('vm.userAccount' + JSON.stringify(requestObj));
    //        //
    //        var url = Constant.APIHost + '/ott/accounts/create';
    //        $http.defaults.headers.post["Content-Type"] = "application/json";
    //        var resource = $resource(url, {}, {
    //            'register': {method: 'POST'}
    //        });
    //
    //        return resource.register(JSON.stringify(requestObj));
    //    };

    function requestAuthenticationCode(userAccount) {
        var requestObj = {};
        requestObj.client_id = userAccount.clientId;
        requestObj.phone_no = userAccount.id;
        requestObj.device_udid = userAccount.deviceUdid;

        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.client_id + requestObj.device_udid + requestObj.phone_no, Constant.appSecret));
        //console.log('vm.requestObj  ' + JSON.stringify(requestObj));

        var url = Constant.APIHost + '/ott/accounts/requestAuthenticationCode';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'requestAuthenticationCode': {
                method: 'POST'
            }
        });

        return resource.requestAuthenticationCode(JSON.stringify(requestObj));


    };

    function getPairingMessage() {

        var url = Constant.APIHost + '/api1/contents/mails?access_token=' + Config.loginAccessToken + '&from=ott&type=window&format=long';
        var resource = $resource(url, {}, {
            'getPairingMessage': {
                method: 'GET'
            }
        });

        return resource.getPairingMessage();
    }

    function requestPairing(requestObj) {

        var url = Constant.APIHost + '/ott/device/requestPairing';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'requestPairing': {
                method: 'POST'
            }
        });

        return resource.requestPairing(JSON.stringify(requestObj));
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getPairingAccessToken(requestObj) {
        var url = Constant.APIHost + '/api1/auth/access_token';

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        var resource = $resource(url, {}, {
            'getPairingAccessToken': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

        var parametters = $.param(requestObj);

        return resource.getPairingAccessToken(parametters);

    };
    //    function getPairingAccessToken(userAccount) {
    //        var requestObj = {};
    //
    //        requestObj.login_id = userAccount.id;
    //        requestObj.code = userAccount.successPairingCode;
    //        requestObj.client_id = userAccount.clientId;
    //        requestObj.device_id = userAccount.internalDeviceId;
    //        requestObj.ts = userAccount.ts;
    //        requestObj.nonce = Math.floor(100000 + Math.random() * 900000);
    //        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.client_id + requestObj.device_id + requestObj.ts + requestObj.nonce, Constant.appSecret));
    //
    //        //console.log(JSON.stringify(requestObj));
    //
    //        var url = Constant.APIHost + '/api1/auth/pairing_access_token';
    //        url = url + '?login_id=' + requestObj.login_id;
    //        url = url + '&code=' + requestObj.code;
    //        url = url + '&client_id=' + requestObj.client_id;
    //        url = url + '&device_id=' + requestObj.device_id;
    //        url = url + '&ts=' + requestObj.ts;
    //        url = url + '&nonce=' + requestObj.nonce;
    ////        url = url + '&hash=' + requestObj.hash;
    //
    ////        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    //        var resource = $resource(url, {}, {
    //            'getPairingAccessToken': {method: 'POST',headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    //        });
    //
    //        return resource.getPairingAccessToken({hash:'F+7PcQDepqVf2KGlBFQ9aKbxZTU='});
    //    }
    //    ;

    function getServerTime(requestObj) {
        var url = Constant.APIHost + '/api1/auth/now?client_id=' + requestObj.clientId;
        //console.log('getServer Time: ' + url);

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getServerTime': {
                method: 'POST'
            }
        });

        return resource.getServerTime();
    };

    function getAccountInfo() {
        var url = Constant.APIHost + '/api1/me/show?access_token=' + Config.accessToken + '&include_stb=true';
        //console.log('getAccountInfo: ' + url);

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getAccountInfo': {
                method: 'GET'
            }
        });

        return resource.getAccountInfo();
    }

    function getAutoLoginAccountInfo(token) {

        var url = Constant.APIHost + '/ott/accounts/show?access_token=' + token + '&include=device';
        //console.log('getAccountInfo: ' + url);

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getAutoLoginAccountInfo': {
                method: 'GET'
            }
        });

        return resource.getAutoLoginAccountInfo();
    }

    function checkPaidAmount() {
        var url = Constant.APIHost + '/api1/payments/check_paid_amount?month=' + (new Date()).getMonth() + '&access_token=' + Config.accessToken;
        //console.log('check_paid_amount: ' + url);

        return $resource(url, {}, {
            get: {
                method: 'GET',
                cache: false,
                isArray: false
            }
        });
    }

    function checkUserFlexi() {
        var url = Constant.APIHost + '/api1/purchases/lookup_product_basic?access_token=' + Config.accessToken;
        //console.log('lookup_product_basic: ' + url);

        return $resource(url, {}, {
            get: {
                method: 'GET',
                cache: false,
                isArray: false
            }
        });
    }

    function getPurchaseNow() {
        var url = Constant.APIHost + '/api1/purchases/now?access_token=' + Config.accessToken;
        //console.log('getPurchaseNow: ' + url);

        return $resource(url, {}, {
            get: {
                method: 'GET',
                cache: false,
                isArray: false
            }
        });
    }

    function getPurchaseObject(requestObj) {
        var url = Constant.APIHost + '/api1/purchases/create';
        //console.log('getPurchaseObject: ' + url);

        var resource = $resource(url, {}, {
            'getPurchaseObject': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

        var parametters = $.param(requestObj);

        return resource.getPurchaseObject(parametters);
    }

    function executePaymentProcess(requestObj) {
        var url = Constant.APIHost + '/api1/payments/create';
        //console.log('executePaymentProcess: ' + url);

        var resource = $resource(url, {}, {
            'executePaymentProcess': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

        var parametters = $.param(requestObj);

        return resource.executePaymentProcess(parametters);
    }

    // get favorite
    function getChannelFavorite(limit) {
        var url = Constant.APIHost + "/api1/me/mychannels/list?access_token=" + Config.accessToken + "&type=program&offset=0&limit=" + limit;
        //console.log("url fav");
        //console.log(url);
        return $resource(url, {}, {
            get: {
                method: 'GET',
                cache: false,
                isArray: false
            }
        });
    };

    function addChannelFavorite(param) {
        var url = Constant.APIHost + '/api1/me/mychannels/create';
        var resource = $resource(url, {}, {
            'addChannelFavorite': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
        return resource.addChannelFavorite(param);
    }

    function removeChannelFavorite(param) {
        //console.log(param);
        var url = Constant.APIHost + '/api1/me/mychannels/destroy';
        var resource = $resource(url, {}, {
            'removeChannelFavorite': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
        return resource.removeChannelFavorite(param);
    }

    function login(userAccount) {
        console.log('requestObj1');
        console.log(userAccount);
        var requestObj = {};

        requestObj.client_id = Constant.clientId;
        requestObj.id = userAccount.id;
        requestObj.password = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + userAccount.password, userAccount.password));

        var deviceObject = {};
        deviceObject.id = $.localStorage.get('deviceUdid');
        deviceObject.model = Ulti.getDeviceModel();
        deviceObject.model_no = Ulti.getDeviceModelNumber();
        deviceObject.type = Ulti.getTypeDevice();

        requestObj.device = deviceObject;

        //console.log('pass:' + userAccount.password);
        //console.log('pass2:' + requestObj.password);
        console.log('requestObj2');
        console.log(requestObj);

        var url = Constant.APIHost + '/ott/accounts/login';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'login': {
                method: 'POST'
            }
        });

        return resource.login(JSON.stringify(requestObj));
    }

    function checkPairing() {

        var url = Constant.APIHost + '/api1/me/show?access_token=' + Config.loginAccessToken + '&include_hh=true';
        //console.log('url:' + url);
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'checkPairing': {
                method: 'GET'
            }
        });

        return resource.checkPairing();
    }

    function getRemoteIP() {
        var url = Constant.WebHost + "/api/getRemoteIP";
        //console.log("url fav");
        //console.log(url);
        return $resource(url, {}, {
            get: {
                method: 'GET',
                cache: false,
                isArray: false
            }
        });
    }

    function automatic_detection(client_ip) {
        //        console.log(java.net.InetAddress.getLocalHost());

        var deviceObject = {};
        deviceObject.id = $.localStorage.get('deviceUdid');
        deviceObject.model = Ulti.getDeviceModel();
//        deviceObject.model = "IOS_PHONE";
        deviceObject.model_no = Ulti.getDeviceModelNumber();
//        deviceObject.model_no = "iphone";
        deviceObject.type = Ulti.getTypeDevice();
//        deviceObject.type = "phone";

        var param = {};
        var urls = document.location.hash.split("client_ip");
        if(client_ip !== null){
            param.client_ip = client_ip;
        }
        else if (urls.length > 1) {
            param.client_ip = urls[1].substr(1);
        }
        param.client_id = Config.clientId;
        param.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(deviceObject.id + param.client_id + param.client_ip, Constant.appSecret));
        param.device = deviceObject;
        //        console.log(param);
//        console.log("param: automatic_detection /n" + JSON.stringify(param));
        var url = Constant.APIHost + '/ott/accounts/automatic_detection';
        //console.log('url:' + url);
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'automatic_detection': {
                method: 'POST'
            }
        });

        return resource.automatic_detection(param);
    }
    function getClientIP() {
        var url = Constant.WebHost + "/api/getRemoteIP";
        //console.log(url);
        return $resource(url,{}, 
            {
            get: {method: 'GET', cache: false, isArray: false}
            }
        );
    }
    function getRenewToken() {
        var param = {
                        "refresh_token" : Config.refresh_token,
                        "client_id": Config.clientId,
                        "hash": CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(Config.refresh_token + Config.clientId, Constant.appSecret))
                    };
        var url = Constant.APIHost + '/ott/accounts/delegation';
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'renewToken': {method: 'POST'}
        }
        );
        return resource.renewToken(param);

    };
}