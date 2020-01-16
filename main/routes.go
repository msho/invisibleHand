package main

import (
	"fmt"
	"html/template"
	"net/http"
	

	"invisiblehand/dummies"
	"invisiblehand/path"
)

type ClientPage struct {
	PageTitle  string
	Body       string
	ScriptData template.JS
}

func (s *server) routes() {


	s.router.HandleFunc("/", s.handleHi(dummies.Data))
	

	// serve static /scripts direcory
	s.router.PathPrefix("/scripts/").Handler(http.StripPrefix("/scripts/", http.FileServer(http.Dir("./client/scripts"))))
	
}

func (s *server) handleHi(str string) http.HandlerFunc {

	tplMap := template.Must(
		template.New("master.tmpl").ParseFiles("client/pages/common/master.tmpl",
			"client/pages/common/header.tmpl",
			"client/pages/common/footer.tmpl",
			"client/pages/map/content.tmpl",
		))

	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)

		node1 := s.gameMap.GetNode(1, 0)
		node2 := s.gameMap.GetNode(2, 1)
		greedy := path.Greedy{}

		data := &ClientPage{
			PageTitle:  "ok",
			Body:       fmt.Sprintf("%v", greedy.FindPath(s.gameMap, node1, node2)),
			ScriptData: template.JS(str),
		}

		err := tplMap.ExecuteTemplate(w, "master.tmpl", data)
		if err != nil {
			fmt.Print(err, tplMap)
		}
	}
}
