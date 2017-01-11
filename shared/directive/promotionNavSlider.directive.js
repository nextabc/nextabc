angular.module('vietteltvApp').directive('promotionNavSlider', function ($timeout) {
    return {
        restrict: 'EA',
        transclude: false,
        templateUrl: 'shared/directive/promotionNavSlider.directive.html',
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