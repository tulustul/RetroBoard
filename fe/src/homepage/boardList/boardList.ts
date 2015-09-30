import {
    Component,
    View,
    CORE_DIRECTIVES,
    NgFor,
    NgIf,
} from 'angular2/angular2';

import {
    Http,
    HTTP_BINDINGS,
} from 'angular2/http';

import {RouterLink} from 'angular2/router';

@Component({
    selector: 'boardlist',
    viewBindings: [HTTP_BINDINGS],
})
@View({
    templateUrl: 'homepage/boardList/boardList.html',
    directives: [NgFor, NgIf, RouterLink],
})
export class BoardList {
    boards: Array<any>;
    http: Http;
    loading: boolean;

    constructor(http: Http) {
        this.http = http;
        this.boards = [];
        http.get('boards')
        .toRx()
        .map(res => res.json())
        .subscribe(boards => this.boards = boards);
    }
}
