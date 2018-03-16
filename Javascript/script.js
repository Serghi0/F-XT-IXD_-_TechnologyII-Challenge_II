	var clock = document.getElementById('clock'),
		tl = new TimelineMax({paused: true}),
		dot = document.getElementsByClassName('dot'),
		loader = document.getElementById('loader'),
		main = document.getElementsByTagName('main');
		tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});

//Timeline
	tl
		.set(main, {autoAlpha:1})
		.from(clock, 1, {autoAlpha:0, x:-500, y:-100, ease:Back.easeNone, fontSize:1}) //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
		.to(clock,2, {fontSize:50, ease:Power4.easeOut}, '-=0.15'); //3,2,1 absolute position
//Loader Timeline
	tlLoader
		.staggerFromTo(dot, 0.3,
					{y: 0, autoAlpha:0},
					{y: 20, autoAlpha: 1, ease:Back.easeInOut},
					0.05
					)
		.fromTo(loader, 0.3,
				{autoAlpha:1, scale:1.3},
				{autoAlpha:0, scale:1, ease:Power0.easeNone},
				0.9
				);

function loadContent(){
var tlLoaderOut = new TimelineMax({onComplete: contentIn});
	tlLoaderOut
			.set(dot,{backgroundColor:'#000000'})
			.to(loader, 0.3, {autoAlpha:1, scale:1.3, ease:Power0.easeNone})
			.staggerFromTo(dot, 0.3,
						{y: 0, autoAlpha:0},
						{y: 20, autoAlpha: 1, ease:Back.easeInOut},
						0.05, 
						)
			.to(loader, 0.3, {y:-150,autoAlpha:0, ease:Back.easeIn},'+=0.3');
}		

function contentIn(){
	tl.play();
}
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