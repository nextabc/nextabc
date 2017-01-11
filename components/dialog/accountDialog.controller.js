angular.module('vietteltvControllers').controller('AccountDialogController', AccountDialogController);

AccountDialogController.$inject = ['$http', '$q', '$rootScope', '$scope', '$state', 'ChangePasswordService', 'Constant', '$uibModalInstance', 'typeDialog'];

function AccountDialogController($http, $q, $rootScope, $scope, $state, ChangePasswordService, Constant, $uibModalInstance, typeDialog) {
    var vm = this;
    vm.typeDialog = typeDialog;
    vm.acc = Ulti.getCurrentAcc();
    vm.pairing = Ulti.isPaired();
    //console.log(vm.acc);
    vm.wizard = {tacos: 2};
    vm.closeAccountDialog = function closeAccountDialog() {
        $uibModalInstance.close(vm.wizard);
    };
}

