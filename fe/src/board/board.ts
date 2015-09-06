import {
    Component,
    View,
    bootstrap,
    CORE_DIRECTIVES,
    NgFor,
} from 'angular2/angular2';

import {Column} from 'board/column/column'
import {BoardModel, ColumnModel} from 'board/boardModel'

@Component({
    selector: 'board',
})
@View({
    templateUrl: 'board/board.html',
    styleUrls: ['board/board.css'],
    directives: [NgFor, Column],
})
export class Board {
    board: BoardModel;
    constructor() {
        this.board = new BoardModel();
    }
    addColumn() {
        this.board.addColumn('asddasd');
    }
}

bootstrap(Board);
