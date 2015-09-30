import {
    Component,
    View,
    bootstrap,
    CORE_DIRECTIVES,
    NgFor,
    NgIf,
} from 'angular2/angular2';

import {
    Http,
    HTTP_BINDINGS,
} from 'angular2/http';

import {
    FORM_DIRECTIVES,
    FORM_BINDINGS,
    FormBuilder,
    ControlGroup,
    Control,
    Validators,
} from 'angular2/forms';

@Component({
    selector: 'newboard',
    viewBindings: [HTTP_BINDINGS, FormBuilder],
})
@View({
    templateUrl: 'homepage/newBoard/newBoard.html',
    directives: [NgFor, NgIf, FORM_DIRECTIVES],
})
export class NewBoard {
    boards: Array<any>;
    http: Http;
    loading: boolean;
    newBoardForm: ControlGroup;
    constructor(http: Http, builder: FormBuilder) {
        this.http = http;
        this.newBoardForm = new ControlGroup({
            title: new Control('', Validators.required),
        });
    }

    createBoard() {
        if (!this.newBoardForm.valid) {
            return;
        }
        var title = this.newBoardForm.controls.title.value;
        this.loading = true;
        this.http.post('boards', JSON.stringify({ title: title }))
        .toRx()
        .map(res => res.json())
        .subscribe(board => {
            this.loading = false;
        });
    }
}
