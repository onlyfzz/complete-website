function $(id) {
	return document.getElementById(id);
}
var buttonGroup=$("buttonGroup"),
	buttons=buttonGroup.getElementsByTagName('span'),
	list=$("list"),
	imgs=list.getElementsByTagName('img'),
	flag=0,
	timer;
function render(index){
	for(var i=0;i<imgs.length;i++){
		imgs[i].style.opacity="0";
		imgs[i].style.zindex="1";
	}
	imgs[index].style.zindex="2";
	imgs[index].style.opacity="1";
}
function bt_listen(event){
	if (event.target&&event.target.tagName.toLowerCase()=='span') {
		var index=event.target.getAttribute('index');
		flag=index;
		render(flag);
		showButton();
	}
}
function showButton(){
	for(var i=0;i<buttons.length;i++){
		buttons[i].className=buttons[i].className.replace(/\s*on/,"");
	}
	buttons[flag].className+=" on";
}
function play(){
	timer=setInterval(function(){
		if (flag==3) {
			flag=0;
		}else{
			flag++;
		}
		render(flag);
		showButton();
	},3000);
}
function stop(){
	clearInterval(timer);
}	
function start(){
	buttonGroup.addEventListener('click',bt_listen,false);
	list.addEventListener('mouseenter',stop,false);
	list.addEventListener('mouseleave',play,false);
	play();
}	
start();