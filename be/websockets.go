package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Test struct {
	Text   string
	Number int
}

func boardHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	for {
		var tests []Test
		// _ = "breakpoint"
		err := conn.ReadJSON(&tests)
		if err != nil {
			return
		}
		tests[0].Number++
		err = conn.WriteJSON(&tests)
		if err != nil {
			return
		}
	}
}
