angular.module('vietteltvApp').directive('channelbottom', function ($timeout) {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'shared/directive/channelBottom.directive.html',
        scope: false,
        link: function ($scope, element, attrs) {
            $scope.$watch('vm.channelBottomList.length', function () {
                
            });


        }

    };

});