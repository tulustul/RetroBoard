package main

// hub maintains the set of active connections and broadcasts messages to the
// connections.
type Hub struct {
	// Registered connections.
	connections map[*connection]bool

	// Inbound messages from the connections.
	broadcast chan []byte

	// Register requests from the connections.
	register chan *connection

	// Unregister requests from connections.
	unregister chan *connection
}

var hub = Hub{
	broadcast:   make(chan []byte),
	register:    make(chan *connection),
	unregister:  make(chan *connection),
	connections: make(map[*connection]bool),
}

func (hub *Hub) run() {
	for {
		select {
		case c := <-hub.register:
			hub.connections[c] = true
		case c := <-hub.unregister:
			if _, ok := hub.connections[c]; ok {
				delete(hub.connections, c)
				close(c.send)
			}
		case m := <-hub.broadcast:
			for c := range hub.connections {
				select {
				case c.send <- m:
				default:
					close(c.send)
					delete(hub.connections, c)
				}
			}
		}
	}
}
