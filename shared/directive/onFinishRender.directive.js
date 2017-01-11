angular.module('vietteltvApp').directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            console.log('onFinishRender .............................');
            $timeout(function () { // You might need this timeout to be sure its run after DOM render.
                loadJSfile('assets/js/main.js');
                return;
            }, 0, false);
        }
    };
});



   