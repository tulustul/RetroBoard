package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func appHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../fe/dist/index.html")
}

func main() {
	initDB()

	r := mux.NewRouter()

	r.HandleFunc("/api/boards", boardsListHandler).Methods("GET")
	r.HandleFunc("/api/boards", newBoardsHandler).Methods("POST")
	r.HandleFunc("/socket", boardHandler)
	r.PathPrefix("/app").HandlerFunc(appHandler)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../fe/dist")))

	http.Handle("/", r)

	log.Println("Initialized")

	http.ListenAndServe(":3001", nil)
}
