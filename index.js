var userPattern = [];
var gamePattern = [];
var toggle = false;

var lvl = 1;
var firstSequenceTime = 200;


document.onclick = function(){
    document.querySelector("#level-title").innerHTML = `Level ${lvl}`;
    if(toggle== false){
        sequence();
        toggle = true;
    }
} 

for(var i=0; i<document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        var choosenColor = this.getAttribute("id");
        
        
        userPattern.push(choosenColor);
        animate(choosenColor);
        sounds(choosenColor);
        checking(userPattern.length-1);
        console.log(userPattern);
    });
    
}

function sequence(){
    setTimeout(function(){
        var randomizer = Math.floor(Math.random()*4);
        var randomColor = document.querySelectorAll(".btn")[randomizer].getAttribute("id");

        sounds(randomColor);
        animate(randomColor);
        gamePattern.push(randomColor);
        console.log(gamePattern);
    },firstSequenceTime);
    
}   

function animate(color){
    document.querySelector(`#${color}`).classList.add("pressed");
    setTimeout(function(){
        document.querySelector(`#${color}`).classList.remove("pressed");
    }, 200);
}

function sounds(id){
    var audio = new Audio(`sounds/${id}.mp3`)
    audio.play();
}

function checking(Length){
    if(gamePattern[Length] == userPattern[Length] ){
        if(userPattern.length == gamePattern.length){
            userPattern = [];
            lvl += 1;
            document.querySelector("#level-title").innerHTML = `Level ${lvl}`;          
            firstSequenceTime = 600;
            sequence();  
        }
    }
    else{
        userPattern = [];
        gamePattern = [];
        lvl = 1;
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        }, 200);
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        startOver();
    }
}

function startOver(){
    document.getElementById("level-title").innerHTML = "GAME OVER, CLICK AGAIN TO RESTART!";
    toggle = false;
}