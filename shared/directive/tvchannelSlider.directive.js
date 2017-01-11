angular.module('vietteltvApp').directive('tvchannelslider', function ($timeout) {
    return {
        restrict: 'EA',
        transclude: false,
        templateUrl: 'shared/directive/tvchannelSlider.directive.html',
        scope: {
            channellist: '=',
            slicksettings: '=',
            slickdata: '=',
            cssclass: '@',
            host: '=?'
        },
        link: function ($scope,element, attrs) {
             
        }
    }
});