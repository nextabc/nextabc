
// $(document).ready(function () {
//     $(".tivcat").click(function () {
//         $('html, body').animate({
//             scrollTop: $("#list-tv-kenh").offset().top
//         }, 2000);
//     });

//     //Popup*******************************
//     $('.table-list-sta.table  input').on('change', function () {
//         //console.log($('input[name="check"]:checked', '#myForm').val()); 
//         $('input[name="check"]').parent('td').parent('tr').css('background', '')
//         $('input[name="check"]:checked').parent('td').parent('tr').css('background', '#fcc115');
//     });
//     $('.list-frm li').click(function () {
//         var ele = $(this).find(':checkbox');
//         if (ele.is(':checked')) {
//             ele.prop('checked', false);
//             $(this).find('.checkbox-v').css('display', 'none')
//         } else {
//             ele.prop('checked', true);
//             $(this).find('.checkbox-v').css('display', 'block')
//         }
//     });
//     //Popup*******************************



//     // left to right caption
//     $('.thumbnail').mouseenter(function () {
//         $(this).find('.caption').stop().animate({left: "0%"});
//     });

//     $('.thumbnail').mouseleave(function () {
//         $(this).find('.caption').stop().animate({left: "-100%"}, 100, function () {
//         });

//     });

//     $('.col-list-tin ul li ').mouseenter(function () {
//         $(this).find('.add-favorite').stop().animate({bottom: "0%"});
//     });

//     $('.col-list-tin ul li ').mouseleave(function () {
//         $(this).find('.add-favorite').stop().animate({bottom: "-60px"}, 100, function () {
//         });

//     });
//     $('.col-list-tin ul li ').mouseenter(function () {
//         $(this).find('.remove-favorite').stop().animate({bottom: "0%"});
//     });

//     $('.col-list-tin ul li ').mouseleave(function () {
//         $(this).find('.remove-favorite').stop().animate({bottom: "-60px"}, 100, function () {
//         });

//     });
//     //*zoom
//     if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {
//         //slide tv -------------
//         $(".slider-tv .lazyOwl").hover(function () {
//             $(this).animate({scale: '1.15'});

//         }, function () {
//             $(this).animate({scale: '1'});

//         });
//         $(".list-movie-cat .col-md-3").hover(function () {
//             $(this).animate({scale: '1.07'});

//         }, function () {
//             $(this).animate({scale: '1'});

//         });
//         //-------------
//         $(".thum-sub-n").hover(function () {
//             $(this).animate({scale: '1.15'});

//         }, function () {
//             $(this).animate({scale: '1'});

//         });
//         $(".col-list-tin ul li").hover(function () {
//             $(this).animate({scale: '1.15'});

//         }, function () {
//             $(this).animate({scale: '1'});

//         });
//         $(".thub3-ct").hover(function () {
//             $(this).animate({scale: '1.1'}, 200);
//         }, function () {
//             $(this).animate({scale: '1'}, 200);
//         });
//         $(".lager-lo").hover(function () {
//             $(this).animate({scale: '1.1'}, 200);
//         }, function () {
//             $(this).animate({scale: '1'}, 200);
//         });
//         $(".large-four").hover(function () {
//             $(this).animate({scale: '1.05'}, 200);
//         }, function () {
//             $(this).animate({scale: '1'}, 200);
//         });

//     }
//     if (window.matchMedia('(min-width: 768px)').matches) {
//         $(".view-vip-sknb").hover(function () {
//             $(this).animate({scale: '1.15'}, 100);
//         }, function () {
//             $(this).animate({scale: '1'}, 100);
//         });
//     }
//     if (window.matchMedia('(min-width: 768px)').matches) {
//         $(".col-mk-p").hover(function () {
//             $(this).animate({scale: '1.05'}, 100);
//         }, function () {
//             $(this).animate({scale: '1'}, 100);
//         });
//     }
//     if (window.matchMedia('(max-width: 767px)').matches) {
//         $('ul.list-hc').each(function () {
//             var max = 2
//             if ($(this).find("li").length > max) {
//                 $(this)
//                         .find('li:gt(' + max + ')')
//                         .hide()
//                         .end()
//                         .append(
//                                 $('<li>Xem tiếp...</li>').click(function () {
//                             $(this).siblings(':hidden').show().end().remove();
//                         })
//                                 );
//             }

//         });
//         $('.tilt-pk ul').each(function () {
//             var max = 2
//             if ($(this).find("li").length > max) {
//                 $(this)
//                         .find('li:gt(' + max + ')')
//                         .hide()
//                         .end()
//                         .append(
//                                 $('<li>Xem tiếp...</li>').click(function () {
//                             $(this).siblings(':hidden').show().end().remove();
//                         })
//                                 );
//             }

//         });

//     }
//     jQuery('body').bind('click', function (e) {
//         if (jQuery(e.target).closest('.navbar').length == 0) {
//             // click happened outside of .navbar, so hide
//             var opened = jQuery('.navbar-collapse').hasClass('collapse in');
//             if (opened === true) {
//                 jQuery('.navbar-collapse').collapse('hide');
//             }
//         }
//     });
// });

// $(document).ready(function () {
//     // Cat chuỗi title
//     /* $('.caption h4').each(function(index, el) {
//      var txt= $('.caption h4').text();
//      if(txt.length > 30)
//      $('.thumbnail h4').text(txt.substring(0,30) + '...');
//      if (window.matchMedia('(max-width: 767px)').matches){
//      $('.thumbnail h4').text(txt.substring(0,25) + '...');
//      }
//      });*/


//    if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(min-device-width: 1025px)').matches) {

//        // $(".dropdown").hover(
//        //         function () {
//        //             $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown("400");
//        //             $(this).toggleClass('open');
//        //             $('.dropdown.active').toggleClass('klo');
//        //         },
//        //         function () {
//        //             $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideUp("400");
//        //             $(this).toggleClass('open');
//        //             $('.dropdown.active').toggleClass('klo');

//        //         }
//        // );
       
//        // $('.dropdown:nth-child(4) .dropdown-menu').not('.in .dropdown-menu').stop(true, true).slideDown("400");
//                    // $('.dropdown:nth-child(4)' ).toggleClass('open');
//                    // $('.dropdown:nth-child(4).active').toggleClass('klo');
//    }

//     if (window.matchMedia('(min-width: 1260px)').matches) {
//         $('.mega-dropdown-menu > li > ul').each(function () {
//             if ($(this).find('li').length > 9) {
//                 $(this).css('margin-left', '76%');
//             }
//         });
//     }
//     if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1260px)').matches) {
//         $('.mega-dropdown-menu > li > ul').each(function () {
//             if ($(this).find('li').length > 9) {
//                 $(this).css('margin-left', '88%');
//             }
//         });
//     }

//     //$('.mega-dropdown-menu > li > ul')

//     $(".dropdown.active").hover(
//             function () {
//                 $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true);
//                 $('.dropdown.active').removeClass('klo');
//             },
//             function () {
//                 $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true);
//                 $('.dropdown.active').removeClass('klo');
//             }
//     );
//     if (window.matchMedia('(max-width: 767px)').matches) {
//         //console.log('ddd')
//         $('.dropdown').removeClass('active');
//     }


//     // thumb
//     var eqw = $('.thumb-ikm').innerWidth() - 4;
//     //console.log(eqw);
//     $('.slider-thub3 .thumb-sub').css("width", eqw);
//     $(window).resize(function (event) {
//         /* Act on the event */
//         var eqwe = $('.thumb-ikm').innerWidth() - 4;
//         $('.slider-thub3 .thumb-sub').css("width", eqwe);
//     });
//     var img_sli = $('.img-sli').innerWidth();
//     //$('.sli .thumbnail').css("width",img_sli);
//     $(window).resize(function (event) {
//         /* Act on the event */
//         var img_sliq = $('.img-sli').innerWidth() - 4;
//         //$('.sli .thumbnail').css("width",img_sliq);
//     });
//     //var html_larger=;
//     //console.log($('.large').length)

// // Fix image larger home cinema
//     $(".large").each(function (index) {
//         // console.log($(this).html())
//         if (window.matchMedia('(max-width: 991px)').matches) {
//             //$('.top-view').append($(this).html());
//         }
//     })
//     // fix heght equals
//     /* Thanks to CSS Tricks for pointing out this bit of jQuery
//      http://css-tricks.com/equal-height-blocks-in-rows/
//      It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

//     equalheight = function (container) {

//         var currentTallest = 0,
//                 currentRowStart = 0,
//                 rowDivs = new Array(),
//                 $el,
//                 topPosition = 0;
//         $(container).each(function () {

//             $el = $(this);
//             $($el).height('auto')
//             topPostion = $el.position().top;

//             if (currentRowStart != topPostion) {
//                 for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
//                     rowDivs[currentDiv].height(currentTallest);
//                 }
//                 rowDivs.length = 0; // empty the array
//                 currentRowStart = topPostion;
//                 currentTallest = $el.height();
//                 rowDivs.push($el);
//             } else {
//                 rowDivs.push($el);
//                 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
//             }
//             for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
//                 rowDivs[currentDiv].height(currentTallest);
//             }
//         });
//     }

//     $(window).load(function () {
//         equalheight('.col-list-f-mv .col-md-3');
//         equalheight('.list-movie-cat .col-md-3');
//     });


//     $(window).resize(function () {
//         equalheight('.col-list-f-mv  .col-md-3');
//         equalheight('.list-movie-cat .col-md-3');
//     });

// // TV Chanel ***************************************

// });
// $(document).ready(function () {
//     //rotation speed and timer
//     var speed = 5000;

//     var run = setInterval(rotate, speed);
//     var slides = $('.slide');
//     var container = $('#slides ul');
//     var elm = container.find(':first-child').prop("tagName");
//     var item_width = container.width();
//     var previous = 'prev'; //id of previous button
//     var next = 'next'; //id of next button
//     slides.width(item_width); //set the slides to the correct pixel width
//     container.parent().width(item_width);
//     container.width(slides.length * item_width); //set the slides container to the correct total width
//     container.find(elm + ':first').before(container.find(elm + ':last'));
//     resetSlides();


//     //if user clicked on prev button

//     $('#buttons a').click(function (e) {
//         //slide the item

//         if (container.is(':animated')) {
//             return false;
//         }
//         if (e.target.id == previous) {
//             container.stop().animate({
//                 'left': 0
//             }, 1500, function () {
//                 container.find(elm + ':first').before(container.find(elm + ':last'));
//                 resetSlides();
//             });
//         }

//         if (e.target.id == next) {
//             container.stop().animate({
//                 'left': item_width * -2
//             }, 1500, function () {
//                 container.find(elm + ':last').after(container.find(elm + ':first'));
//                 resetSlides();
//             });
//         }

//         //cancel the link behavior            
//         return false;

//     });

//     //if mouse hover, pause the auto rotation, otherwise rotate it    
//     container.parent().mouseenter(function () {
//         clearInterval(run);
//     }).mouseleave(function () {
//         run = setInterval(rotate, speed);
//     });


//     function resetSlides() {
//         //and adjust the container so current is in the frame
//         container.css({
//             'left': -1 * item_width
//         });
//     }

// });
// //a simple function to click next link
// //a timer will call this function, and the rotation will begin

// function rotate() {
//     $('#next').click();
// }


// $(document).ready(function () {
//     $(".tab").click(function () {
//         $(".tab").removeClass("active");
//         $(this).addClass("active");
//     });

// });

// // Screen IPad
// $(document).ready(function () {
//     $('.slide-itemtop').removeClass('multiple-items');






//     if (window.matchMedia('(max-width: 990px)').matches) {
//         // top banner
//         //$('.lager-lo').addClass('thum-sub-n small');
//         $('.col-sm-left').insertBefore('.col-sm-right');
//         //home cinima
//         //$('.large').addClass('small-img small');
//         //$('.large-ct').addClass('thum-sub-n');
//         $('.slide_run2 .poster-larger .caption').removeClass('lager')
//     } else {
//         // top banner
//         //$('.lager-lo').removeClass('thum-sub-n small');
//         //home cinima
//         // $('.large').removeClass('small-img small');
//         //  $('.large-ct').removeClass('thum-sub-n');
//         // $('.slide_run2 .poster-larger .caption').addClass('lager')

//     }
//     $(window).resize(function (event) {
//         if (window.matchMedia('(max-width: 990px)').matches) {
//             // top banner
//             //$('.lager-lo').addClass('thum-sub-n small');
//             $('.col-sm-left').insertBefore('.col-sm-right');
//             //home cinima
//             //$('.large').addClass('small-img small');
//             //$('.large-ct').addClass('thum-sub-n');
//             $('.slide_run2 .poster-larger .caption').removeClass('lager')
//         } else {
//             // top banner
//             // $('.lager-lo').removeClass('thum-sub-n small');
//             $('.col-sm-right').insertBefore('.col-sm-left');
//             //home cinima
//             // $('.large').removeClass('small-img small');
//             // $('.large-ct').removeClass('thum-sub-n');
//             $('.slide_run2 .poster-larger .caption').addClass('lager')
//         }
//     });
// });

// // Screen Iphone
// $(document).ready(function () {
//     if (window.matchMedia('(max-width: 767px)').matches) {
//         // top banner
//         $('.slide-itemtop').removeClass('multiple-items');
//         $('.grid .grid-item ').removeClass('large-four');
//         $('.grid-item.large-mb .thum-sub-n ').addClass('small-dt');
//     } else {
//         // top banner
//         $('.slide-itemtop').addClass('multiple-items');
//         $('.grid-item.large-mb .thum-sub-n ').removeClass('small-dt');

//     }
//     $(window).resize(function (event) {
//         if (window.matchMedia('(max-width: 767px)').matches) {
//             // top banner
//             $('.slide-itemtop').removeClass('multiple-items');
//             $('.grid .grid-item ').removeClass('large-four');
//             $('.grid-item.large-mb .thum-sub-n ').addClass('small-dt');
//         } else {
//             // top banner
//             $('.slide-itemtop').addClass('multiple-items');
//             $('.grid-item.large-mb .thum-sub-n ').removeClass('small-dt');

//         }
//     });
// });

// // remove class grid
// $(document).ready(function () {
//     if (window.matchMedia('(max-width: 991px)').matches && window.matchMedia('(min-width: 768px)').matches) {
//         // top banner
//         $('.grid .grid-item ').removeClass('large-four');
//         $(' .large-mb  .thum-sub-n').addClass('small');

//     } else {
//         // top banner

//         $(' .large-mb .thum-sub-n ').removeClass('small');

//     }
//     $(window).resize(function (event) {
//         if (window.matchMedia('(max-width: 991px)').matches && window.matchMedia('(min-width: 768px)').matches) {
//             // top banner
//             $('.grid .grid-item ').removeClass('large-four');
//             $('.large-mb .thum-sub-n ').addClass('small');
//         } else {
//             // top banner
//             $('.large-mb  .thum-sub-n ').removeClass('small');


//         }
//     });
// });


