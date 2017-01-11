angular.module('vietteltvControllers').controller('VodController', VodController);
VodController.$inject = ['$compile', '$rootScope', '$scope', '$stateParams', '$http', '$window', '$q', '$state', '$resource', '$sce', '$controller', 'VodService', 'Constant', '$uibModal', 'AccountService', '$previousState'];

function VodController($compile, $rootScope, $scope, $stateParams, $http, $window, $q, $state, $resource, $sce, $controller, VodService, Constant, $uibModal, AccountService, $previousState) {
    previousState = $previousState;


    $rootScope.currentControler = "vod";
    Ulti.currentPage = "vod";
    var vm = this;
    vm.isAllDataLoaded = false;
    var vodId = $stateParams.vodId;
    vm.type = $stateParams.type;
    vm.selectedEpId = $stateParams.selectedEpId;
    vm.vod = {};
    vm.vodSrc = [];
    vm.vodJwSrc = [];
    vm.vodLocator = '';
    vm.isEncryptedContent = false;
    vm.isPurchased = false;
    vm.isPaidContent = false;
    vm.isSubscriptionVOD = false;
    vm.isSingleVOD = false;
    vm.isFreeNoPair = true;
    vm.productId = '';
    vm.finalSubPriceVND = 0;
    vm.finalSubPricePNT = 0;
    vm.finalSinglePriceVND = 0;
    vm.finalSinglePricePNT = 0;
    main();

    function main() {



        if (vm.type) {
            vm.seriesend = $stateParams.seriesend;
            getVODSeriesList();
        } else {
            getVODDetailInfo();
        }
    }

    function getRelatedVods(vod) {
        vm.relatedVodListLoaded = false;
        vm.relatedVodList = {};
        VodService.getRelatedVodIdList(vod.program.id).get({}, function success(response) {
            var programIds = '';
            if (response.dp.status !== 'NoScenarioResult') {
                angular.forEach(response.dp.itemList.items, function(vodItem, key) {
                    programIds = programIds + vodItem.basisInfo.basisList[0].value + ',';
                });
            } else {
                vm.relatedVodList = null;
                vm.isAllDataLoaded = true;
                return;
            }
            VodService.getVodByProgramIdList(programIds).get({}, function success(response) {
                vm.relatedVodList = response.data;
                vm.relatedVodListLoaded = true;
                vm.isAllDataLoaded = true;
            }, function error(response) {
                console.log('Loi trong qua trinh goi VodService.getVodByProgramIdList!');
                console.log(response);
                vm.isAllDataLoaded = true;
            });
        }, function error(response) {
            console.log('Loi trong qua trinh goi VodService.getRelatedVodIdList!');
            console.log(response);
            vm.isAllDataLoaded = true;
        });
    }

    function loadPlayer() {
        if (!Ulti.islogedIn()) {
            // $scope.$emit('openLoginDialogEvent');
            return;
        }
        VodService.getVodURL(vm.vod, vm.productId, vm.isFreeNoPair).get({}, function success(response) {
            console.log('getVodURL success ');
            var vodRequestId = response.gsdm.vod_request_id;
            vm.vodJwSrc.length = 0;
            vm.vodSrc.length = 0;
            if (response.gsdm.glb_addresses.length > 0) {
                for (i = 0; i < response.gsdm.glb_addresses.length; i++) {
                    var vodUrl = 'http://' + response.gsdm.glb_addresses[i] + '/' + vm.vodLocator + '?AdaptiveType=HLS&VOD_RequestID=' + vodRequestId;

                    vm.vodSrc.push({
                        type: "application/x-mpegURL",
                        src: vodUrl
                    });

                }
            }
            if (vm.isEncryptedContent) {
                //                        openPlayingDialog(loadVRWPlayer);
            } else {
                //                        loadHTMLPlayer();
                // openPlayingDialog(loadHTMLPlayer);
            }
        }, function error(response) {
            console.log('getVodURL error ');
            console.log(JSON.stringify(response));
            // //console.log('error occurs when get VOD url : '
            // + JSON.stringify(response.data.error.message + '
            // -- error code:' +
            // JSON.stringify(response.data.error.code)));
            if (response.data !== null && response.data.error.code === 'C0202') {
                // $scope.$emit('openLoginDialogEvent');
                var paramObj = {};
                paramObj.loginId = $.localStorage.get('current_login_id');
                paramObj.callback = vm.loadPlayer;
                $scope.$emit('requestAccessTokenEvent', paramObj);
            } else if (response.data !== null && response.data.error.code === 'U0228') {
                console.log('getVodURL error  meta information');
                // $("#vodPlayLink").hide();
                // announcement
                $scope.$emit('openGeneralDialogEvent', {
                    msg: Msg.vod_133
                });
            }
        });
    }

    function buyVOD(buyType) {
        AccountService.checkUserFlexi().get({}, // check if user is Flexi or Flexi+
            function success(response) {
                // console.log("checkUserFlexi -------------");
                // console.log(response);
                // var userLevel;
                if (response.product.name === 'FLEXI') {
                    vm.userLevel = 'FLEXI';
                } else {
                    vm.userLevel = 'FLEXI+';
                }
                AccountService.getPurchaseNow().get({}, function success(response) {
                    // console.log('111-------222');
                    // console.log(response);
                    var requestObj = {};
                    requestObj.entry_path = '';
                    requestObj.access_token = Config.accessToken;
                    requestObj.content_id = vm.vod.program.id;
                    requestObj.product_category = 'vod';
                    requestObj.client_id = Constant.clientId;
                    angular.forEach(vm.vod.product, function(product, key) {
                        if (buyType === 'single') {
                            if (product.type === 'single') {
                                // console.log('123334');
                                requestObj.product_id = product.id;
                                requestObj.product_name = product.name;
                                requestObj.product_type = 'single';
                            }
                        } else {
                            if (product.type === 'subscription') {
                                // console.log('123334');
                                requestObj.product_id = product.id;
                                requestObj.product_name = product.name;
                                requestObj.product_type = 'subscription';
                            }
                        }
                    });
                    requestObj.ts = response.time;
                    requestObj.nonce = generateNonce(6);
                    requestObj.hash = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(requestObj.client_id + requestObj.product_id + requestObj.ts + requestObj.nonce, Config.tokenSecret));
                    AccountService.getPurchaseObject(requestObj).$promise.then(function(response) {
                        var requestObj = {};
                        requestObj.entry_path = '';
                        requestObj.access_token = Config.accessToken;
                        if (vm.userLevel === 'FLEXI') {
                            if (buyType === 'single') {
                                requestObj.normal = vm.finalSinglePriceVND;
                            } else {
                                requestObj.normal = vm.finalSubPriceVND;
                            }
                        } else {
                            if (buyType === 'single') {
                                requestObj.normal = vm.finalSinglePricePNT;
                            } else {
                                requestObj.normal = vm.finalSubPricePNT;
                            }
                        }
                        requestObj.product_category = 'vod';
                        requestObj.product_name = vm.vod.program.title[0].text;
                        if (buyType === 'single') {
                            requestObj.product_type = 'single';
                        } else {
                            requestObj.product_type = 'subscription';
                        }
                        requestObj.product_id = response.product.id;
                        requestObj.purchase_id = response.id;
                        // console.log(response);
                        AccountService.executePaymentProcess(requestObj).$promise.then(function(response) {
                            // //console.log('executePaymentProcess
                            // successfully
                            // :
                            // ---------------');
                            // //console.log(response);
                            vm.getVODDetailInfo();
                            vm.uibModalInstance.close(vm.wizard);
                        }, function(response) {
                            // //console.log('error
                            // occurs
                            // when
                            // getPurchaseObject
                            // : '
                            // +
                            // JSON.stringify(response.data.error));
                        });
                    }, function(response) {
                        // //console.log('error
                        // occurs
                        // when
                        // getPurchaseObject
                        // : ' +
                        // JSON.stringify(response.data.error));
                    });
                }, function error(response) {
                    // //console.log('Loi trong qua
                    // trinh goi getPurchaseNow!
                    // Response = ' + response);
                })
            },
            function error(response) {
                // //console.log('Loi trong qua trinh goi
                // checkUserFlexi! Response = ' + response);
            })
    }
    vm.buySingleVOD = function() {
        vm.buyVOD('single');
    };
    vm.buySubscriptionVOD = function() {
        // console.log('buySubscriptionVOD');
        vm.buyVOD('subscription');
    };
    // handle purchasing wizzard
    vm.steps = ['one', 'two', 'three', 'four'];
    vm.step = 0;
    vm.wizard = {
        tacos: 2
    };
    vm.isFirstStep = function() {
        return vm.step === 0;
    };
    vm.isLastStep = function() {
        return vm.step === (vm.steps.length - 1);
    };
    vm.isCurrentStep = function(step) {
        return vm.step === step;
    };
    vm.setCurrentStep = function(step) {
        vm.step = step;
    };
    vm.getCurrentStep = function() {
        // console.log('current step .....' + vm.step)
        return vm.steps[vm.step];
    };
    vm.getNextLabel = function() {
        return (vm.isLastStep()) ? 'Submit' : 'Next';
    };
    vm.handlePrevious = function() {
        vm.step -= (vm.isFirstStep()) ? 0 : 1;
    };
    vm.handleNext = function() {
        if (vm.isLastStep()) {
            vm.uibModalInstance.close(vm.wizard);
        } else {
            vm.step += 1;
        }
    };
    var isLoadVideoJSPlayer = false;
    vm.uibModalInstance = {};
    vm.animationsEnabled = true;
    vm.limitPaidAmount = 10000;

    function openPurchasingDialog(size) {
        AccountService.checkPaidAmount().get({}, function success(response) {
            // console.log('response.limit:' + response.limit);
            if (response.limit <= (response.payment.total - response.payment.discount)) {
                vm.limitPaidAmount = response.limit;
                vm.setCurrentStep(0);
                // console.log('vm.limitPaidAmount:' +
                // vm.limitPaidAmount);
            } else {
                vm.setCurrentStep(1);
                // console.log('vm.getCurrentStep:' +
                // vm.getCurrentStep());
            }
            AccountService.checkUserFlexi().get({}, // check if user is Flexi or
                // Flexi+
                function success(response) {
                    // console.log("checkUserFlexi
                    // -------------");
                    // console.log(response);
                    // var userLevel;
                    if (response.product.name === 'FLEXI') {
                        vm.userLevel = 'FLEXI'
                    } else {
                        vm.userLevel = 'FLEXI+'
                    }
                    vm.uibModalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        templateUrl: 'components/vod/purchasing.popup.html',
                        controllerAs: 'vm',
                        scope: $scope,
                        size: size
                    });
                },
                function error(response) {
                    // //console.log('Loi trong qua
                    // trinh goi checkUserFlexi!
                    // Response = ' + response);
                })
        }, function error(response) {
            // //console.log('Loi trong qua trinh goi
            // executePaymentProcess! Response = ' +
            // response.data.error.message + ' - ' +
            // response.data.error.code);
            if (response.data.error.status === 401 && response.data.error.code === 'C0202') {
                $scope.$emit('openLoginDialogEvent');
            }
        });
    }

    function openPlayingDialog(callback) {
        vm.uibModalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'components/vod/playing.popup.html',
            controllerAs: 'vm',
            scope: $scope,
            // backdrop: 'static',
            // keyboard: false,
            size: 'lg'
        });
        vm.uibModalInstance.rendered.then(function() {
            $scope.$eval(callback());
        }, function() {});
    }

    function closeRegisterModal() {
        vm.uibModalInstance.close(vm.wizard);
    }

    function getVODDetailInfo() {
        VodService.getVodDetails(vodId).get({}, function success(response) {
            vm.vod = response;
            vm.vod = Ulti.prepareVod(response);
            console.log('vod detail ---------- : ');
            console.log(vm.vod);
            if (vm.vod.program.series) {
                vm.vod.program.series.episodeName = vm.vod.program.series.episode.replace(/^0+/, '');
                vm.type = 'series'; // is Series VOD
            }
            // vm.isAllDataLoaded = true;
            handleVODDetail(vm.vod);
            getRelatedVods(vm.vod); // get related vods
            // loadPlayer();
        }, function error(response) {
            try {
                console.log('error occurs when getVodDetails');
                console.log(JSON.stringify(response));
                if (response.data !== null && response.data.error.code === 'C0202') {
                    // Config.accessToken = Constant.guestToken;
                    // vm.getVODDetailInfo();
                    var paramObj = {};
                    paramObj.loginId = $.localStorage.get('current_login_id');
                    paramObj.callback = vm.getVODDetailInfo;
                    $scope.$emit('requestAccessTokenEvent', paramObj);
                } else {
                    // $state.reload();
                    setTimeout(function() {
                        console.log('Reload when Connection Reset By Peer ...............................! ');
                        $state.reload();
                    }, 100);
                }
            } catch (e) {
                console.log(e);
                var paramObj = {};
                paramObj.loginId = $.localStorage.get('current_login_id');
                paramObj.callback = vm.getVODDetailInfo;
                $scope.$emit('requestAccessTokenEvent', paramObj);
            }
            // $scope.$emit('openLoginDialogEvent');
        });
    }

    function getVODSeriesList() {
        if (vm.selectedEpId) {
            vodId = vm.selectedEpId;
            getVODDetailInfo();
            return;
        }
        VodService.getEpisodesByCategory(vodId, 1).get({}, function success(response) {
            vm.vod = response.data[0];
            console.log('vod detail ---------- : ');
            console.log(vm.vod);
            vm.vod.program.series.episodeName = vm.vod.program.series.episode.replace(/^0+/, '');
            handleVODDetail(vm.vod);
            getRelatedVods(vm.vod); // get related vods
            // loadPlayer();
        }, function error(response) {
            console.error('response error !!!!!');
            console.error(response);
            if (response.data.error) {
                setTimeout(function() {
                    getVODSeriesList();
                }, 100);

            } else {
                if (response.data.error.code === 'C0202') {
                    console.log('error occurs when getVodDetails : ' + JSON.stringify(response.data.error.message + '  -- error code:' + JSON.stringify(response.data.error.code)));
                    var paramObj = {};
                    paramObj.loginId = $.localStorage.get('current_login_id');
                    paramObj.callback = vm.getVODSeriesList;
                    $scope.$emit('requestAccessTokenEvent', paramObj);
                }
            }

            // $scope.$emit('openLoginDialogEvent');
        });
    }

    function handleVODDetail(vod) {
        // console.log("getVodDetails OK");
        angular.forEach(vod.product, function(product, key) {
            if (typeof product.purchase !== 'undefined') {
                vm.isPurchased = true;
            }
            if (product.type === 'subscription') {
                vm.isSubscriptionVOD = true;
                angular.forEach(product.price, function(price, key) {
                    if (price.currency === 'VND') {
                        vm.finalSubPriceVND = Math.ceil(price.value - product.discount_rate * price.value);
                    }
                    if (price.currency === 'PNT') {
                        vm.finalSubPricePNT = Math.ceil(price.value - product.discount_rate * price.value);
                    }
                });
            }
            if (product.type === 'single') {
                vm.isSingleVOD = true;
                vm.productId = product.id;
                angular.forEach(product.price, function(price, key) {
                    if (price.currency === 'VND') {
                        vm.finalSinglePriceVND = Math.ceil(price.value - product.discount_rate * price.value);
                    }
                    if (price.currency === 'PNT') {
                        vm.finalSinglePricePNT = Math.ceil(price.value - product.discount_rate * price.value);
                    }
                });
            }
            angular.forEach(product.locations, function(location, key) {
                if (location.device === 'handheld' && location.encryption === 'true') {
                    vm.isEncryptedContent = true;
                }
                if (product.type === 'single') {
                    vm.vodLocator = location.locator;
                }
                // console.log("test isFreeNoPair ------------------");
                // console.log(location.parameter);
                // console.log(location.encryption);
                angular.forEach(location.parameter, function(parameter, key) {
                    if (parameter.name === 'Audience' && parameter.value === 'private:All' && location.encryption === 'false') {
                        vm.isFreeNoPair = true;
                    }
                });
                // console.log("vm.isFreeNoPair:" + vm.isFreeNoPair);
            });
            angular.forEach(product.price, function(price, key) {
                if (price.value !== 0 && product.type === 'single') {
                    vm.isPaidContent = true;
                }
            });
        });
        if (vm.isPurchased === false && vm.isPaidContent === true) {
            // console.log('vm.isPurchased ------------- ' + vm.isPurchased);
            // console.log('vm.isPurchased ------------- ' + vm.isPaidContent);
            $('#paidPanel').css('visibility', 'visible');
        } else {
            // console.log('vm.isPurchased ------------- ' + vm.isPurchased);
            // console.log('vm.isPurchased ------------- ' + vm.isPaidContent);
            $('#paidPanel').css('visibility', 'hidden');
        }
        $rootScope.currentControler = "vod";
    }

    function selectEpisode(vod) {
        // vm.vod = vod;
        // window.location.href = window.location.href + "/" + vod.program.id;
        // window.location = document.location.pathname + "#vsd/" +
        // $stateParams.vodId + "/program/" + vod.program.id;//reset URL
        //
        // window.location.replace(document.location.pathname + "#vsd/" +
        // $stateParams.vodId + "/program/" + vod.program.id);
        // $window.location.href = document.location.pathname + "#vsd/" +
        // $stateParams.vodId + "/program/" +
        // vod.program.series.episode.replace(/^0+/, '') + "/" +
        // vod.program.id;//reset URL
        //
        $state.go('vod-series-detail', {
            vodId: $stateParams.vodId,
            type: 'program',
            seriesend: vod.program.series.episode.replace(/^0+/, ''),
            selectedEpId: vod.program.id
        });
        //

    }

    function openVodSeriesPopup() {
        var seriesSort = 'desc';
        if (vm.seriesend === 1) {
            seriesSort = 'asc';
        }
        console.info("openVodSeriesPopup .......... ");
        console.log(vm.seriesend);
        VodService.getEpisodesInSeries(vm.vod.program.series.id, seriesSort).get({}, function success(response) {
            vm.vodSeries = response.data;

            vm.uibModalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'components/vod/serieslist.popup.html',
                controllerAs: 'vm',
                size: 'series',
                scope: $scope
            });

            vm.uibModalInstance.rendered.then(function() {
                console.info('Modal rendered at: ' + new Date());
                last_current_Item = current_Item;
                if (vm.selectedEpId) {

                    if (vm.selectedEpId !== '' && vm.selectedEpId !== null) {
                        current_Item = $("#" + vm.selectedEpId);
                    } else {
                        console.log('1111:' + vm.selectedEpId);
                        current_Item = $('.eps-li:first');
                    }

                } else {
                    console.log('222:' + vm.selectedEpId);
                    current_Item = $('.eps-li:first');
                }

                console.log(current_Item);
                current_Item.addClass('item-hover');

                lastNavZone = "vod";
                navZone = "episodeSelectDialog";
            });
        }, function error(response) {});
    }

    function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
    }


    //
    function playVOD() {
        // console.log('playVOD : 11111111111111111111111111111111:' );
        if (!Ulti.islogedIn()) {
            $scope.$emit('openLoginDialogEvent');
            return;
        } else {
            VodService.getVodURL(vm.vod, vm.productId, vm.isFreeNoPair).get({}, function success(response) {
                console.log('getVodURL success ');
                var vodRequestId = response.gsdm.vod_request_id;
                vm.vodJwSrc.length = 0;
                vm.vodSrc.length = 0;
                if (response.gsdm.glb_addresses.length > 0) {
                    for (i = 0; i < response.gsdm.glb_addresses.length; i++) {
                        var vodUrl = 'http://' + response.gsdm.glb_addresses[i] + '/' + vm.vodLocator + '?AdaptiveType=HLS&VOD_RequestID=' + vodRequestId;

                        vm.vodSrc.push({
                            type: "application/x-mpegURL",
                            src: vodUrl
                        });

                    }
                }
                // console.log('playVOD : 222222222222222:' );
                if (vm.vodSrc[0]) {
                    player.playPause(vm.vodSrc[0].src);
                } else {
                    $scope.$emit('openGeneralDialogEvent', {
                        msg: Msg.vod_133
                    });
                    return;
                }

                player.toggleFullscreen();

                // webapis.avplay.setListener(listener);
                $('#playerPanel').show();
                navZone = "avPlay";
                lastContentNavZone = "vod";
            }, function error(response) {
                console.log('getVodURL error ');
                console.log(JSON.stringify(response));
                // //console.log('error occurs when get VOD url : '
                // + JSON.stringify(response.data.error.message + '
                // -- error code:' +
                // JSON.stringify(response.data.error.code)));
                if (response.data !== null && response.data.error.code === 'C0202') {
                    // $scope.$emit('openLoginDialogEvent');
                    var paramObj = {};
                    paramObj.loginId = $.localStorage.get('current_login_id');
                    paramObj.callback = vm.playVOD;
                    $scope.$emit('requestAccessTokenEvent', paramObj);
                } else if (response.data !== null && response.data.error.code === 'U0228') {
                    console.log('getVodURL error  meta information');
                    // $("#vodPlayLink").hide();
                    // announcement
                    $scope.$emit('openGeneralDialogEvent', {
                        msg: Msg.vod_133
                    });
                }
            });

        }

    }

    function closeEpsodeSelectDlg() {
        vm.uibModalInstance.close();
    }

    vm.playVOD = playVOD;
    vm.trustSrc = trustSrc;
    vm.openVodSeriesPopup = openVodSeriesPopup;
    vm.getVODSeriesList = getVODSeriesList;
    vm.handleVODDetail = handleVODDetail;
    vm.getVODDetailInfo = getVODDetailInfo;
    vm.selectEpisode = selectEpisode;
    vm.loadPlayer = loadPlayer;
    vm.buyVOD = buyVOD;
    vm.openPurchasingDialog = openPurchasingDialog;
    vm.closeRegisterModal = closeRegisterModal;
    vm.closeEpsodeSelectDlg = closeEpsodeSelectDlg;
    vm.main = main;
}