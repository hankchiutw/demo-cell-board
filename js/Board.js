
/**
 * Class Board
 * A board has 12 cells in 4x3
 **/
function Board(){
    this.dom = document.createElement('div');
    this.dom.className = 'board';

    this.spots = [];
    
}

Board.create = function(){
    var board = new Board();
    document.body.appendChild(board.dom);
    board.dom.style.height = board.dom.scrollWidth*3/4+'px';
    console.log('mainBoard render ratio:', board.dom.scrollHeight/board.dom.scrollWidth );
    return board;
};

Board.prototype = {
    appendCell: appendCell,
    putSpot: putSpot
};

function appendCell(cell){
    this.dom.appendChild(cell.dom);
}

/**
 * Put one spot and validate position. If fail(overlap), return false
 */
function putSpot(spot){
    var self = this;
    var start = Date.now();
    self.dom.appendChild(spot.dom);

    // detect when image rendered and can get size
    window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
            // img rendered
            spot.attemptCount++;
            var randomTop = parseInt(Math.random()*(self.dom.scrollHeight-spot.dom.scrollHeight))+'px';
            var randomLeft = parseInt(Math.random()*(self.dom.scrollWidth-spot.dom.scrollWidth))+'px';
            console.log('putSpot: id, attempts, cosumedTime:', spot.id, spot.attemptCount, Date.now()-start);
            spot.dom.style.top = randomTop;
            spot.dom.style.left = randomLeft;

            // validate position
            var isOverlap = self.spots.some(function(aSpot){ spot.isOverlap(aSpot); });

            if(spot.attemptCount > 100) console.log('(FAIL) give up after too many tries');
            else if(isOverlap) self.putSpot(spot);

            self.spots.push(spot);

        });
    });
}
