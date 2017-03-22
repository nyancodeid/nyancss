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
			}
		},
		module: {
			checkConfig: function(conf) {
				if (ny == undefined || ny == null || "object" != typeof ny) {
					root.func.error('undefined nyancss config');
				}
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
	});

	
});