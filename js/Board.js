
/**
 * Class Board
 * A board has 12 cells in 4x3
 **/
function Board(){
    this.dom = document.createElement('div');
    this.dom.className = 'board';

    this.cells = [];
    for(var i = 0 ;i<4;i++){
        this.cells[i] = [];
        for(var j = 0 ;j<3;j++){
            this.cells[i][j] = Cell.create();
            this.appendCell(this.cells[i][j]);
        }
    }
    
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

function putSpot(spot){
    this.cells[0][0].dom.appendChild(spot);
}
