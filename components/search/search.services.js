angular.module('vietteltvServices').service('SearchService', SearchService);

SearchService.$inject = ['$http', '$q', '$resource', 'Constant'];

function SearchService($http, $q, $resource, Constant) {

    this.getGenreSearch = function (search_str, limit) {
//        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=15';
        var url = Constant.APIHost + "/api1/search/search?vsuppress=series:1&q=" + search_str + "&region=OTT&limit=" + limit + "&cat=movie,vgroup,tvshow,schedule,channel,catchup&offset=0&input_route=pop&filter=vgroup%3Aseries&access_token=" + Config.accessToken + "";
//        //console.log(url);
        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };
    this.getMoreSearch = function (search_str, limit,cat) {
//        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=15';
        var url = Constant.APIHost + "/api1/search/search?vsuppress=series:1&q=" + search_str + "&region=OTT&limit=" + limit + "&cat="+cat+"&offset=0&input_route=pop&filter=vgroup%3Aseries&access_token=" + Config.accessToken + "";
        console.log(url);
        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };

}
;