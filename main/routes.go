package main

import (
	"fmt"
	"net/http"

	"invisiblehand/path"
)

func (s *server) routes() {
	s.router.HandleFunc("/", s.handleHi("bye"))
}

func (s *server) handleHi(str string) http.HandlerFunc {
	output := "hi"

	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)

		node1 := s.gameMap.GetNode(0, 0)
		node2 := s.gameMap.GetNode(2, 4)
		greedy := path.Greedy{}
		fmt.Fprintf(w, "%q %s\n%v", output, str, greedy.FindPath(s.gameMap, node1, node2))
	}
}
