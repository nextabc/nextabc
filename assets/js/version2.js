///* Hover caption sử dụng images
// ====================================*/
$(document).ready(function() {

    $bg = $(this).find('.voddetail .col-md-left .video-pl img').attr('src');

    if ($bg) {
        $('body').css({
            "background": "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 100%), url(" + $bg + ") repeat 0 0",
            "background-size": "100% 100%",
            'filter': "alpha(opacity=70);"
        });
    } else {

        $('body').css({
            "background": "#141414"
                // "background-image": "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(2, 103, 255, 0))"

        });

    }
});
//
//
//
//$(document).ready(function () {
//    var topbarvi = $('.menu-top');
//    if (topbarvi.length) {
//        var stickyNavTop = $('.menu-top').offset().top;
//        var stickyNav = function () {
//            var scrollTop = $(window).scrollTop();
//            if (scrollTop > stickyNavTop) {
//                $('.menu-top').addClass('fixed').slideDown();
//            } else {
//                $('.menu-top').removeClass('fixed').slideDown();
//            }
//        };
//
//        stickyNav();
//        $(window).scroll(function () {
//            stickyNav();
//        });
//    }
//});
//