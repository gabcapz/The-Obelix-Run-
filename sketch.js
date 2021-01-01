var obelix, obelix_running, back, backImage;
var romans, romansImage;
var pig, pig_running;
var PLAY = 1;
var END = 2;
var SERVE = 3;
var SPLASH = 4;
var gameState = 3;
var start, startImage, play, playImage, splash, splashImage;
var ground;
var lion, lionImage, romans1, romans1Image, romans2, romans2Image;
var meatsGroup, obstaclesGroup, heart, heartImage;
var heart1, heart2, lives, score, gameOver, gameOverImage;
var laughSound, meat, meatImage, obelixSound, serveSound, gameSound;

let font;
let lines;
let txt;


let y = 0;

function preload(){
obelix_running = loadAnimation("1.png", "Step 2.png","Step 3.png");
  pig_running = loadAnimation("pig1.png", "pig2.png", "pig3.png");
  
  backImage = loadImage("jungle1.jpg");
  startImage = loadImage("start.jpg");
  
  romansImage = loadImage("romans3.png");
  romans1Image = loadImage("romanss.png");
  romans2Image = loadImage("Spear.png");
  lionImage = loadImage("Lion.png");
  
  playImage = loadImage("play1.png");
  splashImage = loadImage("splash.jpg");
  
  lines = loadStrings('test.txt');
  font = loadFont('AvenirNextLTPro-Demi.otf');
  
  heartImage = loadImage("heart.png");
  gameOverImage = loadImage("gameOver.jpg");
  meatImage = loadImage("meat.png");
  
  laughSound = loadSound("Laugh.mp3");
  obelixSound = loadSound("obelix.mp3");
  serveSound = loadSound("FunBusyIntro.mp3");
  }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
    txt = join(lines, '\n');
  y = height / 2; 
  
  
  start = createSprite(0, 0);
  start.addImage(startImage);
  start.scale = 0.25;
  
  gameOver = createSprite(0, 0);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  
  back = createSprite(0, 0);
  back.addImage(backImage);
  back.scale = 1.6;
  
  back1 = createSprite(745, 0);
  back1.addImage(backImage);
  back1.scale = 1.6;
  
  back2 = createSprite(1490, 0);
  back2.addImage(backImage);
  back2.scale = 1.6;
  
  obelix = createSprite(-120, 170);
  obelix.addAnimation("running", obelix_running);
  obelix.scale = 0.2;
  
  pig = createSprite(30, 150);
  pig.addAnimation("running", pig_running);
  pig.scale = 0.1;
  
  splash = createSprite(200, 200);
  splash.addImage(splashImage);
  
  ground = createSprite(0, 170, 1000, 5);
  
  heart = createSprite(-170, -150);
  heart.addImage(heartImage);
  heart.scale = 0.2;
  
  heart1 = createSprite(-130, -150);
  heart1.addImage(heartImage);
  heart1.scale = 0.2;
  
  heart2 = createSprite(-90, -150);
  heart2.addImage(heartImage);
  heart2.scale = 0.2;
  
  obstaclesGroup = new Group();
  meatsGroup = new Group();
  
  lives = 3;
  score = 0;
  
  obelix.setCollider("rectangle", 0, 0, obelix.width, obelix.height);
  obelix.debug = false;
  
  pig.setCollider("rectangle", 0, 0, 1000, pig.height);
  pig.debug = false;
}

function draw() {
 background(0);
  
  if (gameState === SERVE){
    
    if (!serveSound.isPlaying()) {
        serveSound.play();
      }
    
  start.visible = true;
  back.visible = false;
  back1.visible = false;
  back2.visible = false;
  obelix.visible = false;
  pig.visible = false;
  splash.visible = false;  
  ground.visible = false;
  heart.visible = false;
  heart1.visible = false;
  heart2.visible = false;
  gameOver.visible = false;
   
    if (keyDown("s")){
      gameState = SPLASH;
    }
    
  }
  
  if (gameState === SPLASH){    
    
  start.visible = false;
  back.visible = false;
  back1.visible = false;
  back2.visible = false;
  obelix.visible = false;
  pig.visible = false;
  ground.visible = false;
  heart.visible = false;
  heart1.visible = false;
  heart2.visible = false;
  gameOver.visible = false;
    
  fill(238, 213, 75);
  textFont(font, 40);
  textSize(width * 0.04);
  textAlign(LEFT);
  rotateX(PI / 4);
  let w = width * 0.6;
  text(txt, -w / 2, y, w, height * 10);

  y -= 1;
    
    if (keyDown("enter")){
       gameState = PLAY; 
    }
    
  }
  
  if (gameState === PLAY){
    
  spawnObstacles();
  spawnFood();
    
  serveSound.stop();
    
    if (!obelixSound.isPlaying()) {
        obelixSound.play();
      }
    
  start.visible = false;
  back.visible = true;
  back1.visible = true;
  back2.visible = true;
  obelix.visible = true;
  pig.visible = true;
  ground.visible = false;
  heart.visible = true;
  heart1.visible = true;
  heart2.visible = true;
  gameOver.visible = false;
    
    if (keyDown("space") && obelix.y >= 70){
      obelix.velocityY = -17;
    }
    
    if (keyDown("up") && obelix.y >= 70){
      obelix.velocityY = -22;
    }
    
    obelix.velocityY = obelix.velocityY + 0.8; 
    
    
    back.velocityX = -(2 + 2 * score / 10);
    back1.velocityX = -(2 + 2 * score / 10);
    back2.velocityX = -(2 + 2 * score / 10);
    
    if (back.x < -700){
      back.x = 1490;
    }
    
    if (back1.x < -700){
      back1.x = 1490;
    }
    
    if (back2.x < -700){
      back2.x = 1490;
    }
    
    if (ground.x < 0){
      ground.width = ground.width / 2;
    }
    
    if (meatsGroup.isTouching(obelix)){
      score = score + 2;
      meatsGroup.destroyEach();
    }
    
    if (obstaclesGroup.isTouching(obelix)){
      lives = lives - 1;
      obstaclesGroup.destroyEach();
    }
    
    if (obstaclesGroup.isTouching(pig)){
      pig.velocityY = -16;
    }
    
    pig.velocityY = pig.velocityY + 0.8; 
    
    if (lives === 2){
      heart2.visible = false;
    }
    
    if (lives === 1){
      heart2.visible = false;
      heart1.visible = false;
    }
    
    if (lives === 0){
      heart2.visible = false;
      heart1.visible = false;
      heart.visible = false;
      gameState = END;
    }
    
  }
 
  if (gameState === END){
    gameOver.visible = true;
    
    if (!laughSound.isPlaying()) {
        laughSound.play();
      }
    
    obelixSound.stop();
    
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    meatsGroup.destroyEach();
    meatsGroup.setVelocityXEach(0);
    
    start.visible = false;
    back.visible = false;
    back1.visible = false;
    back2.visible = false;
    obelix.visible = false;
    pig.visible = false;
    ground.visible = false;
    back.velocityX = 0;
    back1.velocityX = 0;
    back2.velocityX = 0;
  }
  
  if (keyWentDown("r") && gameState === END){
    gameState = PLAY;
    
    obstaclesGroup.destroyEach();
    meatsGroup.destroyEach();
    
    laughSound.stop();
    
    lives = 3;
    score = 0;
  }
  
  pig.collide(ground);
  obelix.collide(ground);
  
  drawSprites();
  
  if (gameState === PLAY){
  fill(255, 0, 0);
  textFont(font);
  textSize(24);
  text("Score : " + score, 70, -150);
  }
  
}

function spawnObstacles(){
  
  if (frameCount % 120 === 0){
    obstacle = createSprite(400, 120);
    obstacle.velocityX = -(5 + score / 10);
    
    var rand = Math.round(random(1,4));
    
    switch(rand){
        case 1: obstacle.addImage(romans1Image);
        break;
        case 2: obstacle.addImage(romans2Image);
        break;
        case 3: obstacle.addImage(romansImage);
        break;
        case 4: obstacle.addImage(lionImage);
        break;
        default: break;
    }
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
}

function spawnFood(){
  
  if (frameCount % 80 === 0){
    meat = createSprite(400, 120);
    meat.addImage(meatImage);
    meat.velocityX = -(5 + score / 10);
    meat.scale = 0.07;
    meat.lifetime = 300;
    
    meat.y = Math.round(random(-100, 30));
    
    meatsGroup.add(meat);
  }
  
}
