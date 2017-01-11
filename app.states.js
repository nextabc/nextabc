/**
 * Load states for application
 * more info on UI-Router states can be found at
 * https://github.com/angular-ui/ui-router/wiki
 */
angular.module('vietteltvApp')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

                // any unknown URLS go to 404
                $urlRouterProvider.otherwise('/404');
                // no route goes to index
                $urlRouterProvider.when('', '/');
                // use a state provider for routing

                $stateProvider
                        .state('home', {
                            url: '/',
                            templateUrl: 'components/home/home.view.html',
                            controller: "HomeController",
                            controllerAs: 'vm'
                        })
                        .state('vod-package', {
                            url: '/vp/:menuIndex/:menuId',
                            templateUrl: 'components/vod/vodcategory.view.html',
                            controller: "VodCategoryController",
                            controllerAs: 'vm'
                        })
                        .state('vod-list', {
                            url: '/vl/:menuId',
                            templateUrl: 'components/vod/vodlist.view.html',
                            controller: "VodListController",
                            controllerAs: 'vm'
                        })
                        .state('vod-list-series', {
                            url: '/vl/:menuId/:isSeriesCategory',
                            templateUrl: 'components/vod/vodlist.view.html',
                            controller: "VodListController",
                            controllerAs: 'vm'
                        })
//                        .state('vod-detail', {
//                            url: '/vd/:vodId/:type',
//                            templateUrl: 'components/vod/vod-detail.view.html',
//                            controller: "VodController",
//                            controllerAs: 'vm'
//                        })
                        .state('vod-series-detail', {
                            url: '/vsd/:vodId/:type/:seriesend/:selectedEpId',
                            templateUrl: 'components/vod/voddetail.view.html',
                            controller: "VodController",
                            controllerAs: 'vm'
                        })
                        .state('vod-detail', {
                            url: '/vd/:vodId',
                            templateUrl: 'components/vod/voddetail.view.html',
                            controller: "VodController",
                            controllerAs: 'vm'
                        })
                        .state('404', {
                            url: '/404',
                            templateUrl: 'shared/404.html'
                        })
                        .state('channel', {
                            // we'll add another state soon
                            url: '/channel/:id/:cate/:service_id/:catchup_id/:menu_id/:category',
//                            params: {
//                                id: null,
//                                cate: null,
//                                service_id: null,
//                                catchup_id: null
//                            },
                            templateUrl: 'components/channel/channel.view.html',
                            controller: 'ChannelController',
                            controllerAs: 'vm'
                        })
                        .state('npvr', {
                            // we'll add another state soon
                            url: '/npvr',
                            params: {
                                id: null,
                                cate: null,
                                service_id: null
                            },
                            templateUrl: 'components/npvr/npvr.view.html',
                            controller: 'NpvrController',
                            controllerAs: 'vm'
                        })
                        .state('search', {
                            // we'll add another state soon
                            url: '/search?search_str',
                            templateUrl: 'components/search/search.view.html',
                            controller: 'SearchController',
                            controllerAs: 'vm'
                        })
                        ;

//        $stateProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            }]);