;
(function ($) {
  'use strict'

  var spacedScript = {

    // Main init function
    init: function () {
      this.config();
      this.events();
    },

    // Define vars for caching
    config: function () {
      this.config = {
        $window: $(window),
        $document: $(document),
      };
    },

    // Events
    events: function () {
      var self = this;

      // Run on document ready
      self.config.$document.on('ready', function () {

        self.scrollTarget();

        self.mobileNav();

        self.retinaLogo();

        self.headerFixed();

        self.scrollToTop();

      });

      // Run on Window Load
      self.config.$window.on('load', function () {

      });
    },

    // ScrollTarget
    scrollTarget: function () {
      $('.scroll-target').on('click', function () {
        var anchor = $(this).attr('href').split('#')[1];
        /* Active Button */

        // $(this).parent()
        //     .addClass('current-menu-item')
        //     .siblings()
        //     .removeClass('current-menu-item');

        if (anchor) {
          if ($('#' + anchor).length > 0) {
            var headerHeight = 40;

            if ($('body').hasClass('header-sticky'))
              headerHeight = $('#site-header').height();

            var target = $('#' + anchor).offset().top - headerHeight;

            $('html,body').animate({
              scrollTop: target
            }, 1200, 'easeInOutExpo');
          }
        }
        return false;
      })
    },

    // Mobile Navigation
    mobileNav: function () {
      var menuType = 'desktop';

      $(window).on('load resize', function () {
        var mode = 'desktop';
        var wrapMenu = $('#site-header-inner .wrap-inner');
        if (matchMedia('only screen and (max-width: 991px)').matches)
          mode = 'mobile';

        if (mode != menuType) {
          menuType = mode;

          if (mode == 'mobile') {
            $('#main-nav').attr('id', 'main-nav-mobi')
              .appendTo('#site-header')
              .hide().children('.menu')
              .find('li:has(ul)')
              .children('ul')
              .removeAttr('style')
              .hide()
              .before('<span class="arrow"></span>');
          } else {
            $('#main-nav-mobi').attr('id', 'main-nav')
              .removeAttr('style')
              .appendTo(wrapMenu)
              .find('.sub-menu')
              .removeAttr('style')
              .prev().remove();

            $('.mobile-button').removeClass('active');
          }
        }
      });

      $(document).on('click', '.mobile-button', function () {
        $(this).toggleClass('active');
        $('#main-nav-mobi').slideToggle();
      })

      $(document).on('click', '#main-nav-mobi .arrow', function () {
        $(this).toggleClass('active').next().slideToggle();
      })
    },

    // Retina Logos
    retinaLogo: function () {
      var retina = window.devicePixelRatio > 1 ? true : false;
      var $logo = $('#site-logo img');
      var $logo_retina = $logo.data('retina');

      if (retina && $logo_retina) {
        $logo.attr({
          src: $logo.data('retina'),
          width: $logo.data('width'),
          height: $logo.data('height')
        });
      }
    },

    // Header Fixed
    headerFixed: function () {
      if ($('body').hasClass('header-fixed')) {
        var nav = $('#site-header');
        if (nav.length) {
          var offsetTop = nav.offset().top,
            headerHeight = nav.height(),
            injectSpace = $('<div />', {
              height: headerHeight
            }).insertAfter(nav);

          $(window).on('load scroll', function () {
            if ($(window).scrollTop() > offsetTop) {
              nav.addClass('is-fixed');
              injectSpace.show();
            } else {
              nav.removeClass('is-fixed');
              injectSpace.hide();
            }

            if ($(window).scrollTop() > 400) {
              nav.addClass('is-small');
            } else {
              nav.removeClass('is-small');
            }
          })
        }
      }
    },

    // Scroll to Top
    scrollToTop: function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 800) {
          $('#scroll-top').addClass('show');
        } else {
          $('#scroll-top').removeClass('show');
        }
      });

      $('#scroll-top').on('click', function () {
        $('html, body').animate({
          scrollTop: 0
        }, 1000, 'easeInOutExpo');
        return false;
      });
    },

  };

  // Start things up
  spacedScript.init();

})(jQuery);