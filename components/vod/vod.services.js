angular.module('vietteltvServices').service('VodService', VodService);

VodService.$inject = ['$http', '$q', '$resource', 'Constant'];

function VodService($http, $q, $resource, Constant) {
    var vm = this;

    vm.getVodDetails = function(vodId) {
        var url = Constant.APIHost + '/api1/contents/programs/' + vodId + '?access_token=' + Config.accessToken + '&format=long&include=product,purchase';
        console.log(' abc   ' + url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };

    vm.getVodURL = function(vod, productId, isFreeNoPair) {
        var url;

        //        console.log("productId:");
        //        console.log(productId);
        //        console.log(isFreeNoPair);
        if (isFreeNoPair) {
            url = Constant.APIHost + '/api1/watches/fvod/prepare?access_token=' + Config.guestToken + '&id=' + vod.program.id + '&product_id=' + productId;
        } else {
            url = Constant.APIHost + '/api1/watches/vod/prepare?access_token=' + Config.accessToken + '&id=' + vod.program.id + '&product_id=' + productId;
        }
        //        console.log(' abc   ' + url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };


    this.getPopularVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Constant.guestToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };

    function getEpisodesByCategory(categoryId, limit, offset) {
        //        http://otttv.viettel.com.vn/api1/contents/categories/56e2906b718ce8ed3fb737b5/programs?access_token=24568f93c183efa54dcc8a701a62ad80932d13c2&format=long&offset=0&until=1458118000647&include=product&limit=1
        //        var url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Constant.guestToken + '&format=long&offset=0&until=1458118000647&include=product&limit=-1';
        var url = '';
        if (limit) {
            if (offset) {
                url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Constant.guestToken + '&format=long&offset=' + offset + '&until=now&include=product&limit=' + limit;
            } else {
                url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Constant.guestToken + '&format=long&offset=0&until=now&include=product&limit=' + limit;
            }
        } else {
            url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Constant.guestToken + '&format=long&offset=0&until=now&include=product&limit=-1';
        }
        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    }

    function getEpisodesInSeries(seriesId, seriesSort, offset) {
        //        http://otttv.viettel.com.vn/api1/contents/categories/56e2906b718ce8ed3fb737b5/programs?access_token=24568f93c183efa54dcc8a701a62ad80932d13c2&format=long&offset=0&until=1458118000647&include=product&limit=1
        //        var url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Constant.guestToken + '&format=long&offset=0&until=1458118000647&include=product&limit=-1';
        var url = '';
        if (offset) {
            url = Constant.APIHost + '/api1/contents/programs/series?access_token=' + Constant.guestToken + '&id=' + seriesId + '&format=long&offset=' + offset + '&until=now&&series=' + seriesSort;
        } else {
            url = Constant.APIHost + '/api1/contents/programs/series?access_token=' + Constant.guestToken + '&id=' + seriesId + '&format=long&offset=0&until=now&series=' + seriesSort;
        }
        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    }

    function getVodListByCategoryId(categoryId, offset, limit, shortBy) {
        var url = '';
        if (limit) {
            if (offset) {
                if (shortBy === 'popular') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&popular=true&offset=' + offset + '&include=product&limit=' + limit;
                } else if (shortBy === 'recent') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=' + offset + '&include=product&until=now&limit=' + limit;
                } else {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=' + offset + '&include=product&until=now&limit=' + limit;
                }

            } else {
                if (shortBy === 'popular') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&popular=true&include=product&limit=' + limit;
                } else if (shortBy === 'recent') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&include=product&until=now&limit=' + limit;
                } else {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&include=product&until=now&limit=' + limit;
                }
            }
        } else {
            if (window.matchMedia('(min-device-width: 1025px)').matches) {
                url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=10';
            } else {
                url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=10';
            }

        }

        // url = Constant.APIHost + '/api2/contents/categories/' + categoryId + '/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=20';
        return $resource(url, {}, {
            get: { method: 'GET', cache: true, isArray: false }
        });
    }


    this.getRecommendVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };
    this.getPopularVodList = function() {
        var url = Constant.APIHost + '/api1/contents/categories/55115b7c718c2c44a9e3cc69/programs?access_token=' + Config.accessToken + '&child=all&format=long&offset=0&include=product&until=now&limit=14';
        //        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    };

    function getRelatedVodIdList(vodId) {
        var url = Constant.RecommendHost + '/so-web-app/so/recommend?frmt=json&dp=VT_PHONE_016_VODINFO_AR_VOD&pc=1&cust=&program_id=' + vodId + '&hot_max=12';
        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    }

    function getVodByProgramIdList(programIds) {
        var url = Constant.APIHost + '/api1/contents/programs?access_token=' + Config.guestToken + '&id=' + programIds + '&format=long&include=product';
        console.log(url);
        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    }

    function getSeriesVodList(categoryId, offset, limit, shortBy) {
        //        http://otttv.viettel.com.vn/api1/contents/categories/555c0ac4718c0e0711f0309f/categories?access_token=e19a43f3ec3f4f8f8fa899d1babc2262d8bbcc5a&offset=0&limit=30

        var url = '';
        if (limit) {
            if (offset) {
                if (shortBy === 'popular') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&popular=true&offset=' + offset + '&limit=' + limit;
                } else if (shortBy === 'recent') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&offset=' + offset + '&limit=' + limit;
                } else {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&offset=' + offset + '&limit=' + limit;
                }

            } else {
                if (shortBy === 'popular') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&popular=true&limit=' + limit;
                } else if (shortBy === 'recent') {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&limit=' + limit;
                } else {
                    url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&limit=' + limit;
                }
            }
        } else {
            url = Constant.APIHost + '/api1/contents/categories/' + categoryId + '/categories?access_token=' + Config.accessToken + '&offset=0&limit=10';
        }

        console.log("get danh sach phim bo ...");
        console.log(url);

        return $resource(url, {}, {
            get: { method: 'GET', cache: false, isArray: false }
        });

    }


    vm.getEpisodesInSeries = getEpisodesInSeries;
    vm.getEpisodesByCategory = getEpisodesByCategory;
    vm.getSeriesVodList = getSeriesVodList;
    vm.getVodByProgramIdList = getVodByProgramIdList;
    vm.getRelatedVodIdList = getRelatedVodIdList;
    vm.getVodListByCategoryId = getVodListByCategoryId;

};