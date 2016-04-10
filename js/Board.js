
/**
 * Class Board
 * A board has spots
 **/
function Board(){
    this.dom = document.createElement('div');
    this.dom.className = 'board';

    this.aspectRatio = 3/4;
    this.scaleDownRatio = 0.9;
    this.densityRatio = 1/6;

    this.spots = [];
    this.isSwing = false;
    
}

Board.create = function(){
    var board = new Board();
    document.body.appendChild(board.dom);
    board.dom.style.height = board.dom.scrollWidth*board.aspectRatio+'px';
    console.log('board created');
    return board;
};

Board.prototype = {
    swingSpots: function(){
        var self = this;
        this.spots.forEach(function(spot){
            spot.boundedSwing(self.dom.scrollWidth, self.dom.scrollHeight);
        });
        this.isSwing = true;
    },
    freezeSpots: function(){
        var self = this;
        this.spots.forEach(function(spot){
            spot.freeze();
        });
        this.isSwing = false;
    },
    putSpot: putSpot,
    _putSpot: _putSpot
};


/**
 * Put one spot and validate position. If fail(overlap), return false
 */
function putSpot(spot){
    var self = this;
    var start = Date.now();
    self.dom.appendChild(spot.dom);

    // detect when image rendered and can get size
    if(spot.dom.complete) doPut();
    else spot.dom.addEventListener('load', load);

    function load(){ window.requestAnimationFrame(renderer); }
    function renderer(){ window.requestAnimationFrame(doPut); }
    function doPut(){
        self._putSpot(spot);
        console.log('putSpot: spot, attempts, cosumedTime:', spot, spot.attemptCount, Date.now()-start);
        if(self.isSwing) spot.boundedSwing(self.dom.scrollWidth, self.dom.scrollHeight);
    }
}

/**
 * Put one spot and check if overlapped.
 * Scale down and retry until passed. Failed if size becomes too small.
 * @private
 */
function _putSpot(spot){
    var self = this;
    spot.attemptCount++;

    // scale down if too many tries or too large
    if(spot.attemptCount%10 == 0 || spot.dom.width > self.dom.scrollWidth*self.densityRatio){
        spot.scale(self.scaleDownRatio);
        return self._putSpot(spot);
    }

    // fail
    if(spot.attemptCount > 10 && spot.dom.height == 0) {
        console.log('fail to put the spot:', spot);
        self.dom.removeChild(spot.dom);
        return;
    }

    // generate random location within the board
    var randomTop = parseInt(Math.random()*(self.dom.scrollHeight-spot.dom.height))+'px';
    var randomLeft = parseInt(Math.random()*(self.dom.scrollWidth-spot.dom.width))+'px';
    spot.dom.style.top = randomTop;
    spot.dom.style.left = randomLeft;

    // validate location
    var isOverlap = self.spots.some(function(aSpot){
        return spot.isOverlap(aSpot);
    });

    // successfully placed or retry
    if(!isOverlap) self.spots.push(spot);
    else self._putSpot(spot);

}
