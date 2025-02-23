function update_flyoutcart() {
	if (window["_3d_cart"] != undefined) {
        if (_3d_cart.oid == 0)
            return;
        jQuery('#floating-cart .minicart-items').text(_3d_cart.itemsum);
        jQuery('#floating-cart').fadeIn(300);
        return;
    }
    jQuery.ajax({
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            module: 'cartajax',
        },
        success: function (data) {
            if (data.ItemsInCart != undefined) {
                if (data.ItemsInCart.length > 0) {
                    jQuery('#floating-cart').fadeIn(300);
                }
            }
        },
        error: function (objError) {
            //alert('Error');
            return;
        }
    });
}

function addcart_callback(productDiv, data) {
    jQuery(productDiv).addClass('ajaxcart-complete');
    setTimeout(function () { jQuery(productDiv).removeClass('ajaxcart-complete'); }, 1000);

    var itemsInCart = 0;
    var subtotal = 0;

    jQuery(data.ItemsInCart).each(function (index, item) {
        itemsInCart += item.qty;
        subtotal += (item.price * item.qty);
    });
	//minicart - subtotal
    subtotal = subtotal.toFixed(jQuery('body').data('decimal'));
    jQuery('.minicart-items').text(itemsInCart);
    update_flyoutcart();

    var currency = jQuery('body').data('currency');
    jQuery('.minicart-subtotal').text(currency + subtotal);
   
}

function mailinglist_callfront(form) {
    jQuery(form).find('.mailinglist-input').prop('disabled', true);
    jQuery(form).find('.mailinglist-submit').prop('disabled', true);
    jQuery(form).find('#mailing-btn-txt').addClass('hidden');
    jQuery(form).find('#mailing-btn-load').removeClass('hidden');

    jQuery('#mailinglist-response').slideUp(300);
    jQuery('#mailinglist-response div').addClass('hidden');
}

function mailinglist_response(form, response) {

    jQuery(form).find('.mailinglist-input').prop("disabled", false);
    jQuery(form).find('.mailinglist-submit').prop("disabled", false);


    if (response == 1 || response == 3) {
        jQuery('#mailinglist-response .mailinglist-subscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == -1) {
        jQuery('#mailinglist-response .mailinglist-unsubscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == 2) {
        jQuery('#mailinglist-response .mailinglist-error').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }

    jQuery(form).find('#mailing-btn-txt').removeClass('hidden');
    jQuery(form).find('#mailing-btn-load').addClass('hidden');

}

function moveMenu() {
    var respWidth = window.innerWidth;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") !== -1 && ua.indexOf("chrom") === -1) {
        respWidth = jQuery(window).width();
    }

    if (respWidth < 767) {
        jQuery('#menulinks').appendTo('#mobile-menulinks');
        jQuery('#categories').appendTo('#mobile-categories');
    }
    else {
        jQuery('#menulinks').appendTo('#menulinks-outer');
        jQuery('#categories').appendTo('#navbar');
    }
}

jQuery(document).ready(function () {

    update_flyoutcart();

    jQuery('#mobile-menu-trigger').click(function (e) {
        e.preventDefault();

        jQuery('#mobile-menu').show(0, function () {
            jQuery('body').addClass('menu-open');
        });
    });

    jQuery('.mobile-menu-close').click(function (e) {
        e.preventDefault();

        jQuery('body').removeClass('menu-open');
        setTimeout(function () {
            jQuery('#mobile-menu').hide(0);
        }, 250);
    });


    var respWidth = window.innerWidth;
    if (respWidth >= 767) {
    	jQuery('.navbar .dropdown').hover(function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown('fast');

    	}, function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp('fast');

    	});

    	jQuery('.navbar .dropdown > a').click(function () {
    		location.href = this.href;
    	});
    }

});

jQuery(window).load(function () {
    moveMenu();
	
	jQuery('#category-navbar').affix({
            offset: {
                top: 142
            }
    });
});
jQuery(window).resize(function () {
    moveMenu();
});

jQuery(function ($) {
	$('.navbar .dropdown').hover(function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

	}, function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

	});

	$('.navbar .dropdown > a').click(function () {
		location.href = this.href;
	});

});

jQuery(window).on('load', function() {
    var $window = jQuery(window),
        //win_height_padded = $window.height() * 1.1;
        win_height_padded = $window.height() * 0.75;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            //win_height_padded = $window.height() * 1.1;
            win_height_padded = $window.height() * 0.75;

        // Showed...
        jQuery(".revealOnScroll:not(.animated)").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function () {
                        $this.addClass('animated ' + $this.data('animation'));
                        $this.removeClass('revealOnScroll');
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                    $this.removeClass('revealOnScroll');
                }
            }
        });
        // Hidden...
        jQuery(".revealOnScroll.animated").each(function (index) {
            var $this = jQuery(this),
                offsetTop = $this.offset().top;
            if (scrolled + win_height_padded < offsetTop) {
                $(this).removeClass('revealOnScroll animated');
            }
        });
    }

    revealOnScroll();
});