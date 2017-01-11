angular.module('vietteltvControllers').controller('DialogController', DialogController);

DialogController.$inject = ['$http', '$q', '$rootScope', '$scope', '$state', 'ChangePasswordService', 'Constant', '$uibModalInstance','popupMessage'];

function DialogController($http, $q, $rootScope, $scope, $state, ChangePasswordService, Constant, $uibModalInstance,popupMessage) {
    var vm = this;
    vm.step;
    vm.msgObj = {};
    
    if(typeof popupMessage.title === "undefined" || popupMessage.title === ""){
        vm.msgObj.title = "Thông báo";
    }
    if(typeof popupMessage.id === "undefined"){
        vm.msgObj.id = "1";
    }else{
        vm.msgObj.id = popupMessage.id + "";
    }
    if(typeof popupMessage.msg !== "undefined"){
        vm.msgObj.msg = popupMessage.msg;
    }
        
    
    vm.goToApp = goToApp;
    function goToApp(id2,msg){
//        $.localStorage.set(Ulti.installedAppCookie,true);
        document.location.href = msg;
    }
    //console.log(vm.msgObj);
    vm.closeDialog = closeDialog;
    vm.checkbox = false;
    
    vm.wizard = {tacos: 2};
    function closeDialog() {
        if(vm.checkbox){
             sessionStorage.installedAppCookie =true;
//            $.localStorage.set(Ulti.installedAppCookie,true);
        }        
        $uibModalInstance.close(vm.wizard);
    }
}
