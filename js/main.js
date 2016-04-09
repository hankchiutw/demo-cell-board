
var mainBoard = Board.create();

// load 12 images
var spots = [];
for(var i = 0;i<12;i++){
    spots[i] = Spot.create(i);
}

var countDown = 120;
var freq = 10;
var timer = setInterval(function(){
    countDown--;
    if(countDown%freq == 0) randomlyPut();
    document.getElementById('count-down').innerHTML = countDown;
    if(countDown == 0) clearInterval(timer);
}, 1000);

function randomlyPut(){
    var randomN = parseInt(Math.random()*Object.keys(spots).length);
    mainBoard.putSpot(spots[randomN]);
    spots.splice(randomN, 1);
}
