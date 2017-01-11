//$('.fix-thumb').scrollInTurn({
//    selector: '.col-sm-12',
//    delaySpeed: 400
//});
//$(window).load(function () {
//    $(".loader").fadeOut("slow");
//})
// setTimeout(function() {
//     $('body').addClass('loaded');
// }, 100);




// lsc to src
$(function() {
    setTimeout(function() {
        $.each(document.images, function() {
            var this_image = this;
            var src = $(this_image).attr('src') || '';
            if (!src.length > 0) {
                //this_image.src = options.loading; // show loading
                var lsrc = $(this_image).attr('lsrc') || '';
                if (lsrc.length > 0) {
                    var img = new Image();
                    img.src = lsrc;
                    $(img).load(function() {
                        this_image.src = this.src;
                    });
                }
            }
        });
    }, 500);
});

setTimeout(function() {
    $('.voddetail .fix-thumb').css('opacity', 1);
    $('.slider-tv').css('opacity', 1);
    $('.fix-thumb').css('cssText', 'opacity:1 !important;');

    // $('.fix-thumb').each(function() {
    //     var elm = $(this);

    //     //show elements in viewport
    //     // var elmPos = elm.offset().top;
    //     // if (elm.visible()) {
    //     //     console.log("elm.visible() +++++++++++++ : " + elm.visible());
    //     //     elm.css('cssText', 'opacity:1 !important;');
    //     // }

    //     // elm.css('cssText', 'opacity:1 !important;');

    //     // $(window).scroll(function(event) {;
    //     // var st = $(this).scrollTop();
    //     // // var elm = $(".fix-thumb:visible");
    //     // // if (st > lastScrollTop) {
    //     // //     if (elm.visible()) {
    //     // //          elm.css('cssText', 'opacity:0 !important;');
    //     // //     } else {
    //     // //         elm.css('cssText', 'opacity:1 !important;');
    //     // //     }
    //     // // } else {
    //     // //     // upscroll code
    //     // // }
    //     // // lastScrollTop = st;
       
           
    //     //     if (elm.visible()) {
    //     //         elm.css('cssText', 'opacity:1 !important;');
    //     //     } else {
    //     //         elm.css('cssText', 'opacity:0 !important;');
    //     //     }
    //     //    });   
    
    // });
}, 100);


// setTimeout(function() {
//     var lastScrollTop = 0;
//     $(window).scroll(function(event) {;
//         var st = $(this).scrollTop();
//         // var elm = $(".fix-thumb:visible");
//         // if (st > lastScrollTop) {
//         //     if (elm.visible()) {
//         //          elm.css('cssText', 'opacity:0 !important;');
//         //     } else {
//         //         elm.css('cssText', 'opacity:1 !important;');
//         //     }
//         // } else {
//         //     // upscroll code
//         // }
//         // lastScrollTop = st;
//         $('.fix-thumb').each(function() {
//             var elm = $(this);
//             if (elm.visible()) {
//                 elm.css('cssText', 'opacity:1 !important;');
//             } else {
//                 elm.css('cssText', 'opacity:0 !important;');
//             }
//         });

//     });

// }, 100);



// slider 1 hang
var i = 0;
$('.slider-action-new .sli').each(function() {
    i++;
    $(this).css('z-index', i)
});

function removeClassDelayed(jqObj, c, to) {
    setTimeout(function() {
        jqObj.removeClass(c);
    }, to);
}

function addClassDelayed(jqObj, c, to) {
    setTimeout(function() {
        jqObj.addClass(c);
    }, to);
}


//xu ly slider
$("[id^='slider-']").each(function() {
    var sliderId = $(this).attr('id');
    $(this).on('mouseover', '.sli', function() {
        $(this).css('z-index', 9999);
        var idex = $('#' + sliderId + ' .slick-active').index(this);
        var lastidex = $('#' + sliderId).find('.slick-active').length - 1;
        addClassDelayed($(this).find('.thum-sub-new'), 'focus', 200);
        if (idex > 0 && idex < lastidex) {

            addClassDelayed($(this).nextAll('.sli').find('.thum-sub-new'), 'move-right', 200);
            addClassDelayed($(this).prevAll('.sli').find('.thum-sub-new'), 'move-left', 200);
        } else {
            if (idex == 0) {
                addClassDelayed($(this).find('.thum-sub-new'), 'focus-left', 200);
                addClassDelayed($(this).nextAll('.sli').find('.thum-sub-new'), 'far-right', 200);
            }
            if (idex == lastidex) {
                addClassDelayed($(this).find('.thum-sub-new'), 'focus-right', 200);
                addClassDelayed($(this).prevAll('.sli').find('.thum-sub-new'), 'far-left', 200);
            }
        }



    }).on('mouseleave', '.sli', function() {
        $(this).css('z-index', 1);
        removeClassDelayed($(this).find('.thum-sub-new'), 'focus', 200);
        removeClassDelayed($(this).find('.thum-sub-new'), 'focus-right', 200);
        removeClassDelayed($(this).nextAll('.sli').find('.thum-sub-new'), 'move-right', 200);
        removeClassDelayed($(this).prevAll('.sli').find('.thum-sub-new'), 'move-left', 200);
        removeClassDelayed($(this).prevAll('.sli').find('.thum-sub-new'), 'far-left', 200);
        removeClassDelayed($(this).nextAll('.sli').find('.thum-sub-new'), 'far-right', 200);
    });
});

$("[id^='banner-nav-slider']").each(function() {
    var sliderId = $(this).attr('id');
    $(this).on('mouseover', '.vod-slider-sli', function() {
        $(this).css('z-index', 9999);
        var idex = $('#' + sliderId + ' .slick-active').index(this);
        var lastidex = $('#' + sliderId).find('.slick-active').length - 1;
        addClassDelayed($(this).find('.vod-thumb'), 'vod-focus', 200);

        addClassDelayed($(this).nextAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-right', 200);
        addClassDelayed($(this).prevAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-left', 200);

        // if (idex > 0 && idex < lastidex) {
        //     console.log('idex > 0 && idex < lastidex: ' + idex);
        //     addClassDelayed($(this).nextAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-right', 200);
        //     addClassDelayed($(this).prevAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-left', 200);
        // } else {

        //     if (idex == 0) {
        //         console.log('idex > 0 && idex < lastidex: idex  ' + idex);
        //         addClassDelayed($(this).find('.vod-thumb'), 'vod-focus-left', 200);
        //         addClassDelayed($(this).nextAll('.vod-slider-sli').find('.vod-thumb'), 'vod-far-right', 200);
        //     }
        //     if (idex == lastidex) {
        //         console.log('idex > 0 && idex < lastidex: lastidex  ' + lastidex);
        //         addClassDelayed($(this).find('.vod-thumb'), 'vod-focus-right', 200);
        //         addClassDelayed($(this).prevAll('.vod-slider-sli').find('.vod-thumb'), 'vod-far-left', 200);
        //     }
        // }



    }).on('mouseleave', '.vod-slider-sli', function() {
        $(this).css('z-index', 1);
        removeClassDelayed($(this).find('.vod-thumb'), 'vod-focus', 200);
        removeClassDelayed($(this).find('.vod-thumb'), 'vod-focus-right', 200);
        removeClassDelayed($(this).nextAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-right', 200);
        removeClassDelayed($(this).prevAll('.vod-slider-sli').find('.vod-thumb'), 'vod-move-left', 200);
        removeClassDelayed($(this).prevAll('.vod-slider-sli').find('.vod-thumb'), 'vod-far-left', 200);
        removeClassDelayed($(this).nextAll('.vod-slider-sli').find('.vod-thumb'), 'vod-far-right', 200);
    });
});

