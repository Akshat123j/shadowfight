function preload(){
  hit1=loadAnimation("1.png","3.png","4.png","5.png","6.png","7.png");
  hit2=loadAnimation("8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png");
  hit3=loadAnimation("16.png");
  hit4=loadAnimation("1(2).png","3(2).png","4(2).png","5(2).png","6(2).png","7(2).png");
  hit5=loadAnimation("8(2).png","9(2).png","10(2).png","11(2).png","12(2).png","13(2).png","14(2).png","15(2).png");
  hit6=loadAnimation("16(2).png");
  soldier4Img=loadAnimation("Untitled6 (2).png","Untitled7 (2).png");
  soldier3Img=loadAnimation("Untitled6.png","Untitled7.png");
  soldier2Img=loadAnimation("Untitled1.png","Untitled2.png","Untitled3.png","Untitled4.png","Untitled5.png");
  soldier1Img=loadAnimation("Untitled1 (2).png","Untitled2 (2).png","Untitled3 (2).png","Untitled4 (2).png");
  dragon2=loadAnimation("d1.png","d2.png","d3.png","d4.png","d5.png");
  dragon1=loadAnimation("d1 (2).png","d2 (2).png","d4 (2).png","d5 (2).png");
  fire2=loadImage("fire.png");
  fire1=loadImage("fire (2).png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  ground=createSprite(width/2,height/1.25,width,height/8.75);
  ground.shapeColor="brown";
  powerHit=35;
  soldier=createSprite(width/1.25,height/1.5,100,100);
  soldier.addAnimation("soldier1",soldier1Img);
  soldier.addAnimation("soldier2",soldier2Img);
  soldier.addAnimation("soldier3",soldier3Img);
  soldier.addAnimation("soldier4",soldier4Img);
  soldier.scale=0.5;
  soldier.setCollider("rectangle",0,0,50,95);
  fire=createSprite(0,height/1.75,50,50);
  fire.addImage(fire1);
  fire.addImage(fire2);
  fire.scale=0.35
  drago=createSprite(width,height/1.75,50,50);
  drago.addAnimation("dragon2",dragon2);
  drago.addAnimation("dragon1",dragon1);
  drago.scale=1.5;
  player=createSprite(width/3,height/1.5,100,100);
  player.addAnimation('hit1',hit1);
  player.addAnimation('hit2',hit2);
  player.addAnimation('hit3',hit3);
  player.addAnimation('hit4',hit4);
  player.addAnimation('hit5',hit5);
  player.addAnimation('hit6',hit6);
  playerLife=100;
  soldierLife=100;
  dragonLife=200;
  fireDamage=1
  round=1;
  a=-30
  SERVE=0;
  PLAY=1;
  gameState=SERVE
}
function draw(){
  background(50,50,50);
  ca3();
  player.velocityY=2;
  player.collide(ground);soldier.collide(ground);
  player.setCollider("rectangle",0,0,30,60);
  textSize(20);
  text("player's :"+playerLife,10,height/7.5);
  text("round :"+round,width-100,height/7.5)
  if(gameState==SERVE){
    fire.visible=false;
    drago.visible=false;
    soldier.visible=false;
    text("press 'a' to attack",width/3.5,height/5);
    text("press 's' for power hit",width/3.5,height/5+20);
    text("powerhit is available for lmt.time",width/3.5,height/5+40);
    text("this game wil have 3 rounds",width/3.5,height/5+60);
    textSize(50)
    text("press 'space'",width/3.5,height/2);
    if(keyDown("space")){gameState=PLAY;playerLife=100;soldier.x=width/1.25;drago.x=width;round=1;soldierLife=100;}
    text()
  }
  if(gameState==PLAY){
      if(round!=2&&soldierLife>0){
        controlSoldier();
        textSize(20)
        text("soldier's :"+soldierLife,10,height/10)
        if(round==1&&soldierLife<=0){round=2}
      }else{soldier.visible=false;}
        if(round!=1&&dragonLife>0){drago.visible=true;controlDrago();text("dragon's :"+dragonLife,width/2,height/7.5)}
        else{drago.visible=false;fire.visible=false;fireDamage=0;};
        if(round==2&&dragonLife<=0){round=3;soldierLife=100;dragonLife=200};
        if(round==3&&soldierLife<=0&&dragonLife<=0){gameState=SERVE}
        if(keyDown("a")){ca1();}
        if(keyDown("s")&&powerHit>0){ca2();powerHit--;}
        if(powerHit<0){ca3()}if(frameCount%135==0){powerHit=35}
        if(keyDown("d")){ca3();}
        if(keyWentDown("up")&&player.y>height/1.5){up();}
        if(keyDown("left")&&player.x<(width)&&player.x>50){left();player.changeAnimation("hit6",hit6);
        if(keyDown("a")){player.changeAnimation("hit4",hit4)}
        if(keyDown("s")&&powerHit>0){player.changeAnimation("hit5",hit5)}}
        if(keyDown("right")&&player.x<(width-50)&&player.x>0){right();}
    }
    if(playerLife<=0){gameState=SERVE}
  drawSprites();
}
function controlSoldier(){
  soldier.visible=true;
  soldier.velocityY=2;
  if(soldier.x>(player.x)){soldier.velocityX=-2;soldier.changeAnimation("soldier1",soldier1Img);};
  if(soldier.x<player.x){soldier.velocityX=2;soldier.changeAnimation("soldier2",soldier2Img);}
  if(soldier.isTouching(player)){
    soldier.velocityX=0;
    if(keyDown("a")&&frameCount%20==0){soldierLife-=2}
    if(soldier.x<player.x){soldier.changeAnimation("soldier3",soldier3Img)};
    if(soldier.x>player.x){soldier.changeAnimation("soldier4",soldier4Img)};
    if(keyWentDown("s")&&powerHit>0){
      soldierLife-=5;
    }
    if(frameCount%20==0){playerLife-=1;}
  } 
}
function controlDrago(){
  fire.setCollider("rectangle",0,25,100,200)
  fire.x=drago.x+a;
  if(drago.x>(player.x+100)){drago.velocityX=-2;drago.changeAnimation("dragon1",dragon1);
  drago.setCollider("rectangle",-20,0,30,80);
  fire.addImage(fire2);a=-60}
  if(drago.x<(player.x-100)){drago.velocityX=2;drago.changeAnimation("dragon2",dragon2);
  fire.addImage(fire1);a=60
  drago.setCollider("rectangle",20,0,30,80)}
  if(drago.isTouching(player)){
    fire.visible=true;
    if(drago.x>(player.x+100)){fire.addImage(fire2)}
  }else{fire.visible=false}
  if(fire.isTouching(player)&&fire.visible==true){playerLife-=fireDamage}
  if(player.isTouching(drago)){
    if(keyDown("a")){
      dragonLife-=2
    }
    if(keyDown("s")&&powerHit>0){
      dragonLife-=5
    }
  }
  }
function ca1(){
  player.changeAnimation("hit1",hit1);

}
function ca2(){
  player.changeAnimation("hit2",hit2)
}
function ca3(){
  player.changeAnimation("hit3",hit3)
}
function left(){
  player.x-=4;
}
function right(){
  player.x+=4;
}
function up(){ 
  player.y=height/2;   
}
