var rocket, rocketImg,rocketGroup;
var bullet, bulletImg,bulletGroup;
var backgroundImg;
var reset;
var life1, life2;
var life1I, life2I;
var InvisLine;
var gameState = "play";
var gameOver, restart;
var gameOverImg;


function preload(){
    helicopterImg= loadImage('helicopter.png'); 
    helicopter2Img= loadImage('helicopter2.png');

    backgroundImg=loadImage('bg.jpg');
    life1I= loadImage('lives.png');
    
    rocketImg= loadImage('rocket.png');
    bulletImg= loadImage('bullet.png');
 
    gameOverImg = loadImage("gameOver.png");
    
  }

  function setup() {
    createCanvas(displayWidth, displayHeight-100);

    helicopter=createSprite(170, 100, 50, 50);
    helicopter.addImage(helicopterImg);
    helicopter.scale = 0.5;
  
    helicopter2=createSprite(displayWidth-200, 100, 50, 50);
    helicopter2.addImage(helicopter2Img);
    helicopter2.scale = 0.5;
  
    InvisLine= createSprite(displayWidth/2, 50, displayWidth, 10);
    InvisLine.visible= false;

    gameOver = createSprite(displayWidth/2,displayHeight/2);
    gameOver.addImage(gameOverImg);
      
    rocketGroup = new Group();
    bulletGroup = new Group();
    life1Group = new Group();
    life2Group = new Group();

    createLife1(40);
    createLife2(40);

    gameOver.visible = false;
 
  }


  function draw(){
    background(backgroundImg);

    if (gameState==="play"){
      console.log("played");
      gameOver.visible = false;

      moveHelicopter();
      moveHelicopter2();

      if(keyWentDown('shift')){
        spawnBullets();
      }
        
      if(keyWentDown('space')){
        spawnRockets();
      } 

      for (var i = 0; i < bulletGroup.length; i++) {
        if(bulletGroup.get(i).isTouching(helicopter2)){
          bulletGroup.get(i).remove();
          life2Group.get(i).remove();
     

        }
      }
      for (var i = 0; i < rocketGroup.length; i++) {
        if(rocketGroup.get(i).isTouching(helicopter)){
          rocketGroup.get(i).remove();
          life1Group.get(i).remove();
  
          }
      }
       
      if((!life1Group[0]) || (!life2Group[0])){
        console.log("Won");
        gameState = "end";
    
      }
      
     
  }
    else if (gameState === "end") {
      gameOver.visible = true;
   
      if((!life1Group[0])){
        helicopter.remove();
      }
      if((!life2Group[0])){
        helicopter2.remove();
      }

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

  function createLife1(y){
    for(c=0; c<5; c++){
      var life1 = createSprite(120+40*c,y,10, 10);
      life1.addImage(life1I);
      life1.scale= 0.11;
      life1Group.add(life1);
    }
  }

  function createLife2(y){
    for(c=0; c<5; c++){
      var  life2=createSprite((displayWidth-270)+40*c, y, 10, 10);
      life2.addImage(life1I);
      life2.scale= 0.11;
      life2Group.add(life2);
    }
  }

  


