var controllerElement = document.querySelector('.main-wrap');
var angular_scope = angular.element(controllerElement).scope();
var dataWatch = angular_scope.$watch('vm.isAllDataLoaded', function handleMenuArrayChange(newValue, oldValue) {
    if (newValue) {
        setTimeout(function() { // You might need this timeout to be sure its run after DOM render.
            // console.log('dataWatch enter .......................................... 000000000');
            // loadJSfile('assets/js/main.js');
            loadJSfile('assets/js/update.js');
            loadJSfile('assets/js/version2.js');
            if ($("script[src$='keyMain.js']").length === 0) {
                // console.log('keymain enter .......................................... 000000000');
                loadJSfile('assets/js/remoteKey/keyMain.js');
            }
            if (Ulti.currentPage === "vod") {
                current_Item.removeClass('item-hover');
                current_Item = $('#vodImageId');
                current_Item.addClass('item-hover');
                // console.log('VOD Page ....................');
                // console.log('navZone1 ---------- ' + navZone);
                if (navZone !== "avPlay") {
                    navZone = "vod";
                    lastNavZone = navZone;
                }
                // console.log('navZone2 ---------- ' + navZone);
                lastNavZone = "vod";
                last_current_Item = current_Item;
            } else if (Ulti.currentPage === "vodPackage") {
                // console.log('1111111111111111111 +++++++ vod');
                $("nav.menu-top").css("opacity", 1);
                var home_menu_item = $("#menu-c1-0");
                home_menu_item.removeClass('item-hover');
                home_menu_item.removeClass('item-active');
                $('.menu-c1-li').removeClass('item-hover');
                $('.menu-c1-li').removeClass('item-active');
                $('[menu-id=' + active_menu_item_id + ']').addClass('item-active'); //active menu
                current_Item = $('[menu-id=' + active_menu_item_id + ']');
                navZone = "menu";
                lastNavZone = navZone;
            } else if (Ulti.currentPage === "channel") {
                if (navZone !== "channel") {
                    // console.log('not channel ..........................');
                    $('.menu-c1-li').removeClass('item-hover');
                    $('.menu-c1-li').removeClass('item-active');
                    $('[menu-id=' + active_menu_item_id + ']').addClass('item-active'); //active menu
                    current_Item = $('[menu-id=' + active_menu_item_id + ']');
                    navZone = "menu";
                    lastNavZone = navZone;
                } else {
                    current_Item = $('.cate > li.active');
                }

                // console.log('current_Item ..........................' + current_Item);

                console.log('unslick start ....');
                if ($('.channel-slide').hasClass('slick-initialized')) {
                    // console.log('.............. Da slide ............');
                    $('.channel-slide').hide();
                    setTimeout(function() {
                        $('.channel-slide').slick('unslick');
                        $('.channel-slide').remove('slick-list');
                        $('.channel-slide').slick({
                            infinite: false,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        });
                        $('.channel-slide').css('visibility', 'visible');
                    }, 50);
                } else {
                    // console.log('.............. chua slide ............');
                    $('.channel-slide').css('visibility', 'visible');
                    $('.channel-slide').slick({
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }
            } else if (Ulti.currentPage === "vodList") {
                if (!current_Item.is('.sli')) {
                    current_Item = $('.sli').first();
                    current_Item.addClass('item-hover');
                    navZone = "vodList";
                    lastNavZone = navZone;
                }
                setTimeout(function() {
                    // console.log('update vod list page ...................');
                    $('.vod-spinner').hide();
                }, 1000);
            } else if (Ulti.currentPage === "home") {
                $("nav.menu-top").css("opacity", 1);
                $('.menu-c1-li').removeClass('item-hover');
                $('.menu-c1-li').removeClass('item-active');
                $("#menu-c1-0").addClass('item-active'); //active menu
                current_Item = $("#menu-c1-0");
                navZone = 'menu';


            }

            // $("img.lazy").lazyload({
            //     skip_invisible: false,
            //     failure_limit: 10,
            //     effect: "fadeIn"
            //         // threshold: 50
            // });

            $('img.lazy').lazy({
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                effect: "fadeIn",
                effectTime: 500,
                visibleOnly: false,
                scrollDirection: "vertical"


            });

            setTimeout(function() {
                $('.load-container').css('visibility', 'hidden');
                isPageLoaded = true;
            }, 150);
            angular_scope.vm.isAllDataLoaded = false;
            angular_scope.$emit('dataLoadedEvent');
            // dataWatch();
            return;
        }, 100, false);
    }
});