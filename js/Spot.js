
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
        this.dom.width = Math.floor(this.dom.width*ratio);
        this.dom.height = Math.floor(this.dom.width*aspectRatio);
    },

    /**
     * Update DOM size and location
     * @param {Number} ratio
     */
    scaleLocation: function(ratio){
        this.dom.style.left = Math.floor(this.dom.offsetLeft*ratio)+'px';
        this.dom.style.top = Math.floor(this.dom.offsetTop*ratio)+'px';
        this.scale(ratio);
    },

    /**
     * Swing within the bounded area
     * @param {Number} boundLeft
     * @param {Number} boundTop
     */
    boundedSwing: function(boundLeft, boundTop){
        var self = this;
        var w = self.dom.width;
        var h = self.dom.height;

        var animDeviation = 0;
        var amplitudeRate = boundLeft;

        if(self.swingTimer) self.freeze();

        // different interval for each swing
        (function doSwing(){
            var speedRate = _randomBetween(300, 1000);
            var durationRate = speedRate*_randomBetween(1, 3);
            self.swingTimer = setTimeout(function step(){
                var X = self.dom.offsetLeft;
                var Y = self.dom.offsetTop;

                // random direction
                var deg = _randomBetween(0, 360);
                var dX = parseInt(Math.cos(deg)*amplitudeRate);
                var dY = parseInt(Math.sin(deg)*amplitudeRate);

                var nextX = X + dX;
                var nextY = Y + dY;

                // handle for outbound
                if(nextX<animDeviation) nextX = X - parseInt(_randomBetween(0, X-animDeviation));
                if(nextX > boundLeft-w-animDeviation) nextX = X + parseInt(_randomBetween(0, boundLeft - X - w - animDeviation));
                if(nextY<animDeviation) nextY = Y - parseInt(_randomBetween(0, Y-animDeviation));
                if(nextY > boundTop-h-animDeviation) nextY = Y + parseInt(_randomBetween(0, boundTop - Y - h - animDeviation));

                // random animation
                self.dom.style['transition-duration'] = durationRate+'ms';
                self.dom.style['transition-timing-function'] = ['cubic-bezier(', Math.random(), Math.random(), Math.random(), Math.random(),')'].join(',');
/*
                self.dom.style['animation-duration'] = (durationRate)+'ms';
                self.dom.style['animation-timing-function'] = ['cubic-bezier(', Math.random(), Math.random(), Math.random(), Math.random(),')'].join(',');
                self.dom.style['animation-name'] = 'swing'+parseInt(_randomBetween(0, 4)%4);
*/
                self.dom.style.left = nextX +'px';
                self.dom.style.top = nextY +'px';

                doSwing();
            }, speedRate);

        })();
    },

    /**
     * Freeze from swinging, re-enable normal drag animation
     */
    freeze: function(){
        var self = this;
        window.clearInterval(self.swingTimer);
        self.dom.style['transition-duration'] = '0ms';
        self.dom.style['transition-timing-function'] = 'linear';
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
