	var clock = document.getElementById('clock');
	var tl = new TimelineMax();
	tl.from(clock, 1, {autoAlpha:0, x:-500, y:-100, ease:Back.easeNone, fontSize:1}) //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
			.to(clock,2, {fontSize:50, ease:Power4.easeOut}, '-=0.15'); //3,2,1 absolute position
/*
// set timeline
var timeline = new TimelineMax({ repeat: -1, ease: Power0.easeNone });

// amimate timeline
timeline.to('.clouds', 1, { opacity: 1})
		.from('.layer-1', 200, { backgroundPositionX: 2400}, 'clouds')
		.from('.layer-2', 300, { backgroundPositionX: 1200}, 'clouds');
*/


function getTime() {
	var d = new Date();
	var time = d.toLocaleTimeString();
	return time;
}

window.onload = function(){
	document.getElementById('clock').innerHTML = getTime();
};