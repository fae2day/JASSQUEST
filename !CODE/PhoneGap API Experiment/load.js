/*
 *	Phonegap Test App
 *	load.js
 */

if (!isTouchSupported){
	window.onload = function(){
		new Client();
	};
}
else{
	document.addEventListener('deviceReady', function(){
		new Client();
	});
}