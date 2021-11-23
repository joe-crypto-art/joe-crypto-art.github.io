jQuery(document).ready(function($) {
	'use strict';

// Display Comments
// ===============================================================================
	jQuery(".reveal-comments").click(function() {
		jQuery(".load-comments").removeClass('hidden-comments');
	});
	jQuery(".reveal-comments").toggle(function() {
		jQuery(".load-comments").fadeIn("slow");
	}, function() {
		jQuery(".load-comments").fadeOut("slow");
	});

// Flickr Widget
// ===============================================================================
	if ($('.widget_quick-flickr-widget').length) {
		$('.widget_quick-flickr-widget').addClass('vania_quickbg');
		$('.quick-flickr-item').each(function(){
			var src = $(this).find('img').attr('src');
			src = src.replace('_m', '_q');
			$(this).css('backgroundImage','url('+src+')');
		});
	}

// Scroll Reveal
// ===============================================================================
	if (jQuery('body').hasClass("vn-fade")) {
		window.sr = ScrollReveal().reveal('.vn-itm-reveal', { 
			duration: 1000,
			move: 0,
			scale:0,
			mobile:false,
			distance:0
		});
	}

// Retina logo
// ===============================================================================
	retinajs( $('img.retina-enabled') );

// Mobile Menu
// ===============================================================================
	jQuery('<div class="slide-mobmenu"></div> <div class="overmb"></div>').prependTo("body");
	var originalicons = jQuery('.prep-content').clone().removeClass("vn-navbar");
	jQuery("#vn-btnav").click(function() {
		jQuery("body").addClass("show-menu");
		if (!jQuery(".slide-mobmenu .prep-content").length) {
			originalicons.prependTo('.slide-mobmenu');
		}
		return false;
	});
	jQuery('.overmb').click(function() {
		jQuery("body").removeClass("show-menu");
	});

// Tooltip 
// ===============================================================================
	jQuery('a[data-toggle="tooltip"]').tooltip();

// Superfish Menu
// ===============================================================================
	jQuery('#header-menu, #footer-menu').superfish({
		delay: 200,
	});

// Share Buttons
// ===============================================================================
	jQuery('a.share-fb, a.share-tw, a.share-plus').on('click', function() {
		var newwindow = window.open(jQuery(this).attr('href'), '', 'width=626,height=436');
		if (window.focus) {
			newwindow.focus();
		}
		return false;
	});

// Knob
// ===============================================================================
	function inknob() {
		var score = "1" === mrgvars.scbase ? "100" : "10";
		var knoboptions = {
			min: 1,
			max: score,
			readOnly: true,
			linecap: "round",
			fgColor: "#00BF76",
			inputColor: "#00BF76",
			bgColor: "#ccc",
			thickness: ".15",
			font: "Roboto Condensed",
		};
		var knoboptions_b = {
			min: 1,
			max: score,
			readOnly: true,
			linecap: "round",
			fgColor: "#fff",
			inputColor: "#fff",
			bgColor: "transparent",
			thickness: ".13",
		};
		jQuery(".dial-panel").knob(knoboptions);
		jQuery(".dial").knob(knoboptions_b);
		jQuery(".ubscore input").fadeIn();
	}
	inknob();

// Gallery & Video position
// ===============================================================================

	var targetsh = ".single-format-audio .entry-content .wp-audio-shortcode, .single-format-audio .entry-content .wp-playlist, .single-format-audio .entry-content .embed-sound, .single-format-video .entry-content .video-in, .single-format-video .entry-content .wp-video, .single-format-video .entry-content .embed-youtube, .single-format-gallery .single-gallery";
	if (!jQuery('body').hasClass("vn-append") && jQuery(targetsh).length) {
		jQuery("article").removeClass("no-thumb");
		jQuery(".featured-media").addClass("hide-featured-img");
		jQuery(".featured-media").addClass("embed-item");
		jQuery(targetsh).eq(0).appendTo(".featured-media");
	}

// Col
// ===============================================================================
	jQuery("#collapse1").addClass("in");

// Tabs
// ===============================================================================
	jQuery(".entry-content ul.nav-tabs li:first").addClass("active"); //Activate first tab
	jQuery(".entry-content div.tab-content div:first").addClass("active"); //Show first tab content
	jQuery(".entry-content ul.nav-tabs li").click(function() {
		jQuery(".entry-content ul.nav-tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		var activeTab = jQuery(this).find("a").attr("href");
		jQuery(".entry-content div.tab-content div").removeClass("active"); //Hide all tab content
		jQuery('.entry-content div.tab-content #' + activeTab).addClass("active"); //Fade in the active ID content
		return false;
	});

// Scroll
// ===============================================================================
	jQuery('.top-slide').click(function() {
		jQuery('html, body').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

// Animate Progress Bar inview
// ===============================================================================
	if (jQuery('.score-panel').length) {
		var inview = new Waypoint.Inview({
			element: jQuery('.score-panel'),
			enter: function(direction) {
				jQuery(".progress-bar-info").each(function() {
					jQuery(this).removeClass('unwidth').data("origWidth", $(this).width()).width(0).animate({
						width: jQuery(this).data("origWidth")
					}, 2200);
				});
				setTimeout(function() {
					jQuery('.base-sc').fadeIn();
				}, 2000);
				inview.destroy();
			}
		});
	}

// Fixed Menubar
// ===============================================================================
	if (jQuery('body').hasClass('sticky-nav') && jQuery('#vn-header').length) {
		var asideTop = jQuery('#vn-header').offset().top;
		var extraTop = jQuery('body').hasClass('extra-top') ? 30 : 0;
		jQuery(window).scroll(function() {
			var asideY = jQuery(this).scrollTop();
			if (asideY >= asideTop - extraTop + 1) {
				jQuery('#vn-wrap').addClass('top-wrap');
				jQuery('#vn-header').addClass('append');
			} else {
				jQuery('#vn-wrap').removeClass('top-wrap');
				jQuery('#vn-header').removeClass('append').removeAttr('style');
			}
		});
	}

// Facebook Plugin
// ===============================================================================
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

// Infinite Scroll
// ===============================================================================
	if ($.fn.infinitescroll !== undefined) {
		jQuery('#vn-main-feed').infinitescroll({
			contentSelector: "#vn-main-feed",
			itemSelector: ".vn-entry",
			nextSelector: ".nav-load a",
			navSelector: ".paging-navigation",
			behavior: "twitter",
			loading: {
				img: mrgvars.loadingimg,
				msgText: "",
				finishedMsg: "<em>" + mrgvars.nomsg + "</em>",
				selector: ".nav-load",
			},
		}, function(newElements) {
			var jQuerynewElems = jQuery(newElements).hide();
			jQuerynewElems.imagesLoaded(function() {
				jQuerynewElems.fadeIn();
			});
			inknob();
		});
	}

// Owl Carousel init
// ===============================================================================
	var owl_featured_slider = jQuery('#vn-featured-carousel .owl-carousel');
	owl_featured_slider.each(function() {
		owl_featured_slider.owlCarousel({ // ============ Carousel Posts section
			responsiveRefreshRate: 10,
			navigation: true,
			pagination: false,
			itemSpaceWidth: 9,
			items: 3,
			itemsDesktop: [1200, 3],
			itemsDesktopSmall: [991, 2],
			itemsTablet: [740, 1],
			itemsMobile: [480, 1],
			afterInit: function(elem) {
				jQuery('#vn-featured-carousel').removeClass('loading');
			}
		});
	});
	var owl_gallery_slider = jQuery('.gallery-slider');
	owl_gallery_slider.owlCarousel({ // ==================== Gallery Slider
		responsiveRefreshRate: 10,
		navigation: true,
		pagination: false,
		autoHeight: true,
		items: 1,
		itemsDesktop: [1200, 1],
		itemsDesktopSmall: [991, 1],
		itemsTablet: [740, 1],
		itemsMobile: false,
		afterInit: function(elem) {
			jQuery('.single-gallery').removeClass('loading');
		}
	});
	var owl_widget_slider = jQuery('.yk-slider');
	owl_widget_slider.owlCarousel({ // ==================== Widget Slider
		responsiveRefreshRate: 10,
		navigation: true,
		pagination: false,
		autoHeight: false,
		transitionStyle: "fade",
		itemSpaceWidth: 6,
		items: 1,
		itemsDesktop: [1200, 1],
		itemsDesktopSmall: [991, 2],
		itemsTablet: [740, 2],
	});
	var owl_related_slider = jQuery('.sc-panels');
	owl_related_slider.owlCarousel({ // ============ Related Posts
		responsiveRefreshRate: 10,
		navigation: true,
		pagination: false,
		items: 3,
		itemSpaceWidth: 6,
		itemsDesktop: [1200, 3],
		itemsDesktopSmall: [991, 2],
		itemsTablet: [740, 1],
		itemsMobile: false
	});
});