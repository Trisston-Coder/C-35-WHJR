var dog, dogSprite, happyDog, happyDogSprite, foodS, foodStock;
var database;
var lastFed;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happyDog.png");
}

function setup() {
  createCanvas(600,600);
  
  database = firebase.database();
  
    dogSprite = createSprite(450, 250, 30, 30);
    dogSprite.addImage(dog);
    dogSprite.scale = 0.25;

    foodStock=database.ref('Food');
    foodStock.on("value", getFood);

    feed = createButton("Feed the Dog");
    feed.position(700,110);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800,110);
    addFood.mousePressed(addFoods);

    food = new Food(150,150,50,50);
}

function draw() {  

  background(46, 139, 87);
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  food.display();
  getFood();

drawSprites();

textSize(22);
fill("red");
stroke(3);
text("Press 'Feed the Dog' button to Feed the Dog Milk.", 50, 540);
text("Press 'Add Food' button to add Milk to the screen.", 50, 500);

fill(255,255,254);
textSize(15);

if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + " PM", 100,70)
}
else if(lastFed==0){
  text("Last Feed : 12 AM", 100,70)
}
else{
  text("Last Feed : "+lastFed + " AM", 100,70)
}

}

function feedDog(){

  dogSprite.addImage(happyDog);
  
  foodS--;

  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}

function addFoods(){

  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
}

function getFood()
{
  database.ref("Food").on("value", (data)=>{
    foodS=data.val();
    food.foodStock = foodS;
  })
}





