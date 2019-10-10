package world

type dijk struct {
	gameMap Map
	node1   Node
	node2   Node

	dist      map[Node]int
	prev      map[Node]Node
	unvisited []Node
}

func (d *dijk) init() {
	for _, node := range d.gameMap.arrNodes {

	}
}

func MakeDijk(gameMap Map, node1 Node, node2 Node) {
	path := dijk{
		gameMap: gameMap,
		node1:   node1,
		node2:   node2,
	}

	path.init()
}

func FindPath(gameMap Map, node1 Node, node2 Node) {
	MakeDijk(gameMap, node1, node2)
}
