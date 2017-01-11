angular.module('vietteltvApp').directive('channelrunningslider', function ($timeout) {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'shared/directive/channelRunningSlider.directive.html',
        scope:false,
//        scope: {
//            data: '=',
//            slicksettings: '=',
//            slickdata: '=',
//            cssclass: '@'
//        },
        link: function ($scope, element, attrs) {
            $timeout(function () {

                // thumb
                if (window.matchMedia('(min-width: 768px)').matches) {
                    $(".view-vip-sknb").hover(function () {
                        $(this).animate({scale: '1.15'}, 100);
                    }, function () {
                        $(this).animate({scale: '1'}, 100);
                    });
                }

            }, 1000);
        }
    }
});