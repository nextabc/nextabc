angular.module('vietteltvControllers').controller('PairingController', PairingController);

PairingController.$inject = ['$http', '$scope', '$state', 'Constant', '$uibModalInstance', 'AccountService','app'];

function PairingController($http, $scope, $state, Constant, $uibModalInstance, AccountService,app) {

    var vm = this;
    vm.isPaired = app.isPaired;

    function pairWithSTB() {
        vm.step = 1;

        var storeObj = $.localStorage.get($.localStorage.get('current_login_id'));

        var requestObj = {};
        requestObj.clientId = Constant.clientId;

        AccountService.getServerTime(requestObj).$promise.then(function (response) {
            vm.userAccount.ts = response.time;

            var requestObj = {};

            requestObj.userId = storeObj.accountInfo.id;
            requestObj.deviceUdid = storeObj.accountInfo.deviceUdid;
            requestObj.clientId = Constant.clientId;
            requestObj.otp = vm.userAccount.pairCode;
            requestObj.model = 'PC_WINDOWS';
            requestObj.model_no = 'Web PC/MAC';
            requestObj.type = 'others';
            requestObj.access_token = Config.loginAccessToken;
            requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.userId + requestObj.deviceUdid + requestObj.clientId + requestObj.otp + requestObj.access_token, Constant.appSecret));
            //console.log(JSON.stringify(requestObj));

            AccountService.requestPairing(requestObj).$promise.then(function (response) {
                storeObj.accountInfo = response;

                var requestObj = {};
                requestObj.login_id = response.familyId;
                requestObj.password = '0000';
                requestObj.client_id = Constant.clientId;
                requestObj.device_id = response.deviceId;
                requestObj.ts = vm.userAccount.ts;
                requestObj.nonce = generateNonce(6);
                requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.client_id + requestObj.device_id + requestObj.ts + requestObj.nonce, Constant.appSecret));

                AccountService.getPairingAccessToken(requestObj).$promise.then(function (response) {
                    //console.log('getPairingAccessToken successfull : ' + response);
//                    var vm.storeObj = $.localStorage.get(vm.userAccount.id);
//                    //console.log('vm.storeObj getPairingAccessToken ' + vm.storeObj);

                    storeObj.accountInfo.accessToken = response.access_token;
                    storeObj.accountInfo.tokenSecret = response.token_secret;
                    storeObj.accountInfo.expirationDate = response.expiration_date;
                    storeObj.accountInfo.isPaired = true;

                    $.localStorage.set($.localStorage.get('current_login_id'), storeObj);
                    
//                    //console.log('dfdffffdfdf: ' + vm.userAccount.id);
//                    //console.log('dfdffffdfdf: ' + $.localStorage.get(vm.userAccount.id).accountInfo.accessToken);

                    Config.tokenSecret = response.token_secret;
                    Config.accessToken = response.access_token;
                    
                    $scope.$emit('afterPairingEvent');

                    //get account info
                    AccountService.getAccountInfo(vm.userAccount).$promise.then(function (response) {
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


    vm.steps = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
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
        //console.log('current step .....' + vm.steps[vm.step]);
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

    function closePairingDialog () {
        $uibModalInstance.close(vm.wizard);
    }
    
    function gotoPairWithSTB () {
       vm.step += 1;
    }

    vm.pairWithSTB = pairWithSTB;
    vm.gotoPairWithSTB = gotoPairWithSTB;
    vm.closePairingDialog = closePairingDialog;
}
