package router

import (
	"go-server/middleware"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/table", middleware.GetAllTable).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/table", middleware.CreateTable).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/table/{id}", middleware.TableComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undotable/{id}", middleware.CleanTable).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deletetable/{id}", middleware.DeleteTable).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAlltable", middleware.DeleteAllTable).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/booking", middleware.GetAllOrder).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/booking", middleware.CreateOrder).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deletebooking/{id}", middleware.DeleteOrder).Methods("DELETE", "OPTIONS")
	return router
}
