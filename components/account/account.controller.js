angular.module('vietteltvControllers').controller('AccountController', AccountController);

AccountController.$inject = ['$http', '$q', '$scope', '$state', 'LoginService', 'Constant', '$uibModalInstance', 'RegisterService'];

function AccountController($http, $q, $scope, $state, LoginService, Constant, $uibModalInstance, RegisterService) {

    var vm = this;
//    vm.login = login;

//    function login() {
//        vm.userAccount.clientId = Constant.clientId;
//        vm.userAccount.deviceUdid = $.localStorage.get('deviceUdid');
//
//
//        LoginService.login(vm.userAccount).$promise.then(function (response) {
//            //console.log('login successfull : ' + response);
//            Config.loginAccessToken = response.access_token;
//            Config.refreshToken = response.refresh_token;
//            console.log(response.refresh_token);
//
//            $.localStorage.set('current_login_id', vm.userAccount.id);//store current login_id
//
//            var storeObj = $.localStorage.get(vm.userAccount.id);
//            if (storeObj) {
//                Config.accessToken = storeObj.accountInfo.accessToken;
//                RegisterService.getAccountInfo(vm.userAccount).$promise.then(function (response) {
////                    //console.log('login successfull : ' + JSON.stringify(response));
//                    $.localStorage.set('current_account_info', response);//store current current_account_info
//
//                    $uibModalInstance.close(vm.wizard);
//                    $state.reload();
//                }, function (response) {
//                    //console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
//                    if (response.data.error.code === 'C0202') {//invalid access token
//                        RegisterService.getServerTime(vm.userAccount).$promise.then(function (response) {
//                            vm.userAccount.ts = response.time;
//
//                            var storeObj = $.localStorage.get(vm.userAccount.id);
//                            //console.log(storeObj);
//                            vm.userAccount.successPairingCode = storeObj.accountInfo.code;
//                            vm.userAccount.internalDeviceId = storeObj.accountInfo.deviceId;
//                            vm.userAccount.familyId = storeObj.accountInfo.familyId;
////                            //console.log(storeObj.accountInfo.successPairingCode + ' ' + storeObj.accountInfo.internalDeviceId + ' ' + storeObj.accountInfo.familyId);
//
//                            RegisterService.getPairingAccessToken(vm.userAccount).$promise.then(function (response) {
//                                //console.log('getPairingAccessToken successfull : ' + response);
//                                var storeObj = $.localStorage.get(vm.userAccount.id);
//                                //console.log('storeObj getPairingAccessToken ' + storeObj);
//
//                                storeObj.accountInfo.accessToken = response.access_token;
//                                storeObj.accountInfo.tokenSecret = response.token_secret;
//                                storeObj.accountInfo.expirationDate = response.expiration_date;
//                                storeObj.accountInfo.clientId = Constant.clientId;
//                                storeObj.accountInfo.deviceUdid = $.localStorage.get('deviceUdid');
//
//                                $.localStorage.set(vm.userAccount.id, storeObj);
//                                $.localStorage.set('current_login_id', vm.userAccount.id);//store current login_id
//
//                                Config.accessToken = response.access_token;
//                                $state.reload();
//                                vm.step += 1;
//                            }, function (response) {
//                                //console.log('error occurs when getPairingAccessToken error code: ' + response.data.error.code);
//                                //console.log('error occurs when getPairingAccessToken : ' + JSON.stringify(response.data.error.message));
//                                if (response.data.error.code === 'U0118' || response.data.error.code === 'U0105') {//no device found
//                                    //console.log(' ....... ');
////                                    $.localStorage.remove(vm.userAccount.id);
//                                    vm.step += 1;
//                                }
//
//                            });
//                        }, function (response) {
//                            //console.log('error occurs when getServerTime : ' + JSON.stringify(response.data.error.message));
//                            if (response.data.error.code === 'U0105') {//no device found
//                                //console.log(' ....... ');
////                                    $.localStorage.remove(vm.userAccount.id);
//                                vm.step += 1;
//                            }
//                        });
//                    }
//                });
//
//            } else {//not pair
//                vm.step += 1;
//            }
//        }, function (response) {
//            //console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
//            //console.log($scope.loginForm.phone);
//            $scope.loginForm.phone.$setValidity('invalidInfo', false);
//        });
//
//    }

    vm.gotoPairing = function () {
//        RegisterService.getPairingMessage(vm.userAccount).$promise.then(function (response) {
//            //console.log('pair message : ' + response);
//            vm.step += 1;
//        }, function (response) {
//            //console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
//        });
        vm.step += 1;
    }

    vm.pairWithSTB = function () {
        RegisterService.getServerTime(vm.userAccount).$promise.then(function (response) {
            vm.userAccount.ts = response.time;

            RegisterService.requestPairing(vm.userAccount).$promise.then(function (response) {
                var storeObj = {};
                storeObj.accountInfo = response;
                vm.userAccount.successPairingCode = response.code;
                vm.userAccount.internalDeviceId = response.deviceId;
                vm.userAccount.familyId = response.familyId;

                $.localStorage.set(vm.userAccount.id, storeObj);

                RegisterService.getPairingAccessToken(vm.userAccount).$promise.then(function (response) {
                    //console.log('getPairingAccessToken successfull : ' + response);
                    var storeObj = $.localStorage.get(vm.userAccount.id);
                    //console.log('storeObj getPairingAccessToken ' + storeObj);

                    storeObj.accountInfo.accessToken = response.access_token;
                    storeObj.accountInfo.tokenSecret = response.token_secret;
                    storeObj.accountInfo.expirationDate = response.expiration_date;

                    $.localStorage.set(vm.userAccount.id, storeObj);
                    $.localStorage.set('current_login_id', vm.userAccount.id);//store current login_id

                    Config.accessToken = response.access_token;

                    //get account info
                    RegisterService.getAccountInfo(vm.userAccount).$promise.then(function (response) {
//                    //console.log('login successfull : ' + JSON.stringify(response));
                        $.localStorage.set('current_login_id', vm.userAccount.id);//store current login_id
                        $.localStorage.set('current_account_info', response);//store current current_account_info

                    }, function (response) {
                        //console.log('error occurs when get Account Info : ' + JSON.stringify(response.data.error.message + '  -- error code:' + JSON.stringify(response.data.error.code)));
                    });

                    $state.reload();
                    vm.step += 1;
                }, function (response) {
                    //console.log('error occurs when getPairingAccessToken : ' + JSON.stringify(response.data.error.message));
                });
            }, function (response) {
                //console.log('error occurs when pairWithSTB : ' + JSON.stringify(response.data.error.message));
            });
        }, function (response) {
            //console.log('error occurs when getServerTime : ' + JSON.stringify(response.data.error.message));
        });

    }
    
    


    vm.steps = ['one', 'two', 'three', 'four'];
    vm.step = 0;
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
        //console.log('current step .....' + vm.step)
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
