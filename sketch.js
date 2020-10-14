//Create variables here
var dog,happydog;
var database;
var foods,foodstock;

function preload()
{
  //load images here
  img = loadImage("Dog.png");
  img2 = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,30,40);
  dog.addImage(img);
  dog.scale = 0.09;
  foodstock = database.ref('Food');
  foodstock.on("value",readstock);
}


function draw() {  
  background(46,139,87);

   drawSprites();

  //add styles here
  fill("white");
  textSize(20);
  text("Press UP arrow key to feed Tommy the dog",30,80);
  text("Food left: " + foods ,250,100);
}

function readstock(data){
  foods = data.val();
}

function writestock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
  
}

function keyPressed(){
  if(keyCode === 38){
    writestock(foods);
    dog.addImage(img2);
  }
}


