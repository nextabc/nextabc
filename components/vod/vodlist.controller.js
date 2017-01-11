angular.module('vietteltvControllers').controller('VodListController', VodListController);
VodListController.$inject = ['$rootScope', '$scope', '$stateParams', '$timeout', 'VodService', 'Constant', '$previousState'];

function VodListController($rootScope, $scope, $stateParams, $timeout, VodService, Constant, $previousState) {
    previousState = $previousState;
    Ulti.currentPage = "vodList";


    var vm = this;

    var menuId = $stateParams.menuId;
    var menuMap = $.localStorage.get('menuMap');
    var menu = menuMap[menuId];

    function main() {
        vm.isShortByRecent = true;
        getVodListByCategoryId();
        getPagePath();
    }

    function getPagePath() {
        if ($rootScope.menuArray.length > 0) {
            var selectedCategoryPath = processSelectedCategoryPath($rootScope.menuArray, menu);
            console.log(selectedCategoryPath);
        } else {
            var menuArrayWatch = $scope.$watchCollection(
                "menuArray",
                function handleMenuArrayChange(newValue, oldValue) {
                    if ($rootScope.menuArray.length !== 0) {
                        processSelectedCategoryPath($rootScope.menuArray, menu);
                        menuArrayWatch();
                    }
                }
            );
        }


    }

    function processSelectedCategoryPath(menuArray, menuCat) {
        vm.selectedCategoryPath = menuCat.this.name[0].text;
        return vm.selectedCategoryPath;
        // angular.forEach(menuArray, function(menu1, key) {
        //     if (menuCat.this.name[0].text === "Hay và mới" && menuCat.this.path_id.indexOf('WEB_HOME') > 0) {
        //         vm.selectedCategoryPath = "Home / Hay và mới";
        //         return vm.selectedCategoryPath;
        //     }

        //     // if (menu1.this.name[0].text === Ulti.SHORTCUT_MENU_NAME) {
        //     //     return;
        //     // }

        //     // if (menu1.this.name[0].text !== 'Index Menus') {

        //         if (menu1.this.name[0].text === catName) {
        //             vm.selectedCategoryPath = menu1.this.name[0].text;
        //             return vm.selectedCategoryPath;
        //         }
        //         angular.forEach(menu1.children, function(menu2, key) {
        //             if (menu2.this.name[0].text === catName) {
        //                 vm.selectedCategoryPath = menu1.this.name[0].text + ' / ' + menu2.this.name[0].text;
        //                 return vm.selectedCategoryPath;
        //             }
        //             angular.forEach(menu2.children, function(menu3, key) {
        //                 if (menu3.this.name[0].text === catName) {
        //                     vm.selectedCategoryPath = menu1.this.name[0].text + ' / ' + menu2.this.name[0].text + ' / ' + menu3.this.name[0].text;
        //                     return vm.selectedCategoryPath;
        //                 }

        //                 angular.forEach(menu3.children, function(menu4, key) {
        //                     if (menu4.this.name[0].text === catName) {
        //                         vm.selectedCategoryPath = menu1.this.name[0].text + ' / ' + menu2.this.name[0].text + ' / ' + menu3.this.name[0].text + '/' + menu4.this.name[0].text;
        //                         return vm.selectedCategoryPath;
        //                     }
        //                 });
        //             });
        //         });
        //     // }
        // });
    }

    vm.limitNo = 62;
    vm.offset = 0;
    vm.shortBy = '';
    vm.vodList = [];
    vm.vodArray = [];
    vm.constant = Constant;
    vm.isSeriesCategory = $stateParams.isSeriesCategory;

    function getVodListByCategoryId() {
        vm.isAllDataLoaded = false;
        var categoryId = Ulti.getCategoryIdOfMenu(menu);

        if (vm.isSeriesCategory) {
            processSeriesVODList(categoryId, vm.offset, vm.limitNo, vm.shortBy);
        } else {
            processVODList(categoryId, vm.offset, vm.limitNo, vm.shortBy);
        }
        $rootScope.currentControler = "vodList";
    }

    function processVODList(categoryId, offset, limitNo, shortBy) {
        VodService.getVodListByCategoryId(categoryId, offset, limitNo, shortBy).get({},
            function success(response) {
                vm.vodArray = [];
                vm.vodList = vm.vodList.concat(Ulti.prepareVodListResponse(response.data));
                // vm.vodList = Ulti.prepareVodListResponse(response.data);
                console.log('response.data aaaaaaaaaaaa : ');
                console.log(response.data);
                var tempArray = [];
                var vodArrayTemp = [];
                angular.forEach(vm.vodList, function(vod, key) {
                    // console.log("key: +++++ " + key);
                    tempArray.push(vod);
                    if ((key + 1) % 8 === 0) {
                        // console.log("key 888888888888: +++++ " + key);
                        vodArrayTemp.push(tempArray);
                        tempArray = [];
                    }
                    if ((key === (response.total - 1)) && tempArray.length > 0) {
                        vodArrayTemp.push(tempArray);
                    }
                });

                vm.vodArray = vodArrayTemp;
                vm.isAllDataLoaded = true;


            },
            function error(response) {
                console.log('Error occurs while getting getVodListByCategoryId .............');
                console.log(response);
                setTimeout(function() {
                    processVODList(categoryId, offset, limitNo, shortBy);
                }, 200);

            }
        );
    }

    function processSeriesVODList(categoryId, offset, limitNo, shortBy) {
        VodService.getSeriesVodList(categoryId, offset, limitNo, shortBy).get({},
            function success(response) {
                vm.vodList = vm.vodList.concat(response.data);
                console.log('vodlist aaaaaaaaaaaa : ');
                console.log(vm.vodList);
                var tempArray = [];
                var vodArrayTemp = [];
                angular.forEach(vm.vodList, function(vod, key) {
                    tempArray.push(vod);
                    if ((key + 1) % 8 === 0) { //chia vod vao 8 slider
                        vodArrayTemp.push(tempArray);
                        tempArray = [];
                    }

                    if ((key === (response.total - 1)) && tempArray.length > 0) {
                        vodArrayTemp.push(tempArray);
                    }
                });
                vm.vodArray = vodArrayTemp;
                vm.isAllDataLoaded = true;
            },
            function error(response) {
                console.log('Loi trong qua trinh goi VodService.getSeriesVodList! Response = ');
                console.log(response);
                setTimeout(function() {
                    processSeriesVODList(categoryId, offset, limitNo, shortBy);
                }, 200);
            }
        );
    }

    function loadMoreVodList() {
        //        vm.limitNo = vm.limitNo + 21;
        // $('.spinner').show();
        vm.offset = vm.limitNo + vm.offset;
        getVodListByCategoryId();

    }

    function shortByPopular() {
        vm.isShortByPopular = true;
        vm.isShortByRecent = false;
        vm.limitNo = 21;
        vm.offset = 0;
        vm.vodList = [];
        vm.shortBy = 'popular';
        getVodListByCategoryId();
    }

    function shortByRecent() {
        vm.isShortByRecent = true;
        vm.isShortByPopular = false;
        vm.limitNo = 21;
        vm.offset = 0;
        vm.vodList = [];
        vm.shortBy = 'recent';
        getVodListByCategoryId();
    }
    vm.shortByPopular = shortByPopular;
    vm.shortByRecent = shortByRecent;
    vm.loadMoreVodList = loadMoreVodList;
    vm.getVodListByCategoryId = getVodListByCategoryId;
    vm.main = main;

    main();


}