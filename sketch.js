const Body= Matter.Body
const Bodies= Matter.Bodies
const Engine= Matter.Engine
const World= Matter.World
const Constraint=Matter.Constraint
const Render=Matter.Render

var engine,pa
var start=30000
var gamestage=start
var endwin=10000
var endlose=20000
var turn=10
var score=0
var dh=300
var plinkos=[]
var division=[]

function setup() {
  createCanvas(480,800);
  engine=Engine.create()
  world=engine.world
  g1=new ground(240,795,480,10)
  g2=new divisions(240,795-15,480,20)
  
   for(k=0;k<=width;k=k+80){
    division.push(new divisions(k,height-dh/2,10,dh))
  }
  for(k=40;k<=width;k=k+50){
    plinkos.push(new plinko(k,75))
  }
  for(k=40;k<=width;k=k+50){
    plinkos.push(new plinko(k,275))
  }
  for(k=15;k<=width;k=k+50){
    plinkos.push(new plinko(k,175))
  }
  for(k=15;k<=width;k=k+50){
    plinkos.push(new plinko(k,375))
  }
     var render = Render.create({ 
    element: document.body, engine: engine, 
    options: { width: 1300, height: 600, wireframes: false } });
   Render.run(render);

   
}

function draw() {
  background(0); 
  textSize(28)
  stroke("green")
  strokeWeight(3)
  text("Score="+score,15,50)
  Engine.update(engine);
  drawSprites()
  g1.display()
  g2.display()
  if(pa!=null){
    pa.display()
    if(pa.body.position.y>700&&pa.body.position.x>0&&pa.body.position.x<160){
       score=score+500
       pa=null
    }
    else if(pa.body.position.y>700&&pa.body.position.x>160&&pa.body.position.x<320){
       score=score+100
       pa=null
    }
    
    else if(pa.body.position.y>700&&pa.body.position.x>320&&pa.body.position.x<480){
       score=score+200
       pa=null
    }  
  }
  
 if (score>=2500){
     gamestage=endwin
 }

 if (turn===0&&score<2500){
  gamestage=endlose
 }

 if(gamestage===endwin){
  textSize(58)
  stroke("blue")
  text("GameOver",150-50,250)
  text("you win",150,300)
 }
 else if(gamestage===endlose){
  textSize(58)
  stroke("blue")
  text("GameOver",150-50,250)
  text("you lose",150-10,300)
 
 }
 textSize(28)
 stroke("green")
  text("No of turns="+turn,280,50)
  stroke("red")
  text("500",15,530)
  text("500",15+83,530)
  text("100",15+83+78,530)
  text("100",15+83+83+75,530)
  text("200",15+83+83+83+75,530)
  text("200",15+83+83+83+83+70,530)
  stroke("cyan")
  for (var i = 0; i < plinkos.length; i++) {
     
    plinkos[i].display();
    
  }
  stroke("orange")
  for (var i = 0; i < division.length; i++) {
    
    division[i].display();
  }
}

function keyPressed(){
  if(keyCode===32&&gamestage===start){
    pa= new particle(mouseX,10)
    turn=turn-1
    
  }
}

