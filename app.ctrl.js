angular.module('vietteltvControllers').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$http', '$q', '$scope', '$rootScope', '$timeout', '$uibModal', '$state', 'AccountService', 'Constant', '$confirm'];

function AppCtrl($http, $q, $scope, $rootScope, $timeout, $uibModal, $state, AccountService, Constant, $confirm) {
    appScope = $scope;
    var vm = this;
    vm.isLargeDevice = Ulti.isLargeDevice();
    vm.viewAll = 'Xem tất cả';
    vm.animationsEnabled = true;
    $rootScope.currentDialog = "";
    $rootScope.currentControler = "";

    function openRegisterDialog(size) {
        var uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/register/register.view.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
            size: size
        });

    }

    function openPairingDialog(size) {

        var uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/account/pairing.view.html',
            controller: 'PairingController',
            controllerAs: 'vm',
            scope: $scope,
            size: size,
            resolve: {
                app: function() {
                    return $scope;
                }
            }
        });

    }

    function openLoginDialog(size) {

        vm.uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/login/login.view.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            scope: $scope,
            size: size,
            resolve: {
                parent: function() {
                    $rootScope.currentDialog = "openLoginDialog";
                    console.log($rootScope);
                    //                    return $scope;
                }
            }
        });

        vm.uibModalInstance.closed.then(function() {
            console.log('Modal closed at: ' + new Date());
        });
        vm.uibModalInstance.rendered.then(function() {
            console.log('Modal rendered at: ' + new Date());
            current_Item_temp = current_Item;
            current_Item = $("form#loginForm input[name=phone]");
            current_Item.focus();
            console.log(current_Item);
            current_Item.addClass('item-hover');
            lastNavZone = navZone;
            navZone = "openLoginDialog";
        });
    }

    function closeLoginDialog() {

        vm.uibModalInstance.close();
        $rootScope.currentDialog = "";
    }

    function openChangePassDialog(type) {
        console.log("openChangePassDialogEvent type" + type);
        $scope.changeType = type;
        var uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/changePassword/changePassword.view.html',
            controller: 'ChangePasswordController',
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                changeType: function() {
                    $rootScope.currentDialog = "openChangePassDialog";
                    return $scope.changeType;
                }
            }
        });
    }

    function openAccountDialog(type) {
        console.log("openAccountDialog xxxxxxxxxx");
        $scope.typeDialog = type;
        var uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/dialog/accountDialog.view.html',
            controller: 'AccountDialogController',
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                typeDialog: function() {
                    return $scope.typeDialog;
                }
            }
        });
    }

    function openGeneralDialog(msg) {
        $scope.popupMessage = msg;
        // $rootScope.currentDialog = 'openGeneralDialog';

        var uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/dialog/dialog.view.html',
            controller: 'DialogController',
            controllerAs: 'vm',
            scope: $scope,
            resolve: {
                popupMessage: function() {
                    return $scope.popupMessage;
                }
            }
        });


        uibModalInstance.closed.then(function() {
            console.log('Modal General closed at: ' + new Date());
            current_Item = last_current_Item;
            navZone = lastNavZone;
        });
        uibModalInstance.rendered.then(function() {
            console.log('Modal General opened at: ' + new Date());
            last_current_Item = current_Item;
            console.log('close button: ------------- ' + $(".close-btn").size);
            current_Item = $(".close-btn");
            console.log(current_Item);
            current_Item.addClass('item-hover');
            console.log('gen dlg ++++ : ' + navZone);
            lastNavZone = navZone;
            navZone = "generalDialog";
        });
    }

    function requestAccessToken(event, args) {
        var storeObj = $.localStorage.get(args.loginId);
        if (storeObj) {
            AccountService.getRenewToken().$promise.then(
                function success(response) {
                    console.log("[success getRenewToken] " + JSON.stringify(response));
                    if (typeof response.access_token !== "undefined" && typeof response.expiration_date !== "undefined" && typeof response.refresh_token !== "undefined" && typeof response.refresh_token_expiration_date !== "undefined") {
                        storeObj.accountInfo.loginAccessToken = response.access_token;
                        storeObj.accountInfo.accessToken = response.access_token;
                        storeObj.accountInfo.refresh_token = response.refresh_token;
                        storeObj.accountInfo.expiration_date = response.expiration_date;
                        storeObj.accountInfo.refresh_token_expiration_date = response.refresh_token_expiration_date;
                        Config.loginAccessToken = response.access_token;
                        Config.accessToken = response.access_token;
                        Config.refresh_token = response.refresh_token;
                        Config.expiration_date = response.expiration_date;
                        Config.refresh_token_expiration_date = response.refresh_token_expiration_date;
                        $.localStorage.set($.localStorage.get('current_login_id'), storeObj);
                    } else {
                        console.log("Lỗi trong qua trình xác minh tài khoản");
                        logout();
                    }
                },
                function error(response) {
                    console.log("[error getRenewToken] " + JSON.stringify(response));
                    console.log("Lỗi trong qua trình xác minh tài khoản.");
                    logout();
                }
            );
        } else {
            $scope.$emit('openLoginDialogEvent');
        }
    }


    $scope.$on('onConfirmExits', function(event) {
        $rootScope.currentDialog = "confirmExits";
        $confirm({
                text: 'Bạn có chắc chắn muốn thoát ứng dụng Viettel TV?',
                title: 'Thoát dứng dụng',
                ok: 'Thoát',
                cancel: 'Không'
            })
            .then(function() {
                tizen.application.getCurrentApplication().exit();
            });

    });

    $scope.$on('dataLoadedEvent', function(event) {
        $timeout(function() {
            vm.isViewContentLoaded = true;
        }, 0);
    });

    $scope.$on("openPairingDialogEvent", function(event, args) {
        vm.openPairingDialog();
    });

    $scope.$on("openLoginDialogEvent", function(event, args) {
        vm.openLoginDialog();
    });

    $scope.$on("openGeneralDialogEvent", function(event, args) {
        vm.openGeneralDialog(args);
    });
    $scope.$on("openChangePassDialogEvent", function(event, args) {
        console.log("openChangePassDialogEvent");
        vm.openChangePassDialog(args);
    });
    $scope.$on("openAccountDialogEvent", function(event, args) {
        console.log("openAccountDialogEvent");
        vm.openAccountDialog(args);
    });
    $scope.$on("requestAccessTokenEvent", function(event, args) {
        requestAccessToken(event, args);

    });

    $scope.$on("afterLoginEvent", function(event, args) {
        console.log("afterLoginEvent");
        vm.isLogged = true;
        vm.userDisplayName = $.localStorage.get('current_login_id');
        Ulti.closeSidebar();
    });

    $scope.$on("afterPairingEvent", function(event, args) {
        $scope.isPaired = true;
    });
    $scope.$on("logoutEvent", function(event, args) {
        logout();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // console.log('hide --------------------------------- load');

    });


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // console.log('show --------------------------------- load');


    });

    function logout() {
        $.localStorage.remove('current_login_id');
        $.localStorage.remove('current_account_info');
        vm.isLogged = false;

        Ulti.closeSidebar();

        $state.reload();
    }

    function main() {

        //run config slider
        configSlider();

        //check login status        
        if ($.localStorage.get('current_login_id')) {
            vm.isLogged = true;
            vm.userDisplayName = $.localStorage.get('current_login_id');
            try {
                var storedObj = $.localStorage.get($.localStorage.get('current_login_id'));

                if (storedObj.accountInfo.accessToken) {
                    var expiredDateOfToken = new Date(storedObj.accountInfo.expiration_date);
                    var now = new Date();

                    if (expiredDateOfToken < now) {
                        console.log("token expired: -------------------------" + expiredDateOfToken);
                        var paramObj = {};
                        paramObj.loginId = $.localStorage.get('current_login_id');
                        requestAccessToken(null, paramObj);
                    } else {
                        console.log('token available: ++++++++++++++++++++++++' + expiredDateOfToken);
                    }

                }
            } catch (e) {
                console.log(e);
                Config.accessToken = Constant.guestToken;
                $timeout(function() {
                    //                    $scope.$emit('openPairingDialogEvent');
                }, 3000);
            }

        } else {
            vm.isLogged = false;
        }

        dialogListen($rootScope);

    }

    function openApp() {
        if (Ulti.isWindownPhoneDevice()) {
            //check whether or not installed ios App
            $("#app-mobile").hide();
        } else if (Ulti.isAndroidDevice()) {
            //            window.location = "intent://?ret=" +Ulti.serverApp + "?QueryStringParameter=#Intent;scheme=app.vietteltv.vn;package=com.alticast.viettelphone;S.browser_fallback_url="+Ulti.androidLink+";end";
            window.location.href = Ulti.androidOpenLink;
        } else if (Ulti.isIOSDevice()) {
            setTimeout(function() {
                window.location.href = Ulti.iosLink;
            }, 25);
            window.location.href = Ulti.iosOpenLink;
        } else if (Ulti.isIOSPadDevice()) {
            setTimeout(function() {
                window.location.href = Ulti.iosPadLink;
            }, 25);
            window.location.href = Ulti.iosPadOpenLink;
        } else {
            $("#app-mobile").hide();
        }
    }

    function browserToApp() {
        //            var installedAppCookie = $.localStorage.get(Ulti.installedAppCookie);
        console.log(navigator.userAgent);
        //        console.log(navigator.userAgent);
        var installedAppCookie = sessionStorage.installedAppCookie;
        if (installedAppCookie !== null && installedAppCookie) { // already choose
            $("#app-mobile").hide();
        } else { //not choose yet.
            if (Ulti.isPhoneDevice() && !Ulti.isWindownPhoneDevice()) {
                $("#app-mobile").show();
                var linkApp = $("a.xem-app");
                var storeApp = $("span#store");
                if (Ulti.isAndroidDevice()) {
                    storeApp.text("CH Play");
                } else if (Ulti.isIOSDevice() || Ulti.isIOSPadDevice()) {
                    storeApp.text("App Store");
                } else {
                    $("#app-mobile").hide();
                }
            }
        }

    }

    function autoLogin() {
        setTimeout(function() {
            console.log('autoLogin');
            if (!Ulti.islogedIn()) {
                AccountService.getClientIP().get({},
                    function success(response) {
                        console.log("getClientIP");
                        console.log(response);
                        //                            console.log("getClientIP"+response.ms_ip+"--" + JSON.stringify(response));                          
                        if (typeof response.ms_ip !== 'undefined') {
                            AccountService.automatic_detection(response.ms_ip).$promise.then(
                                function success(response) {
                                    $rootScope.is3G = true;
                                    console.log('success: automatic_detection');
                                    console.log(response);
                                    //                                            console.log("success : automatic_detection"+ "--" + JSON.stringify(response));
                                    var accestoken = response.access_token;

                                    Config.accessToken = response.access_token;
                                    Config.loginAccessToken = response.access_token;
                                    Config.refresh_token = response.refresh_token;
                                    Config.expiration_date = response.expiration_date;
                                    Config.refresh_token_expiration_date = response.refresh_token_expiration_date;
                                    var accInfo = {
                                        accountInfo: {
                                            accessToken: response.access_token,
                                            tokenSecret: response.token_secret,
                                            loginAccessToken: response.access_token,
                                            refresh_token: response.refresh_token,
                                            expiration_date: response.expiration_date,
                                            refresh_token_expiration_date: response.refresh_token_expiration_date
                                        }
                                    };
                                    // is 3G viettel and get info. 
                                    AccountService.getAutoLoginAccountInfo(accestoken).$promise.then(
                                        function success(response) {
                                            console.log('Success: getAutoLoginAccountInfo');
                                            console.log(response);
                                            //                                                        console.log("success: getAutoLoginAccountInfo" + JSON.stringify(accInfo));
                                            $.localStorage.set('current_login_id', response.id);
                                            $.localStorage.set(response.id, accInfo); //store current info login
                                            $.localStorage.set('current_account_info', response); //store current current_account_info
                                            Config.accessToken = accestoken; //
                                            vm.isLogged = true;
                                            vm.userDisplayName = $.localStorage.get('current_login_id');
                                            $scope.$emit('afterLoginEvent');
                                            //                                                        $uibModalInstance.close(vm.wizard);
                                            //                                                        $state.reload();
                                        },
                                        function error(response) {
                                            console.log('Error: getAutoLoginAccountInfo');
                                            console.log(response);
                                        }
                                    );
                                },
                                function error(response) {
                                    console.log('error: automatic_detection');
                                    console.log(response);
                                    //                                            console.log("error: automatic_detection" + JSON.stringify(response));
                                    $rootScope.is3G = false;
                                }
                            );
                        }
                    },
                    function error(response) {
                        console.log('error: getClient_IP');
                        console.log(response);
                        //                            console.log("error : getClientIP"+ "--" + response.toString());
                        $rootScope.is3G = false;
                    }
                ); //end get client IP
            } //end if
        }, 1000);
    }

    function configSlider() {
        $rootScope.Constant = Constant;
        $rootScope.menuArray = [];

        if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
            $rootScope.channeltv_slide = {
                method: {},
                slidesToShow: 13,
                infinite: true,
                slidesToScroll: 13,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 9,
                        slidesToScroll: 9
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }

                }]
            };

            //             $rootScope.one_line_slide = {
            //                 method: {},
            //                 infinite: true,
            //                 slidesToShow: 7,
            //                 slidesToScroll: 2,
            // //             centerMode: true,
            // //            variableWidth: true,
            // //            adaptiveHeight: true,
            //                 speed: 800,
            //                 lazyLoad: 'ondemand',
            //                 responsive: [
            //                     {
            //                         breakpoint: 1280,
            //                         settings: {
            //                             slidesToShow: 5,
            //                             slidesToScroll: 2,
            //                             lazyLoad: 'ondemand',
            //                             infinite: true,
            //                         }
            //                     },
            //                     {
            //                         breakpoint: 991,
            //                         settings: {
            //                             slidesToShow: 4,
            //                             slidesToScroll: 2,
            //                             lazyLoad: 'ondemand'
            //                         }
            //                     }]
            //             };
            $rootScope.slider_action_new = {
                method: {},
                slidesToShow: 8,
                slidesToScroll: 3,
                infinite: false,
                responsive: [{
                    breakpoint: 1441,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 3,
                        infinite: false,
                    }
                }, {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 3,
                        infinite: false
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        infinite: false
                    }
                }]
            };
            $rootScope.home_cinema_slide = {
                method: {},
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 2,
                adaptiveHeight: true,
                variableWidth: true,
                lazyLoad: 'ondemand',
                responsive: [{
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 2,
                        infinite: true,
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        variableWidth: true,
                    }
                }]
            };

            $rootScope.recommend_slide = {
                method: {},
                lazyLoad: 'ondemand',
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 2,
                variableWidth: true,
                //            autoplay: true,
                //            autoplaySpeed: 3000,
                speed: 1500,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        lazyLoad: 'ondemand',
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        infinite: true
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        lazyLoad: 'ondemand',
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        variableWidth: true
                    }
                }]
            };
            $rootScope.featured_event_slide = {
                method: {},
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 2,
                lazyLoad: 'ondemand',
                responsive: [{
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: false,
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                }]
            };

        }

        $rootScope.default_banner_top_slide = {
            method: {},
            arrows: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 3000
        };

        $rootScope.banner_top_slide = {
            method: {},
            arrows: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            asNavFor: '.vod-slider',
        };

        $rootScope.banner_nav = {
            method: {},
            infinite: true,
            arrows: false,
            centerMode: true,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 3000,
            focusOnSelect: true,
            asNavFor: '.Banner-top',
        };
        $rootScope.channel_event_slide = {
            method: {},
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 3,
            touchMove: false,
            responsive: [{
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }]
        };
        // $rootScope.channel_slide = {
        //     method: {},
        //     infinite: false,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     // speed: 1000,
        //     // fade:true,
        //     vertical: false

        // };
        $rootScope.time_change = {
            method: {},
            swipeToSlide: true,
            initialSlide: 5,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            focusOnSelect: true

        };


        $rootScope.fav_slide_slick = {
            method: {},
            infinite: false,
            slidesToShow: 10,
            slidesToScroll: 13,
            lazyLoad: 'ondemand',
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 9
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }

            }]
        };
    }

    vm.main = main;
    vm.openRegisterDialog = openRegisterDialog;
    vm.openLoginDialog = openLoginDialog;
    vm.openChangePassDialog = openChangePassDialog;
    vm.requestAccessToken = requestAccessToken;
    vm.logout = logout;
    vm.openGeneralDialog = openGeneralDialog;
    vm.openPairingDialog = openPairingDialog;
    vm.openAccountDialog = openAccountDialog;
    vm.openApp = openApp;
    vm.browserToApp = browserToApp;
    vm.autoLogin = autoLogin;
    vm.closeLoginDialog = closeLoginDialog;
    vm.configSlider = configSlider;
    vm.main();
}