import {
    Component,
    View,
    NgIf,
    Host,
} from 'angular2/angular2';

import {Column} from 'board/column/column';
import {BoardModel, CardModel} from 'board/boardModel';
import {SocketService} from 'socket/socket';

@Component({
    selector: 'card',
    properties: ['card'],
})
@View({
    templateUrl: 'board/column/card/card.html',
    styleUrls: ['board/column/card/card.css'],
    directives: [NgIf],
})
export class Card {
    editing: boolean;
    card: CardModel;
    socketService: SocketService;
    constructor(socketService: SocketService) {
        this.editing = false;
        this.socketService = socketService;
    }
    edit() {
        this.editing = true;
    }
    submitOnEnter(event) {
        if (event.which === 13) {
            this.submit(event);
        }
    }
    submit(event) {
        this.card.content = event.target.value;
        this.editing = false;
    }
    destroy() {
        this.card.destroy();
    }
    vote() {
        this.card.vote();
        this.socketService.doSend('vote');
    }
}
