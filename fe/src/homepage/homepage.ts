import {
    Component,
    View,
} from 'angular2/angular2';

import {NewBoard} from 'homepage/newBoard/newBoard'
import {BoardList} from 'homepage/boardList/boardList'

@Component({
    selector: 'homepage',
})
@View({
    templateUrl: 'homepage/homepage.html',
    styleUrls: ['homepage/homepage.css'],
    directives: [NewBoard, BoardList],
})
export class Homepage {}