package main

import (
	"fmt"
	"html/template"
	"net/http"
)

//ClientPage holds client data
type ClientPage struct {
	PageTitle  string
	Body       string
	ScriptData template.JS
}

func (s *server) routes() {
	// serve get '/' request
	s.router.HandleFunc("/", s.handleHi(s.gameMap.ToJSON()))

	// serve static /scripts direcory
	s.router.PathPrefix("/scripts/").Handler(http.StripPrefix("/scripts/", http.FileServer(http.Dir("./client/scripts"))))

	// serve static /style direcory
	s.router.PathPrefix("/style/").Handler(http.StripPrefix("/style/", http.FileServer(http.Dir("./client/style"))))
}

func (s *server) handleHi(str string) http.HandlerFunc {
	// For debug only... TODO: remove to change to const staticPath = "
	const staticPath = "c:/Users/RS250930/go/src/invisiblehand"
	tplMap := template.Must(
		template.New("master.tmpl").ParseFiles(staticPath+"/client/pages/common/master.tmpl",
			staticPath+"/client/pages/common/header.tmpl",
			staticPath+"/client/pages/common/footer.tmpl",
			staticPath+"/client/pages/map/content.tmpl",
		))

	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)

		/*node1 := s.gameMap.GetNode(1, 0)
		node2 := s.gameMap.GetNode(2, 1)
		greedy := path.Greedy{}*/

		data := &ClientPage{
			PageTitle:  "ok",
			Body:       fmt.Sprintf("" /*"%v", greedy.FindPath(s.gameMap, node1, node2)*/),
			ScriptData: template.JS(fmt.Sprintf("const mapData = %s", str)),
		}

		err := tplMap.ExecuteTemplate(w, "master.tmpl", data)
		if err != nil {
			fmt.Print(err, tplMap)
		}
	}

}
