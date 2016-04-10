
var mainBoard = Board.create();

// load 12 images
var spots = [];
for(var i = 0;i<12;i++){
    spots[i] = Spot.create(i);
}

// start count down timer
var countdown = 120;
var freq = 10;
var timer = setInterval(function(){
    countdown--;
    if(countdown%freq == 0) randomlyPut();
    document.getElementById('countdown').innerHTML = countdown;
//    swing();
    if(countdown <= 0) clearInterval(timer);
}, 1000);



function randomlyPut(){
    var randomN = parseInt(Math.random()*Object.keys(spots).length);
    mainBoard.putSpot(spots[randomN]);
    spots.splice(randomN, 1);
}

function swing(){
    mainBoard.swingSpots();
    document.getElementById('is-swinging').innerHTML = mainBoard.isSwing;
}
function freeze(){
    mainBoard.freezeSpots();
    document.getElementById('is-swinging').innerHTML = mainBoard.isSwing;
}
