angular.module('vietteltvApp').directive('promotionSlider', function ($timeout) {
    return {
        restrict: 'EA',
        transclude: false,
        templateUrl: 'shared/directive/promotionSlider.directive.html',
        scope: {
            probannerlist: '=?',
            slicksettings: '=?',
            slickdata: '=?',
            cssclass: '@'
        },
        link: function ($scope,element, attrs) {
             
        }
    }
});