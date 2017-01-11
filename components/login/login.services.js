angular.module('vietteltvServices')
        .service('LoginService', LoginService);

LoginService.$inject = ['$http', '$q', '$resource', 'Constant'];

function LoginService($http, $q, $resource, Constant) {

    var someValue = '';
    var service = {
        someValue: someValue,
//        login: login,
        checkPairing: checkPairing
    };

    return service;

//    function login(userAccount) {
//        var requestObj = {};
//
//        requestObj.client_id = Constant.clientId;
//        requestObj.id = userAccount.id;
//        requestObj.password = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.id + userAccount.password, userAccount.password));
//
//        console.log('pass:' + userAccount.password);
//        console.log('pass2:' + requestObj.password);
//
//        var url = Constant.APIHost + '/ott/accounts/login';
//
//        $http.defaults.headers.post["Content-Type"] = "application/json";
//        var resource = $resource(url, {}, {
//            'login': {method: 'POST'}
//        });
//
//        return resource.login(JSON.stringify(requestObj));
//    };

    function checkPairing(tempAccessToken) {

        var url = Constant.APIHost + '/api1/me/show?access_token=' + tempAccessToken + '&include_hh=true';
        //console.log('url:' + url);
        var resource = $resource(url, {}, {
            'checkPairing': {method: 'GET'}
        });

        return resource.checkPairing();
    }
    ;
}
