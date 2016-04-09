
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
        var t2 = spot.dom.offsetTop;
        var h2 = spot.dom.scrollHeight;

        var l1 = this.dom.offsetLeft;
        var l2 = spot.dom.offsetLeft;
        var w2 = spot.dom.scrollWidth;
        return t1-t2 > 0 && t1-t2 < h2 && l1-l2 > 0 && l1-l2 < w2;
    }
};
