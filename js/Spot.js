
/**
 * Class Spot
 * A spot is an image and will be put on a cell
 **/
function Spot(i){
    this.dom = document.createElement('img');
    this.dom.className = 'spot';
    this.dom.src = 'images/'+i+'.png';
    this.id = i;
    this.attemptCount = 0;
}

Spot.create = function(i){
    var spot = new Spot(i);
    return spot;
};

Spot.prototype = {
    isOverlap: function(spot){
        var t1 = this.dom.offsetTop;
        var h1 = this.dom.height;
        var t2 = spot.dom.offsetTop;
        var h2 = spot.dom.height;

        var l1 = this.dom.offsetLeft;
        var w1 = this.dom.width;
        var l2 = spot.dom.offsetLeft;
        var w2 = spot.dom.width;
        var ret = _isBetween(t1, h1, t2, h2) && _isBetween(l1, w1, l2, w2);
        return ret;
    }
};

/**
 * check if overlap
 * @return {Boolean} true if -b<y-x<a
 */
function _isBetween(y, b, x, a){
    return -b < y-x && y-x < a;
}
