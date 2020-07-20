//Global Variables
var bananaImage, player_running, obstacleImage, obstacleGroup, score, backImage;
var monkey, banana, back, ground, jungle, gameOver, restart, gameOverImg, restartImg;

var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_03.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  obstacleImage= loadImage("stone.png");
  bananaImage= loadImage("Banana.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}


function setup() {
  createCanvas(500,300);
  
  jungle = createSprite(200,100,10,10);
  jungle.addImage("back",backImage);
  jungle.scale =1;
  
  ground = createSprite(200,290,800,5);
  ground.visible=false;
  
  monkey = createSprite(70,250,10,10);
  monkey.addAnimation("running",player_running);
  monkey.scale=0.12;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(250,100,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  restart = createSprite(250,130,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5
  restart.visible = false;

}


function draw(){
 background(255); 
  
if(gameState === PLAY){
  jungle.velocityX = -(3+score/10);
    
   if(jungle.x<0){
    jungle.x = jungle.width/2; 
   }
  
  if(ground.x<0){
    ground.x = ground.width/2; 
   }
  
  if(keyDown("space")&& monkey.y>200){
   monkey.velocityY = -13; 
  }
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.13;break;
        case 20: monkey.scale=0.15;break;
        case 30: monkey.scale=0.17;break;
        case 40: monkey.scale=0.19;break;        
        case 50: monkey.scale=0.21;break;
        case 60: monkey.scale=0.23;break;
        case 70: monkey.scale=0.25;break;
        case 80: monkey.scale=0.27;break;
        default: break;
    }
  
  monkey.velocityY = monkey.velocityY +0.6;
  monkey.collide(ground);
  
  if(obstaclesGroup.isTouching(monkey)){ 
      gameState = END;
  }  
}
  
  if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
       reset();
    } 
  }
  
  drawSprites();
  spawnFood();
  spawnObstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
}

function spawnFood() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(50,120);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -(5+score/13);
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(550,255,10,40);
    obstacle.velocityX = -(6+score/12);
    obstacle.addImage(obstacleImage);    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150);
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  
  monkey.changeAnimation("running",player_running);
  jungle.velocityX = -3;
  score = 0;

}