
/**
 * Class Spot
 * A spot is an image and will be put on a board
 **/
function Spot(i){
    this.dom = document.createElement('img');
    this.dom.className = 'spot';
    this.dom.src = 'images/'+i+'.png';

    this.dom.addEventListener('dragstart', _onDragStart);
    this.dom.addEventListener('drag', _onDrag);
    this.dom.addEventListener('dragend', _onDragEnd);
    this.dom.addEventListener('touchstart', _onDragStart);
    this.dom.addEventListener('touchmove', _onDrag);

    this.id = i;
    this.attemptCount = 0;
}

Spot.create = function(i){
    var spot = new Spot(i);
    return spot;
};

Spot.prototype = {
    /**
     * Check two spots if overlapped or not.
     */
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
    },

    /**
     * Update DOM size
     */
    scale: function(ratio){
        var aspectRatio = this.dom.height / this.dom.width;
        this.dom.width = this.dom.width*ratio;
        this.dom.height = this.dom.width*aspectRatio;
    }
};

/**
 * check if overlap
 * @return {Boolean} true if -b<y-x<a
 * @private
 */
function _isBetween(y, b, x, a){
    return -b < y-x && y-x < a;
}

/**
 * Store init values for drag
 * @private
 */
function _onDragStart(ev){
    var dom = ev.srcElement;
    if(ev.changedTouches !== undefined){
        ev.clientX = ev.changedTouches[0].clientX;
        ev.clientY = ev.changedTouches[0].clientY;
    }
    dom.dragStartX = ev.clientX;
    dom.dragStartY = ev.clientY;
    dom.style.display = 0;
}

/**
 * Update DOM by calculating location offsets
 * @private
 */
function _onDrag(ev){
    var dom = ev.srcElement;

    if(ev.changedTouches !== undefined){
        ev.clientX = ev.changedTouches[0].clientX;
        ev.clientY = ev.changedTouches[0].clientY;
    }

    var left = dom.offsetLeft + ev.clientX - dom.dragStartX;
    var top = dom.offsetTop + ev.clientY - dom.dragStartY;
    dom.dragStartX = ev.clientX;
    dom.dragStartY = ev.clientY;

    if(left >= 0 && left < dom.parentElement.scrollWidth - dom.width) dom.style.left = left + 'px';
    if(top >= 0 && top < dom.parentElement.scrollHeight - dom.height) dom.style.top = top + 'px';
}

/**
 * Restore style when drag end
 * @private
 */
function _onDragEnd(ev){
    var dom = ev.srcElement;
    dom.style.opacity = 1;
}
