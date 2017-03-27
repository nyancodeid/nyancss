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
		outsideClick: false
	});
	
});