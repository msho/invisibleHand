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
		fmt.Fprintf(w, "%q %s", output, str)
	}
}
