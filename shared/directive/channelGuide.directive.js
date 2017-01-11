angular.module('vietteltvApp').directive('channelguide', function ($timeout) {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'shared/directive/channelGuide.directive.html',
        scope: false,
        link: function ($scope, element, attrs) {
            //set current day
//            var objToday = new Date();
//            var weekday = new Array('Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy');
//            var dayOfWeek = weekday[objToday.getDay()];
//            var today = dayOfWeek + ", Ngày " + objToday.getDate() + " - " + (objToday.getMonth() + 1) + " - " + objToday.getFullYear();
//            $("#channel_date").text(today);
//            $scope.vm.selectedDate = objToday.getDate() + "-" + (objToday.getMonth() + 1) + "-" + objToday.getFullYear();
            //------------------------------
            $("#tivcat").click(function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $("#lichphatsong").offset().top
                }, 500);
            });
//            $('.tab2-v1').hide();
//            $('a#channel_date').click(function (event) {
//                /* Act on the event */
//                event.preventDefault();
//                if ($('.tab2-v1').css('display') === "none") {
//                    $('.tab2-v1').css('display', 'inline-block');
//                    $('.tab-v1').hide();
//
//                } else {
//                    $('.tab2-v1').hide();
//                    $('.tab-v1').css('display', 'inline-block');
//
//                }
//            });
            
//            $.datetimepicker.setLocale('vi');
//            var now = new Date();
//            var daysAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000) * 7);
//            var nextDay = new Date(now.getTime() + (24 * 60 * 60 * 1000) * 3);
//            $('#datetimepicker3').datetimepicker({
////                format: 'DD/MM/YYYY',
//                minDate: daysAgo,
//                maxDate: nextDay,
//                inline: true,
//                dayOfWeekStart: 1,
//                lang: 'vi',
//                i18n: {
//                    vi: {
//                        months: [
//                            'Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng tư',
//                            'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám',
//                            'Tháng chín', 'Tháng mười', 'Tháng mười một', 'Tháng mười hai'
//                        ]
//                    }
//                },
//                onSelectDate: function (selectedDate, $i) {
//                    $scope.getSelectedDate(selectedDate);
////                    console.log("haivl1");
//                }
//            });
            $scope.getSelectedDate = function (selectedDate, operation) {
//                console.log("haivl2");
                if (selectedDate === null && operation!==null) {
                    selectedDate = Ulti.selectedGuideDate;
                    if(operation ==="next"){
                        selectedDate = new Date(selectedDate.getTime() + (24 * 60 * 60 * 1000) * 1);    
                    }
                    else if(operation ==="prev"){
                        selectedDate = new Date(selectedDate.getTime() - (24 * 60 * 60 * 1000) * 1);    
                    }
                }               
                var objToday = new Date(selectedDate);
                var weekday = new Array('Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy');
                var dayOfWeek = weekday[objToday.getDay()];
                var today = dayOfWeek + ", Ngày " + objToday.getDate() + " - " + (objToday.getMonth() + 1) + " - " + objToday.getFullYear();
                $("#channel_date").text(today);
                $scope.vm.selectedDate = objToday.getDate() + "-" + (objToday.getMonth() + 1) + "-" + objToday.getFullYear();

                //hide picker
                $('.tab2-v1').hide();
                $('.tab-v1').css('display', 'inline-block');
                //change Channel Guide
                Ulti.selectedGuideDate = selectedDate;
                $scope.vm.getChannelGuide($scope.vm.selectedChannel);
            };
            $scope.$watch('vm.channelGuide', function () {
                $timeout(function () {
                    var element = $(".scroll-pane").jScrollPane();
                    var api = element.data("jsp");
                    var item = $(".tab-v1 ul li.now");
                    if (typeof (item) !== "undefined" && item.length > 0) {
                        api.scrollToElement(item, true);
                        api.scrollToY(api.getContentPositionY() - element.height() / 2);
                        console.log(element.height());
                    }
                    //play tvod
                    $('a.icon_3').on("click", function (e) {
                        e.preventDefault();
                        if (Ulti.islogedIn()) {
                            var item = $(e.target);
                            var parentTag = $(this).parent();
                            parentTag = $(parentTag).parent();
                            //remove all class now
                            $(".tab-v1 ul li").removeClass("now");
                            parentTag.addClass("now");
                        }
                    });
                }, 1000);
            });
        }
    };
});
