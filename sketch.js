function preload(){
  hit1=loadAnimation("1.png","3.png","4.png","5.png","6.png","7.png");
  hit2=loadAnimation("8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png");
  hit3=loadAnimation("16.png");
  hit4=loadAnimation("1(2).png","3(2).png","4(2).png","5(2).png","6(2).png","7(2).png");
  hit5=loadAnimation("8(2).png","9(2).png","10(2).png","11(2).png","12(2).png","13(2).png","14(2).png","15(2).png");
  hit6=loadAnimation("16(2).png");
  soldier=loadAnimation("Untitled1.png","Untitled2.png","Untitled3.png","Untitled4.png","Untitled5.png","Untitled6.png","Untitled7.png",);
  soldier1=loadAnimation("Untitled1 (2).png","Untitled2 (2).png","Untitled3 (2).png","Untitled4 (2).png","Untitled5 (2).png","Untitled6 (2).png","Untitled7 (2).png",);
  dragon=loadAnimation("d1.png","d2.png","d3.png","d4.png","d5.png");
  dragon1=loadAnimation("d1 (2).png","d2 (2).png","d4 (2).png","d5 (2).png");
  fire=loadImage("fire.png");
  fire1=loadImage("fire (2).png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  player=createSprite(width/3,height/1.5,100,100);
  player.addAnimation('hit1',hit1);
  player.addAnimation('hit2',hit2);
  player.addAnimation('hit3',hit3);
  player.addAnimation('hit4',hit4);
  player.addAnimation('hit5',hit5);
  player.addAnimation('hit6',hit6);
  ground=createSprite(width/2,height/1.25,width,height/8.75);
  ground.shapeColor="brown";
  button1=createSprite(width/1.25,height/1.25,10,10);
  button2=createSprite(width/1.25,height/1.05,10,10);
  button3=createSprite(width/1.5,height/1.15,10,10);
  button4=createSprite(width/10.25,height/1.25,10,10);
  button6=createSprite(width/100.25,height/1.15,10,10);
  button7=createSprite(width/5.25,height/1.15,10,10);
  powerHit=35;
}
function draw(){
  background("black");
  ca3();
  player.velocityY=2;
  player.collide(ground);
  player.setCollider("rectangle",0,0,10,60)
  if(mousePressedOver(button1)){
    ca1();
  }  if(mousePressedOver(button2)&&powerHit>=0){
    ca2();powerHit--;console.log(powerHit);
  }if(powerHit<0){button2.visible=false}if(frameCount%135==0){powerHit=35;button2.visible=true}
   if(mousePressedOver(button3)){
    ca3();
  }
   if(mousePressedOver(button4)){
    up();
  }
   if(mousePressedOver(button6)){
    left();player.changeAnimation("hit6",hit6)
  }
   if(mousePressedOver(button7)){
    right();
  }

  drawSprites();
}

function ca1(){
  player.changeAnimation("hit1",hit1)
}
function ca2(){
  player.changeAnimation("hit2",hit2)
}
function ca3(){
  player.changeAnimation("hit3",hit3)
}
function left(){
  player.x--;
}
function right(){
  player.x++;
}
function up(){ 
    if(player.y>=height/2){
      player.y-=5;
      if(player.y<=height/2){
        player.y=height/1.5;
      }
  }
}
