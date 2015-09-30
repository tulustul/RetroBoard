import {
    Component,
    View,
    bootstrap,
    CORE_DIRECTIVES,
    NgFor,
} from 'angular2/angular2';

import {RouterLink} from 'angular2/router';

import {Column} from 'board/column/column'
import {BoardModel, ColumnModel} from 'board/boardModel'
import {SocketService} from 'socket/socket'

@Component({
    selector: 'board',
})
@View({
    templateUrl: 'board/board.html',
    styleUrls: ['board/board.css'],
    directives: [NgFor, Column, RouterLink],
})
export class Board {
    board: BoardModel;
    constructor(socketService: SocketService) {
        this.board = new BoardModel();
    }
    addColumn() {
        this.board.addColumn('asddasd');
    }
}
