var clock = document.getElementsByClassName('clockDigits'),
	buttons = document.getElementById('buttonGroup'),
	date = document.getElementById('date'),
	tl = new TimelineMax({paused: true}),
	dot = document.getElementsByClassName('dot'),
	loader = document.getElementById('loader'),
	main = document.getElementsByTagName('main'),
	header = document.getElementsByTagName('header'),
	footer = document.getElementsByTagName('footer'),
	earth = document.getElementById('earth'),
	mars = document.getElementById('mars'),
	rocket = document.getElementById('rocket'),
	tlLoader = new TimelineMax({repeat:2, onComplete: loadContent});

//Timeline
tl
	.set(main, {autoAlpha:1})
	.fromTo(earth,1,{autoAlpha:0, x:-100}, {autoAlpha:1, x:0})
	.fromTo(mars,1,{autoAlpha:0, x:100}, {autoAlpha:1, x:0}, '-=1') //3,2,1 absolute position
	.fromTo(clock, 1.25, {autoAlpha:0, x:-500, y:-100, ease:Back.easeNone},{autoAlpha:1, ease:Power4.easeOut,x:0,y:0}) //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
	.fromTo(buttons, 1.25, {autoAlpha:0, x:500, y:100, ease:Back.easeNone},{autoAlpha:1, ease:Power4.easeOut,x:0,y:0},'-=1') //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
	.fromTo(date, 1.25, {autoAlpha:0, x:-500, y:100, ease:Back.easeNone},{autoAlpha:1, ease:Power4.easeOut,x:0,y:0},'-=1') //ease:Power0.easeNone, easeOut, easeIn, Power1 or 2 or 3 or 4
	.fromTo(header,1,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0})
	.fromTo(footer,1,{autoAlpha:0, y:10}, {autoAlpha:1, y:0}, '-=1')		
	.fromTo(rocket,3,{autoAlpha:0, x:-1000, y:500}, {ease:Power4.easeInOut,autoAlpha:1, x:0, y:0})
	.fromTo(rocket,0.01,{x:-0.75}, {x:0.75, clearProps:"x", repeat:-1,});

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
				0.9);

function loadContent(){
var tlLoaderOut = new TimelineMax({onComplete: contentIn});
	tlLoaderOut
		.set(dot,{backgroundColor:'#222222'})
		.to(loader, 0.3, {autoAlpha:1, scale:1, ease:Power0.easeNone})
		.staggerFromTo(dot, 0.3,
					{y: 0, autoAlpha:0},
					{y: 20, autoAlpha: 1, ease:Back.easeInOut},
					0.05,)
		.to(loader, 0.3, {y:-150,x:-150,autoAlpha:0, ease:Back.easeIn},'+=0.3');
}		

function contentIn(){
	tl.play();
	initiate();
}

function initiate() {
	// init
	setTime();
	// run every second
	setInterval(setTime, 1000);
	dynamicBackground();
	setInterval(dynamicBackground,1000);
	getDate();
	setInterval(getDate, 1000);	
}





function setTime(){
	var d = new Date(),	
	hours = d.getHours(),
	minutes =d.getMinutes(),
	seconds = d.getSeconds(),	
	n1 = d.getUTCHours(hours),
	n2 = d.getUTCMinutes(minutes);

switch(true){
	case(document.getElementById('GMTDigits')!==null):
		n1=n1;
		document.getElementById('GMTDigits').innerHTML = pad(n1,2) + ":" + pad(n2,2) +":" + pad(seconds,2);
		return n1;
	case(document.getElementById('CETDigits')!==null):
		if(n1==23){
			n1=-1;}
		n1= n1+1;
		document.getElementById('CETDigits').innerHTML = pad(n1,2) + ":" + pad(n2,2) +":" + pad(seconds,2);
		return n1;
	case(document.getElementById('ESTDigits')!==null):
		if(n1==0){n1=24;}
		else if(n1==1){n1=25}
		else if(n1==2){n1=26}
		else if(n1==3){n1=27}
		else if(n1==4){n1=28}
		else if(n1==5){n1=29};			
		n1= n1-5;	
		document.getElementById('ESTDigits').innerHTML = pad(n1,2) + ":" + pad(n2,2) +":" + pad(seconds,2);
		return n1;
	case(document.getElementById('EDTDigits')!==null):
		if(n1==0){n1=24;}
		else if(n1==1){n1=25}
		else if(n1==2){n1=26}
		else if(n1==3){n1=27}
		else if(n1==4){n1=28}
		else if(n1==5){n1=29};
		n1= n1-4;
		document.getElementById('EDTDigits').innerHTML = pad(n1,2) + ":" + pad(n2,2) +":" + pad(seconds,2);
		return n1;
	case(document.getElementById('PDTDigits')!==null):
		if(n1==0){n1=24;}
		else if(n1==1){n1=25}
		else if(n1==2){n1=26}
		else if(n1==3){n1=27}
		else if(n1==4){n1=28}
		else if(n1==5){n1=29}
		else if(n1==6){n1=30};			
			n1= n1-7;	
		document.getElementById('PDTDigits').innerHTML = pad(n1,2) + ":" + pad(n2,2) +":" + pad(seconds,2);
		return n1;
	default:
		document.getElementById('defaultDigits').innerHTML = pad(hours,2) + ":" + pad(minutes,2) +":" + pad(seconds,2);
		return hours;

};
}

GMT.onclick =function(){
	switch(true){
	case(document.getElementById('defaultDigits')!==null):
		document.getElementById("defaultDigits").id = "GMTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('CETDigits')!==null):
		document.getElementById("CETDigits").id = "GMTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('ESTDigits')!==null):
		document.getElementById("ESTDigits").id = "GMTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('EDTDigits')!==null):
		document.getElementById("EDTDigits").id = "GMTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('PDTDigits')!==null):
		document.getElementById("PDTDigits").id = "GMTDigits";
		dynamicBackground();
		break;					
};
	};
CET.onclick =function(){
	switch(true){
	case(document.getElementById('defaultDigits')!==null):
		document.getElementById("defaultDigits").id = "CETDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('GMTDigits')!==null):
		document.getElementById("GMTDigits").id = "CETDigits";
		dynamicBackground();
		break;
	case(document.getElementById('ESTDigits')!==null):
		document.getElementById("ESTDigits").id = "CETDigits";
		dynamicBackground();
		break;
	case(document.getElementById('EDTDigits')!==null):
		document.getElementById("EDTDigits").id = "CETDigits";
		dynamicBackground();
		break;
	case(document.getElementById('PDTDigits')!==null):
		document.getElementById("PDTDigits").id = "CETDigits";
		dynamicBackground();
		break;					
};
	};
EST.onclick =function(){
	switch(true){
	case(document.getElementById('defaultDigits')!==null):
		document.getElementById("defaultDigits").id = "ESTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('CETDigits')!==null):
		document.getElementById("CETDigits").id = "ESTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('GMTDigits')!==null):
		document.getElementById("GMTDigits").id = "ESTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('EDTDigits')!==null):
		document.getElementById("EDTDigits").id = "ESTDigits";
		dynamicBackground();		
		break;
	case(document.getElementById('PDTDigits')!==null):
		document.getElementById("PDTDigits").id = "ESTDigits";
		dynamicBackground();		
		break;					
};
	};
EDT.onclick =function(){
	switch(true){
	case(document.getElementById('defaultDigits')!==null):
		document.getElementById("defaultDigits").id = "EDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('CETDigits')!==null):
		document.getElementById("CETDigits").id = "EDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('ESTDigits')!==null):
		document.getElementById("ESTDigits").id = "EDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('GMTDigits')!==null):
		document.getElementById("GMTDigits").id = "EDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('PDTDigits')!==null):
		document.getElementById("PDTDigits").id = "EDTDigits";
		dynamicBackground();
		break;					
};
	};
PDT.onclick =function(){
	switch(true){
	case(document.getElementById('defaultDigits')!==null):
		document.getElementById("defaultDigits").id = "PDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('CETDigits')!==null):
		document.getElementById("CETDigits").id = "PDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('ESTDigits')!==null):
		document.getElementById("ESTDigits").id = "PDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('EDTDigits')!==null):
		document.getElementById("EDTDigits").id = "PDTDigits";
		dynamicBackground();
		break;
	case(document.getElementById('GMTDigits')!==null):
		document.getElementById("GMTDigits").id = "PDTDigits";
		dynamicBackground();
		break;					
	};
};			
	
function pad(number, length) { 
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getDate(){
	var d = new Date(),
		mm = d.getMonth() + 1,
		dd = d.getDate(),
		yy = d.getFullYear();
		document.getElementById('dateDigits').innerHTML = pad(dd,2) + '-' + pad(mm,2) +'-' + pad(yy,4);
		//console.log(pad(dd,2) + '-' + pad(mm,2) +'-' + pad(yy,4));
		return d;
}



function dynamicBackground(){
	var hour = setTime(),
		d= new Date(),
		minutez = d.getMinutes(),
		backgroundTl = new TimelineMax(),
		body = document.getElementsByTagName('body');

	if(hour<5  || hour>19 ){
 	backgroundTl.to(body,1,{backgroundColor:"#001848"});
	}else if(hour==19){
		if(minutez<30){
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
		}else{
 	backgroundTl.to(body,1,{backgroundColor:"#001848"});
		}
	}else if(hour==5){
		if(minutez<30){
 			backgroundTl.to(body,1,{backgroundColor:"#001848"});
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
		}
	}else if((hour>=6 && hour<7)||(hour>=18 &&hour<19)){
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});		
	}else if(hour==7){
		if(minutez<30){
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
		}
	}else if(hour==17){
		if(minutez<30){
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
		}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#fec5b9"});
		}
	}else{
		 	backgroundTl.to(body,1,{backgroundColor:"#87ceeb"});
	}	
}

function activeButton(){
var buttonGroup = document.getElementById("buttonGroup");
var btns = buttonGroup.getElementsByClassName("buttons");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}

activeButton();
