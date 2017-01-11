
angular.module('vietteltvControllers').controller('MenuController', MenuController);
MenuController.$inject = ['$rootScope', '$state', '$scope', '$http', '$window', '$q', '$timeout', 'MenuService', 'SearchService', 'Constant'];
function MenuController($rootScope, $state, $scope, $http, $window, $q, $timeout, MenuService, SearchService, Constant) {
    var vm = this;
    vm.menuArray = [];
    vm.shortcutMenus = [];
    $rootScope.menuMap;
    vm.main = main;
    vm.getWebCategories = getWebCategories;
//    vm.gotoShortcutMenu = gotoShortcutMenu;
    vm.navigateParentMenu = navigateParentMenu;
    vm.navigateSubMenu = navigateSubMenu;
    vm.goToHomeIndex = goToHomeIndex;
    vm.gotoMenu = gotoMenu;
    main();
    function main() {

        if (window.matchMedia('(min-device-width: 1025px)').matches) {
            vm.isPC = true;

        } else {
            vm.isPC = false;
        }


        if ($.localStorage.get('menu') === null) {
            getWebCategories();
        } else {
            $rootScope.menuArray = $.localStorage.get('menu');
            vm.menuArray = $.localStorage.get('menu');
            angular.forEach(vm.menuArray, function (item, key) {
                if (item.this.name[0].text === Ulti.SHORTCUT_MENU_NAME) {
                    vm.shortcutMenus = vm.menuArray[key].children;
                }
            });
        }
        var temp2 = vm.shortcutMenus;
        var param = document.location.hash;
        if (temp2 !== null) {
            angular.forEach(temp2, function (item, index) {
               
                if (param === "" || param === "#/" || param === "index.html#/") {
                    vm.activedMenu = 0;
                    angular.break;
                } else if (param.indexOf(item.this.type) > -1) {
                    vm.activedMenu = index;
                    angular.break;
                } else if (param.indexOf(item.this.id) > -1) {
                    vm.activedMenu = index;
                    angular.break;
                }
            }
            );
        }


//        if (param === "#/" || param === "index.html#/") {
//            vm.activedMenu = 0;
//        }
//        if (param.indexOf("574267ad11d2a6d3b1f9cb85") > -1) {
//            vm.activedMenu = 1;
//        } else if (param.indexOf("574267d211d2a6d3b1f9cb88") > -1) {
//            vm.activedMenu = 2;
//        } else if (param.indexOf("574267ee11d2a6d3b1f9cb8b") > -1) {
//            vm.activedMenu = 3;
//        } else if (param.indexOf("channel") > -1) {
//            vm.activedMenu = 4;
//        }

    }
    function goToHomeIndex() {
//console.log('goToHomeIndex:');
//        $.localStorage.set('activedMenu', 0);
        vm.activedMenu = 0;
//        window.location.href = document.location.pathname;
        $state.go('home', {});

        // Ulti.closeSidebar();

        // disposeVideoPlayer();
    }
//    function goToMenu(index, menu) {
////        $.localStorage.set('activedMobiMenu', index);
//        vm.activedMobiMenu = index;
//        {
//            if (menu === 'home') {
//                window.location.href = document.location.pathname;
//                return;
//            } else if (menu === 'movie') {
//                window.location.href = document.location.pathname + "#/vp/1/56f9f0a211d2249b48e9d5c3";
//            } else if (menu === 'channel') {
////                console.log(document.location.pathname + "#/channel");
//                window.location.href = document.location.pathname + "#/channel";
//            } else if (menu === 'children') {
//                window.location.href = document.location.pathname + "#/vp/3/56f9f0ba11d2249b48e9d5c5";
//            } else if (menu === 'music') {
//                window.location.href = document.location.pathname + "#/vp/4/56f9f0d411d2249b48e9d5c7";
//            }
////            window.location.reload();
//        }
//    }

    function gotoMenu(menu, index) {
        vm.activedMenu = index;
        
        $('.menu-c1-li').removeClass('item-active');
        vm.activeLevel1MenuClass = "dropdown mega-dropdown menu-c1-li";
        $('#menu-c1-' + index).addClass('item-active');


        if (menu.this.type === 'channel') {
            window.location.href = document.location.pathname + "#/channel/////" + menu.this.id + '/';
        }else if (menu.this.path_id === '/about_menu' || menu.this.name[0].text.toUpperCase() === 'GIỚI THIỆU') {
//            window.location.href = document.location.pathname;
            window.location.href = window.location.href = Ulti.introLink;;
        }else if (menu.this.name[0].text.toUpperCase() === 'HOME' || menu.this.name[0].text.toUpperCase() === 'TRANG CHỦ') {
//            window.location.href = document.location.pathname;
            $state.go('home', {});

        } else {

            switch (menu.this.type) {
                case '__program_category':
//                    var categoryId = Ulti.getCategoryIdOfMenu(menu);
//                    console.log('switch (menu.this.type) ....... ' + categoryId);
                    if (Ulti.isSeriesCategory(menu)) {
                        window.location.href = document.location.pathname + "#/vl/" + menu.this.id + '/true';
                    } else {
                        window.location.href  = document.location.pathname + "#/vl/" + menu.this.id;

                        // $state.go('vod-list', {menuId:menu.this.id});
                    }
                    break;
                case '__menu':
                    window.location.href = document.location.pathname + "#/vp/" + index + "/" + menu.this.id;
                    break;
                default :
                    window.location.href = document.location.pathname + "#/vp/" + index + "/" + menu.this.id;
            }


        }

        Ulti.closeSidebar();

        disposeVideoPlayer();

    }

    function disposeVideoPlayer() {
        if ($('#VideoJSPlayer').length !== 0) {
            videojs('VideoJSPlayer').dispose();
        }

        if ($('#channelPlayer').length !== 0) {
            videojs('channelPlayer').dispose();
        }


    }


    function navigateParentMenu(index, menu) {
        if (index === 0) {
//            $.localStorage.set('activedMenu', index);
//            sessionStorage.activedMenu = index;
            vm.activedMenu = index;
            window.location.href = document.location.pathname;
            return;
        } else if (index < vm.menuArray.length - 2) { //1,2,3
//            $state.go('vod-package', {menuIndex: index, menuId: menu.this.id});
//            $state.go('vod-package',  {menuIndex: index, menuId: menu.this.id}, { reload: true });
            window.location.href = document.location.pathname + "#/vp/" + index + "/" + menu.this.id;
//            window.location.reload();
        } else if (index === vm.menuArray.length - 2) { //4
            window.location.href = document.location.pathname + "#/channel";
//            window.location.reload();
        } else if (index === vm.menuArray.length - 1) {//5
//            $state.go('channel');
        }
//set highline menu
//        $.localStorage.set('activedMenu', index);
        vm.activedMenu = index;
//        window.location.reload();
    }


    function getAppropriateMenu(menuArray, menuName) {

        if (menuArray) {

            angular.forEach(menuArray, function (menu1, key) {
                if (menu1.this.name[0].text === menuName && menu1.children.length > 0) {
                    vm.rightMenu = menu1;
                    angular.break;
                } else {
                    getAppropriateMenu(menu1.children, menuName);
                }

            });
        }
    }


    function navigateSubMenu(parentIndex, index, menu) {
        if (index === null) {//call children from null parent
            menu = menu.children;
            menu = menu[0];
            index = ($.localStorage.get(parentIndex + "_parent") !== null) ? $.localStorage.get(parentIndex + "_parent") : 0;
        }
        // console.log('navigateSubMenu : ................ ' + parentIndex);
        if (parentIndex === 0) {
//console.log('home .......... ');
            if (index < 1) {
//                $state.go('vod-list', {menuId: menu.this.id, vodCategoryId: menu.this.config[0].value});
                window.location.href = document.location.pathname + "#/vl/" + menu.this.id + "/" + menu.this.config[0].value;
//                window.location.reload();
            } else {
                vm.rightMenu = {};
                getAppropriateMenu($rootScope.menuArray, menu.this.name[0].text);
//                $state.go('vod-package', {menuIndex: index, menuId: vm.rightMenu.this.id});
                window.location.href = document.location.pathname + "#/vp/" + index + "/" + vm.rightMenu.this.id;
//                window.location.reload();
            }
        } else if (parentIndex === 1) {
//console.log('Cinema Box .......... ');
//            $state.go('vod-package', {menuIndex: index, menuId: menu.this.id});
            window.location.href = document.location.pathname + "#/vl/" + menu.this.id + "/" + menu.this.config[0].value;
//            window.location.reload();
        } else if (parentIndex < vm.menuArray.length - 2) {
//console.log('vodpackage .......... ');
//            $state.go('vod-package', {menuIndex: index, menuId: menu.this.id});
            window.location.href = document.location.pathname + "#/vp/" + index + "/" + menu.this.id;
//            window.location.reload();
        } else if (parentIndex === vm.menuArray.length - 2) {
//console.log('channel .......... ');
            $state.go('channel');
        } else if (parentIndex === vm.menuArray.length) {
//console.log('channel22 .......... ');
            $state.go('channel');
        }
        $.localStorage.set('activedMenu', parentIndex);
        $.localStorage.set($.localStorage.get('activedMenu') + "_parent", index);
        vm.activedMenu = parentIndex;
//        vm.activedSubMenu = index;
//        window.location.reload();

    }


    function getWebCategories() {
        MenuService.getWebCategories().get({},
                function success(response) {
                    var menuListLevel2 = [];
                    var menuListLevel3 = [];
                    var menuMap = {};

                    angular.forEach(response.data, function (item, key) {
                        if (item.type !== '__root') {
                        // console.log(item);        
//                            var isProBannerCat = false;
//                            var isSeriesCat = false;
//                            if(isNoPromotionBannerCategory(item.name[0].text)){
//                                isProBannerCat = true;
//                            }
//                            
                            if ((item.path_id.match(/\//g) || []).length === 1) {
                                var menuitem = {this: item, children: []};
//                                var menuitem = {this: item,isProBannerCat:isProBannerCat,children: []};
                                vm.menuArray.push(menuitem);

                                menuMap[item.id] = menuitem;
                            }

                            if ((item.path_id.match(/\//g) || []).length === 2) {

                                angular.forEach(vm.menuArray, function (menu1, key) {
//                                    console.log(item.path_id.indexOf(menu2.key.path_id + '/'));
                                    if (item.path_id.indexOf(menu1.this.path_id + '/') !== -1) {
                                        var menuitem = {this: item, children: []};
//                                        var menuitem = {this: item,isProBannerCat:isProBannerCat, children: []};
                                        menu1.children.push(menuitem);
                                        menuListLevel2.push(menuitem);

                                        menuMap[item.id] = menuitem;
                                    }
                                });
                            }

                            if ((item.path_id.match(/\//g) || []).length === 3) {
                                angular.forEach(menuListLevel2, function (menu2, key) {
                                    if (item.path_id.indexOf(menu2.this.path_id + '/') !== -1) {
                                        var menuitem = {this: item, children: []};
//                                        var menuitem = {this: item,isProBannerCat:isProBannerCat, children: []};
                                        menu2.children.push(menuitem);
                                        menuListLevel3.push(menuitem);

                                        menuMap[item.id] = menuitem;
                                    }
                                });
                            }

                            if ((item.path_id.match(/\//g) || []).length === 4) {
//                                console.log(' series....++++++++++++ ' +item.path_id );
                                angular.forEach(menuListLevel3, function (menu3, key) {
                                    if (item.path_id.indexOf(menu3.this.path_id + '/') !== -1) {
                                        var menuitem = {this: item, children: []};
//                                        var menuitem = {this: item,isProBannerCat:isProBannerCat, children: []};
                                        menu3.children.push(menuitem);

                                        menuMap[item.id] = menuitem;
                                    }
                                });
                            }

                        }

                    });

                    $rootScope.menuArray = vm.menuArray.slice(0, vm.menuArray.length - 1);
//                     angular.forEach(vm.menuArray, function (item, key) {
//                         if (item.this.name[0].text === Ulti.SHORTCUT_MENU_NAME) {
//                             vm.shortcutMenus = vm.menuArray[key].children;
// //                            console.log("vm.shortcutMenus:");
// //                            console.log(vm.shortcutMenus);
//                         }
//                     });
                    $.localStorage.set('menu', $rootScope.menuArray);
                    $.localStorage.set('menuMap', menuMap);
                },
                function error(response) {
                    console.log('Loi trong qua trinh goi service! Response = ' + response);
                }
        );
    }

    function isNoPromotionBannerCategory(menu) {
        var flag = false;
        if (menu.this.name[0].text) {
            angular.forEach(Ulti.NO_PROMOTION_CATEGORIES, function (value, key2) {
//console.log("isSeriesCategory ------------------");
                if (menu.this.name[0].text.toUpperCase() === value.toUpperCase()) {
//console.log(value);
                    flag = true;
                    angular.break;
                }


            });
            return flag;
        } else {
            return false;
        }
//        if (menu.this.config) {
//            angular.forEach(menu.this.config, function (config, key2) {
//                if (config.name === 'series') {
//                    return true;
//                }
//                return false;
//
//            });
//        } else {
//            return false;
//        }
    }

    vm.host = Constant.APIHost;
    vm.searchResult = [];
    $scope.data = vm;
    vm.foo = [{id: "11", name: "aaa"}, {id: "22", name: "bb"}, {id: "33", name: "cc"}];
    vm.foo.push({id: "11", name: "aaa"});
    vm.abc1 = "abc1";
//    for (var i = 0; i < 5; i++) {
//        vm.MostPopular.push(response.data[i]);
//        console.log(response.data[i]);
//    }
    vm.doSearchController = function (searchStr) {
        vm.searchResult = [];
        SearchService.getGenreSearch(searchStr, 10).get({},
                function success(response) {
                    vm.searchResult = response;
                },
                function error(response) {
                    vm.searchResult = [];
                }
        );
    };
}