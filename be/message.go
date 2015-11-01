package main

import (
	"encoding/json"
	"github.com/gorilla/websocket"
)

type Test struct {
	Text   string
	Number int
}

func processMessage(conn *websocket.Conn) []byte {

	var tests []Test
	// _ = "breakpoint"
	err := conn.ReadJSON(&tests)
	if err != nil {
		return nil
	}
	tests[0].Number++
	message, err := json.Marshal(&tests)
	if err != nil {
		return nil
	}
	return message
}
