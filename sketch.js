const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour, minuute;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg();
    
}

function setup(){
    var canvas = createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);
    
    if(hour>=12){
        text("Time: "+ hour%12 + ":" + minute + " PM", 50,100);
    }else if(hour==0){
        text("Time: 12:" + minute + " AM",100,100);
    }else{
        text("Time: "+ hour%12 + ":" + minute + " AM", 50,100);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
    var IPResponse = await fetch("https://api.ipify.org?format=json")
    var IPResJSON = await IPResponse.json()
    var IP = IPResJSON.ip
    
    var timeRes = await fetch("https://worldtimeapi.org/api/ip")
    var timeJSON = await timeRes.json()
    var dateTime =  timeJSON.datetime
    hour = dateTime.slice(11, 13)
    minute = dateTime.slice(14, 16)
    var time = hour * 60 + minute 

    var SunResponse = await fetch("https://api.ipgeolocation.io/astronomy?apiKey=3802621872244b0197de33d13ac68455&ip=" + IP)
    var SunResJSON = await SunResponse.json()
    var sunriseCom = SunResJSON.sunrise
    var sunsetCom = SunResJSON.sunset
    var sunrise = sunriseCom.slice(0, 2) * 60 + sunriseCom.slice(3, 5)
    var sunset = sunsetCom.slice(0, 2) * 60 + sunsetCom.slice(3, 5) 
 
    //change the data in JSON format and store it in variable responseJSON
    

    
    //fetch datetime from responseJSON
    
    

    // slice the datetime to extract hour
    

    
    if(time >= sunrise && hour < sunset){
        bg = "sunrise.png";
    }
    else{
        bg="sunset.png"
    }
    
    backgroundImg = loadImage(bg);
}
