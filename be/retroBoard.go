package main

import (
	"bytes"
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, Ias love %s!", r.URL.Path[1:])
}

func main() {
	var buf bytes.Buffer
	logger := log.New(&buf, "[Info] ", log.Lshortfile)

	initDB()
	http.HandleFunc("/socket", boardHandler)
	assets := http.StripPrefix("/", http.FileServer(http.Dir("../fe/dist")))
	http.HandleFunc("/boards", boardsListHandler)
	http.Handle("/", assets)

	logger.Print("Initialized")

	http.ListenAndServe(":3001", nil)
}
