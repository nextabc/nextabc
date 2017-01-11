angular.module('vietteltvControllers').controller('VodCategoryController', VodCategoryController);
VodCategoryController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'VodService', 'Constant', '$previousState'];

function VodCategoryController($rootScope, $scope, $state, $stateParams, $timeout, VodService, Constant, $previousState) {
    previousState = $previousState;
    parentPreviousState = $previousState;
    Ulti.currentPage = "vodPackage";
    $rootScope.currentControler = "vodPackage";
    active_menu_item_id = $stateParams.menuId;

    var vm = this;
    vm.noOfData = 0;

    var righKey = 0;

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
    }

    function processResponeVodRequest(key, menu2, response) {
        // if (key === 0 && vm.catNoPromotion === false) {
        //     if ((window.matchMedia('(max-device-width: 1024px)').matches && window.matchMedia('(min-width: 992px)').matches) || window.matchMedia('(min-width: 1025px)').matches) {
        //         processMasonryVodList(key, response.data, menu2);
        //     } else {

        //         var dataItem = {
        //             id: key,
        //             menu: menu2,
        //             contents: Ulti.prepareVodListResponse(response.data),
        //             isDataLoaded: true
        //         };
        //         vm.vodArray[key] = dataItem;

        //     }
        //     window.addEventListener("orientationchange", orientationChange, false);

        // } else {
        //     var dataItem = {
        //         id: key,
        //         menu: menu2,
        //         contents: Ulti.prepareVodListResponse(response.data),
        //         isDataLoaded: true
        //     };
        //     vm.vodArray[key] = dataItem;
        // }

        var dataItem = {
            id: key,
            menu: menu2,
            contents: Ulti.prepareVodListResponse(response.data),
            isDataLoaded: true
        };
        vm.vodArray[key] = dataItem;
        vm.noOfData++;

        if (vm.noOfData === vm.vodArray.length) {
            vm.isAllDataLoaded = true;

            // console.log(vm.vodArray);
        }
    }

    function processMasonryVodList(key, vodList, menu2) {
        var index = 0;
        var indexSlider = 0;
        var vodItem = {};
        var vodItemArray = [];
        var randomIndex = 2;
        angular.forEach(vodList, function(value, key2) {
            index++;
            vodItem = {};

            vodItem.product = value.product;
            vodItem.program = value.program;

            vodItemArray.push(vodItem);
            //            if (index % 2 == 0 && indexSlider < randomIndex) {
            if (index % 2 == 0) {
                vm.recommendVodList.push(vodItemArray);
                vodItemArray = [];
                indexSlider++;
                return 0;
            }

        });

        var dataItem = {
            id: key,
            menu: menu2,
            contents: vm.recommendVodList,
            isDataLoaded: true,
            isRecommend: true
        };
        vm.vodArray[key] = dataItem;
    }



    function processMenuAndVodList() {
        vm.recommendVodList = [];
        vm.recommendVodListLoaded = false;
        vm.isAllDataLoaded = false;
        vm.noOfData = 0;
        vm.vodArrayLoaded = [];


        var menuId = $stateParams.menuId;
        vm.selectedMenu = {};
        getSelectedMenu($rootScope.menuArray, menuId); //ignore non-vod menu

        vm.vodArray = new Array(vm.selectedMenu.children.length);
        vm.catNoPromotion = false;
        angular.forEach(vm.selectedMenu.children, function(menu2, key) {
            // console.log(' key ........................................  ' + key);
            var trueKey = 0;
            if (key === 0 && menu2.this.type === 'promotion') {
                righKey = 1;
                vm.vodArray = new Array(vm.selectedMenu.children.length - 1);
                vm.probannerList = Ulti.getProBannerByCatName(vm.selectedMenu.this.name[0].text);

                return;
            } else if (key === 0 && menu2.this.type !== 'promotion') {
                vm.catNoPromotion = true;
            }

            if (righKey === 1) {
                trueKey = key - 1;
            } else {
                trueKey = key;
            }

            var categoryId = Ulti.getCategoryIdOfMenu(menu2);

            if (categoryId === '') {
                vm.noOfData++;
                return;
            }

            if (Ulti.isSeriesCategory(menu2)) {
                processSeriesVODList(trueKey, menu2, categoryId);
            } else {
                processVODList(menu2, categoryId, trueKey);
            }
        });
        $rootScope.currentControler = "vodCategory";

    }

    /**
     * @function processVODList 
     * @description get single vod list by category
     * @param {any} menu2
     * @param {any} categoryId
     * @param {any} trueKey
     */
    function processVODList(menu2, categoryId, trueKey) {
        VodService.getVodListByCategoryId(categoryId).get({},
            function success(response) {
                response.data = Ulti.prepareVodListResponse(response.data);
                processResponeVodRequest(trueKey, menu2, response);
            },
            function error(response) {
                console.log('Error occurs while getting vod list .............');
                console.log(response + ' -- ' + trueKey);

                setTimeout(function() {
                    console.log('Reload when Connection Reset By Peer ...............................! ');
                    processVODList(menu2, categoryId, trueKey);
                }, 100);

            }
        );
    }

    function processSeriesVODList(key, menu2, categoryId) {
        VodService.getSeriesVodList(categoryId, 14).get({},
            function success(response) {
                angular.forEach(response.data, function(seriesVod, key) {
                    seriesVod.seriesend = 0;
                    angular.forEach(seriesVod.config, function(config, key) {
                        if (config.name === 'seriesend' && config.value === 'true') {
                            seriesVod.seriesend = 1;
                        }
                    });
                });

                var dataItem = {
                    id: key,
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

            },
            function error(response) {
                console.log('Loi trong qua trinh goi VodService.getSeriesVodList! Response = ');
                console.log(response);
                setTimeout(function() {
                    console.log('Reload when Connection Reset By Peer ...............................! ');
                    // $state.reload();
                    processSeriesVODList(key, menu2, categoryId);
                }, 100);
            }
        );
    }

    function getSelectedMenu(menuArray, menuId, selectedMenu) {

        if (menuArray) {

            angular.forEach(menuArray, function(menu1, key) {
                if (menu1.this.id === menuId) {
                    vm.selectedMenu = menu1;
                    angular.break;
                } else {
                    getSelectedMenu(menu1.children, menuId);
                }

            });
        }
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


    function gotoMenu(item) {
        var menu = item.menu;
        //        $.localStorage.set('activedMobiMenu', index);
        //        vm.activedMobiMenu = index;
        if (menu.this.type === 'channel') {
            window.location.href = document.location.pathname + "#/channel";
        } else if (menu.this.name[0].text.toUpperCase() === 'HOME') {
            window.location.href = document.location.pathname;
        } else {

            switch (menu.this.type) {
                case '__program_category':
                    //                    var categoryId = Ulti.getCategoryIdOfMenu(menu);
                    if (item.isSeriesCategory) {
                        window.location.href = document.location.pathname + "#/vl/" + menu.this.id + "/" + item.isSeriesCategory;
                    } else {
                        window.location.href = document.location.pathname + "#/vl/" + menu.this.id;
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


    vm.gotoMenu = gotoMenu;
    vm.getPromotionList = getPromotionList;
    vm.main = main;

    main();


}