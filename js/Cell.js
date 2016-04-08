
/**
 * Class Cell
 * A cell can contain only one spot
 **/
function Cell(){
    this.dom = document.createElement('div');
    this.dom.className = 'cell';
}

Cell.create = function(){
    var cell = new Cell();
    return cell;
};


