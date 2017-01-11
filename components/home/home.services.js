angular.module('vietteltvServices').service('HomeService', HomeService);

HomeService.$inject = ['$http', '$q', '$resource', 'Constant'];

function HomeService($http, $q, $resource, Constant) {

    var vm = this;

    vm.getVodListByCategoryId = getVodListByCategoryId;

    function getVodListByCategoryId(categoryId) {
        var url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=10';

        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });
    }

    this.getNewReleaseVodList = function() {
        //        var url = Constant.APIHost + '/api1/contents/categories/5694c5d1718c336c3b839639/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        var url = Constant.APIHost + '/api1/contents/categories/56d64f5a718ce8ed3fb5f1b3/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        //console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };

    this.getRecommendVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        //console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getPopularVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        //console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getHomeCinemaVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getFilmMovieVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/56d64f5a718ce8ed3fb5f1b3/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getChildrenVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b94718c2c44a9e3cefb/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getMusicVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115d50718c2c44a9e3efbe/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=34';
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };


    this.getSeriesVodList = function(limit) {
        //        http://otttv.viettel.com.vn/api1/contents/categories/555c0ac4718c0e0711f0309f/categories?access_token=e19a43f3ec3f4f8f8fa899d1babc2262d8bbcc5a&offset=0&limit=30
        var url = '';
        if (limit) {
            url = Constant.APIHost + '/api1/contents/categories/555c0ac4718c0e0711f0309f/categories?access_token=' + Config.accessToken + '&offset=0&limit=' + limit;
        } else {
            url = Constant.APIHost + '/api1/contents/categories/555c0ac4718c0e0711f0309f/categories?access_token=' + Config.accessToken + '&offset=0&limit=14';
        }

        console.log("get danh sach phim bo ...");
        console.log(url);

        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
};