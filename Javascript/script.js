	var clock = document.getElementById('clock'),
		tl = new TimelineMax({paused: true}),
		dot = document.getElementsByClassName('dot'),
		loader = document.getElementById('loader'),
		main = document.getElementsByTagName('main'),
		header = document.getElementsByTagName('header')
		footer = document.getElementsByTagName('footer'),
		p0 = document.getElementById('p0'),
		p1 = document.getElementById('p1'),
		p2 = document.getElementById('p2'),
		p3 = document.getElementById('p3'),
		p4 = document.getElementById('p4'),
		p5 = document.getElementById('p5'),
		p6 = document.getElementById('p6');

		tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});

//Timeline
	tl
		.set(main, {autoAlpha:1})
		.fromTo(header,1,{autoAlpha:0, y:-100}, {autoAlpha:1, y:0})
		.fromTo(footer,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		/*.fromTo(p0,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p1,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p2,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p3,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p4,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p5,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')
		.fromTo(p6,1,{autoAlpha:0, y:100}, {autoAlpha:1, y:0}, '-=1')*/
		.from(clock, 1, {autoAlpha:0, x:-500, y:-100, ease:Back.easeNone, fontSize:0}) //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
		.to(clock,1, {fontSize:40, ease:Power4.easeOut}, '-=0.15');
		 //3,2,1 absolute position

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

}
/*
// set timeline
var timeline = new TimelineMax({ repeat: -1, ease: Power0.easeNone });

// amimate timeline
timeline.to('.clouds', 1, { opacity: 1})
		.from('.layer-1', 200, { backgroundPositionX: 2400}, 'clouds')
		.from('.layer-2', 300, { backgroundPositionX: 1200}, 'clouds');
*/

function initiateClock() {

	// init
	getTime();

	// run every second
	setInterval(getTime, 1000);
}

function getTime() {
	var d = new Date();
	var time = d.toLocaleTimeString();
	document.getElementById('clock').innerHTML = time;
	return d;
}

function dynamicBackground(){
	var hour = getTime().getHours(),
		minutes = getTime().getMinutes(),
		backgroundTl = new TimelineMax(),
		body = document.getElementsByTagName('body');
	console.log(hour + ':' + minutes);
	



	if(hour<5  || hour>19 ){
 	backgroundTl.to(body,1,{backgroundColor:"#001848"});
		console.log('night');
	}else if(hour==5){
		if(minutes<30){
 			backgroundTl.to(body,1,{backgroundColor:"#001848"});
			console.log('night');
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			console.log('dawn');
		}
	}else if((hours>6 && hours<7)||(hours>18 &&hours<19)){
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			console.log('dusk/dawn');		
	}else if(hours==17){
		if(minutes<30){
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
			console.log('day');
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
			console.log('dusk');
		}
	}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
		console.log('day');
	}
	
/*
	switch(true){
		case((hour<5 && minutes>30) || hour>19):
		//document.getElementById('clock').style.color ='white';
		document.body.style.backgroundColor = "#001848";
		console.log('lol');
		break;
		case(hour>=7 && hour<=17):
		console.log('yay');
		break;
		default:
		console.log('ok');
	}*/
}

initiateClock();

	//console.log(sunrise);
	
