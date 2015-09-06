export class CardModel {
    content: string;
    column: ColumnModel;
    votes: number;
    constructor(column: ColumnModel, content: string) {
        this.content = content;
        this.column = column;
        this.votes = 0;
    }
    destroy() {
        this.column.removeCard(this);
    }
    vote() {
        this.votes++;
    }
}

export class ColumnModel {
    cards: Array<CardModel>;
    title: string;
    board: BoardModel;
    constructor(board: BoardModel, title: string) {
        this.board = board;
        this.title = title;
        this.cards = [
            new CardModel(this, 'test card 1'),
            new CardModel(this, 'test card 2'),
        ];
    }
    addCard(content: string) {
        this.cards.push(new CardModel(this, content));
    }
    removeCard(card: CardModel) {
        this.cards.splice(this.cards.indexOf(card), 1);
    }
    destroy() {
        this.board.removeColumn(this);
    }
}

export class BoardModel {
    columns: Array<ColumnModel>;
    constructor() {
        this.columns = [
            new ColumnModel(this, 'Test1'),
            new ColumnModel(this, 'Test2'),
        ];
    }
    addColumn(content: string) {
        this.columns.push(new ColumnModel(this, content));
    }
    removeColumn(column: ColumnModel) {
        this.columns.splice(this.columns.indexOf(column), 1);
    }
}
