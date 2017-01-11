angular.module('vietteltvApp').directive('channelbigeventslider', function ($timeout) {
    return {
        restrict: 'EA',
        transclude: false,
        templateUrl: 'shared/directive/channelBigEventSlider.directive.html',
        scope: {
            videolist: '=',
            slicksettings: '=',
            slickdata: '=',
            cssclass: '@'
        },
        link: function ($scope, element, attrs) {
            $timeout(function () {

                if (window.matchMedia('(min-width: 768px)').matches) {
                    $(".col-mk-p").hover(function () {
                        $(this).animate({scale: '1.05'}, 100);
                    }, function () {
                        $(this).animate({scale: '1'}, 100);
                    });
                }
            }, 1000);
        }
    }
});