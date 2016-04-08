
/**
 * Class Spot
 * A spot is an image and will be put on a cell
 **/
function Spot(i){
    this.dom = document.createElement('img');
    this.dom.className = 'spot';
    this.dom.src = 'images/'+i+'.png';
}

Spot.create = function(i){
    var spot = new Spot(i);
    return spot;
};
