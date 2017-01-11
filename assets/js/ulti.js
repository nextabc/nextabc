// console.log('bbbbbbbbbbb');
var Ulti = {
    SERIES_CATEGORIES: [
        'PHIM BỘ', 'PHIM BỘ MIỄN PHÍ', 'KHU VƯỜN PHIM BỘ', 'Tiếng Anh lớp 6', 'Luyện Thi Toeic', 'YanTV', 'TV Show', 'Toán lớp 6', 'Tiếng Việt lớp 6', 'Toán lớp 10', 'Ngữ văn lớp 10', 'Tiếng Anh lớp 10', 'Toán THPTQG', 'Lý THPTQG', 'Hóa THPTQG', 'Giáo dục'
    ],
    NO_PROMOTION_CATEGORIES: [
        'GIÁO DỤC', 'Hài – Dân gian', 'Phong cách sống', 'Khám phá', 'Clip', 'TVSHOW'
    ],
    HOME_MENU_CATEGORIES: [
        { name: 'PHIM', id: '57d37bcf11d22789caf080ff' },
        { name: 'THIẾU NHI', id: '57d37f4911d22789caf08130' },
        { name: 'NHẠC', id: '57d37ee211d22789caf08127' },
        { name: 'GIÁO DỤC', id: '57d3834711d22789caf0819e' }
    ],
    // SHORTCUT_MENU_NAME: 'Index Menus',
    SHORTCUT_MENU_NAME: 'Trang chủ',
    PROMOTION_CAT_LIST: [{
            category: 'TRANG CHỦ',
            promotion: [{ img: 'assets/img/banner/banner6.jpg', vodId: '5731ab4b718c03ef5c40c651' },
                { img: 'assets/img/banner/banner2.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner3.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner4.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner5.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner1.jpg', vodId: '57354e18718c03ef5c412a29' }
            ]
        },
        {
            category: 'PHIM',
            promotion: [{ img: 'assets/img/banner/banner1.jpg', vodId: '5731ab4b718c03ef5c40c651' },
                { img: 'assets/img/banner/banner2.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner3.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner4.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner5.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner6.jpg', vodId: '57354e18718c03ef5c412a29' }
            ]
        },
        {
            category: 'THIẾU NHI',
            promotion: [{ img: 'assets/img/banner/banner1.jpg', vodId: '55efec73718c848f30f276f4' },
                { img: 'assets/img/banner/banner2.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner3.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner4.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner5.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner6.jpg', vodId: '57354e18718c03ef5c412a29' }
            ]
        },
        {
            category: 'NHẠC',
            promotion: [{ img: 'assets/img/banner/banner1.jpg', vodId: '56b418ed718ce8ed3fb1eae2' },
                { img: 'assets/img/banner/banner2.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner3.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner4.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner5.jpg', vodId: '556c622a718c0e0711f1dfa7' },
                { img: 'assets/img/banner/banner6.jpg', vodId: '57354e18718c03ef5c412a29' }
            ]
        },
    ],
    genres: {
        'TẤT CẢ': '',
        'TIN TỨC': '1:1',
        'PHIM': '1:2',
        'THỂ THAO': '1:3',
        'GẢI TRÍ': '1:4',
        'GIỚI TRẺ': '1:5',
        'KÊNH TỈNH': '1:6',
        'KHÁM PHÁ': '1:7'
            //        'KPLUS': '1:8'
    },
    getClientIp: function() {
        return "220.231.127.1";
    },
    newPassword: "123456",
    selectedGuideDate: new Date(),
    currentUrl: document.location.hash,
    getCatchupId: function(start_time, serviceId, pid) {
        var yyyy = start_time.getFullYear();
        var mm = start_time.getMonth() < 9 ? "0" + (start_time.getMonth() + 1) : (start_time.getMonth() + 1); // getMonth() is zero-based
        var dd = start_time.getDate() < 10 ? "0" + start_time.getDate() : start_time.getDate();
        var hh = start_time.getHours() < 10 ? "0" + start_time.getHours() : start_time.getHours();
        var min = start_time.getMinutes() < 10 ? "0" + start_time.getMinutes() : start_time.getMinutes();
        var ss = start_time.getSeconds() < 10 ? "0" + start_time.getSeconds() : start_time.getSeconds();
        var str = "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);

        return str + "_" + serviceId + "_" + pid;
    },
    strToTime: function(str) {
        var time_temp = str.split(":");
        var time = new Date();
        time.setYear(time_temp[0].substr(0, 4));
        time.setMonth(time_temp[0].substr(5, 2) - 1);
        time.setDate(time_temp[0].substr(8, 2));
        time.setHours(time_temp[0].substr(11, 2));
        time.setMinutes(time_temp[1]);
        time.setSeconds(time_temp[2].substr(0, 2));
        return time;
    },
    islogedIn: function() {
        if ($.localStorage.get('current_login_id') !== null) {
            return true;
        } else {
            return false;
        }
    },
    isPaired: function() {
        var current_login_id = $.localStorage.get('current_login_id');
        var storeObj = $.localStorage.get(current_login_id);
        if (storeObj !== null && storeObj.accountInfo !== null && storeObj.accountInfo.isPaired) {
            return true;
        } else {
            return false;
        }
    },
    getCurrentAcc: function() {
        var current_login_id = $.localStorage.get('current_login_id');
        var storeObj = $.localStorage.get(current_login_id);
        if (storeObj !== null && storeObj.accountInfo !== null) {
            return storeObj;
        } else {
            return null;
        }
    },
    goAndRefreshState: function(url) {
        console.log(url);
        window.location.href = url;
        window.location.reload();
    },
    isPhoneDevice: function() {
        if (/Android|webOS|iPhone|iPad|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
            //        if (jQuery.browser.mobile) {
            return true;
        } else {
            return false;
        }
    },
    isAndroidDevice: function() {
        if (/android/i.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    isIOSDevice: function() {
        if (/iphone/i.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    isIOSPadDevice: function() {
        if (/ipad/i.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    isWindownPhoneDevice: function() {
        if (/windows phone/i.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    isLargeDevice: function() {
        if (window.matchMedia('(min-width: 1025px)').matches) {
            return true;
        } else {
            return false;
        }
    },
    listModel: ["iphone", "ipad", "android", "PC_WINDOWS", "windows phone", "WINDOW_PAD", "PC_MAC"],
    listModel2: ["IOS_PHONE", "IOS_PAD", "ANDROID_PHONE", "PC_WINDOWS", "WINDOW_PHONE", "WINDOW_PAD", "PC_MAC"],
    //    SERVER, HANDHELD, IPTV_STB, HYBRID_STB, IOS_PHONE, IOS_PAD, ANDROID_PHONE, ANDROID_PAD, PC_WINDOWS, PC_MAC, WINDOW_PHONE, WINDOW_PAD
    getDeviceModel: function() {
        var listModel = Ulti.listModel;
        var navigate = navigator.userAgent.toLowerCase();
        for (var i = 0; i < listModel.length; i++) {
            if (navigate.indexOf(listModel[i].toLowerCase()) >= 0) {
                return Ulti.listModel2[i];
                break;
            }
        }
        return "PC_WINDOWS";
    },
    getDeviceModelNumber: function() {
        var listModel = Ulti.listModel;
        var navigate = navigator.userAgent.toLowerCase();
        for (var i = 0; i < listModel.length; i++) {
            if (navigate.indexOf(listModel[i].toLowerCase()) >= 0) {
                return listModel[i];
                break;
            }
        }
        return "PC_WINDOWS";
    },
    getTypeDevice: function() {
        if (Ulti.isPhoneDevice()) {
            if (window.matchMedia('(max-width: 767px)').matches) {
                return "phone";
            } else {
                return "pad";
            }
        } else {
            return "others";
        }

    },
    getCategoryIdOfMenu: function(menu2) {
        var categoryId = '';
        angular.forEach(menu2.this.config, function(config, key) {
            if (config.name === '__category') {
                categoryId = config.value;
            }
        });

        return categoryId;
    },
    getProBannerByCatName: function(catName) {
        var proBanners = new Array();
        angular.forEach(Ulti.PROMOTION_CAT_LIST, function(item, key) {
            if (item.category.toUpperCase() === catName.toUpperCase()) {
                proBanners = item.promotion;
            }
        });
        return proBanners;
    },
    isSeriesCategory: function(menu) {
        var flag = false;
        if (menu.this.name[0].text) {
            angular.forEach(Ulti.SERIES_CATEGORIES, function(value, key2) {
                if (menu.this.name[0].text.toUpperCase() === value.toUpperCase()) {
                    flag = true;
                    angular.break;
                }


            });
            return flag;
        } else {
            return false;
        }
    },
    getVodCategoryId: function(menu) {
        var flag = '';
        if (menu.this.config) {
            angular.forEach(menu.this.config, function(config, key2) {
                if (config.name === '__category') {
                    flag = config.value;
                    angular.break;
                }


            });
            return flag;
        } else {
            return '';
        }
    },
    getHomeMenuCategory: function(menuName) {
        var flag = false;
        if (menuName) {
            angular.forEach(Ulti.HOME_MENU_CATEGORIES, function(value, key2) {
                if (menuName.toUpperCase() === value.name.toUpperCase()) {
                    flag = value.id;
                    angular.break;
                }
            });
            return flag;
        } else {
            return false;
        }

    },
    removePxInSize: function(size) {
        return size.substr(0, size.indexOf('px'));
    },
    fullScreen: function(player) {
        player.on("dblclick",
            function() {
                if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                    this.exitFullscreen();
                } else {
                    //                    	change re
                    this.requestFullscreen();
                }
            });
    },
    closeSidebar: function() {
        if ($('#sidebar')) {
            if ($('#sidebar').attr('aria-expanded') === 'true') {
                $('.close-mn').click();
                $('.body-bgp-sidbar').click();
            }
            //            $('.body-bgp-sidbar').click();
            //            $('.close-mn').click();
        }

    },
    prepareVod: function(vod) {
        angular.forEach(vod.product, function(product, key) {
            if (product.content_format) {
                if (product.content_format.toUpperCase() === 'HD') {
                    vod.content_format = 'HD';
                } else {
                    vod.content_format = 'SD';
                }
            } else {
                vod.content_format = 'SD';
            }
        });


        var take = vod.program.display_runtime.split(':');
        var minutes = 0;
        if (take.length > 1) {
            minutes = parseFloat(take[0]) * 60 + parseFloat(take[1]);
        } else if (take.length === 1) {
            minutes = parseFloat(take[0]);

        }

        vod.duration = minutes;
        return vod;
    },

    prepareVodListResponse: function(data) {
        // console.log('vod listcs res ----------------  ');
        // console.log(data);
        var arrayTemp = [];
        angular.forEach(data, function(vod, key) {
            Ulti.prepareVod(vod);
            arrayTemp.push(vod);

        });

        return arrayTemp;
    },
    addHours: function(time, h) {
        time.setTime(time.getTime() + (h * 60 * 60 * 1000));
        return time;
    },

    isLoaderVisible: function() {
        if ($('.load-container').css('visibility') === 'visible') {
            return true;
        } else {
            return false;
        }
    },
    currentPage: "",

    installedAppCookie: "isInstalledApp",
    iosLink: "https://itunes.apple.com/vn/app/vietteltv/id1015360393?mt=8",
    iosPadLink: "https://itunes.apple.com/it/app/vietteltv-hd-xem-tv-phim-chieu/id1015879012",
    iosOpenLink: "ViettelTVPhone://",
    iosPadOpenLink: "ViettelTVPad://",
    androidLink: "https://play.google.com/store/apps/details?id=com.alticast.viettelphone",
    androidOpenLink: "Intent://viettelTv#Intent;scheme=viettelTv;package=com.alticast.viettelphone;end",
    serverApp: "http://27.67.48.219",
    introLink: "http://27.67.48.219/intro/"
};

Date.prototype.addHours = function(h) {
    var copiedDate = new Date();
    copiedDate.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return copiedDate;
};

Date.prototype.yyyyMMddHHmmss = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
};

var asyncLoadJSfile = function(src) {
    //    console.log('lazy load js file ....... ' + src);
    var scriptTag = document.createElement('script');
    scriptTag.src = src; // set the src attribute
    scriptTag.type = 'text/javascript'; // if you have an HTML5 website you may want to comment this line out
    scriptTag.async = true; // the HTML5 async attribute
    var headTag = document.getElementsByTagName('head')[0];
    headTag.appendChild(scriptTag);
};

var loadJSfile = function(src) {
    //    console.log('lazy load js file ....... ' + src);
    var scriptTag = document.createElement('script');
    scriptTag.src = src; // set the src attribute
    scriptTag.type = 'text/javascript'; // if you have an HTML5 website you may want to comment this line out
    //    scriptTag.async = true; // the HTML5 async attribute
    var headTag = document.getElementsByTagName('head')[0];
    headTag.appendChild(scriptTag);
};

var getJSfile = function(src) {
    var jsfile = $("<script type='text/javascript' src='" + src + "'>");
    $("head").append(jsfile);
};

jQuery.cachedScript = function(url, options) {

    // Allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
};
/* enhance $.getSctipt to handle mutiple scripts */
var getScript = jQuery.getScript;
jQuery.getScript = function(resources, callback) {

    var // reference declaration & localization
        length = resources.length,
        handler = function() {
            counter++;
        },
        deferreds = [],
        counter = 0,
        idx = 0;

    for (; idx < length; idx++) {
        deferreds.push(
            getScript(resources[idx], handler)
        );
    }

    jQuery.when.apply(null, deferreds).then(function() {
        callback && callback();
    });
};

function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
        };
    }


}

var generateNonce = function(length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
var Msg = {
    changePassword_56: "Đổi mật khẩu thành công.",
    changePassword_59: "Đổi mật khẩu thất bại.",
    changePassword_84: "Lấy mã xác nhận thất bại.",
    changePassword_103: "Đặt lại mật khẩu thành công.",
    changePassword_106: "Đặt lại mật thất bại.",
    changePassword_119: "Kích hoạt mật khẩu mua thành công.",
    changePassword_121: "Kích hoạt mật khẩu mua thật bại.",
    vod_133: "VOD này không xem được trên thiết bị của bạn. Vui lòng mua STB để xem phim!"
};
var keyCodeTable = {
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    //		
    //		96 : 0,
    //		97 : 1,
    //		98 : 2,
    //		99 : 3,
    //		100 : 4,
    //		101 : 5,
    //		102 : 6,
    //		103 : 7,
    //		104 : 8,
    //		105 : 9,
};