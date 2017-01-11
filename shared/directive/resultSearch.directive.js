angular.module('vietteltvApp').directive('resultsearch', function ($timeout, Constant) {
    return {
        restrict: 'E',
        transclude: false,
//        templateUrl: 'shared/directive/vodSlider.directive.html',
        templateUrl: 'shared/directive/resultSearch.directive.html',
        scope: {
            data: '=',
            dataloaded: '=',
            constant: '=?',
            resultype: '@',
            loadmore: '='
        },
        link: function (scope, element, attrs) {
            scope.constant = Constant;//asign Contant to directive  
//            scope.loadmore = SearchController.vm.loadmore;
            $("div.disable_loadmore").click(function (e){
                e.preventDefault();
            });
            $timeout(function () {

                if (window.matchMedia('(min-width: 768px)').matches) {
                    $(".col-list-tin ul li").hover(function () {
                        $(this).animate({scale: '1.15'});

                    }, function () {
                        $(this).animate({scale: '1'});

                    });
                }
            }, 1000);
        }

    };

});