package main

import (
	"InvisibleHand/config"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type server struct {
	router *mux.Router
}

func (s *server) Start() {
	s.routes()

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
