var PLAY = 1;
var END = 0;
var gameState = PLAY;

var helicopter, helicopterImg;
var helicopter2, helicopter2Img;
var rocket, rocketImg,rocketGroup;
var bullet, bulletImg,bulletGroup;
var backgroundImg;
var reset;
var life1, life2;
var life1I, life2I;
var InvisLine;

function preload(){
    helicopterImg= loadImage('helicopter.png'); 
    helicopter2Img= loadImage('helicopter2.png');
    backgroundImg=loadImage('bg.jpg');
    life1I= loadImage('lives.png');
    
    rocketImg= loadImage('rocket.png')
    bulletImg= loadImage('bullet.png');
  }

  function setup() {
    createCanvas(displayWidth, displayHeight);

    helicopter=createSprite(170, 100, 50, 50);
    helicopter.addImage(helicopterImg);
    helicopter.scale = 0.5;
  
    helicopter2=createSprite(displayWidth-200, 100, 50, 50);
    helicopter2.addImage(helicopter2Img);
    helicopter2.scale = 0.5;
  
  
    InvisLine= createSprite(displayWidth/2, 50, displayWidth, 10);
    InvisLine.visible= false;

  
    
    rocketGroup = new Group();
    bulletGroup = new Group();
    life1Group = new Group();
    life2Group = new Group();

    createLife1(40, "red");
    
  }

function createLife1(y,color){
    for(c=0; c<5; c++)
    {
      var life1 = createSprite(120+40*c,y,10, 10);
      
  life2=createSprite((displayWidth-270)+40*c, y, 10, 10);
      life1.addImage(life1I);
      life1.scale= 0.11;
      life1.shapeColor = color;
    life1Group.add(life1);

    life2.addImage(life1I);
    life2.scale= 0.11;
    life2.shapeColor = color;
  life2Group.add(life2);
    }
  }




  function draw(){
    background(backgroundImg);

    moveHelicopter();
    
    moveHelicopter2();

    if(keyWentDown('shift')){
        spawnBullets();
      }
      helicopter2.isTouching(bulletGroup, bulletHit);

      if(keyWentDown('space')){
        spawnRockets();
        }
        
    drawSprites();
  }

  function spawnBullets(){
    bullet = createSprite(helicopter.x+100, helicopter.y+25);
    bullet.addImage(bulletImg);
    bullet.scale= 0.3;
    bullet.visible= true;
    bullet.velocityX= 20;
    bulletGroup.add(bullet);
  }

  
function spawnRockets(){
    rocket = createSprite(helicopter2.x-100, helicopter2.y+25);
    rocket.addImage(rocketImg);
    rocket.scale= 0.4;
    rocket.visible= true;
    rocket.velocityX= -20;
    rocketGroup.add(rocket);
  }

  function moveHelicopter(){
    if(helicopter.x<100 ){
        helicopter.x=100
    }
    if( helicopter.x>displayWidth-100){
      helicopter.x = displayWidth-100;
    }
    if(helicopter.y<100 ){
      helicopter.y=100
    }
    if( helicopter.y>displayHeight-100){
    helicopter.y = displayHeight-100;
    }
    
    if(keyDown(LEFT_ARROW)){
        helicopter.x =  helicopter.x-20;  
      }
      if(keyDown (RIGHT_ARROW)){
      helicopter.x= helicopter.x+20;
      }
      if(keyDown(DOWN_ARROW)){
      helicopter.y= helicopter.y+20;
      }
      if(keyDown (UP_ARROW)){
       helicopter.y= helicopter.y-20; 
      }
  }

  function moveHelicopter2(){
    if(helicopter2.x<100 ){
        helicopter2.x=100
    }
    if( helicopter2.x>displayWidth-100){
      helicopter2.x = displayWidth-100;
    }
    if(helicopter2.y<100 ){
      helicopter2.y=100
    }
    if( helicopter2.y>displayHeight-100){
    helicopter2.y = displayHeight-100;
    }
    
    if(keyDown('a')){
        helicopter2.x =  helicopter2.x-20; 
      }
      if(keyDown ('d')){
      helicopter2.x= helicopter2.x+20; 
      }
      if(keyDown('s')){
      helicopter2.y= helicopter2.y+20;
      }
      if(keyDown ('w')){
       helicopter2.y= helicopter2.y-20;
      }
  }

/*
  function damageHeli(){
      if (rocketGroup.isTouching(helicopter)){
          helicopter.remove();
          rocket.destroy();
      }
  }
  function damageHeli2(){
    if (bulletGroup.isTouching(helicopter2)){
        helicopter2.remove();
        bullet.destroy();
    }
 }

*/

function bulletHit(helicopter2, bullet) {
  //playSound("sound://category_hits/puzzle_game_button_04.mp3");
       helicopter2.remove();
        bullet.destroy();
        score = score+5;
   
 }