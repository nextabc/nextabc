angular.module('vietteltvApp').directive('vodslider', ['$timeout', 'Constant', function ($timeout, Constant) {
        return {
            restrict: 'EA',
            transclude: false,
//        templateUrl: 'shared/directive/vodSlider.directive.html',
            template: '<div ng-include="getContentUrl()"></div>',
            scope: {
                slidename: '=',
                videolist: '=',
                slicksettings: '=',
                slickdata: '=',
                cssclass: '@',
                constant: '=?'
            },
            link: function (scope, element, attrs) {
                scope.constant = Constant;//asign Contant to directive
                
                if (attrs.slidename === 'one_line_slide') {
                	console.log('one_line_stide............');
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                    	
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.directive.html';
                        }
                    } else {
                    	
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.mobile.directive.html';
                        }
                    }
                } else if (attrs.slidename === 'banner-nav-slider') {
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                        scope.getContentUrl = function () {
                            return 'shared/directive/bannerNavSlider.directive.html';
                        }
                    } else {

                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.mobile.directive.html';
                        }
                    }
                } else if (attrs.slidename === 'recommend_slide') {
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSliderMasonryShort.directive.html';
                        }
                    } else {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSliderMasonryShort.mobile.directive.html';
                        }
                    }
                } else if (attrs.slidename === 'home_cinema_slide') {
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSliderMasonry.directive.html';
                        }
                    } else {
                    	
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSliderMasonry.mobile.directive.html';
                        }
                    }
                } else if (attrs.slidename === 'series_vod_slide') {
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.series.directive.html';
                        }
                    } else {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.series.mobile.directive.html';
                        }
                    }
                } else if (attrs.slidename === 'ep_series_vod_slide') {
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.epseries.directive.html';
                        }
                    } else {
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.epseries.mobile.directive.html';
                        }
                    }
                } else {
                	console.log("else ........................................................ ");
                    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
                    	
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.directive.html';
                        }
                    } else {
                    	
                        scope.getContentUrl = function () {
                            return 'shared/directive/vodSlider.mobile.directive.html';
                        }
                    }
                }


            }
        }
    }]);