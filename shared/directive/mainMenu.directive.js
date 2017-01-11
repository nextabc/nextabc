angular.module('vietteltvApp').directive('mainmenu', function($timeout) {
    return {
        restrict: 'E',
        transclude: false,
        templateUrl: 'shared/directive/mainMenu.directive.html',
        scope: false,
        controller: 'MenuController',
        controllerAs: 'vm',
        link: function($scope, element, attrs) {
            // $("#result_link").click(function() {
            //     window.location.href = '#/search?search_str=' + $('#filter').val();
            // });
            // $('#filter').keyup(function(e) {
            //     if (e.keyCode === 13) {
            //         window.location.href = '#/search?search_str=' + this.value;
            //         $(".filter-as").hide();
            //     } else {
            //         if (this.value.length > 1) {
            //             $scope.vm.doSearchController(this.value, 10);
            //             ////
            //             $('ul.list-seartch').show();
            //             $('.filter-as').show();
            //             $('.filter-scroll ').jScrollPane();

            //         } else {
            //             $(".filter-as").hide();
            //         }
            //     }
            //     ////
            // });
            // $('#filter').focus(function(e) {
            //     if (this.value.length > 1) {
            //         $scope.vm.doSearchController(this.value, 10);
            //         $('ul.list-seartch').show();
            //         $('.filter-as').show();
            //     }
            // });
            // $scope.$watch('vm.searchResult', function() {
            //     $timeout(function() {
            //         $('.filter-scroll').jScrollPane();
            //         //                    $('.filter-scroll').jScrollPane();
            //     }, 100);
            // });

            // $timeout(function() {
            //     $(document).click(function(e) {
            //         if ((e.target.id !== 'searh-top') && !$('#filter').is(":focus")) {
            //             $(".filter-as").hide();
            //             $(".custom-search-form #filter").removeClass('newsearch');
            //         }
            //     });
            //     $(".custom-search-form .input-group-btn").click(function() {
            //         if ($('.newsearch').length) {
            //             $("#filter").removeClass("newsearch", 500);
            //         } else {
            //             $("#filter").addClass("newsearch", 500);
            //         }

            //         if ($('#filter').hasClass("newsearch")) {
            //             $('#filter').val("");
            //             $('#filter').focus();
            //         } else if ($('#filter').val().length > 1) {
            //             window.location.href = '#/search?search_str=' + $('#filter').val();
            //         }



            //     });
            // }, 500);



            // $scope.$watch('vm.menuArray', function handleMenuArrayChange(newValue, oldValue) {
            //     if (newValue) {

            //         setTimeout(function() { // You might need this timeout to be sure its run after DOM render.



            //             $('.navbar-toggle').on('click', function(event) {
            //                 $('.body-bgp-sidbar').show();
            //             });
            //             $('.body-bgp-sidbar').on('click', function(event) {
            //                 $(this).hide();
            //             });
            //             $('.close-mn').on('click', function(event) {
            //                 $('.body-bgp-sidbar').hide();
            //             });
                        
            //         }, 600, false);
            //     }
            // });


        }

    };

});