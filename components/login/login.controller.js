angular.module('vietteltvControllers').controller('LoginController', LoginController);

LoginController.$inject = ['$http', '$rootScope', '$scope', '$state', 'Constant', '$uibModalInstance', 'AccountService', 'parent'];

function LoginController($http, $rootScope, $scope, $state, Constant, $uibModalInstance, AccountService, parent) {
    var vm = this;
    vm.resultMsg = "";
    vm.userAccount = {};
    // vm.userAccount.id = "0968030069";
    // vm.userAccount.password = "123456";

    function login() {
        vm.resultMsg = "";
        vm.userAccount.clientId = Constant.clientId;
        vm.userAccount.deviceUdid = $.localStorage.get('deviceUdid');

        AccountService.login(vm.userAccount).$promise.then(
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

                $.localStorage.set('current_login_id', vm.userAccount.id); //store current login_id
                $.localStorage.set(vm.userAccount.id, accInfo); //store current info login
                $scope.$emit('afterLoginEvent');
                $uibModalInstance.close(vm.wizard);
                $rootScope.currentDialog = "";
                $state.reload();
                //////                    setTimeout(function(){
                if (Config.temp_password) {
                    $scope.$emit('openChangePassDialogEvent', "changePass_" + vm.userAccount.password);
                }
                ////                    },1000);



            },
            function error(response) {
                //console.log('error occurs when login : ' + JSON.stringify(response.data.error.message));
                //console.log($scope.loginForm.phone);
                vm.resultMsg = "Tài khoản hoặc mật khẩu không đúng.";
                //            $scope.loginForm.phone.$setValidity('invalidInfo', false);
            });

    }



    vm.steps = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    vm.step = 0;
    vm.wizard = { tacos: 2 };

    vm.isFirstStep = function() {
        return vm.step === 0;
    };

    vm.isLastStep = function() {
        return vm.step === (vm.steps.length - 1);
    };

    vm.isCurrentStep = function(step) {
        return vm.step === step;
    };

    vm.setCurrentStep = function(step) {
        vm.step = step;
    };

    vm.getCurrentStep = function() {
        //console.log('current step .....' + vm.step)
        return vm.steps[vm.step];
    };

    vm.getNextLabel = function() {
        return (vm.isLastStep()) ? 'Submit' : 'Next';
    };

    vm.handlePrevious = function() {
        vm.step -= (vm.isFirstStep()) ? 0 : 1;
    };

    vm.handleNext = function() {
        if (vm.isLastStep()) {
            $uibModalInstance.close(vm.wizard);
        } else {
            vm.step += 1;
        }
    };

    vm.closeRegisterModal = function() {
        $uibModalInstance.close(vm.wizard);
    };

    vm.closeRegisterModal2 = function() {

    };


    vm.login = login;



}