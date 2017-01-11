/**
 * Load modules for application
 */
'use strict';
// console.log('aaaaaaaaaaaaaaa');
var vietteltvApp = angular
    .module('vietteltvApp', [
        'ngRoute',
        'ui.router',
        'vietteltvServices',
        'vietteltvControllers',
        'ngResource',
        //            'templates',
        'slickCarousel',
        //            'ngAnimate',
        'ngMessages',
        'ui.bootstrap',
        'ngSanitize',
        'ct.ui.router.extras.previous',
        'angular-confirm'
    ]);

angular.module('vietteltvControllers', []);
angular.module('vietteltvServices', []);

// set of config options stored in constant



angular.module('vietteltvApp')
    .constant('Constant', {
        DebugMode: true,
        StepCounter: 0,
        clientId: 'viettelSdpClient2',
        guestToken: '00536aefb1f78bca51f8b3fde6f643c5',
        accessToken: '00536aefb1f78bca51f8b3fde6f643c5',
        tokenSecret: '00536aefb1f78bca51f8b3fde6f643c5',
        loginAccessToken: '00536aefb1f78bca51f8b3fde6f643c5',
        appSecret: 'viettelSdpUserprofile1',
        APIHost: 'http://otttv.viettel.com.vn',
        WebHost: 'http://27.67.48.219',
        RecommendHost: 'http://otttv.viettel.com.vn',
        //        APIHost: 'http://10.60.70.209:18080',
        //
        APIHostStream: 'http://27.67.50.6:18080',
        //  APIHost: 'http://RGSWEB01:9999'
        //  http://otttv.viettel.com.vn'
        //  http://10.60.70.209:18080'
        channelDefault: '54c201bc718ce0b6e1007944',
        channelIdDefault: '154',
        limitedFav: 8,
        currentChannel: 'currentChannel'
    });

// console.log("$.localStorage.get('menu').version");


angular.module('vietteltvApp').config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

//prevent redirect to Home Page 
angular.module('vietteltvApp').run(['$rootScope', '$state',
    function($rootScope, $state) {
        window.FastClick.attach(document.body);
        var unbindChangeSuccess = $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {

                if (toState.name === 'home' && (fromState.name !== 'home' && fromState.name !== '') && options.location === false) {
                    event.preventDefault();
                }

            })
    }
]);

angular.module('vietteltvApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.cache = true;
    // $httpProvider.interceptors.push(function($q, $injector) {

    //     var retries = 0,
    //         waitBetweenErrors = 500,
    //         maxRetries = 100;

    //     function onResponseError(config) {
    //         var $http = $injector.get('$http');
    //         var deferred = $q.defer();
    //         setTimeout(function() {
    //             console.log('onResponseError ......');
    //             console.log(config);
    //             console.log("onResponseError start ...");
    //             return $http(config);
    //         }, waitBetweenErrors);
    //     }

    //     return {
    //         responseError: function(response) {
    //             console.log('begin retry request.................');
    //             if (retries < maxRetries) {
    //                 retries++;
    //                 return onResponseError(response.config);
    //             }
    //             // retries = 0;
    //             return $q.reject(response);
    //         }
    //     };
    // });
}]);