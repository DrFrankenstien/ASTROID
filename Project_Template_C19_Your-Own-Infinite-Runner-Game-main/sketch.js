var path, rocket, meteor1, meteor2;
var pathImg, rocketImg, meteor1Img, meteor2Img;
var score = 0;
var meteorsGroup, meteors_Group, meteor;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  pathImg = loadImage("space.jpg");
  rocketImg = loadImage("https://static.vecteezy.com/system/resources/previews/013/743/608/original/cartoon-rocket-launch-png.png");

  meteor1Img = loadImage("meteor.png");
  meteor2Img = loadImage("meteor2.png");
}

function setup() {


  createCanvas(1000, 600);



  path = createSprite(500, 300, 1000, 800);
  path.addImage(pathImg);

  meteor = createSprite(Math.round(random(50, canvas.width - 50), 40, 10, 10));
  meteor.addImage(meteor1Img);
  meteor.scale = 0.08;
  meteor.velocityY = 4;

  rocket = createSprite(100, 580, 40, 80);
  rocket.addImage(rocketImg);
  rocket.scale = 0.05;


  meteorsGroup = new Group();
  meteors_Group = new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(0);
    rocket.x = World.mouseX;

    edges = createEdgeSprites();
    rocket.collide(edges);

    createMeteor();
    //createMeteor2();

    score = score + 1;
    if (meteorsGroup.isTouching(rocket) || meteors_Group.isTouching(rocket)) {

      gameState = END;


    }


    drawSprites();

  }

  else if (gameState === END) {
    end_game();
  }
  textSize(20);
  fill(255);
  text("Score: " + score, canvas.width - 150, 30);

}


function end_game() {
  console.log("game_ends");

  textSize(150);
  fill("white");
  text("Game End", 150, 350);
  meteorsGroup.destroyEach();
  meteors_Group.destroyEach();

  meteorsGroup.setVelocityYEach(0);
  meteors_Group.setVelocityYEach(0);
}

function createMeteor() {
  if (frameCount % 100 == 0) {
    meteor = createSprite(Math.round(random(50, canvas.width - 50), 40, 10, 10));
    meteor.addImage(meteor1Img);
    meteor.scale = 0.08;
    meteor.velocityY = 4;
    meteorsGroup.add(meteor);
    meteor.lifetime = 200;

  }
  if (frameCount % 80 == 0) {
    meteor2 = createSprite(Math.round(random(50, canvas.width - 50), 40, 10, 10));
    meteor2.addImage(meteor2Img);
    meteor2.scale = 0.15;
    meteor2.velocityY = 4;
    meteor2.lifetime = 200;
    meteors_Group.add(meteor2);
  }
}


