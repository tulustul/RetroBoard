package main

import (
	"bytes"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

type Card struct {
	ID       int
	Content  string
	Votes    int
	ColumnID int `sql:"index"`
}

type Column struct {
	ID      int
	Title   string `sql:"type:varchar(255)"`
	Cards   []Card
	BoardID int `sql:"index"`
}

type Board struct {
	ID             int
	Key            string `sql:"type:varchar(36)"` // UUID
	Title          string `sql:"type:varchar(255)"`
	VotesAvailable int
	Columns        []Column
}

func initDB() {
	db, err := gorm.Open(
		"postgres",
		"user=postgres dbname=retroboard sslmode=disable",
	)

	if err != nil {
		fmt.Sprintf("Cannot connect to db: %s", err)
	}
	db.DB()

	db.DB().Ping()
	db.DB().SetMaxIdleConns(10)
	db.DB().SetMaxOpenConns(100)

	db.SingularTable(true)

	db.AutoMigrate(&Board{}, &Column{}, &Card{})
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
	var buf bytes.Buffer
	logger := log.New(&buf, "[Info] ", log.Lshortfile)

	initDB()
	http.HandleFunc("/", handler)

	logger.Print("Initialized")

	http.ListenAndServe(":8080", nil)
}
