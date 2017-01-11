angular.module('vietteltvControllers').controller('ChangePasswordController', ChangePasswordController);

ChangePasswordController.$inject = ['$http', '$q', '$rootScope', '$scope', '$state', 'ChangePasswordService', 'Constant', '$uibModalInstance', 'changeType', 'AccountService'];

function ChangePasswordController($http, $q, $rootScope, $scope, $state, ChangePasswordService, Constant, $uibModalInstance, changeType,AccountService) {
    var vm = this;
    vm.changeType = changeType.split("_")[0];
    vm.changeMsg = (changeType.split("_")[1] !== undefined) ? changeType.split("_")[1]:"";
    
    vm.resultStep2Type = "";
//    console.log(changeType);
    vm.changePassword = changePassword;
    vm.checkAccount = checkAccount;
    vm.getVerificationCode = getVerificationCode;
    vm.resetPassword = resetPassword;
    vm.activePassword = activePassword;
    vm.closePasswordDialog = closePasswordDialog;
    vm.log_in = log_in;
    vm.main = main;

    main();
    vm.current_login_id;
    vm.storeObj;

    function main() {
        vm.current_login_id = $.localStorage.get('current_login_id');
        vm.storeObj = $.localStorage.get(vm.current_login_id);
        if (vm.storeObj !== null) {
            if (vm.storeObj.activePass !== null)
                vm.activePass = vm.storeObj.activePass;
            else
                vm.activePass = "off";
        } else
            vm.activePassMsg = "Active password is error";

    }
    ;
    
    vm.wizard = {tacos: 2};
    function closePasswordDialog() {
    	$rootScope.currentDialog = "";
        $uibModalInstance.close(vm.wizard);
    }

    vm.passwordObject = {};
    vm.passwordObject.currentpass = (changeType.split("_")[1] !== undefined) ? changeType.split("_")[1]:"";
    vm.passwordObject.newpass;
    vm.passwordObject.reenternewpass;
    var flag = 0;
    function changePassword() {
        vm.resultMsg = "";
        vm.resultChange = "";
        //console.log(vm.passwordObject);
        var param = {
            id: $.localStorage.get('current_login_id'),
            current_password: vm.passwordObject.currentpass,
            new_password: vm.passwordObject.newpass
        };
        ChangePasswordService.changePass(param).$promise.then(
                function success(response) {
                    vm.resultMsg = Msg.changePassword_56;
                    vm.resultChange = "okie";
                    
                    //login to get new token
                    vm.changeMsg = "";
                    var userAccount ={
                        id: param.id,
                        password: param.new_password
                    };
                    vm.log_in(userAccount);
                    $rootScope.currentDialog = "";
                },
                function error(response) {
                    console.log("changePass error");
                    console.log(response);
                    vm.resultMsg = Msg.changePassword_59;
                    vm.resultChange = "false";
                    //console.log('Loi trong qua trinh goi changePass! Response = ');
                    //console.log(response);
                }
        );
    };
  

    vm.forgotPass = {};
    function getVerificationCode() {
        var par = {
            id: vm.forgotPass.account,
            client_id: Constant.clientId,
            hash:CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(vm.forgotPass.account + Constant.clientId , Constant.appSecret))
        };
        
        ChangePasswordService.checkID(par).$promise.then(
                function (response) {
                   if(response.result){
                       
                        vm.resultMsg = "";
                        vm.resultStep1 = "";
                        var param = {
                            phone_no: vm.forgotPass.account,
                            device_udid: $.localStorage.get('deviceUdid'),
                            client_id: Config.clientId,
                            hash: ''
                        };
                               //send authen code
                        ChangePasswordService.sendVerificationCode(param).$promise.then(
                                function success(response) {
                                    vm.resultStep1 = "okie";
                                },
                                function error(response) {
                                    vm.resultMsg = Msg.changePassword_84;
                                    //console.log('Loi trong qua trinh goi changePass! Response = ' + response);
                                }
                        );
                   }
                   else{
                        vm.resultMsg = "Tài khoản không tồn tại. Vui lòng kiểm tra lại";
                   }
                }, function (response) {
                vm.resultMsg = "Xác minh tài khoản thất bại. Vui lòng kiểm tra lại";
        });
        
        
    };
    function checkAccount() {
        //console.log(vm.passwordObject);
        vm.resultMsg = "";
        vm.resultStep1 = "";
        var param = {
            phone_no: vm.forgotPass.account,
            device_udid: $.localStorage.get('deviceUdid'),
            client_id: Config.clientId,
            hash: ''
        };
        ChangePasswordService.sendVerificationCode(param).$promise.then(
                function success(response) {
                    vm.resultStep1 = "okie";
                },
                function error(response) {
                    vm.resultMsg = Msg.changePassword_84;
                    //console.log('Loi trong qua trinh goi changePass! Response = ' + response);
                }
        );
    };

    vm.verificationCode;
    function resetPassword() {
        vm.resultMsg2 = "";
        console.log("vm.forgotPass");
        console.log(vm.forgotPass);
        console.log("Config.clientId + vm.verificationCode +vm.forgotPass.account");
        console.log(Config.clientId + vm.verificationCode +vm.forgotPass.account);
//        var pass = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(vm.forgotPass.account + vm.forgotPass.password, vm.forgotPass.password));
        var param = {
            id: vm.forgotPass.account,
            code: vm.verificationCode,
            client_id: Config.clientId,
//            password: pass,
            hash: CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(Config.clientId + vm.verificationCode +vm.forgotPass.account, Constant.appSecret))
        };
        ChangePasswordService.resetPassword(param).$promise.then(
                function success(response) {
                    vm.resultStep2Type = "okie";
                    vm.resultMsg2 = Msg.changePassword_103;
                },
                function error(response) {
                    vm.resultMsg2 = Msg.changePassword_106;
                    //console.log('Loi trong qua trinh goi changePass! Response = ' + response);
                }
        );
    }


    vm.activePass;
    vm.activePassMsg = "";
    function activePassword() {
        if (vm.storeObj !== null) {
            vm.storeObj.activePass = vm.activePass;
            $.localStorage.set(vm.current_login_id, vm.storeObj);
            vm.activePassMsg = Msg.changePassword_119;
        } else
            vm.activePassMsg = Msg.changePassword_121;
    }
    function log_in(userAccount) {
        AccountService.login(userAccount).$promise.then(
                function success(response) {
                    Config.loginAccessToken = response.access_token;
                    Config.accessToken = response.access_token;
                    Config.expiration_date = response.expiration_date;
                    Config.refresh_token = response.refresh_token;
                    Config.refresh_token_expiration_date = response.refresh_token_expiration_date;
                    Config.temp_password = response.temp_password;
                    var accInfo = {
                        accountInfo: {
                            accessToken: response.access_token,
                            tokenSecret: response.token_secret,
                            loginAccessToken: response.access_token,
                            refresh_token: response.refresh_token,
                            expiration_date: response.expiration_date,
                            refresh_token_expiration_date: response.refresh_token_expiration_date,
                            temp_password: response.temp_password
                        }
                    };
                    
                    $.localStorage.set('current_login_id', userAccount.id);//store current login_id
                    $.localStorage.set(userAccount.id, accInfo);//store current info login
                    $scope.$emit('afterLoginEvent');
                    $state.reload();
                }, function error(response) {
                    $scope.$emit('logoutEvent');
                }
        );
    }
}
