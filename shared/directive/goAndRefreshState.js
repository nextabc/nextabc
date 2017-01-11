angular.module('vietteltvApp').directive('goAndRefreshState', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind("click", function () {
//                console.log(document.location.pathname + "#/" + attrs.goAndRefreshState.replace(/,/g,'\/') );
                window.location.replace(document.location.pathname + "#/" + attrs.goAndRefreshState.replace(/,/g,'\/')) ;
//                window.location.reload();
            });
        }
    }
});
