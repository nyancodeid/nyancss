/*
 * nyancss 0.6.8-beta
 * Modern Light and Smooth CSS Framework
 * 
 *
 * Copyright 2017, Ryan Aunur Rassyid
 * Released under the MIT license.
*/

var root;
(function ($) {
    "use strict";
    $.openMenu = function(config) {
    	if ("object" != typeof config && "undefined" != typeof config) {root.func.error('openmenu config type not object')}
    	if ("undefined" == typeof config) {
    		// Default config 
    		var config = {
    			outsideClick: false
    		};
    	}
    	$('[data-trigger="openmenu"]').click(function(e) {
			$('[data-trigger="openmenu"]').each(function() {
				if (e.target != this) {
					$(this).removeClass('active');
				}
			});
			if (config.outsideClick != undefined) {
				if (config.outsideClick) {
					$('html').on('click', function() {
						if (!($(event.target).parents('.ny-openmenu--container').length == 1)) {
							$('[data-trigger="openmenu"].active').removeClass('active');
						}
					});
				}
			}
			$(this).toggleClass('active');
			e.stopPropagation();
		});
    };
    $.tabs = function() {
    	var tabs = $('.ny-tabs');
    	var tabsI = tabs.find('.ny-tabs-header');

		tabsI.each(function() {
			$(this).find('ul').addClass('ny-tabs-pagination');
			$(this).find('ul').wrapAll('<div class="ny-tabs-canvas"></div>');

			if ($(this).find('.ny-tabs-pagination li.tab-slider').length == 0) {
				var items = $(this).find('.ny-tabs-pagination li:not(.tab-slider)');
				var child = items.length;

				$(this).find('.ny-tabs-pagination').append('<li class="tab-slider" style="width:'+(100/child)+'%"></li>');
			}

			$(this).find('.ny-tabs-pagination li:not(.tab-slider)').each(function() {
				$(this).wrapInner('<span></span>');
				if ($(this).is('[data-default]')) {
					toTabs(this);
				} else if ($(this).is('[data-disabled]')) {
					$(this).addClass('ny-tabs--disabled');
				}
			});
		});

		function toTabs(that) {
			var targetContent, tabsType;
			var tabsContent = $(that).parents('.ny-tabs').data('tabs-content');
			var parents = $(that).parents('.ny-tabs');
    		if (tabsContent == "byTarget") {
    			targetContent = $(that).data('target');
    			tabsType = 'target';
    		} else if (tabsContent == "byIndex") {
    			tabsType = 'index';
    		}
    		var sel = $(that).parent().find('li').not('.tab-slider');
			var whatTab = $(that).index();
			var width = $(that).outerWidth(true);
			var howFarLeft = 0;
			for (var i = sel.length - 1; i >= 0; i--) {
				sel.eq(i).removeClass('active');
				if (i < whatTab) {
					howFarLeft += sel.eq(i).outerWidth(true);
				}
			};
			setTimeout(function() {
				parents.find(".tab-slider").css({
					left: howFarLeft + "px"
				});
			}, 150);

			var whatTarget = $(that).index();
			parents.find('.ny-tabs-container li').each(function() {
				if (tabsType == "index") {
					if ($(this).index() == whatTarget) {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else if (tabsType == "target") {
					if (targetContent == $(this).data('tabs')) {
						$(this).show();
					} else {
						$(this).hide();
					}
				}
			});

		}

		$(".ny-tabs .ny-tabs-header .ny-tabs-pagination li").click(function(e) {
			var targetContent, tabsType;
			var parents = $(this).parents('.ny-tabs');

			if ($(this).hasClass('tab-slider')) {
			    return;
			} else if ($(this).hasClass('ny-tabs--disabled')) {
				return;
			}

			var tabsContent = $(this).parents('.ny-tabs').data('tabs-content');
    		if (tabsContent == "byTarget") {
    			targetContent = $(this).data('target');
    			tabsType = 'target';
    		} else if (tabsContent == "byIndex") {
    			tabsType = 'index';
    		} else {

    		}

			var sel = $(this).parent().find('li').not('.tab-slider');
			var whatTab = $(this).index();
			var width = $(this).outerWidth(true);
			var howFarLeft = 0;
			for (var i = sel.length - 1; i >= 0; i--) {
				sel.eq(i).removeClass('active');
				if (i < whatTab) {
					howFarLeft += sel.eq(i).outerWidth(true);
				}
			};

			$(".ripple").remove();
			$(this).addClass('active');

			var posX = $(this).offset().left,
			    posY = $(this).offset().top,
			    buttonWidth = $(this).width(),
			    buttonHeight = $(this).height();
		    $(this).prepend("<span class='ripple'></span>");

			if (buttonWidth >= buttonHeight) {
			    buttonHeight = buttonWidth;
			} else {
			    buttonWidth = buttonHeight;
			}

			var x = e.pageX - posX - buttonWidth / 2;
			var y = e.pageY - posY - buttonHeight / 2;

			$(".ripple").css({
			    width: buttonWidth,
			    height: buttonHeight,
			    top: y + 'px',
			    left: x + 'px'
			}).addClass("rippleEffect");

			setTimeout(function() {
				parents.find(".tab-slider").css({
					left: howFarLeft + "px"
				});
			}, 150);

			var whatTarget = $(this).index();
			parents.find('.ny-tabs-container li').each(function() {
				if (tabsType == "index") {
					if ($(this).index() == whatTarget) {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else if (tabsType == "target") {
					if (targetContent == $(this).data('tabs')) {
						$(this).show();
					} else {
						$(this).hide();
					}
				}
			});
		});
    }
}(jQuery));
$(function() {
	root = {
		func: {
			info: function(msg) {
				console.info(msg);
			},
			log: function(msg) {
				console.log(msg);
			},
			error: function(msg) {
				throw new Error(msg);
			},
			w: function(msg) {
				if (isDebug()) {console.log(msg)}
			},
			hasAttr: function(s, a) {
				var attr = s.attr(a);
				if (typeof attr !== typeof undefined && attr !== false) {
					return true;
				} else {
					return false;
				}
			}
		},
		module: {
			accordionInit: function() {
				var accM = $('.ny-accordion--multiple');
				var accS = $('.ny-accordion');

				accM.each(function(h) {
					$(this).find('.ny-accordion-item').each(function(i) {
						var id = Math.floor(Math.random()*1000);
						if (root.func.hasAttr($(this), 'data-default')) {
							$(this).prepend('<input type="checkbox" id="tabs-m-'+(i+1)+'-'+id+'" checked>');
						} else {
							$(this).prepend('<input type="checkbox" id="tabs-m-'+(i+1)+'-'+id+'">');
						}
						$(this).find('label').attr('for', 'tabs-m-'+(i+1)+'-'+id).wrapAll('<div class="ny-accordion--head"></div>');
					});
				});
				accS.each(function(y) {
					$(this).find('.ny-accordion-item').each(function(i) {
						var id = Math.floor(Math.random()*1000);
						if (root.func.hasAttr($(this), 'data-default')) {
							$(this).prepend('<input type="radio" id="tabs-s-'+(i+1)+'-'+id+'" checked name="nyAccordion-'+y+'">');
						} else {
							$(this).prepend('<input type="radio" id="tabs-s-'+(i+1)+'-'+id+'" name="nyAccordion-'+y+'">');
						}
						$(this).find('label').attr('for', 'tabs-s-'+(i+1)+'-'+id).wrapAll('<div class="ny-accordion--head"></div>');;
						
						var con = $(this).find('.ny-accordion-content--auto');
						var contentHeight = 0;
						con.children().each(function() {
							contentHeight += $(this).outerHeight(true);
						});
						con.attr('data-height', contentHeight+'px');
					});
				});
			},
			tabsInit: function() {
				var tabsI = $('.ny-tabs ul.ny-tabs-header');
				tabsI.each(function() {
					if ($(this).find('.tab-slider').length == 0) {
						var child = $(this).find('li:not(.tab-slider)').length;
						$(this).append('<li class="tab-slider" style="width:'+(100/child)+'%"></li>');
					}
				});
			}
		}
	};
	

	$(document).ready(function() {	

		/*accordionInit*/
		root.module.accordionInit();

		/*tabs init*/
		$.tabs();
	});
});
