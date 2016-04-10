
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
    this.swingTimer;
}

Spot.create = function(i){
    var spot = new Spot(i);
    return spot;
};

Spot.prototype = {
    /**
     * Check two spots if overlapped or not.
     * @return {Boolean}
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
     * @param {Number} ratio
     */
    scale: function(ratio){
        var aspectRatio = this.dom.height / this.dom.width;
        this.dom.width = this.dom.width*ratio;
        this.dom.height = this.dom.width*aspectRatio;
    },

    /**
     * Swing within the bounded area
     * @param {Number} boundLeft
     * @param {Number} boundTop
     */
    boundedSwing: function(boundLeft, boundTop){
        var self = this;
        var amplitudeRate = boundLeft*1;
        var durationRate = boundLeft*1.2*_randomBetween(1, 1.5);
        var smoothRate = durationRate*_randomBetween(0.5, 1);

        if(this.swingTimer) this.freeze();
        this.swingTimer = setInterval(function step(){
            var dX = parseInt(_randomBetween(-1, 1)*amplitudeRate);
            var dY = parseInt(_randomBetween(-1, 1)*_randomBetween(-1, 1)*amplitudeRate);
            var nextX = self.dom.offsetLeft + dX;
            var nextY = self.dom.offsetTop + dY;

            // handle for outbound
            if(!_isBetween(self.dom.width, boundLeft-2*self.dom.width, nextX, self.dom.width)) return step();
            if(!_isBetween(self.dom.height, boundTop-2*self.dom.height, nextY, self.dom.height)) return step();

            // random animation
            self.dom.style.transform = 'translate('+dX+'px, '+dY+'px)';
            self.dom.style['transition-duration'] = (durationRate)+'ms';
            self.dom.style['transition-time-function'] = ['cubic-bezier(', Math.random(), Math.random(), Math.random(), Math.random(),')'].join(',');
        }, smoothRate);
    },

    /**
     * Freeze from swinging
     */
    freeze: function(){
        window.clearInterval(this.swingTimer);
    }
};

/**
 * check if overlap
 * @param {Number} o1 An origin
 * @param {Number} d1 An deviation
 * @param {Number} o2 An origin
 * @param {Number} d3 An deviation
 * @return {Boolean} true if -b<y-x<a
 * @private
 */
function _isBetween(o1, d1, o2, d2){
    return -d1 < o1-o2 && o1-o2 < d2;
}

/**
 * Get a random number between (a, b)
 * @private
 */
function _randomBetween(a, b){
    return Math.random()*(b-a)+a;
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
