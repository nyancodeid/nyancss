var nyancss = {
	version: 'v0.6.9-beta',
	lastCommit: 'April 2, 2017',
	cdnLink: {
		css: 'https://cdn.rawgit.com/nyancodeid/nyancss/103cf9ca/dist/css/nyan.min.css',
		js: 'https://cdn.rawgit.com/nyancodeid/nyancss/103cf9ca/dist/js/nyan.min.js'
	},
	downloadLink: 'https://github.com/nyancodeid/nyancss/releases'
}

$(document).ready(function() {
	var cdnE = $('#cdnLink');
	cdnE.text(cdnE.text().replace('-linkcss-', nyancss.cdnLink.css));
	cdnE.text(cdnE.text().replace('-linkjs-', nyancss.cdnLink.js));

	var downE = $('#downloadLink');
	downE.attr('href', nyancss.downloadLink);
	downE.text(downE.text().replace('-version-', nyancss.version));

	$('.version').text(nyancss.version);
	$('.lastCommit').text(nyancss.lastCommit);

	$.openMenu({
		outsideClick: true
	});
	
	var dPanel = $('#demo-panel');
	var dMoni = $('#demo-monitor');
	var dNav = $('#demo-flex-nav .ny-code');
	function predic() {
		var w = dMoni.attr('class').split(/\s+/);
		var o;
		$.each(w, function(i, g) {
			if (g.indexOf("ny-layout-align--") == 0) {
				o = g;
			}
		});
		return o;
	}

	dPanel.find('[name="layout"]').change(function() {
		if ($(this).is(':checked')) {
			dMoni.removeClass('ny-flex--row');
			dMoni.removeClass('ny-flex--col');
			dMoni.addClass('ny-flex--'+$(this).val());
			if ($(this).val() == 'row') {
				dPanel.find('#alignmentCol2').text('horizontal');
				dPanel.find('#alignmentCol3').text('vertical');
			} else {
				dPanel.find('#alignmentCol2').text('vertical');
				dPanel.find('#alignmentCol3').text('horizontal');
			} 
			dNav.text('class="'+dMoni.attr('class')+'"');
		}
	});
	dPanel.find('[name="layoutDir"]').change(function(e) {
		if ($(this).is(':checked')) {;
			dMoni.removeClass(predic());
			dMoni.addClass('ny-layout-align--'+$(this).find('~ label').text()+'-'+dPanel.find('[name="layoutPer"]:checked').find('~ label').text());
			dNav.text('class="'+dMoni.attr('class')+'"');
		}
	});
	dPanel.find('[name="layoutPer"]').change(function(e) {
		if ($(this).is(':checked')) {;
			dMoni.removeClass(predic());
			dMoni.addClass('ny-layout-align--'+dPanel.find('[name="layoutDir"]:checked').find('~ label').text()+'-'+$(this).find('~ label').text());
			dNav.text('class="'+dMoni.attr('class')+'"');
		}
	});

	$('.demo-1').ny_tabs({
		active: 3
	});
	$('.demo-2').ny_tabs({
		pagination: true
	});
	$('.demo-1 .ny-accordion').ny_accordion();
	$('.demo-2 .ny-accordion').ny_accordion({
		singleOpen: false
	})

});