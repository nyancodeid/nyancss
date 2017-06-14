/*
 * nyancss 0.6-beta
 * Modern Light and Smooth CSS Framework
 * 
 *
 * Copyright 2017, Ryan Aunur Rassyid
 * Released under the MIT license.
*/

if (typeof(ny) == 'undefined' || ny == null || typeof(ny) != 'object') {throw new Error('nyancode config is undefined');}
var root;
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
			checkConfig: function(conf) {
				if (ny == undefined || ny == null || "object" != typeof ny) {
					root.func.error('undefined nyancss config');
				}
			},
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
			tableResponsive: function() {
				$('table[data-responsive]').wrapAll('<div class="ny-table--responsive"></div>');
			},
			tableResponsiveConfig: function() {
				if (ny.config.tableResponsive != undefined || ny.config.tableResponsive != null || ny.config.tableResponsive == true) {
					$('table[class*="ny-table"]').not('.ny-table-content table[class*="ny-table"]').each(function() {
						$(this).wrapAll('<div class="ny-table--responsive"></div>');
					});
				};
			}
		}
	};
	

	$(document).ready(function() {	
		$('[data-trigger="openmenu"]').click(function(e) {
			$('[data-trigger="openmenu"]').each(function() {
				if (e.target != this) {
					$(this).removeClass('active');
				}
			});
			$('html').on('click', function() {
				if (!($(event.target).parents('.ny-openmenu--container').length == 1)) {
					$('[data-trigger="openmenu"].active').removeClass('active');
				}
			})
			$(this).toggleClass('active');
			e.stopPropagation();
		});

		/*ripple*/
		$(".ny-button[data-ripple]").click(function(e) {
			$(".ripple").remove();

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
		});

		/*accordion init*/
		root.module.accordionInit();

		/*table responsive*/
		root.module.tableResponsive();
		root.module.tableResponsiveConfig();
	});

	
});