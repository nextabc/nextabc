angular.module('vietteltvServices')
        .service('RegisterService', RegisterService);

RegisterService.$inject = ['$http', '$q', '$resource', '$httpParamSerializer', 'Constant'];

function RegisterService($http, $q, $resource, $httpParamSerializer, Constant) {

    var someValue = '';
    var service = {
        someValue: someValue,
        register: register,
        requestAuthenticationCode: requestAuthenticationCode,
        getPairingMessage: getPairingMessage,
        requestPairing: requestPairing,
        getPairingAccessToken: getPairingAccessToken,
        getServerTime: getServerTime,
        getAccountInfo: getAccountInfo,
        checkID: checkID,
        checkViettelNumber: checkViettelNumber
    };

    return service;

    function checkViettelNumber(userAccount) {
        var requestObj = {};

        requestObj.client_id = userAccount.clientId;
        requestObj.id = userAccount.id;
        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + requestObj.client_id, Constant.appSecret));
        //console.log('vm.userAccount' + JSON.stringify(requestObj));
     
        var url = Constant.APIHost + '/ott/accounts/inquire_vm_subscriber';
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'register': {method: 'POST'}
        });
        return resource.register(requestObj);
    };
    function register(userAccount) {
        
        var requestObj = {};

        requestObj.client_id = userAccount.clientId;
        requestObj.id = userAccount.id;
        requestObj.password = userAccount.password;
        requestObj.code = userAccount.code;

        var passBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + requestObj.password, requestObj.password));
        requestObj.password = passBase64;
        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + requestObj.password + requestObj.code + requestObj.client_id, Constant.appSecret));
        //console.log('vm.userAccount' + JSON.stringify(requestObj));
        requestObj.cellphone = userAccount.id;
        requestObj.config = {
            selected_payment_option : "WB",
            vm_subscriber: userAccount.isViettel
        };
        requestObj.device = {
            id : $.localStorage.get('deviceUdid'),
            model : Ulti.getDeviceModel(),
            model_no : Ulti.getDeviceModelNumber(),
            type : Ulti.getTypeDevice()
        };
        
        var url = Constant.APIHost + '/ott/accounts/create';
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'register': {method: 'POST'}
        });

        return resource.register(JSON.stringify(requestObj));
    };

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
            'requestAuthenticationCode': {method: 'POST'}
        });

        return resource.requestAuthenticationCode(JSON.stringify(requestObj));


    }
    ;

    function getPairingMessage() {

        var url = Constant.APIHost + '/api1/contents/mails?access_token=' + Config.loginAccessToken + '&from=ott&type=window&format=long';
        var resource = $resource(url, {}, {
            'getPairingMessage': {method: 'GET'}
        });

        return resource.getPairingMessage();
    }
    ;

    function requestPairing(userAccount) {
        var requestObj = {};

        requestObj.userId = userAccount.id;
        requestObj.deviceUdid = userAccount.deviceUdid;
        requestObj.clientId = 'viettelSdpClient2';
        requestObj.otp = userAccount.pairCode;
        requestObj.model = 'PC_WINDOWS';
        requestObj.model_no = 'x86_64';
        requestObj.type = 'others';
        requestObj.access_token = Config.loginAccessToken;
        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.userId + requestObj.deviceUdid + requestObj.clientId + requestObj.otp + requestObj.access_token, Constant.appSecret));
        //console.log(JSON.stringify(requestObj));

        var url = Constant.APIHost + '/ott/device/requestPairing';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'requestPairing': {method: 'POST'}
        });

        return resource.requestPairing(JSON.stringify(requestObj));
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getPairingAccessToken(userAccount) {
        var requestObj = {};

        requestObj.login_id = userAccount.familyId;
        requestObj.password = '0000';
//        requestObj.code = userAccount.successPairingCode;
        requestObj.client_id = userAccount.clientId;
        requestObj.device_id = userAccount.internalDeviceId;
        requestObj.ts = userAccount.ts;
        requestObj.nonce = generateNonce(6);
        requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.clien_id + requestObj.device_id + requestObj.ts + requestObj.nonce, Constant.appSecret));

        //console.log('get token: ' + JSON.stringify(requestObj));

        var url = Constant.APIHost + '/api1/auth/access_token';
//        url = url + '?login_id=' + requestObj.login_id;
//        url = url + '&code=' + requestObj.code;
//        url = url + '&client_id=' + requestObj.client_id;
//        url = url + '&device_id=' + requestObj.device_id;
//        url = url + '&ts=' + requestObj.ts;
//        url = url + '&nonce=' + requestObj.nonce;
//        url = url + '&hash=' + requestObj.hash;

//        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        var resource = $resource(url, {}, {
            'getPairingAccessToken': {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        });

        var parametters = $.param({
            login_id: requestObj.login_id,
            password: requestObj.password,
            client_id: requestObj.client_id,
            device_id: requestObj.device_id,
            ts: requestObj.ts,
            nonce: requestObj.nonce,
            hash: requestObj.hash});

        //console.log(parametters);
        return resource.getPairingAccessToken(parametters);

//        return resource.getPairingAccessToken(JSON.stringify(requestObj));
    }
    ;
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

    function getServerTime(userAccount) {
        var url = Constant.APIHost + '/api1/auth/now?client_id=' + userAccount.clientId;
        //console.log('getServer Time: ' + url);

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getServerTime': {method: 'POST'}
        });

        return resource.getServerTime();
    }
    ;

    function getAccountInfo(userAccount) {
        var url = Constant.APIHost + '/api1/me/show?access_token=' + Config.accessToken + '&include_stb=true';
        //console.log('getAccountInfo: ' + url);

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getAccountInfo': {method: 'GET'}
        });

        return resource.getAccountInfo();
    };
    function checkID(param) {
       //console.log("param");
       //console.log(param);
        var url = Constant.APIHost + '/ott/accounts/checkId';
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'checkID': {method: 'POST'}
        }
        );
        return resource.checkID(param);

    };


}
