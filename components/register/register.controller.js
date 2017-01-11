angular.module('vietteltvControllers').controller('RegisterController', RegisterController);

RegisterController.$inject = ['$http', '$uibModal', '$scope', '$state', '$uibModalInstance', 'AccountService', 'RegisterService', 'Constant'];

function RegisterController($http, $uibModal, $scope, $state, $uibModalInstance, AccountService, RegisterService, Constant) {

    var vm = this;
    vm.register = register;
    vm.resultMsg = "";
    vm.step = "one";
    vm.checkTerm = true;
    function register() {
        vm.resultMsg = "";
        //console.log('vm.userAccount' + JSON.stringify(vm.userAccount));

        vm.userAccount.clientId = Constant.clientId;
        vm.userAccount.deviceUdid = $.localStorage.get('deviceUdid');
        //check existing ID
        var param = {
            id: vm.userAccount.id,
            client_id: vm.userAccount.clientId,
            hash:CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(vm.userAccount.id + vm.userAccount.clientId , Constant.appSecret))
        };
        RegisterService.checkID(param).$promise.then(
                function (response) {
                   //send authen code
                   if(!response.result){
                       RegisterService.requestAuthenticationCode(vm.userAccount).$promise.then(
                            function (response) {
                                vm.step = "two";
                            }, function (response) {
                                if(response.data.error.code === "U0120"){
                                    vm.resultMsg = "Thuê bao vượt quá giới hạn yêu cầu. Vui lòng thử lại sau.";
                                }
                            });
                   }
                   else{
                        vm.resultMsg = "Tài khoản của bạn đã tồn tại. Vui lòng kiểm tra lại";
                   }
                }, function (response) {
                vm.resultMsg = response;
        });
        
        

    }
    
    vm.completeRegister = function () {
        vm.resultMsg = "";
        delete vm.userAccount.confirmPass;

        //console.log('go completeRegister:' + JSON.stringify(vm.userAccount));
        
        RegisterService.checkViettelNumber(vm.userAccount).$promise.then(
                function (response) {
                    vm.userAccount.isViettel = response.result;
                    RegisterService.register(vm.userAccount).$promise.then(
                    function (response) {
                        vm.resultMsg = "Đăng ký thành công. Vui lòng đăng nhập để sử dụng dịch vụ";
                        //console.log('register successfull : ' + response);
                        //Đăng ký thành công. -> longin
    //                    setTimeout(function () {
    //                        AccountService.login(vm.userAccount).$promise.then(function (response) {
    //                            Config.loginAccessToken = response.access_token;
    //                            $.localStorage.set('current_login_id', vm.userAccount.id);//store current login_id                            
    //                            $uibModalInstance.close(vm.wizard);
    //                            $scope.$emit('afterLoginEvent');
    //                            $state.reload();
    //                        }, function (response) {
    //                            vm.resultMsg = "Đăng nhập không thành công.";
    //                            console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
    //                        });
    //                    },500);

                    }, function (response) {
                        vm.resultMsg = response.data.error.message;
                        //console.log("completeRegister is fail");
                    });
                }, function (response) {        
                    vm.resultMsg = response.data.error.message;
                    //console.log("completeRegister is fail");
                });
        

    };

// vm.gotoPairing = function () {
////        RegisterService.getPairingMessage(vm.userAccount).$promise.then(function (response) {
////            //console.log('pair message : ' + response);
////            vm.step += 1;
////        }, function (response) {
////            //console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
////        });
//        vm.step += 1;
//    }

//    vm.pairWithSTB = function () {
//        RegisterService.getServerTime(vm.userAccount).$promise.then(function (response) {
//            vm.userAccount.ts = response.time;
//
//            RegisterService.requestPairing(vm.userAccount).$promise.then(function (response) {
//                var storeObj = {};
//                storeObj.accountInfo = response;
//                vm.userAccount.successPairingCode = response.code;
//                vm.userAccount.internalDeviceId = response.deviceId;
//                vm.userAccount.familyId = response.familyId;
//
//                $.localStorage.set(vm.userAccount.id, storeObj);
//
//                RegisterService.getPairingAccessToken(vm.userAccount).$promise.then(function (response) {
//                    //console.log('getPairingAccessToken successfull : ' + response);
//                    var storeObj = $.localStorage.get(vm.userAccount.id);
//                    //console.log('storeObj getPairingAccessToken ' + storeObj);
//
//                    storeObj.accountInfo.accessToken = response.access_token;
//                    storeObj.accountInfo.tokenSecret = response.token_secret;
//                    storeObj.accountInfo.expirationDate = response.expiration_date;
//
//                    $.localStorage.set(vm.userAccount.id, storeObj);
//
//                    Config.accessToken = response.access_token;
//                    $uibModalInstance.close(vm.wizard);
//                    $state.reload();
//                }, function (response) {
//                    //console.log('error occurs when getPairingAccessToken : ' + JSON.stringify(response.data.error.message));
//                });
//            }, function (response) {
//                //console.log('error occurs when pairWithSTB : ' + JSON.stringify(response.data.error.message));
//            });
//        }, function (response) {
//            //console.log('error occurs when getServerTime : ' + JSON.stringify(response.data.error.message));
//        });
//    };


    vm.steps = ['one', 'two', 'three', 'four'];
    //vm.step = 0;
    vm.wizard = {tacos: 2};

    vm.isFirstStep = function () {
        return vm.step === 0;
    };

    vm.isLastStep = function () {
        return vm.step === (vm.steps.length - 1);
    };

    vm.isCurrentStep = function (step) {
        return vm.step === step;
    };

    vm.setCurrentStep = function (step) {
        vm.step = step;
    };

    vm.getCurrentStep = function () {
        //console.log('current step .....' + vm.step);
        return vm.steps[vm.step];
    };

    vm.getNextLabel = function () {
        return (vm.isLastStep()) ? 'Submit' : 'Next';
    };

    vm.handlePrevious = function () {
        vm.step -= (vm.isFirstStep()) ? 0 : 1;
    };

    vm.handleNext = function () {
        if (vm.isLastStep()) {
            $uibModalInstance.close(vm.wizard);
        } else {
            vm.step += 1;
        }
    };

    vm.closeRegisterModal = function () {
        $uibModalInstance.close(vm.wizard);
    };

}
