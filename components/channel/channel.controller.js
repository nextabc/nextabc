/* global Ulti */
angular.module('vietteltvControllers').controller('ChannelController', ChannelController);
ChannelController.$inject = ['$compile', '$rootScope', '$state', '$scope', '$stateParams', '$http', '$window', '$q', '$timeout', '$resource', 'ChannelService', 'AccountService', 'Constant', '$previousState'];

function ChannelController($compile, $rootScope, $state, $scope, $stateParams, $http, $window, $q, $timeout, $resource, ChannelService, AccountService, Constant, $previousState) {
    previousState = $previousState
    var vm = this;
    vm.isAllDataLoaded = false;
    Ulti.currentPage = "channel";
    $rootScope.currentControler = "channel";
    active_menu_item_id = $stateParams.menu_id;
    vm.service_id = $stateParams.service_id;
    vm.selectedChannel = $stateParams.id;
    if (vm.selectedChannel === "") {
        if ($.localStorage.get(Constant.currentChannel) !== null) {
            var temp = $.localStorage.get(Constant.currentChannel);
            vm.selectedChannel = temp[0];
            vm.service_id = temp[1];
        } else {
            vm.selectedChannel = Constant.channelDefault;
            vm.service_id = Constant.channelIdDefault;
        }
    }
    vm.allChannelList;
    vm.genres = Ulti.genres;
    vm.host = Constant.APIHost;
    vm.selectedDate;
    vm.catchup_id = $stateParams.catchup_id;
    vm.playerLable = "";
    vm.current_login_id;
    vm.storeObj;
    var i_data = 0;
    ChannelService.getChannelList(500).get({}, function success(response) {
        vm.allChannelList = response.data;
        i_data++;
        if (i_data === 4) vm.isAllDataLoaded = true;
    }, function error(response) {
        //console.log('Loi trong qua trinh goi service! Response = ' + response);
    });

    function getChannelById(id) {
        var result = null;
        angular.forEach(vm.allChannelList, function(value, key) {
            if (value.channel.id === id) {
                result = value;
                angular.break;
            }
        });
        return result;
    }
    vm.channelListLoaded = false;
    vm.channelList = {};

    function loadChannelSlider(limit) {
        ChannelService.getChannelList(limit).get({}, function success(response) {
            vm.channelList = response.data;
            vm.channelListLoaded = true;
            i_data++;
            if (i_data === 4) vm.isAllDataLoaded = true;
        }, function error(response) {
            //console.log('Loi trong qua trinh goi service! Response = ' + response);
        });
    }
    vm.channelBottomList = [];
    // default page
    vm.channelBottomPage = {
        cate: "",
        limit: 21
    };

    vm.changeChannelCategory = function (category,index) {
        window.location.href = document.location.pathname + "#/channel/////" + $stateParams.menu_id + '/'+category;
        // vm.channelBottomPage.cate = category;
        // vm.cateBottom = index;
       // $state.reload();
    };

    vm.i_count = 0;
    vm.current_count = 0;
    vm.possible_loadmore = true;
    vm.cateBottom = ""; //defult selected category
    vm.channelList = {};
    vm.getChannelBottomList = function(category, index) {
        vm.channelBottomPage.limit = 48;
        if (index === undefined) index = 0;
        vm.cateBottom = index;
        vm.channelBottomPage.cate = category;
        vm.channelBottomList = [];
        ChannelService.getChannelList(500).get({}, function success(response) {
            var data = response.data;
            vm.channelList = data;
            vm.filterChannelCategory(vm.channelBottomPage.cate, vm.channelBottomPage.limit);
            console.log("-----Get channel List 222 -----");
            console.log(response);
            i_data++;
            if (i_data === 4) vm.isAllDataLoaded = true;
            vm.isAllDataLoaded = true;
        }, function error(response) {
            //console.log('Loi trong qua trinh goi service! Response = ' + response);
            setTimeout(function() {
                console.log('Reload when Connection Reset By Peer ...............................! ');
                $state.reload();
            }, 100);
        });
    };
    vm.loadMoreChannelBottom = function() {
        vm.channelBottomPage.limit = vm.channelBottomPage.limit + vm.channelBottomPage.limit;
        vm.filterChannelCategory(vm.channelBottomPage.cate, vm.channelBottomPage.limit);
    };

    vm.filterChannelCategory = function(category, limit) {
         console.log("--------------------vm.channelList " + vm.channelList.length);
        if (vm.channelList.length > 0) {
            // console.log("--------------------vm.channelBottomList " + vm.channelList.length);
            vm.channelBottomList = [];
            var temp = [];
            var item = [];
            var channel_array = [];
            var genres;
            var inno = 0;
            angular.forEach(vm.channelList, function(value, key) {
                genres = value.channel.genres[0].split(":");
                genres = genres[0] + ":" + genres[1];
                //                console.log(genres);
                if (category === "" || genres === category) {
                    item.channelid = value.channel.id;
                    item.channelname = value.channel.name[0].text;
                    item.genre = genres;
                    item.service_id = value.service_id;
                    temp.push(item);
                    item = [];
                    
                    console.log('key ........' + key);
                    if ((inno + 1) % 48 === 0) {
                        console.log('aaaaaaaaaaaa ........');
                        channel_array.push(temp);
                        temp = [];
                    }
                    inno++;
                }
            });
            channel_array.push(temp);
            vm.channelBottomList = channel_array;
            console.log(vm.channelBottomList);
        }
    };

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].channelid === obj.channelid) {
                return true;
            }
        }
        return false;
    }

    function playChannelStream(channelId, service_id) {
        vm.selectedChannel = channelId;
        vm.service_id = service_id;
        if (vm.selectedChannel !== null && vm.service_id === null) {
            var channelobj = vm.getChannelById(vm.selectedChannel);
            if (channelobj !== null) {
                vm.service_id = channelobj.service_id;
            }
        }
        //console.log("vm.selectedChannel");
        //console.log(vm.selectedChannel);
        //console.log(vm.service_id);
        vm.playerLable = "Trực tiếp";
        var current_login_id = $.localStorage.get('current_login_id');
        var storeInfo = $.localStorage.get('current_account_info');
        if (storeInfo === null || typeof(storeInfo.so_id) === 'undefined') {
            storeInfo = {};
            storeInfo.so_id = "GUEST";
        }
        //var storeObj = $.localStorage.get(current_login_id);
        var param = {
            version: 1,
            regionId: storeInfo.so_id,
            assetId: vm.service_id,
            filename: vm.service_id + ".m3u8",
            clientIP: Ulti.getClientIp(),
            manifestType: "HLS",
            userId: current_login_id
        };
        ChannelService.getPrepareChannel(param).$promise.then(function success(response) {
            if (typeof(response.glbAddress) !== 'undefined' && response.glbAddress.length > 0) {
                var poster = Constant.APIHost + "/api1/contents/pictures/" + vm.selectedChannel + "?width=72.000000&height=26.000000";
                var src = [];
                var abc = 0;
                if (response.glbAddress.length > 0) {
                    for (var i = 0; i < response.glbAddress.length; i++) {
                        var stream = 'http://' + response.glbAddress[i] + '/' + vm.service_id + ".m3u8" + '?AdaptiveType=HLS&VOD_RequestID=' + response.requestId;
                        //                                    var stream = 'http://' + response.glbAddress[i] + '/' + vm.service_id + ".m3u8";
                        console.log('stream url: ' + i + "" + stream);
                        src.push({
                            type: "application/x-mpegURL",
                            src: stream
                        });
                    }
                    player.playPause(src[0].src);
                    player.toggleFullscreen();
                    $('#playerPanel').show();
                    lastContentNavZone = 'channel';
                    navZone = "avPlay";
                }
            }
        }, function error(response) {
            //console.log('Loi trong qua trinh goi service! Response = ' + response);
        });
    }
    //    play channel
    vm.getChannelChange = function(id, service_id) {
        vm.selectedChannel = id;
        vm.service_id = service_id;
        //load channel guide
        playChannelStream(vm.selectedChannel, vm.service_id);
        // //croll to channel play
        // $('html, body').animate({
        //     scrollTop: 0
        // }, 1000);
    };
    vm.rangeGuide = [];

    function loadRangeGuide() {
        vm.rangeGuide = [];
        var now = new Date();
        var weekday = new Array('CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7');
        var daysAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000) * 7);
        for (var i = 0; i < 10; i++) {
            var item = {};
            var dayitem = new Date(daysAgo.getTime() + (24 * 60 * 60 * 1000) * i);
            item.dayOfW = weekday[dayitem.getDay()];
            item.date = dayitem;
            item.datetext = dayitem.getDate() + "/" + (dayitem.getMonth() + 1);
            item.dateConpare = dayitem.getDate() + "-" + (dayitem.getMonth() + 1) + "-" + dayitem.getFullYear();
            if (i === 7) {
                item.isToday = true;
            }
            vm.rangeGuide.push(item);
        }
    };

    function main() {
        //console.log("----------------- start ---------------------------");
        vm.current_login_id = $.localStorage.get('current_login_id');
        vm.storeObj = $.localStorage.get(vm.current_login_id);
        vm.channelBottomPage.cate = $stateParams.category;
        vm.getChannelBottomList(vm.channelBottomPage.cate);
        //load channel default
        // vm.getChannelChange(vm.selectedChannel, vm.service_id);
        vm.loadChannelSlider(21);
        //        vm.loadCatchUpByUrl();
        vm.loadRangeGuide();
    }
    vm.main = main;
    vm.getChannelById = getChannelById;
    //    vm.loadCatchUpByUrl = loadCatchUpByUrl;
    vm.loadChannelSlider = loadChannelSlider;
    vm.loadRangeGuide = loadRangeGuide;
    vm.getChannelChange = vm.getChannelChange;
    main();
}