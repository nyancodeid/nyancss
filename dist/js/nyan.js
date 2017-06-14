/*
 * nyancss 0.7.0-beta
 * Modern Light and Smooth CSS Framework
 * 
 *
 * Copyright 2017, Ryan Aunur Rassyid <ryandevstudio@gmail.com>
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
						$('html').on('click', function(event) {
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

}(jQuery));
// Plugin NyanCSS

/* jQuery-Tabslet - v1.7.3 
 * @author Dimitris Krestos <dkrestos@gmail.com>
 * @github https://github.com/vdw/Tabslet
 */
;(function($, window, undefined) {
  "use strict";
  $.fn.ny_tabs = function(options) {

    var defaults = {
      mouseevent:   'click',
      activeclass:  'active',
      attribute:    'href',
      pagination: 	false,
      animation:    false,
      autorotate:   false,
      deeplinking:  false,
      pauseonhover: true,
      delay:        1000,
      active:       1,
      container:    false,
      step: 				2,
      controls:     {
        prev: '.prev',
        next: '.next'
      }
    };

    var options = $.extend(defaults, options);
    var _cache_tabs = [0];
    var _cache_tabs__width = [];
    return this.each(function() {

      var $this      = $(this), _cache_li = [], _cache_div = [];
      var _container = options.container ? $(options.container) : $this;
      var _tabs      = _container.find('> .ny-tabs-container > div');

      _container.find('ul').addClass('ny-tabs-pagination');
      _container.find('ul').wrapAll('<div class="ny-tabs-canvas"></div>');

      var _header = _container.find('> .ny-tabs-header');
      // _pagination
      var _pagination = _container.find('> .ny-tabs-header .ny-tabs-pagination');

      // Caching
      _tabs.each(function() { _cache_div.push($(this).css('display')); });

      // Autorotate
      var elements = $this.find('> .ny-tabs-header ul > li:not(.tab-slider)'), i = options.active - 1; // ungly

      var moveto = function(elements, _this, i) {
      	var whatTab = i;
				var width = _this.outerWidth(true);
				var howFarLeft = 0;
				
				for (var i = elements.length - 1; i >= 0; i--) {
					if (i < whatTab) howFarLeft += elements.eq(i).outerWidth(true);
				};
				_this.find("~ .tab-slider").css({
					transform: 'translate('+howFarLeft+'px, 0px)',
					width: width
				});
      }

      if ( !$this.data( 'tabslet-init' ) ) {
        $this.data( 'tabslet-init', true );
        $this.opts = [];
        $.map( ['mouseevent', 'activeclass', 'attribute', 'animation', 'pagination','autorotate', 'deeplinking', 'pauseonhover', 'delay', 'container'], function( val, i ) {
          $this.opts[val] = $this.data(val) || options[val];
        });
        $this.opts['active'] = $this.opts.deeplinking ? deep_link() : ( $this.data('active') || options.active )
        _tabs.hide();
        if ( $this.opts.active ) {
          _tabs.eq($this.opts.active - 1).show();
          elements.eq($this.opts.active - 1).addClass(options.activeclass);
        }
        var wdth = elements.eq($this.opts.active - 1).outerWidth(true);
        elements.each(function(i) {
        	_cache_tabs__width.push($(this).outerWidth(true));
        	$(this).wrapInner('<span></span>');
        });

        ($this.opts.pagination) ? _container.find('.ny-tabs-header').addClass('active') : _container.find('.ny-tabs-header').removeClass('active');

        _pagination.append('<li class="tab-slider" style="width: '+wdth+'px"></li>');
        _header.prepend('<div class="ny-tabs-nav--back"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#333131" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></div>');
        _header.append('<div class="ny-tabs-nav--next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#333131" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></div>')

        moveto(elements, elements.eq(($this.opts.active - 1)), ($this.opts.active-1));

        var fn = eval(
          function(e, tab) {
            var _this = tab ? elements.find('a[' + $this.opts.attribute + '="' + tab +'"]').parent() : $(this);
            _this.trigger('_before');
            if (_this.data('disabled') ==  "" || _this.hasClass('disabled')) {
            	return false;
            }
            var _before_this = (elements.eq(_this.index() - 1) < 0) ? 0 : elements.eq(_this.index() - 1);
            var _after_this = (elements.eq(_this.index() + 1) > elements.length) ? elements.length : elements.eq(_this.index() + 1);

            _cache_tabs.push(_this.index());
            var _state = ((_this.index() + 1) == _cache_tabs[0]) ? 'right' : 'left';
            if (_state == 'right') _before_this.trigger('_before_tabs');
            if (_state == 'left') _after_this.trigger('_after_tabs');
            
            _cache_tabs = [_cache_tabs[1]];

            elements.removeClass(options.activeclass);
            _this.addClass(options.activeclass);
            _tabs.hide();
            i = elements.index(_this);
            var currentTab = tab || _this.find('a').attr($this.opts.attribute);
            if ($this.opts.deeplinking) location.hash = currentTab;

            if ($this.opts.animation) {

              _container.find(currentTab).animate( { opacity: 'show' }, 'slow', function() {
                _this.trigger('_after');
              });

            } else {
              _container.find(currentTab).show();
              _this.trigger('_after');
            }

						moveto(elements, _this, i);
            return false;
          }
        );

        var init = eval("elements." + $this.opts.mouseevent + "(fn)");
        init;
        var t;

        var forward = function() {
          i = ++i % elements.length; // wrap around
          $this.opts.mouseevent == 'hover' ? elements.eq(i).trigger('mouseover') : elements.eq(i).click();
          if ($this.opts.autorotate) {
            clearTimeout(t);
            t = setTimeout(forward, $this.opts.delay);
            $this.mouseover(function () {
              if ($this.opts.pauseonhover) clearTimeout(t);
            });
          }
        }

        if ($this.opts.autorotate) {
          t = setTimeout(forward, $this.opts.delay);
          $this.hover(function() {
            if ($this.opts.pauseonhover) clearTimeout(t);
          }, function() {
            t = setTimeout(forward, $this.opts.delay);
          });

          if ($this.opts.pauseonhover) $this.on( "mouseleave", function() { clearTimeout(t); t = setTimeout(forward, $this.opts.delay); });
        }

        function deep_link() {
          var ids = [];

          elements.find('a').each(function() { ids.push($(this).attr($this.opts.attribute)); });
          var index = $.inArray(location.hash, ids)
          if (index > -1) {
            return index + 1
          } else {
            return ($this.data('active') || options.active)
          }
        }

        var move = function(direction) {
          if (direction == 'forward') i = ++i % elements.length; // wrap around
          if (direction == 'backward') i = --i % elements.length; // wrap around

          elements.eq(i).click();
        }

        var _cache_moved = 0;
        var navigation = function(direction) {
        	var _transform, 
        			_nextPredic = (_cache_moved > 0) ? _cache_moved : 0, 
        			_backPredic = (_cache_moved > 0) ? _cache_moved : 0,
        			_nextControll = $this.find('.ny-tabs-nav--next'),
        			_backControll = $this.find('.ny-tabs-nav--back'),
        			_i = 0,
        			_canvas = _pagination.parent();
        	
        	var _far = options.step * _cache_tabs__width[0];
        	var _last_anchor = -((_pagination.outerWidth(true)-(_canvas.width()/2)));
        	var _start_anchor = -50;
        	
        	if (direction == "back") {
        		_backPredic = (_cache_moved + _far) > _start_anchor ? 0 : (_cache_moved + _far);
        		_cache_moved = _backPredic;
        	}
        	if (direction == "next") {
        		_nextPredic = ((_cache_moved - _far) < _last_anchor+100) ? _last_anchor : (_cache_moved - _far);	
        		_cache_moved = _nextPredic;
        	}
        	(_cache_moved == _last_anchor) ? _nextControll.addClass('ny-disabled') : _nextControll.removeClass('ny-disabled');
        	(_cache_moved == 0) ? _backControll.addClass('ny-disabled') : _backControll.removeClass('ny-disabled');
        	_pagination.css({
        		transform: "translate("+(_cache_moved)+"px, 0px)"
        	});
        }

        $this.find('.ny-tabs-nav--back').click(function() {
        	navigation('back');
	      });
	      $this.find('.ny-tabs-nav--next').click(function() {
	      	navigation('next');
        });

        $this.find(options.controls.next).click(function() {
          move('forward');
        });
        $this.find(options.controls.prev).click(function() {
          move('backward');
        });
        $this.on ('show', function(e, tab) {
          fn(e, tab);
        });
        $this.on ('next', function() {
          move('forward');
        });
        $this.on ('prev', function() {
          move('backward');
        });
        $this.on ('destroy', function() {
          $(this)
            .removeData()
            .find('> .ny-tabs-header > ul li').each( function(i) {
              $(this).removeClass(options.activeclass);
            });
          _tabs.each( function(i) {
            $(this).removeAttr('style').css( 'display', _cache_div[i] );
          });
        });
      }
    });
  };
  $(document).ready(function () { $('[data-component="ny-tabs"]').ny_tabs(); });
})(jQuery);

/*!
 * jQuery Accordion 0.0.1
 * (c) 2014 Victor Fernandez <victor@vctrfrnndz.com>
 * MIT Licensed.
 */
;(function ( $, window, document, undefined ) {
  var pluginName = 'ny_accordion',
    defaults = {
      transitionSpeed: 300,
      transitionEasing: 'ease',
      controlElement: '.ny-accordion--toggle',
      contentElement: '[data-content]',
      groupElement: '.ny-accordion-group',
      singleOpen: true
    };

  function Accordion(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Accordion.prototype.init = function () {
      var self = this,
          opts = self.options;

      var $accordion = $(self.element),
          $controls = $accordion.find('> ' + opts.controlElement),
          $content =  $accordion.find('> ' + opts.contentElement);

      var accordionParentsQty = $accordion.parents('.ny-accordion').length,
          accordionHasParent = accordionParentsQty > 0;

      var closedCSS = { 'max-height': 0, 'overflow': 'hidden' };

      var CSStransitions = supportsTransitions();

      function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            };

            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
      }

      function supportsTransitions() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition';

        if (typeof s[p] == 'string') {
            return true;
        }

        var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];

        p = 'Transition';

        for (var i=0; i<v.length; i++) {
            if (typeof s[v[i] + p] == 'string') {
                return true;
            }
        }

        return false;
      }

      function requestAnimFrame(cb) {
          if(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) {
              return  requestAnimationFrame(cb) ||
                      webkitRequestAnimationFrame(cb) ||
                      mozRequestAnimationFrame(cb);
          } else {
              return setTimeout(cb, 1000 / 60);
          }
      }

      function toggleTransition($el, remove) {
          if(!remove) {
              $content.css({
                  '-webkit-transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing,
                  'transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing
              });
          } else {
              $content.css({
                  '-webkit-transition': '',
                  'transition': ''
              });
          }
      }

      function calculateHeight($el) {
          var height = 0;

          $el.children().each(function() {
              height = height + $(this).outerHeight(true);
          });

          $el.data('oHeight', height);
      }

      function updateParentHeight($parentAccordion, $currentAccordion, qty, operation) {
          var $content = $parentAccordion.filter('.open').find('> [data-content]'),
              $childs = $content.find('.ny-accordion.open > [data-content]'),
              $matched;

          if(!opts.singleOpen) {
              $childs = $childs.not($currentAccordion.siblings('.ny-accordion.open').find('> [data-content]'));
          }

          $matched = $content.add($childs);

          if($parentAccordion.hasClass('open')) {
              $matched.each(function() {
                  var currentHeight = $(this).data('oHeight');

                  switch (operation) {
                      case '+':
                          $(this).data('oHeight', currentHeight + qty);
                          break;
                      case '-':
                          $(this).data('oHeight', currentHeight - qty);
                          break;
                      default:
                          throw 'updateParentHeight method needs an operation';
                  }

                  $(this).css('max-height', $(this).data('oHeight'));
              });
          }
      }

      function refreshHeight($accordion) {
          if($accordion.hasClass('open')) {
              var $content = $accordion.find('> [data-content]'),
                  $childs = $content.find('.ny-accordion.open > [data-content]'),
                  $matched = $content.add($childs);

              calculateHeight($matched);

              $matched.css('max-height', $matched.data('oHeight'));
          }
      }

      function closeAccordion($accordion, $content) {
          $accordion.trigger('accordion.close');
          
          if(CSStransitions) {
              if(accordionHasParent) {
                  var $parentAccordions = $accordion.parents('.ny-accordion');

                  updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '-');
              }

              $content.css(closedCSS);

              $accordion.removeClass('open');
          } else {
              $content.css('max-height', $content.data('oHeight'));

              $content.animate(closedCSS, opts.transitionSpeed);

              $accordion.removeClass('open');
          }
      }

      function openAccordion($accordion, $content) {
          $accordion.trigger('accordion.open');
          if(CSStransitions) {
              toggleTransition($content);

              if(accordionHasParent) {
                  var $parentAccordions = $accordion.parents('.ny-accordion');

                  updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '+');
              }

              requestAnimFrame(function() {
                  $content.css('max-height', $content.data('oHeight'));
              });

              $accordion.addClass('open');
          } else {
              $content.animate({
                  'max-height': $content.data('oHeight')
              }, opts.transitionSpeed, function() {
                  $content.css({'max-height': 'none'});
              });

              $accordion.addClass('open');
          }
      }

      function closeSiblingAccordions($accordion) {
          var $accordionGroup = $accordion.closest(opts.groupElement);

          var $siblings = $accordion.siblings('.ny-accordion').filter('.open'),
              $siblingsChildren = $siblings.find('.ny-accordion').filter('.open');

          var $otherAccordions = $siblings.add($siblingsChildren);

          $otherAccordions.each(function() {
              var $accordion = $(this),
                  $content = $accordion.find(opts.contentElement);

              closeAccordion($accordion, $content);
          });

          $otherAccordions.removeClass('open');
      }

      function toggleAccordion() {
          var isAccordionGroup = (opts.singleOpen) ? $accordion.parents(opts.groupElement).length > 0 : false;

          calculateHeight($content);

          if(isAccordionGroup) {
              closeSiblingAccordions($accordion);
          }

          if($accordion.hasClass('open')) {
              closeAccordion($accordion, $content);
          } else {
              openAccordion($accordion, $content);
          }
      }

      function addEventListeners() {
          $controls.on('click', toggleAccordion);
          
          $controls.on('accordion.toggle', function() {
              if(opts.singleOpen && $controls.length > 1) {
                  return false;
              }
              
              toggleAccordion();
          });
          
          $controls.on('accordion.refresh', function() {
              refreshHeight($accordion);
          });

          $(window).on('resize', debounce(function() {
              refreshHeight($accordion);
          }));
      }

      function setup() {
          $content.each(function() {
              var $curr = $(this);

              if($curr.css('max-height') != 0) {
                  if(!$curr.closest('.ny-accordion').hasClass('open')) {
                      $curr.css({ 'max-height': 0, 'overflow': 'hidden' });
                  } else {
                      toggleTransition($curr);
                      calculateHeight($curr);

                      $curr.css('max-height', $curr.data('oHeight'));
                  }
              }
          });

					if ($accordion.attr('data-arrow-color')) {
						var $index = Math.round(Math.random() * 100);
						$controls.addClass('ny-accordion__' + $index);
						$('head').append('<style>.ny-accordion > .ny-accordion--toggle.ny-accordion__'+$index+':after {background: url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="'+$accordion.data('arrow-color')+'" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>\') center center no-repeat;}</style>');
					}

          opts.singleOpen = ($accordion.data('open') == "single") ? true : true;
          opts.singleOpen = ($accordion.data('open') == "multi") ? false : true;

          if(!$accordion.attr('data-accordion')) {
              $accordion.attr('data-accordion', '');
              $accordion.find(opts.controlElement).attr('data-control', '');
              $accordion.find(opts.contentElement).attr('data-content', '');
          }
      }

      setup();
      addEventListeners();
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName,
            new Accordion( this, options ));
        }
    });
  }
  $(document).ready(function() {$('[data-component="ny-accordion"] > .ny-accordion').ny_accordion()})
})( jQuery, window, document );

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
			tableResponsive: function() {
				$('table.ny-table--responsive').each(function() {
					$(this).removeClass('.ny-table--responsive').wrapAll('<div class="ny-table--responsive-wrap"></div>');
				});
			},
      navbarHandler: function() {
        $('.ny-navbar').find(".ny-navbar--menu > li > a[data-toggle='dropdown']").addClass("toggle-parent");
        $('.ny-navbar').find("li > a[data-toggle='dropdown']").click(function(event) {
          var parent = $(this).parents(".ny-navbar");
          event.preventDefault();

          if ($(this).hasClass("active")) {
            $(this).removeClass("active");

            if ($(this).hasClass("toggle-parent")) {
              parent.find('[data-toggle="dropdown"].active').removeClass('active');
            }
          } else {
            $(this).addClass("active");
          }

          $('html').on('click', function(event) {
            if (!($(event.target).parents('.ny-navbar').length == 1)) {
              parent.find('[data-toggle="dropdown"].active').removeClass('active');
            }
          });
        });

        $('.ny-navbar--collapse').click(function(event) {
          event.preventDefault();

          $(this).parents(".ny-navbar").toggleClass("collapsed");
        });
      }
		}
	};
	

  $(document).ready(function() {  
    // table Responsive
    root.module.tableResponsive();
    root.module.navbarHandler();
    
  });
});
