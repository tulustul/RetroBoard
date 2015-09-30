package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
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
	Key            string `sql:"type:varchar(50)"`
	Title          string `sql:"type:varchar(255)"`
	VotesAvailable int
	Columns        []Column
}

var db gorm.DB

func initDB() {
	db_, err := gorm.Open(
		"postgres",
		"user=postgres dbname=retroboard sslmode=disable",
	)

	db = db_

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
