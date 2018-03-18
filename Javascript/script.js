	var clock = document.getElementById('clock'),
		tl = new TimelineMax({paused: true}),
		dot = document.getElementsByClassName('dot'),
		loader = document.getElementById('loader'),
		main = document.getElementsByTagName('main'),
		header = document.getElementsByTagName('header')
		footer = document.getElementsByTagName('footer'),
		earth = document.getElementById('earth'),
		mars = document.getElementById('mars'),
		rocket = document.getElementById('rocket'),
		clouds = document.getElementsByClassName('clouds'),
		tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});

//Timeline
	tl
		.set(main, {autoAlpha:1})
		.fromTo(header,1,{autoAlpha:0, y:-100}, {autoAlpha:1, y:0})
		.fromTo(footer,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(earth,1,{autoAlpha:0, x:-100}, {autoAlpha:1, x:0})
		.fromTo(mars,1,{autoAlpha:0, x:100}, {autoAlpha:1, x:0}, '-=1')
		.fromTo(clouds,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.from(clock, 1, {autoAlpha:0, x:-500, y:-100, ease:Back.easeNone, fontSize:0}) //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
		.to(clock,1, {fontSize:32, ease:Power4.easeOut}, '-=0.15') //3,2,1 absolute position		
		.fromTo(rocket,4,{autoAlpha:0, x:-1000, y:1000}, {autoAlpha:1, x:0, y:0})
		.fromTo(rocket,0.01,{x:-0.75}, {x:0.75, clearProps:"x", repeat:-1});

//Loader Timeline
	tlLoader
		.staggerFromTo(dot, 0.3,
					{y: 0, autoAlpha:0},
					{y: 20, autoAlpha: 1, ease:Back.easeInOut},
					0.05
					)
		.fromTo(loader, 0.3,
				{autoAlpha:1, scale:1},
				{autoAlpha:0, scale:0.7, ease:Power0.easeNone},
				0.9
				);

function loadContent(){
var tlLoaderOut = new TimelineMax({onComplete: contentIn});
	tlLoaderOut
			.set(dot,{backgroundColor:'#222222'})
			.to(loader, 0.3, {autoAlpha:1, scale:1, ease:Power0.easeNone})
			.staggerFromTo(dot, 0.3,
						{y: 0, autoAlpha:0},
						{y: 20, autoAlpha: 1, ease:Back.easeInOut},
						0.05, 
						)
			.to(loader, 0.3, {y:-150,x:-150,autoAlpha:0, ease:Back.easeIn},'+=0.3');
}		

function contentIn(){
	tl.play();
	dynamicBackground();
	setInterval(dynamicBackground,1000);
	createClouds();
}

function createClouds(){

// set timeline
var timeline = new TimelineMax({ repeat: -1, ease: Power0.easeNone });

// amimate timeline
timeline.to('.clouds', 1, { opacity: 1})
		.from('.layer-1', 300, { backgroundPositionX: 600}, 'clouds')
		.from('.layer-2', 300, { backgroundPositionX: 600}, 'clouds');
}


function initiateClock() {

	// init
	getTime();

	// run every second
	setInterval(getTime, 1000);
}

function getTime() {
	var d = new Date();
	var time = d.toLocaleTimeString();
	document.getElementById('clockDigits').innerHTML = time;
	return d;
}

function dynamicBackground(){
	var hour = getTime().getHours(),
		minutes = getTime().getMinutes(),
		backgroundTl = new TimelineMax(),
		body = document.getElementsByTagName('body');
	//console.log(hour + ':' + minutes);
	



	if(hour<5  || hour>19 ){
 	backgroundTl.to(body,1,{backgroundColor:"#001848"});
		//console.log('night');
	}else if(hour==5){
		if(minutes<30){
 			backgroundTl.to(body,1,{backgroundColor:"#001848"});
			//console.log('night');
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			//console.log('dawn');
		}
	}else if((hour>6 && hour<7)||(hour>18 &&hour<19)){
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			//console.log('dusk/dawn');		
	}else if(hour==17){
		if(minutes<30){
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
			//console.log('day');
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			//console.log('dusk');
		}
	}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
		//console.log('day');
	}
	
}

initiateClock();

	
