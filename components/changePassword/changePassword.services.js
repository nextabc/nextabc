angular.module('vietteltvServices')
        .service('ChangePasswordService', ChangePasswordService);

ChangePasswordService.$inject = ['$http', '$q', '$resource', 'Constant'];

function ChangePasswordService($http, $q, $resource, Constant) {

   this.changePass = function (param) {
       var par={};
       var passBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(param.id + param.new_password, param.new_password));
       par.new_password = passBase64;       
       var passBase64 = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(param.id + param.current_password, param.current_password));
       par.current_password = passBase64;
       
        var url = Constant.APIHost + '/ott/accounts/changePassword?access_token='+Config.loginAccessToken;
        
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'changePass': {method: 'POST'}
        }
        );
        return resource.changePass(par);

    };
   this.sendVerificationCode = function (param) {      
        param.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(param.client_id + param.device_udid + param.phone_no, Constant.appSecret));     
        var url = Constant.APIHost + '/ott/accounts/requestAuthenticationCode';
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'changePass': {method: 'POST'}
        }
        );
        return resource.changePass(param);

    };
   this.resetPassword = function (param) {
       //console.log("param");
       //console.log(param);
        var url = Constant.APIHost + '/ott/accounts/resetPassword';
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'changePass': {method: 'POST'}
        }
        );
        return resource.changePass(param);

    };
    this.checkID = function (param) {
        
        var url = Constant.APIHost + '/ott/accounts/checkId';
        
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'checkID': {method: 'POST'}
        }
        );
        return resource.checkID(param);

    };
}
