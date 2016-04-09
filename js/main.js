
var mainBoard = Board.create();

// load 12 images and randomly put
var spots = [];
for(var i = 0;i<12;i++){
    spots[i] = Spot.create(i);
}
for(var i = 0;i<12;i++){
    var randomN = parseInt(Math.random()*Object.keys(spots).length);
    mainBoard.putSpot(spots[randomN]);
    spots.splice(randomN, 1);
}
