import {
    Component,
    View,
    CORE_DIRECTIVES,
    NgFor,
} from 'angular2/angular2';

import {Card} from 'board/column/card/card'
import {BoardModel, ColumnModel, CardModel} from 'board/boardModel'


@Component({
    selector: 'board-column',
    properties: ['column'],
})
@View({
    templateUrl: 'board/column/column.html',
    styleUrls: ['board/column/column.css'],
    directives: [NgFor, Card],
})
export class Column {
    column: ColumnModel;
    addCard() {
        this.column.addCard('Empty');
    }
    destroy() {
        this.column.destroy();
    }
}
