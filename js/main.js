
var mainBoard = Board.create();

// random load and put 12 images
for(var i = 12;i>0;i--){
    var randomN = parseInt(Math.random()*12);
    var spot = Spot.create(randomN);
    mainBoard.putSpot(spot);
}
