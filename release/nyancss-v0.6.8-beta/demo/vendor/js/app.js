var nyancss = {
	version: 'v0.6.8-beta',
	lastCommit: 'March 27, 2017',
	cdnLink: {
		css: 'https://cdn.rawgit.com/nyancodeid/nyancss/34a7ebc7/css/nyan.min.css',
		js: 'https://cdn.rawgit.com/nyancodeid/nyancss/34a7ebc7/js/nyan.min.js'
	},
	downloadLink: 'https://github.com/nyancodeid/nyancss/releases'
}

$(document).ready(function() {
	var cdnE = document.getElementById('cdnLink');
	cdnE.innerText = cdnE.innerText.replace('-linkcss-', nyancss.cdnLink.css);
	cdnE.innerText = cdnE.innerText.replace('-linkjs-', nyancss.cdnLink.js);

	var downE = document.getElementById('downloadLink');
	downE.href = nyancss.downloadLink;
	downE.innerText = downE.innerText.replace('-VERSION-', nyancss.version);

	var versE = document.querySelector('.version');
	versE.innerText = nyancss.version;

	var lastE = document.querySelector('.lastCommit');
	lastE.innerText = nyancss.lastCommit;

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
});