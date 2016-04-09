
/**
 * Class Board
 * A board has 12 cells in 4x3
 **/
function Board(){
    this.dom = document.createElement('div');
    this.dom.className = 'board';

    this.downRatio = 0.9;
    this.desityRatio = 1/6;

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
    putSpot: putSpot,
    _putSpot: _putSpot
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
    if(spot.dom.complete) self._putSpot(spot);
    else spot.dom.addEventListener('load', load);

    function load(){ window.requestAnimationFrame(renderer); }
    function renderer(){ window.requestAnimationFrame(doPut); }
    function doPut(){
        self._putSpot(spot);
        console.log('putSpot: id, attempts, cosumedTime:', spot.id, spot.attemptCount, Date.now()-start);
    }
}

/**
 * Put spot, check if overlap, scale down and retry, failed if size too small
 * @private
 */
function _putSpot(spot){
    var self = this;
    // img rendered
    spot.attemptCount++;

    // scale down if too many tries or too large
    if(spot.attemptCount%10 == 0 || spot.dom.width > self.dom.scrollWidth*self.desityRatio){
        spot.scale(self.downRatio);
        return self._putSpot(spot);
    }

    // fail
    if(spot.attemptCount > 10 && spot.dom.height == 0) {
        console.log('fail to put the spot:', spot);
        self.dom.removeChild(spot.dom);
        return;
    }

    var randomTop = parseInt(Math.random()*(self.dom.scrollHeight-spot.dom.height))+'px';
    var randomLeft = parseInt(Math.random()*(self.dom.scrollWidth-spot.dom.width))+'px';
    spot.dom.style.top = randomTop;
    spot.dom.style.left = randomLeft;

    // validate position
    var isOverlap = self.spots.some(function(aSpot){
        return spot.isOverlap(aSpot);
    });

    // put successfully
    if(!isOverlap){
        self.spots.push(spot);
        return;
    }

    self._putSpot(spot);

}
