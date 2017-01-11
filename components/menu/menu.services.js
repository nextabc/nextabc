angular.module('vietteltvServices').service('MenuService', MenuService);

MenuService.$inject = ['$http', '$q', '$resource', 'Constant'];

function MenuService($http, $q, $resource, Constant) {

    var service = {
        getWebCategories: getWebCategories
    };

    return service;

    function getWebCategories() {
        var url = Constant.APIHost + '/api1/contents/menus?access_token=' + Constant.guestToken + '&version=Web_Live&child=all';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $resource(url,{}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    }
}
;