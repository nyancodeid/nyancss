var nyancss = {
	version: 'v0.6-beta',
	lastCommit: 'Marc 24, 2017',
	cdnLink: {
		css: 'https://cdnjs.com/nyancss/nyan.min.css',
		js: 'https://cdnjs.com/nyancss/nyan.min.js'
	},
	downloadLink: ''
}
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