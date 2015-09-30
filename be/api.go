package main

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type SimpleBoard struct {
	key   string
	title string
}

func boardsListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// Get all boards
		var boards []Board
		_ = "breakpoint"
		db.Find(&boards)
		b, err := json.Marshal(&boards)
		if err != nil {
			return
		}
		w.Write(b)
	} else if r.Method == "POST" {
		// Create the board
		var board Board
		bytes, _ := ioutil.ReadAll(r.Body)
		err := json.Unmarshal(bytes, &board)
		if err != nil {
			return
		}

		size := 32

		rb := make([]byte, size)
		_, err2 := rand.Read(rb)

		if err2 != nil {
			return
		}
		rs := base64.URLEncoding.EncodeToString(rb)

		board.Key = rs
		db.Save(&board)

		b, err := json.Marshal(&board)
		if err != nil {
			return
		}
		w.Write(b)
	}
}
