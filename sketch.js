var boy ,boyG, boy_running,boy_collided;
var banana,obstacle;
var bananaImage, obstacleImage;
var bananaG,obstacleG;
var backgroundd,backgroundI;
var ground,groundI,invisible;
var score;
var gameOver,gameOverI;
var chance = 2;
var heart1,heart2,heartI

function preload(){
  
  groundI = loadImage("ground.png");
  
  boy_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png","sprite_9.png","sprite_10.png","sprite_11.png")
  
  boy_collided = loadAnimation("sprite_4.png");
  
  bananaImage = loadImage("coin.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundI = loadImage("background.png");
  
  gameOverI = loadImage("gameover5.png");
  
  heartI = loadImage("heart.png");
 
}



function setup() {
  
  createCanvas(500,350);
  
  boy = createSprite(50,200,20,20);
  boy.addAnimation("running",boy_running);
  boy.setCollider('circle',boy.x-50,boy.y-200,boy.width/2                )
  //.debug = true
  boy.scale = 0.5;
 
  
  backgroundd = createSprite(50,200,width,height);
  backgroundd.addImage(backgroundI);
  backgroundd.scale = 0.6
  //backgroundd.x = backgroundd.width /2;
  
  ground = createSprite(200,365,800,20);
  ground.shapeColor = "yellowgreen";
  ground.visible = false;
 
 
  
  gameOver = createSprite(50,130,10,10);
  gameOver.addImage("gameover",gameOverI);
  gameOver.scale = 0.6;
  gameOver.visible = false;
  
  heart1 = createSprite(-70,40,5,5);
  heart1.addImage(heartI);
  heart1.scale = 0.05;
  
  heart2 = createSprite(-30,40,5,5);
  heart2.addImage(heartI);
  heart2.scale = 0.05;  
  
  score = 0;
  
  bananaG = createGroup();
  obstacleG = createGroup();
  boyG = createGroup();
  
  
}


function draw() {
  background("white");
  
  camera.x = boy.x;
  
   boyG.add(boy);
  
  backgroundd.velocityX = -4;
  
  if (backgroundd.x < 0){
      backgroundd.x = backgroundd.width/10;
    }
  
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -15;
    }
  
  boy.velocityY = boy.velocityY + 0.8;
  
  boy.collide(ground);
  
  banana();
  obstacles();
  
  if(bananaG.isTouching(boy)){
    bananaG.destroyEach();
    score = score+2;
  }

  
  
  boy.depth = backgroundd.depth;
  boy.depth = boy.depth+1;
  
  drawSprites();

               
  
  textSize(20);
  stroke("skyblue");
  fill("white");
  text("score = "+score,100,40);
  
  switchSize();
  lives();
  
  
}
function banana(){
  if (frameCount % 30 === 0){
    var  banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(50,160));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 150;
    boy.depth = banana.depth;
    boy.depth = boy.depth+1;
    bananaG.add(banana);
  }
   
}
function obstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(400,325,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.scale = 0.2;
    ground.depth = obstacle.depth;
    ground.depth = ground.depth+1;
    //obstacle.collide(ground);
    obstacleG.add(obstacle);
  }
}
function switchSize(){
          
  switch(score){
    case 10: boy.scale = 0.6;
      break;
    case 20: boy.scale = 0.7;
      break;
    case 30: boy.scale = 0.8;
      break;
    case 40: boy.scale = 0.9               ;
      break;
      default: break;
  }
}
function lives(){
  
    if(obstacleG.isTouching(boy)){
       chance = chance-1;
       obstacleG.destroyEach();
       bananaG.destroyEach();
    
  }
     
  if(chance === 1){
    boy.scale = 0.3;
    heart2.visible = false;
  }
  if(chance === 0){
    gameOver.visible = true;
    heart1.visible = false;
    heart2.visible = false;
    boyG.destroyEach();
    obstacleG.destroyEach();
    bananaG.destroyEach();
    backgroundd.velocityX = 0;
  }
}




