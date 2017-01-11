angular.module('vietteltvApp').directive('channelSlider', ['$timeout', 'Constant', function ($timeout, Constant) {
        return {
            restrict: 'E',
            transclude: false,
            template: '<div ng-include="getContentUrl()"></div>',
            scope: {
                itemlist: '=',
                slicksettings: '=',
                slickdata: '=',
                cssclass: '@',
                constant: '=?'
            },
            link: function ($scope, element, attrs) {
                $scope.constant = Constant;//asign Contant to directive
                if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                    $scope.getContentUrl = function () {
                        return 'shared/directive/channelSlider.directive.html';
                    }
                } else {
                    $scope.getContentUrl = function () {
                        return 'shared/directive/channelSlider.mobile.directive.html';
                    }
                }
            }

        };

    }]);