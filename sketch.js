var roadImg, road, mainRaceCarImg, mainRaceCar, oppRaceCar1;
var oppRaceCar1Img,oppRaceCar1,oppRaceCar2Img,oppRaceCar2;
var oppCar1,oppCar2;
var boundary1,boundary2, gameOverImg, gameOver;

var END =0;
var PLAY =1;
var gameState = PLAY;
var restart;
var distance = 0;

function preload(){
roadImg = loadImage("Road.png");
mainRaceCarImg = loadImage("RaceCar1.png"); 
oppRaceCar1Img = loadImage("RaceCar2.png");
oppRaceCar2Img = loadImage("RaceCar3.png");
gameOverImg = loadImage("gameOver.png");
}

function setup() {
 createCanvas(displayWidth,displayHeight-300);
  
 road = createSprite(150,200);
 road.addImage(roadImg); 
 road.velocityX = -10;
 
 mainRaceCar = createSprite(150,100);
 mainRaceCar.addImage(mainRaceCarImg);
 mainRaceCar.scale = 0.35;
  
boundary1 = createSprite(500,10,1000,20)
boundary1.visible = false;
  
boundary2 = createSprite(500,390,1000,20)
boundary2.visible = false;
  
  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  oppCar1 = new Group();
  oppCar2 = new Group(); 
}

function draw() {
 background("black");
  
  drawSprites();
  textSize(25);
  fill("white");
  text("Distance: "+ distance,700,30); 
  
  if(gameState === PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
   road.velocityX = -(6 + 2*distance/150);
    
    if(road.x < 0 ){
    road.x = width/2;
  }
  
  if(keyDown("UP_ARROW")){
   mainRaceCar.y = mainRaceCar.y - 10;
 }  
  
 if(keyDown("DOWN_ARROW")){
   mainRaceCar.y = mainRaceCar.y + 10;
 } 
    

  mainRaceCar.collide(boundary1);
  mainRaceCar.collide(boundary2);
  
  var select_oppPlayer = Math.round(random(1,2));

  if(World.frameCount % 220 === 0) {
  	if(select_oppPlayer === 1){
      raceCar1();
    } else {
      raceCar2();
    }
  }

  if(mainRaceCar.isTouching(oppCar1) || mainRaceCar.isTouching(oppCar2)){
    gameState = END;
    }
    
  } else if(gameState === END){
    mainRaceCar.visible = false;
    gameOver.visible = true;  
    textSize(30);
    text("Press Space Bar to Restart",300,300);    
    oppCar1.destroyEach();
    oppCar2.destroyEach();
    road.velocityX = 0;
  
    if(keyDown("space")){
      reset();
    }    
  }
}
function raceCar1(){
 oppRaceCar1 = createSprite(1100,Math.round(random(50, 250)),10,10); 
 oppRaceCar1.addImage(oppRaceCar1Img);
 oppRaceCar1.scale = 0.4;
 oppRaceCar1.velocityX = -3;   
 oppRaceCar1.setLifetime=150;
 oppCar1.add(oppRaceCar1);
}
function raceCar2(){
 oppRaceCar2 = createSprite(1100,Math.round(random(50, 250)),10,10); 
 oppRaceCar2.addImage(oppRaceCar2Img);
 oppRaceCar2.scale = 0.8;
 oppRaceCar2.velocityX = -3;   
 oppRaceCar2.setLifetime=150;
 oppCar2.add(oppRaceCar2);
}
function reset(){
  gameState = PLAY;  
  mainRaceCar.visible = true;
  gameOver.visible = false;
  gameOver.visible = false;
  oppCar1.destroyEach();
  oppCar2.destroyEach();
  road.velocityX = -10;
  distance = 0;
}