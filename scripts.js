var canv = document.getElementById("canv").getContext("2d");
canv.font = '30px Arial';

var HEIGHT = 500;
var WIDTH = 1000;

var startX = 0;
var startY=0;
var pauseTime = 3000;

var mapPauseBool = false;
var map1Bool = false;
var map2Bool = true;
var map3Bool = false;
var map4Bool = false;

var blockList={};
var bulletList={};

var bulletCount = 0;
var bulletT = 4000;
var bulletX = 900;
var bulletY = 250;
var bulletSpdX = -4;
var bulletSpdY = 0;
var angleCount = 0;
var countDown = 50;
 
var player = {
	x: 0,
	y: 0,
	spdX: 0,
	spdY: 0,
	pressDown: false,
	pressUp: false,
	pressLeft: false,
	pressRight: false,
	color: "black",
	width: 20,
	height: 20,
}


function createBlock(name,x,y){
	var block = {
		x: x,
		y: y,
		name: name,
	};
	blockList[name]=block;
}

function createBullet(num,x,y,spdX,spdY){
	var bullet = {
		x:x,
		y:y,
		spdX:spdX,
		spdY:spdY,
		num:num,
	}
	bulletList[num]=bullet;
	bulletCount++;


}

function bulletUpdate(bullets){
	canv.fillRect(bullets.x,bullets.y,10,10);

	bullets.x+=bullets.spdX;
	bullets.y+=bullets.spdY;
}


function bulletCounter(x,y,spdX,spdY){
	if(map1Bool){
		for(i=0;i<3;i++){
			createBullet(bulletCount,x+i*50,y+10,spdX,spdY);
			createBullet(bulletCount,x+i*50,y-20,spdX,spdY);
		}
	}
	if(map2Bool){
		for(i=0;i<3;i++){
			createBullet(bulletCount,x+i*50,y+15,spdX,spdY);
			createBullet(bulletCount,50-i*50,y-25,-spdX,spdY);
		}
		createBullet(bulletCount,x,420,spdX-2,spdY);
	}
	if(map3Bool){
		for(i=0;i<3;i++){
			createBullet(bulletCount,x+i*50,80,spdX,spdY);
			createBullet(bulletCount,50-i*50,120,-spdX,spdY);
			createBullet(bulletCount,x+i*50,160,spdX,spdY);
			createBullet(bulletCount,50-i*50,200,-spdX,spdY);
			createBullet(bulletCount,x+i*50,240,spdX,spdY);
			createBullet(bulletCount,50-i*50,280,-spdX,spdY);
			createBullet(bulletCount,x+i*50,320,spdX,spdY);
			createBullet(bulletCount,50-i*50,360,-spdX,spdY);
			createBullet(bulletCount,x+i*50,400,spdX,spdY);
			createBullet(bulletCount,50-i*50,440,-spdX,spdY);
			createBullet(bulletCount,x+i*50,480,spdX,spdY);
		}
	}
	if(map4Bool){
		for(i=0;i<3;i++){
		createBullet(bulletCount,325,i*30,0,spdY+1);
		createBullet(bulletCount,375,i*30,0,spdY+1);
		createBullet(bulletCount,425,i*30,0,spdY+1);
		
		createBullet(bulletCount,575,i*500,0,spdY-1);
		createBullet(bulletCount,625,i*500,0,spdY-1);
		createBullet(bulletCount,675,i*500,0,spdY-1);
		
		createBullet(bulletCount,i*250,325,-spdX-3,0);
		createBullet(bulletCount,i*250,375,-spdX-3,0);
		createBullet(bulletCount,i*250,425,-spdX-3,0);
		
		createBullet(bulletCount,i*750,75,spdX+3,0);
		createBullet(bulletCount,i*750,125,spdX+3,0);
		createBullet(bulletCount,i*750,175,spdX+3,0);
		}
	}
}



document.onkeydown = function(event) //check keydown
{
	//player1 keyboard input
	if(event.keyCode === 38) //up
		player.pressUp = true;
	if(event.keyCode === 40) //down
		player.pressDown = true;
	if(event.keyCode === 37) //left
		player.pressLeft = true;
	if(event.keyCode === 39) //right
		player.pressRight = true;
}

document.onkeyup = function(event) //check keydown
{
	//player1 keyboard input
	if(event.keyCode === 38) //up
		player.pressUp = false;
	if(event.keyCode === 40) //down
		player.pressDown = false;
	if(event.keyCode === 37) //left
		player.pressLeft = false;
	if(event.keyCode === 39) //right
		player.pressRight = false;
} 


function keyboardMove(obj) //automatic movement
{
	//keyboard movement 
	if(obj.pressUp)
		obj.y = obj.y-2;
	if(obj.pressDown)
		obj.y = obj.y+2;	
	if(obj.pressLeft&&obj.x>-startX)
		obj.x = obj.x-2;
	if(obj.pressRight&&obj.x<960-startX)
		obj.x = obj.x+2;
}

function getDistance(obj1, obj2)
{
	var x = obj1.x - obj2.x;
	var y = obj1.y - obj2.y;
	return Math.sqrt(x*x + y*y);
}

function wallCollision(obj1, obj2)
{
	return startX+obj1.x < obj2.x+50
			&& startX+obj1.x+40 > obj2.x
			&& startY+obj1.y < obj2.y+50
			&& startY+obj1.y+40 > obj2.y;
}

function bulletCollision(obj1, obj2){
	return startX+obj1.x < obj2.x+10
			&& startX+obj1.x+40 > obj2.x
			&& startY+obj1.y < obj2.y+10
			&& startY+obj1.y+40 > obj2.y;
}

setInterval(function(){bulletCounter(bulletX,bulletY,bulletSpdX,bulletSpdY);},bulletT);

function drawChar(obj)
{
	
	for(var i in blockList)
	{
		if(wallCollision(obj,blockList[i]))
		{
			map1Bool=false;
			map2Bool=false;
			map3Bool=false;
			mapPauseBool=true;
			obj.x=0;
			obj.y=0;
			bulletList = {};
			bulletCount=0;
			countDown = 100;
		}	
	}

	for(var i in bulletList){
		if(bulletCollision(obj,bulletList[i]))
		{
			map1Bool=false;
			map2Bool=false;
			map3Bool=false;
			mapPauseBool=true;
			obj.x=0;
			obj.y=0;
			bulletList = {};
			bulletCount=0;
			countDown = 100;
		}
	}
	
	if(mapPauseBool)
	{
		mapPause();
		countDown-=1;
		if(countDown==0){
			mapPauseBool=false;
			map1Bool=true;
		}
	}

	if(map1Bool)
	{
		map1();
		canv.fillRect(startX+obj.x,startY+obj.y,40,40);
		if(startX+obj.x+40>950){
			obj.x=0;
			obj.y=0;
			map1Bool=false;
			map2Bool=true;
			blockList = {};
		}
		
	}
	if(map2Bool)
	{
		map2();
		canv.fillRect(startX+obj.x,startY+obj.y,40,40);
		if(startY+obj.y>=400&&startX+obj.x+40>=950)
		{
			obj.x=0;
			obj.y=0;
			map2Bool=false;
			map3Bool=true;
			blockList = {};
		}
	}
	if(map3Bool)
	{
		map3();
		canv.fillRect(startX+obj.x,startY+obj.y,40,40);
		if(startY+obj.y+40>=450&&startX+obj.x+40>=950)
		{
			obj.x=0;
			obj.y=0;
			map3Bool = false;
			map4Bool=true;
			blockList = {};
		}
	}
	if(map4Bool)
	{
		map4();
		angleCount++;
		canv.fillRect(startX+obj.x,startY+obj.y,40,40);
		if(startY+obj.y+40>=450&&startX+obj.x+40>=950)
		{
			map4Bool = false;
			clearRect(0,0,WIDTH,HEIGHT);
		}
	}
}

function mapPause()
{
	canv.fillStyle = "black";
	canv.fillRect(0,0,WIDTH,HEIGHT);
	canv.font="bold 46px Times New Roman";
	canv.fillStyle = "white";
	canv.fillText("BOXBOXBOXBOXBOXBOXBOXBOXBOXBOXBOXBOX", 0, HEIGHT/2);	
}

function map1()
{
	startX = 100;
	startY = 240;
	var count = 0;

	

	canv.fillStyle = "green";
	canv.fillRect(950,200,50,200);

	canv.fillStyle = "black";
	var mapEdit=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

	for(r=0;r<mapEdit.length;r++)
	{
		for(c=0;c<mapEdit[r].length;c++)
		{
			if(mapEdit[r][c]==1){
				canv.fillRect(c*50,r*50,50,50);
				count++;
				createBlock(count,c*50,r*50);
			}
		}
	}

}

function map2()
{
	startX = 100;
	startY = 70;
	var count = 0;

	canv.fillStyle = "green";
	canv.fillRect(950,400,50,50);

	canv.fillStyle = "black";
	var mapEdit=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

	for(r=0;r<mapEdit.length;r++)
	{
		for(c=0;c<mapEdit[r].length;c++)
		{
			if(mapEdit[r][c]==1){
				canv.fillRect(c*50,r*50,50,50);
				count++;
				createBlock(count,c*50,r*50);
			}
		}
	}
}

function map3()
{
	startX = 10;
	startY = 5;
	var count = 0;

	canv.fillStyle = "green";
	canv.fillRect(950,450,50,50);

	canv.fillStyle = "black";
	var mapEdit=[[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]];

	for(r=0;r<mapEdit.length;r++)
	{
		for(c=0;c<mapEdit[r].length;c++)
		{
			if(mapEdit[r][c]==1){
				canv.fillRect(c*50,r*50,50,50);
				count++;
				createBlock(count,c*50,r*50);
			}
		}
	}
}

function map4()
{
	startX=260;
	starty=25;
	var count=0;

	canv.fillStyle = "green";
	canv.fillRect(950,450,50,50);

	canv.fillStyle = "black";
	var mapEdit=[[1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
				 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

	for(r=0;r<mapEdit.length;r++)
	{
		for(c=0;c<mapEdit[r].length;c++)
		{
			if(mapEdit[r][c]==1){
				canv.fillRect(c*50,r*50,50,50);
				count++;
				createBlock(count,c*50,r*50);
			}
		}
	}
}




function init () //main
{
	canv.clearRect(0,0,WIDTH,HEIGHT);

	drawChar(player);
	for(i=0;i<bulletCount;i++)
	{
		bulletUpdate(bulletList[i]);
	}
	keyboardMove(player);
	
}

setInterval(init,10); 
