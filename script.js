$(document).ready(function() {
    
    // 1. Initial Hero Section Animation on Load
    setTimeout(function() {
        $('.hero-content').animate({
            opacity: 1,
            top: '0'
        }, {
            duration: 1200,
            step: function(now, fx) {
                if(fx.prop === 'top') {
                    // Start from 30px below and animate up
                    let initialTop = 30;
                    let currentTop = initialTop * (1 - fx.pos);
                    $(this).css('transform', `translateY(${currentTop}px)`);
                }
            }
        });
    }, 200);

    // 2. Navbar shrink functionality
    var navbarShrink = function () {
        const mainNav = $('#mainNav');
        if (!mainNav.length) {
            return;
        }
        if ($(window).scrollTop() === 0) {
            mainNav.removeClass('navbar-scrolled');
        } else {
            mainNav.addClass('navbar-scrolled');
        }
    };

    // Shrink the navbar initially
    navbarShrink();
    // Shrink the navbar when page is scrolled
    $(window).scroll(navbarShrink);

    // 3. Smooth scrolling for nav links
    $('a.nav-link, .scroll-indicator a, .hero-content a').on('click', function(event) {
        // Exclude tel links from smooth scroll intervention
        if (this.hash !== "" && !this.href.startsWith("tel:")) {
            // Close mobile menu if open
            if($('.navbar-toggler').is(':visible')) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    // 4. Scroll Reveal Animations
    var $animationElements = $('.fade-in-scroll');
    var $window = $(window);

    function checkIfInView() {
        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        $animationElements.each(function() {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            // Check if element is within viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition - 50)) {
                $element.addClass('visible');
            }
        });
    }

    $window.on('scroll resize', checkIfInView);
    $window.trigger('scroll'); // Trigger on initial load
    
    // 5. Button click effects (Subtle scale)
    $('.btn').on('mousedown', function(e) {
        $(this).css('transform', 'scale(0.95)');
    }).on('mouseup mouseleave click', function(e) {
        // Only return to normal state if it doesn't have a hover transform
        if(!$(this).hasClass('btn-accent') && !$(this).closest('.menu-card').length) {
            $(this).css('transform', 'scale(1)');
        } else {
            $(this).css('transform', ''); // Let CSS handle it
        }
    });

});
