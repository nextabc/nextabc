angular.module('vietteltvControllers').controller('HomeController', HomeController);
HomeController.$inject = ['$rootScope', '$scope', '$state', '$http', '$window', '$q', '$timeout', '$resource', 'HomeService', 'VodService', 'ChannelService', 'Constant', '$previousState', '$stateParams'];

function HomeController($rootScope, $scope, $state, $http, $window, $q, $timeout, $resource, HomeService, VodService, ChannelService, Constant, $previousState, $stateParams) {
    previousState = $previousState;
    parentPreviousState = $previousState;
    Ulti.currentPage = "home";
    $rootScope.currentControler = "home";
    active_menu_item_id = '57d3783a11d22789caf080dc';
    var vm = this;
    var righkey = 0;

    function main() {

        if ($rootScope.menuArray.length > 0) {
            processMenuAndVodList();
        } else {
            var menuArrayWatch = $scope.$watchCollection(
                "menuArray",
                function handleMenuArrayChange(newValue, oldValue) {
                    if ($rootScope.menuArray.length !== 0) {
                        processMenuAndVodList();

                        //remove $watch
                        menuArrayWatch();
                    }
                }
            );
        }

        // var menuArrayWatch = $scope.$watchCollection("menuArray", );
        // vm.loadChannelSlider(21);
    }

    function processMenuAndVodList() {
        vm.recommendVodList = [];
        vm.recommendVodListLoaded = false;
        vm.isAllDataLoaded = false;
        vm.noOfData = 0;
        vm.vodArrayLoaded = [];
        vm.vodArray = new Array($rootScope.menuArray[0].children.length);
        console.log($rootScope.menuArray);
        angular.forEach($rootScope.menuArray[0].children, function(menu2, key) {
            if (key === 0 && menu2.this.type === 'promotion') {
                righkey = 1;
                vm.vodArray.length = 0;
                vm.vodArray = new Array($rootScope.menuArray[0].children.length - 1);
                vm.probannerList = Ulti.getProBannerByCatName($rootScope.menuArray[0].this.name[0].text);
                vm.probannerListLoaded = true;
                return;
            }
            if (Ulti.isSeriesCategory(menu2)) {
                if (righkey === 1) {
                    processSeriesVODList(key - 1, menu2, Ulti.getVodCategoryId(menu2));
                } else {
                    processSeriesVODList(key, menu2, Ulti.getVodCategoryId(menu2));
                }
            } else {
                processVODList(menu2, key);
            }
        });
        // menuArrayWatch();
    }

    function processVODList(menu2, key) {
        VodService.getVodListByCategoryId(Ulti.getVodCategoryId(menu2)).get({}, function success(response) {
            var vodList = Ulti.prepareVodListResponse(response.data);
            // var vodList = response.data;
            console.log("vodList ---------------+++++++++++++++++++++++");
            console.log(vodList);

            if (righkey === 1) {
                processResponeVodRequest(key - 1, menu2, vodList);
            } else {
                processResponeVodRequest(key, menu2, vodList);
            }
        }, function error(response) {
            console.error('Loi trong qua trinh goi getVodListByCategoryId!');
            console.error(response);
            //                                        $state.reload();
            setTimeout(function() {
                console.info('Reload when Connection Reset By Peer ...............................! ');
                // $state.reload();
                processVODList(menu2, key);
            }, 200);
        });
    }

    vm.isLargeDevice = false;

    function processResponeVodRequest(key, menu2, vodList) {
        // if (key === 0) {
        //     if (Ulti.isLargeDevice()) {
        //         vm.isLargeDevice = true;
        //         processMasonryVodList(key, response.data, menu2);
        //     } else {
        //         var dataItem = {
        //             menu: menu2,
        //             contents: response.data,
        //             isDataLoaded: true,
        //             isSeriesCategory: false
        //         };
        //         vm.vodArray[key] = dataItem;
        //     }
        //     window.addEventListener("orientationchange", orientationChange, false);
        //     //
        // } else {
        //     var dataItem = {
        //         menu: menu2,
        //         contents: response.data,
        //         isDataLoaded: true,
        //         isSeriesCategory: false
        //     };
        //     vm.vodArray[key] = dataItem;
        // }
        var dataItem = {
            menu: menu2,
            contents: vodList,
            isDataLoaded: true,
            isSeriesCategory: false
        };
        vm.vodArray[key] = dataItem;
        vm.noOfData++;
        if (vm.noOfData === vm.vodArray.length) {
            vm.isAllDataLoaded = true;
        }
    }

    function processSeriesVODList(key, menu2, categoryId) {
        VodService.getSeriesVodList(categoryId, 10).get({}, function success(response) {
            angular.forEach(response.data, function(seriesVod, key) {
                seriesVod.seriesend = 0;
                angular.forEach(seriesVod.config, function(config, key) {
                    if (config.name === 'seriesend' && config.value === 'true') {
                        seriesVod.seriesend = 1;
                    }
                });
            });
            var dataItem = {
                menu: menu2,
                contents: response.data,
                isDataLoaded: true,
                isSeriesCategory: true
            };
            vm.vodArray[key] = dataItem;
            vm.noOfData++;
            if (vm.noOfData === vm.vodArray.length) {
                vm.isAllDataLoaded = true;
            }
        }, function error(response) {
            console.error('Loi trong qua trinh goi VodService.getSeriesVodList! Response = ');
            console.error(response);
            setTimeout(function() {
                console.info('Reload when Connection Reset By Peer ...............................! ');
                // $state.reload();
                processSeriesVODList(key, menu2, categoryId);
            }, 200);
        });
    }


    vm.channelListLoaded = false;
    vm.channelList = {};
    vm.isChannelHome = true;

    function loadChannelSlider(limit) {
        ChannelService.getChannelList(limit).get({}, function success(response) {
            vm.channelList = response.data;
            vm.channelListLoaded = true;
            //                    console.log(vm.channelList);
        }, function error(response) {
            console.log('Loi trong qua trinh goi loadChannelSlider! Response = ' + response);
        });
    }
    //
    function getPromotionList() {
        vm.promotionList = [];
        vm.promotionListLoaded = false;
        //        HomeService.getPromotionList().get({},
        //                function success(response) {
        //                    vm.promotionList = response.data;
        //                    vm.promotionListLoaded = true;
        //
        //                    vm.noOfData++;
        //                    if (vm.noOfData === 7) {
        //                        vm.isAllDataLoaded = true;
        //                    }
        //                },
        //                function error(response) {
        //                    //console.log('Loi trong qua trinh goi service! Response = ' + response);
        //                }
        //        );
    }

    function getTvChannelList() {
        vm.tvChannelList = [];
        vm.tvChannelListLoaded = false;
        //        HomeService.getPromotionList().get({},
        //                function success(response) {
        //                    vm.promotionList = response.data;
        //                    vm.promotionListLoaded = true;
        //
        //                    vm.noOfData++;
        //                    if (vm.noOfData === 7) {
        //                        vm.isAllDataLoaded = true;
        //                    }
        //                },
        //                function error(response) {
        //                    //console.log('Loi trong qua trinh goi service! Response = ' + response);
        //                }
        //        );
    }

    function gotoMenu(item) {
        var menu = item.menu;
        console.log('gotoMenu ....... ' + menu);
        console.log(menu);
        //        $.localStorage.set('activedMobiMenu', index);
        //        vm.activedMobiMenu = index;
        if (menu.this.type === 'channel') {
            window.location.href = document.location.pathname + "#/channel";
        } else if (menu.this.name[0].text.toUpperCase() === 'HOME') {
            window.location.href = document.location.pathname;
        } else {
            switch (menu.this.type) {
                case '__program_category':
                    // var categoryId = Ulti.getCategoryIdOfMenu(menu);
                    var menuId = Ulti.getHomeMenuCategory(item.menu.this.name[0].text);
                    if (menuId) {
                        window.location.href = document.location.pathname + "#/vp/0/" + menuId;
                        // navZone = "menu";
                        // lastNavZone = navZone;
                        // current_Item = $("[menu-id='" + menuId + "']");
                        // current_Item.addClass('item-hover');
                    } else {
                        if (item.isSeriesCategory) {
                            window.location.href = document.location.pathname + "#/vl/" + menu.this.id + "/" + item.isSeriesCategory;
                        } else {
                            window.location.href = document.location.pathname + "#/vl/" + menu.this.id;
                        }
                    }
                    break;
                case '__menu':
                    window.location.href = document.location.pathname + "#/vp/0/" + menu.this.id;
                    break;
                default:
                    window.location.href = document.location.pathname + "#/vp/0/" + menu.this.id;
            }
        }
    }
    vm.loadChannelSlider = loadChannelSlider;
    vm.getPromotionList = getPromotionList;
    vm.gotoMenu = gotoMenu;
    vm.main = main;
    main();
}