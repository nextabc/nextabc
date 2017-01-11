/* global Ulti */

angular.module('vietteltvControllers').controller('SearchController', SearchController);
SearchController.$inject = ['$scope','$rootScope', '$stateParams', '$http', '$window', '$q', '$timeout', '$resource', 'SearchService', 'Constant'];

function SearchController($scope,$rootScope, $stateParams, $http, $window, $q, $timeout, $resource, SearchService, Constant) {
    var vm = this;
    vm.search_str = $stateParams.search_str;
    vm.numSearchDefault = 7;
    vm.genreSearchLoaded = false;
    vm.genreSearchList;

    vm.genreSearchList_movie_data;
    vm.genreSearchList_vgroup_data;
    vm.genreSearchList_tvshow_data;
    vm.genreSearchList_schedule_data;
    vm.genreSearchList_channel_data;
    vm.genreSearchList_catchup_data;
    $.localStorage.set('activedMenu', null);
    vm.movie_loadmore;
    vm.loadmore = {};
    SearchService.getGenreSearch(vm.search_str, vm.numSearchDefault).get({},
            function success(response) {
                vm.genreSearchList = response;
                vm.totalResult = vm.genreSearchList.hits.total;

                vm.genreSearchList_movie_data = vm.genreSearchList.movie.data;
                vm.genreSearchList_vgroup_data = vm.genreSearchList.vgroup.data;
                vm.genreSearchList_tvshow_data = vm.genreSearchList.tvshow.data;
                vm.genreSearchList_schedule_data = vm.genreSearchList.schedule.data;
                vm.genreSearchList_channel_data = vm.genreSearchList.channel.data;
                vm.genreSearchList_catchup_data = vm.genreSearchList.catchup.data;
                //load more
                vm.loadmore.movie = {
                    cat: "movie",
                    total: vm.genreSearchList.movie.total,
                    curenttotal: vm.genreSearchList.movie.data.length,
                    isloadmore: ((vm.genreSearchList.movie.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.movie.total - vm.numSearchDefault) : 0,
                    totalpage: Math.ceil(vm.genreSearchList.movie.total / vm.numSearchDefault),
                    currentpage: Math.ceil(vm.genreSearchList.movie.data.length / vm.numSearchDefault)
                };
                vm.loadmore.vgroup = {
                    cat: "vgroup",
                    total: vm.genreSearchList.vgroup.total,
                    curenttotal: vm.genreSearchList.vgroup.data.length,
                    isloadmore: ((vm.genreSearchList.vgroup.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.vgroup.total - vm.numSearchDefault) : 0,
                    totalpage: Math.ceil(vm.genreSearchList.vgroup.total / vm.numSearchDefault),
                    currentpage: Math.ceil(vm.genreSearchList.vgroup.data.length / vm.numSearchDefault)
                };
                vm.loadmore.tvshow = {
                    cat: "tvshow",
                    total: vm.genreSearchList.tvshow.total,
                    curenttotal: vm.genreSearchList.tvshow.data.length,
                    isloadmore: ((vm.genreSearchList.tvshow.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.tvshow.total - vm.numSearchDefault) : 0,
                    totalpage: Math.ceil(vm.genreSearchList.tvshow.total / vm.numSearchDefault),
                    currentpage: Math.ceil(vm.genreSearchList.tvshow.data.length / vm.numSearchDefault)
                };
//                vm.loadmore.schedule = {
//                    cat: "schedule",
//                    total: vm.genreSearchList.schedule.total,
//                    curenttotal: vm.genreSearchList.schedule.data.length,
//                    isloadmore: ((vm.genreSearchList.schedule.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.schedule.total - vm.numSearchDefault) : 0,
//                    totalpage: Math.ceil(vm.genreSearchList.schedule.total / vm.numSearchDefault),
//                    currentpage: Math.ceil(vm.genreSearchList.schedule.data.length / vm.numSearchDefault)
//                };
                vm.loadmore.channel = {
                    cat: "channel",
                    total: vm.genreSearchList.channel.total,
                    curenttotal: vm.genreSearchList.channel.data.length,
                    isloadmore: ((vm.genreSearchList.channel.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.channel.total - vm.numSearchDefault) : 0,
                    totalpage: Math.ceil(vm.genreSearchList.channel.total / vm.numSearchDefault),
                    currentpage: Math.ceil(vm.genreSearchList.channel.data.length / vm.numSearchDefault)
                };
//                vm.loadmore.catchup = {
//                    cat: "catchup",
//                    total: vm.genreSearchList.catchup.total,
//                    curenttotal: vm.genreSearchList.catchup.data.length,
//                    isloadmore: ((vm.genreSearchList.catchup.total - vm.numSearchDefault) > 0) ? (vm.genreSearchList.catchup.total - vm.numSearchDefault) : 0,
//                    totalpage: Math.ceil(vm.genreSearchList.catchup.total / vm.numSearchDefault),
//                    currentpage: Math.ceil(vm.genreSearchList.catchup.data.length / vm.numSearchDefault)
//                };

                vm.genreSearchLoaded = true;
                //console.log(vm.loadmore);
                //show panel 
                if (vm.genreSearchList.movie.total > 0) {
                    vm.activeResultCate('movie');
                } else if (vm.genreSearchList.vgroup.total > 0) {
                    vm.activeResultCate('vgroup');
                } else if (vm.genreSearchList.tvshow.total > 0) {
                    vm.activeResultCate('tvshow');
                }
//                else if (vm.genreSearchList.schedule.total > 0) {
//                    vm.activeResultCate('schedule');
//                }
                else if (vm.genreSearchList.channel.total > 0) {
                    vm.activeResultCate('channel');
                } 
//                else if (vm.genreSearchList.catchup.total > 0) {
//                    vm.activeResultCate('catchup');
//                }
                console.log(vm.loadmore);
                $rootScope.currentControler = "searchResult";
            },
            function error(response) {
                //console.log('Loi trong qua trinh goi service! Response = ' + response);
            }
    );
    vm.loadmore.getLoadmore = function (loadmore) {
        var limit = loadmore.curenttotal + vm.numSearchDefault
        SearchService.getMoreSearch(vm.search_str, limit, loadmore.cat).get({},
                function success(response) {
                    if (loadmore.cat === "movie") {
                        //data
                        vm.genreSearchList_movie_data = response.movie.data;
                        //page
                        vm.loadmore.movie = {
                            cat: "movie",
                            total: response.movie.total,
                            curenttotal: response.movie.data.length,
                            isloadmore: ((response.movie.total - vm.numSearchDefault) > 0) ? (response.movie.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.movie.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.movie.data.length / vm.numSearchDefault)
                        };
                    } else if (loadmore.cat === "vgroup") {
                        vm.genreSearchList_vgroup_data = response.vgroup.data;
                        vm.loadmore.vgroup = {
                            cat: "vgroup",
                            total: response.vgroup.total,
                            curenttotal: response.vgroup.data.length,
                            isloadmore: ((response.vgroup.total - vm.numSearchDefault) > 0) ? (response.vgroup.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.vgroup.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.vgroup.data.length / vm.numSearchDefault)
                        };
                    } else if (loadmore.cat === "tvshow") {
                        vm.genreSearchList_tvshow_data = response.tvshow.data;
                        vm.loadmore.tvshow = {
                            cat: "tvshow",
                            total: response.tvshow.total,
                            curenttotal: response.tvshow.data.length,
                            isloadmore: ((response.tvshow.total - vm.numSearchDefault) > 0) ? (response.tvshow.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.tvshow.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.tvshow.data.length / vm.numSearchDefault)
                        };
                    } else if (loadmore.cat === "schedule") {
                        vm.genreSearchList_schedule_data = response.schedule.data;
                        vm.loadmore.schedule = {
                            cat: "schedule",
                            total: response.schedule.total,
                            curenttotal: response.schedule.data.length,
                            isloadmore: ((response.schedule.total - vm.numSearchDefault) > 0) ? (response.schedule.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.schedule.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.schedule.data.length / vm.numSearchDefault)
                        };
                    } else if (loadmore.cat === "channel") {
                        vm.genreSearchList_channel_data = response.channel.data;
                        vm.loadmore.channel = {
                            cat: "channel",
                            total: response.channel.total,
                            curenttotal: response.channel.data.length,
                            isloadmore: ((response.channel.total - vm.numSearchDefault) > 0) ? (response.channel.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.channel.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.channel.data.length / vm.numSearchDefault)
                        };
                    } else if (loadmore.cat === "catchup") {
                        vm.genreSearchList_catchup_data = response.catchup.data;
                        vm.loadmore.catchup = {
                            cat: "catchup",
                            total: response.catchup.total,
                            curenttotal: response.catchup.data.length,
                            isloadmore: ((response.catchup.total - vm.numSearchDefault) > 0) ? (response.catchup.total - vm.numSearchDefault) : 0,
                            totalpage: Math.ceil(response.catchup.total / vm.numSearchDefault),
                            currentpage: Math.ceil(response.catchup.data.length / vm.numSearchDefault)
                        };
                    }
                    //console.log(vm.loadmore);
                },
                function error(response) {
                    //console.log('Loi trong qua trinh goi service! Response = ' + response);
                }
        );
    };

    vm.goToCatchUp = function () {

    };

    vm.showCate;
    vm.activeResultCate = function (cate) {
        $("ul#ul_cate li").removeClass("active");
        $("li#li_" + cate).addClass("active");

        vm.showCate = cate;
    };

    //function hi
}
;
