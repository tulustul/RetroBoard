export class SocketService {
    wsUri: string = "ws://127.0.0.1:3000/socket";
    websocket: WebSocket;

    constructor() {
        var that = this;
        this.websocket = new WebSocket(this.wsUri);
        this.websocket.onopen = function(evt) { that.onOpen(evt) };
        this.websocket.onclose = function(evt) { that.onClose(evt) };
        this.websocket.onmessage = function(evt) { that.onMessage(evt) };
        this.websocket.onerror = function(evt) { that.onError(evt) };
    }

    onOpen(evt) {
        this.writeToScreen("CONNECTED");
        this.doSend(JSON.stringify([
            {
                text: 'asdasd',
                number: 2,
            }, {
                text: 'abradabra',
                number: 21,
            },
        ]));
    }

    onClose(evt) {
        this.writeToScreen("DISCONNECTED");
    }

    onMessage(evt) {
        this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
        this.websocket.close();
    }

    onError(evt) {
        this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    doSend(message) {
        this.writeToScreen("SENT: " + message);
        this.websocket.send(message);
    }

    writeToScreen(message) {
        console.log(message);
    }
}
