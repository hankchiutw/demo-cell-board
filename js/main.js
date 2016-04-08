
// create images
var spots = [];
for(var i = 0;i<12;i++){
    spots.push(Spot.create(i).dom);
}

var mainBoard = Board.create();

var seed12 = parseInt(Math.random()*100)%12;
mainBoard.putSpot(spots[0]);
