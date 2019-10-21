package main

import (
	"fmt"
	"net/http"
)

func (s *server) routes() {
	s.router.HandleFunc("/", s.handleHi("bye"))
}

func (s *server) handleHi(str string) http.HandlerFunc {
	output := "hi"

	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)

		node1 := s.gameMap.GetNode(0, 0)
		node2 := s.gameMap.GetNode(3, 0)
		fmt.Fprintf(w, "%q %s\n%v", output, str, s.gameMap.FindPath(node2, node1))
	}
}
