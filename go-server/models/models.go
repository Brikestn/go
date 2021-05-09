package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TableList struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Table  string             `json:"table,omitempty"`
	Seat   string             `json:"seat,omitempty"`
	Img    string             `json:"img,omitempty"`
	Status bool               `json:"status,omitempty"`
}

type OrderList struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Table string             `json:"table,omitempty"`
	Name  string             `json:"name,omitempty"`
	Tel   string             `json:"tel,omitempty"`
	Date  string             `json:"date,omitempty"`
}
