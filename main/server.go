package main

import (
	"fmt"
	"invisiblehand/config"
	"invisiblehand/models/world"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type server struct {
	router *mux.Router

	gameMap world.Map
}

func (s *server) Start() {
	s.routes()

	s.gameMap = world.MakeMap(10, 10)

	http.ListenAndServe(getPort(), s.router)
}

func main() {
	gameServer := server{
		router: mux.NewRouter(),
	}

	gameServer.Start()
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = config.Port
	}
	return fmt.Sprintf(":%s", port)
}
